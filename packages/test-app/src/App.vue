<template>
	<div id="app">
		<KtForm :value="{ example: 'sdfdsfds' }">
			<KtFieldText formKey="example" label="Example" />
		</KtForm>
	</div>
</template>

<script lang="ts">
import '@3yourmind/kotti-ui/dist/styles.css'
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
