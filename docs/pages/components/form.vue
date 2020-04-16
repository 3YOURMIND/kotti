<template lang="md">
# Form

<ClientOnly>
	<KtForm v-model="formData" :validators="validators">
		<KtFieldText formKey="firstName" label="First Name"/>
		<KtFieldText formKey="lastName"/>
		<KtFieldText formKey="lastName" label="Last Name" isOptional />
	</KtForm>
</ClientOnly>
</template>

<script>
export default {
	name: 'KtFormDoc',
	data() {
		return {
			formData: {
				firstName: 'John',
				lastName: 'Smith',
			},
			validators: {},
		}
	},
}
</script>
