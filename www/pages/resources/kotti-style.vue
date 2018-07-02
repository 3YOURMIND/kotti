<template>
	<div v-html="KottiStyleReadMeRepsent"/>
</template>

<script>
import KottiStyleReadMe from '../../../packages/kotti-style/README.md'

export default {
	name: 'KottiStylePage',
	computed: {
		KottiStyleReadMeRepsent() {
			return KottiStyleReadMe
		},
	},
}
</script>
