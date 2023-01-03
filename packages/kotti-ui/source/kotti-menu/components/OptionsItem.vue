<template>
	<div ref="optionRef" :class="classes" :data-test="dataTest">
		<slot>
			<template v-if="isSelectable">
				<KtFieldToggle
					:isDisabled="isDisabled"
					:value="isSelected"
					@input="(e) => $emit('update:isSelected', e)"
				>
					<template v-text="label" />
				</KtFieldToggle>
			</template>
			<template v-else @click.stop="(e) => $emit('click', e)" v-text="label">
				{{ label }}
			</template>
		</slot>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { z } from 'zod'

import { makeProps } from '../../make-props'

const propsSchema = z.object({
	dataTest: z.string().nullable().default(null),
	isDisabled: z.boolean().default(false),
	isSelectable: z.boolean().default(false),
	isSelected: z.boolean().default(false),
	isHovered: z.boolean().default(false),
	isActive: z.boolean().default(false),
	label: z.string(),
	type: z.enum(['action', 'option']),
})

export default defineComponent({
	name: 'OptionsItem',
	props: makeProps(propsSchema),
	setup(props: z.output<typeof propsSchema>, { emit }) {
		const optionRef = ref<HTMLDivElement | null>(null)

		watch(
			() => props.isHovered,
			(isHovered, wasHovered) => {
				if (optionRef.value === null)
					throw new Error('Unexpected Unbound option ref: null')

				if (isHovered && !wasHovered) {
					const distanceFromParentTop = optionRef.value.offsetTop

					emit('scrollTo', distanceFromParentTop)
				}
			},
		)

		return {
			classes: computed(() => ({
				'options-item': true,
				'options-item--is-active': props.isActive,
				'options-item--is-disabled': props.isDisabled,
				'options-item--is-hovered': props.isHovered,
				[`options-item--is-type-${props.type}`]: true,
			})),
			optionRef,
		}
	},
})
</script>

<style lang="scss" scoped>
.options-item {
	display: flex;
	align-items: center;
	padding: var(--unit-2) var(--unit-4);
	cursor: pointer;

	&--is-disabled {
		cursor: not-allowed;
		opacity: 0.46;
	}

	&--is-active {
		font-weight: 700;
		color: var(--interactive-03);
	}

	&--is-type-action {
		color: var(--interactive-01);

		&:hover {
			background-color: var(--ui-01);
		}
	}

	&:not(.kt-select-options-item--is-disabled) {
		&:hover,
		&.options-item--is-hovered {
			background-color: var(--ui-01);

			&.kt-select-options-item--is-active {
				color: var(--interactive-01-hover);
			}
		}
	}
}
</style>
