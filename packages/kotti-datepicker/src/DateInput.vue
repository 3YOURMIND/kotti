<template>
	<div class="form-group">
		<label class="form-label" v-text="label" />
		<div class="has-icon-left">
			<input
				v-bind="$attrs"
				:placeholder="placeholder"
				:type="type"
				:value="currentValue"
				@change="handleChange"
				@input="handleInput"
				@blur="handleBlur"
				@focus="handleFocus"
				class="form-input"
			/>
			<i class="form-icon yoco" v-text="'calendar'" />
		</div>
		<div class="form-validation-text" v-if="validateText">
			<span v-text="validateText" />
		</div>
		<KtDatePicker/>
	</div>
</template>

<script>
import KtDatePicker from './DatePicker'

export default {
	name: 'KtDateInput',
	components: {
		KtDatePicker,
	},
}
</script>
