<template>
	<div class="kt-filter__actions">
		<ButtonLink
			:isDisabled="isDisabled"
			:isLoading="isLoading"
			:label="translations.addFilterLabel"
			@click="handleAdd"
		/>
		<ButtonLink
			:isDisabled="isDisabled"
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
	isDisabled: boolean
	isLoading: boolean
}>({
	name: 'Actions',
	components: {
		ButtonLink,
	},
	props: {
		isDisabled: {
			required: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		const handleAdd = () => {
			emit('addFilter')
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
