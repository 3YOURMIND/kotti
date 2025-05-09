<template>
	<KottiReadMe />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import KottiReadMe from '~/../../README.md'

export default defineComponent({
	name: 'IndexPage',
	components: {
		KottiReadMe,
	},
})
</script>
