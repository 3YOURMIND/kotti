<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Usage</h2>

	<CodePreview
		:code="`
			import { success, toaster } from &quot;~/shared/toaster.ts&quot;

			export const someAction = async () => {
				// push a notification without waiting for it
				success({ tbd: true })

				// wait for notification to be done showing, or to error when aborted
				await success({ tbd: true }).done

				// abort the notification early
				const succ = success({ tbd: true })
				succ.abort()

				// programmatically push any kind of notification
				toaster.push({ message: &quot;TODO: message?&quot;, type: &quot;error&quot; })

				// create a designated message pusher
				const customPusher = toaster.createPusher({ type: &quot;success&quot; })
				const message = customPusher()
				await message.done
			}
		`"
		fileName="~/store/my-module.ts"
		language="typescript"
	/>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<script lang="ts">
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
			</script>

			<${template}>
				<KtButton label="Send Notification" @click="onClick">
			</${template}>
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
			<${template}>
				<KtToaster :toaster="toaster" />
			</${template}>

			<script lang="ts">
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
			</script>
		`'
		fileName="App.vue"
		language="vue"
	/>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			import { createToaster } from "@3yourmind/kotti-ui"

			// create a toaster instance, usually there should only ever be one per app
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
			<${template}>
				<KtToaster />
			</${template}>

			<script lang="ts">
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
			</script>
		`'
		fileName="App.vue"
		language="vue"
		type="preview"
	/>
</template>

<script lang="ts">
import { KtButton, KtToaster } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

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
			template: 'template', // HACK: parsers are angry when you say template
		}
	},
})
</script>
