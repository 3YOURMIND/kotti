<template>
	<div
		:class="[
			'kt-navbar__quick-link',
			{ 'kt-navbar__quick-link--narrow': isNarrow },
		]"
		:style="{ 'border-color': themeColor.borderColor }"
	>
		<div
			v-if="!isNarrow"
			class="kt-navbar__quick-link__title"
			:style="{ color: themeColor.textColor }"
			v-text="title"
		/>
		<a
			v-for="(item, index) in links"
			:key="index"
			:href="item.link"
			target="_blank"
			rel="noopener noreferrer"
		>
			<div
				:class="[
					'kt-navbar__quick-link__links',
					{ 'kt-navbar__quick-link__links--narrow': isNarrow },
				]"
				:style="{ color: themeColor.textColor }"
			>
				<span v-if="!isNarrow" v-text="item.title" /> <i class="yoco">link</i>
			</div>
		</a>
	</div>
</template>

<script>
import color from 'color'

export default {
	name: 'KtNavbarQuickLink',
	props: {
		title: { type: String, default: 'Quick Links' },
		links: { type: Array, default: () => [] },
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
		themeColor() {
			return {
				borderColor: color(this.KtTheme.navbarBackgroundColor).isDark()
					? 'rgba(255,255,255,0.24)'
					: 'rgba(0,0,0,0.24)',
				textColor: this.KtTheme.navbarTextColor,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.kt-navbar__quick-link {
	padding: 0.8rem 1.2rem;
	border-top: 1px solid #fff;
	&--narrow {
		padding: 0.8rem 0;
		text-align: center;
	}
}
.kt-navbar__quick-link__title {
	font-size: 0.6rem;
	font-weight: 700;
	text-transform: uppercase;
	opacity: 0.64;
}
.kt-navbar__quick-link__links {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.3rem 0;
	font-size: 0.75rem;
	&--narrow {
		display: block;
	}
	i {
		font-size: 0.8rem;
	}
}
</style>
