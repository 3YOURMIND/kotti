<template>
	<div :class="fieldSelectClasses">
		<div
			ref="tippyRef"
			@mouseenter="isFieldHovered = true"
			@mouseleave="isFieldHovered = false"
		>
			<KtField
				v-bind="{ field }"
				ref="ktFieldRef"
				:getEmptyValue="() => (isMultiple ? [] : null)"
				:helpTextSlot="helpTextSlot"
			>
				<div class="kt-field-select__input-and-tags">
					<KtTag
						v-for="option in visibleSelectedTags"
						:key="option.value"
						class="kt-field-select__tag"
						:isDisabled="field.isDisabled || Boolean(option.isDisabled)"
						:text="option.label"
						@close="removeTag(option.value)"
					/>
					<KtTag
						v-if="collapsedTagCount > 0"
						class="kt-field-select__tag"
						isDisabled
						:text="`+${collapsedTagCount}`"
					/>
					<input
						ref="inputRef"
						v-bind="inputProps"
						@blur="isFieldFocused = false"
						@focus="isFieldFocused = true"
						@input="updateQuery"
						@keydown.delete="onPressDelete"
						@keydown.down.prevent
						@keydown.enter.prevent
						@keydown.up.prevent
					/>
				</div>
				<template #actionIcon="{ classes, handleClear, showClear }">
					<ActionIcon
						v-bind="{
							classes,
							handleClear,
							isDropdownOpen,
							showClear: showClearIcon(showClear),
						}"
						@update:isDropdownOpen="setIsDropdownOpen"
					/>
				</template>
			</KtField>
		</div>
		<div ref="tippyContentRef">
			<FieldSelectOptions
				:actions="actions"
				:dataTestPrefix="inputProps['data-test']"
				:isDisabled="field.isDisabled"
				:isDropdownOpen="isDropdownOpen"
				:isLoading="isLoadingOptions"
				:isMultiple="isMultiple"
				:isUnsorted="isUnsorted"
				:maximumSelectable="maximumSelectable"
				:options="filteredOptions"
				:value="optionsValue"
				@close="setIsDropdownOpen(false)"
				@input="onOptionsInput"
			>
				<template #option="values">
					<slot v-bind="values" name="option" />
				</template>
			</FieldSelectOptions>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { z } from 'zod'

import { Yoco } from '@3yourmind/yoco'

import { KtField } from '../../kotti-field'
import { useField } from '../../kotti-field/hooks'
import {
	useEmitBlur,
	useForceUpdate,
	useKtFieldRef,
} from '../../kotti-field/hooks'
import { KtTag } from '../../kotti-tag'
import { makeProps } from '../../make-props'
import { KOTTI_FIELD_SELECT_SUPPORTS } from '../constants'
import {
	isTippyContentWrapper,
	useSelectTippy,
} from '../hooks/use-select-tippy'
import type {
	KottiFieldMultiSelect,
	KottiFieldMultiSelectRemote,
	KottiFieldSingleSelect,
	KottiFieldSingleSelectRemote,
} from '../types'
import { Shared } from '../types'

import ActionIcon from './ActionIcon.vue'
import FieldSelectOptions from './Options.vue'

const UPDATE_QUERY = 'update:query'

const propsSchema = Shared.propsSchema
	.merge(Shared.isMultipleSchema)
	.merge(Shared.isRemoteSchema)
	.merge(Shared.isSingleSchema)
	.omit({ value: true })
	.extend({
		helpTextSlot: z.array(z.any()).default(() => []),
		isMultiple: z.boolean().default(false),
		isRemote: z.boolean().default(false),
		value: z.union([
			Shared.isMultipleSchema.shape.value,
			Shared.isSingleSchema.shape.value,
		]),
	})

type MultiValue =
	| KottiFieldMultiSelect.Value
	| KottiFieldMultiSelectRemote.Value

type SingleValue =
	| KottiFieldSingleSelect.Value
	| KottiFieldSingleSelectRemote.Value

