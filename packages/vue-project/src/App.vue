<script setup lang="ts">
import '@3yourmind/kotti-ui/dist/style.css'
import '@3yourmind/yoco/style.css'
import dayjs from 'dayjs'

import {
	KtActionbar,
	KtButton,
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
	KtForm,
	KtI18nContext,
	KtNavbar,
	KtUserMenu,
} from '@3yourmind/kotti-ui'
import { computed, ref } from 'vue'

const alerty = (some: string) => {
	window.alert(some)
}

const formValue = ref({
	name: null,
	birthday: null,
	birthdayTime: null,
	birthdayRange: [null, null],
	birthdayTimeRange: [null, null],
	isNice: false,
})
const isNarrow = ref(false)

const toISODate = (d: Date) => d.toISOString().split('T')[0]
const toISODateTime = (d: Date) =>
	d.toISOString().replace('T', ' ').split('.')[0]

const lastReload = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

const setRange = () => {
	setTimeout(() => {
		formValue.value = {
			...formValue.value,
			birthdayTimeRange: ['2024-09-22 12:44:31', '2024-10-22 12:44:31'],
		}
	}, 1500)
}
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
			<main class="workspace" style="padding-top: 4px">
				<div>
					<div
						style="
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin-bottom: 4px;
							font-size: 12px;
							gap: 4px;
						"
					>
						<div style="display: flex; flex-direction: column">
							<span>Last Reload</span>
							<time class="blink-once" :datetime="lastReload">
								{{ lastReload }}
							</time>
						</div>
						<div
							style="display: flex; flex-direction: column; text-align: right"
						>
							<span>Form State</span>
							<pre
								:key="JSON.stringify(formValue)"
								class="blink-once"
								style="padding: 2px"
								v-text="JSON.stringify(formValue).replaceAll(',', ', ')"
							/>
						</div>
					</div>
					<!-- <KtButton label="hello" type="primary" @click="() => alerty('hello')" /> -->
					<KtForm v-model:value="formValue">
						<!-- <KtFieldText formKey="name" label="name">
						<template #helpText>
							<strong> Let me help you </strong>
						</template>
					</KtFieldText> -->
						<KtFieldDate
							formKey="birthday"
							label="birthday"
							maximumDate="2024-11-24"
							minimumDate="2024-08-24"
							:shortcuts="[
								{
									label: 'Today',
									value: toISODate(new Date()),
								},
								{
									label: 'Yesterday',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24)
										return toISODate(date)
									})(),
								},
								{
									label: 'A week ago',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
										return toISODate(date)
									})(),
								},
							]"
						>
							<template #helpText>
								<strong> Let me help you </strong>
							</template>
						</KtFieldDate>
						<KtFieldDateTime
							formKey="birthdayTime"
							label="Birthday Time"
							placeholder="Na wie geths so?"
							:shortcuts="[
								{
									label: 'Todayeouaoe',
									value: toISODateTime(new Date()),
								},
								{
									label: 'Yesterday',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24)
										return toISODateTime(date)
									})(),
								},
								{
									label: 'A week ago',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
										return toISODateTime(date)
									})(),
								},
								{
									label: 'Todayeouaoe',
									value: toISODateTime(new Date()),
								},
								{
									label: 'Yesterday',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24)
										return toISODateTime(date)
									})(),
								},
								{
									label: 'A week ago',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
										return toISODateTime(date)
									})(),
								},
							]"
						>
							<template #helpText>
								<strong> Let me help you </strong>
							</template>
						</KtFieldDateTime>
						<KtFieldDateRange
							formKey="birthdayRange"
							label="Birthday Range"
							:shortcuts="[
								{
									label: 'Todayaoeu',
									value: [toISODate(new Date()), toISODate(new Date())],
								},
								{
									label: 'Yesterday',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24)
										return [toISODate(date), toISODate(new Date())]
									})(),
								},
								{
									label: 'A week ago',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
										return [toISODate(date), toISODate(new Date())]
									})(),
								},
							]"
							size="large"
						/>
						<KtFieldDateTimeRange
							formKey="birthdayTimeRange"
							label="Birthday Time Range"
							:placeholder="['likns', 'crehts']"
							:shortcuts="[
								{
									label: 'Todayaoeu',
									value: [toISODateTime(new Date()), toISODateTime(new Date())],
								},
								{
									label: 'Yesterday',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24)
										return [toISODateTime(date), toISODateTime(new Date())]
									})(),
								},
								{
									label: 'A week ago',
									value: (() => {
										const date = new Date()
										date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
										return [toISODateTime(date), toISODateTime(new Date())]
									})(),
								},
							]"
						/>
						<KtButton label="Change to sth" @click="setRange" />
					</KtForm>
				</div>
			</main>
		</div>
	</KtI18nContext>
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

@keyframes yellow-fade {
	from {
		background: #f96;
	}
	to {
		background: transparent;
	}
}

pre {
	white-space: normal;
}

.blink-once {
	animation: yellow-fade 1s ease-in-out 0s;
}
</style>
