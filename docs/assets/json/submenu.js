// Todo: auto generate submenu from './pages/' dir
const submenu = [
	{
		child: [
			{
				label: 'Layout',
				to: 'layout',
			},
			{
				label: 'Grids',
				to: 'grids',
			},
			{
				label: 'Icons',
				to: 'icons',
			},
			{
				label: 'Typography',
				to: 'typography',
			},
			{
				label: 'Writing Style',
				to: 'writing',
			},
		],
		parent: 'foundations',
	},
	{
		child: [
			{
				label: 'Introduction to tokens',
				to: 'introduction',
			},
			{
				label: 'Colors',
				to: 'colors',
			},
			{
				label: 'Figma',
				to: 'figma',
			},
		],
		parent: 'tokens',
	},
	{
		child: [
			{
				label: 'Accordion',
				to: 'accordion',
			},
			{
				label: 'Avatars',
				to: 'avatars',
			},
			{
				label: 'Banners',
				to: 'banners',
			},
			{
				label: 'Buttons',
				to: 'buttons',
			},
			{
				label: 'Breadcrumbs',
				to: 'breadcrumbs',
			},
			{
				label: 'Cards',
				to: 'cards',
			},
			{
				label: 'Checkboxes',
				to: 'checkbox',
			},
			{
				label: 'DatePicker',
				to: 'datepicker',
			},
			{
				label: 'Drawers',
				to: 'drawer',
			},
			{
				label: 'Dropdowns',
				to: 'dropdowns',
			},
			{
				label: 'Headings',
				to: 'headings',
			},
			{
				label: 'Horizontal Lines',
				to: 'lines',
			},
			{
				label: 'Inputs',
				to: 'inputs',
			},
			{
				label: 'InputNumber',
				to: 'inputnumber',
			},
			{
				isCSS: true,
				label: 'Loadings',
				to: 'loadings',
			},
			{
				label: 'Modal',
				to: 'modal',
			},
			{
				label: 'Paginations',
				to: 'paginations',
			},
			{
				label: 'Popovers',
				to: 'popovers',
			},
			{
				label: 'Radios',
				to: 'radios',
			},
			{
				label: 'Tables',
				to: 'tables',
			},
			{
				label: 'Toaster',
				to: 'toaster',
			},
			{
				label: 'Selects',
				to: 'selects',
			},
			{
				label: 'Steps',
				to: 'steps',
			},
			{
				label: 'Switches',
				to: 'switches',
			},
			{
				isCSS: true,
				label: 'Utilities',
				to: 'utilities',
			},
		],
		parent: 'components',
	},
	{
		child: [
			{
				label: 'ActionBar',
				to: 'actionbar',
			},
			{
				label: 'Comments',
				to: 'comments',
			},
			{
				label: 'Container',
				to: 'container',
			},

			{
				label: 'NavBar',
				to: 'navbar',
			},
			{
				label: 'Inline Edit',
				to: 'inline-edit',
			},
			{
				label: 'User Menu',
				to: 'user-menu',
			},
		],
		parent: 'patterns',
	},
]

export default submenu
