<template>
	<div :class="avatarGroupClasses">
		<KtAvatar v-if="avatarRemainders > 0" class="kt-avatar-number">
			<span v-text="`+${avatarRemainders}`" />
		</KtAvatar>
		<KtAvatar
			v-for="(item, index) in visibleItems"
			:key="index"
			:isHoverable="isHoverable"
			:isSelected="item.isSelected"
			:isSmall="item.isSmall"
			:name="item.name"
			:showTooltip="showTooltip"
			:src="item.src"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { KtAvatar } from '../kotti-avatar/'

import { KottiAvatarGroup } from './types'

export default defineComponent<KottiAvatarGroup.PropsInternal>({
	name: 'KtAvatarGroup',
	components: {
		KtAvatar,
	},
	props: {
		isHoverable: { type: Boolean, default: false },
		isStack: { type: Boolean, default: false },
		items: { type: Array, default: () => [] },
		numberOfShownItems: { type: Number, default: 2 },
		showTooltip: { type: Boolean, default: false },
	},
	setup(props) {
		return {
			avatarGroupClasses: computed(() => ({
				'kt-avatar-group': true,
				'kt-avatar-group--is-stack': props.isStack,
			})),
			avatarRemainders: computed(
				() => props.items.length - props.numberOfShownItems,
			),
			visibleItems: computed(() =>
				[...props.items]
					.reverse()
					.filter((_, index) => index < props.numberOfShownItems),
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-avatar-group {
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;

	.kt-avatar {
		margin-right: 0.2rem;
	}

	&--is-stack .kt-avatar:not(:first-of-type) {
		margin-left: -0.8rem;
	}

	.kt-avatar-number {
		align-items: center;
		margin-left: 0.2rem;
		background: var(--gray-20);
		span {
			width: 100%;
			text-align: center;
		}
	}

	&--is-stack .kt-avatar-number {
		margin-left: -0.8rem;
	}
}
</style>
