<template>
	<div ref="triggerRef">
		<MenuOptionItem
			v-bind="{ isActive, isClickable, isDisabled }"
			class="kt-popover-options-item"
			:data-test="dataTest"
			:tabindex="isDisabled || !isClickable ? -1 : 0"
			@click.stop="onClick"
		>
			<slot name="option">
				<i v-if="icon" class="yoco" v-text="icon" />
				<div v-if="label" v-text="label" />
			</slot>
		</MenuOptionItem>
		<div v-if="tooltip" ref="contentRef">
			<span v-text="tooltip" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'

import { TIPPY_DISTANCE_OFFSET } from '../../constants'
import { makeProps } from '../../make-props'
import MenuOptionItem from '../../shared-components/menu-option/MenuOptionItem.vue'
import { IconTextItem } from '../types'

export default defineComponent({
	name: 'IconTextItem',
	components: {
		MenuOptionItem,
	},
	props: makeProps(IconTextItem.propsSchema),
	emits: ['click'],
	setup(props, { emit }) {
		const triggerRef = ref<HTMLElement | null>(null)
		const contentRef = ref<HTMLElement | null>(null)

		useTippy(
			triggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: false,
				content: contentRef.value ?? undefined,
				fallbackPlacements: ['left', 'auto'],
				interactive: true,
				offset: [0, TIPPY_DISTANCE_OFFSET],
				placement: 'right',
				theme: 'kt-light-border',
				...(props.tooltip
					? { trigger: 'mouseenter focusin' }
					: { trigger: 'manual' }),
			})),
		)

		return {
			contentRef,
			onClick: (event: MouseEvent) => {
				emit('click', event)
			},
			triggerRef,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-field/mixins';

.kt-popover-options-item {
	display: flex;
	align-items: center;
	user-select: none;

	.yoco {
		font-size: 1rem;
	}

	> *:not(:first-child) {
		margin-left: var(--unit-1);
	}
}
</style>
