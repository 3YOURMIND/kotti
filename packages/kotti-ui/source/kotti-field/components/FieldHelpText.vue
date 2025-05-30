<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { VNode } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'

import { TIPPY_DISTANCE_OFFSET } from '../../constants'

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
				arrow: false,
				content: helpTextContentRef.value ?? undefined,
				interactive: true,
				offset: [0, TIPPY_DISTANCE_OFFSET],
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
