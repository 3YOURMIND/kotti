<template lang=md>

  # Inline Edit

  <div class="element-example white">
    <KtInlineEdit
    label="Picture Title"
    placeholder="this holder"
    v-model="value1"
    @confirm="showAlert('Confirmed Function')"
    @dismiss="showAlert('Dismissed Function')"
    class="mb-16px"/>
    <img src="https://picsum.photos/800/200">
  </div>

  ```html
  <KtInlineEdit
    label="Picture Title"
    placeholder="this holder"
    v-model="value1"
    @confirm="showAlert('Confirmed Function')"
    @dismiss="showAlert('Dismissed Function')"
    class="mb-16px"/>
  <img src="https://picsum.photos/800/200">
  ```

  ## Usage

  ### Attribuites

  |Attribute|Description|Type|Accepted values|Default|
  |---|---|---|---|---|---|
  |value|value of message and input value|`v-model`|-|-|
  |label|label text|`string`|-|-|

  ### Input Events

  |Event Name|Description|Parameters|
  |---|---|---|
  |change|triggers when input value changes|(event: Event)|

  ### Button Events

  |Event Name|Description|Parameters|
  |---|---|---|
  |confirm|triggers when confirm button clicked|(event: Event)|
  |dismiss|triggers when dismiss button clicked|(event: Event)|

</template>



<script>
import KtButton from '../../../packages/kotti-button/';
import KtButtonGroup from '../../../packages/kotti-button-group/';
import KtInlineEdit from '../../../packages/kotti-inline-edit/';

export default {
	name: 'KtInlineEditDoc',
	components: {
		KtInlineEdit,
	},
	data() {
		return {
			value1: 'Random Picture',
		};
	},
	methods: {
		showAlert(msg) {
			alert(msg);
		},
	},
};
</script>
