<template>
<div>
	<div v-html="KottiUIReadMeRepsent"/>
	<div v-html="KottiUIChangeLogRepsent"/>
</div>
</template>

<script>
import KottiUIReadMe from '../../../src/README.md'
import KottiUIChangeLog from '../../../src/CHANGELOG.md'

export default {
	name: 'KottiUIPage',
	computed: {
		KottiUIReadMeRepsent() {
			return KottiUIReadMe
		},
		KottiUIChangeLogRepsent() {
			return KottiUIChangeLog
		},
	},
}
</script>
