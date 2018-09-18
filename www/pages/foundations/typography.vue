<template lang="md">
# Typography

## Typeface

Kotti uses Open Sans as default font for all text, and includes two font-weight: Regular and Bold.
You can download fonts at <a href="https://fonts.google.com/specimen/Open+Sans">https://fonts.google.com/specimen/Open+Sans</a>

<typography-header />

<typography-label />

<typography-paragraphs />

## Formatting

| Style                                                                                                                     | Notes                                                      |
|:--------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------|
| *Italics text*                                                                                                            | Using `<em>`                                               |
| **This is bold text**                                                                                                     | Using `<strong>`                                           |
| <ol><li>This is an ordered list;</li><li>Second item of ordered list;</li><li>Third item of ordered list.</li></ol>       | `<li>` element has margin `8px` with default `line-height` |
| <ul><li>This is an unordered list;</li><li>Second item of unordered list;</li><li>Third item of unordered list.</li></ul> | same as ordered list                                       |

</template>

<script>
import TypographyHeader from '~/components/TypographyHeader.vue'
import TypographyLabel from '~/components/TypographyLabel.vue'
import TypographyParagraphs from '~/components/TypographyParagraphs.vue'

export default {
	name: 'Typography',
	components: {
		TypographyHeader,
		TypographyLabel,
		TypographyParagraphs,
	},
}
</script>
