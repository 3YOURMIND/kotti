<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-html="KottiUIChangeLog" />
</template>

<script>
// FIXME: Yeet
import KottiUIChangeLog from '../../../CHANGELOG.md'

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
