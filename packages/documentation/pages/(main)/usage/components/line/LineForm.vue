<template>
	<KtForm v-model="settings" size="small">
		<ComponentForm :component="KtLine" :props="componentProps">
			<template #component-form-settings>
				<div>
					<h4>Settings</h4>
					<KtFieldText formKey="text" label="Text" />
					<KtFieldSingleSelect
						formKey="position"
						label="Position"
						:options="positionOptions"
					/>
					<KtFieldToggle
						formKey="isInteractive"
						isOptional
						label="isInteractive"
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
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggle,
	KtForm,
	KtLine,
} from '@3yourmind/kotti-ui'

import ComponentForm from '~/components/component-form/ComponentForm.vue'
import { info } from '~/utilities/toaster'

export default defineComponent({
	name: 'LineForm',
	components: {
		ComponentForm,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggle,
		KtForm,
	},
	setup() {
		const settings = ref({
			isInteractive: false,
			position: Kotti.Line.Position.CENTER,
			text: 'Example Line',
		})

		const componentProps = computed(() => ({
			isInteractive: settings.value.isInteractive,
			onClick: settings.value.isInteractive
				? () => info({ text: 'Line Clicked!' })
				: undefined,
			position: settings.value.position,
			text: settings.value.text === '' ? undefined : settings.value.text,
		}))

		const positionOptions = Object.entries(Kotti.Line.Position).map(
			([_, value]) => ({
				label: value,
				value,
			}),
		)

		return {
			componentProps,
			Kotti,
			KtLine,
			positionOptions,
			settings,
		}
	},
})
</script>
