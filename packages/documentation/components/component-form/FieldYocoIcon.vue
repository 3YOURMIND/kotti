<script lang="ts">
import { KtFieldSingleSelect } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'FieldYocoIcon',
	components: {
		KtFieldSingleSelect,
	},
	props: {
		formKey: {
			default: 'icon',
			type: String,
		},
		isOptional: {
			default: false,
			type: Boolean,
		},
	},
	setup() {
		return {
			options: Object.values(Yoco.Icon).map((icon) => ({
				label: icon,
				value: icon,
			})),
		}
	},
})
</script>

<template>
	<KtFieldSingleSelect
		:label="formKey"
		:formKey="formKey"
		:options="options"
		:isOptional="isOptional"
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
</template>
