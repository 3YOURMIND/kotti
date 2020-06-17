<template>
	<div>
		<div v-if="isNarrow" class="kt-navbar-logo" @click="$emit('logoClick')">
			<i
				:class="iconClass"
				@click.stop="$KtNavbar.toggle()"
				v-text="iconText"
			/>
		</div>
		<div v-else class="kt-navbar-logo" @click="$emit('logoClick')">
			<div class="kt-navbar-logo__logo">
				<slot />
			</div>
			<i
				:class="iconClass"
				@click.stop="$KtNavbar.toggle()"
				v-text="iconText"
			/>
		</div>
		<div class="kt-navbar-logo--mobile">
			<div class="kt-navbar-logo__logo">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarLogo',
	props: {
		labelText: { type: String, default: null },
	},
	computed: {
		iconClass() {
			return this.isNarrow ? 'yoco' : 'yoco expanded'
		},
		iconText() {
			return this.isNarrow ? 'burger' : 'hide_menu'
		},
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
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
}
</script>

<style lang="scss">
.kt-navbar-logo {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.8rem 1rem;
	&__logo {
		flex: 1;
		background-repeat: no-repeat;
		background-position: left;
		background-size: contain;
		.image {
			max-width: 100%;
			height: auto;
		}
	}
	&--mobile {
		display: none;
		height: 100%;
		padding: 0.2rem;
	}
	i {
		opacity: 0.64;
		&:hover {
			opacity: 1;
		}
		&.expanded {
			margin-left: 1.2rem;
		}
	}
}
</style>
