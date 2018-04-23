<template lang="md">

# Modal 

## Size

<div class="element-example">
  <button @click="showModal=true, modalSize='sm', closeOutside=true">small modal</button>
  <button @click="showModal=true, modalSize='md', closeOutside=true">default modal</button>
  <button @click="showModal=true, modalSize='lg', closeOutside=true">large modal</button>
  <button @click="showModal=true, modalSize='xl', closeOutside=true">x-large modal</button>
  <KtModal v-if="showModal" @close="showModal=false" :size="modalSize" :closeOutside="closeOutside">
  <div slot="modal-header">
    <h2>This the modal title</h2>
  </div>
  <div slot="modal-body">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>Nunc a sollicitudin libero, consectetur interdum ligula.</p>
  </div>
  <div slot="modal-footer">
    <button @click="showModal=false">Close</button>
  </div>
  </KtModal>
</div>

Modal has 4 different size: `sm`, `md`, `lg`, and `xl`. The default modal size is medium `md`.

```html
<KtModal v-if="showModal" @close="showModal=false" size="sm"/>
<KtModal v-if="showModal" @close="showModal=false" size="md"/>
<KtModal v-if="showModal" @close="showModal=false" size="lg"/>
<KtModal v-if="showModal" @close="showModal=false" size="xl"/>
```

## Close from outside

<div class="element-example">
  <button @click="showModal=true, modalSize='sm', closeOutside=false">disable colse from outside modal</button>
</div>

When `closeOutside` set to `false`, it prevents close the modal from outside.

```html
<KtModal v-if="showModal" @close="showModal=false" size="sm" :closeOutside="false"/>
```

## Usage

### Attributes

|Attribute|Description|Type|Accepted Values|Default|
|----|----|----|----|----|
|size|size of the modal window|`string`|`sm`,`md`,`lg`,`xl`|`md`|
|closeOutside|allow user close modal from outside|`boolean`|-|`true`|

</template>


<script>
import KtModal from '../../packages/kotti-modal';

export default {
	name: 'Modal',
	components: {
		KtModal,
	},
	data() {
		return {
			showModal: false,
			modalSize: 'md',
			closeOutside: true,
		};
	},
};
</script>
