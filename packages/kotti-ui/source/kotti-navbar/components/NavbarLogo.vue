<template>
	<div class="kt-navbar-logo-container">
		<div
			v-if="isNarrow"
			class="kt-navbar-logo kt-navbar-logo--is-desktop kt-navbar-logo--is-narrow"
		>
			<i
				class="yoco"
				@click.stop="$KtNavbar.toggle()"
				v-text="Yoco.Icon.BURGER"
			/>
		</div>
		<div
			v-else
			class="kt-navbar-logo kt-navbar-logo--is-desktop"
			@click="$emit('logoClick')"
		>
			<img alt="logo" class="kt-navbar-logo__image" :src="logoUrl" />
			<i
				class="yoco expanded"
				@click.stop="$KtNavbar.toggle()"
				v-text="Yoco.Icon.HIDE_MENU"
			/>
		</div>
		<div
			class="kt-navbar-logo kt-navbar-logo--is-mobile"
			@click="$emit('logoClick')"
		>
			<img alt="logo" class="kt-navbar-logo__image" :src="logoUrl" />
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'

export default defineComponent<{
	isNarrow: boolean
	logoUrl: string
}>({
	name: 'NavbarLogo',
	props: {
		isNarrow: { default: false, type: Boolean },
		logoUrl: { required: true, type: String },
	},
	setup() {
		return {
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

$margin: 0.8rem 1rem;

.kt-navbar-logo-container {
	display: flex;

	width: 100%;
	height: 100%;
}

.kt-navbar-logo {
	.yoco {
		padding: $margin;

		font-size: 1.2rem;
		color: var(--navbar-color-light);

		&:hover {
			color: var(--navbar-color-active);
		}
	}

	&--is-desktop {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: space-between;

		.kt-navbar-logo__image {
			margin: $margin;
			margin-right: 0; // already handled by the padding of the toggle button
		}
	}

	&--is-mobile {
		display: none;
		flex: 1;
		align-items: center;
		align-self: center;
		justify-content: center;
		height: 100%;
	}

	&--is-narrow {
		display: flex;
		justify-content: center;
	}

	&__image {
		max-height: 1.2rem;
	}
}

@media (max-width: $size-md) {
	.kt-navbar-logo {
		&--is-desktop {
			display: none;
		}

		&--is-mobile {
			display: flex;
		}
	}
}
</style>
