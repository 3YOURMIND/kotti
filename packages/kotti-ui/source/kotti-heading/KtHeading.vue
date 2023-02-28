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

<script lang="ts">
import { isYocoIcon, Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'KtHeading',
	props: {
		actionText: { type: String, default: null },
		icon: { type: String, default: null, validator: isYocoIcon },
		text: { type: String, required: true },
		toggleCloseText: { type: String, default: 'Close' },
		toggleStatus: { type: Boolean, default: false },
		toggleText: { type: String, default: 'View' },
		type: { type: String, default: null },
	},
	setup(props, { emit }) {
		return {
			handleClick: (event) => {
				if (props.type === 'action') {
					emit('click', event)
				}
				if (props.type === 'toggle') {
					emit('toggle', event)
				}
			},
			toggleTextRep: computed(() =>
				props.toggleStatus ? props.toggleCloseText : props.toggleText,
			),
			Yoco,
		}
	},
})
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
