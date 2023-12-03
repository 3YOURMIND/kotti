<template>
	<div class="kt-field__header kt-field__header--is-suffix">
		<div class="kt-field__header__label">
			<span :class="labelSuffixClasses" v-text="labelSuffix" />
		</div>
		<div
			v-if="hasHelpText"
			class="kt-field__header__help-text"
			:class="iconClasses('header__help-text', ['interactive'])"
		>
			<div @click.stop.prevent>
				<FieldHelpText :helpText="helpText" :helpTextSlot="helpTextSlot" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import FieldHelpText from '../../kotti-field/components/FieldHelpText.vue'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { KottiFieldToggle } from '../types'

export default defineComponent({
	name: 'ToggleInnerSuffix',
	components: { FieldHelpText },
	props: {
		helpText: { default: null, type: String },
		helpTextSlot: { default: () => [], type: Array },
		hideValidation: { default: false, type: Boolean },
		isEmpty: { default: false, type: Boolean },
		isOptional: { default: false, type: Boolean },
		validation: { default: () => ({}), type: Object },
	},
	setup(props: KottiFieldToggle.InnerSuffix) {
		const validationType = computed(() => props.validation.type)
		const showValidation = computed(
			() => !(props.hideValidation || validationType.value === 'empty'),
		)

		const translations = useTranslationNamespace('KtFields')

		return {
			hasHelpText: computed(
				() => props.helpTextSlot.length >= 1 || props.helpText !== null,
			),
			iconClasses: computed(
				() => (element: string, modifications: string[]) =>
					[
						`kt-field__${element}__icon`,
						...modifications.map(
							(modification) => `kt-field__${element}__icon--${modification}`,
						),
					],
			),
			labelSuffix: computed(() =>
				props.isOptional ? `(${translations.value.optionalLabel})` : '*',
			),
			labelSuffixClasses: computed(() => {
				return {
					'kt-field__header__label__suffix': true,
					'kt-field__header__label__suffix--error':
						showValidation.value && !props.isOptional && props.isEmpty,
				}
			}),
		}
	},
})
</script>
