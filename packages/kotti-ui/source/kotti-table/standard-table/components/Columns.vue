<template>
	<KtPopover
		v-if="options && options.length > 0"
		:size="size"
		:trigger="isLoading ? 'manual' : 'click'"
	>
		<KtButton
			:disabled="isLoading"
			:icon="Yoco.Icon.CHEVRON_DOWN"
			:isLoading="isLoading"
			:label="translations.editColumns"
		/>
		<template #content>
			<div class="table-columns">
				<KtFieldToggleGroup
					isOptional
					:options="options"
					:value="value"
					@input="$emit('input', $event)"
				/>
				<KtButton
					:disabled="isShowAllDisabled"
					:label="translations.showAll"
					type="text"
					@click="$emit('showAll')"
				/>
			</div>
		</template>
	</KtPopover>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'

export default defineComponent({
	name: 'TableColumns',
	props: {
		isLoading: { default: false, type: Boolean },
		options: {
			required: true,
			type: Array as PropType<{ key: string; label: string }[]>,
		},
		size: { default: 'md', type: String },
		value: {
			required: true,
			type: Object as PropType<Record<string, boolean>>,
		},
	},
	emits: ['input', 'showAll'],
	setup(props) {
		return {
			isShowAllDisabled: computed(
				() =>
					props.isLoading ||
					!Object.values(props.value).some((optionValue) => !optionValue),
			),
			translations: useTranslationNamespace('KtStandardTable'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.table-columns {
	display: flex;
	flex-direction: column;
	max-height: 50vh;
	overflow-y: auto;

	:deep(.kt-button) {
		flex-shrink: 0;
		align-self: end;
	}
}
</style>
