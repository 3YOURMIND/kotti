<template>
	<label class="ktfield-wrapper">
		<div v-if="labelText !== null" class="ktfield-label" v-text="labelText" />
		<div :class="formFieldGroupClasses">
			<slot name="default" />
		</div>
		<div
			v-if="showValidation"
			:class="formFieldValidationTextClasses"
			v-text="field.validation.value.text"
		/>
	</label>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KottiField } from './types'

export default defineComponent({
	name: 'KtField',
	props: {
		field: { required: true, type: Object },
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setup(props: { field: KottiField.Returns<any> }) {
		const labelText = computed(() =>
			props.field.label.value === null
				? null
				: [
						props.field.label.value,
						props.field.isOptional.value ? '(Optional)' : '(Required)',
				  ].join(' '),
		)

		const showValidation = computed(
			() =>
				props.field.validation.value.type !== null &&
				!props.field.hideValidation.value,
		)

		const formFieldGroupClasses = computed(() => {
			const classes = ['ktfield-form-group']

			if (showValidation.value)
				classes.push(`ktfield-form-group__${props.field.validation.value.type}`)

			return classes
		})

		const formFieldValidationTextClasses = computed(() =>
			showValidation.value
				? [`ktfield-form-group__${props.field.validation.value.type}-text`]
				: [],
		)

		return {
			formFieldGroupClasses,
			formFieldValidationTextClasses,
			labelText,
			showValidation,
		}
	},
})
</script>

<style lang="scss" scoped>
.ktfield-wrapper {
	display: flex;
	flex-direction: column;

	.ktfield-label {
		color: gray;
	}

	.ktfield-form-group {
		padding: 8px;
		border-radius: 4px;
	}

	> * + * {
		margin-top: 8px;
	}
}

.ktfield-form-group {
	border: 1px solid #aaaaaa;

	&__error {
		border-color: #ff4136;

		&-text {
			color: #ff4136;
		}
	}

	&__success {
		border-color: #2ecc40;

		&-text {
			color: #2ecc40;
		}
	}

	&__warning {
		border-color: #ffdc00;

		&-text {
			color: #ffdc00;
		}
	}
}
</style>
