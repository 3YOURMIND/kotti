<template>
	<div class="kt-user-menu-container">
		<div ref="userMenuRef" class="kt-user-menu">
			<div class="kt-user-menu__items">
				<div
					v-for="(section, index) in parsedSections"
					:key="index"
					class="kt-user-menu-item-wrapper"
				>
					<div
						v-if="section.title"
						class="kt-user-menu-item-wrapper__title"
						v-text="section.title"
					/>
					<!-- eslint-disable vue/no-v-text-v-html-on-component -->
					<component
						:is="link.component"
						v-for="(link, linkIndex) in section.links"
						:key="linkIndex"
						v-bind="link.props"
						class="kt-user-menu-item-wrapper__item"
						:data-test="`navbar:footer:element:${link.title
							.toLowerCase()
							.split(' ')
							.join('-')}`"
						@click="$emit('click', link)"
						v-text="link.title"
					/>
					<!-- eslint-enable vue/no-v-text-v-html-on-component -->
				</div>
			</div>
		</div>
		<div ref="triggerRef" :class="userInfoClass">
			<KtAvatar class="kt-user-menu-info__avatar" size="sm" :src="userAvatar" />
			<div
				v-if="!context.isNarrow || isMenuOpen"
				class="kt-user-menu-info__text"
			>
				<div class="kt-user-menu-info__name" v-text="userName" />
				<div class="kt-user-menu-info__status" v-text="userStatus" />
			</div>
			<div
				v-if="!context.isNarrow || isMenuOpen"
				class="kt-user-menu-info__chevron"
			>
				<i v-if="isMenuOpen" class="yoco">chevron_down</i>
				<i v-else class="yoco">chevron_up</i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'

import { KtAvatar } from '../kotti-avatar'
import { KT_NAVBAR_CONTEXT } from '../kotti-navbar/constants'
import { KottiNavbar } from '../kotti-navbar/types'
import { makeProps } from '../make-props'

import { KottiUserMenu } from './types'

export default defineComponent({
	name: 'KtUserMenu',
	components: {
		KtAvatar,
	},
	props: makeProps(KottiUserMenu.propsSchema),
	emits: ['click'],
	setup(props) {
		const triggerRef = ref<HTMLDivElement | null>(null)
		const userMenuRef = ref<HTMLDivElement | null>(null)

		const isMenuOpen = ref(false)
		const context = inject(
			KT_NAVBAR_CONTEXT,
			computed(() => ({ isNarrow: false, theme: KottiNavbar.Theme.DEFAULT })),
		)

		useTippy(
			triggerRef,
			computed(() => ({
				appendTo: () =>
					triggerRef.value as NonNullable<typeof triggerRef.value>,
				arrow: false,
				content: userMenuRef.value ?? undefined,
				interactive: true,
				maxWidth: 'none',
				offset: [0, 0],
				onHide: () => {
					isMenuOpen.value = false
				},
				onShow: () => {
					isMenuOpen.value = true
				},
				theme: `kt-usermenu-${context.value.theme}`,
				trigger: 'click focusin',
				zIndex: 1000,
			})),
		)

		return {
			context,
			isMenuOpen,
			parsedSections: computed(() =>
				KottiUserMenu.propsSchema.shape.sections.parse(props.sections),
			),
			triggerRef,
			userInfoClass: computed(() => ({
				'kt-user-menu-info': true,
				'kt-user-menu-info--is-narrow': context.value.isNarrow,
				'kt-user-menu-info--is-narrow-wide':
					context.value.isNarrow && isMenuOpen.value,
			})),
			userMenuRef,
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables';

.tippy-box[data-theme^='kt-usermenu'] {
	width: 11.2rem;
	color: var(--user-menu-color);
	background-color: var(--user-menu-background);
	border-radius: 0.2rem 0.2rem 0 0;

	.tippy-content {
		padding: 0.8rem 0.8rem 0.2rem;
	}
}

@media (width < $size-md) {
	.tippy-box[data-theme^='kt-usermenu'] {
		width: 100vw;
		border-radius: 0 0 0.2rem 0.2rem;

		// HACK: tippy box has a 5px offset that I can not get rid of using its props
		transform: translateX(-5px);
	}
}
</style>

<style lang="scss" scoped>
@import '../kotti-style/_variables';

.kt-user-menu-item-wrapper {
	margin-bottom: 0.4rem;
	opacity: 1;

	&__title {
		padding: 0.2rem 0.4rem;
		font-size: 0.5rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	&__item {
		display: block;
		padding: 0.2rem 0.4rem;
		margin: 0.1rem 0;
		font-size: 0.68rem;
		line-height: 1.2rem;
		color: inherit;
		border-radius: 0.2rem;

		&:hover {
			color: inherit;
			cursor: pointer;
			background: var(--user-menu-background-active);
		}
	}
}

.kt-user-menu-info {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.4rem;
	margin: -0.4rem;
	line-height: 1;
	cursor: pointer;
	border-radius: 0 0 0.2rem 0.2rem;

	&--is-narrow {
		width: 2.4rem;
	}

	&--is-narrow-wide {
		position: absolute;
		bottom: 0.8rem;
		left: 0.8rem;
		width: 11.2rem;
	}

	&[aria-expanded='true'],
	&:hover {
		background-color: var(--user-menu-background);
	}

	&__avatar {
		color: var(--user-menu-color);
		background-color: var(--user-menu-background);
		border-color: var(--user-menu-background);
	}

	&__avatar,
	&__chevron {
		flex-grow: 0;
		flex-shrink: 0;
	}

	&__chevron {
		align-self: center;
	}

	&__text {
		width: 100%;
		margin-left: 0.4rem;
		line-height: 0.8rem;
		color: var(--user-menu-color);
	}

	&__name {
		font-size: 0.7rem;
		font-weight: 600;
	}

	&__status {
		font-size: 0.6rem;
		font-weight: 600;
		opacity: 0.65;
	}
}

@media (width < $size-md) {
	.kt-user-menu-container {
		display: block;
	}

	.kt-user-menu-info {
		flex-basis: 48px;
		padding: 0.3rem;

		&--is-narrow-wide {
			width: auto;
		}

		&__text,
		&__chevron {
			display: none;
		}
	}
}
</style>
