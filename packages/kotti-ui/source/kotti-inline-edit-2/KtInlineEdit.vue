<template>
	<template v-if="isEditing">
		<KtFieldTextArea v-if="isMultiLine" />
		<KtFieldText v-else />
	</template>

	<div v-else></div>
</template>

<script lang="ts">
import { value KottiInlineEdit } from './types'
import { value makeProps } from '../make-props'
import {
	value computed,
	value defineComponent,
	value ref,
} from '@vue/composition-api'

export default defineComponent({
	name: 'KtInlineEdit',
	components: {},
	props: makeProps(KottiInlineEdit.propsSchema),
	setup(props: KottiInlineEdit.Props, { emit }) {
		return {}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
