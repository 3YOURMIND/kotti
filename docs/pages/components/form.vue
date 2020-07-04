<template lang="md">
# Form

<ClientOnly>
	<KtTranslationContext :locale="settings.locale">
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
						helpDescription="Can be set via KtTranslationContext"
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
			:preventSubmissionOn="settings.preventSubmissionOn"
			:size="settings.size"
			:validators="validators"
			v-bind="settings.booleanFlags"
			@submit="onSubmit"
		>
			<KtFieldText
				formKey="username"
				label="Username"
				rightIcon="user"
				validatorKey="username"
			/>
			<br />
			<h2>Personal Details (KtFormControllerObject)</h2>
			<KtFormControllerObject formKey="personalDetails">
				<KtFieldText
					formKey="firstName"
					helpText="help for lastName"
					label="First Name"
					placeholder="Klaus"
				/>
				<KtFieldText
					formKey="lastName"
					helpText="help for lastName"
					label="Last Name"
					placeholder="Dieter"
				/>
			</KtFormControllerObject>
			<br />
			<h2>Addresses (KtFormControllerList)</h2>
			<ul>
				<KtFormControllerList formKey="addresses" class="address-controller">
					<template v-slot:default="{ addAfter, addBefore, deleteSelf, index, setValues, values }">
						<li class="address">
							<div class="address__content">
								<div class="address__content__header">
									<h3 v-text="`Address #${index + 1}`" />
								</div>
								<div class="address__content__fields">
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
								<div class="address__content__footer">
									<button
										class="kt-button secondary"
										type="button"
										@click="setValues({
											country: Math.random() > 0.5 ? 'eg' : 'de',
											houseNumber: `${Math.ceil(Math.random() * 999)}${Math.random() > 0.5 ? 'a': ''}`,
											streetName: `${Math.random() > 0.5 ? 'Bismarck' : 'Other'}${Math.random() > 0.5 ? 'street': 'straße'}`,
										})"
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
									@click="addBefore({
										country: null,
										houseNumber: null,
										streetName: null
									})"
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
									@click="addAfter({
										country: null,
										houseNumber: null,
										streetName: null
									})"
								>
									<i class="yoco">plus</i><i class="yoco">triangle_down</i>
								</button>
							</div>
						</li>
					</template>
				</KtFormControllerList>
			</ul>
			<KtFormSubmit />
		</KtForm>
		<br />
		<h2>values</h2>
		<pre v-text="JSON.stringify(values, null, '\t')" />
	</KtTranslationContext>
</ClientOnly>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

import { KottiField } from '../../../packages/next/kotti-field/types'
import { KottiForm } from '../../../packages/next/kotti-form/types'

export default defineComponent({
	name: 'KtFormDocumentation',
	setup() {
		const values = ref({
			addresses: [{ country: null, houseNumber: null, streetName: null }],
			personalDetails: {
				firstName: 'John',
				lastName: 'Smith',
			},
			username: null,
		})

		return {
			isDeleteDisabled: computed(() => values.value.addresses.length === 1),
			onSubmit: (event: KottiForm.Events.Submit) => {
				// eslint-disable-next-line no-console
				console.debug('onSubmit', event)
				alert('onSubmit: See Console for Event Details')
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
				(): Record<string, KottiField.Validation.Function> => ({
					username: (value: string | null) => {
						if (value === null) return { type: null }

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

<style lang="scss">
@import '../../../packages/kotti-style/_variables.scss';

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

	&__content {
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

	&__buttons {
		display: flex;
		flex-direction: column;

		> *:not(:first-child) {
			margin-top: 5px;
		}
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
