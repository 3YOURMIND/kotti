<template>
	<KtI18nContext locale="en-US">
		<nuxt />
		<MyToaster />
	</KtI18nContext>
</template>

<script>
import { defineComponent } from 'vue'

import MyToaster from '~/components/MyToaster.vue'

export default defineComponent({
	name: 'EmptyLayout',
	components: {
		MyToaster,
	},
})
</script>
