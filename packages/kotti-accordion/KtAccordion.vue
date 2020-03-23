<template>
	<div class="accordion">
		<div
			class="accordion__header"
			:class="{ 'accordion__header--clickable': isFullyClickable }"
			@click="headerToggle"
		>
			<div class="accordion__title">
				<slot name="title">
					<i v-if="icon" class="yoco accordion__title__icon" v-text="icon" />
					<div class="accordion__title__text">{{ title }}</div>
				</slot>
			</div>
			<div class="accordion__toggle" @click="toggle">
				<i class="yoco" v-text="isOpen ? 'minus' : 'plus'" />
			</div>
		</div>
		<div
			:style="`--height: ${contentHeight}px`"
			:class="isOpen ? 'is-open' : 'is-close'"
			class="accordion__content"
			@click="setHeight"
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
		isFullyClickable: {
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
		headerToggle() {
			if (this.isFullyClickable) this.toggle()
		},
		toggle() {
			this.setHeight()
			this.isOpen = !this.isOpen
		},
	},
}
</script>
<style lang="scss">
:root {
	--accordion-color: var(--interactive-03);
}
@import '../kotti-style/_variables.scss';
.accordion {
	margin-bottom: var(--unit-4);
	border-bottom: none;
	border-radius: 2px;
}

.accordion__header {
	display: flex;
	justify-content: space-between;
	padding: var(--unit-2) var(--unit-8);
	border: 1px solid var(--ui-02);
}
.accordion__header--clickable {
	cursor: pointer;
}

.accordion__title {
	flex-grow: 1;
	align-self: center;
	font-size: 16px;
	font-weight: 600;
}

.accordion__content {
	overflow: hidden;
	border: 1px solid var(--ui-02);
	border-top: none;
	transition: height 200ms linear;
	.inner {
		padding: var(--unit-2) var(--unit-8);
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
	margin-right: var(--unit-4);
	font-size: 22px !important;
	color: var(--accordion-color);
}

.accordion__toggle {
	align-self: center;
	margin-left: var(--unit-4);
	color: var(--accordion-color);
	cursor: pointer;
	user-select: none;
}
</style>
