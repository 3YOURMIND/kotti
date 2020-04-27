<template>
	<label :class="`ktfield-wrapper ${field.classes.wrapper}`">
		<div
			v-if="!field.isLoading"
			:class="`ktfield-label ${field.classes.label}`"
		>
			<div v-if="labelText !== null" v-text="labelText" />
			<div v-if="field.helpText" class="ktfield-label__help-text-container">
				<div class="ktfield-label__help-text-question">?</div>
				<div class="ktfield-label__help-text">{{ field.helpText }}</div>
			</div>
		</div>
		<div
			v-else
			class="skeleton rectangle"
			:style="{ height: '20px', maxWidth: '200px' }"
		/>
		<div v-if="!field.isLoading" :class="formFieldGroupClasses">
			<div
				v-if="field.prefix"
				class="ktfield-form-group__affix"
				v-text="field.prefix"
			/>
			<div
				v-if="field.leftIcon"
				:class="`ktfield-form-group__icon ${field.classes.leftIcon}`"
			>
				<i class="yoco" v-text="field.leftIcon" />
			</div>
			<div :class="`ktfield-form-group__slot ${field.classes.field}`">
				<slot name="default" />
			</div>
			<i
				v-if="!field.hideClear"
				class="yoco"
				style="margin-left: 4px; font-size: 1.25em; cursor: pointer;"
				role="button"
				@click="field.setValue(getEmptyValue())"
				v-text="'circle_cross'"
			/>
			<div
				v-if="field.rightIcon"
				:class="`ktfield-form-group__icon ${field.classes.rightIcon}`"
			>
				<i class="yoco" v-text="field.rightIcon" />
			</div>
			<div
				v-if="field.suffix"
				class="ktfield-form-group__affix"
				v-text="field.suffix"
			/>
		</div>
		<div v-else class="skeleton rectangle" :style="{ height: '40px' }" />
		<div
			v-if="showValidation"
			:class="formFieldValidationTextClasses"
			v-text="field.validation.text"
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
		/**
		 * What’s the appropriate value for an empty field of this data type?
		 * Used when clearing the field. Most likely either null or []
		 */
		getEmptyValue: { required: true, type: Function },
	},
	setup<DATA_TYPE>(props: {
		field: KottiField.Returns<DATA_TYPE>
		getEmptyValue: () => DATA_TYPE
	}) {
		const labelText = computed(() =>
			props.field.label === null
				? null
				: [
						props.field.label,
						props.field.isOptional ? '(Optional)' : '(Required)',
				  ].join(' '),
		)

		const showValidation = computed(
			() => props.field.validation.type !== null && !props.field.hideValidation,
		)

		const formFieldGroupClasses = computed(() => {
			const classes = ['ktfield-form-group']

			if (props.field.classes.group) classes.push(props.field.classes.group)

			if (showValidation.value)
				classes.push(`ktfield-form-group__${props.field.validation.type}`)

			return classes
		})

		const formFieldValidationTextClasses = computed(() =>
			showValidation.value
				? [`ktfield-form-group__${props.field.validation.type}-text`]
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
		position: relative;
		display: flex;
		align-items: center;

		color: gray;

		> * + * {
			margin-left: 5px;
		}

		&__help-text-container {
			&:hover {
				.ktfield-label__help-text {
					display: block;
				}
			}

			.ktfield-label__help-text {
				position: absolute;
				bottom: 20px;

				display: none;

				padding: 5px;

				background-color: #ffffff;
				border: 1px solid #999;
				border-radius: 3px;

				transform: translateX(calc(-50% + 5px));

				&-question {
					display: flex;
					align-items: center;
					justify-content: center;

					width: 15px;
					height: 15px;
					font-size: 12px;

					color: white;
					background-color: #999;
					border-radius: 50%;
				}
			}
		}
	}

	.ktfield-form-group {
		display: flex;
		align-items: center;

		overflow: hidden;
		border-radius: 4px;

		&__affix {
			display: flex;
			align-items: center;
			align-self: stretch;
			justify-content: center;

			padding: 0 4px;
			background-color: #999;
			border: 1px solid #444;
		}

		&__icon {
			display: flex;
			align-items: center;
			align-self: stretch;
			justify-content: center;

			padding: 0 4px;
			background-color: #ccc;
			border: 1px solid #999;
		}

		&__slot {
			flex: 1;
		}
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
