<template lang="md">
# Design Guidelines

## Font Icons

Font icons are used as visual supplement for text. They can help the user to understand the context and balance the design.

### Grid and Keylines

All icons should be designed on a `24px * 24px` artboard, with a margin of `2px`. So, the design space is limited to `20px * 20px`.

The foundation of icons are circles, rectangles and squares. They should
follow the keyline shown in the picture.

![](~/assets/img/icon_keyline.png)

### Radius

Adding radius on icons helps give the icons a consistent style while being distinct from other icons. There are 3 different radii.

1. 90 degree angles must have a 1px radius.
2. Open shaped stroke edges must be curved using a 0.5px radius.
3. Inner junctions should never have a radius.

![](~/assets/img/icon_radius.png)

### Strokes

The width of strokes should be 2px.

### Color

The only color should be pure black (`#000000`) on a pure white (`#FFFFFF`) background.
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'DocumentationPageFoundationsIconsDesignGuidelines',
})
</script>
