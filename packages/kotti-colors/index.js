export const objectToCustomProperties = colors => {
	return colors.reduce((acc, current) => {
		acc += `--${current.name}: ${current.value};
`
		return acc
	}, '')
}
