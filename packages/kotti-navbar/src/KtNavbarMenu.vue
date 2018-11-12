<template>
	<div :class="objectClass">
		<div v-for="(item, index) in menu" :key="index">
			<div
				v-if="item.title"
				v-text="isNarrow ? '' : item.title"
				:style="{ color: textColor }"
				class="navbar-menu__section"
			/>
			<router-link
				v-for="(link, index) in item.links"
				:key="index"
				class=""
				:style="{ color: textColor }"
				:to="link.link"
			>
				<div class="navbar-menu__item">
					<i class="yoco" v-text="link.icon" />
					<span v-if="!isNarrow" v-text="link.title" />
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtMobielNavBarMenu',
	props: {
		mobileMenuToggle: { type: Boolean, default: false },
		menu: { type: Array, default: null },
		textColor: { type: String, default: '#fff' },
		isNarrow: { type: Boolean, default: false },
	},
	computed: {
		objectClass() {
			return {
				'navbar-menu': true,
				'navbar-menu--narrow': this.isNarrow,
			}
		},
	},
}
</script>
