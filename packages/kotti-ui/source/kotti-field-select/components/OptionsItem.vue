<template>
	<div
		:class="classes"
		:data-test="dataTest"
		@click.stop="(e) => $emit('click', e)"
	>
		<slot>
			{{ label }}
		</slot>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { z } from 'zod'

import { makeProps } from '../../make-props'

const propsSchema = z.object({
	dataTest: z.string().nullable().default(null),
	isDisabled: z.boolean().default(false),
	isHovered: z.boolean().default(false),
	isSelected: z.boolean().default(false),
	label: z.string(),
	type: z.enum(['action', 'option']),
})

export default defineComponent<z.output<typeof propsSchema>>({
	name: 'FieldSelectOptionsItem',
	props: makeProps(propsSchema),
	setup(props) {
		return {
			classes: computed(() => ({
				'kt-field-select-options-item': true,
				'kt-field-select-options-item--is-disabled': props.isDisabled,
				'kt-field-select-options-item--is-hovered': props.isHovered,
				'kt-field-select-options-item--is-selected': props.isSelected,
				[`kt-field-select-options-item--is-type-${props.type}`]: true,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-select-options-item {
	display: flex;
	align-items: center;
	padding: var(--unit-2) var(--unit-4);
	cursor: pointer;

	&--is-disabled {
		cursor: not-allowed;
		opacity: 0.46;
	}

	&--is-selected {
		font-weight: 700;
		color: var(--interactive-03);
	}

	&--is-type-action {
		color: var(--interactive-01);
		cursor: pointer;

		&:hover {
			background-color: var(--ui-01);
		}
	}

	&:not(.kt-select-options-item--is-disabled) {
		&:hover,
		&.kt-field-select-options-item--is-hovered {
			background-color: var(--ui-01);

			&.kt-select-options-item--is-selected {
				color: var(--interactive-01-hover);
			}
		}
	}
}
</style>
