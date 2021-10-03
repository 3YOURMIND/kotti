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
			:type="Kotti.Filters.ButtonLinkType.DANGER"
			@click="handleClearAll"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { Kotti } from '../../types'

import ButtonLink from './ButtonLink.vue'

export default defineComponent<{
	isAddDisabled: boolean
	isClearAllDisabled: boolean
	isLoading: boolean
}>({
	name: 'FilterActions',
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
			translations: useTranslationNamespace('KtFilters'),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-filter__actions {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: var(--unit-1);
}
</style>
