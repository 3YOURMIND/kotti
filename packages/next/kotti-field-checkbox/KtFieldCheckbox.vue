<template>
	<KtField :getEmptyValue="() => null" v-bind="{ field }">
		<div slot="container" class="kt-field-checkbox__wrapper">
			<label class="kt-field-checkbox__wrapper__label">
				<input
					class="kt-field-checkbox__wrapper__input"
					v-bind="inputProps"
					@change="onChange"
				/>
				<div
					class="kt-field-checkbox__wrapper__checkbox"
					:class="checkboxClass"
				>
					<svg
						class="kt-field-checkbox__wrapper__checkbox__check"
						width="9"
						height="8"
						viewBox="0 0 9 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1 3.92761L2.92242 6L8 1"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				</div>
				<slot name="default" />
			</label>
		</div>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

import KtField from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import { KtFieldCheckboxProps } from './types'

export default defineComponent({
	name: 'KtFieldCheckbox',
	components: { KtField },
	props: {
		...ktFieldProps,
	},
	setup(props: KtFieldCheckboxProps, { emit }) {
		const field = useField<boolean | null>({
			emit,
			isCorrectDataType: (value): value is boolean | null =>
				typeof value === 'boolean' || value === null,
			props,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		const checkboxClass = computed(() => {
			const baseClass = 'kt-field-checkbox__wrapper__checkbox'
			const modifier = field.currentValue ? 'checked' : 'unchecked'
			return `${baseClass}--${modifier}`
		})

		return {
			field,
			checkboxClass,
			inputProps: computed((): Partial<HTMLInputElement> & {
				forceUpdateKey: number
			} => ({
				...field.inputProps,
				checked: field.currentValue ?? false,
				forceUpdateKey: forceUpdateKey.value,
				type: 'checkbox',
			})),
			onChange: (event: { target: HTMLInputElement }) => {
				const newValue = event.target.checked
				field.setValue(typeof newValue === 'boolean' ? newValue : null)

				forceUpdate()
			},
		}
	},
})
</script>

<style lang="scss">
:root {
	--checkbox-border-radius: 0.1rem;
}

.kt-field-checkbox__wrapper {
	display: flex;
	align-items: center;

	&__input {
		// margin-right: 0.4rem;
		display: none;
	}

	&__label {
		display: flex;
		align-items: center;
	}

	&__checkbox {
		display: inline-grid;
		place-items: center;
		width: 0.8rem;
		height: 0.8rem;
		margin-right: 0.4rem;
		background: var(--ui-background);
		border: 1px solid var(--ui-02);
		border-radius: var(--checkbox-border-radius);
		transition: all ease-in-out var(--transition-short);

		&__check {
			opacity: 0;
			transition: all ease-in-out var(--transition-short);
			transform: scale(0.2);
			path {
				stroke: var(--interactive-01);
			}
		}

		&--checked {
			border-color: var(--interactive-01);
			box-shadow: var(--shadow-base),
				0px 0px 0px 1px var(--interactive-01) inset;
			.kt-field-checkbox__wrapper__checkbox__check {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
}
</style>
