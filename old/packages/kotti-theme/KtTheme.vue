<script>
export default {
	name: 'KtTheme',
	props: {
		customProperties: {
			type: Object,
			default: () => ({}),
		},
	},
	data() {
		return {
			root: null,
		}
	},
	watch: {
		customProperties() {
			Object.keys(this.customProperties).forEach((key) => {
				const formattedKey = '--' + key.split('--').join('')
				this.root.style.setProperty(formattedKey, this.customProperties[key])
			})
		},
	},
	mounted() {
		this.root = document.querySelector(':root')
	},
}
</script>
