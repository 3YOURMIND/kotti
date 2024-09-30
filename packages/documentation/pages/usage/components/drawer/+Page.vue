<template>
	<ComponentInfo v-bind="{ component }" />

	<!-- prettier-ignore -->
	<MarkdownBlock>
Drawer is another layer of the interface. It adds more information or functionality to the current layout without messing up the elements.

It is best to place secondary functionality or information into the drawer, and only present the most important elements or interaction in the workspace.

## Structure

![Structure](./drawer_structure.png)

- **Drawer:** The size of drawer depends on information density.
- **Handle:** By clicking the handles, the drawer can be `Expanded` to display more information.
- **Background:** The background should be black `#000000` with `46%` opacity.

## Size
There are different ways to customize the width of the drawer.

Each drawer has a default state and a wide state, the transition can be triggered by clicking on the arrow at the edge of the drawer.

When the `isWide` flag is set to `true` the default state will be `26.8rem` wide, the expanded state will be `75%` of the screen width.

You can also customize the width of drawer by setting both `defaultWidth` and `expandWidth`. If only one values is set, this will not work

	</MarkdownBlock>

	<CodePreview
		:code="`
		    <!-- default width drawer -->
			<KtDrawer> ... </KtDrawer>

			<!-- Wide width drawer -->
				<KtDrawer isWide> ... </KtDrawer>

			<!-- Customize width drawer -->
			<KtDrawer defaultWidth=&quot;400px&quot; expandWidth=&quot;600px&quot;> ... </KtDrawer>
		`"
		language="vue-html"
	>
		<KtButton
			type="primary"
			class="mr-16px"
			@click="showDefaultWidthDrawer = true"
			label="Show Default Size Drawer"
		/>
		<KtButton
			type="primary"
			class="mr-16px"
			@click="showWideDrawer = true"
			label="Show Wide Size Drawer"
		/>
		<KtButton
			type="primary"
			@click="showCustomWidthDrawer = true"
			label="Customize Size Drawer"
		/>
		<KtDrawer
			v-if="showDefaultWidthDrawer"
			@close="showDefaultWidthDrawer = false"
		>
			<template #drawer-header>
				<h2>Default Size Drawer</h2>
			</template>
			<template #drawer-body>
				<p>Close from outside disabled</p>
			</template>
			<template #drawer-footer>
				<KtButton
					@click="showDefaultWidthDrawer = false"
					class="w-100"
					label="Close Drawer"
				/>
			</template>
		</KtDrawer>
		<KtDrawer v-if="showWideDrawer" isWide @close="showWideDrawer = false">
			<template #drawer-header>
				<h2>Wide Size Drawer</h2>
			</template>
			<template #drawer-body>
				<p>Close from outside allowed</p>
			</template>
			<template #drawer-footer>
				<KtButton
					@click="showWideDrawer = false"
					class="w-100"
					label="Close Drawer"
				/>
			</template>
		</KtDrawer>
		<KtDrawer
			v-if="showCustomWidthDrawer"
			defaultWidth="400px"
			expandWidth="600px"
			@close="showCustomWidthDrawer = false"
		>
			<template #drawer-header>
				<h2>Custom Size Drawer</h2>
			</template>
			<template #drawer-body>
				<p>Close from outside allowed</p>
			</template>
			<template #drawer-footer>
				<KtButton
					@click="showCustomWidthDrawer = false"
					class="w-100"
					label="Close Drawer"
				/>
			</template>
		</KtDrawer>
	</CodePreview>

	<h2>Close from outside</h2>

	<p>
		When the <code>disallowCloseOutside</code> flag is set, it prevents the user
		from accidentally closing the drawer by clicking outside of the drawer.
	</p>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
		<KtButton
				type="primary"
				class="mr-16px"
				@click="showDrawer = true"
				label="Show Drawer"
			/>
			<KtDrawer
				v-if="showDrawer"
				@close="showDrawer = false"
				disallowCloseOutside
			>
				<template #drawer-header>
					<h2>Default Size Drawer</h2>
				</template>
				<template #drawer-body>
					<p>Close from outside disabled</p>
				</template>
				<template #drawer-footer>
					<KtButton
						@click="showDrawer = false"
						class="w-100"
						label="Close Drawer"
					/>
				</template>
			</KtDrawer>
		`'
		language="vue-html"
	>
		<KtButton
			type="primary"
			class="mr-16px"
			@click="showDrawer = true"
			label="Show Drawer"
		/>
		<KtDrawer
			v-if="showDrawer"
			@close="showDrawer = false"
			disallowCloseOutside
		>
			<template #drawer-header>
				<h2>Default Size Drawer</h2>
			</template>
			<template #drawer-body>
				<p>Close from outside disabled</p>
			</template>
			<template #drawer-footer>
				<KtButton
					@click="showDrawer = false"
					class="w-100"
					label="Close Drawer"
				/>
			</template>
		</KtDrawer>
	</CodePreview>
</template>

<script lang="ts">
import { KtButton, KtDrawer } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsDrawer',
	components: {
		ComponentInfo,
		CodePreview,
		KtButton,
		KtDrawer,
	},
	data() {
		return {
			component: KtDrawer,
			showCustomWidthDrawer: ref(false),
			showDefaultWidthDrawer: ref(false),
			showDrawer: ref(false),
			showWideDrawer: ref(false),
		}
	},
})
</script>
