<template>
	<KtI18nContext locale="en-US">
		<slot />
	</KtI18nContext>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtI18nContext } from '@3yourmind/kotti-ui'

export default defineComponent({
	name: 'EmptyLayout',
	components: {
		KtI18nContext,
	},
})
</script>
