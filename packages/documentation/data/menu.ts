import { Yoco } from '@3yourmind/yoco'

export type SubsectionPage = {
	label: string
	tags: Array<'deprecated' | 'css' | 'ts'>
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
					{ label: 'Layout', tags: [], path: 'layout' },
					{ label: 'Grids', tags: ['ts'], path: 'grids' },
					{ label: 'Icons', tags: ['css', 'ts'], path: 'icons' },
					{ label: 'Typography', tags: ['css'], path: 'typography' },
					{ label: 'Writing Style', tags: [], path: 'writing' },
				],
			},
			{
				icon: Yoco.Icon.JSON,
				title: 'Tokens',
				path: 'tokens',
				pages: [
					{ label: 'Introduction to tokens', tags: [], path: 'introduction' },
					{ label: 'Colors', tags: ['css'], path: 'colors' },
					{ label: 'Figma', tags: [], path: 'figma' },
					{ label: 'Theming', tags: [], path: 'theming' },
				],
			},
			{
				icon: Yoco.Icon.DASHBOARD,
				title: 'Components',
				path: 'components',
				pages: [
					{ label: 'Accordion', tags: [], path: 'accordion' },
					{ label: 'Avatars', tags: [], path: 'avatars' },
					{ label: 'Banners', tags: [], path: 'banners' },
					{ label: 'Buttons', tags: [], path: 'buttons' },
					{ label: 'Breadcrumbs', tags: [], path: 'breadcrumbs' },
					{ label: 'Cards', tags: [], path: 'cards' },
					{ label: 'Checkboxes', tags: ['deprecated'], path: 'checkbox' },
					{ label: 'DatePicker', tags: ['deprecated'], path: 'datepicker' },
					{ label: 'Drawers', tags: [], path: 'drawer' },
					{ label: 'Dropdowns', tags: ['deprecated'], path: 'dropdowns' },
					{ label: 'Form', tags: ['ts'], path: 'form' },
					{ label: 'Form Fields', tags: ['ts'], path: 'form-fields' },
					{ label: 'Headings', tags: [], path: 'headings' },
					{ label: 'Horizontal Lines', tags: [], path: 'lines' },
					{ label: 'Inputs', tags: ['deprecated'], path: 'inputs' },
					{ label: 'InputNumber', tags: ['deprecated'], path: 'inputnumber' },
					{ label: 'Loadings', tags: ['css'], path: 'loadings' },
					{ label: 'Modal', tags: [], path: 'modal' },
					{ label: 'Paginations', tags: [], path: 'paginations' },
					{ label: 'Popovers', tags: [], path: 'popovers' },
					{ label: 'Radios', tags: ['deprecated'], path: 'radios' },
					{ label: 'Tables', tags: [], path: 'tables' },
					{ label: 'Toaster', tags: [], path: 'toaster' },
					{ label: 'Selects', tags: ['deprecated'], path: 'selects' },
					{ label: 'Steps', tags: [], path: 'steps' },
					{ label: 'Switches', tags: ['deprecated'], path: 'switches' },
					{ label: 'Utilities', tags: ['css'], path: 'utilities' },
				],
			},
			{
				icon: Yoco.Icon.SIDEBAR,
				title: 'Patterns',
				path: 'patterns',
				pages: [
					{ tags: [], label: 'ActionBar', path: 'actionbar' },
					{ tags: [], label: 'Comments', path: 'comments' },
					{ tags: ['deprecated'], label: 'Container', path: 'container' },
					{ tags: [], label: 'NavBar', path: 'navbar' },
					{ tags: [], label: 'Inline Edit', path: 'inline-edit' },
					{ tags: [], label: 'User Menu', path: 'user-menu' },
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
