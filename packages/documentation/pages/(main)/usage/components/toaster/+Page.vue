<template>
	<ComponentInfo v-bind="{ component }" />

	<CodePreview
		code='
			<${parserHack.script} lang="ts">
			import { createToaster, KtButton, KtToast, KtToaster } from \x27@3yourmind/kotti-ui\x27

			const toaster = createToaster<{
				\x27my-link-toast\x27: {
					href: string,
					label: string,
				},
				\x27my-success-toast\x27: {}
			}>()

			const show = toaster.withOptions({ duration: 5000 })

			export default defineComponent({
				name: \x27Example\x27,
				components: {
					KtButton,
					KtToast,
					KtToaster,
				},
				setup () {
					// you can also try this in your browser console
					globalThis.toaster = toaster

					return {
						defaultToast: () => {
							show({
								text: \x27default toast\x27,
							})
						},
						linkToast: () => {
							show({
								custom: {
									href: \x27https://github.com/3YOURMIND/kotti\x27,
									label: \x27See documentation\x27,
								},
								text: \x27link toast\x27,
								type: \x27my-link-toast\x27,
							})
						},
						successToast: () => {
							show({
								text: \x27success toast\x27,
								type: \x27my-success-toast\x27,
							})
						},
					}
				}
			})
			</${parserHack.script}>

			<${parserHack.template}>
				<KtToaster :toaster="toaster">
					<${parserHack.template} #my-link-toast="{ custom, text }">
						<KtToast style="background-color: var(--purple-20)">
							<${parserHack.template} #text>
								<span v-text="text" />
								<a :href="custom.href">{{ custom.label }}</a>
							</${parserHack.template}>
						</KtToast>
					</${parserHack.template}>
					<${parserHack.template} #my-success-toast>
						<KtToast style="background-color: var(--green-20)" />
					</${parserHack.template}>
				</KtToaster>

				<div style="display: flex; gap: var(--unit-2)">
					<KtButton @click="defaultToast">default toast</KtButton>
					<KtButton @click="successToast">success toast</KtButton>
					<KtButton @click="linkToast">link toast</KtButton>
				</div>
			</${parserHack.template}>
		'
		fileName="Example.vue"
		language="vue"
	>
		<KtToaster :toaster="toaster">
			<template #my-link-toast="{ custom, text }">
				<KtToast style="background-color: var(--purple-20)">
					<template #text>
						<span v-text="text" />
						<a :href="custom.href">{{ custom.label }}</a>
					</template>
					<template #icon>
						<i class="yoco" v-text="'TODO'" />
					</template>
				</KtToast>
			</template>
			<template #my-success-toast>
				<KtToast style="background-color: var(--green-20)">
					<template #icon>
						<i class="yoco" v-text="'TODO'" />
					</template>
				</KtToast>
			</template>
		</KtToaster>

		<div style="display: flex; gap: var(--unit-6)">
			<KtButton @click="defaultToast">default toast</KtButton>
			<KtButton @click="successToast">success toast</KtButton>
			<KtButton @click="linkToast">link toast</KtButton>
		</div>
	</CodePreview>

	<h2>Usage</h2>

	<CodePreview
		code='
			import { success, toaster } from "~/shared/toaster.ts"

			export const someAction = async () => {
				// show a toast without waiting for it
				success({ text: \x27success\x27 })

				// wait for toast to be done showing, or to error when aborted
				await success({ text: \x27will wait for this toast\x27 }).done

				// abort the toast early
				const toBeAborted = success({ text: \x27will be aborted\x27 })
				toBeAborted.abort()

				// programmatically push any kind of notification
				toaster.show({ text: "anything", type: "error" })

				// create some custom show handlers with default options
				const customizedShow = toaster.withOptions({ type: "success" })
				const message = customizedShow({ text: \x27my message\x27 })
				await message.done
			}
		'
		fileName="~/store/my-module.ts"
		language="typescript"
	/>

	<CodePreview
		code='
			<${parserHack.script} lang="ts">
			import { defineComponent } from "vue"

			import { success } from "~/shared/toaster.ts"

			export default defineComponent({
				setup() {
					return {
						onClick: async () => {
							await success({
								text: "something went well",
							})
						}
					}
				}
			})
			</${parserHack.script}>

			<${parserHack.template}>
				<KtButton label="Show Toast" @click="onClick">
			</${parserHack.template}>
		'
		fileName="~/components/MyComponent.vue"
		language="vue"
	/>

	<h2>Initial Setup</h2>

	<MarkdownBlock>
		This is the per-app setup process for `KtToaster`
	</MarkdownBlock>

	<CodePreview
		code='
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
		'
		fileName="App.vue"
		language="vue"
	/>

	<CodePreview
		code='
			import { createToaster } from "@3yourmind/kotti-ui"

			// create a toaster instance, usually there should only ever be one per app
			export const toaster = createToaster()

			// show a maximum number of toasts simultaneously, defaults to 3
			// export const toaster = createToaster({numberOfToasts: 6})

			// define custom notification presets with pre-configured options
			export const error = toaster.withOptions({ duration: 5_000, type: "error" })
			export const success = toaster.withOptions({ duration: 5_000, type: "success" })
			export const successPersistent = toaster.withOptions({ type: "success" })
		'
		fileName="~/shared/toaster.ts"
		language="typescript"
	/>
</template>

<script lang="ts">
import {
	createToaster,
	KtButton,
	KtToast,
	KtToaster,
} from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

const toaster = createToaster()
const show = toaster.withOptions({ duration: 5000 })

export default defineComponent({
	name: 'DocumentationPageUsageComponentsToaster',
	components: {
		CodePreview,
		ComponentInfo,
		KtButton,
		KtToast,
		KtToaster,
	},
	setup() {
		// you can also try this in your browser console
		globalThis.toaster = toaster

		return {
			component: KtToaster,
			parserHack: {
				// HACK: parsers are angry when you say template
				script: 'script',
				template: 'template',
			},
			defaultToast: () => {
				show({
					text: 'default toast',
				})
			},
			linkToast: () => {
				show({
					custom: {
						href: 'https://github.com/3YOURMIND/kotti',
						label: 'See documentation',
					},
					text: 'link toast',
					type: 'my-link-toast',
				})
			},
			successToast: () => {
				show({
					text: 'success toast',
					type: 'my-success-toast',
				})
			},
			toaster,
		}
	},
})
</script>
