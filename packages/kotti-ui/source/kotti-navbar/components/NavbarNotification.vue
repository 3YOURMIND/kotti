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
			<i v-if="!count" class="yoco">bell</i> <span v-else v-text="count" />
		</div>
	</a>
</template>

<script>
/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'KtNavbarNotification',
	props: {
		count: { type: Number, default: 0 },
		isNarrow: { type: Boolean, default: false },
		link: { type: String, default: null },
		title: { type: String, default: 'Notification' },
	},
}
/* eslint-enable perfectionist/sort-objects */
</script>

<style lang="scss" scoped>
.kt-navbar-notification {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.8rem 1rem;
	margin-bottom: 0.4rem;
	font-size: 0.75rem;
	line-height: 1.2rem;
	border-bottom: 1px solid var(--kt-navbar-border);

	span {
		margin-left: 0.8rem;
	}

	.yoco {
		font-size: 1rem;
	}

	&__number {
		width: 1.2rem;
		height: 1.2rem;
		font-size: 0.6rem;
		line-height: 1.2rem;
		text-align: center;
		background: rgb(255 255 255 / 26%);
		border-radius: 0.6rem;
	}

	&--mobile {
		display: none;
	}
}
</style>
