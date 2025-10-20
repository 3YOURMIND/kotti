<template>
	<TheActionbar />
	<div class="workspace">
		<TheContent> <slot /></TheContent>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TheActionbar from '~/chrome/TheActionbar.vue'
import TheContent from '~/chrome/TheContent.vue'

export default defineComponent({
	name: 'LayoutActionbar',
	components: {
		TheActionbar,
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
