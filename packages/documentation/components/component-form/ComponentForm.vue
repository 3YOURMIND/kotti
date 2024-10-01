<script lang="ts">
import { codeToHtml } from 'shiki'
import type { PropType } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { KtI18nContext } from '@3yourmind/kotti-ui'

export default defineComponent({
	name: 'ComponentForm',
	components: {
		KtI18nContext,
	},
	props: {
		component: {
			required: true,
			type: Object as PropType<{
				name: string
				props?: Record<string, unknown>
			}>,
		},
		componentProps: {
			required: true,
			type: Object as PropType<Record<string, unknown>>,
		},
	},
	setup() {
		const codeHtml = ref<string | null>(null)

		watch(
			() => null,
			async () => {
				const code =
					'<VueComponent v-if="false" :label="label">\n\tcontent\n</VueComponent>'
				codeHtml.value = await codeToHtml(code, {
					lang: 'vue-html',
					theme: 'vitesse-light',
				})
			},
			{ immediate: true },
		)

		return {
			codeHtml,
		}
	},
})
</script>

<template>
	<section>
		<div class="example-preview">example preview</div>
		<div class="code-preview">
			<div :class="$style.code" v-html="codeHtml" />
		</div>
	</section>
	<div class="component-form" />
</template>

<style lang="scss" module>
.code {
	padding: var(--unit-3) var(--unit-6);

	> * {
		background-color: var(--gray-10) !important;
		margin: 0;
	}
}
</style>
