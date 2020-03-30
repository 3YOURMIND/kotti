<template>
	<div v-on-clickaway="clickawayMenu" class="user-menus">
		<div v-if="isMenuShow" class="user-menu" @click="clickawayMenu">
			<slot name="user-menu-items" />
			<div class="user-menu-items">
				<div
					v-for="(section, index) in sections"
					:key="index"
					class="user-menu__section"
				>
					<div
						v-if="section.title"
						class="user-menu__section__title"
						v-text="section.title"
					/>
					<a
						v-for="(link, linkIndex) in section.links"
						:key="linkIndex"
						:href="link.link"
						class="user-menu__section__item"
						:data-test="
							`navbar:footer:element:${link.title
								.toLowerCase()
								.split(' ')
								.join('-')}`
						"
						@click="$emit('click', link)"
						v-text="link.title"
					/>
				</div>
			</div>
		</div>
		<div :class="userInfoClass" @click="isMenuShow = !isMenuShow">
			<div class="user-info-avatar">
				<KtAvatar small :src="userAvatar" />
			</div>
			<div v-if="!isNarrow || isMenuShow" class="user-info-text">
				<div class="user-info-text__name" v-text="userName" />
				<div class="user-info-text__status" v-text="userStatus" />
			</div>
			<div v-if="!isNarrow || isMenuShow" class="user-info-toggle">
				<i v-if="isMenuShow" class="yoco">chevron_down</i>
				<i v-else class="yoco">chevron_up</i>
			</div>
		</div>
	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'
import { mixin as clickaway } from 'vue-clickaway'

const linkIsValid = (link) => Boolean(link.title)

const sectionIsValid = (section) =>
	Array.isArray(section.links) &&
	Boolean(section.links.length) &&
	section.links.every(linkIsValid)

export default {
	name: 'KtUserMenu',
	components: {
		KtAvatar,
	},
	mixins: [clickaway],
	props: {
		userAvatar: { type: String, default: null },
		sections: {
			type: Array,
			required: true,
			validator: (sections) => sections.every(sectionIsValid),
		},
		userName: { type: String, default: null },
		userStatus: { type: String, required: true },
	},
	inject: {
		KtTheme: {
			default: {
				navbarTextColor: 'rgba(255,255,255,.54)',
				navbarBackgroundColor: '#122C56',
			},
		},
	},
	data() {
		return {
			isMenuShow: false,
		}
	},
	computed: {
		themeColor() {
			return {
				textColor: this.KtTheme.navbarTextColor,
				backgroundColor: this.KtTheme.navbarBackgroundColor,
			}
		},
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
		userInfoClass() {
			return {
				'user-info': true,
				'user-info--narrow': this.isNarrow,
				'user-info--narrow-wide': this.isNarrow && this.isMenuShow,
			}
		},
	},
	methods: {
		clickawayMenu() {
			this.isMenuShow = false
		},
	},
}
</script>
<style lang="scss">
:root {
	--user-menu-border: var(--primary-80);
	--user-menu-background-active: var(--primary-80);
	--user-menu-background: var(--primary-70);
	--user-menu-color: var(--primary-10);
}

.user-info {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0.4rem;
	margin: -0.4rem;
	line-height: 1;
	&--narrow {
		width: 2.4rem;
	}
	&--narrow-wide {
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
}
.user-info-avatar {
	z-index: 2;
	flex-grow: 0;
}
.user-info-text {
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
.user-info-toggle {
	z-index: 2;
	flex-grow: 0;
	align-self: center;
	color: var(--user-menu-color);
}
.user-menu {
	position: absolute;
	bottom: 0.4rem;
	left: 0.4rem;
	box-sizing: border-box;
	flex: none;
	width: 11.2rem;
	padding: 0.8rem;
	padding-bottom: 2.6rem;
	color: var(--user-menu-color);
	/* stylelint-disable-next-line */
	background: var(--user-menu-background);
	// TODO: remove
	border: none;
	border-radius: 0.2rem;
	// TODO: remove
	box-shadow: none;
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
	.user-info {
		flex-basis: 48px;
		&--narrow {
			position: relative;
			top: 0;
			left: 0;
		}
		&--narrow-wide {
			width: auto;
		}
	}
	.user-info-text,
	.user-info-toggle {
		display: none;
	}
	.user-menus {
		display: block;
	}
	.user-menu {
		top: 2.4rem;
		bottom: auto;
		left: 0;
		width: 100%;
		padding-bottom: 0.8rem;
		border-radius: 0 0 0.2rem 0.2rem;
	}
}
</style>
