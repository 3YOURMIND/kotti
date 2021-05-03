<template lang="md">
<ComponentInfo v-bind="{ component }" />

Banners can be used as an alert at the top of the screen to display
critical messages or expandable information. It should not include a
dismiss icon, and should **only disappear** once the problem is **resolved**.

## Structure

![Banner Structure](~/assets/img/banner_alert.png)

1. **Glyph icon:** Indicates the type of this banner.
2. **Message:** Give a short description of this issue or summary of an important message.
3. **Action:** A textual call to action button to resolve this issue.

## Types

### Collapsed Banner

Only use this type of banner when this issue will cause a significant error.

<div class="element-example">
	<KtBanner message="You material is not available to users" icon="announce" actionText="Publish" />
</div>

```html
<KtBanner message="You material is not available to users" icon="announce" actionText="Publish" />
```

### Expand Banner

It shows the most import message inside the banner but hides other
information. Use it when you want to create a clear, non-interrupting
interface.

<div class="element-example">
	<KtBanner
		message="You material is not available to users"
		icon="cloud"
	>
		<div>
			<h2>Order #100002</h2>
			<h3>Order information</h3>
			....
			....
		</div>
	</KtBanner>
</div>

```html
<KtBanner
	message="You material is not available to users"
	icon="cloud"
>
	<div>
		<h2>Order #100002</h2>
		<h3>Order information</h3>
		....
		....
	</div>
</KtBanner>
```

## Style

### Background

You can use `banner-grey` to change the banner's background color,
this style is useful when you want add contrast to the page.

<div class="element-example white">
	<KtBanner
		message="You material is not available to users"
		icon="announce"
		actionText="Publish"
		isGray
	/>
</div>

```html
<KtBanner
	message="You material is not available to users"
	icon="announce"
	actionText="Publish"
	isGray
/>
```

## Usage

### Attributes

| Attribute         | Description                                    | Type      | Accepted values     | Default      |
|:------------------|:-----------------------------------------------|:----------|:--------------------|:-------------|
| `message`         | message in banner                              | `String`  | —                   | —            |
| `icon`            | icon name from `yoco`                          | `String`  | icon name in `yoco` | `"announce"` |
| `isGray`          | gray background for high contrast              | `Boolean` | —                   | `false`      |
| `actionText`      | text shows when banner is not expandable       | `String`  | —                   | —            |
| `expandLabel`      | text shows when expandable banner is collapsed | `String`  | —                   | `View`       |
| `expandCloseLabel` | text shows when expandable banner is expand    | `String`  | —                   | `Close`      |

</template>

<script lang="ts">
import { KtBanner } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'
import ShowCase from '~/components/ShowCase.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsBanner',
	components: {
		ComponentInfo,
		ShowCase,
	},
	setup() {
		return {
			component: KtBanner,
		}
	},
})
</script>
