<template lang="md">
# Banners

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
<KtBanner message="You material is not avaialbe to users" icon="announce" actionText="Publish" />
</div>

<ShowCase>

<div slot="vue">

```html
<KtBanner message="You material is not avaialbe to users" icon="announce" actionText="Publish" />
```

</div>

<div slot="style">

```html
<div class="banner">
  <div class="collapse">
    <div class="glyph">
      <i class="yoco">announce</i>
    </div>
    <div class="message">
      You material is not avaialbe to users
    </div>
    <div class="action">
      <button class="text">Publish</button>
    </div>
  </div>
</div>
```

</div>

</ShowCase>

### Expand Banner

It shows the most import message inside the banner but hides other
information. Use it when you want to create a clear, non-interrupting
interface.

<div class="element-example">
<KtBanner
  message="You material is not avaialbe to users" 
  icon="cloud"
  actionText="Publish"
  expandable="true"
  switchText="Open"
  switchCloseText="None">
  <div slot="expand">
  <h2>Order #100002</h2>
  <h3>Order information</h3>
  ....
  ....
  </div>
</KtBanner>
</div>

```html
<KtBanner
  message="You material is not avaialbe to users" 
  icon="cloud"
  actionText="Publish"
  switchText="Open"
  switchCloseText="None">
  <div slot="expand">
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
<KtBanner message="You material is not avaialbe to users" icon="announce" actionText="Publish" :isGrey="true"/>
</div>

```html
<KtBanner 
  message="You material is not avaialbe to users"
  icon="announce"
  actionText="Publish"
  :isGrey="true"/>
```

### Glyph

If you don't specify the icon text, you need add `glyph` slot.

<div class="element-example">
<KtBanner message="You material is not avaialbe to users" actionText="Publish">
<div slot="glyph"><img src="https://picsum.photos/24/24"></div>
</KtBanner>
</div>

```html
<KtBanner message="You material is not avaialbe to users" actionText="Publish">
<div slot="glyph"><img src="https://picsum.photos/24/24"></div>
</KtBanner>
```

## Usage

### Attribuites

|Attribute|Description|Type|Accepted values|Default|
|---|---|---|---|---|---|
|message|message in banner|`string`|-|-|
|icon|button icons|`string`|icon name in `yoco`|`announce`|
|isGrey|decide the background|`boolean`|-|`false`|
|actionText|text shows when banner is not expandable|`string`|-|-|
|switchText|text shows when expandable banner is collapsed|`string`|-|`View`|
|switchCloseText|text shows when expandable banner is expand|`string`|-|`Close`|

### Slot
|Name|Description|Type|Accepted values|Default|
|---|---|---|---|---|---|
|expand|button types|`string`|primary / second / text / danger|-|
|glyph|button icons|`string`|icon name in `yoco`|-|

</template>

<script>
import KtBanner from '../../packages/kotti-banner';
import ShowCase from '../components/ShowCase';
export default {
  name: 'Banners',
  components: {
    KtBanner, ShowCase
  },
};
</script>


