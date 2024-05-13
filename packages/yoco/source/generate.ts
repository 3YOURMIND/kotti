import path from 'node:path'

import IconFontBuildr from 'icon-font-buildr'

import { Yoco } from './index.js'

const cwd = process.cwd()

async function build() {
	const builder = new IconFontBuildr({
		sources: [path.join(cwd, 'svg', '[icon].svg')],
		icons: Object.values(Yoco.Icon),
		output: {
			fonts: path.join(cwd, 'fonts'),
			fontName: 'yoco',
			formats: ['eot', 'ttf', 'woff', 'woff2'],
		},
	})

	await builder.build()

	const ligatures = builder.getIconsLigatures()

	// eslint-disable-next-line no-console
	console.log(
		`GENERATED ICON FONT WITH ${Object.values(ligatures).length.toString()} ICONS`,
	)
}

void build()
