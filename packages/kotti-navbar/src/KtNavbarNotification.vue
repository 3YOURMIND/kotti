<template>
	<a :href="link">
		<div class="kt-navbar-notification">
			<div>
				<i
					v-if="!count || !isNarrow"
					class="kt-navbar-notification__icon yoco"
					v-text="'bell'"
				/>
				<span
					v-show="!isNarrow"
					class="kt-navbar-notification__label"
					v-text="title"
				/>
			</div>
			<div
				v-show="count"
				class="kt-navbar-notification__number"
				v-text="count"
			/>
		</div>
		<div class="kt-navbar-notification--mobile">
			<i class="yoco" v-if="!count">bell</i> <span v-else v-text="count" />
		</div>
	</a>
</template>

<script>
import color from 'color'

export default {
	name: 'KtNavbarNotification',
	props: {
		count: { type: Number, default: 0 },
		link: { type: String, default: null },
		title: { type: String, default: 'Notification' },
	},
	inject: {
		KtTheme: {
			default: {
				navbarTextColor: 'rgba(255,255,255,.54)',
				navbarBackgroundColor: '#122C56',
			},
		},
	},
	computed: {
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
	},
}
</script>
<style lang="scss">
.kt-navbar-notification {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid var(--navbar-border);
	font-size: 0.75rem;
	line-height: 1.2rem;
	padding: 0.8rem 1rem;
	margin-bottom: 0.4rem;
	span {
		margin-left: 0.8rem;
	}
	.yoco {
		font-size: 1rem;
	}
	&__number {
		border-radius: 0.6rem;
		width: 1.2rem;
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: 0.6rem;
		text-align: center;
		background: rgba(#fff, 0.26);
	}
	&--mobile {
		display: none;
	}
}
</style>
