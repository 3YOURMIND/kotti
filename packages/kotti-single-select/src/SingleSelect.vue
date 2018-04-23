<template>
	<div class="selects" v-click-outside="handleClickOutside">
		<div class="form-group">
			<label class="form-label" v-text="label" />
			<div class="has-icon-right">
				<input class="form-input"
        v-model="value"
        type="text"
        :placeholder="placeholder"
        :readonly="!filterable"
        @input="handleQueryChange"
        @focus="handleInputFocus"
        @keydown.esc.stop.prevent="visible = false">
				<i class="yoco form-icon" v-text="indicatorRep" />
				<div class="form-options" v-if="visible">
					<ul>
						<li v-for="(option, index) in optionsRep"
            :key="index"
            @click="handleOptionClick(option)"
            v-text="option.label">
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>



<script>
import ClickOutside from './clickoutside';

export default {
	name: 'KtSelect',
	props: {
		label: {
			type: String,
			default: '',
		},
		filterable: Boolean,
		placeholder: String,
	},
	data() {
		return {
			value: '',
			visible: false,
			options: [
				{
					label: 'Avacado',
					value: 'Avacados',
				},
				{
					label: 'Apple',
					value: 'Apples',
				},
				{
					label: 'Avacadoe',
					value: 'Avacados',
				},
				{
					label: '批果实',
					value: 'Apples',
				},
			],
			filterResults: [],
		};
	},
	directives: {
		ClickOutside,
	},
	computed: {
		indicatorRep() {
			return this.visible ? 'chevron_up' : 'chevron_down';
		},
		optionsRep() {
			if (!this.filterable) {
				return this.options;
			}
			if (this.filterable && this.filterResults.length) {
				return this.filterResults;
			}
		},
	},
	methods: {
		handleOptionClick(option) {
			this.value = option.value;
			this.visible = false;
		},
		handleQueryChange(evt) {
			let filterString = evt.target.value.toLowerCase();
			// handle empty string
			let results = [];
			this.options.filter(item => {
				if (
					item.label.toLowerCase().includes(filterString) ||
					item.value.toLowerCase().includes(filterString)
				) {
					results.push(item);
				}
			});
			this.filterResults = results;
		},
		handleInputFocus() {
			this.visible = true;
		},
		handleClickOutside() {
			this.visible = false;
		},
	},
};
</script>

<style lang="scss" scoped>
.form-options {
	position: absolute;
	top: 2rem;
	width: 100%;
	background: #fff;
	box-shadow: 0 0 1px #dbdbdb, 0 2px 5px rgba(0, 0, 0, 0.26);
	border-radius: 0.1rem;
	padding: 0.4rem 0;
	ul {
		margin: 0;
	}
	li {
		margin: 0;
		line-height: 1.2rem;
		padding: 0.2rem 0.4rem;
		list-style: none;
	}
	li:hover {
		cursor: pointer;
		background: #f8f8f8;
	}
}
</style>
