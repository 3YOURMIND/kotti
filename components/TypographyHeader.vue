<template lang="md">
## Headers

![Headers](~/assets/img/typography_header.png)

|Header|Basic Properties|UI Properties|
|----|----|----|
|**H1 Page header**<br/>Without actionbar, the page header can be used in the workspace.|font-size: `32px`;<br/>font-weight: `600`;<br/>color: `$darkgrey-500`;|line-height: `48px`; |
|**H2 Subpage Header**<br/>Used for second level header, or main title in action bar.|font-size: `24px`;<br/>font-weight: `600`;<br/>color: `$darkgrey-500`;|line-height: `32px`;<br/>margin-top: `16px`;|
|**H3 Section Header**<br/>Used to divide each section.|font-size: `16px`;<br/>font-weight: `600`;<br/>color: `$primary-500`;|line-height: `24px`;<br/>margin-top: `16px`;<br/>padding-bottom: `8px`;|
|**H3 Section Header with actions**<br/>Text button for actions.|--|--|

<div class="element-example">
<h1>H1 Page Header</h1>
<h2>H2 Subpage Header</h2>
<h3>H3 Section Header</h3>
<h3>H3 Section Header
  <span>Actions<i class="yoco">plus</i></span>
</h3>
</div>

```html
<h1>H1 Page Header</h1>
<h2>H2 Subpage Header</h2>
<h3>H3 Section Header</h3>
<h3>H3 Section Header
  <span>Actions<i class="yoco">plus</i></span>
</h3>
```

</template>

<script>
export default {
  name: 'TypographyHeader'
}
</script>

<style lang="scss" scoped>
</style>
