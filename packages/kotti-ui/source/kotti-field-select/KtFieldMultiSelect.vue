<template>
	<!-- isComponent is necessary to prevent the dropdown from opening when removing a tag -->
	<KtField
		ref="ktFieldRef"
		v-bind="{ field }"
		class="kt-field-select kt-field-select--multiple"
		:getEmptyValue="() => []"
		:helpTextSlot="$slots.helpText"
		isComponent="div"
		@click.stop="handleFieldClick"
		@mousedown="handleFieldMouseDown"
	>
		<!-- needs to be on a separate element because it doesn’t work when put on ElSelect-->
		<div @mousedown.stop>
			<ElSelect
				ref="elSelectRef"
				v-bind="elMultipleSelectProps"
				:multipleLimit="maximumSelectable"
				@input="onChange"
				@visible-change="(showPopper) => (isDropdownOpen = showPopper)"
			>
				<div
					v-if="field.isEmpty && showPlaceholder"
					slot="prefix"
					class="kt-field-select__placeholder"
					v-text="elMultipleSelectProps.placeholder"
				/>
				<div v-else-if="!field.isEmpty" slot="prefix" class="kt-tags">
					<div
						v-for="option in visibleSelectedOptions"
						:key="option.value"
						class="kt-tags__tag"
					>
						<div class="kt-tags__tag-text" v-text="option.label" />
						<div
							v-if="!(field.isDisabled || Boolean(option.isDisabled))"
							class="kt-tags__tag-icon"
							@click.stop="removeTag(option.value)"
						>
							<i class="yoco" v-text="Yoco.Icon.CLOSE" />
						</div>
					</div>
					<div v-if="invisibleTagCount > 0" class="kt-tags__tag">
						<div class="kt-tags__tag-text" v-text="`+${invisibleTagCount}`" />
					</div>
				</div>
				<ElOption
					v-for="option in options"
					:key="option.value"
					:data-test="option.dataTest"
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
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, computed, ref } from '@vue/composition-api'
import { Select as ElSelect, Option as ElOption } from 'element-ui'
import type Vue from 'vue'

import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

import ActionIcon from './components/ActionIcon.vue'
import { KOTTI_FIELD_SELECT_SUPPORTS } from './constants'
import { useSelectFixes, ElSelectWithInternalAPI } from './hooks'
import { KottiFieldMultiSelect } from './types'

type Entry = KottiFieldMultiSelect.Props['options'][0]

export default defineComponent<KottiFieldMultiSelect.PropsInternal>({
	name: 'KtFieldMultiSelect',
	components: { ElOption, ElSelect, KtField, ActionIcon },
	props: makeProps(KottiFieldMultiSelect.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldMultiSelect.Value>({
			emit,
			isEmpty: (value) => value.length === 0,
			props,
			supports: KOTTI_FIELD_SELECT_SUPPORTS,
		})
		const translations = useTranslationNamespace('KtFieldSelects')

		const elSelectRef = ref<ElSelectWithInternalAPI | null>(null)
		const ktFieldRef = ref<Vue | null>(null)

		useSelectFixes({
			field,
			elSelectRef,
			ktFieldRef,
			inputSelectors: [
				'.el-input__inner',
				'.el-select__tags .el-select__input',
			],
		})

		const isDropdownOpen = ref(false)

		const scheduleFocusAfterFieldClick = ref(false)

		return {
			elMultipleSelectProps: computed(
				(): Partial<ElSelect> => ({
					defaultFirstOption: true,
					disabled: field.isDisabled,
					filterable: true,
					loadingText: translations.value.loadingText,
					multiple: true,
					noDataText: translations.value.noDataText,
					noMatchText: translations.value.noMatchText,
					placeholder: props.placeholder ?? '',
					value: field.currentValue,
				}),
			),
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
			invisibleTagCount: computed(
				() => field.currentValue.length - props.collapseTagsAfter,
			),
			isDropdownOpen,
			ktFieldRef,
			onChange: (values: KottiFieldMultiSelect.Value) => {
				const getOptionIndex = (value: Entry['value']) =>
					props.options.findIndex((option) => option.value === value)

				const sortedValues = values.sort(
					(a, b) => getOptionIndex(a) - getOptionIndex(b),
				)

				field.setValue(sortedValues)
			},
			showPlaceholder: computed(() => {
				const query = elSelectRef.value?.query
				return query === ''
			}),
			removeTag: (value: Entry['value']) => {
				field.setValue(field.currentValue.filter((v) => v !== value))
			},
			visibleSelectedOptions: computed(() => {
				return field.currentValue
					.filter((_, index) => index < props.collapseTagsAfter)
					.map((value): Entry => {
						const option = props.options.find(
							(option) => option.value === value,
						)

						if (!option)
							throw new Error(
								`Couldn’t find option with value “${String(value)}”`,
							)

						return option
					})
			}),
			Yoco,
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
