<template>
	<div :style="{ color: themeColor.textColor, height: '100%' }">
		<div v-if="isNarrow" :class="objectClass" @click="$emit('logoClick')">
			<i
				:class="iconClass"
				v-text="iconText"
				@click.stop="$KtNavbar.toggle()"
			/>
		</div>
		<div v-else :class="objectClass" @click="$emit('logoClick')">
			<div
				v-if="themeColor.logoUrl"
				:style="[backgroundStyle, heightStyle]"
				class="navbar-logo--logo"
			/>
			<div v-else v-text="labelText" />
			<i
				:class="iconClass"
				v-text="iconText"
				@click.stop="$KtNavbar.toggle()"
			/>
		</div>
		<div class="navbar-logo--mobile">
			<div
				v-if="themeColor.logoUrl"
				:style="backgroundStyle"
				class="navbar-logo--logo"
			/>
			<div v-else v-text="labelText" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarLogo',
	props: {
		labelText: { type: String, default: null },
	},
	methods: {
		handleToggleNarrowClicked() {
			this.$emit('toggleNarrowBar')
		},
	},
	inject: {
		KtTheme: {
			default: {
				navbarTextColor: 'rgba(255,255,255,.54)',
				logoUrl: null,
				logoHeight: '40px',
			},
		},
	},
	computed: {
		backgroundStyle() {
			return {
				'background-image': `url(${this.themeColor.logoUrl})`,
			}
		},
		heightStyle() {
			return {
				height: this.themeColor.logoHeight,
			}
		},
		iconClass() {
			return this.isNarrow ? 'yoco' : 'yoco expanded'
		},
		iconText() {
			return this.isNarrow ? 'burger' : 'hide_menu'
		},
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
		objectClass() {
			return {
				'navbar-logo': true,
				'navbar-logo--narrow': this.isNarrow,
			}
		},
		themeColor() {
			return {
				textColor: this.KtTheme.navbarTextColor,
				logoHeight: this.KtTheme.logoHeight || '40px',
				logoUrl: this.KtTheme.logoUrl,
			}
		},
	},
}
</script>
