<template lang="md">
# Avatars

Avatar is a round object to help identify the user information.

## Item

<div class="element-example">
	<KtAvatar
		name="Jony O'Five"
		src="https://picsum.photos/200"
		:showTooltip="true"
		class="mr-16px"
	/>
	<KtAvatar
		name="Jony O'Five"
		:selected="true"
		class="mr-16px"
	/>
	<KtAvatar
		name="Jony O'Five"
		:small="true"
		class="mr-16px"
	/>
</div>

Avatar has `name` and image `src`. If no image is given,
or image error occurs avatar will fallback to default.

Set `small` to `true` for smaller avatar.

```html
	<KtAvatar
		name="Jony O'Five"
		src="https://picsum.photos/200"
		:showTooltip="true"
	/>
	<KtAvatar
		name="Jony O'Five"
		src="https://picsum.photos/200"
		:selected="true"
	/>
	<KtAvatar
		name="Jony O'Five"
		src="https://picsum.photos/200"
		:small="true"
	/>
```

## Grouped

<div class="element-example">
  <KtAvatarGroup
		:items="avatarData"
		:showItems="4"
		:showTooltip="true"
	/>
</div>

Avatars can be grouped to avatar groups. Using `items` props to pass the `avatarData`.
The example of the avatar data is shown here, which has same properities as avatar item:

```javascript
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
<div class="element-example">
  <KtAvatarGroup
		:items="avatarData"
		:showItems="4"
		:isStack="true"
	/>
	<KtAvatarGroup
		:items="avatarData"
		:showItems="2"
		:isStack="true"
	/>
</div>

Avatar group can be stacked by setting `isStack` to `true`.
You can control how many avatar items you need to show when `showItems` are setted.

```html
<KtAvatarGroup
	:items="avatarData"
	:isStack="true"
	:showItems="4"
	:showTooltip="true"
/>
```

## Usage

### Avatar Attributes

|Attribute|Description|Type|Accepted values|Default|
|---|---|---|---|---|---|
|name|avatar name|`string`|-|-|
|src|avatar image src|`string`|-|-|
|selected|avatar selecte status|`boolean`|-|`false`|
|small|set avatar to small size|`boolean`|-|`false`|
|showTooltip|show avatar name in tooltip|`boolean`|-|`false`|

### Avatar Group Attributes

|Attribute|Description|Type|Accepted values|Default|
|---|---|---|---|---|---|
|items|avatar data array, each item has avatar attribute|`array`|-|-|
|showItems|number of items to show|`number`|-|`2`|
|isStack|stack avatars|`boolean`|-|`false`|
|showTooltip|show avatar name in tooltip|`boolean`|-|`false`|

</template>

<script>
// import KtAvatar from '../../../packages/kotti-avatar/dist/kotti-avatar.esm';
// import KtAvatarGroup from '../../../packages/kotti-avatar-group/dist/kotti-avatar-group.esm';

export default {
	name: 'Avatar',
	components: {
		KtAvatar,
		KtAvatarGroup,
	},
	data() {
		return {
			avatarData: [
				{
					name: 'Justin',
					src: 'https://picsum.photos/100',
				},
				{
					name: 'Beoncye',
					src: 'https://picsum.photos/200',
				},
				{
					name: 'Simens',
					src: 'https://picsum.photos/120',
				},
				{
					name: 'Simens',
					src: 'https://picsum.photos/120',
				},
				{
					name: 'Simens',
					src: 'https://picsum.photos/120',
				},
			],
		};
	},
};
</script>
