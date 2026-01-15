<template>
	<ComponentInfo v-bind="{ component }" />

	<KtI18nContext
		:currencyMap="{
			USD: {
				symbol: '$',
				decimalPlaces: 2,
			},
			EUR: {
				symbol: '€',
				decimalPlaces: 2,
			},
		}"
		:locale="settings.locale"
		:numberFormat="{ decimalSeparator: settings.decimalSeparator }"
	>
		<KtForm v-model="values">
			<ComponentForm
				:component="component"
				:hiddenProps="componentProps.hidden"
				:propFormatters="componenPropFormatters"
				:props="componentProps.open"
				:slots="componentSlots"
			>
				<template #component-form-settings>
					<KtForm v-model="settings" size="small">
						<h4>Settings</h4>
						<KtFieldSingleSelect
							formKey="NONE"
							hideClear
							label="Component"
							:modelValue="settings.component"
							:options="componentOptions"
							@update:modelValue="setComponent"
						/>
						<KtFieldSingleSelect
							formKey="size"
							isOptional
							label="Size"
							:options="[
								{ label: 'Small', value: 'small' },
								{ label: 'Medium (Default)', value: 'medium' },
								{ label: 'Large', value: 'large' },
							]"
						/>
						<KtFieldSingleSelect
							v-model="validation"
							formKey="NONE"
							isOptional
							label="Validation State"
							:options="[
								{ label: 'Empty (Default)', value: 'empty' },
								{ label: 'Success', value: 'success' },
								{ label: 'Warning', value: 'warning' },
								{ label: 'Error', value: 'error' },
							]"
						>
							<template #helpText>
								Passed as a validation function:
								<code>() => ({ type: 'error', message: '' })</code>
								or via
								<code>KtForm.validators</code>
							</template>
						</KtFieldSingleSelect>

						<KtFieldToggleGroup
							formKey="booleanFlags"
							isOptional
							label="Boolean Flags"
							:options="[
								{
									isDisabled: !componentDefinition.supports.clear,
									key: 'hideClear',
									label: 'hideClear',
									tooltip: 'Support Varies',
								},
								{ key: 'hideValidation', label: 'hideValidation' },
								{
									isDisabled: !componentDefinition.supports.borderless,
									key: 'isBorderless',
									label: 'isBorderless',
									tooltip: 'Support Varies',
								},
								{ key: 'isDisabled', label: 'isDisabled' },
								{ key: 'isLoading', label: 'isLoading' },
								{ key: 'isOptional', label: 'isOptional' },
							]"
							type="switch"
						/>

						<div
							v-show="
								componentDefinition.additionalProps.includes('emitEvents')
							"
						>
							<h4>Events</h4>
							<KtFieldToggleGroup
								formKey="events"
								isOptional
								:options="[
									{
										key: 'emitBlur',
										label: 'Listen to blur event',
										tooltip:
											'Support Varies. Shows a toast in documentation only.',
									},
									{
										key: 'emitKeyup',
										label: 'Listen to keyup event',
										tooltip:
											'Support Varies. Shows a toast in documentation only.',
									},
									{
										key: 'emitOpen',
										label: 'Listen to open event',
										tooltip:
											'Support Varies. Shows a toast in documentation only.',
									},
								]"
								type="switch"
							/>
						</div>
					</KtForm>
					<KtForm v-model="settings" size="small">
						<h4>Texts</h4>
						<KtFieldText formKey="label" isOptional label="label" />
						<KtFieldText
							formKey="helpDescription"
							isOptional
							label="helpDescription"
						/>
						<KtFieldText formKey="dataTest" isOptional label="dataTest" />

						<div class="field-row">
							<KtFieldText
								formKey="helpText"
								:helpText="
									settings.hasHelpTextSlot
										? 'Not supported when using a #helpText slot'
										: null
								"
								:isDisabled="settings.hasHelpTextSlot"
								isOptional
								label="helpText"
							/>
							<KtFieldToggle
								formKey="hasHelpTextSlot"
								isOptional
								label="Use #helpText Slot"
								type="switch"
							/>
						</div>
						<div class="field-row">
							<KtFieldText
								formKey="placeholder"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.placeholder"
								isOptional
								label="placeholder"
							/>
							<KtFieldText
								v-show="isRangeComponent"
								formKey="placeholder2"
								helpText="On range components, placeholder is an array of two strings"
								isOptional
								label="placeholder2"
							/>
						</div>

						<h4 class="mt-4">Decoration</h4>
						<div class="field-row">
							<KtFieldText
								formKey="prefix"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="prefix"
							/>
							<KtFieldText
								formKey="suffix"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="suffix"
							/>
						</div>
						<div class="field-row">
							<KtFieldSingleSelect
								formKey="leftIcon"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="leftIcon"
								:options="yocoIconOptions"
							>
								<template #option="{ option }">
									<i
										class="yoco"
										style="margin-right: 10px; font-size: 24px"
										v-text="option.value"
									/>
									<span v-text="option.label" />
								</template>
							</KtFieldSingleSelect>
							<KtFieldSingleSelect
								formKey="rightIcon"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="rightIcon"
								:options="yocoIconOptions"
							>
								<template #option="{ option }">
									<i
										class="yoco"
										style="margin-right: 10px; font-size: 24px"
										v-text="option.value"
									/>
									<span v-text="option.label" />
								</template>
							</KtFieldSingleSelect>
						</div>
						<div
							v-show="componentDefinition.supports.autoComplete"
							class="field-row"
						>
							<KtFieldSingleSelect
								formKey="autoComplete"
								helpText="Support Varies. Defaults to 'off'."
								hideClear
								:isOptional="settings.component !== 'KtFieldPassword'"
								isUnsorted
								label="autoComplete"
								:options="autoCompleteOptions"
							/>
							<KtFieldText
								formKey="autoCompleteToken"
								:isDisabled="settings.autoComplete !== 'token'"
								isOptional
								label="<token>"
							>
								<template #helpText>
									A space-separated token-list that describes the meaning of the
									autocompletion value. Learn more in
									<a
										href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values"
										>MDN Docs</a
									>
								</template>
							</KtFieldText>
						</div>

						<KtFormControllerObject formKey="additionalProps">
							<AdditionalProps v-bind="{ componentDefinition }" />
							<AdditionalSlots v-bind="{ componentDefinition }" />
						</KtFormControllerObject>
					</KtForm>
				</template>
				<template v-if="settings.hasHelpTextSlot" #helpText>
					<div>
						Supports
						<abbr title="Hypertext Markup Language">HTML</abbr> via
						<code>&lt;template #helpText&gt;</code>
					</div>
				</template>

				<template
					v-if="settings.additionalProps.showHeaderSideSlot"
					#headerSide
				>
					<a href="#" v-text="'Interactive'" />
				</template>
				<template
					v-if="
						componentDefinition.additionalProps.includes('showContentSlot') &&
						settings.additionalProps.showContentSlot
					"
					#content="{ option }"
				>
					Content for {{ option.label }}
				</template>
				<template
					v-if="
						componentDefinition.additionalProps.includes('showHeaderSlot') &&
						settings.additionalProps.showHeaderSlot
					"
					#header="{ option }"
				>
					Header for {{ option.label }}
				</template>

				<template
					v-if="
						componentDefinition.additionalProps.includes(
							'showDropAreaExtraContentSlot',
						) && settings.additionalProps.showDropAreaExtraContentSlot
					"
					#dropAreaExtraContent
				>
					<KtButton label="Custom action" @click="onDropAreaSlotButtonClick" />
				</template>

				<template
					v-if="
						componentDefinition.additionalProps.includes('showOptionSlot') &&
						settings.additionalProps.showOptionSlot
					"
					#option="{ option }"
				>
					<div style="display: flex; gap: 10px; align-items: center">
						<KtAvatar
							size="sm"
							:src="`https://picsum.photos/seed/${option.label}/100/100`"
						/>
						{{ option.label }}
					</div>
				</template>
			</ComponentForm>
		</KtForm>
	</KtI18nContext>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	Kotti,
	KtAvatar,
	KtButton,
	KtFieldCurrency,
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
	KtFieldFileUpload,
	KtFieldMultiSelect,
	KtFieldMultiSelectRemote,
	KtFieldNumber,
	KtFieldPassword,
	KtFieldRadioGroup,
	KtFieldSingleSelect,
	KtFieldSingleSelectRemote,
	KtFieldText,
	KtFieldTextArea,
	KtFieldToggle,
	KtFieldToggleGroup,
	KtForm,
	KtFormControllerObject,
	KtI18nContext,
} from '@3yourmind/kotti-ui'

