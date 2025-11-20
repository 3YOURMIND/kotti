<template>
	<div>
		<ComponentInfo v-bind="{ component }" />
		<div class="overview">
			<div class="overview__component">
				<h4>Component</h4>
				<KtLabel
					class="label-container__label"
					v-bind="componentProps"
					inputId="example-label"
				>
					<template v-if="settings.hasHelpTextSlot" #helpText>
						<div>
							Supports
							<abbr title="Hypertext Markup Language">HTML</abbr> via
							<code>&lt;template #helpText&gt;</code>
						</div>
					</template>
				</KtLabel>
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
						formKey="validationState"
						isOptional
						label="validationState"
						:options="[
							{ label: 'Success', value: 'success' },
							{ label: 'Warning', value: 'warning' },
							{ label: 'Error', value: 'error' },
						]"
					/>
				</div>
				<div>
					<h4>Settings</h4>
					<KtFieldToggle
						formKey="isRequired"
						isOptional
						label="isRequired"
						:size="Kotti.Field.Size.SMALL"
						type="switch"
					/>
				</div>
			</div>
		</KtForm>
	</div>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep.js'
import { computed, defineComponent, ref } from 'vue'

import { Kotti, KtLabel } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

import { generateComponentCode } from '../../../utilities/pages'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLabel',
	components: { ComponentInfo },
	setup() {
		const settings = ref({
			hasHelpTextSlot: false,
			helpDescription: null,
			helpText: null,
			isRequired: false,
			label: 'Label',
			size: 'medium',
			validationState: null,
		})
		const componentProps = computed(() => ({
			helpDescription: settings.value.helpDescription,
			helpText: settings.value.helpText,
			isRequired: settings.value.isRequired,
			label: settings.value.label,
			size: settings.value.size,
			validationState: settings.value.validationState,
		}))

		return {
			component: KtLabel,
			componentCode: computed(() =>
				generateComponentCode({
					contentSlot: null,
					defaultSlot: null,
					hasActions: false,
					hasHelpTextSlot: settings.value.hasHelpTextSlot,
					hasOptionSlot: false,
					hasRemoteUpload: false,
					hasSelectionSlot: false,
					headerSlot: null,
					name: 'KtLabel',
					props: cloneDeep(componentProps.value),
					showDropAreaExtraContentSlot: false,
					showHeaderSideSlot: false,
					validation: 'empty',
				}),
			),
			componentProps,
			Kotti,
			settings,
		}
	},
})
</script>

<style src="../../../styles/form-fields.scss" lang="scss" scoped />

<style lang="scss">
.label-container {
	display: grid;
	grid-template-columns: 2fr 3fr;
	align-items: baseline;

	&__label {
		grid-column: 1 / 3;
	}
}
</style>
