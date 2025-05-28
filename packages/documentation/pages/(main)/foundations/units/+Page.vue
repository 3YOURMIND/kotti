<template>
	<!-- prettier-ignore -->
	<MarkdownBlock>
# Units

### Metric

Our metric is based on multiples of `4px`. We call this 1 _unit_.

|           Unit | CSS Custom Property |       rem |     px | SCSS (deprecated) |
| -------------: | ------------------: | --------: | -----: | ----------------: |
|       1 _unit_ |     `var(--unit-1)` |  `0.2rem` |  `4px` |     ~~`$unit-1`~~ |
|       2 _unit_ |     `var(--unit-2)` |  `0.4rem` |  `8px` |     ~~`$unit-2`~~ |
|       3 _unit_ |     `var(--unit-3)` |  `0.6rem` | `12px` |                   |
|       4 _unit_ |     `var(--unit-4)` |  `0.8rem` | `16px` |     ~~`$unit-4`~~ |
|       5 _unit_ |     `var(--unit-5)` |    `1rem` | `20px` |                   |
|       6 _unit_ |     `var(--unit-6)` |  `1.2rem` | `24px` |                   |
|       7 _unit_ |     `var(--unit-7)` |  `1.4rem` | `28px` |     ~~`$unit-7`~~ |
|       8 _unit_ |     `var(--unit-8)` |  `1.6rem` | `32px` |     ~~`$unit-8`~~ |
|       9 _unit_ |     `var(--unit-9)` |  `1.8rem` | `36px` |                   |
|      10 _unit_ |    `var(--unit-10)` |    `2rem` | `40px` |    ~~`$unit-10`~~ |
|      12 _unit_ |    `var(--unit-12)` |  `2.4rem` | `48px` |                   |
|      16 _unit_ |    `var(--unit-16)` |  `3.2rem` | `64px` |                   |
| quarter _unit_ |     `var(--unit-q)` | `0.05rem` |  `1px` |     ~~`$unit-q`~~ |
|    half _unit_ |     `var(--unit-h)` |  `0.1rem` |  `2px` |     ~~`$unit-h`~~ |

### Padding and Margin

The following 3 types of margins or paddings are suggested:

![Margin Padding](./assets/layout-metric.png)

1. **Border Margin**: the gap between elements and the window (`24px`)
2. **Block Margin**: the gap between two blocks (`24px`)
3. **Element Padding**: the padding of elements
</MarkdownBlock>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'DocumentationPageFoundationsUnits',
})
</script>
