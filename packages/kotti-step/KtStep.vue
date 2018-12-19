<template>
	<div class="kt-step">
		<div class="kt-steps-left">
			<span
				:class="classSwitcher('kt-steps-left__line')"
				:style="lineStyle"
				v-if="showLine && !isLastStep"
			/>
			<div
				:class="classSwitcher('kt-steps-left__indicator')"
				:style="indicatorStyle"
			>
				<span v-text="index" />
				<i class="yoco" v-if="!index" v-text="iconText" />
			</div>
		</div>
		<div class="kt-steps-right">
			<div class="kt-steps-right__title" v-text="title" />
			<div class="kt-steps-right__description" v-text="description" />
		</div>
	</div>
</template>

<script>
import color from 'color'

export default {
	name: 'KtStep',
	props: {
		icon: { type: String, default: null },
		title: { type: String, default: 'Title' },
		description: { type: String, default: null },
		showLine: { type: Boolean, default: true },
		status: {
			default: null,
			type: String,
			validator: value =>
				['error', 'finished', 'process', 'wait'].includes(value),
		},
		indexNumber: { type: Number, default: null },
	},
	inject: {
		KtTheme: {
			default: {
				brandColor: '#2C64CC',
			},
		},
	},
	data() {
		return {
			currentStatus: '',
			index: null,
			isLastStep: false,
		}
	},
	created() {
		this.currentStatus = this.status
		this.index = this.indexNumber
	},
	watch: {
		status(val) {
			this.currentStatus = val
		},
	},
	computed: {
		iconText() {
			if (this.icon) return this.icon

			switch (this.currentStatus) {
				case 'wait':
				case 'process':
					return 'circle_load'
				case 'finished':
					return 'check'
				case 'error':
					return 'circle_close'
				default:
					return 'check'
			}
		},
		indicatorStyle() {
			switch (this.currentStatus) {
				case 'wait':
				case 'error':
					return
				default:
					return {
						background: this.KtTheme.brandColor,
					}
			}
		},
		lineStyle() {
			const lightBrandColor = color(this.KtTheme.brandColor).lighten(0.5)
			if (this.currentStatus === 'finished' || this.currentStatus === null)
				return {
					background: this.KtTheme.brandColor,
				}

			if (this.currentStatus === 'process')
				return {
					background: `linear-gradient(${
						this.KtTheme.brandColor
					}, ${lightBrandColor},${this.KtTheme.brandColor})`,
				}
		},
	},
	methods: {
		classSwitcher(baseClass) {
			switch (this.currentStatus) {
				case 'process':
					return `${baseClass} ${baseClass}--loading`
				case 'error':
				case 'wait':
					return `${baseClass} ${baseClass}--outline`
				default:
					return baseClass
			}
		},
	},
}
</script>

<style lang="scss">
.kt-step {
	display: flex;
	overflow: hidden;
}

.kt-steps-left {
	position: relative;

	&__indicator {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 24px;
		width: 24px;
		background: #2c64cc;
		border-radius: 100%;

		span,
		i {
			font-weight: bolder;
			color: #ffffff;
			font-size: 0.8rem;
		}

		&--outline {
			height: 24px;
			background: transparent;
			border: 4px solid #ddd;

			span,
			i {
				color: #ddd;
			}
		}

		&--loading i {
			animation: iconspin 1.5s ease-in-out infinite;
		}
	}

	&__line {
		z-index: 0;
		position: absolute;
		display: block;
		width: 4px;
		height: 100%;
		top: 0;
		left: 10px;
		background: #2c63cc;

		&--outline {
			top: 24px;
			background: #ddd;
		}

		&--loading {
			background: linear-gradient(#2c63cc, #9ab6ee, #2c63cc);
			background-position: 4px 100%;
			animation: lineloading 1.5s ease-in-out infinite;
		}
	}
}

.kt-steps-right {
	&__title {
		font-weight: 600;
		margin-left: 0.4rem;
	}

	&__description {
		font-size: 0.9em;
		margin-left: 0.4rem;
		color: #8a8a8a;
		margin-bottom: 0.4rem;
	}
}

@keyframes iconspin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes lineloading {
	0% {
		background-position: 0 -50px;
	}

	100% {
		background-position: 0 50px;
	}
}
</style>
