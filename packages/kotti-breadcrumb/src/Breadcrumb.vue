<template>
	<div class="breadcrumb">
		<ol>
			<li
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				:class="textClasses(breadcrumb)"
			>
				<span @click="handleClick(breadcrumb)" v-text="breadcrumb.title" />
				<span v-if="showSeparator(index)">
					<i
						v-if="separator.style === 'icon'"
						class="yoco"
						v-text="separator.value"
					/>
					<span
						v-if="separator.style === 'text'"
						class="breadcrumb__text-separator"
						v-text="separator.value"
					/>
				</span>
			</li>
		</ol>
	</div>
</template>

<script>
export default {
	name: 'KtBreadcrumb',
	props: {
		breadcrumbs: { type: Array, required: true },
		separator: {
			default() {
				return {
					style: 'icon',
					value: 'chevron_right',
				}
			},
		},
	},
	methods: {
		showSeparator(index) {
			return index < this.breadcrumbs.length - 1
		},
		textClasses(item) {
			return {
				breadcrumb__text: true,
				'breadcrumb__text--completed': item.isCompleted,
			}
		},
		handleClick(item) {
			if (!item.isCompleted || !item.to || !this.$router) return
			this.$router.push(item.to)
		},
	},
}
</script>
