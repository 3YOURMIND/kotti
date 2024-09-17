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
	KtPopover,
	KtUserMenu,

	// --------------
	KtAccordion,
	KtAvatarGroup,
	KtBanner,
	KtBreadcrumb,
	KtCard,
	KtCol,
	KtDrawer,
	KtModal,
	KtRow,
	KtLine,
	KtTag,
	KtValueLabel,
	KtHeading,
	KtSplitButton,
	Kotti,
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
	popoverDateTime: null,
	popoverDateTimeRange: [null, null],
	isNice: false,
})
const isNarrow = ref(false)

const toISODate = (d: Date) => d.toISOString().split('T')[0]
const toISODateTime = (d: Date) =>
	d.toISOString().replace('T', ' ').split('.')[0]

const lastReload = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const isAccordionOpen = ref(false)
const isDrawerOpen = ref(false)
const isModalOpen = ref(false)

const setRange = () => {
	setTimeout(() => {
		formValue.value = {
			...formValue.value,
			birthdayTimeRange: ['2024-09-22 12:44:31', '2024-10-22 12:44:31'],
		}
	}, 1500)
}

const avatarGroupSettings = ref<
	Kotti.AvatarGroup.Props & { showContentSlot: boolean }
>({
	count: 2,
	isHoverable: true,
	isStack: true,
	items: [
		{ name: 'Beyoncé', src: 'https://picsum.photos/200' },
		{ name: 'Justin', src: 'https://picsum.photos/100' },
		{ name: 'Britney', src: 'https://picsum.photos/130' },
		{ name: 'Shakira', src: 'https://picsum.photos/140' },
		{ name: 'Rihanna', src: 'https://picsum.photos/150' },
	],
	showContentSlot: false,
	size: Kotti.Avatar.Size.MEDIUM,
})
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
					<KtHeading text="Hello vue3, yay" />
					<!-- <KtButton label="hello" type="primary" @click="() => alerty('hello')" /> -->
					<KtAccordion title="Accordion" v-model:isClosed="isAccordionOpen">
						<KtValueLabel label="Labello" value="valulli" />
					</KtAccordion>
					<KtAvatarGroup v-bind="{ ...avatarGroupSettings }" />
					<KtBanner
						message="Your material is not published yet"
						icon="announce"
						actionText="Publish"
					/>
					<KtBreadcrumb
						:activeIndex="2"
						:breadcrumbs="[
							{
								title: 'Kotti',
								onClick: () => {},
								isCompleted: true,
							},
							{
								title: 'Usage',
								onClick: () => {},
								isCompleted: true,
							},
							{
								title: 'Components',
								onClick: () => {},
								isCompleted: true,
							},
							{
								title: 'Links',
								onClick: () => {},
								isCompleted: false,
							},
							{
								title: 'Breadcrumbs',
								onClick: () => {},
								isDisabled: true,
							},
						]"
					/>

					<KtCard
						imgUrl="https://picsum.photos/900/300"
						primaryActionLabel="Confirm"
						secondaryActionLabel="Cancel"
					>
						<template #card-header>
							<h2>Lorem Ipsum</h2>
						</template>
						<template #card-body>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Phasellus consequat nisl at nisl condimentum vehicula.
							</p>
						</template>
					</KtCard>
					<KtForm v-model:value="formValue">
						<!-- <KtFieldText formKey="name" label="name">
						<template #helpText>
							<strong> Let me help you </strong>
						</template>
					</KtFieldText> -->
						<KtFieldDate
							formKey="birthday"
							isOptional
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
							isOptional
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
							isOptional
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
							isOptional
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
						<KtDrawer v-if="isDrawerOpen">
							<template #drawer-header>
								<h2>Default Size Drawer</h2>
							</template>
							<template #drawer-body>
								<p>Close from outside disabled</p>
							</template>
							<template #drawer-footer>
								<KtButton
									@click="isDrawerOpen = false"
									class="w-100"
									label="Close Drawer"
								/>
							</template>
						</KtDrawer>

						<KtPopover>
							<KtButton label="KtPopover Button" />
							<template #content>
								<div style="max-width: 500px">
									<pre>
										<code v-text="'<template #content>Slot</template>'" />
									</pre>
									<strong>We also support sub-dropdowns</strong> like
									<code>KtFieldSingleSelect</code>, however it’s recommended to
									use <code>trigger="click"</code> when utilizing this.
									<br />
									<KtFieldDateTime
										formKey="popoverDateTime"
										isOptional
										label="Label"
									/>
									<KtFieldDateTimeRange
										formKey="popoverDateTimeRange"
										isOptional
										label="Label"
									/>
								</div>
							</template>
						</KtPopover>
						<KtSplitButton
							:actions="[
								{
									icon: 'calendar',
									label: 'Open Drawer',
									onClick: () => (isDrawerOpen = true),
									dataTest: 'calendar',
								},
								{
									icon: 'landline',
									label: 'Action 2',
									onClick: () => (isModalOpen = true),
									dataTest: 'landline',
								},
								{
									icon: 'location',
									label: 'Action 3',
									onClick: () => alerty('Action 3'),
									dataTest: 'location',
									isDisabled: true,
								},
							]"
							dataTest="btn-1"
							icon="download"
							label="Split Button"
							type="primary"
							@click="alerty('Split Button')"
						/>
						<KtTag text="tag me harder" />

						<KtModal :isOpen="isModalOpen">
							<template #body>
								<span> I am an announcement. I open by default </span>
							</template>
							<template #footer>
								<KtButton label="close" @click="isModalOpen = false" />
							</template>
						</KtModal>
					</KtForm>
				</div>
				<KtLine />
				<KtRow :gap="10">
					<KtCol :xs="24" :span="3"><div class="grid-content light" /></KtCol>
					<KtCol :sm="24" :span="4"><div class="grid-content dark" /></KtCol>
					<KtCol :md="24" :span="5"><div class="grid-content light" /></KtCol>
					<KtCol :lg="24" :span="6"><div class="grid-content dark" /></KtCol>
					<KtCol :xl="24" :span="6"><div class="grid-content light" /></KtCol>
				</KtRow>
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

.grid-content {
	height: 40px;
	border-radius: 4px;
	opacity: 0.46;

	&.light {
		background: #3173de;
	}

	&.dark {
		background: #afc5e8;
	}
}
</style>
