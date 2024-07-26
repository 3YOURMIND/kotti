/*
Source https://github.com/Jscherbe/vite-plugin-markdown-in-vue

MIT License

Copyright (c) 2023 Jscherbe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import MarkdownIt from 'markdown-it'

const defaults = {
	/**
	 * Define custom element name ie <MdBlock>
	 */
	elementNameBlock: 'MarkdownBlock',
	/**
	 * Define custom element name ie <MdInline>
	 */
	elementNameInline: 'MarkdownInline',
	/**
	 * What file types to include (regex)
	 */
	include: /\.(vue|md)$/,
	/**
	 * What file types to exclude (regex)
	 */
	exclude: null as RegExp | null,
	/**
	 * Options to pass to markdown-it
	 */
	markdownItOptions: {
		html: true,
	},
	/**
	 * Alter markdown-it instance (add plugins, etc)
	 */
	markdownItSetup(md: MarkdownIt) {
		// md.use(something)
	},
	/**
	 * Wrap content in <div>, only if default parser
	 */
	wrapBlock: false,
	/**
	 * Wrap content in <span>, only if default parser
	 */
	wrapInline: false,
	/**
	 * Class to add to block wrapper
	 */
	wrapBlockClasses: 'markdown-block',
	/**
	 * Class to add to inline wrapper
	 */
	wrapInlineClasses: 'markdown-inline',
	/**
	 * Vue files will pull <MarkdownBlock>'s only from within <template>
	 * for all other extensions it will parse the whole file and replace the blocks
	 * - This is matched against the file/id in vite
	 */
	isVueSfc: /\.vue$/,
}

type Config = typeof defaults
type RegexObject = Record<string, RegExp>

type Context = {
	code: string
	config: Config
	id: string
	md: MarkdownIt
	regex: RegexObject
}

function newTagRegex(name: string): RegExp {
	return new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, 'gm')
}

export default function pluginMarkdownInVue(options: Partial<Config>) {
	const config = Object.assign({}, defaults, options)
	const md = new MarkdownIt(config.markdownItOptions)

	const regex: RegexObject = {
		unclosedHtmlComment: /<!--(?![\s\S]*-->)/gm,
		emptyLines: /^\s*\n/g,
		markdownBlock: newTagRegex(config.elementNameBlock),
		markdownInline: newTagRegex(config.elementNameInline),
	}
	const shared = { config, md, regex }

	if (config.markdownItSetup) {
		config.markdownItSetup(md)
	}

	return {
		name: 'pluginMarkdownInVue',
		enforce: 'pre',
		transform(code: string, id: string) {
			const included = config.include.test(id)
			const excluded = config.exclude ? config.exclude.test(id) : false
			const ctx = { code, id, ...shared }
			return included && !excluded ? parseCode(ctx) : code
		},
	}
}

/**
 * Responsible for taking string of module and checking for markdown
 * and transforming them (find/parse/replace), then returning the module
 */
function parseCode(ctx: Context) {
	const { code, config, md, id, regex } = ctx

	// Ensure this needs to be transformed before doing any work in file
	const hasBlock = code.match(regex.markdownBlock)
	const hasInline = code.match(regex.markdownInline)

	// Exit if none
	if (!hasBlock && !hasInline) {
		return code
	}

	const correctIndent = (content: string) => {
		const clean = content.replace(regex.emptyLines, '')
		return trimToMinimumIndent(clean)
	}

	const condWrap = (html: string, inline = false): string => {
		const should =
			(inline && config.wrapInline) || (!inline && config.wrapBlock)
		const tag = inline ? 'span' : 'div'
		if (should) {
			const classes = inline
				? config.wrapInlineClasses
				: config.wrapBlockClasses
			return `<${tag} class="${classes}">${html}</${tag}>`
		} else {
			return html
		}
	}

	const newParser = (inline = false): ((content: string) => string) => {
		return (content: string) => {
			const method = inline ? 'renderInline' : 'render'
			const html = md[method](correctIndent(content))
			return condWrap(html, inline)
		}
	}

	const parseBlock = newParser()
	const parseInline = newParser(true)

	const replacer = (parser: (content: string) => string) => {
		return (match: string, body: string, index: number, full: string) => {
			const markupBefore = full.substring(0, index)
			const inComment = regex.unclosedHtmlComment.test(markupBefore)
			if (inComment) return match
			return parser(body)
		}
	}

	const transform = (content: string) => {
		return content
			.replace(regex.markdownBlock, replacer(parseBlock))
			.replace(regex.markdownInline, replacer(parseInline))
	}

	if (id.match(config.isVueSfc)) {
		const indices = getTemplateIndices(code, regex)

		if (!indices) {
			console.error('Unable to preprocess markdown in vue:', id)
			return code
		}

		const templateCode = code.substring(indices.startLast, indices.end)
		const transformed = transform(templateCode)
		const before = code.substring(0, indices.startLast)
		const after = code.substring(indices.end!)

		// Put the original file back together with the new content
		return before + transformed + after
		// For non vue file replace anywhere
	} else {
		return transform(code)
	}
}

/**
 * Trims the indent off the markdown so it's as if it was not indented
 * since it's inside components (indented)
 */
function trimToMinimumIndent(text: string) {
	const lines = text.split('\n')
	let minIndent = Infinity

	// Find the minimum indent
	for (const line of lines) {
		const firstCharIndex = line.search(/\S/) // Find index of first non-whitespace character
		if (firstCharIndex !== -1 && firstCharIndex < minIndent) {
			minIndent = firstCharIndex
		}
	}

	// Trim each line by the minimum indent
	return lines.map((line) => line.substring(minIndent)).join('\n')
}

/**
 * In order to allow nested <template> to be captured
 * we instead search for first last and return indices for
 * extraction.
 * - One edge case is if <template> is within a comment at top of file
 */
function getTemplateIndices(code: string, regex: RegexObject) {
	const regexStart = /<template>/g
	const regexEnd = /<\/template>/g

	let startMatch: RegExpExecArray | null = null
	let endMatch: RegExpExecArray | null = null
	let startIndex: number = -1
	let endIndex: number = -1

	// Make sure we get the first <template> not in a comment
	while ((startMatch = regexStart.exec(code)) !== null) {
		if (regex.unclosedHtmlComment.test(code.slice(0, startMatch.index))) {
			continue // Skip this template in comment block
		}
		startIndex = startMatch.index
	}

	while ((endMatch = regexEnd.exec(code)) !== null) {
		endIndex = endMatch.index
	}

	const hasStart = startIndex > -1
	const hasEnd = endIndex > -1

	if (!hasStart || !hasEnd) {
		return null
	}

	return {
		start: startIndex,
		startLast: startIndex + 10,
		end: endIndex,
		endLast: endIndex + 10,
	}
}
