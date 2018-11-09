<template>
	<button :class="mainClasses" @click="handleClick">
		<i v-if="loading" :class="loadingClass" />
		<i v-else class="yoco" v-text="icon" /> <span> <slot /> </span>
	</button>
</template>

<script>
export default {
	name: 'KtButton',
	props: {
		type: {
			type: String,
			default: '',
		},
		icon: {
			type: String,
			default: '',
		},
		loading: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			default: null,
		},
	},
	computed: {
		mainClasses() {
			const classes = [this.type, this.objectClass]
			if (this.size === 'small') classes.push('sm')
			if (this.size === 'large') classes.push('lg')
			return classes
		},
		loadingClass() {
			return {
				inline: true,
				loading: true,
				white: this.type === 'primary',
			}
		},
		objectClass() {
			return {
				icon: this.icon,
				'icon-only': this.icon && !this.$slots.default,
			}
		},
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		},
	},
}
</script>
