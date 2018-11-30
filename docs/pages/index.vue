<template>
	<div v-html="KottiReadMe"/>
</template>

<script>
import KottiReadMe from '../../README.md'

export default {
	name: 'IndexPage',
	layout: 'fullpage',
	computed: {
		KottiReadMe() {
			return KottiReadMe
		},
	},
}
</script>
