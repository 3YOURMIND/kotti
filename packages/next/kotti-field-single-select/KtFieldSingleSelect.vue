<template>
	<KtField
		ref="ktFieldRef"
		v-bind="{ field }"
		:getEmptyValue="() => null"
		isComponent="div"
	>
		<ElSelect
			ref="elSelectRef"
			:class="elSelectClasses"
			:disabled="field.isDisabled"
			filterable
			:placeholder="field.placeholder"
			:value="field.currentValue"
			@input="onChange"
		>
			<ElOption
				v-for="option in options"
				:key="option.value"
				:label="option.label"
				:value="option.value"
			/>
		</ElSelect>
	</KtField>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	ref,
	onMounted,
	watchEffect,
} from '@vue/composition-api'
import { Select as ElSelect, Option as ElOption } from 'element-ui'

import KtField from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import { KtFieldSingleSelect } from './types'

export default defineComponent({
	name: 'KtFieldSingleSelect',
	components: { ElOption, ElSelect, KtField },
	props: {
		...ktFieldProps,
		options: {
			required: true,
			type: Array,
			validator: (
				value: unknown[],
			): value is KtFieldSingleSelect.Props['options'] =>
				value.every(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(option: any): option is KtFieldSingleSelect.Entry =>
						typeof option === 'object' &&
						option !== null &&
						typeof option.label === 'string' &&
						(option.value === null ||
							['string', 'number', 'boolean'].includes(typeof option.value)),
				),
		},
	},
	setup(props: KtFieldSingleSelect.Props, { emit }) {
		const field = useField<KtFieldSingleSelect.Value>({
			emit,
			isCorrectDataType: (value): value is KtFieldSingleSelect.Value =>
				['string', 'number', 'boolean'].includes(typeof value) ||
				value === null,
			props,
		})

		const elSelectClasses = computed(() => ({
			'el-select--disabled': field.isDisabled,
		}))

		const elSelectRef = ref<ElSelect & { inputWidth: number }>(null)
		const ktFieldRef = ref<typeof KtField>(null)

		watchEffect(() => {
			const elSelectComponent = elSelectRef.value
			const ktFieldComponent = ktFieldRef.value
			if (elSelectComponent === null) throw new Error('el-select not ready')
			if (ktFieldComponent === null) throw new Error('kt-field not ready')

			// just used to add this as a dependency
			elSelectComponent.inputWidth

			const ktFieldContainerElement = ktFieldComponent.$refs
				.inputContainerRef as Element
			const newWidth = ktFieldContainerElement.getBoundingClientRect().width
			const popperComponent = elSelectComponent.$refs.popper as Vue
			const popperElement = popperComponent.$el as HTMLElement

			popperElement.style.width = `${newWidth}px`
			elSelectComponent.inputWidth = newWidth
		})

		onMounted(() => {
			const selectComponent = elSelectRef.value // div.el-select
			if (selectComponent === null) throw new Error('el-select not available')

			const ktFieldComponent = ktFieldRef.value
			if (ktFieldComponent === null) throw new Error('kt-field not available')

			/**
			 * ^ `popperComponent` is an internal `element-ui` component that computes the placement
			 * of the dropdown based on the input element of `el-select`.
			 *
			 * [select.vue]{@link ./node_modules/element-ui/packages/select/src/select.vue} adds `ref="reference"`
			 * to the input.
			 *
			 * [vue-popper.js]{@link ./node_modules/element-ui/src/utils/vue-popper.js} uses `parent.$ref.reference`
			 * to obtain the `referenceElm`.
			 *
			 * So, here, we overwrite the internal property `referenceElm` of the component, to place the dropdown
			 * in accordance to our input component instead (which is accessed by the `$refs.inputContainerRef`)
			 */
			const setUpPopper = () => {
				const popperComponent = selectComponent.$refs.popper as Vue & {
					referenceElm: Element
				}
				const ktFieldInputEl = ktFieldComponent.$refs
					.inputContainerRef as Element

				popperComponent.referenceElm = ktFieldInputEl
			}

			setUpPopper()
		})

		return {
			elSelectClasses,
			elSelectRef,
			field,
			ktFieldRef,
			onChange: (value: KtFieldSingleSelect.Entry['value']) => {
				field.setValue(value)
			},
		}
	},
})
</script>

