<template>
	<div class="icon-container" @click="copyLiga(icon)">
		<div><i ref="liga" class="yoco" v-text="icon" /></div>
		<div class="icon-liga" v-text="icon" />
		<div
			v-if="copySuccess"
			class="success-message"
			v-text="copyIconSuccessMessage"
		/>
	</div>
</template>

<script>
export default {
	name: 'YocoPreview',
	props: {
		copySuccess: {
			type: Boolean,
			default: false,
		},
		icon: String,
	},
	computed: {
		copyIconSuccessMessage() {
			return `Copied icon "${this.icon}"`
		},
	},
	methods: {
		copyLiga(string) {
			const codeString = `<i class="yoco">${string}</i>`
			this.$copyText(codeString).then(
				() => {
					this.copySuccess = true
					setTimeout(() => {
						this.copySuccess = false
					}, 2000)
				},
				() => {
					alert('failed')
				},
			)
		},
	},
}
</script>

<style lang="scss" scoped>
.icon-container {
	box-sizing: border-box;
	float: left;
	padding: 24px;
	text-align: center;
}

.icon-container:hover {
	box-sizing: border-box;
	cursor: pointer;
	background: #f8f8f8;
	box-shadow: 0 2px 2px #ddd;
}

.icon-liga {
	font-size: 0.875em;
	line-height: 2em;
}

.icon-container .yoco {
	font-size: 32px !important;
}
</style>
