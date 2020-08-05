<template>
	<div id="app">
		<KtForm v-model="values">
			<KtTranslationContext locale="en-US">
				<KtFieldText formKey="text" label="Text" />
				<KtFieldDate formKey="date" label="Date"
			/></KtTranslationContext>
		</KtForm>
	</div>
</template>

<script lang="ts">
import '@3yourmind/yoco'
import '@3yourmind/kotti-ui/dist/styles.css'
import {
	KtFieldDate,
	KtFieldText,
	KtForm,
	KtTranslationContext,
} from '@3yourmind/kotti-ui'
import Vue from 'vue'

export default Vue.extend({
	name: 'App',
	components: {
		KtFieldDate,
		KtFieldText,
		KtForm,
		KtTranslationContext,
	},
	data() {
		return {
			values: {
				date: null,
				text: null,
			},
		}
	},
})
</script>
