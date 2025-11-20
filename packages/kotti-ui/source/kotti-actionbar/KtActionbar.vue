<template>
	<div class="kt-actionbar">
		<div class="kt-actionbar-wrapper">
			<div class="kt-actionbar-header">
				<h1 v-if="headerTitle" v-text="headerTitle" />
				<slot name="actionbar-header" />
			</div>
			<div class="kt-actionbar-body">
				<ul v-if="menu.length > 0" class="kt-actionbar-nav">
					<component
						:is="item.component"
						v-for="(item, index) in parsedMenu"
						:key="index"
						v-bind="item.props"
						@click="$emit('menuItemClick', item)"
					>
						<li :class="navItemClass(item)">
							<i
								class="yoco kt-actionbar-nav__icon"
								:class="`kt-actionbar-nav__icon--is-${menuStyle.iconPosition}`"
								v-text="item.icon"
							/>
							<span class="kt-actionbar-nav__label" v-text="item.label" />
						</li>
					</component>
				</ul>
				<slot name="actionbar-body" />
			</div>
			<div class="kt-actionbar-footer">
				<slot name="actionbar-footer" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { makeProps } from '../make-props'

import { KottiActionbar } from './types'

export default defineComponent({
	name: 'KtActionbar',
	props: makeProps(KottiActionbar.propsSchema),
	emits: ['menuItemClick'],
	setup(props) {
		return {
			navItemClass: (item: KottiActionbar.MenuItem) => ({
				'kt-actionbar-nav__item': true,
				'kt-actionbar-nav__item--is-active': item.active,
				'kt-actionbar-nav__item--is-disabled': item.disabled,
			}),
			parsedMenu: computed(() =>
				KottiActionbar.propsSchema.shape.menu.parse(props.menu),
			),
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables';

:root {
	--action-bar-color-active: var(--interactive-03);
	--action-bar-width: 16rem;
}

.kt-actionbar {
	box-sizing: border-box;
	display: flex;
	flex: 0 0 var(--action-bar-width);
	flex-direction: column;
	width: var(--action-bar-width);
	min-height: 100vh;
	background: #fcfcfc;
	border-right: 1px solid #ddd;

	.kt-actionbar-wrapper {
		position: fixed;
		display: flex;
		flex-direction: column;
		width: var(--action-bar-width);
		height: 100%;
		padding: var(--unit-6);
		overflow-y: auto;
	}

	.kt-actionbar-header {
		flex: 0 0 auto;
	}

	.kt-actionbar-body {
		flex: 1 1 100%;
	}

	.kt-actionbar-footer {
		flex: 1 1 auto;
		padding-top: 1.2rem;
	}
}

.kt-actionbar-nav {
	margin: 0 calc(-1 * var(--unit-2));

	&__item {
		padding: var(--unit-2);
		margin: var(--unit-2) 0;
		font-size: 0.75rem;
		color: var(--text-01);
		cursor: pointer;
		list-style: none;
		border-radius: 0.2rem;

		&:not(&--is-disabled):hover {
			background: var(--ui-02);
		}

		&--is-active {
			font-weight: 600;
			color: var(--action-bar-color-active);
		}

		&--is-disabled {
			color: var(--text-05);
			cursor: not-allowed;
		}
	}

	&__icon {
		padding-right: 0.4rem;

		&--is-right {
			float: right;
			padding-right: 0;
			padding-left: 0.4rem;
		}
	}
}

.kt-actionbar-menu {
	ul {
		position: relative;
		margin: 0;
	}

	li {
		padding: var(--unit-2) 0;
		font-size: 0.75rem;
		color: $darkgray-500;
		list-style: none;
	}

	a {
		text-decoration: none;
	}

	i {
		color: $lightgray-500;
	}

	&.has-icon-right i {
		float: right;
	}

	.router-link-active {
		li {
			font-weight: 600;
			color: var(--action-bar-color-active);
		}

		i {
			color: var(--action-bar-color-active);
		}
	}
}

@media (width < $size-md) {
	.kt-actionbar {
		z-index: 100;
		flex: 1 1 auto;
		width: 100%;
		min-height: auto;
		border-right: 0;
		border-bottom: 1px solid #ddd;

		.kt-actionbar-wrapper {
			position: static;
			width: 100%;
		}
	}
}
</style>
