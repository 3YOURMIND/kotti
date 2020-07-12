<template>
	<div class="test">
		<button @click="counter--">-</button>
		{{ counter }}
		<button @click="counter++">+</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
	name: "TheTest",
	setup() {
		const counter = ref(0);

		// sourcemaps? partially
		debugger;

		return { counter };
	}
});
</script>

<style>
.test {
	background-color: red;
}
</style>
