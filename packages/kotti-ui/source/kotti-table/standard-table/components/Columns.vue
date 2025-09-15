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
				<MenuOptionItem
					v-for="option in options"
					:key="option.key"
					class="table-columns__menu-item"
				>
					<KtFieldToggle
						isOptional
						:value="value[option.key] || false"
						@input="
							(isChecked) =>
								$emit('input', { ...value, [option.key]: isChecked })
						"
					>
						<span v-text="option.label" />
					</KtFieldToggle>
				</MenuOptionItem>
			</div>

			<!-- FIXME: ideally this button shoud not be behind the fold -->
			<div class="table-columns__footer">
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

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import MenuOptionItem from '../../../shared-components/menu-option/MenuOptionItem.vue'

export default defineComponent({
	name: 'TableColumns',
	components: {
		MenuOptionItem,
	},
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
				(): boolean =>
					props.isLoading ||
					Object.values(props.value).every((optionValue) => optionValue),
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
	max-height: 35vh;
	overflow-y: auto;

	&__menu-item {
		padding: var(--unit-1) var(--unit-2);

		:deep(.kt-field__header--is-suffix) {
			display: none;
		}

		:deep(.kt-field-toggle),
		:deep(.kt-field-toggle-inner) {
			width: 100%;
		}
	}

	&__footer {
		text-align: end;
	}
}
</style>
