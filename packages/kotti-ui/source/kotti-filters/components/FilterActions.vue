<template>
	<div class="kt-filter__actions">
		<ButtonLink
			:dataTest="dataTest ? `${dataTest}.addFilter` : undefined"
			:isDisabled="isAddDisabled"
			:isLoading="isLoading"
			:label="translations.addFilterLabel"
			@click="handleAdd"
		/>
		<ButtonLink
			:dataTest="dataTest ? `${dataTest}.clearAll` : undefined"
			:isDisabled="isClearAllDisabled"
			:isLoading="isLoading"
			:label="translations.clearAllLabel"
			:type="KottiFilters.ButtonLinkType.DANGER"
			@click="handleClearAll"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { KottiFilters } from '../types'

import ButtonLink from './ButtonLink.vue'

export default defineComponent({
	name: 'FilterActions',
	components: {
		ButtonLink,
	},
	props: {
		dataTest: {
			default: null,
			type: String,
		},
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
	setup(
		_: {
			dataTest: string | null
			isAddDisabled: boolean
			isClearAllDisabled: boolean
			isLoading: boolean
		},
		{ emit },
	) {
		const handleAdd = () => {
			emit('startAddingFilter')
		}
		const handleClearAll = () => {
			emit('clearAll')
		}
		return {
			handleAdd,
			handleClearAll,
			KottiFilters,
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
