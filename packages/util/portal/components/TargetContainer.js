import Vue from 'vue'

export default Vue.extend({
	// as an abstract component, it doesn't appear in
	// the $parent chain of components.
	// which means the next parent of any component rendered inside of this one
	// will be the parent from which is was portal'd
	abstract: true,
	name: 'TargetContainer',
	props: {
		nodes: { required: true, type: Function },
		tag: { default: 'div', type: String },
	},
	data(props) {
		return {
			updatedNodes: props.nodes,
		}
	},
	destroyed() {
		const el = this.$el
		el.parentNode.removeChild(el)
	},
	render(h) {
		const nodes = this.updatedNodes && this.updatedNodes()

		if (!nodes) return h()

		return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag, nodes)
	},
})
