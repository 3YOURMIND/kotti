<template>
	<KtTranslationContext locale="en-US">
		<div style="padding: 50px;">
			<KtAccordion title="Hello Tree Shaking">
				<KtForm v-model="values">
					<KtHeading text="Test App" />
					<KtFieldText formKey="text" label="Text" />
					<!-- <KtFieldDate formKey="date" label="Date" /> -->
					<KtButton label="Submit" />
				</KtForm>
			</KtAccordion>
		</div>
	</KtTranslationContext>
</template>

<script lang="ts">
import '@3yourmind/yoco/style.css'
import {
	KtAccordion,
	KtButton,
	// KtFieldDate,
	KtFieldText,
	KtHeading,
	KtForm,
	KtTranslationContext,
} from '@3yourmind/kotti-ui'
import Vue from 'vue'

export default Vue.extend({
	name: 'App',
	components: {
		KtAccordion,
		KtButton,
		// KtFieldDate,
		KtFieldText,
		KtForm,
		KtHeading,
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

<style lang="scss">
@import '../../../node_modules/@3yourmind/kotti-ui/dist/styles.css';
</style>
