<template lang="md">

# Layout

## Layout Components

![layout overiew](~/assets/img/layout_overview.png)

### [Navbar](/components/navbar)

The Navbar is the top-level navigation for the user. The width is fixed: `280px` or `14rem`. The background is `Primary-600 (#2659AB)`.

### [Actionbar](#)

The actionbar is always located between the Navbar and Workspace, which can be omitted if necessary.

The actionbar is considered to be an attachment to the Workspace.
It represents addtional and important information for the Workspace.
The width of Actionbar is also fixed: `320px` or `16rem`. The background color is `#F8F8F8`.

The elements suggested on the Actionbar are: <b>primary action button</b>,
Secondary action buttton, information which doesn't require complex interaction,
and `sub-menu` for the Workspace.

### [Workspace](#)

The workspace is designed as a space for related tasks, most interactions
should be inside this area. The width of the Workspace is responsive: `100%` of the screen width with margin `24px` to the right.
The background is `#FFFFFF`, with dropshadow: `1px 0 1px #DBDBDB`;

### Metric

Our metric is based on `4px`; we call this one unit. The unit can be used as a variable in `SCSS`. Table below shows the unit to pixel mapping.

|Unit|Pixel|Scss Variable|In Rem|
|----|----|----|----|
|1 unit|4px|$unit-1|0.2rem|
|2 unit|8px|$unit-2|0.4rem|
|4 unit|4px|$unit-4|0.8rem|
|6 unit|4px|$unit-6|1.2rem|
|8 unit|4px|$unit-8|1.6rem|

### Padding and Margin

Following 3 types of margin or padding metric are suggested:

1.  **Border Margin:** the gap between element and window, the width is `24px`.
2.  **Block Margin:** the gap between two elements, the width is `24px`.
3.  **Element Padding:** the padding of elements.

![Margin Padding](~/assets/img/layout_metric.png)

</template>

<script>
export default { name: 'LayoutDoc' }
</script>
