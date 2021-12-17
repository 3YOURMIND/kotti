<template>
	<div v-on-clickaway="clickawayMenu" class="kt-user-menu-container">
		<div v-if="isMenuShow" class="kt-user-menu" @click="clickawayMenu">
			<div class="kt-user-menu__items">
				<div
					v-for="(section, index) in parsedSections"
					:key="index"
					class="kt-user-menu__section"
				>
					<div
						v-if="section.title"
						class="kt-user-menu__section__title"
						v-text="section.title"
					/>
					<component
						:is="link.component"
						v-for="(link, linkIndex) in section.links"
						:key="linkIndex"
						v-bind="link.props"
						class="kt-user-menu__section__item"
						:data-test="`navbar:footer:element:${link.title
							.toLowerCase()
							.split(' ')
							.join('-')}`"
						@click="$emit('click', link)"
						v-text="link.title"
					/>
				</div>
			</div>
		</div>
		<div :class="userInfoClass" @click="isMenuShow = !isMenuShow">
			<div class="kt-user-menu__info__avatar">
				<KtAvatar size="sm" :src="userAvatar" />
			</div>
			<div v-if="!isNarrow || isMenuShow" class="kt-user-menu__info__text">
				<div class="kt-user-menu__info__text__name" v-text="userName" />
				<div class="kt-user-menu__info__text__status" v-text="userStatus" />
			</div>
			<div v-if="!isNarrow || isMenuShow" class="kt-user-menu__info__toggle">
				<i v-if="isMenuShow" class="yoco">chevron_down</i>
				<i v-else class="yoco">chevron_up</i>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	ref,
} from '@vue/composition-api'
import { mixin as clickaway } from 'vue-clickaway'

import { KtAvatar } from '../kotti-avatar'
import { IS_NAVBAR_NARROW } from '../kotti-navbar/constants'
import { makeProps } from '../make-props'

import { KottiUserMenu } from './types'

export default defineComponent<KottiUserMenu.PropsInternal>({
	name: 'KtUserMenu',
	components: {
		KtAvatar,
	},
	mixins: [clickaway],
	props: makeProps(KottiUserMenu.propsSchema),
	setup(props) {
		const isMenuShow = ref(false)
		const isNarrow = inject<ComputedRef<boolean>>(
			IS_NAVBAR_NARROW,
			computed(() => false),
		)

		return {
			clickawayMenu: () => (isMenuShow.value = false),
			isMenuShow,
			isNarrow,
			parsedSections: computed(() =>
				KottiUserMenu.propsSchema.shape.sections.safeParse(props.sections),
			),
			userInfoClass: computed(() => ({
				'kt-user-menu__info': true,
				'kt-user-menu__info--is-narrow': isNarrow.value,
				'kt-user-menu__info--is-narrow-wide':
					isNarrow.value && isMenuShow.value,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-user-menu {
	position: absolute;
	bottom: 0.4rem;
	left: 0.4rem;
	box-sizing: border-box;
	flex: none;
	width: 11.2rem;
	padding: 0.8rem;
	padding-bottom: 2.6rem;
	color: var(--user-menu-color);
	background: var(--user-menu-background);
	border-radius: 0.2rem;

	&__info {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0.4rem;
		margin: -0.4rem;
		line-height: 1;

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
			background: var(--user-menu-background);
			border-radius: 0.2rem;
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

		&__toggle {
			z-index: 2;
			flex-grow: 0;
			align-self: center;
			color: var(--user-menu-color);
		}
	}

	&__section {
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
}

@media (max-width: $size-md) {
	.kt-user-menu__info {
		flex-basis: 48px;

		&--is-narrow {
			position: relative;
			top: 0;
			left: 0;
		}

		&--is-narrow-wide {
			width: auto;
		}

		&__text,
		&__toggle {
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
