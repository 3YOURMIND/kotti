<template>
  <div>
    <KtInlineEdit 
    label="Inline Edit"
    :message="value1"
    placeholder="this holder"
    type="email"
    v-model="value1"
    @confirm="showAlert('Confirmed')" @dismiss="showAlert('Dismissed')"/>
  </div>
</template>


<script>
import KtInlineEdit from '../../packages/kotti-inlineEdit';

export default {
	name: 'KtInlineEditDoc',
	components: {
		KtInlineEdit,
  },
  data() {
    return {
      value1: 'Hello'
    }
  },
	methods: {
		showAlert(msg) {
			alert(msg);
		},
	},
};
</script>
