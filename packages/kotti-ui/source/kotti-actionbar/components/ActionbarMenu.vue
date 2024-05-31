<template>
	<div class="kt-actionbar-nav">
		<!-- FIXME: External Dependencies Should not Be Used without Injection -->
		<router-link v-for="(item, index) in menu" :key="index" :to="item.to">
			<li class="kt-actionbar-nav__item" :class="navItemClass(item)">
				<i
					class="yoco kt-actionbar-nav__icon"
					:class="`kt-actionbar-nav__icon--${iconPosition}`"
					v-text="item.icon"
				/>
				<span class="kt-actionbar-nav__label" v-text="item.label" />
			</li>
		</router-link>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { KottiActionbar } from '../types'

type Menu = KottiActionbar.PropsInternal['menu']

export default defineComponent({
	name: 'ActionbarMenu',
	props: {
		menu: {
			required: true,
			type: Array as PropType<Menu>,
		},
		iconPosition: {
			default: 'left',
			type: String as PropType<'left' | 'right'>,
		},
	},
	setup() {
		return {
			navItemClass: (item: Menu[number]) => ({
				'kt-actionbar-nav__item--active': item.active,
				'kt-actionbar-nav__item--disabled': item.disabled,
			}),
		}
	},
})
</script>
