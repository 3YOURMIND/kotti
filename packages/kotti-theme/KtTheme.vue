<script>
export default {
	name: 'KtTheme',
	props: {
		overwrites: {
			type: Array,
			default: [],
		},
	},
	watch: {
		overwrites() {
			console.log(this.overwrites)
		},
	},
}
</script>
