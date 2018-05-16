<template>
	<div class="selects" v-click-outside="handleClickOutside">
		<div class="form-group">
			<label class="form-label" v-text="label" />
			<div class="has-icon-right">
				<input
					class="form-input"
					v-model="selectedLabel"
					type="text"
					:placeholder="placeholder"
					:readonly="!filterable"
					@input="handleQueryChange"
					@focus="handleInputFocus"
					@keydown.esc.stop.prevent="visible = false"
				/>
				<i class="yoco form-icon" v-text="indicatorRep" />
				<div v-if="visible" class="form-options">
					<ul>
						<li
							v-for="(option, index) in optionsRep"
							:key="index"
							:class="optionClass(option)"
							@click="handleOptionClick(option)"
							v-text="option.label"
						/>
						<li class="form-option--empty" v-if="!optionsRep.length">
							No result found
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from './clickoutside';
import KtInput from '../../kotti-input';

export default {
	name: 'KtSelect',
	components: {
		KtInput,
	},
	props: {
		label: String,
		filterable: Boolean,
		placeholder: String,
		value: [String, Number],
		options: Array,
		allowEmpty: Boolean,
	},
	data() {
		return {
			currentValue: [String, Number],
			visible: false,
			selectedLabel: '',
			filterResults: [],
			queryString: '',
		};
	},
	directives: {
		ClickOutside,
	},
	mounted() {
		if (this.value) {
			this.labelVaule(this.value);
		}
	},
	computed: {
		indicatorRep() {
			return this.visible ? 'chevron_up' : 'chevron_down';
		},
		optionsRep() {
			if (!this.filterable) {
				return this.options;
			}
			if (this.filterable) {
				return this.filterResults;
			}
		},
	},
	methods: {
		optionClass(option) {
			let _disableClass = false;
			if (option.value === null && this.allowEmpty) {
				_disableClass = false;
			}
			if (option.value === null && !this.allowEmpty) {
				_disableClass = true;
			}
			if (option.disabled) {
				_disableClass = true;
			}
			return {
				'form-option--disabled': _disableClass,
			};
		},
		handleOptionClick(option) {
			if (option.value === null && !this.allowEmpty) {
				return;
			}
			if (!option.disabled) {
				this.selectedLabel = option.label;
				this.setValue(this.selectedLabel);
				this.visible = false;
			}
			return;
		},
		handleQueryChange(evt) {
			this.queryString = evt.target.value.toLowerCase();
			this.queryString;
			let results = [];
			this.options.filter(item => {
				if (item.value !== null) {
					if (
						item.label.toLowerCase().includes(this.queryString) ||
						item.value.toLowerCase().includes(this.queryString)
					) {
						results.push(item);
					}
				}
			});
			this.filterResults = results;
		},
		handleInputFocus() {
			if (!this.queryString) {
				this.filterResults = this.options;
			}
			this.visible = true;
		},
		handleClickOutside() {
			if (this.selectedLabel || this.allowEmpty) {
				this.visible = false;
			}
		},
		setValue(label) {
			let selectedItem = this.options.find(option => option.label === label);
			this.currentValue = selectedItem.value;
			this.$emit('input', this.currentValue);
		},
		labelVaule(val) {
			let selectedItem = this.options.find(option => option.value === val);
			this.selectedLabel = selectedItem.label;
		},
	},
};
</script>
