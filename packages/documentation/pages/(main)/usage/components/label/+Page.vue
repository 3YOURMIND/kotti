<template>
	<div>
		<ComponentInfo v-bind="{ component }" />
		<KtForm v-model="settings">
			<ComponentForm :component="component" :props="componentProps">
				<template #component-form-settings>
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
				</template>
			</ComponentForm>
		</KtForm>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	Kotti,
	KtFieldSingleSelect,
	KtFieldToggle,
	KtLabel,
} from '@3yourmind/kotti-ui'

import ComponentForm from '~/components/component-form/ComponentForm.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLabel',
	components: {
		ComponentForm,
		ComponentInfo,
		KtFieldSingleSelect,
		KtFieldToggle,
	},
	setup() {
		const settings = ref({
			hasHelpTextSlot: false,
			helpDescription: null,
			helpText: null,
			isRequired: false,
			label: 'Label',
			validationState: null,
		})
		const componentProps = computed(() => ({
			helpDescription: settings.value.helpDescription,
			helpText: settings.value.helpText,
			isRequired: settings.value.isRequired,
			label: settings.value.label,
			validationState: settings.value.validationState,
		}))

		return {
			component: KtLabel,
			componentProps,
			Kotti,
			settings,
		}
	},
})
</script>

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
