<template>
	<div class="user-menus">
		<div class="user-menu" v-if="isMenuShow">
			<div class="user-menu__item">Settings</div>
			<div class="user-menu__item">User Profile</div>
			<div class="user-menu__item">Logout</div>
		</div>
		<div class="user-info"  @click="isMenuShow=!isMenuShow">
			<div class="user-info-avatar">
				<KtAvatar small src="https://picsum.photos/200"/>
			</div>
			<div class="user-info-text">
				<div class="user-info-text__name">
					Jonny'O Five
				</div>
				<div class="user-info-text__status">
					Invisiable
				</div>
			</div>
			<div class="user-info-toggle">
				<i class="yoco" v-if="isMenuShow">chevron_down</i>
				<i class="yoco" v-else>chevron_up</i>
			</div>
		</div>

	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'

export default {
	name: 'KtUserMenu',
	components: {
		KtAvatar,
	},
	data() {
		return {
			isMenuShow: false,
		}
	},
}
</script>

<style lang="scss">
// .user-menus {
// 	position: relative;
// }
.user-info {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	position: relative;
	margin: -0.4rem;
	padding: 0.4rem;
	line-height: 1;
	&:hover {
		border-radius: 0.2rem;
		cursor: pointer;
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
	background: darken(#2659ab, 24);
	width: 11.2rem;
	box-sizing: border-box;
	bottom: 0.4rem;
	left: 0.4rem;
	color: #ffffff;
	border-radius: 0.2rem;
	padding: 0.8rem;
	padding-bottom: 3.2rem;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	&__item {
		margin: 0.2rem 0;
		padding: 0.4rem;
		line-height: 1.2rem;
		border-radius: 0.2rem;
		&:hover {
			cursor: pointer;
			background: rgba(255, 255, 255, 0.14);
		}
	}
}
@media (max-width: 840px) {
	.user-info {
		flex-basis: 48px;
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
