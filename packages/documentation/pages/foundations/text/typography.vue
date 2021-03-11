<template lang="md">
# Typography

## Typeface

Kotti uses Open Sans as default font for all text.

For macOS, we use Apple system font San Francisco, you can download from [Fonts - Apple Developer](https://developer.apple.com/fonts/)

## Headers

![Headers](~/assets/img/typography_header.png)

| Header                                                                                  | Basic Properties                                                       | UI Properties                                                           |
|:----------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|:------------------------------------------------------------------------|
| **H1 Page header**<br/>Without actionbar, the page header can be used in the workspace. | font-size: `32px`;<br/>font-weight: `600`;<br/>color: `$darkgray-500`; | line-height: `48px`;                                                    |
| **H2 Subpage Header**<br/>Used for second level header, or main title in action bar.    | font-size: `24px`;<br/>font-weight: `600`;<br/>color: `$darkgray-500`; | line-height: `32px`;<br/>margin-top: `16px`;                            |
| **H3 Section Header**<br/>Used to divide each section.                                  | font-size: `16px`;<br/>font-weight: `600`;<br/>color: `$primary-500`;  | line-height: `24px`;<br/>margin-top: `16px`;<br/>padding-bottom: `8px`; |
| **H3 Section Header with actions**<br/>Text button for actions.                         | —                                                                      | —                                                                       |


<div class="element-example">
	<h1>H1 Page Header</h1>
	<h2>H2 Subpage Header</h2>
	<h3>H3 Section Header</h3>
	<h3>H3 Section Header
		<span>Actions<i class="yoco">plus</i></span>
	</h3>
</div>


<div class="mb-8px">
	<KtBanner
		message="Using Header Component for H3"
		icon="circle_attention"
		actionText="View"
		@click="$router.push('/components/headings')"
	/>
</div>

```html
<h1>H1 Page Header</h1>
<h2>H2 Subpage Header</h2>
<h3>H3 Section Header</h3>
<h3>H3 Section Header
	<span>Actions<i class="yoco">plus</i></span>
</h3>
```

## Label text

![Laber Text Element](~/assets/img/typography_label_text.png)

| Element                                                                   | Basic Properties                                                       | UI Properties        |
|:--------------------------------------------------------------------------|:-----------------------------------------------------------------------|:---------------------|
| **Label Text**<br/>Secondary text to explain the default text.            | font-size: `12px`;<br/>font-weight: `600`;<br/>color: `$darkgray-300`; | line-height: `16px`; |
| **Default Text**<br/>Text style for default text.                         | font-size: `14px`;<br/>color: `$darkgray-500`;                         | line-height: `24px`; |
| **Key Text**<br/>Conveys information which is important for users.        | font-size: `24px`;<br/>font-weight: `600`;<br/>color: `$darkgray-500`; | line-height: `32px`; |
| **Addition information**<br/>Besides default text, adds visual hierarchy. | font-size: `16px`;<br/>font-weight: `600`;<br/>color: `$darkgray-500`; | line-height: `24px`; |
| **Action Button**<br/>Icon for actions.                                   | font-size: `16px`;<br/>color: `$primary-500`;                          | —                    |

<div class="element-example">
	<div class="label-value">
		<label>Label</label>
		<div class="default">Default Value</div>
	</div>
	<div class="label-value">
		<label>Label</label>
		<div class="key">Key Value</div>
	</div>
	<div class="label-value">
		<label>Label</label>
		<div class="addition">Ben Jackson</div>
		<div class="default">Bismarckstr. 10-12, Berlin</div>
	</div>
	<div class="label-value">
		<label>Label</label>
		<div class="addition">Ben Jackson</div>
		<div class="default">Bismarckstr. 10-12, Berlin</div>
		<div class="action"><i class="yoco">edit</i></div>
	</div>
</div>

```html
<div class="label-value">
	<label>Label</label>
	<div class="default">Default Value</div>
</div>
<div class="label-value">
	<label>Label</label>
	<div class="key">Key Value</div>
</div>
<div class="label-value">
	<label>Label</label>
	<div class="addition">Ben Jackson</div>
	<div class="default">Bismarckstr. 10-12, Berlin</div>
</div>
<div class="label-value">
	<label>Label</label>
	<div class="addition">Ben Jackson</div>
	<div class="default">Bismarckstr. 10-12, Berlin</div>
	<div class="action"><i class="yoco">edit</i></div>
</div>
```

## Paragraphs

![Paragraph Example](~/assets/img/typography_paragraph.png)

| Element                                               | Basic Properties                               | UI Properties          |
|:------------------------------------------------------|:-----------------------------------------------|:-----------------------|
| **Paragraph Text**<br/>Used for long form text.       | font-size: `14px`;<br/>color: `$darkgray-300`; | line-height: `21px`;   |
| **Pargraph Margin**<br/>Margin between two paragraphs | —                                              | margin-bottom: `16px`; |

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

## Formatting

| Style                                                                                                                     | Notes                                                       |
|:--------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------|
| *Italics text*                                                                                                            | Using `<em/>`                                               |
| **This is bold text**                                                                                                     | Using `<strong/>`                                           |
| <ol><li>This is an ordered list;</li><li>Second item of ordered list;</li><li>Third item of ordered list.</li></ol>       | `<li/>` element has margin `8px` with default `line-height` |
| <ul><li>This is an unordered list;</li><li>Second item of unordered list;</li><li>Third item of unordered list.</li></ul> | same as ordered list                                        |

</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'DocumentationPageFoundationsTextTypography',
})
</script>
