<template lang=md>
  # Inputs

  ## Label

  <div class="element-example">
  <KtInput
    v-model="v1"
    label="Name"
    placeholder="Add your name"/>
  <KtInput
    placeholder="Add your name"/>
  </div>

  `label` props accept `string` and show on the top of `input`.

  ```html
  <KtInput v-model="v1" label="Name" placeholder="Add your name"/>
  <KtInput placeholder="Add your name"/>
  ```

  ## Icon
  <div class="element-example">
  <KtInput
    v-model="v2"
    placeholder="Serach your name"
    iconPosition="right"
    icon="search"/>
  <KtInput
    v-model="v3"
    placeholder="Add your name"
    icon="user"/>
  </div>

  `icon` accepts `string` from yoco libarary, the default location of icon is `left`, if you want change the location,
  set `iconPosition="right"`

  ```html
  <KtInput v-model="v2" placeholder="Serach your name" iconPosition="right" icon="search"/>
  <KtInput v-model="v3" placeholder="Add your name" icon="user"/>
  ```

  ## Addon Text

  <div class="element-example">
  <KtInput
    v-model="v3"
    label="Name"
    placeholder="Add your name"
    addonText="User Name"/>
  </div>

  When an value needs a fixed prefix or suffix,
  in order to make sure user doesn't put it in input field, 
  use an `addonText` to indicate that system has already pre-input this value.

  ```html
  <KtInput v-model="v3" label="Name" placeholder="Add your name" addonText="User Name"/>
  ```

  ## Type
  <div class="element-example">
  <KtInput
    v-model="v4"
    type="number"
    label="Number"
    step="0.1"
    placeholder="Add your name" />
  <KtInput
    v-model="v5"
    type="email"
    label="Email" />
  </div>

  For input field it accept types `number`, `text` and `email`. 
  If you want to use `checkbox`, `radio` type, using `KtCheckbox` and `KtRadio`.

  ```html
  <KtInput v-model="v4" type="number" label="Number" step="0.1"/>
  <KtInput v-model="v5" type="email" label="Email" />
  ```  

  ## Disabled
  <div class="element-example white">
    <KtInput 
    label="Disabled Input"
    :placeholder="v5"
    disabled
    />
  </div>

  Add `disabled` to `KtInput` to make input not editable.

  ```html
   <KtInput label="Disabled Input" :placeholder="v5" disabled />
   ```


  ## Validate
  <div class="element-example">
    <KtInput 
    label="Success Input"
    :placeholder="v5"
    validate="success"
    />
    <KtInput 
    label="Error Input"
    :placeholder="v5"
    validate="error"
    />
    <KtInput 
    label="Warning Input"
    :placeholder="v5"
    validate="warning"
    />
  </div>

  `validate` props accepts three validation: `success`, `error`, and `warning`

  ```html
  <KtInput label="Success Input" :placeholder="v5" validate="success" />
  <KtInput label="Error Input" :placeholder="v5" validate="error" />
  <KtInput label="Warning Input" :placeholder="v5" validate="warning" />
  ```

</template>

<script>
import KtInput from '../../../packages/kotti-input';

export default {
	name: 'KtInputDoc',
	components: {
		KtInput,
	},
	data() {
		return {
			v1: 'Jony One O',
			v2: '',
			v3: 'Jony Three O',
			v4: 4,
			v5: 'email@example.com',
		};
	},
};
</script>
