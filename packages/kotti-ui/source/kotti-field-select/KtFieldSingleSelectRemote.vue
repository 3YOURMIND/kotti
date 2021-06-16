<template>
	<div>
		<div ref="tippyTriggerRef">
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
					<!-- <ActionIconNext
						v-bind="{
							classes,
							handleClear,
							isDropdownOpen,
							showClear,
						}"
					/> -->
					<div
						:class="classes"
						role="button"
						@mouseenter="hoverOnClearIcon = true"
						@mouseleave="hoverOnClearIcon = false"
					>
						<i
							v-if="(showClear || Boolean(query)) && hoverOnClearIcon"
							class="yoco"
							@click.stop="handleClear"
							v-text="Yoco.Icon.CLOSE"
						/>
						<i
							v-else-if="isDropdownOpen"
							class="yoco"
							@click.stop
							v-text="Yoco.Icon.CHEVRON_UP"
						/>
						<i
							v-else
							class="yoco"
							@click.stop
							v-text="Yoco.Icon.CHEVRON_DOWN"
						/>
					</div>
				</template>
			</KtField>
		</div>

		<div ref="tippyContentRef" class="kt-field-select--single-remote__popper">
			<div v-if="isLoadingOptions" class="TODO" />
			<IconTextItem
				v-for="(option, index) in modifiedOptions"
				v-else
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
import { Yoco } from '@3yourmind/yoco'
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
	KOTTI_FIELD_REMOTE_SINGLE_SELECT_PROPS,
	KOTTI_FIELD_SELECT_REMOTE_SUPPORTS,
} from './constants'
import { KottiFieldSingleSelectRemote } from './types'

const ARROW_HEIGHT = 7

export default defineComponent({
	name: 'KtFieldSingleSelectRemote',
	components: { IconTextItem, KtField, ActionIconNext },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_REMOTE_SINGLE_SELECT_PROPS,
		query: { default: null, type: String },
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
			supports: KOTTI_FIELD_SELECT_REMOTE_SUPPORTS,
		})
		const translations = useTranslationNamespace('KtFieldSelects')

		const isDropdownOpen = ref(false)
		const tippyTriggerRef = ref<Element | null>(null)
		const tippyContentRef = ref<Element | null>(null)

		useTippy(
			tippyTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: tippyContentRef.value,
				hideOnClick: true,
				interactive: true,
				offset: [0, ARROW_HEIGHT],
				// onTrigger: () => console.log('I was triggered'),
				// onUntrigger: () => console.log('I was untriggered'),
				// onShow: () => console.log('Show me'),
				// onHide: () => console.log('Hide me'),
				onShow: () => {
					isDropdownOpen.value = true
				},
				onHide: () => {
					isDropdownOpen.value = false
				},
				placement: 'bottom',
				theme: 'light-border',
				trigger: 'click',
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
			hoverOnClearIcon: ref(false),
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
			modifiedOptions: computed<KottiFieldSingleSelectRemote.Props['options']>(
				() =>
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
			tippyTriggerRef,
			tippyContentRef,
			selectOption: (value: KottiFieldSingleSelectRemote.Value) => {
				field.setValue(value)
				// clear the query whenever an actual option is selected
				emit('update:query', null)
			},
			updateQuery: (event: { target: HTMLInputElement }) => {
				const newValue = event.target.value
				emit('update:query', newValue === '' ? null : newValue)

				forceUpdate()
			},
			Yoco,
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
