<template lang="md">
    <ComponentInfo v-bind="{ component }" />

    <KtI18nContext :currencyMap="{ EUR: { symbol: '€', decimalPlaces: 2 }, USD: { symbol: '$', decimalPlaces: 2 } }" :locale="settings.locale">
    	<div class="overview">
    		<div class="overview__component">
    			<h4>Component</h4>
    			<KtFilters
    				v-model="filters"
    				:columns="componentProps.columns"
    				dataTest="ktFilters"
    				:isLoading="componentProps.isLoading"
    			/>
    			<div class="overview__component-value">
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
    					helpText="Can be set via KtI18nContext"
    					hideClear
    					label="Language"
    					leftIcon="global"
    					:options="[
    						{ label: 'German (de-DE)', value: 'de-DE' },
    						{ label: 'English (en-US)', value: 'en-US' },
    						{ label: 'Spanish (es-ES)', value: 'es-ES' },
    						{ label: 'French (fr-FR)', value: 'fr-FR' },
    						{ label: 'Japanese (ja-JP)', value: 'ja-JP' },
          					{ label: 'Ukranian (uk-UA)', value: 'uk-UA' },
    					]"
    					:size="Kotti.Field.Size.SMALL"
    				/>
    				<KtFieldToggleGroup
    					formKey="booleanFlags"
    					isOptional
    					label="Boolean Flags"
    					:options="[
    						{ key: 'clearOnSelect', label: 'clearOnSelect', tooltip: 'Support on MULTI_ENUM columns type only', },
    						{ key: 'isLoading', label: 'isLoading' },
    						{ key: 'isUnsorted', label: 'isUnsorted', tooltip: 'Support on MULTI_ENUM and SINGLE_ENUM columns type only', },
    					]"
    					:size="Kotti.Field.Size.SMALL"
    					type="switch"
    				/>
    				<h4>Additional Props</h4>
    				<KtFieldNumber
    					formKey="collapseTagsAfter"
    					helpText="Support on MULTI_ENUM columns type only"
    					isOptional
    					label="collapseTagsAfter"
    					:minimum="0"
    				/>
    				<div class="field-row">
    					<KtFieldNumber
    						formKey="numberDecimalPlaces"
    						helpText="Support on FLOAT column type only"
    						isOptional
    						label="decimalPlaces"
    						:minimum="0"
    					/>
    					<KtFieldNumber
    						formKey="numberStep"
    						helpText="Support on FLOAT column type only"
    						isOptional
    						label="step"
    					/>
    				</div>
    				<div class="field-row">
    					<KtFieldNumber
    						formKey="numberMinimum"
    						helpText="Support on FLOAT & INTEGER column types"
    						isOptional
    						label="minimum"
    					/>
    					<KtFieldNumber
    						formKey="numberMaximum"
    						helpText="Support on FLOAT & INTEGER column types"
    						isOptional
    						label="maximum"
    					/>
    				</div>
    				<div class="field-row">
    					<KtFieldDate
    						formKey="dateRangeMaximumDate"
    						helpText="Support on DATE_RANGE column type only"
    						isOptional
    						label="maximumDate"
    					/>
    					<KtFieldDate
    						formKey="dateRangeMinimumDate"
    						helpText="Support on DATE_RANGE column type only"
    						isOptional
    						label="minimumDate"
    					/>
    				</div>
    				<KtFieldToggleGroup
    					formKey="NONE"
    					helpText="Support on DATE_RANGE column type only"
    					isOptional
    					label="shortcuts"
    					:options="shortcutsOptions"
    					:value="selectedShortcuts"
    					@input="onSelectedShortcutsChange"
    				/>
    				<KtFieldSingleSelect
    					formKey="currencyCurrency"
    					helpText='Available Currencies can be defined via <KtI18nContext :currencyMap="..."/>'
    					label="currency"
    					:options="[
    						{ label: 'EUR', value: 'EUR' },
    						{ label: 'USD', value: 'USD' },
    					]"
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
    				<h4>Decoration</h4>
    				<div class="field-row">
    					<KtFieldText
    						formKey="numberPrefix"
    						helpText="Support on FLOAT & INTEGER column types"
    						isOptional
    						label="prefix"
    					/>
    					<KtFieldText
    						formKey="numberSuffix"
    						helpText="Support on FLOAT & INTEGER column types"
    						isOptional
    						label="suffix"
    					/>
    				</div>
    			</div>
    		</div>
    	</KtForm>
    </KtI18nContext>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep.js'
import { computed, defineComponent, ref } from 'vue'

import { Kotti, KtFilters } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

import { getLast, today } from '../../../utilities/date'
import type { ComponentValue } from '../../../utilities/pages'
import { generateComponentCode } from '../../../utilities/pages'

