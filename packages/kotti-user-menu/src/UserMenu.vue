<template>
	<div class="user-menus" v-on-clickaway="clickawayMenu">
		<div
			class="user-menu"
			v-if="isMenuShow"
			@click="clickawayMenu"
			:style="{ background: themeColor.backgroundColor }"
		>
			<slot name="user-menu-items" />
			<div class="user-menu-items">
				<div v-for="(section, index) in sections" :key="index">
					<div
						v-if="section.title"
						class="user-menu__section"
						v-text="section.title"
						:style="{ color: themeColor.textColor }"
					/>
					<KtNavbarLink
						v-for="(link, index) in section.links"
						:isExternal="link.isExternal"
						:key="index"
						:link="link.link"
						@click="$emit('click', link)"
						class="user-menu__item"
						:style="{ color: themeColor.textColor }"
					>
						{{ link.title }}
					</KtNavbarLink>
				</div>
			</div>
		</div>
		<div :class="userInfoClass" @click="isMenuShow = !isMenuShow">
			<div class="user-info-avatar"><KtAvatar small :src="userAvatar" /></div>
			<div class="user-info-text" v-if="!isNarrow || isMenuShow">
				<div
					class="user-info-text__name"
					v-text="userName"
					:style="{ color: themeColor.textColor }"
				/>
				<div
					class="user-info-text__status"
					v-text="userStatus"
					:style="{ color: themeColor.textColor }"
				/>
			</div>
			<div
				class="user-info-toggle"
				v-if="!isNarrow || isMenuShow"
				:style="{ color: themeColor.textColor }"
			>
				<i class="yoco" v-if="isMenuShow">chevron_down</i>
				<i class="yoco" v-else>chevron_up</i>
			</div>
		</div>
	</div>
</template>

<script>
import KtNavbarLink from '../../kotti-navbar/src/KtNavbarLink'
import KtAvatar from '../../kotti-avatar'
import { mixin as clickaway } from 'vue-clickaway'

const linkIsValid = link => Boolean(link.title)

const sectionIsValid = section =>
	Array.isArray(section.links) &&
	Boolean(section.links.length) &&
	section.links.every(linkIsValid)

export default {
	name: 'KtUserMenu',
	props: {
		userAvatar: { type: String, default: null },
		sections: {
			type: Array,
			required: true,
			validator: sections => sections.every(sectionIsValid),
		},
		userName: { types: [String, null], required: true },
		userStatus: { type: String, required: true },
	},
	components: {
		KtAvatar,
		KtNavbarLink,
	},
	mixins: [clickaway],
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
.user-info {
	cursor: pointer;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: relative;
	margin: -0.4rem;
	padding: 0.4rem;
	line-height: 1;
	&--narrow {
		width: 2.4rem;
	}
	&--narrow-wide {
		bottom: 0.8rem;
		left: 0.8rem;
		position: absolute;
		width: 11.2rem;
	}
	&:hover {
		border-radius: 0.2rem;
		background: rgba($color: #000000, $alpha: 0.24);
	}
}
.user-info-avatar {
	z-index: 2;
	flex-grow: 0;
}
.user-info-text {
	z-index: 2;
	color: #ffffff;
	margin-left: 0.4rem;
	line-height: 0.8rem;
	width: 100%;
	&__name {
		font-weight: 600;
		font-size: 0.7rem;
	}
	&__status {
		font-weight: 600;
		font-size: 0.6rem;
		opacity: 0.65;
	}
}
.user-info-toggle {
	z-index: 2;
	color: #ffffff;
	flex-grow: 0;
	align-self: center;
}
.user-menu {
	flex: none;
	position: absolute;
	background: darken(#2659ab, 20);
	width: 11.2rem;
	box-sizing: border-box;
	bottom: 0.4rem;
	left: 0.4rem;
	color: #ffffff;
	border-radius: 0.2rem;
	padding: 0.8rem;
	padding-bottom: 3.2rem;
	border: 1px solid rgba($color: #ffffff, $alpha: 0.1);
	box-shadow: 0 0.2rem 1rem 0.2rem rgba(0, 0, 0, 0.24);
	&__section {
		padding: 0.2rem 0.4rem;
		font-size: 0.5rem;
		font-weight: 600;
		text-transform: uppercase;
		opacity: 0.46;
	}
	&__item {
		cursor: pointer;
		margin: 0.1rem 0;
		line-height: 1.2rem;
		font-size: 0.68rem;
		border-radius: 0.2rem;
		color: inherit;
		display: block;
		&:hover {
			color: inherit;
			background: rgba(255, 255, 255, 0.14);
		}
		a {
			padding: 0.2rem 0.4rem;
			display: block;
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
		bottom: auto;
		top: 2.4rem;
		left: 0;
		width: 100%;
		border-radius: 0 0 0.2rem 0.2rem;
		padding-bottom: 0.8rem;
	}
}
</style>
