<template>
	<div class="h3-heading">
		<h3>
			<label v-text="text" />
			<span v-if="type === 'action'" @click="handleClick">
				{{ actionText }} <i class="yoco" v-text="icon" />
			</span>
			<span v-if="type === 'toggle'" @click="handleClick">
				{{ toggleTextRep }}
				<i v-if="!toggleStatus" class="yoco">
					plus
				</i>
				<i v-else class="yoco">
					minus
				</i>
			</span>
		</h3>
		<div v-if="toggleStatus && type === 'toggle'">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtHeading',
	props: {
		actionText: { type: String, default: '' },
		icon: { type: String, default: '' },
		text: { type: String, default: 'H3 Heading' },
		toggleCloseText: { type: String, default: 'Close' },
		toggleStatus: { type: Boolean, default: false },
		toggleText: { type: String, default: 'View' },
		type: { type: String, default: 'default' },
	},
	computed: {
		toggleTextRep() {
			return this.toggleStatus ? this.toggleCloseText : this.toggleText
		},
	},
	methods: {
		handleClick(event) {
			if (this.type === 'action') {
				this.$emit('click', event)
			}
			if (this.type === 'toggle') {
				this.$emit('toggle', event)
			}
		},
	},
}
</script>
