<template>
	<link rel="icon" :href="logoUrl" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import logoUrl from '../assets/logo.svg'

export default defineComponent({
	name: 'TheHead',
	setup() {
		return {
			logoUrl,
		}
	},
})
</script>

<style lang="scss">
@import '@3yourmind/kotti-ui/dist/style.css';
@import '@3yourmind/yoco/style.css';
@import '../styles/main.scss';
</style>
