<template>
	<KottiReadMe />
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import KottiReadMe from '../../../../README.md'

export default {
	name: 'IndexPage',
	layout: 'fullpage',
	components: {
		KottiReadMe,
	},
	data() {
		return {}
	},
}
</script>
