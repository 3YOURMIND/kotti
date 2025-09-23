<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<p>
			Tags should either visualize active user input or invite for a user
			action.
		</p>

		<CodePreviewNew
			code='
				<KtTag text="I display Information" isDisabled />
				<KtTag label="Label:" text="I have a label" hideActions />
				<KtTag hideActions>
					<code>Some <b>custom</b> HTML via slot</code>
				</KtTag>
				<KtTag v-if="showTag" text="You can remove me if you want" @close="showTag = false" />
			'
			language="vue-html"
		>
			<KtTag v-bind="{ colorStyle }" isDisabled text="I display Information" />
			<KtTag
				v-bind="{ colorStyle }"
				hideActions
				label="Label"
				text="I have a label"
			/>
			<KtTag v-bind="{ colorStyle }" hideActions>
				<code> Some custom <b> HTML</b></code>
			</KtTag>
			<KtTag
				v-if="showTag"
				v-bind="{ colorStyle }"
				text="You can remove me if you want"
				@close="showTag = false"
			/>
		</CodePreviewNew>

		<KtFieldSingleSelect
			v-model="colorStyle"
			label="Color Style"
			:options="colorStyleOptions"
		>
			<template #option="{ option }">
				<KtTag
					:colorStyle="option.value"
					hideActions
					:style="getTagStyle(option.value)"
					text="···"
				/>
				{{ option.label }}
			</template>
			<template #selection="{ currentValue }">
				<KtTag
					:colorStyle="currentValue"
					hideActions
					:style="getTagStyle(currentValue)"
					text="···"
				/>
			</template>
		</KtFieldSingleSelect>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { KtTag } from '@3yourmind/kotti-ui'

import CodePreviewNew from '~/components/CodePreviewNew.vue'
import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		CodePreviewNew,
		ComponentInfo,
	},
	setup() {
		return {
			colorStyle: ref('gray-light'),
			colorStyleOptions: [
				{ label: 'blue-light', value: 'blue-light' },
				{ label: 'blue-filled', value: 'blue-filled' },
				{ label: 'gray-light', value: 'gray-light' },
				{ label: 'gray-filled', value: 'gray-filled' },
				{ label: 'green-light', value: 'green-light' },
				{ label: 'green-filled', value: 'green-filled' },
				{ label: 'mint-light', value: 'mint-light' },
				{ label: 'mint-filled', value: 'mint-filled' },
				{ label: 'orange-light', value: 'orange-light' },
				{ label: 'orange-filled', value: 'orange-filled' },
				{ label: 'purple-light', value: 'purple-light' },
				{ label: 'purple-filled', value: 'purple-filled' },
				{ label: 'red-light', value: 'red-light' },
				{ label: 'red-filled', value: 'red-filled' },
				{ label: 'slate-light', value: 'slate-light' },
				{ label: 'slate-filled', value: 'slate-filled' },
				{ label: 'violet-light', value: 'violet-light' },
				{ label: 'violet-filled', value: 'violet-filled' },
				{ label: 'yellow-light', value: 'yellow-light' },
				{ label: 'yellow-filled', value: 'yellow-filled' },
			],
			component: KtTag,
			getTagStyle: (styleName: string) => {
				const [colorName, variant] = styleName.split('-') as [string, string]
				return variant === 'filled'
					? `height: 16px; border: 3px solid var(--${colorName}-60)`
					: 'height: 16px; border-width: 3px'
			},
			showTag: ref(true),
		}
	},
})
</script>
