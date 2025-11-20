<template>
	<link :href="iconUrl" rel="icon" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import iconUrl from '~/assets/icon.svg'

export default defineComponent({
	name: 'TheHead',
	setup() {
		return {
			iconUrl,
		}
	},
})
</script>

<style lang="scss">
@import '@3yourmind/kotti-ui/dist/style.css';
@import '@3yourmind/yoco/style.css';
@import '~/styles/main';
</style>
