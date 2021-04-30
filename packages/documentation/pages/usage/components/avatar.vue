<template lang="md">
<ComponentInfo :component="KtAvatar" />

Avatar is a round object to help identify the user information.

## Item

<div class="element-example">
	<KtAvatar
		class="mr-16px"
		isHoverable
		name="Jony O'Five"
		src="https://picsum.photos/200/100"
	/>
	<KtAvatar
		class="mr-16px"
		isHoverable
		isSelected
		name="Jony O'Five"
	/>
	<KtAvatar
		class="mr-16px"
		isHoverable
		isSelected
	/>
</div>

Avatar has `name` and image `src`. If no image is given,
or image error occurs avatar will use a placeholder avatar.

Set `:size="Kotti.Avatar.Size.SMALL"` to make the avatar smaller.

```html
<KtAvatar
	isHoverable
	name="Jony O'Five"
	src="https://picsum.photos/200/100"
/>
<KtAvatar
	isSelected
	name="Jony O'Five"
	src="https://picsum.photos/200"
/>
<KtAvatar
	name="Jony O'Five"
	:size="Kotti.Avatar.Size.SMALL"
	src="https://picsum.photos/200"
/>
```

<ComponentInfo :component="KtAvatarGroup" />

<div class="element-example">
	<KtAvatarGroup
		:count="3"
		isHoverable
		:items="avatarData"
	/>
	<br/>
	<KtAvatarGroup
		:count="3"
		isHoverable
		isStack
		:items="avatarData"
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
You can control how many avatar items are displayed with `count`.

```html
<KtAvatarGroup
	:count="3"
	isHoverable
	isStack
	:items="avatarData"
/>
```

## `isStack`

<div class="element-example">
	<KtAvatarGroup
		:count="3"
		isHoverable
		isStack
		:items="avatarData"
	/>
</div>

## Size

### Small

<div class="element-example">
	<KtAvatarGroup
		:count="3"
		isHoverable
		isStack
		:items="avatarData"
		:size="Kotti.Avatar.Size.SMALL"
	/>
</div>

### Medium

<div class="element-example">
	<KtAvatarGroup
		:count="3"
		isHoverable
		isStack
		:items="avatarData"
		:size="Kotti.Avatar.Size.MEDIUM"
	/>
</div>

### Large

<div class="element-example">
	<KtAvatarGroup
		:count="3"
		isHoverable
		isStack
		:items="avatarData"
		:size="Kotti.Avatar.Size.LARGE"
	/>
</div>
</template>

<script lang="ts">
import { Kotti, KtAvatar, KtAvatarGroup } from '@3yourmind/kotti-ui'
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
				{ name: 'Beoncye', src: 'https://picsum.photos/200' },
				{ name: 'Justin', src: 'https://picsum.photos/100' },
				{ name: 'Simens', src: 'https://picsum.photos/130' },
				{ name: 'Simens', src: 'https://picsum.photos/140' },
				{ name: 'Simens', src: 'https://picsum.photos/150' },
			],
			Kotti,
			KtAvatar,
			KtAvatarGroup,
		}
	},
})
</script>
