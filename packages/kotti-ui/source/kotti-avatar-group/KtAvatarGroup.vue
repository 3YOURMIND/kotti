<template>
	<div :class="avatarGroupClasses">
		<div v-if="avatarRemainders > 0" class="kt-avatar-group__number">
			<div v-text="`+${avatarRemainders}`" />
		</div>
		<KtAvatar
			v-for="(item, index) in visibleItems"
			:key="index"
			:isHoverable="isHoverable"
			:name="item.name"
			:size="size"
			:src="item.src"
		>
			<template #content>
				<slot :item="item" name="content" />
			</template>
		</KtAvatar>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { KtAvatar } from '../kotti-avatar/'
import { KottiAvatar } from '../kotti-avatar/types'
import { makeProps } from '../make-props'

import { KottiAvatarGroup } from './types'

export default defineComponent<KottiAvatarGroup.PropsInternal>({
	name: 'KtAvatarGroup',
	components: {
		KtAvatar,
	},
	props: makeProps(KottiAvatarGroup.propsSchema),
	setup(props) {
		return {
			avatarGroupClasses: computed(() => ({
				'kt-avatar-group': true,
				'kt-avatar-group--is-size-large': props.size === KottiAvatar.Size.LARGE,
				'kt-avatar-group--is-size-medium':
					props.size === KottiAvatar.Size.MEDIUM,
				'kt-avatar-group--is-size-small': props.size === KottiAvatar.Size.SMALL,
				'kt-avatar-group--is-stack': props.isStack,
			})),
			avatarRemainders: computed(() => props.items.length - props.count),
			visibleItems: computed(() => {
				const reversedItems = [...props.items].reverse()

				return reversedItems.filter((_item, index) => index < props.count)
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
