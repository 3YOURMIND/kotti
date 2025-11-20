<template>
	<ComponentInfo v-bind="{ component }" />

	<p>
		Kotti uses 24 columns <code>span</code> grid system. With
		<code>row</code> and <code>col</code> it can create dynamic layout. Grid can
		be also easily customized.
	</p>

	<CodePreview
		code='`
		<KtRow>
			<KtCol :span="2"><div class="grid-content light" /></KtCol>
			<KtCol :span="4"><div class="grid-content dark" /></KtCol>
			<KtCol :span="8"><div class="grid-content light" /></KtCol>
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
		</KtRow>`'
		language="html"
	>
		<KtRow>
			<KtCol :span="2"><div class="grid-content light" /></KtCol>
			<KtCol :span="4"><div class="grid-content dark" /></KtCol>
			<KtCol :span="8"><div class="grid-content light" /></KtCol>
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
		</KtRow>
	</CodePreview>

	<h2>Gutter</h2>

	<p>
		The gutter in Kotti is <code>16px</code> (<code>8px</code> on each side of a
		column). You can change the gutter size by <code>gutter</code>.
	</p>

	<CodePreview
		code='`
		<KtRow :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content dark" /></KtCol>
		</KtRow>`'
		language="html"
	>
		<KtRow :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content dark" /></KtCol>
		</KtRow>
	</CodePreview>

	<h2>Gap</h2>

	By default there is no gap between two rows, and <code>gap</code> attribute
	specifies the number of pixes between two rows.

	<CodePreview
		code='`
		<KtRow :gap="20" :gutter="0">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="8"><div class="grid-content dark" /></KtCol>
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="0">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content dark" /></KtCol>
		</KtRow>`'
		language="html"
	>
		<KtRow :gap="20" :gutter="0">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="8"><div class="grid-content dark" /></KtCol>
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="0">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content dark" /></KtCol>
		</KtRow>
	</CodePreview>

	<h2>Offset</h2>

	<code>offset</code> attribute specifies the number of column offset from left.

	<CodePreview
		code='`
		<KtRow :gutter="20" :gap="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6" :offset="6"><div class="grid-content dark" /></KtCol>
		</KtRow>
		<KtRow :gutter="20" :gap="20">
			<KtCol :span="6" :offset="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
		</KtRow>`'
		language="html"
	>
		<KtRow :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :offset="6" :span="6"><div class="grid-content dark" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="20">
			<KtCol :offset="6" :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
		</KtRow>
	</CodePreview>

	<h2>Alignment</h2>

	You can change the justify of columns in one row by set
	<code>justify</code> attribute in <code>row</code>.

	<CodePreview
		code='`
		<KtRow :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="20" justify="center">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="20" justify="end">
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
			<KtCol :span="10"><div class="grid-content dark" /></KtCol>
		</KtRow>`'
		language="html"
	>
		<KtRow :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="20" justify="center">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="20" justify="end">
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
			<KtCol :span="10"><div class="grid-content dark" /></KtCol>
		</KtRow>
	</CodePreview>

	When columns has different height, <code>align</code> attribute specifies the
	columns alignment.

	<CodePreview
		code='`
		<KtRow :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>
		<KtRow align="center" :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>
		<KtRow align="bottom" :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>`'
		language="html"
	>
		<KtRow :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>
		<KtRow align="center" :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>
		<KtRow align="bottom" :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>
	</CodePreview>

	<h2>Responsive</h2>

	There are five media query breakpoints: <code>xs: 480px</code>,
	<code>sm: 600px</code>, <code>md: 840px</code> , <code>lg: 960px</code> and
	<code>xl: 1280px</code>. Breakpoint attribute accept <code>Number</code> as
	<code>span</code>.

	<CodePreview
		code='`
		<KtRow :gap="10">
			<KtCol :span="2" :xs="24"><div class="grid-content light" /></KtCol>
			<KtCol :sm="24" :span="3"><div class="grid-content dark" /></KtCol>
			<KtCol :md="24" :span="4"><div class="grid-content light" /></KtCol>
			<KtCol :lg="24" :span="5"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6" :xl="24"><div class="grid-content light" /></KtCol>
		</KtRow>`'
		language="html"
	>
		<KtRow :gap="10">
			<KtCol :span="2" :xs="24"><div class="grid-content light" /></KtCol>
			<KtCol :sm="24" :span="3"><div class="grid-content dark" /></KtCol>
			<KtCol :md="24" :span="4"><div class="grid-content light" /></KtCol>
			<KtCol :lg="24" :span="5"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6" :xl="24"><div class="grid-content light" /></KtCol>
		</KtRow>
	</CodePreview>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtCol, KtRow } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageLayoutsGridSystem',
	components: {
		CodePreview,
		ComponentInfo,
		KtCol,
		KtRow,
	},
	setup() {
		return {
			component: { meta: KtRow.meta, name: 'Grid System' },
		}
	},
})
</script>

<style lang="scss" scoped>
.grid-content {
	height: 40px;
	border-radius: 4px;
	opacity: 0.46;

	&.light {
		background: #3173de;
	}

	&.dark {
		background: #afc5e8;
	}

	&.tall {
		height: 80px;
	}
}
</style>
