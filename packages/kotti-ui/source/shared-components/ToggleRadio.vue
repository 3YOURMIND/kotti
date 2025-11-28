<template>
	<div
		class="kt-field-radio"
		:class="{
			'kt-field-radio--checked': isChecked,
			'kt-field-radio--is-disabled': isDisabled,
		}"
	>
		<div class="kt-field-radio__inside" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ToggleRadio',
	props: {
		isChecked: {
			default: false,
			type: Boolean,
		},
		isDisabled: {
			default: false,
			type: Boolean,
		},
	},
})
</script>

<style>
:root {
	--radio-size: 0.8rem;
	--radio-inside-side: 0.2rem;
}
</style>

<style lang="scss" scoped>
.kt-field-radio {
	display: grid;
	flex-shrink: 0;
	place-items: center;
	width: var(--radio-size);
	height: var(--radio-size);
	background-color: var(--ui-background);
	border: 1px solid var(--ui-02);
	border-radius: 50%;
	transition: all ease-in-out var(--transition-short);

	&:hover {
		border-color: var(--interactive-01-hover);
	}

	&:active {
		border-color: var(--interactive-01-active);
	}

	&__inside {
		display: block;
		width: var(--radio-inside-side);
		height: var(--radio-inside-side);
		background-color: var(--ui-background);
		border-radius: 50%;
	}

	&--checked {
		background-color: var(--interactive-01);
		border-color: var(--interactive-01);
		box-shadow: var(--shadow-base);

		&:hover {
			background-color: var(--interactive-01-hover);
			border-color: var(--interactive-01-hover);
		}

		&:active {
			background-color: var(--interactive-01-active);
			border-color: var(--interactive-01-active);
		}
	}

	&--is-disabled {
		pointer-events: none;
		border-color: var(--ui-02);

		&.kt-field-radio--checked {
			background-color: var(--ui-02);
			box-shadow: var(--shadow-base);
		}
	}
}
</style>
