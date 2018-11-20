<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<slot name="actionbar-header"> <h1 v-text="headerTitle" /> </slot>
			</div>
			<div class="actionbar-body">
				<slot name="actionbar-body">
					<KtActionBarMenu v-if="menu" :menu="menu" :menuStyle="menuStyle" />
				</slot>
			</div>
			<div class="actionbar-footer">
				<slot name="actionbar-footer"> <footer>Footer</footer> </slot>
			</div>
		</div>
	</div>
</template>
<script>
import KtActionBarMenu from './ActionBarMenu'

export default {
	name: 'KtActionBar',
	components: {
		KtActionBarMenu,
	},
	props: {
		headerTitle: { default: 'Actionbar Header', type: String },
		menu: { default: () => [], type: Array },
		menuStyle: { default: () => ({}), type: Object },
	},
}
</script>
