<template>
	<div :class="avatarGroupClasses">
		<div v-if="avatarRemainders > 0" class="kt-avatar-group__number">
			<div v-text="`+${avatarRemainders}`" />
		</div>
		<KtAvatar
			v-for="(item, index) in visibleItems"
			:key="index"
			:isHoverable="isHoverable"
			:isSelected="item.isSelected"
			:name="item.name"
			:size="size"
			:src="item.src"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { KtAvatar } from '../kotti-avatar/'
import { Kotti } from '../types'

export default defineComponent<Kotti.AvatarGroup.PropsInternal>({
	name: 'KtAvatarGroup',
	components: {
		KtAvatar,
	},
	props: {
		isHoverable: { default: false, type: Boolean },
		isStack: { default: false, type: Boolean },
		items: { required: true, type: Array },
		showItems: { default: 2, type: Number },
		size: { default: Kotti.Avatar.Size.MEDIUM, type: String },
	},
	setup(props) {
		return {
			avatarGroupClasses: computed(() => ({
				'kt-avatar-group': true,
				'kt-avatar-group--is-size-large':
					props.size === Kotti.Avatar.Size.LARGE,
				'kt-avatar-group--is-size-medium':
					props.size === Kotti.Avatar.Size.MEDIUM,
				'kt-avatar-group--is-size-small':
					props.size === Kotti.Avatar.Size.SMALL,
				'kt-avatar-group--is-stack': props.isStack,
			})),
			avatarRemainders: computed(() => props.items.length - props.showItems),
			visibleItems: computed(() => {
				const reversedItems = [...props.items].reverse()

				return reversedItems.filter((item, index) => index < props.showItems)
			}),
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

	.kt-avatar-group__number {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		margin-left: 0.2rem;

		color: var(--text-03);
		background: var(--ui-02);
		border: 0.1rem solid var(--white);
		border-radius: 100%;
	}

	&--is-size-small {
		.kt-avatar-group__number {
			width: 1.6rem;
			height: 1.6rem;
			font-size: 0.4rem;
		}

		&.kt-avatar-group--is-stack > * {
			margin-left: -0.4rem;
		}
	}

	&--is-size-medium {
		.kt-avatar-group__number {
			width: 2.4rem;
			height: 2.4rem;
			font-size: 0.6rem;
		}

		&.kt-avatar-group--is-stack > * {
			margin-left: -0.6rem;
		}
	}

	&--is-size-large {
		.kt-avatar-group__number {
			width: 3.2rem;
			height: 3.2rem;
			font-size: 0.8rem;
		}

		&.kt-avatar-group--is-stack > * {
			margin-left: -0.8rem;
		}
	}
}
</style>
