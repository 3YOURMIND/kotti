<template>
	<tr
		:class="_trClasses"
		:role="isClickable ? 'button': false"
		:tabindex="isClickable ? 0 : false"
		@click="$emit('click')"
	>
		<td
			v-if="showExpandToggle"
			class="c-hand"
			@click.stop="$emit('toggleExpand')"
		>
			<div class="toggle">
				<i class="yoco" v-text="expandToggleIcon" />
			</div>
		</td>
		<td
			v-if="showSelectToggle"
			class="td-selectable"
			@click.stop
		>
			<div class="form-group">
				<label class="form-checkbox">
					<input
						type="checkbox"
						:checked="isSelected"
						@input.prevent.stop="$emit('toggleSelect')"
					/>
					<i class="form-icon" />
				</label>
			</div>
		</td>
		<td
			v-if="showData"
			v-for="column in columns"
			:key="column.key"
			:class="getTdClasses(column)"
			:style="getTdStyles(column)"
			v-text="data[column.key]"
		/>
		<td v-if="showExpandSlot" :colspan="colSpan" >
			<slot name="expand" :data="data" />
		</td>
		<td v-if="showActionsSlot">
			<div class="table-actions">
				<slot name="actions" :data="data" />
			</div>
		</td>
	</tr>
</template>

<script>
export default {
	name: 'KtTableRow',
	props: {
		colSpan: { required: true, type: Number },
		columns: { required: true, type: Array },
		data: { required: true, type: Object },
		hasActions: { required: true, type: Boolean },
		isClickable: { required: true, type: Boolean },
		isExpandable: { required: true, type: Boolean },
		isExpanded: { required: true, type: Boolean },
		isSelectable: { required: true, type: Boolean },
		isSelected: { required: true, type: Boolean },
		trClasses: { default: [], type: [Object, Array, String] },
		virtualRow: { require: true, type: Object },
	},
	computed: {
		expandToggleIcon() {
			return this.isExpanded ? 'chevron_down' : 'chevron_right'
		},
		showActionsSlot() {
			return !this.virtualRow.isExpander && this.hasActions
		},
		showData() {
			return !this.virtualRow.isExpander
		},
		showExpandSlot() {
			return this.virtualRow.isExpander && this.isExpanded
		},
		showExpandToggle() {
			return !this.virtualRow.isExpander && this.isExpandable
		},
		showSelectToggle() {
			return !this.virtualRow.isExpander && this.isSelectable
		},
		_trClasses() {
			const classes = []

			if (this.isClickable) classes.push('clickable')
			if (this.isSelected) classes.push('selected')
			if (this.trClasses) classes.push(this.trClasses)

			return classes
		},
	},
	methods: {
		getTdClasses(column) {
			return [column.tdClasses]
		},
		getTdStyles(column) {
			return { textAlign: column.align || 'left' }
		},
	},
}
</script>
