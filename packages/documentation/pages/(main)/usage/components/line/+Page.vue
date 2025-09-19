<template>
	<ComponentInfo v-bind="{ component }" />

	<MarkdownBlock>
		`KtLine` is a horizontal line used to visually separate sections of content,
		improving readability and organization. It can be used to divide distinct
		blocks of information or to create a visual break within a layout.
	</MarkdownBlock>

	<LineForm :component="component" />

	<h2>Basic Usage</h2>

	<CodePreview
		code="
		{{ loremIpsum[0] }}
		<KtLine />
		{{ loremIpsum[1] }}"
		language="vue-html"
	>
		{{ loremIpsum[0] }}
		<KtLine />
		{{ loremIpsum[1] }}
	</CodePreview>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtLine } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

import LineForm from './LineForm.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		CodePreview,
		ComponentInfo,
		KtLine,
		LineForm,
	},
	setup() {
		return {
			component: KtLine,
			loremIpsum: [
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet est non convallis rutrum. Mauris tristique odio tincidunt odio ornare semper. Nulla commodo massa at elit euismod, nec sodales nisi efficitur. Maecenas pulvinar nunc ut pharetra imperdiet. Vivamus lacinia vulputate lacus in rhoncus. Etiam a placerat ipsum, nec pellentesque nunc. Suspendisse ex sapien, finibus nec ligula at, commodo molestie nisi. Pellentesque libero nisl, vehicula in faucibus id, porttitor nec tortor. Quisque condimentum pretium quam, consectetur euismod dolor fermentum et. Vestibulum eu nisi eu turpis rhoncus cursus a ultricies quam. Phasellus id dolor in nisi rutrum pulvinar at at dui.',

				'Vivamus dolor sapien, mattis eu urna sit amet, gravida tincidunt arcu. Pellentesque sagittis lobortis elit, vel ullamcorper tortor porttitor sit amet. Curabitur non semper nibh. Pellentesque sed ultrices erat, mollis tristique urna. Cras sed ornare metus. Ut aliquet vel ligula a ullamcorper. Aenean magna enim, elementum at vestibulum pulvinar, tincidunt ut neque. Sed mauris enim, pellentesque quis mattis vel, tempor nec purus. Ut congue id sem vel mollis.',

				'Duis pretium lacus non ipsum cursus sollicitudin. Sed a aliquam tortor. Nunc bibendum lectus a efficitur lobortis. Nulla facilisi. Nunc vitae fringilla diam, sed porttitor lorem. Maecenas quis congue ipsum. Quisque lobortis at turpis nec euismod. Quisque bibendum semper ante quis luctus. Donec laoreet turpis sed eros pharetra euismod. Vestibulum eget risus vehicula, condimentum mauris at, mollis nibh. Nam eu molestie est.',

				'Ut mauris dolor, rutrum vel dolor et, tempor consequat lacus. Praesent vel consequat ipsum. Etiam ac lacus gravida enim consequat placerat. Nunc ut nunc quis diam aliquet euismod. Proin auctor imperdiet varius. Nullam molestie posuere sapien id ornare. Morbi et sagittis velit, cursus vehicula ipsum. Morbi eleifend magna nibh, vel malesuada sem ultrices ac. Vivamus enim odio, tristique at nunc eget, sagittis finibus sapien. Morbi commodo ipsum sit amet suscipit posuere. Praesent accumsan quam sed leo feugiat mollis. Aliquam pretium justo quis condimentum condimentum. Ut ultrices lectus a rhoncus euismod. Aenean aliquet, ipsum et luctus pulvinar, enim leo tristique ipsum, id faucibus lectus magna finibus ligula. Maecenas rutrum ultrices nulla dignissim hendrerit. In ultricies nec orci eu sollicitudin.',
			],
		}
	},
})
</script>
