<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-html="KottiUIChangeLog" />
</template>

<script>
import KottiUIChangeLog from '../../CHANGELOG.md'

export default {
	name: 'ChangeLogPage',
	layout: 'fullpage',
	data() {
		return {
			KottiUIChangeLog,
		}
	},
}
</script>
