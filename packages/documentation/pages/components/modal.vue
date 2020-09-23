<template lang="md">
<ComponentInfo title="Modal" :meta="meta" />

## Size

<div class="element-example">
	<button @click="showModal=true, modalSize='sm', closeOutside=true">small modal</button>
	<button @click="showModal=true, modalSize='md', closeOutside=true">default modal</button>
	<button @click="showModal=true, modalSize='lg', closeOutside=true">large modal</button>
	<button @click="showModal=true, modalSize='xl', closeOutside=true">x-large modal</button>
	<KtModal v-if="showModal" @close="showModal = false" :size="modalSize" :closeOutside="closeOutside">
	<div slot="modal-header">
		<h2>This the modal title</h2>
	</div>
	<div slot="modal-body">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		<p>Nunc a sollicitudin libero, consectetur interdum ligula.</p>
	</div>
	<div slot="modal-footer">
		<button @click="showModal = false">Close</button>
	</div>
	</KtModal>
</div>

Modal has 4 different size: `sm`, `md`, `lg`, and `xl`. The default modal size is medium `md`.

```html
<KtModal v-if="showModal" @close="showModal = false" size="sm"/>
<KtModal v-if="showModal" @close="showModal = false" size="md"/>
<KtModal v-if="showModal" @close="showModal = false" size="lg"/>
<KtModal v-if="showModal" @close="showModal = false" size="xl"/>
```

## Close from outside

<div class="element-example">
	<button @click="showModal = true, modalSize = 'sm', closeOutside = false">disable close from outside of modal</button>
</div>

When `closeOutside` set to `false`, it disables closing the modal from the outside.

```html
<KtModal
	v-if="showModal"
	:closeOutside="false"
	size="sm"
	@close="showModal = false"
/>
```

## Usage

### Attributes

| Attribute      | Description                         | Type      | Accepted Values     | Default |
|:---------------|:------------------------------------|:----------|:--------------------|:--------|
| `closeOutside` | allow user close modal from outside | `Boolean` | —                   | `true`  |
| `size`         | size of the modal window            | `String`  | `sm`,`md`,`lg`,`xl` | `"md"`  |

### Slots

| Slot Name      | Description             |
|:---------------|:------------------------|
| `modal-header` | header section of modal |
| `modal-body`   | body section of modal   |
| `modal-footer` | footer section of modal |
</template>

<script lang="ts">
import { KtModal } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsModal',
	components: {
		ComponentInfo,
	},
	data() {
		return {
			closeOutside: true,
			meta: KtModal.meta,
			modalSize: 'md',
			showModal: false,
		}
	},
})
</script>
