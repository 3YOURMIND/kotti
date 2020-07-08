import { Yoco } from '../../packages/next/types'

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
			{ icon: 'file', title: 'Overview', path: '', pages: [] },
			{ icon: 'version', title: 'Changelog', path: 'changelog', pages: [] },
		],
	},
	{
		title: 'Usage',
		subsections: [
			{
				icon: 'layer',
				title: 'Foundations',
				path: 'foundations',
				pages: [
					{ label: 'Layout', tags: [], path: 'layout' },
					{ label: 'Grids', tags: [], path: 'grids' },
					{ label: 'Icons', tags: ['css'], path: 'icons' },
					{ label: 'Typography', tags: ['css'], path: 'typography' },
					{ label: 'Writing Style', tags: [], path: 'writing' },
				],
			},
			{
				// FIXME: Yoco.Icon still isn’t complete. Let’s find a way to actually ensure it’s always complete
				// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
				// @ts-ignore
				icon: 'json',
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
				icon: 'dashboard',
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
				icon: 'sidebar',
				title: 'Patterns',
				path: 'patterns',
				pages: [
					{ tags: [], label: 'ActionBar', path: 'actionbar' },
					{ tags: [], label: 'Comments', path: 'comments' },
					{ tags: [], label: 'Container', path: 'container' },
					{ tags: [], label: 'NavBar', path: 'navbar' },
					{ tags: [], label: 'Inline Edit', path: 'inline-edit' },
					{ tags: [], label: 'User Menu', path: 'user-menu' },
				],
			},
			{
				icon: 'markup',
				title: 'DesignKit',
				path: 'designkit',
				pages: [],
			},
		],
	},
]
