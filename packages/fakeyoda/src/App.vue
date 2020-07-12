<template>
	<div id="app">
		<KtForm :value="{ example: 'sdfdsfds' }">
			<KtFieldText formKey="example" label="Example" />
		</KtForm>
	</div>
</template>

<script lang="ts">
import { KtForm, KtFieldText } from '@3yourmind/kotti-ui'
import Vue from 'vue'

export default Vue.extend({
	name: 'App',
	components: {
		KtForm,
		KtFieldText,
	},
})
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
