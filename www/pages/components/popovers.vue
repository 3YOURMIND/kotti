<template lang="md">

# Popovers

Use popovers to provide extra information or actions. Compared to `tooltip`, `popovers` can carry more information.

<div class="element-example">
<KtPopover position="left" class="mr-4">
	<KtButton type="secondary" slot="toggle">
		Popover Left
	</KtButton>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body" >
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>

<KtPopover position="top" class="mr-4">
	<KtButton type="secondary" slot="toggle">
		Popover Top
	</KtButton>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body" >
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>

<KtPopover position="bottom" class="mr-4">
	<KtButton type="secondary" slot="toggle">
		Popover Bottom
	</KtButton>
	<KtCard slot="content">
		<div slot="card-header">
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body">
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>

<KtPopover position="right">
	<KtButton type="secondary" slot="toggle">
		Popover Bottom
	</KtButton>
	<KtCard slot="content">
		<div slot="card-header">
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body">
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>
</div>

There are also 4 different positions for popovers. `right`, `left`, `top`, and `bottom`.

The `toggle` slot is the element to trigger the popover.

A [card component](./cards) is usually used inside the `content` slot.


```html
<KtPopover position="right">
	<KtButton type="secondary" slot="toggle">
		Popover Bottom
	</KtButton>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body">
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>
```

## Usage

### Attributes

| Attribute | Description                | Type     | Accepted Values                  | Default  |
|:----------|:---------------------------|:---------|:---------------------------------|:---------|
| `postion` | postion of popover content | `String` | `top`, `bottom`, `right`, `left` | `bottom` |

### Slots

| Slot Name | Description                   |
|:----------|:------------------------------|
| `toggle`  | toggle element of the content |
| `content` | content section               |

</template>


<script>
import KtButton from '../../../packages/kotti-button'
import KtCard from '../../../packages/kotti-card'
import KtPopover from '../../../packages/kotti-popover'
import ShowCase from '../../components/ShowCase'

export default {
	name: 'PopoversDoc',
	components: {
		KtButton,
		KtCard,
		KtPopover,
		ShowCase,
	},
}
</script>
