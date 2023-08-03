<template>
	<!-- eslint-disable-next-line vue/no-v-html -->
	<div v-html="KottiReadMe" />
</template>

<script>
import KottiReadMe from '../../../README.md'

export default {
	name: 'IndexPage',
	layout: 'fullpage',
	data() {
		return { KottiReadMe }
	},
}
</script>

<style lang="scss" scoped>
@import '../styles/tables';

::v-deep table {
	@extend .table-style;
}
::v-deep table th {
	@extend .th-style;
}
::v-deep table tr {
	@extend .tr-style;
}
::v-deep table td {
	@extend .td-style;
}
</style>
