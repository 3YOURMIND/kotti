<template>
<div class="actionbar">
  <div class="actionbar-wrapper">
    <div class="actionbar-header">
      <h2 v-text="currentSection" />
    </div>
    <div class="actionbar-body">
      <MenuList class="sidemenu" />
    </div>
    
    </div>
</div>
</template>

<script>
import MenuList from '~/components/Menu.vue';

export default {
	name: 'Actionbar',
	components: {
		MenuList,
	},
	props: {
		currentSection: String,
	},
};
</script>

<style lang="scss" scoped>
.sidebar {
	background: #f8f8f8;
}

.navbar-footer {
	color: rgba(255, 255, 255, 0.46);
	text-align: center;
}
</style>
