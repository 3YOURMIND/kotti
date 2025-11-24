<script lang="ts">
import { defineComponent } from 'vue'

import { KtFieldSingleSelect } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

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
		:formKey="formKey"
		:isOptional="isOptional"
		:label="formKey"
		:options="options"
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
