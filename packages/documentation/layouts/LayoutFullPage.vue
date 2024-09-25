<template>
	<div class="workspace">
		<TheContent> <slot /></TheContent>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TheContent from '~/chrome/TheContent.vue'

export default defineComponent({
	name: 'LayoutFullPage',
	components: {
		TheContent,
	},
})
</script>

<style scoped>
/* .content {
	padding: 20px;
	padding-bottom: 50px;
	min-height: 100vh;
	flex-grow: 1;
} */
</style>
