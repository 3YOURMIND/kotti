<template lang=md>
# Headings

H3 heading supports customize actions, and also can work as section toggles. 

<div class="element-example white">
  <KtHeading text="Title with toggle" type="toggle">
    <div>We hide this message :)</div>
  </KtHeading>
</div>

<div class="element-example">
  <KtHeading text="Title with action" type="action"
  icon="announce"
  actionText="Alert"
  @click="showAlert">
  </KtHeading>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Mauris auctor commodo leo, non malesuada ipsum volutpat sed. Fusce at nulla ipsum. 
    Morbi sodales vel ipsum ullamcorper dictum.</p>
</div>

</template>


<script>
import KtHeading from '../../packages/kotti-heading';

export default {
	name: 'KtHeadingDoc',
	components: {
		KtHeading,
	},
	methods: {
		showAlert() {
			alert('H3 Action Clicked');
		},
	},
};
</script>
