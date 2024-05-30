<template>
	<div>
		<ComponentInfo v-bind="{ component }" />
		<KtI18nContext :locale="settings.locale">
			<div class="overview">
				<div class="overview__component">
					<h4>Component</h4>
					<KtValueLabel v-bind="componentProps">
						<div v-if="settings.hasDefaultSlot" v-text="DEFAULT_SLOT_CONTENT" />
						<template v-if="settings.hasHelpTextSlot" #helpText>
							<div>
								Supports
								<abbr title="Hypertext Markup Language">HTML</abbr> via
								<code>&lt;template #helpText&gt;</code>
							</div>
						</template>
					</KtValueLabel>
				</div>
				<div class="overview__code">
					<h4>Code</h4>
					<pre v-text="componentCode" />
				</div>
			</div>
			<KtForm v-model="settings">
				<div class="wrapper">
					<div>
						<h4>Texts</h4>
						<KtFieldText formKey="label" isOptional label="label" />
						<KtFieldText formKey="value" isOptional label="value" />
						<KtFieldText
							formKey="helpDescription"
							isOptional
							label="helpDescription"
						/>
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
						<KtFieldText formKey="dataTest" isOptional label="dataTest" />
						<KtFieldSingleSelect
							formKey="validation"
							isOptional
							label="validation"
							:options="[
								{ label: 'Success', value: 'success' },
								{ label: 'Warning', value: 'warning' },
								{ label: 'Error', value: 'error' },
							]"
						>
							<template #helpText>
								Passed as an object:
								<code>{ type: 'error', message: '' }</code>
							</template>
						</KtFieldSingleSelect>
					</div>
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
							]"
						/>
						<KtFieldToggle
							formKey="isLoading"
							isOptional
							label="isLoading"
							:size="Kotti.Field.Size.SMALL"
							type="switch"
						/>
						<KtFieldToggle
							formKey="isUnset"
							isOptional
							label="isUnset"
							:size="Kotti.Field.Size.SMALL"
							type="switch"
						/>
						<KtFieldToggle
							formKey="hasDefaultSlot"
							isOptional
							label="Use #default Slot"
							type="switch"
						/>
					</div>
				</div>
			</KtForm>
		</KtI18nContext>
		<h2>Usage</h2>
		<p>
			- When stacking labels on top of each other, create a layout that ensure a
			min margin of <code>16px</code> (<code>unit-4</code>) between the various
			value labels.
		</p>
		<p>
			- The last row of the layout where value labels are stacked should not
			contain any extra margin → ensure a good margin is handled on the
			different sections of the more general layout.
		</p>
	</div>
</template>

<script lang="ts">
import { Kotti, KtValueLabel } from '@3yourmind/kotti-ui'
import cloneDeep from 'lodash/cloneDeep'
import { computed, defineComponent, ref } from 'vue'

import { generateComponentCode } from '../../../utilities/pages'

const DEFAULT_SLOT_CONTENT = 'Default slot content'

const createValidation = (
	validation: Kotti.Field.Validation.Result['type'] | null,
) =>
	validation !== null
		? {
				text: `Some Validation Text`,
				type: validation,
			}
		: null

import ComponentInfo from '~/components/ComponentInfo.vue'
export default defineComponent({
	name: 'DocumentationPageUsageComponentsValueLabel',
	components: { ComponentInfo, KtValueLabel },
	setup() {
		const settings = ref({
			dataTest: null,
			hasHelpTextSlot: false,
			helpDescription: null,
			helpText: null,
			isLoading: false,
			isUnset: false,
			label: 'Label',
			locale: 'en-US',
			hasDefaultSlot: false,
			validation: null,
			value: 'Value',
		})
		const componentProps = computed(() => ({
			dataTest: settings.value.dataTest,
			helpDescription: settings.value.helpDescription,
			helpText: settings.value.helpText,
			isLoading: settings.value.isLoading,
			isUnset: settings.value.isUnset,
			label: settings.value.label,
			validation: createValidation(settings.value.validation),
			value: settings.value.value,
		}))

		return {
			component: KtValueLabel,
			componentCode: computed(() =>
				generateComponentCode({
					contentSlot: null,
					defaultSlot: settings.value.hasDefaultSlot
						? DEFAULT_SLOT_CONTENT
						: null,
					hasActions: false,
					hasHelpTextSlot: settings.value.hasHelpTextSlot,
					hasOptionSlot: false,
					hasRemoteUpload: false,
					headerSlot: null,
					name: 'KtValueLabel',
					props: cloneDeep(componentProps.value),
					showHeaderSideSlot: false,
					validation: 'empty',
				}),
			),
			componentProps,
			DEFAULT_SLOT_CONTENT,
			Kotti,
			settings,
		}
	},
})
</script>

<style src="../../../styles/form-fields.scss" lang="scss" scoped />
