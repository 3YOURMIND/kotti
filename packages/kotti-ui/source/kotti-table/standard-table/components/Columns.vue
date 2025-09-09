<template>
	<KtPopover
		v-if="options && options.length > 0"
		:size="size"
		:trigger="isLoading ? 'manual' : 'click'"
	>
		<KtButton
			data-test="table-column-edit-button"
			:disabled="isLoading"
			:icon="Yoco.Icon.CHEVRON_DOWN"
			:isLoading="isLoading"
			:label="translations.editColumns"
		/>
		<template #content>
			<div class="table-columns">
				<KtFieldToggleGroup
					isOptional
					:modelValue="columnVisibility"
					:options="options"
					@update:modelValue="$emit('update:columnVisibility', $event)"
				/>
				<!-- FIXME: ideally this button shoud not be behind the fold -->
				<KtButton
					data-test="table-column-show-all-button"
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

import KtButton from '../../../kotti-button/KtButton.vue'
import KtFieldToggleGroup from '../../../kotti-field-toggle/KtFieldToggleGroup.vue'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import KtPopover from '../../../kotti-popover/KtPopover.vue'

export default defineComponent({
	name: 'TableColumns',
	components: {
		KtButton,
		KtFieldToggleGroup,
		KtPopover,
	},
	props: {
		columnVisibility: {
			required: true,
			type: Object as PropType<Record<string, boolean>>,
		},
		isLoading: { default: false, type: Boolean },
		options: {
			required: true,
			type: Array as PropType<{ key: string; label: string }[]>,
		},
		size: { default: 'md', type: String },
	},
	emits: ['update:columnVisibility', 'showAll'],
	setup(props) {
		return {
			isShowAllDisabled: computed(
				(): boolean =>
					props.isLoading ||
					Object.values(props.columnVisibility).every(
						(optionValue) => optionValue,
					),
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
