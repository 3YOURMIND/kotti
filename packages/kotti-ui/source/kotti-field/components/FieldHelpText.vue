<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'
import { roundArrow } from 'tippy.js'
import { computed, defineComponent, ref, PropType, h } from 'vue'
import { VNode } from 'vue'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../../constants'

export default defineComponent({
	name: 'FieldHelpText',
	props: {
		helpText: { default: null, type: String as PropType<string | null> },
		helpTextSlot: { default: () => [], type: Array as PropType<VNode[]> },
	},
	setup(props) {
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

		return () =>
			h(
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
							ref: helpTextTriggerRef,
						},
						[Yoco.Icon.CIRCLE_QUESTION],
					),
					h(
						'div',
						{
							ref: helpTextContentRef,
						},
						props.helpTextSlot.length > 0
							? props.helpTextSlot
							: [props.helpText],
					),
				],
			)
	},
})
</script>
