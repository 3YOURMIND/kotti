<template>
	<div class="form-group">
		<label class="form-label" v-text="label" />
		<label :class="switchClass">
			<input type="checkbox" :checked="checkboxValue" @change="handleChange" />
			<i class="form-icon" />
			<span v-if="!$slots.default" v-text="switchMessage" />
			<slot />
		</label>
	</div>
</template>

<script>
export default {
	name: 'KtSwitch',
	props: {
		label: [String, Number],
		right: {
			type: Boolean,
			default: false,
		},
		value: {
			type: Boolean,
			default: false,
		},
		activeMessage: {
			type: String,
			default: '',
		},
		inactiveMessage: {
			type: String,
			default: '',
		},
	},
	computed: {
		switchClass() {
			return {
				'form-switch': true,
				'form-switch-right': this.right,
			}
		},
		checkboxValue() {
			return this.value
		},
		switchMessage() {
			return this.checkboxValue ? this.inactiveMessage : this.activeMessage
		},
	},
	methods: {
		handleChange(event) {
			this.$emit('input', event.target.checked)
		},
	},
}
</script>
<style lang="scss">
.form-switch {
	padding-left: ($unit-8 + $control-padding-x);

	.form-icon {
		top: ($control-size-sm - $unit-4) / 2 - $border-width;
		left: 0;
		width: $unit-8;
		height: $unit-4 + $border-width * 2;
		background: var(--ui-02);
		background-clip: padding-box;
		border-radius: $unit-2 + $border-width;

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: $unit-4;
			height: $unit-4;
			content: '';
			background: var(--ui-background);
			border-radius: 50%;
		}
	}

	input {
		&:checked + .form-icon {
			&::before {
				left: 14px;
			}
		}
		&:active + .form-icon {
			&::before {
				background: var(--ui-background);
			}
		}
	}
}

.form-switch.form-switch-right {
	padding-right: ($unit-8 + $control-padding-x);
	padding-left: 0;

	.form-icon {
		right: 0;
		left: auto;
	}
}
</style>
