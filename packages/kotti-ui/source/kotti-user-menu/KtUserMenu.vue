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
				v-if="!context.isNarrow || isMenuShow"
				class="kt-user-menu-info__text"
			>
				<div class="kt-user-menu-info__name" v-text="userName" />
				<div class="kt-user-menu-info__status" v-text="userStatus" />
			</div>
			<div
				v-if="!context.isNarrow || isMenuShow"
				class="kt-user-menu-info__chevron"
			>
				<i v-if="isMenuShow" class="yoco">chevron_down</i>
				<i v-else class="yoco">chevron_up</i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { computed, defineComponent, inject, ref } from '@vue/composition-api'

import { KtAvatar } from '../kotti-avatar'
import { KT_NAVBAR_CONTEXT } from '../kotti-navbar/constants'
import { makeProps } from '../make-props'

import { KottiUserMenu } from './types'

export default defineComponent({
	name: 'KtUserMenu',
	components: {
		KtAvatar,
	},
	props: makeProps(KottiUserMenu.propsSchema),
	setup(props: KottiUserMenu.PropsInternal) {
		const triggerRef = ref<HTMLElement | null>(null)
		const userMenuRef = ref<HTMLElement | null>(null)

		const isMenuShow = ref(false)
		const context = inject(
			KT_NAVBAR_CONTEXT,
			computed(() => ({ isNarrow: false, theme: null })),
		)

		useTippy(
			triggerRef,
			computed(() => ({
				animation: false,
				appendTo: () => document.body,
				arrow: false,
				content: userMenuRef.value ?? undefined,
				interactive: true,
				maxWidth: 'none',
				offset: [0, 0],
				onHide: () => {
					isMenuShow.value = false
				},
				onShow: () => {
					isMenuShow.value = true
				},
				theme: `kt-usermenu-${context.value.theme ?? 'default'}`,
				trigger: 'click focusin',
				zIndex: 1000,
			})),
		)

		return {
			context,
			isMenuShow,
			parsedSections: computed(() =>
				KottiUserMenu.propsSchema.shape.sections.parse(props.sections),
			),
			triggerRef,
			userInfoClass: computed(() => ({
				'kt-user-menu-info': true,
				'kt-user-menu-info--is-narrow': context.value.isNarrow,
				'kt-user-menu-info--is-narrow-wide':
					context.value.isNarrow && isMenuShow.value,
			})),
			userMenuRef,
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

.tippy-box[data-theme~='kt-usermenu-default'],
.tippy-box[data-theme~='kt-usermenu-dark'],
.tippy-box[data-theme~='kt-usermenu-light'],
.tippy-box[data-theme~='kt-usermenu-reverse'] {
	--user-menu-background-active: var(--primary-70);
	--user-menu-background: var(--primary-60);
	--user-menu-color: var(--primary-10);

	width: 11.2rem;
	color: var(--user-menu-color);
	background-color: var(--user-menu-background);
	border-radius: 0.2rem 0.2rem 0 0;

	.tippy-content {
		padding: 0.8rem 0.8rem 0.2rem 0.8rem;
	}

	.kt-user-menu {
		&__info {
			&:hover {
				background: var(--user-menu-background);
			}
		}

		&__section__item {
			&:hover {
				background: var(--user-menu-background-active);
			}
		}
	}
}

.tippy-box[data-theme~='kt-usermenu-dark'] {
	--user-menu-background-active: var(--gray-80);
	--user-menu-background: var(--gray-70);
	--user-menu-color: var(--gray-10);
}

.tippy-box[data-theme~='kt-usermenu-light'] {
	--user-menu-background-active: var(--gray-20);
	--user-menu-background: var(--gray-10);
	--user-menu-color: var(--primary-90);
}

.tippy-box[data-theme~='kt-usermenu-reverse'] {
	--user-menu-background-active: var(--primary-30);
	--user-menu-background: var(--primary-20);
	--user-menu-color: var(--primary-80);
}

.tippy-box[data-theme~='kt-usermenu-shadow'] {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
}

@media (max-width: $size-md) {
	.tippy-box[data-theme~='kt-usermenu-default'],
	.tippy-box[data-theme~='kt-usermenu-dark'],
	.tippy-box[data-theme~='kt-usermenu-light'],
	.tippy-box[data-theme~='kt-usermenu-reverse'] {
		width: 100vw;
		border-radius: 0 0 0.2rem 0.2rem;
		// HACK: tippy box has a 5px offset that I can not get rid of using its props
		transform: translateX(-5px);
	}
}
</style>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-user-menu {
	box-sizing: border-box;
	border-radius: 0.2rem;

	&-info {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0.4rem;
		margin: -0.4rem;
		line-height: 1;
		background-color: var(--navbar-background);

		&--is-narrow {
			width: 2.4rem;
		}

		&--is-narrow-wide {
			position: absolute;
			bottom: 0.8rem;
			left: 0.8rem;
			width: 11.2rem;
		}

		&:hover {
			cursor: pointer;
			background-color: var(--user-menu-background);
		}

		&__avatar {
			z-index: 2;
			flex-grow: 0;
		}

		&__text {
			z-index: 2;
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

		&__chevron {
			z-index: 2;
			flex-grow: 0;
			align-self: center;
		}
	}

	&-item-wrapper {
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
			}
		}
	}
}

@media (max-width: $size-md) {
	.kt-user-menu-info {
		flex-basis: 48px;
		padding: 0.3rem;

		&--is-narrow {
			position: relative;
			top: 0;
			left: 0;
		}

		&--is-narrow-wide {
			width: auto;
		}

		&__text,
		&__chevron {
			display: none;
		}
	}

	.kt-user-menu-container {
		display: block;
	}

	.kt-user-menu {
		top: 2.4rem;
		bottom: auto;
		left: 0;
		width: 100%;
		padding-bottom: 0.8rem;
		border-radius: 0 0 0.2rem 0.2rem;
	}
}
</style>
