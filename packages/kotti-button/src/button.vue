<template>
	<button :class="mainClasses" @click="handleClick">
		<i v-if="loading" :class="loadingClass" />
		<i v-else class="yoco" v-text="icon" />
		<span>
			<slot />
		</span>
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
	},
	computed: {
		mainClasses() {
			return [this.type, this.objectClass];
		},
		loadingClass() {
			return {
				inline: true,
				loading: true,
				white: this.type === 'primary',
			};
		},
		objectClass() {
			return {
				icon: this.icon,
				'icon-only': this.icon && !this.$slots.default,
			};
		},
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
