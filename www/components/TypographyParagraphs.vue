<template lang="md">

## Paragraphs

![Paragraph Example](~/assets/img/typography_paragraph.png)

|Element|Basic Properties|UI Properties|
|----|----|----|
|**Paragraph Text**<br/>Used for long form text.|font-size: `14px`;<br/>color: `$darkgrey-300`;|line-height: `21px`; |
|**Pargraph Margin**<br/>Margin between two paragraphs|--|margin-bottom: `16px`;|

<div class="element-example">
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean massa nibh, fermentum et facilisis sit amet, ullamcorper lobortis metus. 
    Maecenas finibus ante orci, quis efficitur orci sagittis eget. Nulla ut felis cursus, mollis eros nec, ultricies sem. 
    Donec tellus ligula, faucibus sed facilisis sit amet, luctus finibus nisi. Nulla condimentum urna in laoreet fermentum. 
    Donec leo mi, consectetur a sem id, fringilla fringilla ex. Mauris augue magna, pharetra eu dapibus a, finibus id purus. 
    In hac habitasse platea dictumst. 
  </p>
  <p>
    Maecenas molestie hendrerit lectus, quis pellentesque dolor tempus sit amet. Etiam sagittis consectetur bibendum. 
    Vestibulum sed consectetur nisi, ut vulputate est. Donec et ultricies nisl, ac accumsan arcu.
  </p>
</div>

```html
<p>Lorem ipsum dolor sit amet, ....</p>
<p>Maecenas molestie hendrerit lectus, ....</p>
```

</template>

<script>
export default {
  name: 'TypographyParagraphs'
}
</script>

<style lang="scss" scoped>
</style>

