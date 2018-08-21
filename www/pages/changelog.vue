<template>
	<div v-html="KottiUIChangeLogRepsent"/>
</template>

<script>
import KottiUIChangeLog from '../../CHANGELOG.md'

export default {
	name: 'ChangeLogPage',
	computed: {
		KottiUIChangeLogRepsent() {
			return KottiUIChangeLog
		},
	},
}
</script>
