<template>
	<KtI18nContext locale="en-US">
		<slot />
	</KtI18nContext>
</template>

<script lang="ts">
import { KtI18nContext } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'LayoutFullPage',
	components: {
		KtI18nContext,
	},
})
</script>
