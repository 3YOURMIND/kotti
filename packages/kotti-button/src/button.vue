<template>
	<component
		:is="element"
		:class="mainClasses"
		@click="handleClick"
		@mouseover="isHover = true"
		@mouseleave="isHover = false"
		role="button"
	>
		<i v-if="loading" class="kt-circle-loading" />
		<i v-else-if="icon" class="yoco" v-text="icon" />
		<span v-if="hasSlot"> <slot /> </span> <span v-else v-text="label" />
	</component>
</template>

<script>
import color from 'color'

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

$default-button-height: $unit-8;
$large-button-height: $unit-9;
$small-button-height: $unit-6;

// Base style
.kt-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	height: $default-button-height;
	padding: 0 $unit-4;

	font-weight: 600;
	user-select: none;
	border-radius: $border-radius;
	cursor: pointer;
	border: 1px solid transparent;
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
	height: $small-button-height;
}

.kt-button.lg {
	height: $large-button-height;
}

// Color modifier
.kt-button {
	background-color: var(--interactive-02);
	color: var(--interactive-01-hover);
	border-color: var(--ui-02);
	&:hover {
		background-color: var(--interactive-02-hover);
		border-color: var(--interactive-02-hover);
	}
	.kt-circle-loading {
		border-left-color: var(--interactive-01-hover);
		border-bottom-color: var(--interactive-01-hover);
	}
}

.kt-button.primary {
	background-color: var(--interactive-01);
	color: var(--text-04);
	border-color: var(--interactive-01-hover);
	&:hover {
		background-color: var(--interactive-01-hover);
	}
	.kt-circle-loading {
		border-left-color: var(--text-04);
		border-bottom-color: var(--text-04);
	}
}

.kt-button.secondary {
	background-color: var(--interactive-02);
	color: var(--interactive-01-hover);
	border: 1px solid var(--interactive-01-hover);
	&:hover {
		background-color: var(--interactive-02-hover);
	}
}

.kt-button.text {
	background: transparent;
	border-color: transparent;
	&:hover {
		background-color: var(--interactive-02-hover);
	}
}

.kt-button.danger {
	color: var(--danger);
	.kt-circle-loading {
		border-left-color: var(--danger);
		border-bottom-color: var(--danger);
	}
	&:hover {
		color: var(--text-04);
		background-color: var(--danger);
		border-color: transparent;
		.kt-circle-loading {
			border-left-color: var(--text-04);
			border-bottom-color: var(--text-04);
		}
	}
}

// With icon
.kt-button.icon i {
	font-size: 1rem;
	margin-right: 0.2rem;
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
	opacity: 0.46;
	pointer-events: none;
}

.kt-button.bottom {
	min-width: 10rem;
	margin-top: $unit-8;
}
</style>
