<script setup lang="ts">
import '@3yourmind/kotti-ui/dist/style.css'
import '@3yourmind/yoco/style.css'

import {
	KtButton,
	KtFieldDate,
	KtFieldText,
	KtFieldToggle,
	KtForm,
	KtNavbar,
	KtActionbar,
	KtUserMenu,
	KtI18nContext,
} from '@3yourmind/kotti-ui'
import { ref } from 'vue'

const alerty = (some: string) => {
	window.alert(some)
}

const formValue = ref({
	name: null,
	birthday: null,
	isNice: false,
})
const isNarrow = ref(false)
</script>

<template>
	<KtI18nContext locale="en-US">
		<div class="kt-container">
			<KtNavbar
				:isNarrow="isNarrow"
				logoUrl="https://c.tenor.com/KvQWsHSsiMwAAAAC/tenor.gif"
				:sections="[
					{
						title: 'Order Management',
						links: [
							{
								component: 'a',
								icon: 'invoice',
								isActive: false,
								props: {
									href: '#',
								},
								title: 'Orders',
							},
							{
								component: 'a',
								icon: 'request',
								isActive: false,
								props: {
									href: '#',
								},
								title: 'Quotes',
							},
						],
					},
				]"
				@setIsNarrow="(val) => (isNarrow = val)"
			>
				<template #navbar-footer>
					<KtUserMenu
						:sections="[
							{
								links: [
									{
										component: 'a',
										props: {
											href: '#',
										},
										title: 'User Panel',
									},
									{
										component: 'a',
										props: {
											href: '#',
										},
										title: 'Service Panel',
									},
								],
								title: 'Switch To',
							},
							{
								links: [
									{
										component: 'a',
										props: {
											href: '#',
										},
										title: '2YOURMIND Service',
									},
									{
										component: 'a',
										props: {
											href: '#',
										},
										title: '3YOURMIND Service',
									},
									{
										component: 'a',
										props: {
											href: '#',
										},
										title: '4YOURMIND Service',
									},
								],
								title: 'Recent Service',
							},
							{
								links: [
									{
										component: 'a',
										props: {
											href: '#',
										},
										title: 'Settings',
									},
									{
										component: 'nuxt-link',
										props: {
											to: '/usage/layouts/navbar',
										},
										title: 'Logout (Close Example)',
									},
								],
								title: null,
							},
						]"
						userName="Jony'O Five"
						userStatus="Invisible"
					/>
				</template>
			</KtNavbar>
			<KtActionbar
				slot="actionbar"
				headerTitle="KtContainer Example"
				:menu="[
					{
						label: 'First Link',
						to: '/examples/layouts',
						icon: 'user',
						active: false,
						disabled: false,
					},
					{
						label: 'Second Link',
						to: 'https://google.com',
						icon: 'basket',
						active: true,
						disabled: false,
					},
					{
						label: 'Third Link',
						to: '/',
						icon: 'bell',
						active: false,
						disabled: true,
					},
				]"
			/>
			<main class="workspace">
				<KtButton label="hello" type="primary" @click="() => alerty('hello')" />
				<KtForm v-model:value="formValue">
					<KtFieldText formKey="name" label="name">
						<template #helpText>
							<strong> Let me help you </strong>
						</template>
					</KtFieldText>
					<KtFieldDate formKey="birthday" label="birthday">
						<template #helpText>
							<strong> Let me help you </strong>
						</template>
					</KtFieldDate>
					<KtFieldToggle formKey="isNice" label="toggle">
						<template #helpText>
							<strong> Let me help you </strong>
						</template>
					</KtFieldToggle>
				</KtForm>
			</main>
		</div> </KtI18nContext
	>locale
</template>

<style scoped>
main {
	padding: 80px;
}

/* header {
	line-height: 1.5;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
	header {
		display: flex;
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
} */
</style>