const shortcuts: Record<
	string,
	NonNullable<Kotti.FieldDateRange.Props['shortcuts']>[0]
> = {
	lastMonth: {
		label: 'Last Month',
		value: [getLast('month'), today()],
	},
	lastWeek: {
		label: 'Last Week',
		value: [getLast('week'), today()],
	},
	lastYear: {
		label: 'Last Year',
		value: [getLast('year'), today()],
	},
	today: {
		label: 'Today',
		value: [today(), today()],
	},
}

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFilters',
	components: {
		ComponentInfo,
	},
	setup() {
		const filters = ref<Kotti.Filters.Value>([
			{
				key: 'stringColumn',
				operation: Kotti.Filters.Operation.String.CONTAINS,
				value: null,
			},
			{
				key: 'integerColumn',
				operation: Kotti.Filters.Operation.Integer.EQUAL,
				value: null,
			},
		])

		const settings = ref<{
			booleanFlags: {
				clearOnSelect: boolean
				isLoading: boolean
				isUnsorted: boolean
			}
			collapseTagsAfter: Kotti.FieldNumber.Value
			currencyCurrency: string
			dateRangeMaximumDate: Kotti.FieldDateRange.Props['maximumDate']
			dateRangeMinimumDate: Kotti.FieldDateRange.Props['minimumDate']
			dateRangeShortcuts: Kotti.FieldDateRange.Props['shortcuts']
			locale: Kotti.I18n.SupportedLanguages
			numberDecimalPlaces: Kotti.FieldNumber.Props['decimalPlaces'] | null
			numberMaximum: Kotti.FieldNumber.Props['maximum'] | null
			numberMinimum: Kotti.FieldNumber.Props['minimum'] | null
			numberPrefix: Kotti.FieldNumber.Props['prefix']
			numberStep: Kotti.FieldNumber.Props['step'] | null
			numberSuffix: Kotti.FieldNumber.Props['suffix']
			searchPlaceholder: Kotti.FieldText.Value
		}>({
			booleanFlags: {
				clearOnSelect: false,
				isLoading: false,
				isUnsorted: false,
			},
			collapseTagsAfter: 1,
			currencyCurrency: 'USD',
			dateRangeMaximumDate: null,
			dateRangeMinimumDate: null,
			dateRangeShortcuts: [],
			locale: 'en-US',
			numberDecimalPlaces: null,
			numberMaximum: null,
			numberMinimum: null,
			numberPrefix: null,
			numberStep: null,
			numberSuffix: null,
			searchPlaceholder: null,
		})

		const selectedShortcuts = ref<Kotti.FieldToggleGroup.Value>(
			Object.fromEntries(
				Object.entries(shortcuts).map(([key]) => [key, false]),
			),
		)

		const componentProps = computed(
			(): Omit<Kotti.Filters.Props, 'value'> => ({
				columns: [
					{
						key: 'globalSearch',
						label: 'Search',
						placeholder: settings.value.searchPlaceholder ?? undefined,
						type: Kotti.Filters.FilterType.SEARCH,
					},
					{
						key: 'stringColumn',
						label: 'String Column',
						operations: [
							Kotti.Filters.Operation.String.CONTAINS,
							Kotti.Filters.Operation.String.EQUAL,
							Kotti.Filters.Operation.String.IS_EMPTY,
						],
						type: Kotti.Filters.FilterType.STRING,
					},
					{
						key: 'integerColumn',
						label: 'Integer Column',
						maximum: settings.value.numberMaximum ?? undefined,
						minimum: settings.value.numberMinimum ?? undefined,
						operations: [
							Kotti.Filters.Operation.Integer.EQUAL,
							Kotti.Filters.Operation.Integer.GREATER_THAN,
							Kotti.Filters.Operation.Integer.GREATER_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Integer.LESS_THAN,
							Kotti.Filters.Operation.Integer.LESS_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Integer.IS_EMPTY,
						],
						prefix: settings.value.numberPrefix,
						suffix: settings.value.numberSuffix,
						type: Kotti.Filters.FilterType.INTEGER,
					},
					{
						decimalPlaces: settings.value.numberDecimalPlaces ?? undefined,
						key: 'floatColumn',
						label: 'Float Column',
						maximum: settings.value.numberMaximum ?? undefined,
						minimum: settings.value.numberMinimum ?? undefined,
						operations: [
							Kotti.Filters.Operation.Float.EQUAL,
							Kotti.Filters.Operation.Float.GREATER_THAN,
							Kotti.Filters.Operation.Float.GREATER_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Float.LESS_THAN,
							Kotti.Filters.Operation.Float.LESS_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Float.IS_EMPTY,
						],
						prefix: settings.value.numberPrefix,
						step: settings.value.numberStep ?? undefined,
						suffix: settings.value.numberSuffix,
						type: Kotti.Filters.FilterType.FLOAT,
					},
					{
						currency: settings.value.currencyCurrency,
						key: 'currencyColumn',
						label: 'Currency Column',
						operations: [
							Kotti.Filters.Operation.Currency.EQUAL,
							Kotti.Filters.Operation.Currency.GREATER_THAN,
							Kotti.Filters.Operation.Currency.GREATER_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Currency.LESS_THAN,
							Kotti.Filters.Operation.Currency.LESS_THAN_OR_EQUAL,
							Kotti.Filters.Operation.Currency.IS_EMPTY,
						],
						type: Kotti.Filters.FilterType.CURRENCY,
					},
					{
						key: 'booleanColumn',
						label: 'Boolean Column',
						operations: [
							Kotti.Filters.Operation.Boolean.EQUAL,
							Kotti.Filters.Operation.Boolean.IS_EMPTY,
						],
						type: Kotti.Filters.FilterType.BOOLEAN,
					},
					{
						key: 'dateRangeColumn',
						label: 'Date Range Column',
						maximumDate: settings.value.dateRangeMaximumDate,
						minimumDate: settings.value.dateRangeMinimumDate,
						operations: [
							Kotti.Filters.Operation.DateRange.IN_RANGE,
							Kotti.Filters.Operation.DateRange.IS_EMPTY,
						],
						shortcuts: settings.value.dateRangeShortcuts,
						type: Kotti.Filters.FilterType.DATE_RANGE,
					},
					{
						isUnsorted: settings.value.booleanFlags.isUnsorted,
						key: 'singleEnumColumn',
						label: 'Single Enum Column',
						operations: [
							Kotti.Filters.Operation.SingleEnum.EQUAL,
							Kotti.Filters.Operation.SingleEnum.IS_EMPTY,
						],
						options: [
							{ label: 'Option 2', value: 'option-2' },
							{ label: 'Option 3', value: 'option-3' },
							{ label: 'Option 1', value: 'option-1' },
							{ label: 'Option 5', value: 'option-5' },
							{ label: 'Option 4', value: 'option-4' },
						],
						type: Kotti.Filters.FilterType.SINGLE_ENUM,
					},
					{
						clearOnSelect: settings.value.booleanFlags.clearOnSelect,
						collapseTagsAfter: settings.value.collapseTagsAfter ?? undefined,
						isUnsorted: settings.value.booleanFlags.isUnsorted,
						key: 'multiEnumColumn',
						label: 'Multi Enum Column',
						operations: [
							Kotti.Filters.Operation.MultiEnum.ONE_OF,
							Kotti.Filters.Operation.MultiEnum.IS_EMPTY,
						],
						options: [
							{ label: 'Option 2', value: 'option-2' },
							{ label: 'Option 3', value: 'option-3' },
							{ label: 'Option 1', value: 'option-1' },
							{ label: 'Option 5', value: 'option-5' },
							{ label: 'Option 4', value: 'option-4' },
						],
						type: Kotti.Filters.FilterType.MULTI_ENUM,
					},
				],
				isLoading: settings.value.booleanFlags.isLoading,
			}),
		)

		return {
			component: KtFilters,
			componentCode: computed<string>(() => {
				const component: ComponentValue = {
					contentSlot: null,
					defaultSlot: null,
					hasActions: false,
					hasHelpTextSlot: false,
					hasOptionSlot: false,
					hasRemoteUpload: false,
					hasSelectionSlot: false,
					headerSlot: null,
					name: 'KtFilters',
					props: cloneDeep(componentProps.value),
					showDropAreaExtraContentSlot: false,
					showHeaderSideSlot: false,
					validation: 'empty',
				}
				return generateComponentCode(component)
			}),
			componentProps,
			filters,
			Kotti,
			onSelectedShortcutsChange: (value: Kotti.FieldToggleGroup.Value) => {
				selectedShortcuts.value = value
				settings.value = {
					...settings.value,
					dateRangeShortcuts: Object.entries(selectedShortcuts.value ?? {})
						.filter(([_, value]) => value)
						.map(([key]) => {
							const shortcut = shortcuts[key]
							if (!shortcut) throw new Error('Could not find shortcut')

							return {
								label: shortcut.label,
								value: shortcut.value,
							}
						}),
				}
			},
			reset: () => (filters.value = []),
			selectedShortcuts,
			settings,
			shortcutsOptions: Object.entries(shortcuts).map(([key, value]) => ({
				key,
				label: value.label,
			})),
		}
	},
})
</script>

<style src="../../../styles/form-fields.scss" lang="scss" scoped />
