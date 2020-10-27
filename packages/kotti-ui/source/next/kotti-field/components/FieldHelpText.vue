<template>
	<div>
		<i
			ref="helpTextTriggerRef"
			class="yoco"
			v-text="Yoco.Icon.CIRCLE_QUESTION"
		/>
		<div ref="helpTextContentRef" v-text="helpText" />
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, ref } from '@vue/composition-api'
import { roundArrow } from 'tippy.js'
import { useTippy } from 'vue-tippy/composition'

const ARROW_HEIGHT = 7

export default defineComponent({
	name: 'FieldHelpText',
	props: {
		helpText: { required: true, type: String },
	},
	setup() {
		const helpTextContentRef = ref<Element | null>(null)
		const helpTextTriggerRef = ref<Element | null>(null)

		useTippy(helpTextTriggerRef, {
			arrow: roundArrow,
			content: helpTextContentRef,
			offset: [0, ARROW_HEIGHT],
			theme: 'light-border',
		})

		return {
			helpTextContentRef,
			helpTextTriggerRef,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import 'tippy.js/dist/tippy.css';
@import 'tippy.js/dist/svg-arrow.css';
@import 'tippy.js/themes/light-border.css';
</style>