<style lang="scss">
.el-select {
	display: flex;

	.el-input.el-input--suffix {
		/*
		has 2 children:
			div.el-input__inner
			div.el-input__suffix
		*/
		display: flex;
		flex: 1;

		.el-input__inner {
			display: flex;
			flex: 1; // don't allow for el-input__suffix
			align-self: center;
			width: 100%;
			padding: 0;
			margin: 0;
			line-height: 1.6;
			color: var(--text-01);
			border: 0;
			outline: none;
		}
	}
	// order matters
	&--disabled {
		> .el-input.el-input--suffix > .el-input__inner {
			color: var(--text-05);
		}
	}
}

.el-select-dropdown.el-popper {
	position: absolute;
	z-index: 1001;
	box-sizing: border-box;

	display: flex;
	padding: 0;
	margin: 5px 0;

	color: var(--text-01);
	background: var(--ui-background);
	border: 1px solid var(--ui-02);
	border-radius: var(--field-border-radius);
	/* shadow-base */
	box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);

	&[x-placement^='top'] {
		margin-bottom: 12px;

		.popper__arrow {
			bottom: -6px;
			left: 50%;
			margin-right: 3px;
			border-top-color: var(--ui-02);
			border-bottom-width: 0;

			&:after {
				bottom: 1px;
				margin-left: -6px;
				border-top-color: var(--ui-background);
				border-bottom-width: 0;
			}
		}
	}

	&[x-placement^='right'] {
		margin-left: 12px;

		.popper__arrow {
			top: 50%;
			left: -6px;
			margin-bottom: 3px;
			border-right-color: var(--ui-02);
			border-left-width: 0;

			&:after {
				bottom: -6px;
				left: 1px;
				border-right-color: var(--ui-background);
				border-left-width: 0;
			}
		}
	}

	&[x-placement^='bottom'] {
		margin-top: 12px;

		.popper__arrow {
			top: -6px;
			left: 50%;
			margin-right: 3px;
			border-top-width: 0;
			border-bottom-color: var(--ui-02);

			&:after {
				top: 1px;
				margin-left: -6px;
				border-top-width: 0;
				border-bottom-color: var(--ui-background);
			}
		}
	}

	&[x-placement^='left'] {
		margin-right: 12px;

		.popper__arrow {
			top: 50%;
			right: -6px;
			margin-bottom: 3px;
			border-right-width: 0;
			border-left-color: var(--ui-02);

			&:after {
				right: 1px;
				bottom: -6px;
				margin-left: -6px;
				border-right-width: 0;
				border-left-color: var(--ui-background);
			}
		}
	}

	.popper__arrow {
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		border-width: 6px;

		&,
		&:after {
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
		}

		&:after {
			content: ' ';
			border-width: 6px;
		}
	}

	.el-scrollbar {
		/*
			has 3 children:
				&__wrap,
				&__bar is-horizontal,
				&__bar is-vertical
		*/
		position: relative;
		width: 100%;
		overflow: hidden;

		&__bar {
			position: absolute;
			right: 2px;
			bottom: 2px;
			z-index: 1;
			border-radius: var(--field-border-radius);
			opacity: 0;
			transition: opacity 120ms ease-out;

			&.is-horizontal {
				left: 2px;
				height: 6px;
			}

			&.is-vertical {
				top: 2px;
				width: 6px;
			}
		}

		&:active,
		&:focus,
		&:hover {
			.el-scrollbar__bar {
				opacity: 1;
				transition: opacity 0.34s ease-out;
			}
		}

		&__wrap.el-select-dropdown__wrap {
			display: flex;
			flex: 1;
			// margin: 0 !important;
			// padding: 0;

			height: 100%;
			max-height: 274px;
			overflow: scroll;

			ul.el-scrollbar__view.el-select-dropdown__list {
				display: flex;
				flex-direction: column;
				width: 100%;
				padding: 0;
				margin: 0;

				.el-select-dropdown__item {
					flex: 1;
					padding: 0.8rem;
					margin: 0;
					color: var(--text-01);
					cursor: pointer;

					&.selected {
						color: var(--interactive-03);
						// display: none; // hideSelected
						&.hover {
							color: var(--interactive-01-hover);
						}
					}

					&.hover {
						background-color: var(--ui-01); // var(--interactive-02-hover)
						// color: var(--interactive-01-hover);
					}
				}
			}
		}
	}
}
</style>
