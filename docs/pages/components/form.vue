<template lang="md">
# Form

<ClientOnly>
	<KtTranslationContext :locale="locale">
		<KtFieldSingleSelect
			v-model="locale"
			hideClear
			label="Language"
			leftIcon="global"
			:options="[
				{ label: 'German (de-DE)', value: 'de-DE' },
				{ label: 'English (en-US)', value: 'en-US' },
				{ label: 'Spanish (es-ES)', value: 'es-ES' },
				{ label: 'French (fr-FR)', value: 'fr-FR' },
				{ label: 'Japanese (ja-JP)', value: 'ja-JP' },
			]"
		/>
		<h2>KtForm Settings</h2>
		<div class="wrapper">
			<KtFieldRadioGroup
				v-model="preventSubmissionOn"
				isOptional
				label="Prevent Submission"
				:options="[
					{ label: 'Error', value: 'error' },
					{ label: 'Warning', value: 'warning' },
					{ label: 'Never', value: 'NEVER' }
				]"
				:validator="(value) => ({
					text: null,
					type: value === 'NEVER' ? 'success' : value
				})"
			/>
			<KtFieldRadioGroup
				v-model="fieldSize"
				isOptional
				label="Field Size"
				:options="[
					{ label: 'Small', value: 'small' },
					{ label: 'Medium', value: 'medium' },
					{ label: 'Large', value: 'large' }
				]"
			/>
			<KtFieldToggleGroup
				v-model="formSettings"
				isOptional
				label="Miscellaneous"
				:options="[
					{ key: 'hideValidation', label: 'Hide validation' },
					{ key: 'isLoading', label: 'Is Loading' },
					{ key: 'disableFormFields', label: 'Disable Form Fields' },
				]"
			/>
		</div>
		<h2>KtForm</h2>
		<KtForm
			v-model="formData"
			:hideValidation="formSettings.hideValidation"
			:isLoading="formSettings.isLoading"
			v-bind="{ preventSubmissionOn, validators}"
			@submit="onSubmit"
		>
			<KtFieldDateTimeRange
				formKey="dateTimeRange"
				:isDisabled="formSettings.disabledFormFields"
				label="KtFieldDateTimeRange"
				:maximumDate="null"
				minimumDate="2020-06-05"
				:size="fieldSize"
				:shortcuts="shortcuts('dateTimeRange', DATE_TIME_ISO_FORMAT)"
			/>
			<KtFieldDateTime
				formKey="dateTime"
				:isDisabled="formSettings.disabledFormFields"
				label="KtFieldDateTime"
				:size="fieldSize"
				:shortcuts="shortcuts('dateTime', DATE_TIME_ISO_FORMAT)"
			/>
			<KtFieldDateRange
				formKey="dateRange"
				:isDisabled="formSettings.disabledFormFields"
				label="KtFieldDateRange"
				:maximumDate="null"
				minimumDate="2020-06-05"
				:size="fieldSize"
				:shortcuts="shortcuts('dateRange', DATE_ISO_FORMAT)"
			/>
			<KtFieldDate
				formKey="date"
				label="KtFieldDate"
				:isDisabled="formSettings.disabledFormFields"
				:maximumDate="null"
				minimumDate="2020-06-05"
				placeholder="Select Date"
				:size="fieldSize"
				:shortcuts="shortcuts('date', DATE_ISO_FORMAT)"
			/>
			<KtFieldMultiSelect
				:collapseTagsAfter="3"
				formKey="multiSelect"
				:isDisabled="formSettings.disableFormFields"
				isOptional
				label="Multi Select"
				leftIcon="shipping"
				:options="radioGroupAndSelectOptions"
				placeholder="select something"
				prefix="Prefix"
				rightIcon="calendar"
				:size="fieldSize"
				suffix="Suffix"
			/>
			<KtFieldSingleSelect
				formKey="radioGroupAndSingleSelect"
				:isDisabled="formSettings.disableFormFields"
				label="Single Select"
				leftIcon="shipping"
				:options="radioGroupAndSelectOptions"
				placeholder='select something'
				prefix="Prefix"
				rightIcon="calendar"
				:size="fieldSize"
				suffix="Suffix"
			/>
			<KtFieldRadioGroup
				formKey="radioGroupAndSingleSelect"
				:isDisabled="formSettings.disableFormFields"
				isOptional
				label="Some RadioGroup"
				:options="radioGroupAndSelectOptions"
				:size="fieldSize"
			/>
			<KtFieldToggleGroup
				formKey="toggleGroup"
				:isDisabled="formSettings.disableFormFields"
				label="Some ToggleGroup"
				:options="[
					{ key: 'initiallyFalse', label: 'A (initiallyFalse)' },
					{ key: 'initiallyNull', label: 'B (initiallyNull)' },
					{ key: 'initiallyTrue', label: 'C (initiallyTrue)' },
				]"
				:size="fieldSize"
			/>
			<KtFieldToggle
				formKey="toggle"
				:isDisabled="formSettings.disableFormFields"
				isOptional
				label="KtFieldToggle"
				:size="fieldSize"
				:type="formData.toggle ? 'checkbox' : 'switch'"
			>
				<template v-slot="{ value }">
					{{ value ? 'Make Switch' : 'Make Checkbox' }}
				</template>
			</KtFieldToggle>
			<KtFieldText
				formKey="firstName"
				helpText="Help for firstName"
				helpDescription="help description"
				:isDisabled="formSettings.disableFormFields"
				label="First Name"
				leftIcon="comment"
				placeholder="Klaus"
				prefix="Prefix"
				rightIcon="location"
				:size="fieldSize"
				suffix="Suffix"
			/>
			<KtFieldText
				formKey="lastName"
				helpText="help for lastName"
				:isDisabled="formSettings.disableFormFields"
				label="Last Name"
				placeholder="Dieter"
				:size="fieldSize"
			/>
			<br />
			<h2>Validation Example</h2>
			<KtFieldText
				formKey="lastName"
				:isDisabled="formSettings.disableFormFields"
				prefix="Prefix"
				:size="fieldSize"
				:tabIndex="5"
				validatorKey="alwaysNeutral"
			/>
			<KtFieldText
				formKey="lastName"
				:isDisabled="formSettings.disableFormFields"
				label="Field That Always Errors"
				:size="fieldSize"
				suffix="Suffix"
				:tabIndex="4"
				validatorKey="alwaysError"
			/>
			<KtFieldText
				formKey="lastName"
				:isDisabled="formSettings.disableFormFields"
				label="Field That Always Succeeds"
				leftIcon="cloud"
				:size="fieldSize"
				:tabIndex="3"
				validatorKey="alwaysSuccess"
			/>
			<KtFieldText
				formKey="lastName"
				hideClear
				:isDisabled="formSettings.disableFormFields"
				label="Field That Always Warns"
				rightIcon="location"
				:size="fieldSize"
				:tabIndex="2"
				validatorKey="alwaysWarning"
			/>
			<KtFieldText
				formKey="username"
				helpText="help for username"
				:isDisabled="formSettings.disableFormFields"
				isOptional
				label="Username"
				leftIcon="comment"
				prefix="Prefix"
				rightIcon="calendar"
				:size="fieldSize"
				suffix="Suffix"
				:tabIndex="1"
			/>
			<KtFieldTextArea
				formKey="description"
				:isDisabled="formSettings.disableFormFields"
				label="description"
				placeholder="type something"
				:size="fieldSize"
			/>
			<br />
			<h2>KtFormControllerList</h2>
			<ul>
				<KtFormControllerList formKey="users">
					<template v-slot:default="{ addAfter, addBefore, deleteSelf, index, setValues, values }">
						<li>
							<h3 v-text="`Item ${index}`" />
							<KtFieldText
								formKey="username" label="Username"
								:isDisabled="formSettings.disableFormFields"
								leftIcon="user"
								:size="fieldSize"
								validatorKey="username"
							/>
							<div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
								<button class="kt-button danger" type="button" @click="deleteSelf">
									Delete "{{ values.username }}"
								</button>
								<button class="kt-button secondary" type="button" @click="addBefore({ username: `before Item${index}` })">
									Add Before
								</button>
								<button class="kt-button secondary" type="button" @click="addAfter({ username: `after Item${index}` })">
									Add After
								</button>
								<button class="kt-button seondary" type="button" @click="setValues({ ...values, username: `replaced Item${index}` })">
									Set Values
								</button>
							</div>
						</li>
					</template>
				</KtFormControllerList>
				<br/>
				Custom Button: <button class="kt-button primary" type="button" @click="addUser">Add User</button>
			</ul>
			<br />
			<h2>KtFormControllerObject</h2>
			<KtFormControllerObject formKey="user">
				<KtFieldText
					formKey="lastName"
					:isDisabled="formSettings.disableFormFields"
					label="I’m a Field In user"
					rightIcon="user"
					:size="fieldSize"
					validatorKey="username"
				/>
			</KtFormControllerObject>
			<KtFormSubmit />
		</KtForm>
		<br />
		<br />
		<h2>formData</h2>
		<pre v-text="JSON.stringify(formData, null, '\t')" />
		<h2>KtFields Without Form</h2>
		<div>
			<KtFieldText
				v-model="textValue"
				label="KtFieldText"
				placeholder="type something"
			/>
		</div>
	</KtTranslationContext>
