<template>
	<a :href="link">
		<div class="navbar-notification">
			<div>
				<i
					v-if="!count || !isNarrow"
					class="navbar-notification__icon yoco"
					v-text="'bell'"
				/>
				<span
					v-show="!isNarrow"
					class="navbar-notification__label"
					v-text="title"
				/>
			</div>
			<div v-show="count" class="navbar-notification__number" v-text="count" />
		</div>
		<div class="navbar-notification--mobile">
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
