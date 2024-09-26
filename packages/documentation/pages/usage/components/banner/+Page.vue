<template>
	<ComponentInfo v-bind="{ component }" />

	<!-- prettier-ignore -->
	<MarkdownBlock>
	Banners can be used as an alert at the top of the screen to display
    critical messages or expandable information. It should not include a
    dismiss icon, and should **only disappear** once the problem is **resolved**.

    ## Structure

    ![Banner Structure](./banner_alert.png)

    1. **Glyph icon:** Indicates the type of this banner.
    2. **Message:** Give a short description of this issue or summary of an important message.
    3. **Action:** A textual call to action button to resolve this issue.

    ## Types

    ### Collapsed Banner

    Only use this type of banner when this issue will cause a significant error.
	</MarkdownBlock>

	<div class="element-example">
		<KtBanner
			message="Your material is not published yet"
			icon="announce"
			actionText="Publish"
		/>
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
		```vue
		<KtBanner
			message="Your material is not published yet"
			icon="announce"
			actionText="Publish"
		/>
		```

		### Expand Banner It shows the most import message inside the banner but
		hides other information. Use it when you want to create a clear,
		non-interrupting interface.
	</MarkdownBlock>

	<div class="element-example">
		<KtBanner message="Your material is not published yet" icon="cloud">
			<div>
				<h2>Order #100002</h2>
				<h3>Order information</h3>
				.... ....
			</div>
		</KtBanner>
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
		```vue
		<KtBanner message="Your material is not published yet" icon="cloud">
			<div>
				<h2>Order #100002</h2>
				<h3>Order information</h3>
				.... ....
			</div>
		</KtBanner>
		```

		## Style

		### Background

		You can use `banner-gray` to change the banner's
		background color, this style is useful when you want add contrast to the page.
	</MarkdownBlock>

	<div class="element-example white">
		<KtBanner
			message="Your material is not published yet"
			icon="announce"
			actionText="Publish"
			isGray
		/>
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
```vue
<KtBanner
	message="Your material is not published yet"
	icon="announce"
	actionText="Publish"
	isGray
/>
```

## Usage

### Attributes

| Attribute          | Description                                    | Type      | Accepted values     | Default      |
|--------------------|------------------------------------------------|-----------|---------------------|--------------|
| `message`          | message in banner                              | `String`  | —                   | —            |
| `icon`             | icon name from `yoco`                          | `String`  | icon name in `yoco` | `"announce"` |
| `isGray`           | gray background for high contrast              | `Boolean` | —                   | `false`      |
| `actionText`       | text shows when banner is not expandable       | `String`  | —                   | —            |
| `expandLabel`      | text shows when expandable banner is collapsed | `String`  | —                   | `View`       |
| `expandCloseLabel` | text shows when expandable banner is expand    | `String`  | —                   | `Close`      |1
	</MarkdownBlock>
</template>

<script lang="ts">
import { KtBanner } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBanner',
	components: {
		ComponentInfo,
		KtBanner,
	},
	setup() {
		return {
			component: KtBanner,
		}
	},
})
</script>
