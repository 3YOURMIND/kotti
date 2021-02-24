<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Structure

<div class="element-example">
	<KtCard>
		<div slot="card-header" >
			<h2>Lorem Ipsum</h2>
			<b>consectetur adipiscing elit</b>
		</div>
		<div slot="card-body" >
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Phasellus consequat nisl at nisl condimentum vehicula.
			</p>
		</div>
		<div slot="card-footer">
			<KtButton label="Button" />
		</div>
	</KtCard>
</div>

The Card component has slots for the `card-header`, `card-body`, and `card-footer`:

```html
<KtCard>
	<div slot="card-header" >
		<h2>Lorem Ipsum</h2>
		<b>consectetur adipiscing elit</b>
	</div>
	<div slot="card-body" >
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Phasellus consequat nisl at nisl condimentum vehicula.
		</p>
	</div>
	<div slot="card-footer">
		This is the end
	</div>
</KtCard>
```

## Images and Position

<div class="element-example">
	<KtRow :gap="16">
		<KtCol :span="8">
			<KtCard imgUrl="https://picsum.photos/900/300">
				<div slot="card-header" >
					<h2>Lorem Ipsum</h2>
				</div>
				<div slot="card-body" >
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Phasellus consequat nisl at nisl condimentum vehicula.
					</p>
				</div>
			</KtCard>
		</KtCol>
		<KtCol :span="8">
			<KtCard imgUrl="https://picsum.photos/900/300" imgPosition="middle">
				<div slot="card-header" >
					<h2>Lorem Ipsum</h2>
				</div>
				<div slot="card-body" >
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Phasellus consequat nisl at nisl condimentum vehicula.
					</p>
				</div>
				<div slot="card-footer">
					This is the end
				</div>
			</KtCard>
		</KtCol>
		<KtCol :span="8">
			<KtCard imgUrl="https://picsum.photos/900/300" imgPosition="bottom">
				<div slot="card-header" >
					<h2>Lorem Ipsum</h2>
				</div>
				<div slot="card-body" >
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Phasellus consequat nisl at nisl condimentum vehicula.
					</p>
				</div>
				<div slot="card-footer">
					This is the end
				</div>
			</KtCard>
		</KtCol>
	</KtRow>
</div>

The `imgUrl` property defines the image’s `url`.

`imgPosition` sets the image position. Valid values are `top`, `middle` and `bottom`.

```html
<KtCard imgUrl="https://picsum.photos/900/300" imgPosition="middle">
	<div slot="card-header" >
		<h2>Lorem Ipsum</h2>
	</div>
	<div slot="card-body" >
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Phasellus consequat nisl at nisl condimentum vehicula.
		</p>
	</div>
	<div slot="card-footer">
		This is the end
	</div>
</KtCard>
```

## Usage

### Attributes

| Attribute     | Description                  | Type     | Accepted Values                 | Default |
|:--------------|:-----------------------------|:---------|:--------------------------------|:--------|
| `imgPosition` | postion of image in the card | `String` | `"top"`, `"middle"`, `"bottom"` | `top`   |
| `imgUrl`      | url of image                 | `String` | —                               | —       |

### Slots

| Slot Name     | Description    |
|:--------------|:---------------|
| `card-header` | header section |
| `card-body`   | body section   |
| `card-footer` | footer section |

</template>

<script lang="ts">
import { KtCard } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsCards',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtCard,
		}
	},
})
</script>
