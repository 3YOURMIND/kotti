<template>
  <button :class="[type, objectClass]" @click="handleClick">
    <i :class="loadingClass" v-if="loading"/>
    <i class="yoco" v-text="icon" v-else></i>
    <span><slot></slot></span>
  </button>
</template>

<script>
export default {
	name: 'KtButton',
	props: {
		type: '',
		icon: '',
		loading: Boolean,
	},
	computed: {
		loadingClass() {
			return {
				'inline loading': true,
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
		handleClick(evt){
			this.$emit('click', evt);
		}
	}
};
</script>
