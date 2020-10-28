<template>
	<div class="kt-steps"><slot /></div>
</template>

<script>
export default {
	name: 'KtSteps',
	props: {
		current: { type: Number, default: 0 },
		status: { type: String, default: 'process' },
		showIcon: { type: Boolean, default: false },
	},
	watch: {
		current() {
			this.updateChildProps()
		},
		status() {
			this.updateCurrentStatus()
		},
	},
	mounted() {
		this.updateChildLine()
		this.updateChildProps(true)
		this.updateCurrentStatus()
	},
	methods: {
		updateChildLine() {
			const total = this.$children.length
			this.$children[total - 1].isLastStep = true
		},
		updateChildProps(isInit) {
			this.$children.forEach((child, index) => {
				if (!this.showIcon) {
					child.index = index + 1
				}
				if (!(isInit && child.currentStatus)) {
					if (index > this.current) {
						child.currentStatus = 'wait'
					}
					if (index < this.current) {
						child.currentStatus = 'finished'
					}
					if (index === this.current) {
						child.currentStatus = 'process'
					}
				}
			})
		},
		updateCurrentStatus() {
			if (this.current < 0 || this.current >= this.$children.length) {
				return
			}
			this.$children[this.current].currentStatus = this.status
		},
	},
}
</script>

<style lang="scss" scoped>
.kt-steps {
	display: flex;
	flex-direction: column;
}
</style>
