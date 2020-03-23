<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<slot name="actionbar-header"> <h1 v-text="headerTitle" /> </slot>
			</div>
			<div class="actionbar-body">
				<slot name="actionbar-body">
					<KtActionBarMenu v-if="menu" :menu="menu" :menuStyle="menuStyle" />
				</slot>
			</div>
			<div class="actionbar-footer">
				<slot name="actionbar-footer"> <footer>Footer</footer> </slot>
			</div>
		</div>
	</div>
</template>
<script>
import KtActionBarMenu from './ActionBarMenu'

export default {
	name: 'KtActionbar',
	components: {
		KtActionBarMenu,
	},
	props: {
		headerTitle: { default: 'Actionbar Header', type: String },
		menu: { default: () => [], type: Array },
		menuStyle: { default: () => ({}), type: Object },
	},
}
</script>
<style lang="scss">
:root {
	--action-bar-color-active: var(--interactive-03);
}
// Action bar eletment
.actionbar {
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex: 0 0 $actionbar-width;
	flex-direction: column;
	width: $actionbar-width;
	min-height: 100vh;
	background: #fcfcfc;
	border-right: 1px solid #ddd;

	.actionbar-wrapper {
		position: fixed;
		display: flex;
		flex-direction: column;
		width: $actionbar-width;
		height: 100%;
		padding: $unit-6;
		overflow-y: auto;
	}

	.actionbar-header {
		flex: 0 0 auto;
	}

	.actionbar-body {
		flex: 1 1 100%;
	}

	.actionbar-footer {
		flex: 1 1 auto;
		padding-top: 1.2rem;
	}
}

.actionbar-back {
	margin-top: 0;
	margin-bottom: 0.8rem;
	margin-left: -0.8rem;
	font-size: 0.7rem;
	font-weight: 600;
	line-height: 1.2rem;
	color: var(--action-bar-color-active);
}
.actionbar-nav {
	margin: 0 -$unit-2;
}
.actionbar-nav__item {
	padding: $unit-2;
	margin: $unit-2 0;
	font-size: 0.75rem;
	color: $darkgray-500;
	list-style: none;
	border-radius: 0.2rem;
	&:hover {
		cursor: pointer;
		background: $lightgray-400;
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

	&--active {
		.actionbar-nav__item__icon {
			color: var(--action-bar-color-active);
		}
		.actionbar-nav__item__label {
			font-weight: 600;
			color: var(--action-bar-color-active);
		}
	}
	&--disabled {
		&:hover {
			cursor: not-allowed;
		}
		.actionbar-nav__item__label,
		.actionbar-nav__item__icon {
			color: $lightgray-500;
		}
	}
}

.actionbar-menu {
	ul {
		position: relative;
		margin: 0;
	}

	li {
		padding: $unit-2 0;
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

@media (max-width: $size-md) {
	.actionbar {
		z-index: $zindex-1;
		flex: 1 1 auto;
		width: 100%;
		min-height: auto;
		border-right: 0;
		border-bottom: 1px solid #ddd;

		.actionbar-wrapper {
			position: relative;
			width: 100%;
		}
	}
}
</style>
