<template>
	<component
		:is="element"
		:class="mainClasses"
		role="button"
		@click="handleClick"
	>
		<i v-if="loading" class="kt-circle-loading" />
		<i v-else-if="icon" class="yoco" v-text="icon" />
		<span v-if="hasSlot"> <slot /> </span> <span v-else v-text="label" />
	</component>
</template>
<script>
export default {
	name: 'KtButton',
	props: {
		icon: { default: '', type: String },
		element: { type: String, default: 'button' },
		label: { default: null, type: String },
		loading: { default: false, type: Boolean },
		size: { default: null, type: String },
		type: { default: null, type: String },
	},
	data() {
		return {
			isHover: false,
		}
	},
	computed: {
		hasSlot() {
			return Boolean(this.$slots.default)
		},
		mainClasses() {
			const classes = ['kt-button', this.type, this.objectClass]
			if (this.size === 'small') classes.push('sm')
			if (this.size === 'large') classes.push('lg')
			return classes
		},
		objectClass() {
			return {
				icon: this.icon,
				'icon-only': this.icon && !this.$slots.default && !this.label,
			}
		},
	},
	methods: {
		handleClick(event) {
			this.$emit('click', event)
		},
	},
}
</script>

<style lang="scss">
@import '../../kotti-style/_variables.scss';
:root {
	--default-button-height: var(--unit-8);
	--large-button-height: var(--unit-9);
	--small-button-height: var(--unit-6);
	--button-main-color: var(--interactive-01);
	--button-main-color-dark: var(--interactive-01-hover);
	--button-main-color-light: var(--interactive-02-hover);
}

// Base style
.kt-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;

	height: var(--default-button-height);
	padding: 0 var(--unit-4);

	font-weight: 600;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	border-radius: $border-radius;
	transition: 30ms opacity ease-in-out;

	&:active {
		opacity: 0.85;
	}

	&.tooltip::after {
		font-size: $font-size-sm;
		text-transform: none;
	}
}

// Size modifiers
.kt-button.sm {
	height: var(--small-button-height);
}

.kt-button.lg {
	height: var(--large-button-height);
}

// Color modifier
/* stylelint-disable-next-line */
.kt-button {
	color: var(--button-main-color-dark);
	background-color: var(--interactive-02);
	border-color: var(--ui-02);
	&:hover {
		background-color: var(--button-main-color-light);
		border-color: var(--button-main-color-light);
	}
	.kt-circle-loading {
		border-bottom-color: var(--button-main-color-dark);
		border-left-color: var(--button-main-color-dark);
	}
}

.kt-button.primary {
	color: var(--text-04);
	background-color: var(--button-main-color);
	border-color: var(--button-main-color-dark);
	&:hover {
		background-color: var(--button-main-color-dark);
	}
	.kt-circle-loading {
		border-bottom-color: var(--text-04);
		border-left-color: var(--text-04);
	}
}

.kt-button.secondary {
	color: var(--button-main-color-dark);
	background-color: var(--interactive-02);
	border: 1px solid var(--button-main-color-dark);
	&:hover {
		background-color: var(--button-main-color-light);
	}
}

.kt-button.text {
	background: transparent;
	border-color: transparent;
	&:hover {
		background-color: var(--button-main-color-light);
	}
}

.kt-button.danger {
	color: var(--danger);
	.kt-circle-loading {
		border-bottom-color: var(--danger);
		border-left-color: var(--danger);
	}
	&:hover {
		color: var(--text-04);
		background-color: var(--danger);
		border-color: transparent;
		.kt-circle-loading {
			border-bottom-color: var(--text-04);
			border-left-color: var(--text-04);
		}
	}
}

// With icon
.kt-button.icon i {
	margin-right: 0.2rem;
	font-size: 1rem;
}

.kt-button.icon-only {
	padding: 0 0.3rem;
	i {
		margin-right: 0;
	}
}

// Disabled button
.kt-button.disabled,
.kt-button:disabled {
	pointer-events: none;
	opacity: 0.46;
}

.kt-button.bottom {
	min-width: 10rem;
	margin-top: var(--unit-8);
}
</style>
