<template>
	<div :class="objectClass">
		<label class="form-label" v-text="label"/>
		<div class="default editable"
			v-if="!editMode"
			@click="editMode=true" v-text="currentValue"/>
		<div v-else>
			<input type="text" 
			class="form-input"
			v-bind="$attrs"
			@input="handleInput"
			@change="handleChange"
			:value="currentValue"
			>
			<div class="edit-button">
				<KtButton icon="close" @click="handleDismiss" />
				<KtButton icon="edit" @click="handleConfirm" />
			</div>
		</div>
	</div>
</template>

<script>
import KtButton from '../../kotti-button';

export default {
	name: 'Kt-InlineEdit',
	props: {
		value: [String, Number],
		label: {
			type: String,
			default: '',
		},
		message: {
			type: String,
			default: '',
		},
	},
	components: {
		KtButton,
	},
	data() {
		return {
			editMode: false,
			currentValue: this.value === undefined ? '' : this.value,
			preValue: this.value === undefined ? '' : this.value,
		};
	},
	watch: {
		value(val, oldValue) {
			this.setCurrentValue(val);
		},
	},
	computed: {
		objectClass() {
			let editModeClass = this.editMode ? 'form-group' : 'label-value';

			return ['inline-edit', editModeClass];
		},
	},
	methods: {
		handleConfirm(event) {
			this.editMode = false;
			this.preValue = this.currentValue;
			this.$emit('confirm', event);
		},
		handleDismiss(event) {
			this.editMode = false;
			this.setCurrentValue(this.preValue);
			this.$emit('input', this.preValue);
			this.$emit('dismiss', event);
		},
		setCurrentValue(value) {
			if (value === this.currentValue) return;
			this.currentValue = value;
		},
		handleInput(event) {
			const value = event.target.value;
			this.$emit('input', value);
			this.setCurrentValue(value);
		},
		handleChange(event) {
			this.$emit('change', event.target.value);
		},
	},
};
</script>

<style lang="scss" scoped>
.inline-edit {
	display: flex;
	flex-direction: column;
	position: relative;
}

.edit-button {
	position: absolute;
	bottom: -32px;
	right: 0;
}
</style>
