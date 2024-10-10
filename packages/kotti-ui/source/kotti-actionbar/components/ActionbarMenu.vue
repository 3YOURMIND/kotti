<template>
	<div class="kt-actionbar-nav">
		<!-- FIXME: External Dependencies Should not Be Used without Injection -->
		<router-link v-for="(item, index) in menu" :key="index" :to="item.to">
			<li class="kt-actionbar-nav__item" :class="navItemClass(item)">
				<i
					class="yoco kt-actionbar-nav__icon"
					:class="`kt-actionbar-nav__icon--${menuStyle.iconPosition}`"
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

export default defineComponent({
	name: 'ActionbarMenu',
	props: {
		menu: {
			required: true,
			type: Array as PropType<KottiActionbar.PropsInternal['menu']>,
		},
		menuStyle: {
			required: true,
			type: Object as PropType<KottiActionbar.PropsInternal['menuStyle']>,
		},
	},
	setup() {
		return {
			navItemClass: (item: KottiActionbar.MenuItem) => ({
				'kt-actionbar-nav__item--active': item.active,
				'kt-actionbar-nav__item--disabled': item.disabled,
			}),
		}
	},
})
</script>
