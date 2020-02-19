var config = {
	selector: 'vue-portal-target-'.concat(id()),
}
export default config
export var setSelector = function setSelector(selector) {
	return (config.selector = selector)
}
export var isBrowser = typeof window !== 'undefined' && window.document

function id() {
	// eslint-disable-next-line no-magic-numbers
	return `${Date.now()}${(Math.random() * 1000000).toFixed()}`
}
