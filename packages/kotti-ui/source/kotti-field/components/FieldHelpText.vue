<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'
import {
	computed,
	defineComponent,
	ref,
	h,
	PropType,
} from '@vue/composition-api'
import { roundArrow } from 'tippy.js'
import { VNode } from 'vue'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../../constants'

export default defineComponent({
	name: 'FieldHelpText',
	props: {
		helpText: { default: null, type: String as PropType<string | null> },
		helpTextSlot: { default: () => [], type: Array as PropType<VNode[]> },
	},
	setup(_props) {
		const helpTextContentRef = ref<Element | null>(null)
		const helpTextTriggerRef = ref<Element | null>(null)

		useTippy(
			helpTextTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: helpTextContentRef.value ?? undefined,
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
	render() {
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
					this.helpTextSlot.length > 0 ? this.helpTextSlot : [this.helpText],
				),
			],
		)
	},
})
</script>
