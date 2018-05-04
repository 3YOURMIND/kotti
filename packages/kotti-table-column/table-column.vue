<template>
  <div class="kt-table-column">
    <div class="kt-table-column__th" v-text="label" />
    <div v-if="prop">
      <div v-for="(item, index) in columnData" :key="item.index"
      @mouseover="handleHover(index)"
      @mouseout="handleHoverOut"
      :class="['kt-table-column__td', {'kt-table-column__td--hover': currentHoverRow === index}]"
      v-text="item" />

    </div>
    <div v-else>
    <div v-for="(n, index) in totalRowNumber" :key="n" @mouseover="handleHover(index)"
     :class="['kt-table-column__td', {'kt-table-column__td--hover': currentHoverRow === index}]"
      @mouseout="handleHoverOut"
      
      >
      <slot v-if="currentHoverRow === index">
      </slot>
    </div>
    </div>
  </div>
</template>


<script>
export default {
	name: 'Kt-TableColumn',
	computed: {
		currentHoverRow() {
			return this.$parent.hoverRowIndex;
		},
		totalRowNumber() {
			return this.$parent.data.length;
		},
		columnData() {
			let tableData = this.$parent.data;
			let data = tableData.map(item => item[this.prop]);
			return data;
		},
	},
	props: {
		label: {
			type: [String, Number],
			default: ' ',
		},
		prop: String,
	},
	data() {
		return {
			data: ['tom', 'jerry', 'sky'],
		};
	},
	methods: {
		handleHover(index) {
			this.$parent.updateHoverRow(index);
		},
		handleHoverOut() {
			this.$parent.updateHoverRowOut();
		},
	},
};
</script>

<style lang="scss" scoped>
.kt-table-column {
	display: inline;
	position: relative;
	flex: 1 1 30px;
	flex-wrap: auto;
}

.kt-table-column__th,
.kt-table-column__td {
	padding: 0.4rem;
	border-bottom: 1px solid #dbdbdb;
}

.kt-table-column__th {
	text-transform: uppercase;
	font-size: 0.6rem;
	line-height: 0.8rem;
	min-height: 0.8rem;
	display: block;
	color: #a8a8a8;
	font-weight: 600;
}

.kt-table-column__td--hover {
	background: #f8f8f8;
}

.kt-table-actions {
	// display: none;
	font-size: 1em;
	padding: 0.25em;
	border-radius: 0.1rem;
	z-index: 2;
	line-height: 1em;
	width: auto;
	position: absolute;
	border: 0;
	margin-top: 0.5em;
	right: 1em;
	float: right;
	box-shadow: 0 0 1px #999;
	i {
		margin: 0 0.2rem;
		color: #a8a8a8;
	}
	i:hover {
		cursor: pointer;
		color: #a8a8a8;
	}
}
</style>
