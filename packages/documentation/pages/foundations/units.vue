<template lang="md">
# Units

### Metric

Our metric is based on multiples of `4px`. We call this 1 _unit_.

|     Unit | Scss Variable |      rem |      px |
|---------:|--------------:|---------:|--------:|
| 1 _unit_ |     `$unit-1` | `0.2rem` |   `4px` |
| 2 _unit_ |     `$unit-2` | `0.4rem` |   `8px` |
| 4 _unit_ |     `$unit-4` | `0.8rem` |  `16px` |
| 6 _unit_ |     `$unit-6` | `1.2rem` |  `24px` |
| 8 _unit_ |     `$unit-8` | `1.6rem` |  `32px` |

### Padding and Margin

The following 3 types of margins or paddings are suggested:

![Margin Padding](~/assets/img/layout_metric.png)

1. **Border Margin**: the gap between elements and the window (`24px`)
2. **Block Margin**: the gap between two blocks (`24px`)
3. **Element Padding**: the padding of elements
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// disable ban-ts-ignore because vscode sees this as an error but nuxt doesn’t
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignored layout is not added to the type definition of defineComponent
export default defineComponent({
	name: 'DocumentationPageFoundationsUnits',
	layout: 'fullpage',
})
</script>
