<template lang="md">
# Avatar

Avatar is a round object to help identify the user information.

## Item

<div class="element-example">
<KtAvatar
  name="Johny O'Five"
  src="https://picsum.photos/200"
  showTooltip="true"
/>
<KtAvatar
  name="Justin O\'Five'"
  src="https://picsum.photos/200"
  selected="true"
/>
<KtAvatar
  name="Justin O\'Five'"
  src="https://picsum.photos/200"
  small="true"
/>
</div>

```html
<KtAvatar name="Johny O'Five" src="https://picsum.photos/200" showTooltip="true"/>
<KtAvatar name="Johny O'Five" src="https://picsum.photos/100" selected="true"/>
<KtAvatar name="Johny O'Five'" src="https://picsum.photos/120" small="true"/>
```



## Grouped

<div class="element-example">
<KtAvatarGroup :items="avatarData"/>
<KtAvatarGroup :items="avatarData" isStack="true"/>
</div>

```html
<KtAvatarGroup :items="avatarData"/>
<KtAvatarGroup :items="avatarData" isStack="true"/>
 ```

<div class="element-example">
  <KtAvatarGroup :items="avatarData" :showItems="4" isStack="true" showTooltip="true"/>
</div>

```html
 <KtAvatarGroup :items="avatarData" :showItems="4" isStack="true" showTooltip="true"/>
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
import KtAvatar from '../../packages/kotti-avatar'
import KtAvatarGroup from '../../packages/kotti-avatarGroup'

export default {
  name: 'Avatar',
  components: {
    KtAvatar, KtAvatarGroup
  },
  data() {
    return {
      avatarData: [{
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
      }]
    }
  }
}
</script>
