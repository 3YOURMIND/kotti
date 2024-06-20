<template>
	<div class="kt-actionbar">
		<div class="kt-actionbar-wrapper">
			<div class="kt-actionbar-header">
				<h1 v-if="headerTitle" v-text="headerTitle" />
				<slot name="actionbar-header" />
			</div>
			<div class="kt-actionbar-body">
				<ActionbarMenu
					v-if="menu.length > 0"
					:menu="menu"
					:menuStyle="menuStyle"
				/>
				<slot name="actionbar-body" />
			</div>
			<div class="kt-actionbar-footer">
				<slot name="actionbar-footer" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ActionbarMenu from './components/ActionbarMenu.vue'
import { KottiActionbar } from './types'
import { makeProps } from '../make-props'

export default defineComponent({
	name: 'KtActionbar',
	components: {
		ActionbarMenu,
	},
	props: makeProps(KottiActionbar.propsSchema),
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

:root {
	--action-bar-color-active: var(--interactive-03);
	--action-bar-width: 16rem;
}

// Action bar element
.kt-actionbar {
	position: relative;
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

.kt-actionbar-back {
	margin-top: 0;
	margin-bottom: 0.8rem;
	margin-left: -0.8rem;
	font-size: 0.7rem;
	font-weight: 600;
	line-height: 1.2rem;
	color: var(--action-bar-color-active);
}

.kt-actionbar-nav {
	margin: 0 calc(-1 * var(--unit-2));

	&__item {
		padding: var(--unit-2);
		margin: var(--unit-2) 0;
		font-size: 0.75rem;
		color: $darkgray-500;
		list-style: none;
		border-radius: 0.2rem;

		&:hover {
			cursor: pointer;
			background: $lightgray-400;
		}

		&--active {
			.kt-actionbar-nav__icon {
				color: var(--action-bar-color-active);
			}

			.kt-actionbar-nav__label {
				font-weight: 600;
				color: var(--action-bar-color-active);
			}
		}

		&--disabled {
			&:hover {
				cursor: not-allowed;
			}

			.kt-actionbar-nav__label,
			.kt-actionbar-nav__icon {
				color: $lightgray-500;
			}
		}
	}

	&__icon {
		padding-right: 0.4rem;
		color: $darkgray-500;

		&--right {
			float: right;
			padding-right: 0;
			padding-left: 0.4rem;
		}
	}

	&__label {
		color: $darkgray-500;
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

@media (width <= $size-md) {
	.kt-actionbar {
		z-index: $zindex-1;
		flex: 1 1 auto;
		width: 100%;
		min-height: auto;
		border-right: 0;
		border-bottom: 1px solid #ddd;

		.kt-actionbar-wrapper {
			position: relative;
			width: 100%;
		}
	}
}
</style>
