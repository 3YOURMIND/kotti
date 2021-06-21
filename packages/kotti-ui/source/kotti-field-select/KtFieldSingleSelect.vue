<template>
	<!-- isComponent is necessary to prevent the weird opening behavior when clicking the current value text inside the input -->
	<KtField
		ref="ktFieldRef"
		v-bind="{ field }"
		class="kt-field-select kt-field-select--single"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
		isComponent="div"
		@click.stop="handleFieldClick"
		@mousedown="handleFieldMouseDown"
	>
		<!-- needs to be on a separate element because it doesn’t work when put on ElSelect-->
		<div @mousedown.stop>
			<ElSelect
				ref="elSelectRef"
				v-bind="elSingleSelectProps"
				@input="onChange"
				@visible-change="(showPopper) => (isDropdownOpen = showPopper)"
			>
				<ElOption
					v-for="option in options"
					:key="option.value"
					:disabled="field.isDisabled || Boolean(option.isDisabled)"
					:label="option.label"
					:value="option.value"
				/>

				<div v-if="actions.length" class="kt-field-select__actions">
					<div class="el-select-dropdown__item">
						<div
							v-for="(action, index) in actions"
							:key="index"
							class="kt-field-select__actions__item"
							@click="action.onClick"
							v-text="action.label"
						/>
					</div>
				</div>
			</ElSelect>
		</div>
		<template v-slot:actionIcon="{ classes, handleClear, showClear }">
			<ActionIcon
				v-bind="{
					classes,
					elSelectRef,
					handleClear,
					isDropdownOpen,
					showClear,
				}"
			/>
		</template>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'
import { Select as ElSelect, Option as ElOption } from 'element-ui'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'
import { useTranslationNamespace } from '../kotti-translation/hooks'

import ActionIcon from './components/ActionIcon.vue'
import {
	KOTTI_FIELD_SINGLE_SELECT_PROPS,
	KOTTI_FIELD_SELECT_SUPPORTS,
} from './constants'
import { useSelectFixes, ElSelectWithInternalAPI } from './hooks'
import { KottiFieldSingleSelect } from './types'

export default defineComponent({
	name: 'KtFieldSingleSelect',
	components: { ElOption, ElSelect, KtField, ActionIcon },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_SINGLE_SELECT_PROPS,
		value: { default: null, type: [Number, String, Boolean] },
	},
	setup(props: KottiFieldSingleSelect.Props, { emit }) {
		const field = useField<KottiFieldSingleSelect.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldSingleSelect.Value =>
				['boolean', 'number', 'string', 'symbol'].includes(typeof value) ||
				value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_SELECT_SUPPORTS,
		})
		const translations = useTranslationNamespace('KtFieldSelects')

		const elSelectRef = ref<ElSelectWithInternalAPI | null>(null)
		const ktFieldRef = ref<Vue | null>(null)

		useSelectFixes({
			elSelectRef,
			field,
			inputSelectors: ['.el-input__inner'],
			ktFieldRef,
		})

		const isDropdownOpen = ref(false)
		const scheduleFocusAfterFieldClick = ref(false)

		return {
			elSelectRef,
			field,
			handleFieldClick: () => {
				const elSelect = elSelectRef.value
				if (!elSelect) throw new Error('elSelect is not ready')

				/**
				 * the dropdown was previously closed and should not be opened
				 */
				if (scheduleFocusAfterFieldClick.value) {
					;(elSelect as ElSelectWithInternalAPI).focus()
					scheduleFocusAfterFieldClick.value = false // done, so reset flag
				} else {
					/**
					 * the dropdown was previously open and input was focused.
					 * clicking closes the dropdown but blurs the input
					 * because the field is not part of the input (defined within `<ElSelect />`)
					 * (i.e: from the perspective of the input, it's a different component, so the input blurs).
					 *
					 * For a smooth experience, we set `softFocus` which focuses on the input
					 * without making the dropdown visible
					 * [setSoftFocus()]{@link ./node_modules/element-ui/packages/select/src/select.vue}
					 */
					;(elSelect as ElSelectWithInternalAPI).setSoftFocus()
				}
			},
			handleFieldMouseDown: () => {
				/**
				 * mousedown handlers get triggered first
				 * so we use them to set flags that should initiate actions
				 * when their corresponding click handlers are called
				 * the combination of a mouse-down handler and a click handler lets us define a start
				 * and an end marker to a flow of events that uniquely identifies scenarios.
				 *
				 * If the dropdown was closed before, the field should be focused and the dropdown should open
				 * on the corresponding click handler `handleFieldClick`
				 */
				if (!isDropdownOpen.value) scheduleFocusAfterFieldClick.value = true
			},

			elSingleSelectProps: computed(
				(): Partial<ElSelect> => ({
					defaultFirstOption: true,
					disabled: field.isDisabled,
					filterable: true,
					loadingText: translations.value.loadingText,
					noDataText: translations.value.noDataText,
					noMatchText: translations.value.noMatchText,
					placeholder: props.placeholder ?? '',
					value: field.currentValue,
				}),
			),
			isDropdownOpen,
			ktFieldRef,
			onChange: (value: KottiFieldSingleSelect.Value) => {
				field.setValue(value)
			},
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