import ComponentForm from '~/components/component-form/ComponentForm.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'
import { info } from '~/utilities/toaster'

import AdditionalProps from './AdditionalProps.vue'
import AdditionalSlots from './AdditionalSlots.vue'
import {
	type ComponentNames,
	FIELD_COMPONENTS,
	getInitialSettings,
	getInitialValue,
	getShortcuts,
	radioGroupOptions,
	singleOrMultiSelectOptions,
	toggleGroupOptions,
	yocoIconOptions,
} from './data'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFormFields',
	components: {
		AdditionalProps,
		AdditionalSlots,
		ComponentForm,
		ComponentInfo,
		KtAvatar,
		KtButton,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggle,
		KtFieldToggleGroup,
		KtForm,
		KtFormControllerObject,
		KtI18nContext,
	},
	setup() {
		const values = ref(getInitialValue())

		const remoteSingleSelectQuery =
			ref<Kotti.FieldSingleSelectRemote.Props['query']>(null)

		const settings = ref(getInitialSettings())

		const standAloneValue = ref(null)
		const validation = ref<'empty' | 'error' | 'success' | 'warning' | null>(
			null,
		)

		const componentDefinition = computed(() => {
			const result = FIELD_COMPONENTS.find(
				({ name }) => name === settings.value.component,
			)

			if (!result) throw new Error('Invalid Component Name')

			return result
		})

		const isRangeComponent = computed(() =>
			settings.value.component.includes('Range'),
		)

		// eslint-disable-next-line sonarjs/cognitive-complexity
		const componentProps = computed(() => {
			const standardProps = {
				dataTest: settings.value.dataTest,
				formKey: componentDefinition.value.formKey,
				helpDescription: settings.value.helpDescription,
				helpText: settings.value.helpText,
				hideValidation: settings.value.booleanFlags.hideValidation,
				isDisabled: settings.value.booleanFlags.isDisabled,
				isLoading: settings.value.booleanFlags.isLoading,
				isOptional: settings.value.booleanFlags.isOptional,
				label: settings.value.label,
				size: settings.value.size,
			}

			const additionalProps = {}

			if (componentDefinition.value.supports.clear)
				Object.assign(additionalProps, {
					hideClear: settings.value.booleanFlags.hideClear,
				})

			if (componentDefinition.value.supports.borderless)
				Object.assign(additionalProps, {
					isBorderless: settings.value.booleanFlags.isBorderless,
				})

			if (componentDefinition.value.supports.decoration)
				Object.assign(additionalProps, {
					leftIcon: settings.value.leftIcon,
					prefix: settings.value.prefix,
					rightIcon: settings.value.rightIcon,
					suffix: settings.value.suffix,
				})

			if (componentDefinition.value.supports.placeholder)
				if (isRangeComponent.value) {
					if (
						settings.value.placeholder !== null ||
						settings.value.placeholder2 !== null
					)
						Object.assign(additionalProps, {
							placeholder: [
								settings.value.placeholder,
								settings.value.placeholder2,
							],
						})
				} else
					Object.assign(additionalProps, {
						placeholder: settings.value.placeholder,
					})

			if (componentDefinition.value.supports.tabIndex)
				Object.assign(additionalProps, {
					tabIndex: settings.value.tabIndex,
				})

			if (componentDefinition.value.supports.autoComplete)
				Object.assign(additionalProps, {
					autoComplete:
						settings.value.autoComplete === 'token'
							? settings.value.autoCompleteToken
							: (settings.value.autoComplete ?? undefined),
				})

			if (
				componentDefinition.value.additionalProps.includes('toggleType') &&
				settings.value.additionalProps.toggleType !== 'checkbox' // Exclude Default Value
			)
				Object.assign(additionalProps, {
					type: settings.value.additionalProps.toggleType,
				})
			if (componentDefinition.value.additionalProps.includes('autoSize')) {
				Object.assign(additionalProps, {
					autoSize: settings.value.additionalProps.autoSize,
				})
			}
			if (
				componentDefinition.value.additionalProps.includes(
					'showVisibilityToggle',
				)
			) {
				Object.assign(additionalProps, {
					showVisibilityToggle:
						settings.value.additionalProps.showVisibilityToggle,
				})
			}

			if (componentDefinition.value.additionalProps.includes('rows'))
				Object.assign(additionalProps, {
					rows: settings.value.additionalProps.rows,
				})
			if (componentDefinition.value.additionalProps.includes('maxHeight'))
				Object.assign(additionalProps, {
					maxHeight: settings.value.additionalProps.maxHeight,
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'numberDecimalPlaces',
				) &&
				settings.value.additionalProps.numberDecimalPlaces !== null
			)
				Object.assign(additionalProps, {
					decimalPlaces: settings.value.additionalProps.numberDecimalPlaces,
				})

			if (
				componentDefinition.value.additionalProps.includes('currencyCurrency')
			)
				Object.assign(additionalProps, {
					currency: settings.value.additionalProps.currencyCurrency,
				})

			if (componentDefinition.value.additionalProps.includes('numberAlign'))
				Object.assign(additionalProps, {
					align: settings.value.additionalProps.numberAlign ?? 'left',
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'numberHideChangeButtons',
				)
			)
				Object.assign(additionalProps, {
					hideChangeButtons:
						settings.value.additionalProps.numberHideChangeButtons,
				})

			if (
				componentDefinition.value.additionalProps.includes('numberHideMaximum')
			)
				Object.assign(additionalProps, {
					hideMaximum: settings.value.additionalProps.numberHideMaximum,
				})

			if (componentDefinition.value.additionalProps.includes('numberMaximum'))
				Object.assign(additionalProps, {
					maximum: settings.value.additionalProps.numberMaximum,
				})

			if (componentDefinition.value.additionalProps.includes('numberMinimum'))
				Object.assign(additionalProps, {
					minimum: settings.value.additionalProps.numberMinimum,
				})

			if (
				componentDefinition.value.additionalProps.includes('numberStep') &&
				settings.value.additionalProps.numberStep !== null
			)
				Object.assign(additionalProps, {
					step: settings.value.additionalProps.numberStep,
				})

			if (componentDefinition.value.additionalProps.includes('isInline'))
				Object.assign(additionalProps, {
					isInline: settings.value.additionalProps.isInline,
				})

			if (
				componentDefinition.value.additionalProps.includes('isLoadingOptions')
			)
				Object.assign(additionalProps, {
					isLoadingOptions: settings.value.additionalProps.isLoadingOptions,
				})

			if (componentDefinition.value.additionalProps.includes('isUnsorted'))
				Object.assign(additionalProps, {
					isUnsorted: settings.value.additionalProps.isUnsorted,
				})

			if (componentDefinition.value.additionalProps.includes('maximumDate'))
				Object.assign(additionalProps, {
					maximumDate: settings.value.additionalProps.maximumDate,
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'maximumSelectable',
				) &&
				settings.value.additionalProps.maximumSelectable !== null
			)
				Object.assign(additionalProps, {
					maximumSelectable: settings.value.additionalProps.maximumSelectable,
				})

			if (componentDefinition.value.additionalProps.includes('minimumDate'))
				Object.assign(additionalProps, {
					minimumDate: settings.value.additionalProps.minimumDate,
				})

			if (componentDefinition.value.additionalProps.includes('shortcuts'))
				Object.assign(additionalProps, {
					shortcuts: Object.entries(
						settings.value.additionalProps.shortcuts ?? {},
					)
						.filter(([_, value]) => value)
						.map(([key]) => getShortcuts(settings.value.component)[key]),
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'collapseTagsAfter',
				) &&
				settings.value.additionalProps.collapseTagsAfter !== null
			)
				Object.assign(additionalProps, {
					collapseTagsAfter: settings.value.additionalProps.collapseTagsAfter,
				})
			if (componentDefinition.value.additionalProps.includes('clearOnSelect'))
				Object.assign(additionalProps, {
					clearOnSelect: settings.value.additionalProps.clearOnSelect,
				})

			if (componentDefinition.value.additionalProps.includes('allowMultiple'))
				Object.assign(additionalProps, {
					allowMultiple: settings.value.additionalProps.allowMultiple,
				})
			if (componentDefinition.value.additionalProps.includes('allowPhotos'))
				Object.assign(additionalProps, {
					allowPhotos: settings.value.additionalProps.allowPhotos,
				})
			if (
				componentDefinition.value.additionalProps.includes(
					'collapseExtensionsAfter',
				) &&
				settings.value.additionalProps.collapseExtensionsAfter !== null
			)
				Object.assign(additionalProps, {
					collapseExtensionsAfter:
						settings.value.additionalProps.collapseExtensionsAfter,
				})
			if (componentDefinition.value.additionalProps.includes('extensions'))
				Object.assign(additionalProps, {
					extensions: settings.value.additionalProps.extensions,
				})
			if (componentDefinition.value.additionalProps.includes('externalUrl'))
				Object.assign(additionalProps, {
					externalUrl: settings.value.additionalProps.externalUrl,
				})
			if (
				componentDefinition.value.additionalProps.includes('icon') &&
				settings.value.additionalProps.icon !== null
			)
				Object.assign(additionalProps, {
					icon: settings.value.additionalProps.icon,
				})
			if (
				componentDefinition.value.additionalProps.includes('maxFileSize') &&
				settings.value.additionalProps.maxFileSize !== null
			)
				Object.assign(additionalProps, {
					maxFileSize: settings.value.additionalProps.maxFileSize,
				})

			if (componentDefinition.value.additionalProps.includes('hideDropArea'))
				Object.assign(additionalProps, {
					hideDropArea: settings.value.additionalProps.hideDropArea,
				})
			if (
				[
					'KtFieldMultiSelect',
					'KtFieldMultiSelectRemote',
					'KtFieldSingleSelect',
					'KtFieldSingleSelectRemote',
				].includes(settings.value.component)
			) {
				const options = (
					['KtFieldMultiSelectRemote', 'KtFieldSingleSelectRemote'].includes(
						settings.value.component,
					)
						? singleOrMultiSelectOptions.filter((option) =>
								option.label
									.toLowerCase()
									.includes(
										(remoteSingleSelectQuery.value ?? '').toLowerCase(),
									),
							)
						: singleOrMultiSelectOptions
				).map((option, index) => ({
					...option,
					dataTest: index % 2 === 0 ? String(option.value) : undefined,
				}))

				Object.assign(additionalProps, {
					options,
				})
			}

			if (
				[
					'KtFieldMultiSelect',
					'KtFieldMultiSelectRemote',
					'KtFieldSingleSelect',
					'KtFieldSingleSelectRemote',
				].includes(settings.value.component) &&
				componentDefinition.value.additionalProps.includes('actions')
			)
				Object.assign(additionalProps, {
					actions: [
						{
							label: 'Create Item',
							onClick: () => {
								info({ text: 'actions[0].onClick called' })
							},
						},
						{
							label: 'Edit Item',
							onClick: () => {
								info({ text: 'actions[1].onClick called' })
							},
						},
					],
				})

			if (validation.value !== null) {
				Object.assign(additionalProps, {
					validator: () => ({
						text:
							validation.value === 'empty' ? undefined : 'Some Validation Text',
						type: validation.value,
					}),
				})
			}

			if (settings.value.events.emitBlur) {
				Object.assign(additionalProps, {
					onBlur: () => info({ text: '@blur: field has emitted blur event' }),
				})
			}

			if (settings.value.events.emitKeyup) {
				Object.assign(additionalProps, {
					onKeyup: () =>
						info({ text: '@keyup: field has emitted keyup event' }),
				})
			}

			if (settings.value.events.emitOpen) {
				Object.assign(additionalProps, {
					onOpen: () => info({ text: '@open: field has emitted open event' }),
				})
			}

			if (
				['KtFieldMultiSelectRemote', 'KtFieldSingleSelectRemote'].includes(
					settings.value.component,
				)
			) {
				Object.assign(additionalProps, {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'onUpdate:query': (value: string | null) => {
						remoteSingleSelectQuery.value = value
					},
					query: remoteSingleSelectQuery.value,
				})
			}

			if (['KtFieldRadioGroup'].includes(settings.value.component)) {
				Object.assign(additionalProps, {
					options: radioGroupOptions,
				})
			}

			if (['KtFieldToggleGroup'].includes(settings.value.component))
				Object.assign(additionalProps, {
					options: toggleGroupOptions,
				})

			return {
				hidden: {
					formKey: componentDefinition.value.formKey,
				},
				open: { ...standardProps, ...additionalProps },
			}
		})

		return {
			autoCompleteOptions: computed(() =>
				settings.value.component === 'KtFieldPassword'
					? Object.values(Kotti.FieldPassword.AutoComplete).map((option) => ({
							label: option,
							value: option,
						}))
					: [
							...Object.values(Kotti.Field.AutoComplete).map((option) => ({
								label: option,
								value: option,
							})),
							{ label: '<token>', value: 'token' },
						],
			),
			componenPropFormatters: {
				actions: (value: unknown) =>
					JSON.stringify(value, null, '\t').split('\n'),
				onBlur: () => [
					"() => info({text: '@blur: field has emitted blur event'}",
				],
				onKeyup: () => [
					"() => info({text: '@keyup: field has emitted keyup event'}",
				],
				onOpen: () => [
					"() => info({text: '@open: field has emitted open event'}",
				],
				options: (value: unknown) =>
					JSON.stringify(value, null, '\t').split('\n'),
				placeholder: () => {
					const { placeholder, placeholder2 } = settings.value
					const formatPlaceholder = (placeholder: string | null) =>
						placeholder === null ? 'null' : `'${placeholder}'`

					if (isRangeComponent.value) {
						return [
							`[${formatPlaceholder(placeholder)}, ${formatPlaceholder(placeholder2)}]`,
						]
					}

					return [formatPlaceholder(placeholder)]
				},
				validator: () => {
					if (validation.value === null) return []

					return [
						'() => {(',
						...(validation.value === 'empty'
							? []
							: ["	text: 'Some Validation Text',"]),
						`	type: '${validation.value}',`,
						')}',
					]
				},
			},
			component: computed(
				(): { meta: Kotti.Meta; name: string } =>
					(
						({
							KtFieldCurrency,
							KtFieldDate,
							KtFieldDateRange,
							KtFieldDateTime,
							KtFieldDateTimeRange,
							KtFieldFileUpload,
							KtFieldMultiSelect,
							KtFieldMultiSelectRemote,
							KtFieldNumber,
							KtFieldPassword,
							KtFieldRadioGroup,
							KtFieldSingleSelect,
							KtFieldSingleSelectRemote,
							KtFieldText,
							KtFieldTextArea,
							KtFieldToggle,
							KtFieldToggleGroup,
						}) as Record<string, { meta: Kotti.Meta; name: string }>
					)[settings.value.component],
			),
			componentDefinition,
			componentOptions: FIELD_COMPONENTS.map((comp) => ({
				label: comp.name,
				value: comp.name,
			})),
			componentProps,
			componentSlots: computed(() => {
				const slots = []

				if (settings.value.hasHelpTextSlot) {
					slots.push({
						content: [
							'<div>',
							'	Supports',
							'	<abbr title="Hypertext Markup Language">HTML</abbr> via',
							'	<code>&lt;template #helpText&gt;</code>',
							'</div>',
						],
						name: 'helpText',
					})
				}

				if (
					componentDefinition.value.additionalProps.includes('defaultSlot') &&
					settings.value.additionalProps.defaultSlot !== null
				)
					slots.push({
						content: [settings.value.additionalProps.defaultSlot],
						name: 'default',
					})

				if (
					componentDefinition.value.additionalProps.includes(
						'showContentSlot',
					) &&
					settings.value.additionalProps.showContentSlot
				)
					slots.push({
						content: ['Content for {{ scope.option.label }}'],
						name: 'content',
						scope: 'scope',
					})

				if (
					componentDefinition.value.additionalProps.includes(
						'showHeaderSlot',
					) &&
					settings.value.additionalProps.showHeaderSlot
				)
					slots.push({
						content: ['Header for {{ scope.option.label }}'],
						name: 'header',
						scope: 'scope',
					})

				if (
					componentDefinition.value.additionalProps.includes(
						'showDropAreaExtraContentSlot',
					) &&
					settings.value.additionalProps.showDropAreaExtraContentSlot
				)
					slots.push({
						content: [
							'<KtButton',
							'	label="Custom action"',
							'	@click="info({text: \'Drop Area Slot Button Clicked\'})"',
							'/>',
						],
						name: 'dropAreaExtraContent',
					})

				if (
					componentDefinition.value.additionalProps.includes(
						'showOptionSlot',
					) &&
					settings.value.additionalProps.showOptionSlot
				)
					slots.push({
						content: [
							'<div style="display: flex; gap: 10px; align-items: center">',
							'	<KtAvatar',
							'		size="sm"',
							'		:src="`https://picsum.photos/seed/${scope.option.label}/100/100`"',
							'	/>',
							'	{{ scope.option.label }}',
							'</div>',
						],
						name: 'option',
						scope: 'scope',
					})

				if (settings.value.additionalProps.showHeaderSideSlot)
					slots.push({
						content: ['<a href="#" v-text="\'Interactive\'" />'],
						name: 'headerSide',
					})

				return slots
			}),
			isRangeComponent,
			onDropAreaSlotButtonClick: () => {
				info({ text: 'Drop Area Slot Button Clicked' })
			},
			setComponent: (componentName: ComponentNames) => {
				settings.value.component = componentName
				const formKey =
					FIELD_COMPONENTS.find((comp) => comp.name === componentName)
						?.formKey ?? 'textValue'
				standAloneValue.value = values.value[formKey]
				if (componentName === 'KtFieldPassword') {
					settings.value = {
						...settings.value,
						autoComplete: Kotti.FieldPassword.AutoComplete.CURRENT,
					}
				} else {
					settings.value = {
						...settings.value,
						autoComplete: Kotti.Field.AutoComplete.OFF,
					}
				}
			},
			settings,
			standAloneValue,
			validation,
			values,
			yocoIconOptions,
		}
	},
})
</script>
