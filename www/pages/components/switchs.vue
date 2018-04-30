<template>
  <div class="switch">
    <div class="element-example">
    <kt-switch v-model="checkbox1" activeMessage="Show Message" inactiveMessage="Close">
    
    </kt-switch>
    <div v-if="checkbox1">
      <h2>Hello World</h2>
    </div>
    </div>
    <div class="element-example">
    <kt-switch v-model="checkbox2" :right="true">
      Show message
    </kt-switch>
    <div v-if="checkbox2">
      <h2>Hello World</h2>
    </div>
    </div>
  </div>
</template>

<script>
import KtSwitch from '../../../packages/kotti-swtich';

export default {
	name: 'KtSwitchDoc',
	components: {
		KtSwitch,
	},
	data() {
		return {
			checkbox1: false,
			checkbox2: false,
		};
	},
};
</script>
