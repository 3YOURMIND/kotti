<template>
	<component :is="element" :class="mainClasses" role="button" @click="onClick">
		<i v-if="loading" class="kt-circle-loading" />
		<i v-else-if="icon" class="yoco" v-text="icon" />
		<span v-if="hasSlot"><slot /></span>
		<span v-else v-text="label" />
	</component>
</template>

<script lang="ts">
import { vuePropsValidators } from '@3yourmind/vue-props-validators'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from '@vue/composition-api'

const { props, useProps } = vuePropsValidators.create({
	element: {
		default: () => 'button',
		nullable: false,
		type: vuePropsValidators.Type.STRING,
	},
	icon: {
		default: () => null,
		nullable: true,
		type: vuePropsValidators.Type.ENUM,
		options: Object.values(Yoco.Icon),
	},
	isBlock: {
		default: () => false,
		nullable: false,
		type: vuePropsValidators.Type.BOOLEAN,
	},
	isMultiline: {
		default: () => false,
		nullable: false,
		type: vuePropsValidators.Type.BOOLEAN,
	},
	label: {
		default: () => null,
		nullable: true,
		type: vuePropsValidators.Type.STRING,
	},
	loading: {
		default: () => false,
		nullable: false,
		type: vuePropsValidators.Type.BOOLEAN,
	},
	size: {
		default: () => null,
		nullable: true,
		type: vuePropsValidators.Type.STRING,
	},
	type: {
		default: () => null,
		nullable: true,
		type: vuePropsValidators.Type.STRING,
	},
})

export default defineComponent({
	name: 'KtButton',
	props,
	setup(props, { emit, slots }) {
		useProps(props)

		const hasSlot = computed(() => Boolean(slots.default))
		const isHover = ref(false)

		const onClick = (event) => emit('click', event)

		return {
			mainClasses: computed(() => {
				const classes = ['kt-button', props.type]

				if (props.icon) classes.push('icon')
				if (props.icon && !props.label && !hasSlot.value)
					classes.push('icon-only')
				if (props.isBlock) classes.push('kt-button--is-block')
				if (props.isMultiline) classes.push('kt-button--is-multiline')
				if (props.size === 'small') classes.push('sm')

				return classes
			}),
			hasSlot,
			isHover,
			onClick,
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

:root {
	--default-button-height: var(--unit-8);
	--default-button-line-height: var(--unit-6);
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

	&--is-block {
		display: flex;
		width: 100%;
	}

	&--is-multiline {
		height: auto;
		padding-top: var(--unit-1);
		padding-bottom: var(--unit-1);
		line-height: var(--default-button-line-height);
		&.icon {
			align-items: baseline;
			text-align: left;
			.yoco {
				position: relative;
				left: calc(var(--unit-1) * -1);
			}
		}
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
