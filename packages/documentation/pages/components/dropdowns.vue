<template lang="md">
<ComponentInfo title="Dropdowns" :meta="meta" />

## Basic Usage

<div class="element-example">
	<KtDropdown>
		<KtButton type="secondary" label="More Action"/>
		<div slot="KtDropdownMenus">
			<KtDropdownMenu>Add New Item</KtDropdownMenu>
			<KtDropdownMenu>Download Item</KtDropdownMenu>
		</div>
	</KtDropdown>
</div>

`KtDropdown` is a wrapper of `KtPopover` but with per-defined style.

Default slot is the trigger element. `KtDropdownMenus` slot contains the dropdown elements.

In `KtDropdownMenus` slot, you can write your own stylied element. However, we suggest you use `KtDropdownMenu` components.


```html
<KtDropdown>
	<KtButton type="secondary" label="More Action"/>
	<div slot="KtDropdownMenus">
		<KtDropdownMenu>Add New Item</KtDropdownMenu>
		<KtDropdownMenu>Download Item</KtDropdownMenu>
	</div>
</KtDropdown>
```

## Dropdown button

A dropdown button is a current pattern nowadays.
It allows to have a subaction without changing page or opening a modal.

Note the `dropdownIcon` prop. It will default to `chevron_down`.
You can also use any attribute you would pass to `KtPopover` or `KtButton`. They will be passed.

<div class="element-example">
	<KtDropdownButton type="primary" label="Dropdown button" >
		<div slot="KtDropdownMenus">
			<KtDropdownMenu>Request item</KtDropdownMenu>
			<KtDropdownMenu>Download Item</KtDropdownMenu>
		</div>
	</KtDropdownButton>
	<KtDropdownButton placement="top-end" dropdownIcon="chevron_up" size="sm" type="primary" label="Dropdown button" >
		<div slot="KtDropdownMenus">
			<KtDropdownMenu>Request item</KtDropdownMenu>
			<KtDropdownMenu>Download Item</KtDropdownMenu>
		</div>
	</KtDropdownButton>
	<KtDropdownButton :disabled="true" size="sm" type="primary" label="Dropdown button" >
		<div slot="KtDropdownMenus">
			<KtDropdownMenu>Request item</KtDropdownMenu>
			<KtDropdownMenu>Download Item</KtDropdownMenu>
		</div>
	</KtDropdownButton>
</div>

```html
	<KtDropdownButton type="primary" label="Dropdown button">
		<div slot="KtDropdownMenus">
			<KtDropdownMenu>Request item</KtDropdownMenu>
			<KtDropdownMenu>Download Item</KtDropdownMenu>
		</div>
	</KtDropdownButton>
		<KtDropdownButton placement="top-end" dropdownIcon="chevron_up" size="sm" type="primary" label="Dropdown button" >
		<div slot="KtDropdownMenus">
			<KtDropdownMenu>Request item</KtDropdownMenu>
			<KtDropdownMenu>Download Item</KtDropdownMenu>
		</div>
	</KtDropdownButton>
	<KtDropdownButton :disabled="true" size="sm" type="primary" label="Dropdown button" >
		<div slot="KtDropdownMenus">
			<KtDropdownMenu>Request item</KtDropdownMenu>
			<KtDropdownMenu>Download Item</KtDropdownMenu>
		</div>
	</KtDropdownButton>
```

## Icons and Size

<div class="element-example">
	<KtDropdown size="sm">
		<KtButton type="text" label="Dropdown with icons"/>
		<div slot="KtDropdownMenus">
			<KtDropdownMenu icon="plus">Add New Item</KtDropdownMenu>
			<KtDropdownMenu icon="download">Download Item</KtDropdownMenu>
		</div>
	</KtDropdown>
</div>

As `KtPopover`, `KtDropdown` accpets `size`, when `size` is not given, the width of dropdown will be auto.

If you are using `KtDropdownMenu`, you can use `icon` props to define the icon in front of the text.


```html
<KtDropdown size="sm">
	<KtButton type="text" icon="dots"/>
	<div slot="KtDropdownMenus">
		<KtDropdownMenu icon="plus">Add New Item</KtDropdownMenu>
		<KtDropdownMenu icon="download">Download Item</KtDropdownMenu>
	</div>
</KtDropdown>
```

## Placement

<div class="element-example">
	<KtDropdown placement="top-start" class="d-inline">
		<KtButton type="secondary" label="Top Start"/>
		<div slot="KtDropdownMenus">
			<KtDropdownMenu icon="plus">Add New Item</KtDropdownMenu>
			<KtDropdownMenu icon="download">Download Item</KtDropdownMenu>
		</div>
	</KtDropdown>
	<KtDropdown placement="top-end" class="d-inline">
		<KtButton type="secondary" label="Top End"/>
		<div slot="KtDropdownMenus">
			<KtDropdownMenu icon="plus">Add New Item</KtDropdownMenu>
			<KtDropdownMenu icon="download">Download Item</KtDropdownMenu>
		</div>
	</KtDropdown>
	<KtDropdown placement="bottom-start" class="d-inline">
		<KtButton type="secondary" label="Bottom Start"/>
		<div slot="KtDropdownMenus">
			<KtDropdownMenu icon="plus">Add New Item</KtDropdownMenu>
			<KtDropdownMenu icon="download">Download Item</KtDropdownMenu>
		</div>
	</KtDropdown>
	<KtDropdown placement="bottom-end" class="d-inline">
		<KtButton type="secondary" label="Bottom End"/>
		<div slot="KtDropdownMenus">
			<KtDropdownMenu icon="plus">Add New Item</KtDropdownMenu>
			<KtDropdownMenu icon="download">Download Item</KtDropdownMenu>
		</div>
	</KtDropdown>
</div>

The `placement` prop accepts same values as `KtPopover`. We suggest using the default placement.

## Usage

### Attributes

| Attribute              | Description               | Type     | Accepted values   | Default |
|:-----------------------|:--------------------------|:---------|:------------------|:--------|
| `KtDropdown.size`      | size of the dropdown      | `String` | Same as KtPopover | `auto`  |
| `KtDropdown.placement` | placement of the dropdown | `String` | Same as KtPopover | `auto`  |
| `KtDropdownMenu.icon`  | icon of the dropdown denu | `String` | Yoco icon text    | -       |

### Slots

| Slot Name         | Description           |
|:------------------|:----------------------|
| `KtDropdownMenus` | dropdown menu section |

</template>

<script lang="ts">
import { KtDropdown } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsDropdowns',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			meta: KtDropdown.meta,
		}
	},
})
</script>
