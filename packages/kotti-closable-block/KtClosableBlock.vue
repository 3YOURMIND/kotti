<template>
	<div class="closable-block">
		<div class="closable-block__header">
			<div class="closable-block__title">
				<slot name="title">
					<i
						v-if="icon"
						v-text="icon"
						class="yoco closable-block__title__icon"
					/>
					<div class="closable-block__title__text">{{ title }}</div>
				</slot>
			</div>
			<div @click="toggle" class="closable-block__toggle">
				<i v-text="isOpen ? 'minus' : 'plus'" class="yoco" />
			</div>
		</div>
		<div
			:style="`--height: ${contentHeight}px`"
			:class="isOpen ? 'is-open' : 'is-close'"
			@click="setHeight"
			class="closable-block__content"
		>
			<div ref="contentInner" class="inner">
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtClosableBlock',
	props: {
		title: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
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
		// This is the best solution right now
		// It will handle the case when the content change
		// eslint-disable-next-line no-magic-numbers
		this.interval = setInterval(this.setHeight, 500)
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
.closable-block {
	margin-bottom: $unit-4;
	border-bottom: none;
	border-radius: 2px;
}

.closable-block__header {
	display: flex;
	justify-content: space-between;
	padding: $unit-2 $unit-8;
	border: 1px solid $lightgray-400;
}

.closable-block__title {
	flex-grow: 1;
	align-self: center;
	font-size: 16px;
	font-weight: 600;
}

.closable-block__content {
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

.closable-block__title__icon,
.closable-block__title__text {
	display: inline-block;
}

.closable-block__title__icon {
	margin-right: $unit-4;
	font-size: 26px !important;
	color: $primary-500;
}

.closable-block__toggle {
	align-self: center;
	margin-left: $unit-4;
	color: $primary-500;
	cursor: pointer;
	user-select: none;
}
</style>
