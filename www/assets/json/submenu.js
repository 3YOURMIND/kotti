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
				label: 'Color',
				to: 'color',
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
				label: 'Cards',
				to: 'cards',
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
				label: 'Headings',
				to: 'headings',
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
				isCSS: true,
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
				label: 'Comments',
				to: 'comments',
			},
			{
				label: 'Forms',
				to: 'forms',
			},
			{
				label: 'Navbar',
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
