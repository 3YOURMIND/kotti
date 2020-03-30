<template>
	<div v-on-clickaway="clickawayMenu" class="user-menus">
		<div
			v-if="isMenuShow"
			class="user-menu"
			:style="{ background: themeColor.backgroundColor }"
			@click="clickawayMenu"
		>
			<slot name="user-menu-items" />
			<div class="user-menu-items">
				<div v-for="(section, index) in sections" :key="index">
					<div
						v-if="section.title"
						class="user-menu__section"
						:style="{ color: themeColor.textColor }"
						v-text="section.title"
					/>
					<a
						v-for="(link, linkIndex) in section.links"
						:key="linkIndex"
						:href="link.link"
						class="user-menu__item"
						:style="{ color: themeColor.textColor }"
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
				<div
					class="user-info-text__name"
					:style="{ color: themeColor.textColor }"
					v-text="userName"
				/>
				<div
					class="user-info-text__status"
					:style="{ color: themeColor.textColor }"
					v-text="userStatus"
				/>
			</div>
			<div
				v-if="!isNarrow || isMenuShow"
				class="user-info-toggle"
				:style="{ color: themeColor.textColor }"
			>
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
		background: rgba(0, 0, 0, 0.24);
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
	color: #ffffff;
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
	color: #ffffff;
}
.user-menu {
	position: absolute;
	bottom: 0.4rem;
	left: 0.4rem;
	box-sizing: border-box;
	flex: none;
	width: 11.2rem;
	padding: 0.8rem;
	padding-bottom: 3.2rem;
	color: #ffffff;
	/* stylelint-disable-next-line */
	background: darken(#2659ab, 20);
	border: 1px solid rgba($color: #ffffff, $alpha: 0.1);
	border-radius: 0.2rem;
	box-shadow: 0 0.2rem 1rem 0.2rem rgba(0, 0, 0, 0.24);
	&__section {
		padding: 0.2rem 0.4rem;
		font-size: 0.5rem;
		font-weight: 600;
		text-transform: uppercase;
		opacity: 0.46;
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
			background: rgba(255, 255, 255, 0.14);
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
