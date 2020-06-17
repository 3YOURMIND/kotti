<template>
	<label class="form-checkbox">
		<input
			v-model="model"
			v-bind="$attrs"
			class="form-checkbox__input"
			:required="required"
			type="checkbox"
		/>
		<i class="form-icon" />
		<slot>
			<span v-if="hasLabel" class="form-checkbox__label" v-text="labelRep" />
		</slot>
	</label>
</template>

<script>
export default {
	name: 'KtCheckbox',
	props: {
		label: { default: null, type: String },
		required: { default: false, type: Boolean },
		value: { default: false, type: Boolean },
	},
	computed: {
		hasLabel() {
			return this.label && this.label.length
		},
		labelRep() {
			return this.required ? `${this.label} *` : this.label
		},
		model: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('input', value)
			},
		},
	},
}
</script>

<style lang="scss">
@import '../../kotti-style/_variables.scss';

:root {
	--checkbox-color: var(--interactive-01);
}
.form-checkbox {
	.form-icon {
		border-radius: $border-radius;
	}

	input {
		&:focus + .form-icon {
			border-color: var(--checkbox-color);
		}

		&:checked + .form-icon {
			background-color: var(--checkbox-color);
			border-color: var(--checkbox-color);

			&::before {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 6px;
				height: 10px;
				margin-top: -6px;
				margin-left: -3px;
				content: '';
				background-clip: padding-box;
				border: $border-width-lg solid #fff;
				border-top-width: 0;
				border-left-width: 0;
				transform: rotate(45deg);
			}
		}

		&:indeterminate + .form-icon {
			background: var(--checkbox-color);
			border-color: var(--checkbox-color);

			&::before {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 10px;
				height: 2px;
				margin-top: -1px;
				margin-left: -5px;
				content: '';
				background: $lightgray-400;
			}
		}
	}
}
</style>
