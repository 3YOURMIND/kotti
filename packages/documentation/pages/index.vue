<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-html="KottiReadMe" />
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import KottiReadMe from '../../../README.md'

/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'IndexPage',
	layout: 'fullpage',
	data() {
		return { KottiReadMe }
	},
}
/* eslint-enable perfectionist/sort-objects */
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
</script>
