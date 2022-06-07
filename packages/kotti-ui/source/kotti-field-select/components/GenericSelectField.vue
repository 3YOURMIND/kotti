<template>
	<div :class="fieldSelectClasses">
		<div ref="tippyTriggerRef">
			<KtField
				v-bind="{ field }"
				:getEmptyValue="() => (isMultiple ? [] : null)"
				:helpTextSlot="helpTextSlot"
			>
				<div class="kt-field-select__input-and-tags">
					<div
						v-for="option in visibleSelectedTags"
						:key="option.value"
						class="kt-field-select__tag"
					>
						<div class="kt-field-select__tag-text" v-text="option.label" />
						<div
							v-if="!(field.isDisabled || Boolean(option.isDisabled))"
							class="kt-field-select__tag-icon"
							@click.stop.prevent="removeTag(option.value)"
						>
							<i class="yoco" v-text="Yoco.Icon.CLOSE" />
						</div>
					</div>
					<div v-if="collapsedTagCount > 0" class="kt-field-select__tag">
						<div
							class="kt-field-select__tag-text"
							v-text="`+${collapsedTagCount}`"
						/>
					</div>
					<input
						ref="inputRef"
						v-bind="inputProps"
						@input="updateQuery"
						@keydown.delete="onPressDelete"
						@keydown.down.prevent
						@keydown.enter.prevent
						@keydown.up.prevent
					/>
				</div>
				<template v-slot:actionIcon="{ classes, handleClear, showClear }">
					<ActionIcon
						v-bind="{
							classes,
							handleClear,
							isDropdownOpen,
							showClear,
						}"
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
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { z } from 'zod'

import { KtField } from '../../kotti-field'
import { useField } from '../../kotti-field/hooks'
import { useForceUpdate } from '../../kotti-field/hooks'
import { makeProps } from '../../make-props'
import { KOTTI_FIELD_SELECT_SUPPORTS } from '../constants'
import { useSelectTippy } from '../hooks/use-select-tippy'
import {
	KottiFieldSingleSelectRemote,
	KottiFieldSingleSelect,
	KottiFieldMultiSelect,
	KottiFieldMultiSelectRemote,
	Shared,
} from '../types'

import ActionIcon from './ActionIcon.vue'
import FieldSelectOptions from './Options.vue'

const UPDATE_QUERY = 'update:query'

const propsSchema = Shared.propsSchema
	.merge(Shared.isMultipleSchema)
	.merge(Shared.isRemoteSchema)
	.merge(Shared.isSingleSchema)
	.omit({ value: true })
	.extend({
		helpTextSlot: z.array(z.unknown()).default(() => []),
		isMultiple: z.boolean().default(false),
		isRemote: z.boolean().default(false),
		value: z.union([
			Shared.isMultipleSchema.shape.value,
			Shared.isSingleSchema.shape.value,
		]),
	})

type SingleValue =
	| KottiFieldSingleSelect.Value
	| KottiFieldSingleSelectRemote.Value

type MultiValue =
	| KottiFieldMultiSelect.Value
	| KottiFieldMultiSelectRemote.Value

export default defineComponent({
	name: 'GenericSelectField',
	components: {
		ActionIcon,
		FieldSelectOptions,
		KtField,
	},
	props: makeProps(propsSchema),
	setup(props: z.output<typeof propsSchema>, { emit: rawEmit }) {
		const emit = (event: string, payload: unknown) =>
			rawEmit('emit', { event, payload })

		const field = useField<SingleValue | MultiValue>({
			emit,
			isEmpty: (value) =>
				props.isMultiple
					? (value as MultiValue).length === 0
					: (value as SingleValue) === null,
			props,
			supports: KOTTI_FIELD_SELECT_SUPPORTS,
		})

		const inputRef = ref<HTMLInputElement | null>(null)

		const localQuery = ref<string | null>(null)

		const { forceUpdateKey, forceUpdate } = useForceUpdate()

		const { isDropdownOpen, isDropdownMounted, ...selectTippy } =
			useSelectTippy()

		watch(isDropdownMounted, (isMounted) => {
			if (isMounted) return

			if (props.isRemote) {
				if (props.query !== null) emit(UPDATE_QUERY, null)
			} else localQuery.value = null
		})

		watch(isDropdownOpen, (isOpen) => {
			if (!isOpen) return

			inputRef.value?.focus()
		})

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
			{ immediate: true },
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
			tippyContentRef: selectTippy.tippyContentRef,
			tippyTriggerRef: selectTippy.tippyTriggerRef,
			onOptionsInput: (value: MultiValue) => {
				if (props.isMultiple) field.setValue(value)
				else {
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
			},
			setIsDropdownOpen: selectTippy.setIsDropdownOpen,
			updateQuery: ({ target: { value } }: { target: HTMLInputElement }) => {
				if (!isDropdownOpen.value) {
					selectTippy.setIsDropdownOpen(true)
				} else {
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
	$tag-padding: 0.4em;
	$tag-border: 1px;

	&__input-and-tags {
		display: flex;
		flex-wrap: wrap;

		// HACK: use negative margins to align multi-line grids of tags
		margin: #{-$vertical-tag-gap + 4px} #{-$horizontal-tag-gap};
	}

	&__tag {
		display: flex;
		align-items: center;
		padding: $tag-padding;
		margin: $vertical-tag-gap $horizontal-tag-gap;

		font-size: 0.875em;

		color: var(--text-02);
		text-transform: capitalize;
		white-space: nowrap;
		background-color: var(--interactive-02);
		border: $tag-border solid var(--ui-02);
		border-radius: var(--field-border-radius);

		&-icon {
			$size: 1.25em;

			display: flex;
			align-items: center;
			justify-content: center;
			width: $size;
			height: $size;
			margin-left: 4px;
			cursor: pointer;

			background-color: var(--ui-02);
			border-radius: 50%;

			// clipping also affects the clickable area
			@supports (clip-path: circle(#{$size / 2} at center)) {
				clip-path: circle(#{$size / 2} at center);
				border-radius: 0;
			}

			&:hover {
				background-color: var(--interactive-02-hover);
			}
		}
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
