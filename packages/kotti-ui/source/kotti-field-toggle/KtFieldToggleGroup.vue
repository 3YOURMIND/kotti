<template>
	<KtField v-bind="{ field }" :helpTextSlot="$slots.helpText" useFieldset>
		<template #container>
			<div :class="wrapperClasses">
				<div v-for="(option, index) of optionsWithChecked" :key="option.key">
					<div class="kt-field-toggle-group__header">
						<ToggleInner
							component="label"
							:data-test="getOptionDataTest(option)"
							:inputProps="inputProps(index)"
							:isDisabled="field.isDisabled || Boolean(option.isDisabled)"
							:modelValue="option.value"
							:type="type"
							@update:modelValue="onUpdateModelValue(option.key, $event)"
						>
							<slot name="header" :option="option">
								<div v-text="option.label" />
							</slot>
						</ToggleInner>
						<FieldHelpText
							v-if="option.tooltip"
							class="kt-field-toggle-group__header-tooltip"
							:helpText="option.tooltip"
						/>
						<slot name="headerSide" :option="option" />
					</div>
					<div class="kt-field-toggle-group__content">
						<slot name="content" :option="option" />
					</div>
				</div>
			</div>
		</template>
	</KtField>
</template>

<script lang="ts">
import omit from 'lodash/omit.js'
import { computed, defineComponent } from 'vue'

import { KtField } from '../kotti-field'
import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'
import ToggleInner from '../shared-components/toggle-inner/ToggleInner.vue'

import { KOTTI_FIELD_TOGGLE_SUPPORTS } from './constants'
import { KottiFieldToggleGroup } from './types'

export default defineComponent({
	name: 'KtFieldToggleGroup',
	components: {
		FieldHelpText,
		KtField,
		ToggleInner,
	},
	props: makeProps(KottiFieldToggleGroup.propsSchema),
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const field = useField<KottiFieldToggleGroup.ModelValue>({
			emit,
			isEmpty: (value) =>
				value !== null &&
				typeof value === 'object' &&
				Object.values(value).every((value) => value !== true),
			props,
			supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			getOptionDataTest: (option: KottiFieldToggleGroup.Entry) => {
				if (option.dataTest) return option.dataTest

				if (Object.keys(field.inputProps).includes('data-test')) {
					return [field.inputProps['data-test'], option.key].join('.')
				}
			},
			inputProps: computed(() => (index: number) => {
				return {
					...omit(field.inputProps, 'id'),
					forceUpdateKey: forceUpdateKey.value,
					id: `${field.inputProps.id}-${String(index)}`,
				}
			}),
			onUpdateModelValue: (
				key: KottiFieldToggleGroup.Entry['key'],
				newValue: boolean | undefined,
			) => {
				field.setValue({
					...field.currentValue,
					[key]: newValue ?? null,
				})
				forceUpdate()
			},
			optionsWithChecked: computed(() =>
				props.options.map((option) => ({
					...option,
					value: field.currentValue ? field.currentValue[option.key] : null,
				})),
			),
			wrapperClasses: computed(() => ({
				'kt-field-toggle-group': true,
				'kt-field-toggle-group--inline': props.isInline,
			})),
		}
	},
})
</script>

<style lang="scss">
.kt-field-toggle-group {
	display: flex;
	flex: 1;

	&--inline {
		flex-direction: row;

		> *:not(:first-child) {
			margin-left: 1rem;
		}
	}

	&:not(&--inline) {
		flex-direction: column;

		> *:not(:first-child) {
			margin-top: 0.4rem;
		}
	}

	&__header {
		display: flex;
		align-items: flex-start;

		> *:not(:last-child) {
			margin-right: 0.3rem;
		}
	}

	&__header-tooltip {
		// align tooltip icon with the center of the first line of the label
		// (assumption: font-size comes from common parent element)
		//  > starting point is upper end of the container (flex-start)
		//  > (+0.75em) Put upper edge of element into center (since line-height = 1.5 * font-size)
		//  > (-6px) Put it up half the height of the roolrip height (12px)
		transform: translateY(calc(0.75em - 6px));
	}

	&__content {
		font-size: var(--font-size-small);
	}

	.kt-field-toggle-inner__svg {
		flex-shrink: 0;
	}

	.kt-field-toggle-inner__svg--is-box {
		// align checkbox with the center of the first line of the label
		// (assumption: font-size comes from common parent element)
		//  > starting point is upper end of the container (flex-start)
		//  > (+0.75em) Put upper edge of element into center (since line-height = 1.5 * font-size)
		//  > (-8px) Put it up half the height of the checkbox height (16px)
		transform: translateY(calc(0.75em - 8px));
	}

	.kt-field-toggle-inner__svg--is-switch {
		// align switch with the center of the first line of the label
		// (assumption: font-size comes from common parent element)
		//  > starting point is upper end of the container (flex-start)
		//  > (+0.75em) Put upper edge of element into center (since line-height = 1.5 * font-size)
		//  > (-10px) Put it up half the height of the switch height (20px)
		transform: translateY(calc(0.75em - 10px));
	}
}
</style>
