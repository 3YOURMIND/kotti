<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

import { KtBanner } from '../kotti-banner'
import { makeProps } from '../make-props'

import { TOAST_CONTEXT, type ToastContext } from './context'
import { KottiToast } from './types'

export default defineComponent({
	name: 'KtToast',
	components: {
		KtBanner,
	},
	props: makeProps(KottiToast.propsSchema),
	setup(props, { slots }) {
		const context = inject<ToastContext>(TOAST_CONTEXT) ?? null

		if (context === null) throw new Error('Could not find KtToastContext')

		return {
			hasHeaderSlot: computed((): boolean => Boolean(slots.header)),
			headerWithFallback: computed(() => props.header ?? context.value.header),
			onDelete: () => {
				context.value.delete()
			},
			progressWithFallback: computed(
				() => props.progress ?? context.value.progress,
			),
			textWithFallback: computed(() => props.text ?? context.value.text),
		}
	},
})
</script>

<template>
	<div class="kt-toast">
		<KtBanner isCloseable :type="type" @close="onDelete">
			<template v-if="hasHeaderSlot" #header>
				<slot name="header" />
			</template>
			<template v-else-if="headerWithFallback" #header>
				{{ headerWithFallback }}
			</template>
			<template #text>
				<slot name="text">
					{{ textWithFallback }}
				</slot>
			</template>
			<template #footer>
				<slot name="actions" />
			</template>
		</KtBanner>
	</div>
</template>

<style lang="scss" scoped>
.kt-toast {
	display: contents;
}

.kt-toast > * {
	box-shadow:
		0 4px 6px 0 rgb(0 0 0 / 10%),
		0 2px 4px 0 rgb(0 0 0 / 6%);
}
</style>
