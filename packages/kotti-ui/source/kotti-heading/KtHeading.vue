<template>
	<div>
		<h3>
			<label v-text="text" />
			<span v-if="type === 'action'" @click="handleClick">
				{{ actionText }} <i class="yoco" v-text="icon" />
			</span>
			<span v-if="type === 'toggle'" @click="handleClick">
				{{ toggleTextRep }}
				<i
					class="yoco"
					v-text="toggleStatus ? Yoco.Icon.MINUS : Yoco.Icon.PLUS"
				/>
			</span>
		</h3>
		<div v-if="toggleStatus && type === 'toggle'">
			<slot />
		</div>
	</div>
</template>

<script>
import { Yoco } from '@3yourmind/yoco'

export default {
	name: 'KtHeading',
	props: {
		actionText: { type: String, default: '' },
		icon: { type: String, default: '' },
		text: { type: String, default: 'H3 Heading' },
		toggleCloseText: { type: String, default: 'Close' },
		toggleStatus: { type: Boolean, default: false },
		toggleText: { type: String, default: 'View' },
		type: { type: String, default: 'default' },
	},
	data() {
		return {
			Yoco,
		}
	},
	computed: {
		toggleTextRep() {
			return this.toggleStatus ? this.toggleCloseText : this.toggleText
		},
	},
	methods: {
		handleClick(event) {
			if (this.type === 'action') {
				this.$emit('click', event)
			}
			if (this.type === 'toggle') {
				this.$emit('toggle', event)
			}
		},
	},
}
</script>

<style lang="scss" scoped>
h3 {
	display: flex;
	align-items: center;

	label {
		flex: 1;
	}

	span {
		display: flex;
		align-items: center;
		float: right;
		font-weight: 500;
		color: var(--interactive-01);
		&:hover {
			color: var(--interactive-01);
			cursor: pointer;
		}
	}

	i.yoco {
		font-size: 1rem;
	}
}
</style>
