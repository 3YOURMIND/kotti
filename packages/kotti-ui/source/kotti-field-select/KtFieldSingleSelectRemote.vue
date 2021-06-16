<template>
	<div>
		<div ref="ktFieldRef">
			<KtField
				v-bind="{ field }"
				class="kt-field-select kt-field-select--single-remote"
				:getEmptyValue="() => null"
				:helpTextSlot="$slots.helpText"
			>
				<input
					v-bind="inputProps"
					@blur="handleBlur"
					@focus="handleFocus"
					@input="updateQuery"
				/>

				<template v-slot:actionIcon="{ classes, handleClear, showClear }">
					<!-- <div ref="ktFieldChevronRef" @click.prevent> -->
					<ActionIconNext
						v-bind="{
							classes,
							handleClear,
							isDropdownOpen,
							showClear,
						}"
					/>
					<!-- </div> -->
				</template>
			</KtField>
		</div>

		<div ref="popperContentRef" class="kt-field-select-single-remote__popper">
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
import { useTippy } from '@3yourmind/vue-use-tippy'
import { defineComponent, computed, ref } from '@vue/composition-api'
import { roundArrow } from 'tippy.js'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'
import { useForceUpdate } from '../kotti-field/hooks'
import IconTextItem from '../kotti-popover/components/IconTextItem.vue'
import { useTranslationNamespace } from '../kotti-translation/hooks'

import ActionIconNext from './components/ActionIconNext.vue'
import {
	KOTTI_FIELD_SINGLE_SELECT_PROPS,
	KOTTI_FIELD_SELECT_SUPPORTS,
} from './constants'
import { KottiFieldSingleSelectRemote } from './types'

const ARROW_HEIGHT = 7

export default defineComponent({
	name: 'KtFieldSingleSelectRemote',
	components: { IconTextItem, KtField, ActionIconNext },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_SINGLE_SELECT_PROPS,
		queryValue: { default: null, type: String },
		value: { default: null, type: [Number, String, Boolean] },
	},
	setup(props: KottiFieldSingleSelectRemote.Props, { emit }) {
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
		const ktFieldRef = ref<Element | null>(null)
		const ktFieldChevronRef = ref<Element | null>(null)
		const popperContentRef = ref<Element | null>(null)

		useTippy(
			ktFieldRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: popperContentRef.value,
				hideOnClick: true,
				interactive: true,
				offset: [0, ARROW_HEIGHT],
				// onTrigger: () => console.log('I was triggered'),
				// onUntrigger: () => console.log('I was untriggered'),
				// onShow: () => console.log('Show me'),
				// onHide: () => console.log('Hide me'),
				placement: 'bottom',
				theme: 'light-border',
				trigger: 'click',
				// triggerTarget: [ktFieldRef.value, ktFieldChevronRef.value],
			})),
		)

		const isInputFocused = ref(false)
		const selectedLabel = computed((): string | null => {
			if (field.currentValue === null) return null
			return (
				props.options.find((option) => option.value === field.currentValue)
					?.label ?? null
			)
		})

		const { forceUpdateKey, forceUpdate } = useForceUpdate()

		return {
			field,
			handleBlur: () => {
				isInputFocused.value = false
				// eslint-disable-next-line sonarjs/no-duplicate-string
				emit('update:query', null)
			},
			handleFocus: () => {
				isInputFocused.value = true
			},
			inputProps: computed(() => ({
				class: ['kt-field-select--single-remote__wrapper'],
				forceUpdateKey: forceUpdateKey.value,
				placeholder: props.placeholder ?? undefined,
				size: 1,
				type: 'text',
				value: (() => {
					if (isInputFocused.value) return props.query ?? undefined

					return selectedLabel.value ?? undefined
				})(),
			})),
			isDropdownOpen,
			ktFieldRef,
			ktFieldChevronRef,
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
.kt-field-select--single-remote {
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
	}
}
</style>
