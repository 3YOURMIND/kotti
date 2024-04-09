import { useTippy } from '@3yourmind/vue-use-tippy'
import type { Instance } from 'tippy.js'
import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'

import { TIPPY_DISTANCE_OFFSET } from '../../constants'

export const useActionsTippy = ({
	isDisabled,
	isLoading,
}: {
	isDisabled: Ref<boolean>
	isLoading: Ref<boolean>
}): {
	isTippyOpen: Ref<boolean>
	setIsTippyOpen: (isTippyOpen: boolean) => void
	tippyContentRef: Ref<HTMLDivElement | null>
	tippyTriggerRef: Ref<HTMLDivElement | null>
} => {
	const isTippyOpen = ref(false)
	const tippyContentRef = ref<HTMLDivElement | null>(null)
	const tippyInstanceRef = ref<Instance | null>(null)
	const tippyTriggerRef = ref<HTMLDivElement | null>(null)

	const setIsTippyOpen = (isOpen: boolean) => {
		if (!tippyInstanceRef.value) return

		if (isOpen) tippyInstanceRef.value.show()
		else tippyInstanceRef.value.hide()
	}

	useTippy(
		tippyTriggerRef,
		computed(() => ({
			appendTo: () => document.body,
			arrow: false,
			content: tippyContentRef.value ?? undefined,
			hideOnClick: false,
			interactive: true,
			offset: [0, TIPPY_DISTANCE_OFFSET],
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

	watch(isTippyOpen, (isOpen) => {
		if (!tippyInstanceRef.value || !isOpen) return

		const tippyEl = document.querySelector(
			`#tippy-${tippyInstanceRef.value.id.toString()}`,
		)

		if (tippyEl) {
			const containerEl = tippyEl.querySelector('.tippy-content')
			if (!containerEl) {
				throw new Error('useActionsTippy: container element was not found ')
			}
			containerEl.setAttribute('style', 'padding: 8px')
		}
	})

	watch(
		[isDisabled, isLoading],
		() => {
			if (isDisabled.value || isLoading.value) setIsTippyOpen(false)
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
