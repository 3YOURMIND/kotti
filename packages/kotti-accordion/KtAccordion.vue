<template>
	<div class="accordion">
		<div class="accordion__header">
			<div class="accordion__title">
				<slot name="title">
					<i v-if="icon" v-text="icon" class="yoco accordion__title__icon" />
					<div class="accordion__title__text">{{ title }}</div>
				</slot>
			</div>
			<div @click="toggle" class="accordion__toggle">
				<i v-text="isOpen ? 'minus' : 'plus'" class="yoco" />
			</div>
		</div>
		<div
			:style="`--height: ${contentHeight}px`"
			:class="isOpen ? 'is-open' : 'is-close'"
			@click="setHeight"
			class="accordion__content"
		>
			<div ref="contentInner" class="inner">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtAccordion',
	props: {
		title: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
		},
		isClosed: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isOpen: true,
			contentHeight: null,
			interval: null,
		}
	},
	mounted() {
		this.isOpen = !this.isClosed
		// This is the best solution right now
		// It will handle the case when the content change
		const reloadingTime = 500
		this.interval = setInterval(this.setHeight, reloadingTime)
	},
	beforeDestroy() {
		clearInterval(this.interval)
	},
	methods: {
		setHeight() {
			const height = this.$refs.contentInner.clientHeight
			this.contentHeight = height
		},
		toggle() {
			this.setHeight()
			this.isOpen = !this.isOpen
		},
	},
}
</script>
<style lang="scss">
.accordion {
	margin-bottom: $unit-4;
	border-bottom: none;
	border-radius: 2px;
}

.accordion__header {
	display: flex;
	justify-content: space-between;
	padding: $unit-2 $unit-8;
	border: 1px solid $lightgray-400;
}

.accordion__title {
	flex-grow: 1;
	align-self: center;
	font-size: 16px;
	font-weight: 600;
}

.accordion__content {
	overflow: hidden;
	border: 1px solid $lightgray-400;
	border-top: none;
	transition: height 200ms linear;
	.inner {
		padding: $unit-2 $unit-8;
	}
	&.is-open {
		height: var(--height);
	}
	&.is-close {
		height: 0px;
	}
}

.accordion__title__icon,
.accordion__title__text {
	display: inline-block;
}

.accordion__title__icon {
	margin-right: $unit-4;
	font-size: 22px !important;
	color: $primary-500;
}

.accordion__toggle {
	align-self: center;
	margin-left: $unit-4;
	color: $primary-500;
	cursor: pointer;
	user-select: none;
}
</style>
