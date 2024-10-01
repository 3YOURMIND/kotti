<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../make-props'
import { schema } from './types'

export default defineComponent({
	name: 'KtToaster',
	props: makeProps(schema),
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
