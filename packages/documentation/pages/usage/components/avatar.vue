<template lang="md">
<ComponentInfo v-bind="{ component }" />

Avatar is a round object to help identify the user information.

## Item

<div class="element-example">
	<KtAvatar
		name="Jony O'Five"
		hoverable
		src="https://picsum.photos/200/100"
		showTooltip
		class="mr-16px"
	/>
	<KtAvatar
		name="Jony O'Five"
		hoverable
		:selected="true"
		class="mr-16px"
	/>
	<KtAvatar
		name="Jony O'Five"
		small
		class="mr-16px"
	/>
</div>

Avatar has `name` and image `src`. If no image is given,
or image error occurs avatar will use a placeholder avatar.

Set `small` to make the avatar smaller.

```html
<KtAvatar
	name="Jony O'Five"
	hoverable
	src="https://picsum.photos/200/100"
	showTooltip
/>
<KtAvatar
	name="Jony O'Five"
	src="https://picsum.photos/200"
	selected
/>
<KtAvatar
	name="Jony O'Five"
	small
	src="https://picsum.photos/200"
/>
```

## Grouped

<div class="element-example">
	<KtAvatarGroup
		:items="avatarData"
		:showItems="3"
		showTooltip
		isStack
		hoverable
	/>
</div>

Avatars can be grouped to avatar groups. Using `items` props to pass the `avatarData`.
The example of the avatar data is shown here, which has same properities as avatar item:

```js
const avatarData = [
	{
		name: 'Justin',
		src: 'https://picsum.photos/100'
	},
	{
		name: 'Beoncye',
		src: 'https://picsum.photos/200'
	},
	{
		name: 'Simens',
		src: 'https://picsum.photos/120'
	}
];
```


Avatar group can be stacked by setting `isStack`.
You can control how many avatar items are displayed with `showItems`.

```html
<KtAvatarGroup
	:items="avatarData"
	:showItems="3"
	hoverable
	isStack
	showTooltip
/>
```

## Usage

### Avatar Attributes

| Attribute     | Description                 | Type      | Accepted values | Default |
|:--------------|:----------------------------|:----------|:----------------|:--------|
| `hoverable`   | add hover effects to avatar | `Boolean` | —               | `false` |
| `name`        | avatar name                 | `String`  | —               | —       |
| `selected`    | avatar selecte status       | `Boolean` | —               | `false` |
| `showTooltip` | show avatar name in tooltip | `Boolean` | —               | `false` |
| `small`       | set avatar to small size    | `Boolean` | —               | `false` |
| `src`         | avatar image                | `String`  | —               | —       |

### Avatar Group Attributes

| Attribute     | Description                                       | Type      | Accepted values | Default |
|:--------------|:--------------------------------------------------|:----------|:----------------|:--------|
| `isStack`     | stack avatars                                     | `Boolean` | —               | `false` |
| `items`       | avatar data array, each item has avatar attribute | `Array`   | —               | —       |
| `showItems`   | number of items to show                           | `Number`  | —               | `2`     |
| `showTooltip` | show avatar name in tooltip                       | `Boolean` | —               | `false` |
</template>

<script lang="ts">
import { KtAvatar } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAvatar',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			avatarData: [
				{ name: 'Beyonce', src: 'https://picsum.photos/200' },
				{ name: 'Justin', src: 'https://picsum.photos/100' },
				{ name: 'Britney', src: 'https://picsum.photos/130' },
				{ name: 'Eminem', src: 'https://picsum.photos/140' },
				{ name: 'Rihanna', src: 'https://picsum.photos/150' },
			],
			component: KtAvatar,
		}
	},
})
</script>
