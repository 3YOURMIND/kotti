<template>
	<nav :class="objectClass('navbar')">
		<div :class="objectClass('navbar-wrapper')">
			<div :class="['navbar-toggle', {'navbar-toggle--active':mobileMenuToggle}]"
			  @click="mobileMenuToggle = !mobileMenuToggle">
				<i class="yoco">dots_vertical</i>
			</div>
			<div class="navbar-header">
				<div class="navbar-logo">
					<img :src="src">
				</div>
			</div>
			<div class="navbar-body">
				<div :class="objectClass('navbar-menu')">
					<ul v-if="menu.length">
						<li v-for="item in menu" :key="item.to">
							<i class="yoco" v-text="item.icon" />
							<span v-if="!narrow" v-text="item.label" />
						</li>
					</ul>
					<slot name="navbar-menu" />
				</div>
			</div>
			<div :class="objectClass('navbar-footer')">
				<slot name="navbar-footer" />
			</div>
			<div class="navbar-dropdown" v-if="mobileMenuToggle">
				<div class="navbar-menu">
					<ul v-if="menu.length">
						<li v-for="item in menu" :key="item.to">
							<i class="yoco" v-text="item.icon" /> {{item.label}}
						</li>
					</ul>
					<slot name="navbar-menu" />
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'KtNavbar',
	props: {
		src: String,
		narrow: {
			type: Boolean,
			default: false,
		},
		menu: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {
			mobileMenuToggle: false,
		};
	},
	methods: {
		objectClass(className) {
			let isNarrowClass = this.narrow ? `${className}--narrow` : '';
			return [className, isNarrowClass];
		},
	},
};
</script>
