function id() {
	// eslint-disable-next-line no-magic-numbers
	return `${Date.now()}${(Math.random() * 1000000).toFixed()}`
}

export const config = {
	selector: 'vue-portal-target-'.concat(id()),
}

export const setSelector = function setSelector(selector) {
	return (config.selector = selector)
}
export const isBrowser = typeof window !== 'undefined' && window.document
