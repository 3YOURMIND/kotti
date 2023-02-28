<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'
import { roundArrow } from 'tippy.js'
import { computed, defineComponent, ref } from 'vue'
import { VNode } from 'vue'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../../constants'

export default defineComponent<{
	helpText: string | null
	helpTextSlot: VNode[]
}>({
	name: 'FieldHelpText',
	props: {
		helpText: { default: null, type: String },
		helpTextSlot: { default: () => [], type: Array },
	},
	setup() {
		const helpTextContentRef = ref<Element | null>(null)
		const helpTextTriggerRef = ref<Element | null>(null)

		useTippy(
			helpTextTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: helpTextContentRef.value,
				interactive: true,
				offset: [0, TIPPY_LIGHT_BORDER_ARROW_HEIGHT],
				theme: 'light-border',
			})),
		)

		return {
			helpTextContentRef,
			helpTextTriggerRef,
		}
	},
	render(h) {
		return h(
			'div',
			{
				style: {
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
				},
			},
			[
				h(
					'i',
					{
						class: 'yoco',
						ref: 'helpTextTriggerRef',
					},
					[Yoco.Icon.CIRCLE_QUESTION],
				),
				h(
					'div',
					{
						ref: 'helpTextContentRef',
					},
					/**
					 * Props in render functions are apparently only available via this
					 * @see {@link https://vuejs.org/v2/guide/render-function.html}
					 */
					this.helpTextSlot.length >= 1 ? this.helpTextSlot : [this.helpText],
				),
			],
		)
	},
})
</script>
