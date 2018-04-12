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

## Banner Types

### Collapsed Banner

Only use this type of banner when this issue will cause a significant error.

<div class="element-example">
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
</div>

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

You can use `banner-grey` to change the banner's background color, 
this style is useful when you want add contrast to the page.

<div class="banner banner-grey">
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

```html
<div class="banner banner-grey">
  ...
</div>
```

### Expand Banner

It shows the most import message inside the banner but hides other
information. Use it when you want to create a clear, non-interrupting
interface.

<div class="banner banner-grey">
  <div class="collapse">
    <div class="glyph">
      <i class="yoco">invoice</i>
    </div>
    <div class="message">
      You material is not avaialbe to users
    </div>
    <div class="action">
      <button class="text">Close</button>
    </div>
  </div>
  <div class="expand">
    <h2>Order #100002</h2>
    <h3>Order information</h3>
    ....
    ....
  </div>
</div>

```html
<div class="banner banner-grey">
  <div class="collapse">
    ...
  </div>
  <div class="expand">
    <h2>Order #100002</h2>
    <h3>Order information</h3>
    ....
    ....
  </div>
</div>
```
</template>

<script>
import KtBanner from '../../packages/kotti-banner'
export default {
  name: 'Banners',
  components: {
    KtBanner
  }
}
</script>

<style lang="scss" scoped>

</style>
