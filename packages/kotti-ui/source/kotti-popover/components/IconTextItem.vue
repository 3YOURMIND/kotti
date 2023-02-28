<template>
	<div
		class="kt-popover-options-item"
		:class="{
			'kt-popover-options-item--is-active': isActive,
			'kt-popover-options-item--is-clickable': isClickable,
			'kt-popover-options-item--is-disabled': isDisabled,
		}"
		:data-test="dataTest"
		:tabindex="isDisabled || !isClickable ? -1 : 0"
		v-on="$listeners"
	>
		<slot name="option">
			<i v-if="icon" class="yoco" v-text="icon" />
			<div v-if="label" v-text="label" />
		</slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { makeProps } from '../../make-props'
import { IconTextItem } from '../types'

export default defineComponent<IconTextItem.PropsInternal>({
	name: 'IconTextItem',
	props: makeProps(IconTextItem.propsSchema),
})
</script>

<style lang="scss" scoped>
@import '../../kotti-field/mixins';

.kt-popover-options-item {
	@include no-outline;

	display: flex;
	align-items: center;
	padding: var(--unit-2) var(--unit-4);
	user-select: none;
	border-radius: var(--border-radius);

	&--is-active {
		font-weight: 700;
		color: var(--interactive-03);
	}

	&--is-disabled {
		cursor: not-allowed;
		opacity: 0.46;
	}

	&--is-clickable {
		&:not(.kt-popover-options-item--is-disabled) {
			cursor: pointer;

			&:hover {
				background-color: var(--ui-01);
				&.kt-popover-options-item--is-active {
					color: var(--interactive-01-hover);
				}
			}
		}
	}

	.yoco {
		font-size: 1rem;
	}

	> *:not(:first-child) {
		margin-left: var(--unit-1);
	}
}
</style>
