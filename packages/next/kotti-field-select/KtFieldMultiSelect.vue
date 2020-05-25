<template>
	<KtField
		ref="ktFieldRef"
		v-bind="{ field }"
		class="kt-field-select kt-field-select--multiple"
		:getEmptyValue="() => []"
		isComponent="div"
		@click.stop="handleFieldClick"
		@mousedown="handleFieldMouseDown"
	>
		<!-- needs to be on a separate element because it doesn’t work when put on ElSelect-->
		<div @mousedown.stop>
			<ElSelect
				ref="elSelectRef"
				:class="elSelectClasses"
				defaultFirstOption
				:disabled="field.isDisabled"
				filterable
				loadingText="TODO"
				multiple
				noDataText="TODO"
				noMatchText="TODO"
				:placeholder="field.placeholder"
				:value="field.currentValue"
				@input="onChange"
				@visible-change="(showPopper) => (isDropdownOpen = showPopper)"
			>
				<div slot="prefix" class="kt-tags">
					<div
						v-for="option in valuesAsOptions"
						:key="option.value"
						class="kt-tags__tag"
					>
						<div class="kt-tags__tag-text" v-text="option.label" />
						<div
							v-if="!(field.isDisabled || option.disabled)"
							class="kt-tags__tag-icon"
							@click.stop="removeTag(option.value)"
						>
							<i class="yoco" v-text="'close'" />
						</div>
					</div>
				</div>
				<ElOption
					v-for="option in options"
					:key="option.value"
					:disabled="field.isDisabled || Boolean(option.disabled)"
					:label="option.label"
					:value="option.value"
				/>
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
import './styles.scss'
import { defineComponent, computed, ref } from '@vue/composition-api'
import { Select as ElSelect, Option as ElOption } from 'element-ui'

import { KtField } from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import ActionIcon from './components/ActionIcon.vue'
import { ktFieldSelectSharedProps } from './constants'
import { usePopperPlacementFix, usePopperWidthFix } from './hooks'
import { KtFieldSelect } from './types'

export default defineComponent({
	name: 'KtFieldMultiSelect',
	components: { ElOption, ElSelect, KtField, ActionIcon },
	props: {
		...ktFieldProps,
		...ktFieldSelectSharedProps,
	},
	setup(props: KtFieldSelect.Multiple.Props, { emit }) {
		const field = useField<KtFieldSelect.Multiple.Value>({
			emit,
			isCorrectDataType: (values): values is KtFieldSelect.Multiple.Value =>
				Array.isArray(values) &&
				values.every(
					(value) =>
						['string', 'number', 'boolean'].includes(typeof value) ||
						value === null,
				),
			isEmpty: (value) => value.length === 0,
			props,
		})

		const elSelectRef = ref<
			ElSelect & {
				inputWidth: number
				setSoftFocus(): void
			}
		>(null)

		// FIXME: Should be typeof KtField in theory, but right now
		// this gets resolved wrongly by vetur
		const ktFieldRef = ref<Vue>(null)

		usePopperPlacementFix(elSelectRef, ktFieldRef)
		usePopperWidthFix(elSelectRef, ktFieldRef, field)

		const isDropdownOpen = ref(false)

		const scheduleFocusAfterFieldClick = ref(false)

		return {
			elSelectClasses: computed(() => ({
				'el-select--disabled': field.isDisabled,
			})),
			elSelectRef,
			field,
			handleFieldClick: () => {
				const elSelect = elSelectRef.value
				if (!elSelect) throw new Error('elSelect is not ready')

				/**
				 * the dropdown was previously closed and should not be opened
				 */
				if (scheduleFocusAfterFieldClick.value) {
					elSelect.focus()
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
					elSelect.setSoftFocus()
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
			isDropdownOpen,
			ktFieldRef,
			onChange: (values: KtFieldSelect.Multiple.Value) => {
				const getOptionIndex = (value: KtFieldSelect.Shared.Entry['value']) =>
					props.options.findIndex((option) => option.value === value)

				const sortedValues = values.sort(
					(a, b) => getOptionIndex(a) - getOptionIndex(b),
				)

				field.setValue(sortedValues)
			},
			removeTag: (value: KtFieldSelect.Shared.Entry['value']) => {
				field.setValue(field.currentValue.filter((v) => v !== value))
			},
			valuesAsOptions: computed(() =>
				field.currentValue.map((value) => {
					const option = props.options.find((option) => option.value === value)

					if (!option)
						throw new Error(`Couldn’t find option with value “${value}”`)

					return option
				}),
			),
		}
	},
})
</script>
