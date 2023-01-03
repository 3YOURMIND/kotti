<template>
	<div class="kt-menu"></div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from '@vue/composition-api'

import { makeProps } from '../make-props'

import { KottiMenu } from './types'

export default defineComponent<KottiMenu.PropsInternal>({
	name: 'KtMenu',
	props: makeProps(KottiMenu.propsSchema),
	setup(props, { emit }) {
		return {}
	},
})
</script>

<style lang="scss" scoped>
.kt-menu {
	margin-bottom: var(--unit-4);
	border-radius: 2px;

	&__header {
		display: flex;
		justify-content: space-between;
		padding: var(--unit-2) var(--unit-8);
		cursor: pointer;
		border: 1px solid var(--ui-02);

		.yoco {
			font-size: 1.2rem;
		}
	}

	&__title {
		display: flex;
		flex-grow: 1;
		align-items: center;
		align-self: center;
		font-size: 16px;
		font-weight: 600;

		&__icon {
			display: inline-block;
			margin-right: var(--unit-4);
			color: var(--accordion-color);
		}

		&__text {
			display: inline-block;
		}
	}

	&__content {
		margin-top: -1px; // prevent border overlap when closed
		overflow: hidden;
		border: 1px solid var(--ui-02);
		border-top: none;

		&__inner {
			padding: var(--unit-2) var(--unit-8);
		}
		&--is-open {
			height: auto;
		}
		&--is-closed {
			height: 0px;
		}
	}

	&__toggle {
		display: flex;
		align-items: center;
		align-self: center;
		margin-left: var(--unit-4);
		color: var(--accordion-color);
		user-select: none;
	}
}
</style>
