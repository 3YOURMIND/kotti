export default `tokens.forEach(token => {
	// edit the style if already existing
	const existingStyles = figma.getLocalPaintStyles()
	let existing = existingStyles.find(style => style.name === token.name)
	let figmaStyle
	if (existing) {
		figmaStyle = existing
	}else{
		figmaStyle = figma.createPaintStyle()
	}

	figmaStyle.name = token.name
	figmaStyle.description = token.description

	figmaStyle.paints = [
		{
			type: 'SOLID',
			color: {
				r: token.color.r / 255,
				g: token.color.g / 255,
				b: token.color.b / 255,
			},
		},
	]
})`