</ClientOnly>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref } from '@vue/composition-api'
import dayjs from 'dayjs'

import {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
} from '../../../packages/next/kotti-field-date/types'
import {
	KottiFieldMultiSelect,
	KottiFieldSingleSelect,
} from '../../../packages/next/kotti-field-select/types'
import { KottiFieldTextArea } from '../../../packages/next/kotti-field-text-area/types'
import { KottiFieldText } from '../../../packages/next/kotti-field-text/types'
import {
	KottiFieldToggle,
	KottiFieldToggleGroup,
} from '../../../packages/next/kotti-field-toggle/types'
import { KottiField } from '../../../packages/next/kotti-field/types'
import { KottiForm } from '../../../packages/next/kotti-form/types'

const DATE_ISO_FORMAT = 'YYYY-MM-DD'
const DATE_TIME_ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss'

export default defineComponent({
	name: 'KtFormDoc',
	setup() {
		const formData: Ref<{
			date: KottiFieldDate.Value
			dateRange: KottiFieldDateRange.Value
			dateTime: KottiFieldDateTime.Value
			dateTimeRange: KottiFieldDateTimeRange.Value
			description: KottiFieldTextArea.Value
			firstName: KottiFieldText.Value
			lastName: KottiFieldText.Value
			multiSelect: KottiFieldMultiSelect.Value
			radioGroupAndSingleSelect: KottiFieldSingleSelect.Value
			toggle: KottiFieldToggle.Value
			toggleGroup: KottiFieldToggleGroup.Value
			user: { lastName: KottiFieldText.Value }
			username: KottiFieldText.Value
			users: Array<{ username: KottiFieldText.Value }>
		}> = ref({
			toggle: true,
			date: null,
			dateRange: [null, null],
			dateTime: null,
			dateTimeRange: [null, null],
			toggleGroup: {
				initiallyFalse: false,
				initiallyNull: null,
				initiallyTrue: true,
			},
			description: null,
			firstName: 'John',
			lastName: 'Smith',
			multiSelect: [1, 2],
			radioGroupAndSingleSelect: null,
			user: { lastName: 'pepe' },
			username: null,
			users: [{ username: null }, { username: 'anything' }],
		})

		return {
			addUser: () => {
				formData.value = {
					...formData.value,
					users: [...formData.value?.users, { username: null }],
				}
			},
			alwaysError: (): KottiField.Validation.Result => ({
				type: 'error',
				text: 'Always Error!',
			}),
			alwaysSuccess: (): KottiField.Validation.Result => ({
				type: 'success',
				text: 'Always Success!',
			}),
			alwaysWarning: (): KottiField.Validation.Result => ({
				type: 'warning',
				text: 'Always Warning!',
			}),
			DATE_ISO_FORMAT,
			DATE_TIME_ISO_FORMAT,
			locale: ref('en-US'),
			shortcuts: computed(
				() => (
					formValueKey: 'date' | 'dateRange' | 'dateTime' | 'dateTimeRange',
					format: typeof DATE_ISO_FORMAT | typeof DATE_TIME_ISO_FORMAT,
				): {
					keepOpen?: boolean
					label: string
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					value: any
				}[] => {
					const dateValue = formData.value ? formData.value[formValueKey] : null
					const dateString =
						dateValue !== null && Array.isArray(dateValue)
							? dateValue[1]
							: dateValue
					const isRange = Array.isArray(dateValue)

					const today = (format: string) =>
						dayjs()
							.format(format)
							.replace('T', ' ')

					const jumpOneWeek = (fromDate: string | null, format: string) =>
						// null is interpreted as epoch date by dayjs
						dayjs(fromDate ?? undefined)
							.add(1, 'week')
							.format(format)
							.replace('T', ' ')

					const yesterday = (format: string) =>
						dayjs()
							.subtract(1, 'day')
							.format(format)
							.replace('T', ' ')

					return [
						{
							label: 'Today',
							value: isRange ? [today(format), today(format)] : today(format),
						},
						{
							label: 'Yesterday',
							value: isRange
								? [yesterday(format), today(format)]
								: yesterday(format),
						},
						{
							label: 'Next Week',
							value: isRange
								? [dateString ?? today(format), jumpOneWeek(dateString, format)]
								: jumpOneWeek(dateString, format),
							keepOpen: true,
						},
					]
				},
			),
			disableFormFields: ref(false),
			formData,
			fieldSize: ref('medium'),
			formSettings: ref({
				hideValidation: false,
				isLoading: false,
				disableFormFields: false,
			}),
			onSubmit: (event: KottiForm.Events.Submit) => {
				// eslint-disable-next-line no-console
				console.debug('onSubmit', event)
				alert('onSubmit: See Console for Event Details')
			},
			preventSubmissionOn: ref('NEVER'),
			radioGroupAndSelectOptions: ref([
				{ label: 'label 1', value: 1 },
				{ label: 'label 2', value: 2 },
				{ label: 'label 3', value: 3 },
				{ disabled: true, label: 'label 4', value: 4 },
				{ label: 'label 5', value: 5 },
				{ label: 'label 6', value: 6 },
			]),
			textValue: ref(null),
			validators: computed(
				(): Record<string, KottiField.Validation.Function> => ({
					alwaysError: () => ({ type: 'error', text: 'Always Error!' }),
					alwaysNeutral: () => ({ type: null }),
					alwaysSuccess: () => ({ type: 'success', text: 'Always Success!' }),
					alwaysWarning: () => ({ type: 'warning', text: 'Always Warning!' }),
					username: (value: string | null) => {
						if (value === null) return { type: null }

						// eslint-disable-next-line no-magic-numbers
						if (value.length < 3)
							return {
								text: 'Your Username is too short',
								type: 'error',
							}

						// eslint-disable-next-line no-magic-numbers
						if (value.length < 5)
							return {
								text: 'Your username is already taken',
								type: 'warning',
							}

						return { text: null, type: 'success' }
					},
				}),
			),
		}
	},
})
</script>

<style lang="scss">
@import '../../../packages/kotti-style/_variables.scss';

li {
	list-style: none;
}

h3 {
	border-bottom: 0;
}

.wrapper {
	display: flex;
	flex-direction: row;
	margin: 0;
	margin-bottom: 1.5em;
	background-color: var(--ui-01);
	border: 1px solid var(--ui-02);
	border-radius: $border-radius;

	> * {
		flex: 1;
		padding: 1.5em;
		margin: 0 !important;
	}

	> *:not(:last-child) {
		border-right: 1px solid var(--ui-02);
	}
}
</style>