export default defineComponent({
	name: 'GenericSelectField',
	components: {
		ActionIcon,
		FieldSelectOptions,
		KtField,
		KtTag,
	},
	props: makeProps(propsSchema),
	emits: ['blur', 'emit', 'input'],
	setup(props, { emit: rawEmit }) {
		const emit = (event: string, payload: unknown) => {
			rawEmit('emit', { event, payload })
		}

		const field = useField<MultiValue | SingleValue>({
			emit,
			isEmpty: (value) =>
				props.isMultiple
					? (value as MultiValue).length === 0
					: (value as SingleValue) === null,
			props,
			supports: KOTTI_FIELD_SELECT_SUPPORTS,
		})

		const inputRef = ref<HTMLInputElement | null>(null)
		const isFieldFocused = ref(false)
		const isFieldHovered = ref(false)
		const localQuery = ref<string | null>(null)

		const { forceUpdateKey, forceUpdate } = useForceUpdate()
		const ktFieldRef = useKtFieldRef()

		const triggerTargets = computed(() =>
			ktFieldRef.value ? [ktFieldRef.value.inputContainerRef] : [],
		)

		const { isDropdownOpen, isDropdownMounted, ...selectTippy } =
			useSelectTippy(field, triggerTargets)

		const deleteQuery = () => {
			if (props.isRemote) {
				if (props.query !== null) emit(UPDATE_QUERY, null)
			} else localQuery.value = null
		}

		/**
		 * Tippy wraps the content inside additional div elements.
		 * So, we need to look for the actual content element.
		 */
		const findEventTarget = (
			target: EventTarget | null,
		): EventTarget | null => {
			if (target === null || !(target instanceof HTMLElement)) return target

			if (target === selectTippy.tippyContentRef.value) return target

			return isTippyContentWrapper(target)
				? findEventTarget((target.childNodes[0] ?? null) as EventTarget | null)
				: target
		}
		useEmitBlur({
			emit,
			field,
			fieldTarget: computed(() => [
				ktFieldRef.value?.inputContainerRef ?? null,
				selectTippy.tippyContentRef.value,
			]),
			findEventTarget,
		})

		watch(
			isDropdownMounted,
			(isMounted) => {
				if (isMounted) return
				deleteQuery()
			},
			{ flush: 'post' },
		)

		watch(
			isDropdownOpen,
			(isOpen) => {
				if (!isOpen) return
				inputRef.value?.focus()
			},
			{ flush: 'post' },
		)

		const queryValue = computed(() =>
			props.isRemote ? props.query : localQuery.value,
		)

		/**
		 * keeps reference of already seen option labels so that
		 * the tags can be rendered properly when filtering remotely
		 */
		const seenValueLabelMap = ref<Map<Shared.Value, Shared.Option['label']>>(
			new Map(),
		)

		watch(
			() => props.options,
			() => {
				seenValueLabelMap.value = new Map([
					...seenValueLabelMap.value,
					...props.options.map(
						(option): [Shared.Value, Shared.Option['label']] => [
							option.value,
							option.label,
						],
					),
				])
			},
			{ flush: 'post', immediate: true },
		)

		const isInputVisible = computed(
			// save some space in multi select when tags are shown
			() => !props.isMultiple || isDropdownOpen.value || field.isEmpty,
		)

		return {
			collapsedTagCount: computed(() =>
				props.isMultiple
					? (field.currentValue as MultiValue).length - props.collapseTagsAfter
					: 0,
			),
			field,
			fieldSelectClasses: computed(() => ({
				'kt-field-select': true,
				'kt-field-select--is-input-visible': !isInputVisible.value,
			})),
			filteredOptions: computed(() =>
				props.isRemote
					? props.options
					: props.options.filter(
							(o) =>
								localQuery.value === null ||
								o.label.toLowerCase().includes(localQuery.value.toLowerCase()),
						),
			),
			inputProps: computed(() => ({
				...field.inputProps,
				autocomplete: props.autoComplete,
				class: ['kt-field-select__wrapper'],
				forceUpdateKey: forceUpdateKey.value,
				placeholder: props.placeholder ?? undefined,
				size: 1,
				type: 'text',
				value: (() => {
					if (isDropdownOpen.value) return queryValue.value ?? undefined

					// can't bind multiple values to input (therefore, we just bind `undefined`)
					if (field.currentValue === null || props.isMultiple) return undefined

					return props.options.find(
						(option) => option.value === field.currentValue,
					)?.label
				})(),
			})),
			inputRef,
			isDropdownOpen,
			isFieldFocused,
			isFieldHovered,
			ktFieldRef,
			onOptionsInput: (value: MultiValue) => {
				if (props.isMultiple) {
					field.setValue(value)
					if (props.clearOnSelect) deleteQuery()
				} else {
					const newValue = value[0] ?? null
					// performance optimization
					if (field.currentValue !== newValue) field.setValue(newValue)
				}
				inputRef.value?.focus()
				// single select: close the tippy instance whenever a selection is made.
				// This (watcher on isDropdownMounted) also intentionally resets the query
				// so that the api-call (for example) can already trigger and load the non-filtered options
				if (!props.isMultiple) selectTippy.setIsDropdownOpen(false)
			},
			onPressDelete: () => {
				if (queryValue.value || !props.isMultiple) return // only delete value if query is already empty

				const value = field.currentValue as MultiValue
				if (value.length > 0) field.setValue(value.slice(0, -1))
			},
			optionsValue: computed(() => {
				if (props.isMultiple) return field.currentValue as MultiValue
				else
					return field.currentValue === null
						? []
						: [field.currentValue as SingleValue]
			}),
			removeTag: (value: Shared.Option['value']) => {
				if (!props.isMultiple)
					throw new Error(
						'GenericSelectField: Unexpected multi function on single select',
					)

				field.setValue(
					(field.currentValue as MultiValue).filter((v) => v !== value),
				)
				inputRef.value?.focus()
			},
			setIsDropdownOpen: selectTippy.setIsDropdownOpen,
			showClearIcon: computed(
				() => (showClear: boolean) =>
					showClear && (isFieldHovered.value || isFieldFocused.value),
			),
			tippyContentRef: selectTippy.tippyContentRef,
			tippyRef: selectTippy.tippyRef,
			updateQuery: (event: Event) => {
				if (!isDropdownOpen.value) {
					selectTippy.setIsDropdownOpen(true)
				} else {
					const value = (event.target as HTMLInputElement).value
					const newValue = value === '' ? null : value

					if (props.isRemote && props.query !== newValue)
						emit(UPDATE_QUERY, newValue)
					else localQuery.value = newValue
				}

				forceUpdate()
			},
			visibleSelectedTags: computed(() =>
				props.isMultiple
					? (field.currentValue as MultiValue)
							.filter((_, index) => index < props.collapseTagsAfter)
							.map(
								(value): Shared.Option =>
									props.options.find((option) => option.value === value) ?? {
										label: seenValueLabelMap.value.get(value) ?? String(value),
										value,
									},
							)
					: [],
			),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-select {
	&:not(:last-child) {
		margin-bottom: 0.8rem;
	}

	// can't rely on v-if because the field wouldn't be focusable
	&.kt-field-select--is-input-visible {
		position: relative;

		.kt-field-select__wrapper {
			position: absolute;
			left: -10000px;
			pointer-events: none;
		}
	}

	&__query {
		display: flex;
		flex: 1;
		width: 100%;
		padding: 0;
		margin: 0;
		line-height: 1.6;
		border: 0;
	}

	$vertical-tag-gap: 2px;
	$horizontal-tag-gap: 4px;

	&__input-and-tags {
		display: flex;
		flex-wrap: wrap;

		// HACK: use negative margins to align multi-line grids of tags
		margin: #{-$vertical-tag-gap + 4px} #{-$horizontal-tag-gap};
	}

	&__tag {
		text-transform: capitalize;
	}

	&__wrapper {
		display: flex;
		flex: 1;
		min-width: 30%;
		padding: 0;
		margin: 0;
		line-height: 1.6;
		border: 0;
	}
}
</style>
