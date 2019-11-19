// Base colors are not meant to change
// They CAN but should not be used directly
// Instead, we are using tokens that are role based colors
// The tokens are defined with these base colors

export const baseColors = {
	white: '#FFFFFF',
	black: '#000000',
	'gray-10': '#F8F8F8',
	'gray-20': '#E0E0E0',
	'gray-30': '#C6C6C6',
	'gray-40': '#A8A8A8',
	'gray-50': '#8D8D8D',
	'gray-60': '#6F6F6F',
	'gray-70': '#525252',
	'gray-80': '#393939',
	'gray-90': '#262626',
	'gray-100': '#3D3D3D',
	'primary-10': '#EAF0FA',
	'primary-20': '#C1D7FB',
	'primary-30': '#AFC5E8',
	'primary-40': '#6795E0',
	'primary-50': '#3173DE',
	'primary-60': '#2C66C4',
	'primary-70': '#2659AB',
	'primary-80': '#1F55AD',
	'primary-90': '#153C7A',
	'primary-100': '#0D244A',
	'green-20': '#C4E0A5',
	'green-50': '#71C716',
	'green-60': '#64AD13',
	'green-70': '#549410',
	'red-20': '#F0A8A8',
	'red-50': '#F21D1D',
	'red-60': '#D91919',
	'red-70': '#BF1717',
	'purple-20': '#B995CA',
	'purple-50': '#932DC2',
	'purple-60': '#6C218F',
	'purple-70': '#591B75',
	'yellow-20': '#FFF9C0',
	'yellow-50': '#FFF490',
	'yellow-60': '#FFE60D',
	'yellow-70': '#DFC903',
	'orange-20': '#FFAE66',
	'orange-50': '#FF9333',
	'orange-60': '#FF7800',
	'orange-70': '#BA6820',
}

// Tokens are calling base colors

export const tokens = [
	{
		name: 'ui-background',
		description: 'Page background',
		reference: 'white',
	},
	{
		name: 'ui-01',
		description: 'Secondary page background',
		reference: 'gray-10',
	},
	{
		name: 'ui-02',
		description: 'Subtle border',
		reference: 'gray-20',
	},
	{
		name: 'ui-03',
		description: 'Medium contrast border',
		reference: 'gray-50',
	},
	{
		name: 'text-01',
		description: 'Primary text\nHeaders',
		reference: 'gray-100',
	},
	{
		name: 'text-02',
		description: 'Secondary text\nForm labels',
		reference: 'gray-50',
	},
	{
		name: 'text-03',
		description: 'Tertiary text\nHelp text\nPlaceholder text',
		reference: 'gray-40',
	},
	{
		name: 'text-04',
		description: 'Text on interactive colors',
		reference: 'white',
	},
	{
		name: 'interactive-01',
		description: 'Primary interactive color\nPrimary buttons',
		reference: 'primary-60',
	},
	{
		name: 'interactive-01-hover',
		description: 'Hover for Interactive-01',
		reference: 'primary-70',
	},
	{
		name: 'interactive-02',
		description: 'Secondary interactive color\nSecondary button',
		reference: 'gray-10',
	},
	{
		name: 'interactive-02-hover',
		description: 'Hover for Interactive-02',
		reference: 'primary-10',
	},
	{
		name: 'interactive-03',
		description: 'Selected elements\nActive elements\nAccent icons',
		reference: 'primary-50',
	},
	{
		name: 'danger',
		description: 'Danger button background',
		reference: 'red-50',
	},
	{
		name: 'hover-danger',
		description: 'Danger hover',
		reference: 'red-70',
	},
	{
		name: 'link-01',
		description: 'Primary links\nText buttons',
		reference: 'primary-60',
	},
	{
		name: 'link-02',
		description: 'Secondary links',
		reference: 'gray-50',
	},
	{
		name: 'icon-01',
		description: 'Primary icon',
		reference: 'gray-100',
	},
	{
		name: 'icon-02',
		description: 'Secondary icon',
		reference: 'gray-50',
	},
	{
		name: 'icon-03',
		description: 'Icons on interactive colors',
		reference: 'white',
	},
	{
		name: 'support-error',
		description: 'Error',
		reference: 'red-50',
	},
	{
		name: 'support-warning',
		description: 'Warning',
		reference: 'orange-50',
	},
	{
		name: 'support-success',
		description: 'Success',
		reference: 'green-50',
	},
	{
		name: 'support-info',
		description: 'Information',
		reference: 'primary-50',
	},
]
