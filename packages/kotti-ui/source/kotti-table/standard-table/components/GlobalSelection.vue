<template>
	<div class="table-global-selection">
		<span v-text="selectionLabel" />
		<KtButton
			class="table-global-selection__clear-all"
			:label="translations.clearAll"
			size="small"
			type="text"
			@click="$emit('emptySelection')"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { pluralize } from '../utilities/translation'

export default defineComponent({
	name: 'GlobalSelection',
	props: {
		selectionCount: {
			required: true,
			type: Number,
		},
	},
	emits: ['emptySelection'],
	setup: (props) => {
		const translations = useTranslationNamespace('KtStandardTable')

		return {
			selectionLabel: computed(() => {
				return pluralize(
					translations.value.selectionCount,
					props.selectionCount,
					{
						count: props.selectionCount,
					},
				)
			}),
			translations,
		}
	},
})
</script>

<style lang="scss" scoped>
.table-global-selection {
	display: flex;
	align-items: center;

	&__clear-all {
		padding: 0 6px;
		margin-left: 6px;
	}
}
</style>
