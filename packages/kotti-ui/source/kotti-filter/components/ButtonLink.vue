<template>
	<div class="kt-button-link">
		<span :class="contentClass" @click="handleClick">
			<i v-if="icon !== null" :class="iconClass" v-text="icon" />
			{{ label }}
		</span>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { isYocoIcon } from '../../validators'

export default defineComponent<{
	disabled: boolean
	icon: Yoco.Icon | null
	label: string | null
}>({
	name: 'ButtonLink',
	props: {
		disabled: {
			default: false,
			type: Boolean,
		},
		icon: {
			default: null,
			type: String,
			validator: isYocoIcon,
		},
		label: {
			default: null,
			type: String,
		},
	},
	setup(props, { emit }) {
		const contentClass = computed(() => {
			return {
				disabled: props.disabled,
			}
		})
		const iconClass = computed(() => {
			return props.icon !== null && props.label !== null
				? 'yoco yoco--padding-right'
				: 'yoco'
		})
		const handleClick = (event) => {
			if (props.disabled) return
			emit('click', event)
		}

		return {
			contentClass,
			iconClass,
			handleClick,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-button-link {
	display: flex;
	align-items: center;

	span {
		display: flex;
		align-items: center;
		font-weight: 500;
		color: var(--interactive-01);
		cursor: pointer;

		&.disabled {
			color: var(--text-05);
			cursor: default;
		}
	}

	.yoco {
		font-size: 1rem;

		&--padding-right {
			padding-right: 8px;
		}
	}
}
</style>
