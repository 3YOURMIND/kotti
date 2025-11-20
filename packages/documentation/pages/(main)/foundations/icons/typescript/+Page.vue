<template>
	<h1>TypeScript Usage</h1>

	<h3>TS Example</h3>

	<CodePreview
		code='
			// enum of icons and the associated ligature / svg name
			import { Yoco } "@3yourmind/yoco"

			console.log(Yoco.Icon.ANNOUNCE)
			// "announce"
		'
		language="typescript"
	/>

	<h3>Vue Example</h3>

	<CodePreview
		code='
			<script lang="ts">
			import { Yoco } from "@3yourmind/yoco"
			import { defineComponent } from "vue"

			export default defineComponent({
				name: "Example",
				setup() {
					return {
						Yoco,
					}
				},
			})
			</script>

			<template>
				<!-- this is usually the best way to use yoco, but it won’t detect typos -->
				<i class="yoco">announce</i>

				<!-- or -->

				<!-- using the enum will catch typos at build time -->
				<i class="yoco" v-text="Yoco.Icon.ANNOUNCE" />
			</template>
		'
		language="vue"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'

export default defineComponent({
	name: 'DocumentationPageIconsTypeScript',
	components: {
		CodePreview,
	},
})
</script>
