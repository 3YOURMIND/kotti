<template lang="md">
<ComponentInfo v-bind="{ component }" />

Use popovers to provide extra information or actions. Compared to `tooltip`, `popovers` can carry more information.
It uses `popper.js` library for position and `placement` attribute can be anything supported by the library.
You can also directly use the `popper.js` constructor by passing an `options` props. refer to the [popper.js
documentation](https://popper.js.org/docs/v2/constructors/) for more informations.

## Placement

<div class="element-example">
<KtPopover placement="top" class="mt-4 ml-4">
	<KtButton label="Top Popover"/>
	<div slot="content">
		<h2>Top Popover</h2>
		<p>Top Popovers</p>
	</div>
</KtPopover>
<KtPopover placement="bottom" class="mt-4 ml-4">
	<KtButton label="Bottom Popover"/>
	<div slot="content">Hello</div>
</KtPopover>
<KtPopover placement="right" class="mt-4 ml-4">
	<KtButton label="Right Popover" />
	<div slot="content">New Message</div>
</KtPopover>
<KtPopover placement="top-start" class="mt-4 ml-4">
	<KtButton>
		Popover Top Start
	</KtButton>
	<div slot="content">
		This is the hover popover
	</div>
</KtPopover>
</div>

There are 4 different positions for popovers. `right`, `left`, `top`, and `bottom`.
You can append `-start` and `-end` to the placement as well.

**Attention:** The popover may change its placement position when parent has an `overflow` set.

```html
<KtPopover placement="right">
	<KtButton>
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

## Overflowing behavior

Using `popper.js` allows us to handle overflow easily.
If the parent element has an `overflow` attribute, `popper.js` will handle that nicely:

<div class="element-example" style="overflow: hidden;">
	<KtPopover placement="left">
		<KtButton v-text="'Left placement popover'"/>
		<div slot="content" v-text="'The popver is placed right because of flip:true'"/>
	</KtPopover>
	<br/>
	<br/>
	<br/>
	<KtPopover placement="bottom">
		<KtButton v-text="'Bottom placement popover'"/>
		<div slot="content" v-text="'The popver is placed top because of preventOverflow: true'"/>
	</KtPopover>
</div>

## Size

Popover size can be `sm`, `md`,`lg`, `xl`, `xxl` and `xxxl`.
The small size equals to a width '12rem', then every larger size is
an increment of '4rem'.

<div class="element-example">
<KtPopover size="sm" class="mt-4 ml-4">
	<KtButton label="Small Popover" />
	<div slot="content">Message</div>
</KtPopover>
<KtPopover size="md" class="mt-4 ml-4">
	<KtButton label="Medium Popover" />
	<div slot="content">Message</div>
</KtPopover>
<KtPopover size="lg" class="mt-4 ml-4">
	<KtButton label="Large Popover" />
	<div slot="content">Message</div>
</KtPopover>
<KtPopover size="xl" class="mt-4 ml-4">
	<KtButton label="Extra Large Popover" />
	<div slot="content">Message</div>
</KtPopover>
<KtPopover size="xxl" class="mt-4 ml-4">
	<KtButton label="Huge Popover" />
	<div slot="content">Message</div>
</KtPopover>
<KtPopover size="xxxl" class="mt-4 ml-4">
	<KtButton label="Massive Popover" />
	<div slot="content">Message</div>
</KtPopover>
</div>

## Items

We also provide a nice way of displaying items inside popovers.
It replaces the old `KtDropdownMenu`.


<div class="element-example">
<KtPopover placement="bottom-end">
	<KtButton label="Popover with items" />
	<div slot="content">
		<KtPopoverItem icon="global">Refresh</KtPopoverItem>
		<KtPopoverItem icon="shipping">Profile</KtPopoverItem>
	</div>
</KtPopover>
</div>

## Scoped Slot

Scoped slot allows your to get props or function provided by slot themselve.
In KtPopover, `close` function is provided to allow user click a button from slot content and close the popover.

<div class="element-example">
	<KtPopover class="mt-4 ml-4">
		<KtButton label="Close with Cancel Button" />
		<template v-slot:content="slotProps">
			<p>Save your message</p>
			<KtButton type="text" @click="slotProps.close">Cancel</KtButton>
			<KtButton type="primary">Save</KtButton>
		</template>
	</KtPopover>
</div>

```html
<KtPopover>
	<KtButton label="Close with Cancel Button" />
	<div v-slot:content="slotProps">
		<p>Save your message</p>
		<KtButton type="text" @click="slotProps.close" label="Cancel"/>
		<KtButton type="primary" label="Save"/>
	</div>
</KtPopover>
```

## Nested Select

<div class="element-example">
	<KtPopover placement="top" class="mt-4 ml-4">
		<KtButton label="Test Popover with Dropdown"/>
		<div slot="content">
			<KtFieldSingleSelect
				label="Test with dropdown"
				:options="[{ label: 'Click me', value: 'test_click' }]"
				:value="null"
			/>
		</div>
	</KtPopover>
</div>

```html
<KtPopover placement="top" class="mt-4 ml-4">
	<KtButton label="Top Popover"/>
	<div slot="content">
		<KtFieldSingleSelect
			label="Test with dropdown"
			:options="[{ label: 'Click me', value: 'test_click' }]"
			:value="null"
		/>
	</div>
</KtPopover>
```


## Usage

### Attributes,
| Attribute   | Description                   | Type     | Accepted Values                  | Default  |
|:------------|:------------------------------|:---------|:---------------------------------|:---------|
| `placement` | postion of popover content    | `String` | `auto`, `auto-start`, `auto-end`, `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `right`, `right-start`, `right-end`, `left`, `left-start`, `left-end` | `bottom` |
| `size`      | size of popover content       | `String` | `sm`, `md`, `lg`                 | `sm`     |
| `options`   | direct usage of popper.js API | `Object` | See [popper.js documentation](https://popper.js.org/docs/v2/constructors/) | `{}` |

### Slots

| Slot Name              | Description                   |
|:-----------------------|:------------------------------|
| `default`              | toggle element of the content |
| `content`              | content section               |
| `v-slot:content.close` | close popover                 |

</template>

<script lang="ts">
import { KtPopover } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsPopever',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtPopover,
		}
	},
})
</script>
