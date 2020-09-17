import * as path from 'path'

import IconFontBuildr from 'icon-font-buildr'

import { Icon } from './types'

async function build() {
	const builder = new IconFontBuildr({
		sources: [path.join(__dirname, '..', 'svg', '[icon].svg')],
		icons: Object.values(Icon),
		output: {
			fonts: path.join(__dirname, '..', 'fonts'),
			fontName: 'yoco',
			formats: ['eot', 'ttf', 'woff', 'woff2'],
		},
	})

	await builder.build()

	const ligatures = builder.getIconsLigatures()

	// eslint-disable-next-line no-console
	console.log(ligatures)
}

build()
