<template lang="md">
	<ComponentInfo v-bind="{ component }" />

	<KtTranslationContext :locale="settings.locale">
		<div class="overview">
			<div class="overview__component">
				<h4>Component</h4>
				<KtFilters
					v-model="filters"
					:columns="componentProps.columns"
					:isLoading="componentProps.isLoading"
				/>
				<div class="overview__component__value">
					<strong>Value</strong>: <span v-text="JSON.stringify(filters)" />
					<a @click.prevent="reset">reset</a>
				</div>
			</div>
			<div class="overview__code">
				<h4>Code</h4>
				<pre v-text="componentCode" />
			</div>
		</div>
		<KtForm v-model="settings">
			<div class="wrapper">
				<div>
					<h4>Settings</h4>
					<KtFieldSingleSelect
						formKey="locale"
						helpText="Can be set via KtTranslationContext"
						hideClear
						label="Language"
						leftIcon="global"
						:options="[
							{ label: 'German (de-DE)', value: 'de-DE' },
							{ label: 'English (en-US)', value: 'en-US' },
							{ label: 'Spanish (es-ES)', value: 'es-ES' },
							{ label: 'French (fr-FR)', value: 'fr-FR' },
							{ label: 'Japanese (ja-JP)', value: 'ja-JP' },
						]"
						:size="Kotti.Field.Size.SMALL"
					/>
					<KtFieldToggleGroup
						formKey="booleanFlags"
						isOptional
						label="Boolean Flags"
						:options="[{ key: 'isLoading', label: 'isLoading' }]"
						:size="Kotti.Field.Size.SMALL"
						type="switch"
					/>
				</div>
				<div>
					<h4>Texts</h4>
					<KtFieldText
						formKey="searchPlaceholder"
						isOptional
						label="placeholder"
						:size="Kotti.Field.Size.SMALL"
					/>
				</div>
			</div>
		</KtForm>
	</KtTranslationContext>
</template>

<script lang="ts">
import { Kotti, KtFilters } from '@3yourmind/kotti-ui'
import { computed, defineComponent, ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import { ComponentValue, generateComponentCode } from '../../utilities'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFilters',
	components: {
		ComponentInfo,
	},
	setup() {
		const filters = ref<Kotti.Filters.Value>([
			{
				key: 'string-column',
				operation: Kotti.Filters.Operation.String.CONTAINS,
				value: null,
			},
			{
				key: 'number-column',
				operation: Kotti.Filters.Operation.Number.EQUAL,
				value: null,
			},
		])

		const settings = ref<{
			booleanFlags: {
				isLoading: boolean
			}
			locale: Kotti.Translation.SupportedLanguages
			searchPlaceholder: Kotti.FieldText.Value
		}>({
			booleanFlags: {
				isLoading: false,
			},
			locale: 'en-US',
			searchPlaceholder: null,
		})

		const componentProps = computed(
			(): Omit<Kotti.Filters.Props, 'value'> => ({
				columns: [
					{
						key: 'global-search',
						label: 'Search',
						placeholder: settings.value.searchPlaceholder,
						type: Kotti.Filters.FilterType.SEARCH,
					},
					{
						key: 'string-column',
						label: 'String Column',
						operations: [
							Kotti.Filters.Operation.String.CONTAINS,
							Kotti.Filters.Operation.String.EQUAL,
							Kotti.Filters.Operation.String.IS_EMPTY,
						],
						type: Kotti.Filters.FilterType.STRING,
					},
					{
						key: 'number-column',
						label: 'Number Column',
						operations: [
							Kotti.Filters.Operation.Number.EQUAL,
							Kotti.Filters.Operation.Number.GREATER_THAN,
							Kotti.Filters.Operation.Number.GREATER_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Number.LESS_THAN,
							Kotti.Filters.Operation.Number.LESS_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Number.IS_EMPTY,
						],
						type: Kotti.Filters.FilterType.NUMBER,
					},
					{
						key: 'boolean-column',
						label: 'Boolean Column',
						operations: [
							Kotti.Filters.Operation.Boolean.EQUAL,
							Kotti.Filters.Operation.Boolean.IS_EMPTY,
						],
						type: Kotti.Filters.FilterType.BOOLEAN,
					},
					{
						key: 'date-range-column',
						label: 'Date Range Column',
						operations: [
							Kotti.Filters.Operation.DateRange.IN_RANGE,
							Kotti.Filters.Operation.DateRange.IS_EMPTY,
						],
						type: Kotti.Filters.FilterType.DATE_RANGE,
					},
					{
						key: 'single-enum-column',
						label: 'Single Enum Column',
						operations: [
							Kotti.Filters.Operation.SingleEnum.EQUAL,
							Kotti.Filters.Operation.SingleEnum.IS_EMPTY,
						],
						options: [
							{ label: 'Option 1', value: 'option-1' },
							{ label: 'Option 2', value: 'option-2' },
							{ label: 'Option 3', value: 'option-3' },
						],
						type: Kotti.Filters.FilterType.SINGLE_ENUM,
					},
					{
						key: 'multi-enum-column',
						label: 'Multi Enum Column',
						operations: [
							Kotti.Filters.Operation.MultiEnum.ONE_OF,
							Kotti.Filters.Operation.MultiEnum.IS_EMPTY,
						],
						options: [
							{ label: 'Option 1', value: 'option-1' },
							{ label: 'Option 2', value: 'option-2' },
							{ label: 'Option 3', value: 'option-3' },
						],
						type: Kotti.Filters.FilterType.MULTI_ENUM,
					},
				],
				isLoading: settings.value.booleanFlags.isLoading,
			}),
		)

		const componentCode = computed<string>(() => {
			const component: ComponentValue = {
				hasHelpTextSlot: false,
				name: 'KtFilters',
				props: cloneDeep(componentProps.value),
				validation: 'empty',
			}
			return generateComponentCode(component)
		})

		const reset = () => (filters.value = [])

		return {
			component: KtFilters,
			componentCode,
			componentProps,
			filters,
			Kotti,
			reset,
			settings,
		}
	},
})
</script>

<style src="../styles/form-fields.scss" lang="scss" scoped />
