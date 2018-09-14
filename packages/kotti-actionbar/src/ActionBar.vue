<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<slot name="actionbar-header">
					<h1 v-text="headerTitle"/>
				</slot>
			</div>
			<div class="actionbar-body">
				<slot name="actionbar-body">
					<KtActionBarMenu :menu="menu" :menuStyle="menuStyle" v-if="menu"/>
				</slot>
			</div>
			<div class="actionbar-footer">
				<slot name="actionbar-body">
					<footer>Footer</footer>
				</slot>
			</div>
		</div>
	</div>
</template>
<script>
import KtActionBarMenu from './ActionBarMenu'
export default {
	name: 'KtActionBar',
	props: {
		headerTitle: {
			type: String,
			default: 'Actionbar Header',
		},
		menu: [],
		menuStyle: {},
	},
	components: {
		KtActionBarMenu,
	},
}
</script>
