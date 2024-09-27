<script lang="ts">
import { defineComponent } from 'vue'
import { z } from 'zod'
import { makeProps } from '../make-props'

export default defineComponent({
	name: 'KtToaster',
	props: makeProps(
		z.object({
			toaster: z
				.object({
					tbd: z.boolean(),
				})
				.strict(),
		}),
	),
	setup() {},
})
</script>

<template>
	<div class="kt-toaster">KtToaster</div>
</template>

<style scoped>
.kt-toaster {
	background-color: red;
}
</style>
