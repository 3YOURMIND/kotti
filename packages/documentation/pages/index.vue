<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-html="KottiReadMe" />
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import KottiReadMe from '../../../README.md'

export default {
	name: 'IndexPage',
	layout: 'fullpage',
	data() {
		return { KottiReadMe }
	},
}
</script>
