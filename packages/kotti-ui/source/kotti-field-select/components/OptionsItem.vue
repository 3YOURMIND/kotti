<template>
	<MenuOptionItem
		ref="optionRef"
		v-bind="{ isDisabled, isSelected }"
		:data-test="dataTest"
		isClickable
		isDraggable
		@click.stop="(e) => $emit('click', e)"
	>
		<slot>
			{{ label }}
		</slot>
	</MenuOptionItem>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { z } from 'zod'

import { makeProps } from '../../make-props'
import MenuOptionItem from '../../shared-components/menu-option/MenuOptionItem.vue'

const propsSchema = z.object({
	dataTest: z.string().nullable().default(null),
	isDisabled: z.boolean().default(false),
	isHovered: z.boolean().default(false),
	isSelected: z.boolean().default(false),
	label: z.string(),
})

export default defineComponent({
	name: 'FieldSelectOptionsItem',
	components: {
		MenuOptionItem,
	},
	props: makeProps(propsSchema),
	emits: ['click', 'scrollTo'],
	setup(props, { emit }) {
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
			{ flush: 'post' },
		)

		return {
			optionRef,
		}
	},
})
</script>
