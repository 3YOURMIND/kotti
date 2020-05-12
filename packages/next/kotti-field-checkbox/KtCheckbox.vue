<template>
	<div class="kt-checkbox" :class="checkboxClass">
		<svg
			class="kt-checkbox__check"
			fill="none"
			height="8"
			viewBox="0 0 9 8"
			width="9"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1 3.92761L2.92242 6L8 1"
				stroke-linecap="round"
				stroke-width="2"
			/>
		</svg>
	</div>
</template>
<script>
export default {
	name: 'KtCheckbox',
	props: {
		value: {
			required: true,
			type: Boolean,
		},
	},
	computed: {
		checkboxClass() {
			return `kt-checkbox--${this.value ? 'checked' : 'unchecked'}`
		},
	},
}
</script>
<style lang="scss">
.kt-checkbox {
	display: inline-grid;
	place-items: center;
	width: 0.8rem;
	height: 0.8rem;
	margin-right: 0.4rem;
	margin-left: 0.1rem;
	background: var(--ui-background);
	border: 1px solid var(--ui-02);
	border-radius: var(--checkbox-border-radius);
	transition: all ease-in-out var(--transition-short);
	&__check {
		opacity: 0.2;
		transition: all ease-in-out var(--transition-short);
		transform: scale(0.2);
		path {
			stroke: var(--interactive-01);
		}
	}

	&--checked {
		border-color: var(--interactive-01);
		box-shadow: var(--shadow-base), 0px 0px 0px 1px var(--interactive-01) inset;
		.kt-checkbox__check {
			opacity: 1;
			transform: scale(1);
		}
	}
}
</style>
