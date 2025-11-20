<template>
	<KtForm v-model="settings" size="small">
		<ComponentForm :component="KtTag" :props="componentProps">
			<template #component-form-settings>
				<div>
					<h4>Settings</h4>
					<KtFieldText formKey="text" label="Text" />
					<KtFieldText formKey="label" label="Label" />
					<KtFieldToggle
						formKey="isDisabled"
						isOptional
						label="isDisabled"
						type="switch"
					/>
				</div>
			</template>
		</ComponentForm>
	</KtForm>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	Kotti,
	KtFieldText,
	KtFieldToggle,
	KtForm,
	KtTag,
} from '@3yourmind/kotti-ui'

import ComponentForm from '~/components/component-form/ComponentForm.vue'

export default defineComponent({
	name: 'TagForm',
	components: {
		ComponentForm,
		KtFieldText,
		KtFieldToggle,
		KtForm,
	},
	setup() {
		const settings = ref({
			isDisabled: false,
			label: 'Example Label',
			text: 'Example Tag',
		})

		const componentProps = computed(() => ({
			isDisabled: settings.value.isDisabled,
			label: settings.value.isDisabled,
			text: settings.value.text,
		}))

		return {
			componentProps,
			Kotti,
			KtTag,
			settings,
		}
	},
})
</script>
