<template>
	<div v-on-clickaway="closeDropdown">
		<div ref="ktFieldRef">
			<KtField
				v-bind="{ field }"
				class="kt-field-select kt-field-select-single-remote"
				:getEmptyValue="() => null"
				:helpTextSlot="$slots.helpText"
				@click.stop="() => (isDropdownOpen = !isDropdownOpen)"
			>
				<SingleSelectInput
					:label="selectedLabel"
					:placeholder="placeholder"
					:queryString="queryValue"
					@queryInputChanged="onQueryInput"
				/>
				<template v-slot:actionIcon="{ classes, handleClear, showClear }">
					<ActionIconNext
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

		<div
			v-show="isDropdownOpen"
			ref="popperContentRef"
			class="kt-field-select-single-remote__popper"
		>
			<IconTextItem
				v-for="(option, index) in modifiedOptions"
				:key="index"
				:isDisabled="option.isDisabled"
				:isSelected="option.isSelected"
				:label="option.label"
				@click.stop="() => selectOption(option.value)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { createPopper, Instance } from '@popperjs/core'
import {
	defineComponent,
	computed,
	onUnmounted,
	ref,
	watch,
} from '@vue/composition-api'
import { mixin as clickaway } from 'vue-clickaway'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'
import IconTextItem from '../kotti-popover/components/IconTextItem.vue'
import { useTranslationNamespace } from '../kotti-translation/hooks'

import ActionIconNext from './components/ActionIconNext.vue'
import SingleSelectInput from './components/SingleSelectInput.vue'
import {
	KOTTI_FIELD_SINGLE_SELECT_PROPS,
	KOTTI_FIELD_SELECT_SUPPORTS,
} from './constants'
import { KottiFieldSingleSelectRemote } from './types'

export default defineComponent({
	name: 'KtFieldSingleSelectRemote',
	components: { IconTextItem, KtField, ActionIconNext, SingleSelectInput },
	mixins: [clickaway],
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_SINGLE_SELECT_PROPS,
		queryValue: { default: null, type: String },
		value: { default: null, type: [Number, String, Boolean] },
	},
	setup(props: KottiFieldSingleSelectRemote.Props, { emit, root }) {
		const field = useField<KottiFieldSingleSelectRemote.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldSingleSelectRemote.Value =>
				['string', 'number', 'boolean'].includes(typeof value) ||
				value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_SELECT_SUPPORTS,
		})
		const translations = useTranslationNamespace('KtFieldSelects')

		const isDropdownOpen = ref(false)
		const ktFieldRef = ref(null)
		const popperContentRef = ref(null)
		const popper = ref<Instance | null>(null)

		const initPopper = () => {
			popper.value = createPopper(ktFieldRef.value, popperContentRef.value, {
				placement: 'bottom',
				modifiers: [
					{
						name: 'flip',
						enabled: true,
						options: {
							padding: 8,
						},
					},
					{
						name: 'offset',
						options: {
							// eslint-disable-next-line no-magic-numbers
							offset: [0, 8],
						},
					},
					{
						name: 'preventOverflow',
						enabled: true,
						options: {
							padding: 8,
						},
					},
					{
						name: 'matchReferenceSize',
						enabled: true,
						fn: ({ state, instance }) => {
							const popperSize = state.rects.popper['width']
							const referenceSize = state.rects.reference['width']
							if (popperSize >= referenceSize) return

							state.styles.popper['width'] = `${referenceSize}px`
							instance.update()
						},
						phase: 'beforeWrite',
						requires: ['computeStyles'],
					},
				],
			})
		}

		watch(
			() => isDropdownOpen.value,
			(newValue) => {
				if (newValue) {
					root.$nextTick(initPopper)
				}
			},
		)

		onUnmounted(() => popper.value?.destroy())

		return {
			closeDropdown: () => (isDropdownOpen.value = false),
			field,
			isDropdownOpen,
			ktFieldRef,
			modifiedOptions: computed(() =>
				props.options.length > 0
					? props.options.map((option) => ({
							...option,
							isDisabled: field.isDisabled ?? false,
							isSelected: field.currentValue === option.value,
					  }))
					: [
							{
								label: translations.value.noDataText,
								isDisabled: true,
								value: null,
							},
					  ],
			),
			onQueryInput: (event: { target: HTMLInputElement }) => {
				const newValue = event.target.value
				emit('queryInputChanged', newValue === '' ? null : newValue)
			},
			popperContentRef,
			selectedLabel: computed(() => {
				if (field.currentValue === null) return null
				return (
					props.options.find((option) => option.value === field.currentValue)
						?.label ?? translations.value.noMatchText
				)
			}),
			selectOption: (value: KottiFieldSingleSelectRemote.Value) => {
				field.setValue(value)
				isDropdownOpen.value = false
			},
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';
.kt-field-select-single-remote {
	&__wrapper {
		display: flex;
		width: 100%;
		padding: 0;
		margin: 0;
		line-height: 1.6;
		border: 0;
	}

	&__popper {
		z-index: $zindex-4;
		min-width: 200px;
		max-height: 40vh;
		overflow: auto;
		background: var(--white);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-base);
	}
}
</style>
