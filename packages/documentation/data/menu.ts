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
					{ label: 'Accordion', path: 'accordion', tags: [] },
					{ label: 'Avatars', path: 'avatars', tags: [] },
					{ label: 'Banners', path: 'banners', tags: [] },
					{ label: 'Buttons', path: 'buttons', tags: [] },
					{ label: 'Breadcrumbs', path: 'breadcrumbs', tags: [] },
					{ label: 'Cards', path: 'cards', tags: [] },
					{ label: 'Comments', path: 'comments', tags: [] },
					{ label: 'Drawers', path: 'drawer', tags: [] },
					{ label: 'Dropdowns', path: 'dropdowns', tags: [Tag.DEPRECATED] },
					{ label: 'Form', path: 'form', tags: [Tag.TS] },
					{ label: 'Form Fields', path: 'form-fields', tags: [Tag.TS] },
					{ label: 'Headings', path: 'headings', tags: [] },
					{ label: 'Horizontal Lines', path: 'lines', tags: [] },
					{ label: 'Inputs', path: 'inputs', tags: [Tag.DEPRECATED] },
					{ label: 'Loadings', path: 'loadings', tags: [Tag.CSS] },
					{ label: 'Modal', path: 'modal', tags: [Tag.TS] },
					{ label: 'Paginations', path: 'paginations', tags: [] },
					{ label: 'Popovers', path: 'popovers', tags: [] },
					{ label: 'Radios', path: 'radios', tags: [Tag.DEPRECATED] },
					{ label: 'Tables', path: 'tables', tags: [] },
					{ label: 'Toaster', path: 'toaster', tags: [] },
					{ label: 'Selects', path: 'selects', tags: [Tag.DEPRECATED] },
					{ label: 'Steps', path: 'steps', tags: [] },
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
			{
				icon: Yoco.Icon.MARKUP,
				title: 'DesignKit',
				path: 'designkit',
				pages: [],
			},
		],
	},
]
