<template>
	<ComponentInfo v-bind="{ component }" />

	<!-- prettier-ignore -->
	<MarkdownBlock>
	## Skeleton Screen

	A skeleton screen gives a visual cue that content is loading one after the other into each UI element area. We suggest using skeleton screen for content densitive pages.


	There are three types of skeleton elements:

	1. **Circle:** Cicular shape which width and height are equal to parents' width, class name `circle`;
	2. **Square:** Width and height are equal to parents' width, class name `square`;
	3. **Rectangle:** Width equals to parents, height can be medium `md` or large `lg`.
	</MarkdownBlock>

	<CodePreview
		code='
			<div class="skeleton circle" />
			<div class="skeleton square"/>
			<div class="skeleton rectangle"/>

			<KtLoading type="circle" />
			<KtLoading type="square" />
			<KtLoading type="rectangle" />
		'
		language="html"
	>
		<div class="columns">
			<div class="column col-2">
				<div class="skeleton circle" />
			</div>
			<div class="column col-2">
				<div class="skeleton square" />
			</div>
			<div class="column col-8 col-with-row-gap">
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
				<div class="skeleton rectangle md" />
			</div>
		</div>
		<div class="columns">
			<div class="column col-2">
				<KtLoading type="circle" />
			</div>
			<div class="column col-2">
				<KtLoading type="square" />
			</div>
			<div class="column col-8 col-with-row-gap">
				<KtLoading type="rectangle-md" />
				<KtLoading type="rectangle-md" />
				<KtLoading type="rectangle-md" />
				<KtLoading type="rectangle-md" />
				<KtLoading type="rectangle-md" />
			</div>
		</div>
	</CodePreview>

	<p>Rectangle skeleton with different height.</p>

	<CodePreview
		code='
			<KtLoading type="rectangle" />
			<KtLoading type="rectangle-md" />
			<KtLoading type="rectangle-md" />
			<KtLoading type="rectangle-lg" />
		'
		language="html"
	>
		<div class="col-with-row-gap">
			<KtLoading type="rectangle" />
			<KtLoading type="rectangle-md" />
			<KtLoading type="rectangle-md" />
			<KtLoading type="rectangle-lg" />
		</div>
	</CodePreview>

	<h2>Spin Loading</h2>

	<p>
		Loading indicator is used for loading and updating.
		<code>loading</code> class is regular size, <code>lg</code> is large size.
	</p>

	<CodePreview
		code='
			<div class="loading"/>
			<div class="loading lg"/>
		'
		language="html"
	>
		<div class="columns">
			<div class="column col-6">
				<div class="loading" />
			</div>
			<div class="column col-6">
				<div class="loading lg" />
			</div>
		</div>
	</CodePreview>

	<p>
		You can also use animated loading indicator inline <code>inline</code> with
		other elements.
	</p>

	<CodePreview
		code='
			<button>
				<div class="loading inline"></div>
				Uploading
			</button>
		'
		language="html"
	>
		<button>
			<div class="loading inline" />
			Uploading
		</button>
	</CodePreview>

	<p>Using <code>white</code> class can change the ring color to white.</p>

	<CodePreview
		code='
			<button>
				<div class="loading inline white"></div>
				Uploading
			</button>
		'
		language="html"
	>
		<button>
			<div class="loading inline white" />
			Uploading
		</button>
	</CodePreview>

	<p>Using <code>gray</code> class can change the ring color to gray.</p>

	<CodePreview
		code='
			<button>
				<div class="loading inline gray"></div>
				Uploading
			</button>
		'
		language="html"
	>
		<button>
			<div class="loading inline gray" />
			Uploading
		</button>
	</CodePreview>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Kotti, KtLoading } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLoading',
	components: {
		CodePreview,
		ComponentInfo,
		KtLoading,
	},
	setup() {
		const component: { meta: Kotti.Meta; name: string } = {
			meta: {
				addedVersion: null,
				deprecated: null,
				designs: {
					type: Kotti.MetaDesignType.FIGMA,
					url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=99%3A45',
				},
				slots: {},
				typeScript: null,
			},
			name: 'Loadings',
		}

		return {
			component,
		}
	},
})
</script>

<style scoped>
.col-with-row-gap {
	display: flex;
	flex-direction: column;
	row-gap: 0.4rem;
}
</style>
