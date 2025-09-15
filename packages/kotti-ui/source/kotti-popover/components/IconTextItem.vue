<template>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
	setup(_, { emit }) {
		return {
			onClick: (event: MouseEvent) => {
				emit('click', event)
			},
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
