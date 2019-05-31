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
		<KtNavbarLink
			v-for="(item, index) in links"
			:key="index"
			:link="item.link"
			target="_blank"
			rel="noopener noreferrer"
			:isExternal="item.isExternal"
		>
			<div
				:class="[
					'kt-navbar__quick-link__links',
					{ 'kt-navbar__quick-link__links--narrow': isNarrow },
				]"
				:style="{ color: themeColor.textColor }"
			>
				<span v-text="item.title" v-if="!isNarrow" /> <i class="yoco">link</i>
			</div>
		</KtNavbarLink>
	</div>
</template>

<script>
import color from 'color'
import KtNavbarLink from './KtNavbarLink'

export default {
	name: 'KtNavbarQuickLink',
	components: { KtNavbarLink },
	props: {
		title: { type: String, default: 'Quick Links' },
		links: { type: Array, default: [] },
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
	border-top: 1px solid #fff;
	padding: 0.8rem 1.2rem;
	&--narrow {
		text-align: center;
		padding: 0.8rem 0;
	}
}
.kt-navbar__quick-link__title {
	font-size: 0.6rem;
	font-weight: 700;
	opacity: 0.64;
	text-transform: uppercase;
}
.kt-navbar__quick-link__links {
	display: flex;
	font-size: 0.75rem;
	padding: 0.3rem 0;
	justify-content: space-between;
	align-items: center;
	&--narrow {
		display: block;
	}
	i {
		font-size: 0.8rem;
	}
}
</style>
