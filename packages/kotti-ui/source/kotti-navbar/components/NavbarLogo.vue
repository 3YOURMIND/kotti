<template>
	<div class="kt-navbar-logo-container">
		<div
			v-if="isNarrow"
			class="kt-navbar-logo kt-navbar-logo--is-desktop kt-navbar-logo--is-narrow"
		>
			<NavbarTooltip
				:icon="Yoco.Icon.BURGER"
				:label="translations.menuExpand"
				@click.stop="() => $emit('setIsNarrow', false)"
			/>
		</div>
		<div
			v-else
			class="kt-navbar-logo kt-navbar-logo--is-desktop"
			@click="$emit('logoClick')"
		>
			<img alt="logo" class="kt-navbar-logo__image" :src="logoUrl" />
			<NavbarTooltip
				:icon="Yoco.Icon.HIDE_MENU"
				:label="translations.menuCollapse"
				@click.stop="() => $emit('setIsNarrow', true)"
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
import { defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'

import NavbarTooltip from './NavbarTooltip.vue'

export default defineComponent({
	name: 'NavbarLogo',
	components: {
		NavbarTooltip,
	},
	props: {
		isNarrow: { default: false, type: Boolean },
		logoUrl: { required: true, type: String },
	},
	emits: ['logoClick', 'setIsNarrow'],
	setup() {
		const translations = useTranslationNamespace('KtNavbar')

		return {
			translations,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables';

$margin: 0.8rem 1rem;

.kt-navbar-logo-container {
	display: flex;
	width: 100%;
	height: 100%;
}

.kt-navbar-logo {
	:deep(.yoco) {
		padding: $margin;
		font-size: 1.2rem;
		color: var(--kt-navbar-color-light);

		&:hover {
			color: var(--kt-navbar-color-active);
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
		// Calculates from:
		//  12rem (menu width)
		//  - 1 rem (image margin left)
		//  - 0 rem (image margin right)
		//  - 3.2rem (yoco icon container width)
		max-width: 7.8rem;
	}
}

@media (width < $size-md) {
	.kt-navbar-logo {
		&--is-desktop {
			display: none;
		}

		&--is-mobile {
			display: flex;
		}

		&__image {
			max-height: 2rem;
		}
	}
}
</style>
