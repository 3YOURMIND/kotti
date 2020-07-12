<template>
	<div id="app">
		<Test />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Test } from "@3yourmind/kotti-ui";

export default Vue.extend({
	name: "App",
	components: {
		Test
	}
});
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
