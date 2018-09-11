<template lang="md">

# Popovers

Using popovers to provide extra information or operations. Comparing to `tooltip`, `popovers` can carry more information.

<div class="element-example">
<KtPopover position="right">
	<button class="secondary" slot="toggle">Popover Right</button>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body" >
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>

<KtPopover position="left" class="ml-4">
	<button class="secondary" slot="toggle">Popover Left</button>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body" >
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>

<KtPopover position="up" class="ml-4">
	<button class="secondary" slot="toggle">Popover Up</button>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body" >
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>
<KtPopover position="bottom" class="ml-4">
	<button class="secondary" slot="toggle">Popover Bottom</button>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body" >
			This is the hover popover
		</div>
	</KtCard>
</KtPopover>
</div>

There are also 4 different positions for popovers. `right`, `left`, `up` and `bottom`.

`toggle` slot is the element to trigger the popover.

A [card component](./cards) is inside `content` slot usually.


```html
<KtPopover position="right">
	<button class="secondary" slot="toggle">Popover Bottom</button>
	<KtCard slot="content">
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
		</div>
		<div slot="card-body" >
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
import KtPopover from '../../../packages/kotti-popover'
import KtCard from '../../../packages/kotti-card'
import ShowCase from '../../components/ShowCase'
export default {
	name: 'PopoversDoc',
	components: {
		KtPopover,
		KtCard,
		ShowCase,
	},
}
</script>
