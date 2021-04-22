<template lang="md">
	<ComponentInfo v-bind="{ component }" />

	<KtTranslationContext :locale="settings.locale">
		<div class="overview">
			<div class="overview__component">
				<h4>Component</h4>
				<KtFilter
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
import { Kotti, KtFilter } from '@3yourmind/kotti-ui'
import { computed, defineComponent, ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import ComponentInfo from '~/components/ComponentInfo.vue'

const generateCode = (props: object) =>
	[
		'<KtFilter',
		...Object.entries(props)
			.sort(([a], [b]) => a.localeCompare(b))
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, value]) => value !== null && value !== false)
			.filter(
				([key, value]) =>
					!(key === 'size' && value === Kotti.Field.Size.MEDIUM),
			)
			.map(([key, value]) => {
				switch (typeof value) {
					case 'boolean':
						return key
					case 'string':
						return `${key}="${value}"`
					default:
						return `:${key}="${JSON.stringify(value).replace(/"/g, "'")}"`
				}
			})
			.map((prop) => `\t${prop}`),
		'/>',
	].join('\n')

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFilter',
	components: {
		ComponentInfo,
	},
	setup() {
		const filters = ref<Kotti.Filter.Value>([
			{
				key: 'string-column',
				operation: Kotti.Filter.Operation.String.CONTAINS,
				value: null,
			},
			{
				key: 'number-column',
				operation: Kotti.Filter.Operation.Number.EQUAL,
				value: null,
			},
		])

		const settings = ref<{
			booleanFlags: {
				isLoading: Kotti.FieldToggle.Value
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

		const componentProps = computed(() => ({
			columns: [
				{
					key: 'global-search',
					label: 'Search',
					type: Kotti.Filter.FilterType.SEARCH,
					placeholder: settings.value.searchPlaceholder,
				},
				{
					key: 'string-column',
					label: 'String Column',
					type: Kotti.Filter.FilterType.STRING,
				},
				{
					key: 'number-column',
					label: 'Number Column',
					type: Kotti.Filter.FilterType.NUMBER,
				},
				{
					key: 'boolean-column',
					label: 'Boolean Column',
					type: Kotti.Filter.FilterType.BOOLEAN,
				},
				{
					key: 'date-range-column',
					label: 'Date Range Column',
					type: Kotti.Filter.FilterType.DATE_RANGE,
				},
				{
					key: 'single-enum-column',
					label: 'Single Enum Column',
					type: Kotti.Filter.FilterType.SINGLE_ENUM,
					options: [
						{ label: 'Option 1', value: 'option-1' },
						{ label: 'Option 2', value: 'option-2' },
						{ label: 'Option 3', value: 'option-3' },
					],
				},
				{
					key: 'multi-enum-column',
					label: 'Multi Enum Column',
					type: Kotti.Filter.FilterType.MULTI_ENUM,
					options: [
						{ label: 'Option 1', value: 'option-1' },
						{ label: 'Option 2', value: 'option-2' },
						{ label: 'Option 3', value: 'option-3' },
					],
				},
			],
			isLoading: settings.value.booleanFlags.isLoading,
		}))

		const componentCode = computed((): string =>
			generateCode(cloneDeep(componentProps.value)),
		)

		const reset = () => (filters.value = [])

		return {
			component: KtFilter,
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
