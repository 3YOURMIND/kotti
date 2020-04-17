<template> </template>
<script>
export default {
	name: 'KtTheme',
	props: {
		customProperties: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
			root: null,
		}
	},
	mounted() {
		this.root = document.querySelector(':root')
	},
	watch: {
		customProperties() {
			console.log(this.root)
			Object.keys(this.customProperties).forEach(key => {
				let formattedKey = '--' + key.split('--').join('')
				this.root.style.setProperty(formattedKey, this.customProperties[key])
			})
		},
	},
}
</script>
