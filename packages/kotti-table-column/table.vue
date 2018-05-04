<template>
  <table>
    <thead>
      <tr>
        <th v-if="selectable"><div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" v-model="selectedAll">
            <i class="form-icon"></i>
          </label>
        </div></th>
        <th v-for="column in columns" :key="column.key" v-text="column.label"/>
        <th v-if="expand"/>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in tableBodyData" :key="row.index" :class="trClass(index)">
        <td v-if="!row.expand">
          <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" :value="index" v-model="selectedRow">
            <i class="form-icon"></i>
          </label>
        </div>
        </td>
        <td 
        v-for="value in row"
        :key="value.index"
        v-text="value"
        v-if="!row.expand" 
        />
        <td v-if="expand" class="c-hand" @click="toggleExpandRow(index)">
          <i class="yoco" v-if="expandRowIndex - 1 === index">chevron_down</i>
          <i class="yoco" v-else>chevron_right</i>
        </td>
        <td :colspan="colSpanNumber" v-if="row.expand && expandRowIndex === index" ><slot>hello</slot></td>
        <td class="table-actions" v-if="!row.expand && actions">
          <i class="yoco">edit</i>
          <i class="yoco">trash</i>
        </td>


      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
	name: 'Kt-Table',
	props: {
		data: {},
		columns: '',
		expand: Boolean,
		actions: Boolean,
		selectable: Boolean,
		value: Array,
	},
	data() {
		return {
			selectedRow: [],
			expandRowIndex: Number,
			selectedAll: false,
		};
	},
	computed: {
		tableBodyData() {
			let _data = [];
			this.data.forEach(item => {
				let newItem = {};
				this.columns.forEach(column => {
					newItem[column.key] = item[column.key];
				});
				_data.push(newItem);
				if (this.expand) {
					let expandableRow = {};
					expandableRow.expand = true;
					_data.push(expandableRow);
				}
			});
			return _data;
		},
		colSpanNumber() {
			let _span = this.columns.length;
			if (this.expand) {
				_span = _span + 1;
			}
			if (this.selectable) {
				_span = _span + 1;
			}
			return _span;
		},
	},
	watch: {
		selectedRow(val) {
			let _tableLength = this.expand
				? this.tableBodyData.length / 2
				: this.tableBodyData.length;
			if (val.length === _tableLength) {
				this.selectedAll = true;
			} else {
				this.selectedAll = false;
			}
			this.handleSelected(val);
		},
		selectedAll(oldVal, newVal) {
			let _tableLength = this.expand
				? this.tableBodyData.length / 2
				: this.tableBodyData.length;
			if (!oldVal && newVal && this.selectedRow.length === _tableLength) {
				this.selectedRow = [];
			}
			if (!newVal) {
				if (this.selectedRow.length !== _tableLength) {
					let _selectedRow = [];

					for (let i = 0; i < _tableLength; i++) {
						if (this.expand) {
							_selectedRow.push(i * 2);
						} else {
							_selectedRow.push(i);
						}
					}
					this.selectedRow = _selectedRow;
				}
				return;
			}
		},
	},
	methods: {
		trClass(index) {
			if (this.selectedRow.includes(index)) {
				return ['selected'];
			}
		},
		handleClick(index) {
			this.selectRows(index);
			this.toggleExpandRow(index);
		},
		handleSelected() {
			let _selected = this.selectedRow;
			if (this.expand) {
				_selected = _selected.map(index => index / 2);
			}
			this.$emit('input', _selected);
		},
		selectRows(index) {
			let _selectedRow = this.selectedRow;
			if (_selectedRow.includes(index)) {
				_selectedRow = _selectedRow.filter(row => row != index);
			} else {
				_selectedRow.push(index);
			}
			this.selectedRow = _selectedRow;
		},
		toggleExpandRow(index) {
			if (index === this.expandRowIndex) {
				return;
			}
			if (this.expandRowIndex === index + 1) {
				this.expandRowIndex = null;
			} else {
				this.expandRowIndex = index + 1;
			}
		},
	},
};
</script>



<style lang="scss">
tr:hover {
	.table-actions {
		display: block;
	}
}
.selected {
	background: #f8f8f8;
}
</style>
