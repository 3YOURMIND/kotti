<template>
	<div v-html="KottiUIChangeLogRepsent" />
</template>

<script>
import KottiUIChangeLog from '../../CHANGELOG.md'

export default {
	name: 'ChangeLogPage',
	layout: 'fullpage',
	computed: {
		KottiUIChangeLogRepsent() {
			return KottiUIChangeLog
		},
	},
}
</script>
