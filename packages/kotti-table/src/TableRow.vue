<template>
	<tr
		v-if="virtualRow.isExpander"
		v-show="isExpanded"
	>
		<td :colspan="colSpan">
			<slot name="expand" :data="data" />
		</td>
	</tr>
	<tr
		v-else
		:class="_trClasses"
		:role="isInteractive ? 'button': false"
		:tabindex="isInteractive ? 0 : false"
		@click="$emit('activateRow')"
	>
		<td
			v-if="isExpandable"
			class="c-hand"
			@click.stop="$emit('toggleExpand')"
		>
			<div class="toggle">
				<i class="yoco" v-text="expandToggleIcon" />
			</div>
		</td>
		<td
			v-if="isSelectable"
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
			v-for="column in columns"
			:key="column.key"
			:class="getTdClasses(column)"
			:style="getTdStyles(column)"
			v-text="data[column.key]"
		/>
		<td v-if="hasActions">
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
		isExpandable: { required: true, type: Boolean },
		isExpanded: { required: true, type: Boolean },
		isInteractive: { required: true, type: Boolean },
		isSelectable: { required: true, type: Boolean },
		isSelected: { required: true, type: Boolean },
		trClasses: { default: [], type: [Object, Array, String] },
		virtualRow: { require: true, type: Object },
	},
	computed: {
		expandToggleIcon() {
			return this.isExpanded ? 'chevron_down' : 'chevron_right'
		},
		_trClasses() {
			const classes = []

			if (this.isInteractive) classes.push('clickable')
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
