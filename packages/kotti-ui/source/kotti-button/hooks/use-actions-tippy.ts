import { useTippy } from '@3yourmind/vue-use-tippy'
import { Ref, computed, ref, watch } from '@vue/composition-api'
import { Instance } from 'tippy.js'

import { TIPPY_VERTICAL_OFFSET } from '../../constants'

export const useActionsTippy = ({
	isDisabled,
	isLoading,
}: {
	isDisabled: Ref<boolean>
	isLoading: Ref<boolean>
}) => {
	const isTippyOpen = ref(false)
	const tippyContentRef = ref<HTMLDivElement | null>(null)
	const tippyInstanceRef = ref<Instance | null>(null)
	const tippyTriggerRef = ref<HTMLDivElement | null>(null)

	useTippy(
		tippyTriggerRef,
		computed(() => ({
			appendTo: () => document.body,
			arrow: false,
			content: tippyContentRef.value ?? undefined,
			hideOnClick: false,
			interactive: true,
			offset: [0, TIPPY_VERTICAL_OFFSET],
			onClickOutside: () => {
				setIsTippyOpen(false)
			},
			onCreate(instance: Instance) {
				tippyInstanceRef.value = instance
			},
			onHide: () => {
				isTippyOpen.value = false
			},
			onShow: () => {
				if (isDisabled.value || isLoading.value) return false
				isTippyOpen.value = true
			},
			placement: 'bottom-end',
			theme: 'light-border',
			trigger: 'manual',
		})),
	)

	const setIsTippyOpen = (isOpen: boolean) => {
		if (!tippyInstanceRef.value) return

		if (isOpen) tippyInstanceRef.value.show()
		else tippyInstanceRef.value.hide()
	}

	watch(isTippyOpen, (isOpen) => {
		if (!tippyInstanceRef.value || !isOpen) return

		const tippyEl = document.getElementById(
			`tippy-${tippyInstanceRef.value.id}`,
		)

		if (tippyEl) {
			const containerEl = tippyEl.getElementsByClassName('tippy-content')[0]
			containerEl?.setAttribute('style', 'padding: 8px')
		}
	})

	watch(
		[isDisabled, isLoading],
		() => {
			if (isDisabled || isLoading) setIsTippyOpen(false)
		},
		{ immediate: true },
	)

	return {
		isTippyOpen,
		setIsTippyOpen,
		tippyContentRef,
		tippyTriggerRef,
	}
}
