<template>
	<div>
		<ComponentInfo v-bind="{ component }" />
		<div class="overview">
			<div class="overview__component">
				<h4>Component</h4>
				<KtLabelValue
					:emphasisSize="settings.emphasisSize"
					:emphasisStyle="settings.emphasisStyle"
					:isHorizontal="settings.isHorizontal"
					:label="settings.label || 'Label cannot be empty'"
					:value="settings.value"
				/>
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
					<KtFieldText
						formKey="label"
						label="Label"
						:size="Kotti.Field.Size.SMALL"
					/>
					<KtFieldText
						formKey="value"
						isOptional
						label="Value"
						:size="Kotti.Field.Size.SMALL"
					/>
				</div>
				<div>
					<h4>Settings</h4>
					<KtFieldSingleSelect
						formKey="emphasisSize"
						isOptional
						label="Emphasis Style"
						:options="[
							{ value: EmphasisSize.NONE, label: 'None' },
							{ value: EmphasisSize.MEDIUM, label: 'Medium' },
							{ value: EmphasisSize.LARGE, label: 'Large' },
						]"
						:size="Kotti.Field.Size.SMALL"
						type="switch"
					/>
					<KtFieldSingleSelect
						formKey="emphasisStyle"
						isOptional
						label="Emphasis Style"
						:options="[
							{ value: EmphasisStyle.FULL, label: 'Full' },
							{ value: EmphasisStyle.VALUE, label: 'Value' },
						]"
						:size="Kotti.Field.Size.SMALL"
					/>
					<KtFieldToggle
						formKey="isHorizontal"
						isOptional
						label="Is Horizontal"
						:size="Kotti.Field.Size.SMALL"
						type="switch"
					/>
				</div>
			</div>
		</KtForm>
	</div>
</template>

<script lang="ts">
import { Kotti, KtLabelValue } from '@3yourmind/kotti-ui'
import { computed, defineComponent, ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import { ComponentValue, generateComponentCode } from '../../utilities'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLabelValue',
	components: { ComponentInfo, KtLabelValue },
	setup() {
		const settings = ref({
			emphasisSize: null,
			emphasisStyle: null,
			isHorizontal: false,
			label: 'Numerical Property',
			value: 'Pretty Big',
		})

		return {
			component: KtLabelValue,
			componentCode: computed(() => {
				const component: ComponentValue = {
					hasHelpTextSlot: false,
					name: 'KtLabelValue',
					props: cloneDeep(settings.value),
					validation: 'empty',
				}
				return generateComponentCode(component)
			}),
			EmphasisSize: Kotti.LabelValue.EmphasisSize,
			EmphasisStyle: Kotti.LabelValue.EmphasisStyle,
			Kotti,
			settings,
		}
	},
})
</script>

<style src="../styles/form-fields.scss" lang="scss" scoped />
