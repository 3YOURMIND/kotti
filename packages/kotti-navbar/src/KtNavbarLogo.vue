<template>
	<div>
		<div v-if="isNarrow" class="kt-navbar-logo" @click="$emit('logoClick')">
			<i
				:class="iconClass"
				v-text="iconText"
				@click.stop="$KtNavbar.toggle()"
			/>
		</div>
		<div v-else class="kt-navbar-logo" @click="$emit('logoClick')">
			<div class="kt-navbar-logo__logo">
				<slot />
			</div>
			<i
				:class="iconClass"
				v-text="iconText"
				@click.stop="$KtNavbar.toggle()"
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
	methods: {
		handleToggleNarrowClicked() {
			this.$emit('toggleNarrowBar')
		},
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
}
</script>
<style lang="scss">
.kt-navbar-logo {
	display: flex;
	align-items: center;
	padding: 0.8rem 1rem;
	justify-content: space-between;
	&__logo {
		background-repeat: no-repeat;
		background-position: left;
		background-size: contain;
		flex: 1;
	}
	&--mobile {
		display: none;
		padding: 0.2rem;
		height: 100%;
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
