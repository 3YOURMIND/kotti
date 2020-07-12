<template>
	<div class="test">
		<button @click="counter--">-</button>
		{{ counter }}
		<button @click="counter++">+</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

const Test = defineComponent({
	name: 'TheTest',
	setup() {
		const counter = ref(0)

		// sourcemaps? partially
		debugger

		return { counter }
	},
})

import { VueConstructor } from 'vue/types/umd'

/**
 * Takes a Vue Component and assigns an install function to it
 * this makes sure that it can be used with Vue.use(component)
 */
const makeInstallable = (component: VueConstructor<Vue>) =>
	Object.assign(component, {
		install: (Vue) => Vue.component(component.name, component),
	} as Vue.PluginObject<{}>)

export default makeInstallable(Test)
</script>

<style>
.test {
	background-color: red;
}
</style>
