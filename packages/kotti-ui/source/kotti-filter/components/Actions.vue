<template>
	<div class="kt-filter__actions">
		<ButtonLink
			:isDisabled="isAddDisabled"
			:isLoading="isLoading"
			:label="translations.addFilterLabel"
			@click="handleAdd"
		/>
		<ButtonLink
			:isDisabled="isClearAllDisabled"
			:isLoading="isLoading"
			:label="translations.clearAllLabel"
			:type="Kotti.Filter.ButtonLinkType.DANGER"
			@click="handleClearAll"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'

import ButtonLink from './ButtonLink.vue'

export default defineComponent<{
	isAddDisabled: boolean
	isClearAllDisabled: boolean
	isLoading: boolean
}>({
	name: 'Actions',
	components: {
		ButtonLink,
	},
	props: {
		isAddDisabled: {
			default: false,
			type: Boolean,
		},
		isClearAllDisabled: {
			default: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	setup(_, { emit }) {
		const handleAdd = () => {
			emit('startAddingFilter')
		}
		const handleClearAll = () => {
			emit('clearAll')
		}
		return {
			handleAdd,
			handleClearAll,
			Kotti,
			translations: useTranslationNamespace('KtFilter'),
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-filter__actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: $unit-1;
}
</style>
