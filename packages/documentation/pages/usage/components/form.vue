<template>
	<div>
		<ComponentInfo v-bind="{ component }" />
		<ClientOnly>
			<KtI18nContext :locale="settings.locale">
				<KtForm v-model="settings">
					<div class="wrapper">
						<section>
							<h3>Shared Form ↔ Field Settings</h3>
							<KtFieldSingleSelect
								formKey="size"
								helpDescription="Can be overridden in individual fields"
								isOptional
								label="Size"
								:options="[
									{ label: 'small', value: 'small' },
									{ label: 'medium (default)', value: 'medium' },
									{ label: 'large', value: 'large' },
								]"
							/>
							<KtFieldToggleGroup
								formKey="booleanFlags"
								helpDescription="Can be overridden in individual fields"
								isOptional
								label="Boolean Flags"
								:options="[
									{ key: 'isDisabled', label: 'isDisabled' },
									{ key: 'hideClear', label: 'hideClear' },
									{ key: 'hideValidation', label: 'hideValidation' },
									{ key: 'isLoading', label: 'isLoading' },
								]"
								type="switch"
							/>
						</section>
						<div>
							<h3>Form Settings</h3>
							<KtFieldSingleSelect
								formKey="preventSubmissionOn"
								helpDescription="Which types of validation error prevent the form from submitting?"
								isOptional
								label="Prevent Submission"
								:options="[
									{ label: 'error (default)', value: 'error' },
									{ label: 'warning', value: 'warning' },
									{ label: 'NEVER', value: 'NEVER' },
								]"
							/>
							<h3>Kotti Settings</h3>
							<KtFieldSingleSelect
								formKey="locale"
								helpDescription="Can be set via KtI18nContext"
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
						</div>
					</div>
				</KtForm>
				<KtForm
					v-model="values"
					v-bind="settings.booleanFlags"
					:preventSubmissionOn="settings.preventSubmissionOn"
					:size="settings.size"
					:validators="validators"
					@submit="onSubmit"
				>
					<!-- `validators` prop on KtForm relies on formKey of this field (`username`) -->
					<KtFieldText formKey="username" label="Username" rightIcon="user" />
					<br />
					<ComponentInfo :component="KtFormControllerObject" />
					<h2>Personal Details</h2>
					<KtFormControllerObject formKey="personalDetails">
						<template #default="{ setValues, values: formObjectValues }">
							<KtFieldNumber
								formKey="age"
								helpText="help for age"
								label="age"
								placeholder="how old are you?"
							/>
							<KtFieldText
								formKey="firstName"
								helpText="help for firstName"
								label="First Name"
								placeholder="Klaus"
							/>
							<KtFieldText
								formKey="lastName"
								helpText="help for lastName"
								label="Last Name"
								placeholder="Dieter"
							/>
							<div>
								<KtFieldText
									formKey="NONE"
									hideClear
									label="Full Name"
									:value="
										(formObjectValues.firstNameFirst
											? [formObjectValues.firstName, formObjectValues.lastName]
											: [formObjectValues.lastName, formObjectValues.firstName]
										).join(',')
									"
								/>
								<KtFieldToggle
									formKey="NONE"
									isOptional
									label="Show First Name First"
									:value="formObjectValues.firstNameFirst"
									@input="
										setValues({
											...formObjectValues,
											firstNameFirst: !formObjectValues.firstNameFirst,
										})
									"
								/>
							</div>
						</template>
					</KtFormControllerObject>
					<br />
					<ComponentInfo :component="KtFormControllerList" />
					<h2>Addresses</h2>
					<ul>
						<KtFormControllerList
							class="address-controller"
							formKey="addresses"
						>
							<template
								#header="{ addBefore, setValues, values: formListValues }"
							>
								<div>
									<button
										class="kt-button secondary"
										type="button"
										@click="
											addBefore({
												country: null,
												houseNumber: null,
												streetName: null,
											})
										"
										v-text="'Add New Address To The Start'"
									/>
									<button
										class="kt-button secondary"
										type="button"
										@click="setValues([...formListValues, ...formListValues])"
										v-text="'Duplicate List'"
									/>
								</div>
							</template>
							<template
								#default="{ addAfter, addBefore, deleteSelf, index, setValues }"
							>
								<li class="address">
									<div class="address-content">
										<div class="address-content__header">
											<h3 v-text="`Address #${index + 1}`" />
										</div>
										<div class="address-content__fields">
											<KtFieldText
												formKey="streetName"
												isOptional
												label="Street Name"
												leftIcon="address_book"
											/>
											<KtFieldText
												formKey="houseNumber"
												isOptional
												label="House Number"
												leftIcon="address_book"
											/>
											<KtFieldSingleSelect
												formKey="country"
												isOptional
												label="Country"
												leftIcon="global"
												:options="[
													{ label: 'Egypt', value: 'eg' },
													{ label: 'France', value: 'fr' },
													{ label: 'Germany', value: 'de' },
													{ label: 'USA', value: 'us' },
												]"
											/>
										</div>
										<div class="address-content__footer">
											<button
												class="kt-button secondary"
												type="button"
												@click="setValues(createRandomRow())"
											>
												setValues
											</button>
										</div>
									</div>
									<div class="address__buttons">
										<button
											class="kt-button secondary"
											title="Add Field Before"
											type="button"
											@click="
												addBefore({
													country: null,
													houseNumber: null,
													streetName: null,
												})
											"
										>
											<i class="yoco">plus</i><i class="yoco">triangle_up</i>
										</button>
										<button
											class="kt-button danger"
											:disabled="isDeleteDisabled"
											title="deleteSelf"
											type="button"
											@click="deleteSelf"
										>
											<i class="yoco">close</i>
										</button>
										<button
											class="kt-button secondary"
											title="Add Field After"
											type="button"
											@click="
												addAfter({
													country: null,
													houseNumber: null,
													streetName: null,
												})
											"
										>
											<i class="yoco">plus</i><i class="yoco">triangle_down</i>
										</button>
									</div>
								</li>
							</template>
							<template #footer="{ addAfter, setValues }">
								<div>
									<button
										class="kt-button secondary"
										type="button"
										@click="
											addAfter({
												country: null,
												houseNumber: null,
												streetName: null,
											})
										"
										v-text="'Add New Address To The End'"
									/>
									<button
										class="kt-button secondary"
										type="button"
										@click="
											setValues([
												createRandomRow(),
												createRandomRow(),
												createRandomRow(),
											])
										"
										v-text="'Replace List'"
									/>
								</div>
							</template>
						</KtFormControllerList>
					</ul>
					<KtFieldRadioGroup
						dataTest="unique-radio-group"
						formKey="gender"
						label="Gender"
						:options="genderOptions"
					>
						<template #header="{ option }"> ~{{ option.label }}~ </template>
						<template #content="{ option }"> *{{ option.value }}* </template>
					</KtFieldRadioGroup>
					<KtFormSubmit />
				</KtForm>
				<br />
				<h2>values</h2>
				<pre v-text="JSON.stringify(values, null, '\t')" />
			</KtI18nContext>
		</ClientOnly>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import type { Kotti } from '@3yourmind/kotti-ui'
