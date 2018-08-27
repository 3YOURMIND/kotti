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
						<li v-if="isLoading" class="form-option--loading">Loading</li>
						<li
							v-else
							v-for="(option, index) in optionsRep"
							:key="index"
							:class="optionClass(option)"
							@click="handleOptionClick(option)"
							v-text="option.label"
						/>
						<li
							v-if="!optionsRep.length && !isLoading"
							class="form-option--empty"
							>
							No result found
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from './clickoutside'
import KtInput from '../../kotti-input'

export default {
	name: 'KtSelect',
	components: {
		KtInput,
	},
	props: {
		allowEmpty: { type: Boolean, default: false },
		filterable: { type: Boolean, default: false },
		label: { type: String, default: null },
		options: { type: Array, default: [] },
		placeholder: { type: String, default: null },
		value: [String, Number],
		isAsync: { type: Boolean, default: false },
		asyncMethod: { type: Function, default: null },
		isLoading: { type: Boolean, default: false },
	},
	data() {
		return {
			currentValue: [String, Number],
			filterResults: [],
			queryString: '',
			selectedLabel: '',
			visible: false,
		}
	},
	directives: {
		ClickOutside,
	},
	mounted() {
		if (this.value) {
			this.labelVaule(this.value)
		}
	},
	computed: {
		indicatorRep() {
			return this.visible ? 'chevron_up' : 'chevron_down'
		},
		optionsRep() {
			return this.filterable ? this.filterResults : this.options
		},
	},
	methods: {
		optionClass(option) {
			let _disableClass = false
			if (option.value === null && this.allowEmpty) {
				_disableClass = false
			}
			if (option.value === null && !this.allowEmpty) {
				_disableClass = true
			}
			if (option.disabled) {
				_disableClass = true
			}
			return {
				'form-option--disabled': _disableClass,
			}
		},
		handleOptionClick(option) {
			if (option.value === null && !this.allowEmpty) {
				return
			}
			if (!option.disabled) {
				this.selectedLabel = option.label
				this.setValue(this.selectedLabel)
				this.visible = false
			}
			return
		},
		handleQueryChange(evt) {
			this.queryString = evt.target.value.toLowerCase()
			this.queryString
			let results = []
			if (typeof this.asyncMethod === 'function') {
				this.asyncMethod(this.queryString)
			}
			this.options.filter(item => {
				if (item.value !== null) {
					if (
						item.label.toLowerCase().includes(this.queryString) ||
						item.value.toLowerCase().includes(this.queryString)
					) {
						results.push(item)
					}
				}
			})
			this.filterResults = results
		},
		handleInputFocus() {
			if (!this.queryString) {
				this.filterResults = this.options
			}
			if (!this.queryString && typeof this.asyncMethod === 'function') {
				this.filterResults = this.options
				this.asyncMethod()
			}
			this.visible = true
		},
		handleClickOutside() {
			if (this.selectedLabel || this.allowEmpty) {
				this.visible = false
			}
		},
		setValue(label) {
			let selectedItem = this.options.find(option => option.label === label)
			this.currentValue = selectedItem.value
			this.$emit('input', this.currentValue)
		},
		labelVaule(val) {
			if (!this.options) return
			let selectedItem = this.options.find(option => option.value === val)
			this.selectedLabel = selectedItem.label
		},
	},
}
</script>
