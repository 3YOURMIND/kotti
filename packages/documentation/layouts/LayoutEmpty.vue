<template>
	<KtI18nContext locale="en-US">
		<MyToaster />
		<slot />
	</KtI18nContext>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtI18nContext } from '@3yourmind/kotti-ui'

import MyToaster from '~/components/MyToaster.vue'

export default defineComponent({
	name: 'EmptyLayout',
	components: {
		KtI18nContext,
		MyToaster,
	},
})
</script>
