<template>
	<div :class="classes" :data-test="dataTest" @click="$emit('click', $event)">
		<slot />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'MenuOptionItem',
	props: {
		isActive: {
			default: false,
			type: Boolean,
		},
		isClickable: {
			default: false,
			type: Boolean,
		},
		isDisabled: {
			default: false,
			type: Boolean,
		},
		isSelected: {
			default: false,
			type: Boolean,
		},
	},
	emits: ['click'],
	setup(props) {
		return {
			classes: computed(() => ({
				'menu-options-item': true,
				'menu-options-item--is-active': props.isActive || props.isSelected,
				'menu-options-item--is-clickable': props.isClickable,
				'menu-options-item--is-disabled': props.isDisabled,
				'menu-options-item--is-selected': props.isSelected,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
.menu-options-item {
	padding: var(--unit-2);

	&--is-active {
		background-color: var(--interactive-02-hover);
	}

	&--is-clickable {
		cursor: pointer;

		&:not(.menu-options-item--is-disabled) {
			cursor: pointer;

			&:hover {
				background-color: var(--ui-01);

				&.menu-options-item--is-active {
					color: var(--interactive-01-hover);
				}
			}
		}
	}

	&--is-disabled {
		color: var(--ui-04);
		cursor: not-allowed;
		background-color: var(--ui-01);
	}

	&--is-selected {
		font-weight: 700;
		color: var(--interactive-01);
	}

	&:not(.menu-options-item--is-disabled) {
		&:hover {
			background-color: var(--interactive-02-hover);
		}
	}
}
</style>
