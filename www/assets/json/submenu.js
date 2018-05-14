// Todo: auto generate submenu from './pages/' dir
const submenu = [
	{
		parent: 'foundations',
		child: [
			{
				label: 'Layout',
				to: 'layout',
			},
			{
				label: 'Grid',
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
	},
	{
		parent: 'components',
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
				label: 'Comments',
				to: 'comments',
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
				label: 'Loadings',
				to: 'loadings',
				isCSS: true,
			},
			{
				label: 'Modal',
				to: 'modal',
			},
			{
				label: 'Popovers',
				to: 'popovers',
				isCSS: true,
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
				label: 'Switchs',
				to: 'switchs',
			},
			{
				label: 'Utilities',
				to: 'utilities',
				isCSS: true,
			},
		],
	},
	{
		parent: 'patterns',
		child: [
			{
				label: 'Forms',
				to: 'forms',
			},
			{
				label: 'Comments',
				to: 'comments',
			},
			{
				label: 'Inline Edit',
				to: 'inline-edit',
			},
		],
	},
	{
		parent: 'resources',
		child: [
			{
				label: 'Kotti Style',
				to: 'kotti-style',
			},
			{
				label: 'Design Kit',
				to: 'designkit',
			},
		],
	},
];

export default submenu;
