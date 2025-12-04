<template>
	<div :class="wrapperClasses">
		<div
			class="scrollable-container__shadow-overlay scrollable-container__shadow-overlay--is-top"
		/>
		<div class="scrollable-container__content">
			<div ref="topSentinelRef" class="scrollable-container__sentinel" />
			<slot />
			<div ref="bottomSentinelRef" class="scrollable-container__sentinel" />
		</div>
		<div
			class="scrollable-container__shadow-overlay scrollable-container__shadow-overlay--is-bottom"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

export default defineComponent({
	name: 'ScrollableContainer',
	setup() {
		const bottomSentinelRef = ref<HTMLDivElement | null>(null)
		const containerRef = ref<HTMLDivElement | null>(null)
		const isBottomShadowVisible = ref(true)
		const isTopShadowVisible = ref(true)
		const topSentinelRef = ref<HTMLDivElement | null>(null)

		let observer: IntersectionObserver | null = null

		onMounted(() => {
			const options = {
				root: null,
				threshold: 0,
			}

			observer = new window.IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.target === topSentinelRef.value) {
						isTopShadowVisible.value = entry.isIntersecting
					}

					if (entry.target === bottomSentinelRef.value) {
						isBottomShadowVisible.value = entry.isIntersecting
					}
				})
			}, options)

			if (topSentinelRef.value) observer.observe(topSentinelRef.value)
			if (bottomSentinelRef.value) observer.observe(bottomSentinelRef.value)
		})

		onBeforeUnmount(() => {
			if (observer) observer.disconnect()
		})

		return {
			bottomSentinelRef,
			containerRef,
			topSentinelRef,
			wrapperClasses: computed(() => ({
				'scrollable-container__wrapper': true,
				'scrollable-container__wrapper--has-bottom-shadow':
					!isBottomShadowVisible.value,
				'scrollable-container__wrapper--has-top-shadow':
					!isTopShadowVisible.value,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
$shadow-overlay-height: 5px;

.scrollable-container {
	&__content {
		position: relative;
		padding: 0 var(--unit-4);
		overflow-y: auto;
	}

	&__sentinel {
		height: 1px;
		opacity: 0;
	}

	&__shadow-overlay {
		position: absolute;
		right: 0;
		left: 0;
		z-index: 5;
		height: $shadow-overlay-height;
		pointer-events: none;
		background-color: var(--white);
		opacity: 0;
		transition: opacity 0.3s ease;

		&--is-top {
			top: calc(-1 * $shadow-overlay-height);
			box-shadow: 0 2px 10px 2px rgb(0 0 0 / 40%);
		}

		&--is-bottom {
			bottom: calc(-1 * $shadow-overlay-height);
			box-shadow: 0 -2px 10px 2px rgb(0 0 0 / 40%);
		}
	}

	&__wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		&--has-top-shadow {
			.scrollable-container__shadow-overlay--is-top {
				opacity: 1;
			}
		}

		&--has-bottom-shadow {
			.scrollable-container__shadow-overlay--is-bottom {
				opacity: 1;
			}
		}
	}
}
</style>
