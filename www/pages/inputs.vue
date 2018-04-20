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

  ## Addon Text
  <div class="element-example">
  <KtInput
    v-model="v3"
    label="Name"
    placeholder="Add your name"
    addonText="User Name"/>
  </div>


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

  ## Disabled
  <div class="element-example white">
    <KtInput 
    label="Disabled Input"
    :placeholder="v5"
    disabled
    />
  </div>

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

</template>

<script>
import KtInput from '../../packages/kotti-input'

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
      v5: 'email@example.com'
    }
  }
}
</script>
