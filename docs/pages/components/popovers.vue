<template lang="md">

# Popovers

Use popovers to provide extra information or actions. Compared to `tooltip`, `popovers` can carry more information.

## Placement

<div class="element-example">
<KtPopover placement="top" class="mt-4 ml-4">
	<KtButton type="secondary" label="Top Popover"/>
	<div slot="content">
		<h2>Top Popover</h2>
		<p>Top Popovers</p>
	</div>
</KtPopover>
<KtPopover placement="Bottom" class="mt-4 ml-4">
	<KtButton type="secondary" label="Bottom Popover"/>
	<div slot="content">Hello</div>
</KtPopover>
<KtPopover placement="right" class="mt-4 ml-4">
	<KtButton type="secondary" label="Right Popover" />
	<div slot="content">New Message</div>
</KtPopover>
<KtPopover placement="left" class="mt-4 ml-4">
	<KtButton type="secondary" label="Left Popover" />
	<div slot="content">New Message</div>
</KtPopover>
</div>

There are 4 different positions for popovers. `right`, `left`, `top`, and `bottom`.

**Attention:** The popover may change its placement position when parent has `overflow: scroll`.

```html
<KtPopover placement="right">
	<KtButton type="secondary">
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
## Size

Popover size can be `sm`, `md`, and `lg`.

<div class="element-example">
<KtPopover size="sm" class="mt-4 ml-4">
	<KtButton type="secondary" label="Small Popover" />
	<div slot="content">Message</div>
</KtPopover>
<KtPopover size="md" class="mt-4 ml-4">
	<KtButton type="secondary" label="Medium Popover" />
	<div slot="content">Message</div>
</KtPopover>
<KtPopover size="lg" class="mt-4 ml-4">
	<KtButton type="secondary" label="Large Popover" />
	<div slot="content">Message</div>
</KtPopover>
</div>


## Usage

### Attributes

| Attribute   | Description                | Type     | Accepted Values                  | Default  |
|:------------|:---------------------------|:---------|:---------------------------------|:---------|
| `placement` | postion of popover content | `String` | `top`, `bottom`, `right`, `left` | `bottom` |
| `size`      | size of popover content    | `String` | `sm`, `md`, `lg`                 | `sm`     |

### Slots

| Slot Name | Description                   |
|:----------|:------------------------------|
| `default` | toggle element of the content |
| `content` | content section               |

</template>

<script>
import ShowCase from '../../components/ShowCase'

export default {
	name: 'PopoversDoc',
	components: { ShowCase },
}
</script>
