<template>
	<KtToaster :toaster="toaster">
		<template #error>
			<KtToast type="error" />
		</template>
		<template #info>
			<KtToast type="info" />
		</template>
		<template #success>
			<KtToast type="success" />
		</template>
		<template #warning>
			<KtToast type="warning" />
		</template>
	</KtToaster>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtToast, KtToaster } from '@3yourmind/kotti-ui'

import { toaster } from '~/utilities/toaster'

export default defineComponent({
	name: 'MyToaster',
	components: {
		KtToast,
		KtToaster,
	},
	setup() {
		return {
			toaster,
		}
	},
})
</script>
