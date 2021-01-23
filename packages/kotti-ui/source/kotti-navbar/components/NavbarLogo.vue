<template>
	<div>
		<div
			v-if="isNarrow"
			class="kt-navbar-logo--desktop"
			@click="$emit('logoClick')"
		>
			<i
				:class="iconClass"
				@click.stop="$KtNavbar.toggle()"
				v-text="iconText"
			/>
		</div>
		<div v-else class="kt-navbar-logo--desktop" @click="$emit('logoClick')">
			<img alt="logo" class="kt-navbar-logo__image" :src="logoUrl" />
			<i
				:class="iconClass"
				@click.stop="$KtNavbar.toggle()"
				v-text="iconText"
			/>
		</div>
		<div class="kt-navbar-logo--mobile">
			<img alt="logo" class="kt-navbar-logo__image" :src="logoUrl" />
		</div>
	</div>
</template>

<script>
import { Yoco } from '@3yourmind/yoco'
export default {
	name: 'KtNavbarLogo',
	props: {
		logoUrl: { required: true, type: String },
	},
	computed: {
		iconClass() {
			return this.isNarrow ? 'yoco' : 'yoco expanded'
		},
		iconText() {
			return this.isNarrow ? Yoco.Icon.BURGER : Yoco.Icon.HIDE_MENU
		},
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-navbar-logo {
	&--desktop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.8rem 1rem;
	}
	&--mobile {
		display: none;
	}
	&__image {
		max-height: 1.2rem;
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

@media (max-width: $size-md) {
	.kt-navbar-logo {
		&--desktop {
			display: none;
		}
		&--mobile {
			display: flex;
			padding: 0.35rem;
		}
	}
}
</style>
