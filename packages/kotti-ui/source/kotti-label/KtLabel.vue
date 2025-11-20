<template>
	<div class="kt-label">
		<div
			v-if="label || hasHelpText || $slots.helpText"
			class="kt-label__header"
		>
			<component
				:is="inputId ? 'label' : 'legend'"
				class="kt-label__label"
				:for="inputId ?? undefined"
				@click="$emit('click', $event)"
			>
				<span class="kt-label-header__label-text" v-text="label" />
				<span
					v-show="labelSuffix"
					:class="labelSuffixClasses"
					v-text="labelSuffix"
				/>
			</component>
			<div v-if="$slots.helpText || hasHelpText" class="kt-label__help-text">
				<FieldHelpText
					:helpText="helpText"
					:helpTextSlot="$slots.helpText ?? helpTextSlot"
				/>
			</div>
		</div>
		<div
			v-if="helpDescription"
			class="kt-label__help-description"
			v-text="helpDescription"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { PropType, VNode } from 'vue'

import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { makeProps } from '../make-props'

import { KottiLabel } from './types'

export default defineComponent({
	name: 'KtLabel',
	components: {
		FieldHelpText,
	},
	props: {
		...makeProps(KottiLabel.propsSchema),
		/**
		 * This is not exposed in the KottiLabel namespace because it should only be used for Kotti internals.
		 */
		helpTextSlot: { default: () => [], type: Array as PropType<VNode[]> },
	},
	emits: ['click'],
	setup(props) {
		return {
			hasHelpText: computed(
				() => props.helpTextSlot.length > 0 || props.helpText !== null,
			),
			labelSuffix: computed(() => (props.isRequired ? '*' : null)),
			labelSuffixClasses: computed(() => {
				return {
					[`kt-label__header-label-suffix--${props.validationState}`]: true,
					'kt-label__header-label-suffix': true,
				}
			}),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-label {
	&__header {
		display: flex;
		gap: 0.2rem;
		font-size: 0.9em;
	}

	&__help-text {
		display: flex;
		align-items: center;
		font-size: 1.4em;
		color: var(--icon-02);
	}

	&__label {
		display: flex;
		align-items: center;
		color: var(--text-02);
	}

	&__header-label-suffix {
		margin-left: 0.2rem;
	}

	&__header-label-suffix--error {
		color: var(--support-error);
	}

	&__header-label-suffix--success {
		color: var(--support-success);
	}

	&__header-label-suffix--warning {
		color: var(--support-warning);
	}

	&__label-text {
		font-weight: 500;
	}

	&__help-description {
		color: var(--text-03);
	}
}
</style>
