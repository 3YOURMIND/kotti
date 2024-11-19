<template>
	<div>
		<ComponentInfo :component="KtToaster" />

		<!-- prettier-ignore -->
		<CodePreviewNew
			:code='`
				<${parserHack.script} lang="ts">
				import { createToaster, KtButton, KtToast, KtToaster } from \x27@3yourmind/kotti-ui\x27

				const toaster = createToaster<{
					default: Record<string, never>
					\x27my-error-toast\x27: Record<string, never>
					\x27my-info-toast\x27: Record<string, never>
					\x27my-link-toast\x27: {
						href: string,
						label: string,
					},
					\x27my-minimalistic-toast\x27: Record<string, never>
					\x27my-success-toast\x27: Record<string, never>,
					\x27my-warning-toast\x27: Record<string, never>
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
									header: \x27default header\x27,
									text: \x27default toast\x27,
								})
							},
							errorToast: () => {
								show({
									text: \x27I am an error toast\x27,
									type: \x27my-error-toast\x27,
								})
							},
							infoToast: () => {
								show({
									text: \x27I am an info toast\x27,
									type: \x27my-info-toast\x27,
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
							minimalisticToast: () => {
								show({
									text: \x27minimalistic toast\x27,
									type: \x27my-minimalistic-toast\x27,
								})
							},
							permanentToast: () => {
								show({
									duration: null,
									text: \x27This is a one-line toast message. This is a one-line toast message. This is a one-line toast message.\x27,
								})
							},
							successToast: () => {
								show({
									text: \x27success toast\x27,
									type: \x27my-success-toast\x27,
								})
							},
							warningToast: () => {
								show({
									text: \x27I am a warning toast\x27,
									type: \x27my-warning-toast\x27,
								})
							},
						}
					}
				})
				</${parserHack.script}>

				<${parserHack.template}>
					<KtToaster :toaster=\x27toaster\x27>
						<${parserHack.template} #my-minimalistic-toast>
							<KtToast
								:type=\x27{
									icon: null,
									backgroundColor: \x27black\x27,
									darkColor: \x27black\x27,
									lightColor: \x27var(--gray-70)\x27
								}\x27
							/>
						</${parserHack.template}>
						<${parserHack.template} #my-link-toast=\x27{ custom, text }\x27>
							<KtToast>
								<${parserHack.template} #text>
									<span v-text=\x27text\x27 />
									<a :href=\x27custom.href\x27>{{ custom.label }}</a>
								</${parserHack.template}>
							</KtToast>
						</${parserHack.template}>
						<${parserHack.template} #my-error-toast>
							<KtToast type=\x27error\x27 />
						</${parserHack.template}>
						<${parserHack.template} #my-info-toast>
							<KtToast type=\x27info\x27 />
						</${parserHack.template}>
						<${parserHack.template} #my-success-toast>
							<KtToast type=\x27success\x27 />
						</${parserHack.template}>
						<${parserHack.template} #my-warning-toast>
							<KtToast type=\x27warning\x27 />
						</${parserHack.template}>
					</KtToaster>

					<div style=\x27display: flex; flex-wrap: wrap; gap: var(--unit-6);\x27>
						<KtButton @click=\x27defaultToast\x27>default toast</KtButton>
						<KtButton @click=\x27errorToast\x27>error toast</KtButton>
						<KtButton @click=\x27infoToast\x27>info toast</KtButton>
						<KtButton @click=\x27successToast\x27>success toast</KtButton>
						<KtButton @click=\x27warningToast\x27>warning toast</KtButton>
						<KtButton @click=\x27permanentToast\x27>permanent toast</KtButton>
						<KtButton @click=\x27minimalisticToast\x27>minimalistic toast</KtButton>
						<KtButton @click=\x27linkToast\x27>link toast</KtButton>
					</div>
				</${parserHack.template}>
			`'
			fileName="Example.vue"
			language="vue"
		>
			<KtToaster :toaster="toaster">
				<template #my-minimalistic-toast>
					<KtToast
						:type="{
							icon: null,
							backgroundColor: 'black',
							darkColor: 'black',
							lightColor: 'var(--gray-70)'
						}"
					/>
				</template>
				<template #my-link-toast="{ custom, text }">
					<KtToast>
						<template #text>
							<span v-text="text" />
							<a :href="custom.href">{{ custom.label }}</a>
						</template>
					</KtToast>
				</template>
				<template #my-error-toast>
					<KtToast type="error" />
				</template>
				<template #my-info-toast>
					<KtToast type="info" />
				</template>
				<template #my-success-toast>
					<KtToast type="success" />
				</template>
				<template #my-warning-toast>
					<KtToast type="warning" />
				</template>
			</KtToaster>

			<div style="display: flex; flex-wrap: wrap; gap: var(--unit-6);">
				<KtButton @click="defaultToast">default toast</KtButton>
				<KtButton @click="errorToast">error toast</KtButton>
				<KtButton @click="infoToast">info toast</KtButton>
				<KtButton @click="successToast">success toast</KtButton>
				<KtButton @click="warningToast">warning toast</KtButton>
				<KtButton @click="permanentToast">permanent toast</KtButton>
				<KtButton @click="minimalisticToast">minimalistic toast</KtButton>
				<KtButton @click="linkToast">link toast</KtButton>
			</div>
		</CodePreviewNew>

		<h2>Usage</h2>

		<CodePreviewNew
			code='
				import { success, toaster } from "~/shared/toaster.ts"

				export const someAction = async () => {
					// show a toast without waiting for it
					success({ text: "success" })

					// wait for toast to be done showing, or to error when aborted
					await success({ text: "will wait for this toast" }).done

					// abort the toast early
					const toBeAborted = success({ text: "will be aborted" })
					toBeAborted.abort()

					// programmatically push any kind of notification
					toaster.show({ text: "anything", type: "error" })

					// create some custom show handlers with default options
					const customizedShow = toaster.withOptions({ type: "success" })
					const message = customizedShow({ text: "my message" })
					await message.done
				}
			'
			fileName="~/store/my-module.ts"
			language="typescript"
		/>

		<!-- prettier-ignore -->
		<CodePreviewNew
			:code='`
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
			`'
			fileName="~/components/MyComponent.vue"
			language="vue"
		/>

		<h2>Initial Setup</h2>

		This is the per-app setup process for <code>KtToaster</code>

		<!-- prettier-ignore -->
		<CodePreviewNew
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

		<CodePreviewNew
			code='
				import { createToaster } from "@3yourmind/kotti-ui"

				// create a toaster instance, usually there should only ever be one per app
				export const toaster = createToaster<{
					default: Record<string, never>
					error: Record<string, never>
					success: Record<string, never>
				}>()

				// show a maximum number of toasts simultaneously, defaults to 3
				// export const toaster = createToaster({ numberOfToasts: 6 })

				// define custom notification presets with pre-configured options
				export const error = toaster.withOptions({ duration: 5_000, type: "error" })
				export const success = toaster.withOptions({ duration: 5_000, type: "success" })
				export const successPersistent = toaster.withOptions({ type: "success" })
			'
			fileName="~/shared/toaster.ts"
			language="typescript"
		/>

		<ComponentInfo :component="KtToast" />

		<nuxt-link to="/usage/components/banner">
			See <code>KtBanner</code>
		</nuxt-link>

		<!-- eslint-disable vue/no-useless-v-bind -->
		<!-- prettier-ignore -->
		<CodePreviewNew
			:code="`
				<KtToast type='error' />
				<KtToast type='info' />
				<KtToast type='success' />
				<KtToast type='warning' />
				<KtToast
					:type=\x22{
						icon: null,
						backgroundColor: 'var(--gray-10)',
						darkColor: 'var(--gray-70)',
						lightColor: 'var(--gray-20)'
					}\x22
				/>
			`"
			language="vue-html"
		/>
		<!-- eslint-enable vue/no-useless-v-bind -->
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
	createToaster,
	KtButton,
	KtToast,
	KtToaster,
} from '@3yourmind/kotti-ui'

import CodePreviewNew from '~/components/CodePreviewNew.vue'
import ComponentInfo from '~/components/ComponentInfo.vue'

const toaster = createToaster<{
	default: Record<string, never>
	'my-error-toast': Record<string, never>
	'my-info-toast': Record<string, never>
	'my-link-toast': {
		href: string
		label: string
	}
	'my-minimalistic-toast': Record<string, never>
	'my-success-toast': Record<string, never>
	'my-warning-toast': Record<string, never>
}>()
const show = toaster.withOptions({ duration: 5000 })

export default defineComponent({
	name: 'DocumentationPageUsageComponentsToaster',
	components: {
		CodePreviewNew,
		ComponentInfo,
		KtButton,
		KtToast,
		KtToaster,
	},
	setup() {
		// @ts-expect-error you can also try this in your browser console
		globalThis.toaster = toaster

		return {
			defaultToast: () => {
				show({
					header: 'default header',
					text: 'default toast',
				})
			},
			errorToast: () => {
				show({
					text: 'I am an error toast',
					type: 'my-error-toast',
				})
			},
			infoToast: () => {
				show({
					text: 'I am an info toast',
					type: 'my-info-toast',
				})
			},
			KtToast,
			KtToaster,
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
			minimalisticToast: () => {
				show({
					text: 'minimalistic toast',
					type: 'my-minimalistic-toast',
				})
			},
			parserHack: {
				// HACK: parsers are angry when you say template
				script: 'script',
				template: 'template',
			},
			permanentToast: () => {
				show({
					duration: null,
					text: 'This is a one-line toast message. This is a one-line toast message. This is a one-line toast message.',
				})
			},
			successToast: () => {
				show({
					text: 'I am a success toast',
					type: 'my-success-toast',
				})
			},
			toaster,
			warningToast: () => {
				show({
					text: 'I am a warning toast',
					type: 'my-warning-toast',
				})
			},
		}
	},
})
</script>
