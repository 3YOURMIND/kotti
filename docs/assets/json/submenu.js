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
			{
				label: 'Theming',
				to: 'theming',
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
				isDeprecated: true,
				label: 'Checkboxes',
				to: 'checkbox',
			},
			{
				isDeprecated: true,
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
				label: 'Form',
				to: 'form',
			},
			{
				label: 'Form Fields',
				to: 'form-fields',
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
				isDeprecated: true,
				label: 'Inputs',
				to: 'inputs',
			},
			{
				isDeprecated: true,
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
				isDeprecated: true,
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
				isDeprecated: true,
				label: 'Selects',
				to: 'selects',
			},
			{
				label: 'Steps',
				to: 'steps',
			},
			{
				isDeprecated: true,
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
