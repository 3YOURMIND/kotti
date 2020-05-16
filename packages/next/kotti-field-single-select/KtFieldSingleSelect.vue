<template>
	<KtField ref="ktFieldRef" v-bind="{ field }" :getEmptyValue="() => null">
		<ElSelect
			ref="elSelectRef"
			:class="elSelectClasses"
			:disabled="field.isDisabled"
			filterable
			:placeholder="field.placeholder"
			:value="field.currentValue"
			@change="onChange"
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
		flex: 1;
		display: flex;

		.el-input__inner {
			display: flex;
			align-self: center;
			border: 0;
			color: var(--text-01);
			flex: 1; // don't allow for el-input__suffix
			line-height: 1.6;
			margin: 0;
			outline: none;
			padding: 0;
			width: 100%;
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
	display: flex;
	background: var(--ui-background);
	border-radius: var(--field-border-radius);
	border: 1px solid var(--ui-02);
	/* shadow-base */
	box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
	color: var(--text-01);
	padding: 0;
	margin: 5px 0;
	.el-scrollbar {
		/*
			has 3 children:
				&__wrap,
				&__bar is-horizontal,
				&__bar is-vertical
		*/
		width: 100%;

		&__bar {
			position: absolute;
			right: 2px;
			bottom: 2px;
			z-index: 1;
			border-radius: 4px;
			opacity: 0;
			transition: opacity 120ms ease-out;

			&.is-horizontal {
				height: 6px;
				left: 2px;
			}

			&.is-vertical {
				width: 6px;
				top: 2px;
			}
		}

		&__wrap.el-select-dropdown__wrap {
			display: flex;
			flex: 1;
			margin: 0 !important;
			padding: 0;

			ul.el-scrollbar__view.el-select-dropdown__list {
				display: flex;
				flex-direction: column;
				width: 100%;
				margin: 0;
				padding: 0;

				.el-select-dropdown__item {
					color: var(--text-01);
					flex: 1;
					margin: 0;
					padding: 0.8rem;

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
						cursor: pointer;
					}
				}
			}
		}
	}
}
</style>
