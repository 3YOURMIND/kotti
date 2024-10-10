<template>
	<div class="kt-split-button">
		<KtButton
			class="kt-split-button__primary-action"
			v-bind="primaryActionButtonProps"
			@click="onClickPrimaryAction"
		/>
		<div ref="tippyTriggerRef">
			<KtButton
				:class="secondaryActionsButtonClasses"
				v-bind="secondaryActionsButtonProps"
				@click.stop="onClickSecondaryActions"
			/>
		</div>
		<div ref="tippyContentRef">
			<ActionsItem
				v-for="(action, index) in actions"
				:key="index"
				v-bind="{
					...action,
					hasFocus: isActionInFocus(index),
					index,
					rootDataTest: dataTest,
				}"
				@click="onClickAction"
				@updateIndexInFocus="onUpdateIndexInFocus"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import omit from 'lodash/omit.js'
import {
	computed,
	defineComponent,
	onBeforeUnmount,
	onMounted,
	ref,
	watch,
} from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { makeProps } from '../make-props'

import ActionsItem from './components/ActionsItem.vue'
import { useActionsTippy } from './hooks/use-actions-tippy'
import { KottiSplitButton } from './types'

/**
 * Do not change. UNSET_INDEX is expected to be -1.
 */
const UNSET_INDEX = -1

export default defineComponent({
	name: 'KtSplitButton',
	components: {
		ActionsItem,
	},
	props: makeProps(KottiSplitButton.propsSchema),
	emits: ['click'],
	setup(props, { emit }) {
		const { isTippyOpen, setIsTippyOpen, tippyContentRef, tippyTriggerRef } =
			useActionsTippy({
				isDisabled: computed(() => props.isDisabled),
				isLoading: computed(() => props.isLoading),
			})

		const currentActionIndexInFocus = ref<number>(UNSET_INDEX)

		const hasAvailableActions = computed(() =>
			props.actions.some((action) => !action.isDisabled),
		)

		const getNextAvailableActionIndex = (
			currentIndex: number,
			direction: 'down' | 'up',
		) => {
			if (
				(currentIndex === 0 && direction === 'up') ||
				(currentIndex === props.actions.length - 1 && direction === 'down')
			)
				return currentIndex

			const step = direction === 'down' ? 1 : -1

			for (
				let nextIndex = currentIndex + step;
				nextIndex < props.actions.length && nextIndex >= 0;
				nextIndex += step
			) {
				const action = props.actions[nextIndex]

				if (!action)
					throw new Error(
						`KtSplitButton: action item not found for index: ${String(nextIndex)}`,
					)

				if (!action.isDisabled) return nextIndex
			}

			return currentIndex
		}

		const keydownListener = (event: KeyboardEvent) => {
			if (!hasAvailableActions.value) return

			switch (event.key) {
				case 'ArrowDown': {
					currentActionIndexInFocus.value = getNextAvailableActionIndex(
						currentActionIndexInFocus.value,
						'down',
					)
					break
				}

				case 'ArrowUp': {
					currentActionIndexInFocus.value = getNextAvailableActionIndex(
						currentActionIndexInFocus.value,
						'up',
					)
					break
				}
			}
		}

		onMounted(() => {
			tippyContentRef.value?.addEventListener('keydown', keydownListener, {
				capture: true,
			})
		})

		onBeforeUnmount(() => {
			tippyContentRef.value?.removeEventListener('keydown', keydownListener)
		})

		watch(
			() => isTippyOpen.value,
			(isOpen) => {
				if (!isOpen) currentActionIndexInFocus.value = UNSET_INDEX
				else if (hasAvailableActions.value)
					// Focus the 1st available action item
					currentActionIndexInFocus.value = getNextAvailableActionIndex(
						UNSET_INDEX,
						'down',
					)
			},
		)

		return {
			currentActionIndexInFocus,
			isActionInFocus: (actionIndex: number) =>
				actionIndex === currentActionIndexInFocus.value,
			onClickAction: () => {
				setIsTippyOpen(false)
			},
			onClickPrimaryAction: () => {
				if (props.isDisabled || props.isLoading) return
				emit('click')
			},
			onClickSecondaryActions: () => {
				setIsTippyOpen(!isTippyOpen.value)
			},
			onUpdateIndexInFocus: (index: number) => {
				if (isTippyOpen.value) currentActionIndexInFocus.value = index
			},
			primaryActionButtonProps: computed(() => ({
				...omit(props, ['actions', 'dataTest', 'isDisabled']),
				'data-test': [props.dataTest, 'primary-action']
					.filter(Boolean)
					.join('.'),
				disabled: props.isDisabled,
			})),
			secondaryActionsButtonClasses: computed(() => ({
				'kt-split-button__secondary-actions': true,
				'kt-split-button__secondary-actions--is-active': isTippyOpen.value,
			})),
			secondaryActionsButtonProps: computed(() => ({
				'data-test': [props.dataTest, 'secondary-actions']
					.filter(Boolean)
					.join('.'),
				disabled: props.isDisabled,
				icon: Yoco.Icon.CHEVRON_DOWN,
				size: props.size,
				type: props.type,
			})),
			tippyContentRef,
			tippyTriggerRef,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-split-button {
	display: -webkit-inline-box;

	&__primary-action {
		border-radius: var(--border-radius) 0 0 var(--border-radius);
	}

	&__secondary-actions {
		width: var(--unit-6);
		border-left: 0;
		border-radius: 0 var(--border-radius) var(--border-radius) 0;

		&--is-active {
			&.kt-button--type-default:not(:hover) {
				background-color: var(--primary-20);
				border-color: var(--primary-20);
			}

			&.kt-button--type-primary:not(:hover) {
				background-color: var(--primary-80);
				border-color: var(--primary-80);
			}
		}
	}
}
</style>
