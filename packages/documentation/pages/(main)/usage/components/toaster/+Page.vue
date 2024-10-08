<template>
	<ComponentInfo v-bind="{ component }" />

	<KtToaster :toaster="toaster" />

	<KtButton @click="sudoMakeMeAToast">sudo make me a toast</KtButton>
	<br />

	<h2>Usage</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			import { success, toaster } from "~/shared/toaster.ts"

			export const someAction = async () => {
				// push a notification without waiting for it
				success({ tbd: true })

				// wait for notification to be done showing, or to error when aborted
				await success({ tbd: true }).done

				// abort the notification early
				const succ = success({ tbd: true })
				succ.abort()

				// programmatically push any kind of notification
				toaster.push({ message: "TODO: message?", type: "error" })

				// create a designated message pusher
				const customPusher = toaster.createPusher({ type: "success" })
				const message = customPusher()
				await message.done
			}
		`'
		fileName="~/store/my-module.ts"
		language="typescript"
	/>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<${parserHack.script} lang="ts">
			import { defineComponent } from "vue"

			import { success } from "~/shared/toaster.ts"

			export default defineComponent({
				setup() {
					return {
						onClick: async () => {
							await success({
								some: "options",
								and: "message",
							})
						}
					}
				}
			})
			</${parserHack.script}>

			<${parserHack.template}>
				<KtButton label="Send Notification" @click="onClick">
			</${parserHack.template}>
		`'
		fileName="~/components/MyComponent.vue"
		language="vue"
	/>

	<h2>Initial Setup</h2>

	<!-- prettier-ignore -->
	<MarkdownBlock>
		This is the per-app setup process for `KtToaster`
	</MarkdownBlock>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<${parserHack.template}>
				<KtToaster :toaster="toaster" />
			</${parserHack.template}>

			<${parserHack.script} lang="ts">
			import { defineComponent } from "vue"

			import { toaster } from "~/shared/toaster.ts"

			export default defineComponent({
				setup() {
					return {
						// KtToaster needs a reference to your per-app toaster instance
						toaster
					}
				}
			})
			</${parserHack.script}>
		`'
		fileName="App.vue"
		language="vue"
	/>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			import { createToaster } from "@3yourmind/kotti-ui"

			// create a toaster instance, usually there should only ever be one per app
			// TODO: consider splitting API in public and private
			export const toaster = createToaster()

			// define custom notification types with pre-configured options
			export const error = toaster.createPusher({ duration: 5_000, type: "error" })
			export const success = toaster.createPusher({ duration: 5_000, type: "success" })
			export const successPersistent = toaster.createPusher({ type: "success" })

			// possibly?
			export const provideToaster = toaster.provideToaster
		`'
		fileName="~/shared/toaster.ts"
		language="typescript"
	/>

	<h2>Alternative Setup</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<${parserHack.template}>
				<KtToaster />
			</${parserHack.template}>

			<${parserHack.script} lang="ts">
			import { KT_TOASTER_CONTEXT } from "@3yourmind/kotti-ui"
			import { defineComponent } from "vue"

			import { provideToaster, toaster } from "~shared/toaster.ts"

			export default defineComponent({
				setup() {
					provideToaster()

					provide(KT_TOASTER_CONTEXT, toaster)

					return {}
				}
			})
			</${parserHack.script}>
		`'
		fileName="App.vue"
		language="vue"
		type="preview"
	/>
</template>

<script lang="ts">
import { createToaster, KtButton, KtToaster } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

const toaster = createToaster()

export default defineComponent({
	name: 'DocumentationPageUsageComponentsToaster',
	components: {
		CodePreview,
		ComponentInfo,
		KtButton,
		KtToaster,
	},
	setup() {
		return {
			component: KtToaster,
			sudoMakeMeAToast: () => {
				toaster.push({ text: 'some message', duration: 1500 })
			},
			toaster,
			parserHack: {
				// HACK: parsers are angry when you say template
				script: 'script',
				template: 'template',
			},
		}
	},
})
</script>