import {
	KtForm,
	KtFormControllerList,
	KtFormControllerObject,
} from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsForm',
	components: {
		ComponentInfo,
	},
	setup() {
		const values = ref({
			addresses: [{ country: null, houseNumber: null, streetName: null }],
			gender: 'other',
			personalDetails: {
				age: 1,
				firstName: 'John',
				firstNameFirst: false,
				fullName: 'Smith,John',
				lastName: 'Smith',
			},
			username: null,
		})

		return {
			component: KtForm,
			createRandomRow: () => ({
				/* eslint-disable no-magic-numbers */
				country: Math.random() > 0.5 ? 'eg' : 'de',
				houseNumber: `${String(Math.ceil(Math.random() * 999))}${
					Math.random() > 0.5 ? 'a' : ''
				}`,
				streetName: `${Math.random() > 0.5 ? 'Bismarck' : 'Other'}${
					Math.random() > 0.5 ? 'street' : 'straße'
				}`,
				/* eslint-enable no-magic-numbers */
			}),
			genderOptions: computed((): Kotti.FieldRadioGroup.Props['options'] => [
				{ dataTest: 'unique-male-data-test', label: 'MALE', value: 'male' },
				{ label: 'FEMALE', value: 'female' },
				{ dataTest: 'unique-other-data-test', label: 'OTHER', value: 'other' },
			]),
			isDeleteDisabled: computed(() => values.value.addresses.length === 1),
			KtFormControllerList,
			KtFormControllerObject,
			onSubmit: (event: Kotti.Form.Events.Submit) => {
				// eslint-disable-next-line no-console
				console.debug('onSubmit', event)
				// eslint-disable-next-line no-alert
				window.alert('onSubmit: See Console for Event Details')
			},
			settings: ref({
				booleanFlags: {
					hideClear: false,
					hideValidation: false,
					isDisabled: false,
					isLoading: false,
				},
				locale: ref('en-US'),
				preventSubmissionOn: 'error',
				size: 'medium',
			}),
			validators: computed(
				(): Record<string, Kotti.Field.Validation.Function> => ({
					username: (value: string | null) => {
						if (value === null) return { type: 'empty' }

						// eslint-disable-next-line no-magic-numbers
						if (value.length < 3)
							return {
								text: 'Username is too short',
								type: 'error',
							}

						// eslint-disable-next-line no-magic-numbers
						if (value.length < 5)
							return {
								text: 'Username is already taken',
								type: 'warning',
							}

						return { text: null, type: 'success' }
					},
				}),
			),
			values,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '@3yourmind/kotti-ui/source/kotti-style/_variables.scss';

.address-controller {
	> *:not(:first-child) {
		padding-top: 20px;
		margin-top: 20px;
		border-top: 1px solid var(--ui-02);
	}
}

.address {
	display: flex;
	align-items: center;

	button {
		outline: none;
	}

	> *:not(:first-child) {
		margin-left: 20px;
	}

	&__buttons {
		display: flex;
		flex-direction: column;

		> *:not(:first-child) {
			margin-top: 5px;
		}
	}
}

.address-content {
	flex: 1;

	&__fields {
		display: flex;
		align-items: center;

		> * {
			flex: 1;
			margin-bottom: 0 !important;

			&:not(:first-child) {
				margin-left: 20px;
			}
		}
	}

	&__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

li {
	margin: 0;
	list-style: none;
}

h3 {
	border-bottom: 0;
}

.wrapper {
	display: flex;
	margin: 0;
	margin-bottom: 1.5em;
	background-color: var(--ui-01);
	border: 1px solid var(--ui-02);
	border-radius: var(--border-radius);

	> * {
		flex: 1;
		padding: 1.5em;
		margin: 0 !important;
	}

	@media (width < $size-lg) {
		flex-direction: column;

		> *:not(:first-child) {
			border-top: 1px solid var(--ui-02);
		}
	}

	@media (width >= $size-lg) {
		flex-direction: row;

		> *:not(:last-child) {
			border-right: 1px solid var(--ui-02);
		}
	}
}
</style>
