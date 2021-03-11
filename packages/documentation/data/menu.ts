import {
	Kotti,
	KtAccordion,
	KtAvatar,
	KtBanner,
	KtButton,
	KtBreadcrumb,
	KtCard,
	KtComment,
	KtDrawer,
	KtDropdown,
	KtForm,
	KtHeading,
	KtLine,
	KtInput,
	KtModal,
	KtPagination,
	KtPopover,
	KtRadio,
	KtTable,
	KtToaster,
	KtSteps,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

export enum Tag {
	CSS = 'css',
	DEPRECATED = 'deprecated',
	GUIDE = 'guide',
	TS = 'ts',
}

export type SubsectionPage = {
	label: string
	tags: Array<Tag>
	path: string
}

export type Subsection = {
	icon: Yoco.Icon
	title: string
	path: string
	pages: Array<SubsectionPage>
}

export type Section = {
	title: string
	subsections: Array<Subsection>
}

const makeComponentMenuItem = (component: {
	name: string
	meta: Kotti.Meta
}): SubsectionPage => ({
	label: component.name.replace(/^Kt/, ''),
	path: component.name.replace(/^Kt/, '').toLowerCase(),
	tags: [
		component.meta.deprecated === null ? null : Tag.DEPRECATED,
		component.meta.typeScript === null ? null : Tag.TS,
	].filter((x) => x !== null) as Tag[],
})

export const menu: Array<Section> = [
	{
		title: 'Guide',
		subsections: [
			{ icon: Yoco.Icon.FILE, title: 'Overview', path: '', pages: [] },
			{
				icon: Yoco.Icon.VERSION,
				title: 'Changelog',
				path: 'changelog',
				pages: [],
			},
		],
	},
	{
		title: 'Usage',
		subsections: [
			{
				icon: Yoco.Icon.LAYER,
				title: 'Foundations',
				path: 'foundations',
				pages: [
					{ label: 'Layout', path: 'layout', tags: [Tag.GUIDE] },
					{ label: 'Grids', path: 'grids', tags: [Tag.TS] },
					{ label: 'Icons', path: 'icons', tags: [Tag.CSS, Tag.TS] },
					{ label: 'Typography', path: 'typography', tags: [Tag.CSS] },
					{ label: 'Writing Style ', path: 'writing', tags: [Tag.GUIDE] },
				],
			},
			{
				icon: Yoco.Icon.JSON,
				title: 'Tokens',
				path: 'tokens',
				pages: [
					{
						label: 'Introduction to tokens',
						path: 'introduction',
						tags: [Tag.GUIDE],
					},
					{ label: 'Colors', path: 'colors', tags: [Tag.CSS] },
					{ label: 'Figma', path: 'figma', tags: [Tag.GUIDE] },
					{ label: 'Theming', path: 'theming', tags: [Tag.GUIDE] },
				],
			},
			{
				icon: Yoco.Icon.DASHBOARD,
				title: 'Components',
				path: 'components',
				pages: [
					makeComponentMenuItem(KtAccordion),
					makeComponentMenuItem(KtAvatar),
					makeComponentMenuItem(KtBanner),
					makeComponentMenuItem(KtButton),
					makeComponentMenuItem(KtBreadcrumb),
					makeComponentMenuItem(KtCard),
					makeComponentMenuItem(KtComment),
					makeComponentMenuItem(KtDrawer),
					makeComponentMenuItem(KtDropdown),
					makeComponentMenuItem(KtForm),
					{ label: 'Form Fields', path: 'form-fields', tags: [Tag.TS] },
					makeComponentMenuItem(KtHeading),
					makeComponentMenuItem(KtInput),
					makeComponentMenuItem(KtLine),
					{ label: 'Loadings', path: 'loadings', tags: [Tag.CSS] },
					makeComponentMenuItem(KtModal),
					makeComponentMenuItem(KtPagination),
					makeComponentMenuItem(KtPopover),
					makeComponentMenuItem(KtRadio),
					makeComponentMenuItem(KtSteps),
					makeComponentMenuItem(KtTable),
					makeComponentMenuItem(KtToaster),
					{ label: 'Utilities', tags: [Tag.CSS], path: 'utilities' },
				],
			},
			{
				icon: Yoco.Icon.SIDEBAR,
				title: 'Patterns',
				path: 'patterns',
				pages: [
					{ label: 'ActionBar', path: 'actionbar', tags: [] },
					{ label: 'Forms', path: 'forms', tags: [Tag.DEPRECATED] },
					{ label: 'NavBar', path: 'navbar', tags: [] },
					{ label: 'Inline Edit', path: 'inline-edit', tags: [Tag.DEPRECATED] },
					{ label: 'User Menu', path: 'user-menu', tags: [] },
				],
			},
		],
	},
]
