// Base colors are not meant to change
// They CAN but should not be used directly
// Instead, we are using tokens that are role based colors
// The tokens are defined with these base colors

export const baseColors = {
	black: '#000',
	white: '#FFF',

	// Blue
	'blue-05': '#F0F8FE',
	'blue-10': '#E6F2FD',
	'blue-20': '#C6E1F5',
	'blue-30': '#A0CEED',
	'blue-40': '#77B7E8',
	'blue-50': '#5093D4',
	'blue-60': '#3E77C1',
	'blue-70': '#3361AA',
	'blue-80': '#2B4E8D',
	'blue-90': '#203E76',

	// Gray
	'gray-05': '#F8F8F8',
	'gray-10': '#F3F3F3',
	'gray-20': '#E3E3E3',
	'gray-30': '#BABABA',
	'gray-40': '#9D9D9D',
	'gray-50': '#848484',
	'gray-60': '#696969',
	'gray-70': '#4F4F4F',
	'gray-80': '#3A3A3A',
	'gray-90': '#282828',

	// Green
	'green-05': '#E5FFE1',
	'green-10': '#CBFCC5',
	'green-20': '#A2F298',
	'green-30': '#7BE46E',
	'green-40': '#58C74A',
	'green-50': '#40B032',
	'green-60': '#359928',
	'green-70': '#217B15',
	'green-80': '#19670F',
	'green-90': '#105008',

	// Mint
	'mint-05': '#E5FAF5',
	'mint-10': '#C7FDF1',
	'mint-20': '#83FAE2',
	'mint-30': '#40F5D4',
	'mint-40': '#25E9CC',
	'mint-50': '#01CBB1',
	'mint-60': '#00A491',
	'mint-70': '#038275',
	'mint-80': '#08675F',
	'mint-90': '#0C554E',

	// Orange
	'orange-05': '#FFF7ED',
	'orange-10': '#FFEED4',
	'orange-20': '#FFD9A8',
	'orange-30': '#FFBD71',
	'orange-40': '#FF9333',
	'orange-50': '#FE7711',
	'orange-60': '#EF5C07',
	'orange-70': '#C64308',
	'orange-80': '#9D360F',
	'orange-90': '#7E2E10',

	// Primary
	'primary-05': '#F0F8FE',
	'primary-10': '#E6F2FD',
	'primary-20': '#C6E1F5',
	'primary-30': '#A0CEED',
	'primary-40': '#77B7E8',
	'primary-50': '#5093D4',
	'primary-60': '#3E77C1',
	'primary-70': '#3361AA',
	'primary-80': '#2B4E8D',
	'primary-90': '#203E76',

	// Purple
	'purple-05': '#FAF6FD',
	'purple-10': '#F4ECFB',
	'purple-20': '#E9D9F5',
	'purple-30': '#D8BAED',
	'purple-40': '#C291E1',
	'purple-50': '#A766CF',
	'purple-60': '#8443A8',
	'purple-70': '#753893',
	'purple-80': '#613078',
	'purple-90': '#532B64',

	// Red
	'red-05': '#FEF2F2',
	'red-10': '#FFE1E1',
	'red-20': '#FFC8C8',
	'red-30': '#FFA2A2',
	'red-40': '#FC6D6D',
	'red-50': '#F53E3E',
	'red-60': '#E22020',
	'red-70': '#BF1717',
	'red-80': '#9D1717',
	'red-90': '#821A1A',

	// Slate
	'slate-05': '#F6F6F9',
	'slate-10': '#EDEDF1',
	'slate-20': '#D6D6E1',
	'slate-30': '#B2B3C7',
	'slate-40': '#898CA7',
	'slate-50': '#6A6D8D',
	'slate-60': '#555674',
	'slate-70': '#46485E',
	'slate-80': '#3C3D50',
	'slate-90': '#353545',

	// Violet
	'violet-05': '#FCF3F9',
	'violet-10': '#F9EAF4',
	'violet-20': '#F5D5E9',
	'violet-30': '#EEAFD6',
	'violet-40': '#E383BC',
	'violet-50': '#D75DA2',
	'violet-60': '#C43E84',
	'violet-70': '#A92D6A',
	'violet-80': '#8C2858',
	'violet-90': '#75264C',

	// Yellow
	'yellow-05': '#FEFEE8',
	'yellow-10': '#FFFEC2',
	'yellow-20': '#FFFA87',
	'yellow-30': '#FFF043',
	'yellow-40': '#FFDE03',
	'yellow-50': '#EFC703',
	'yellow-60': '#CE9A00',
	'yellow-70': '#A46E04',
	'yellow-80': '#88560B',
	'yellow-90': '#734610',
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
		description: 'Secondary page\nBackground 2',
		reference: 'gray-10',
	},
	{
		name: 'ui-02',
		description: 'Subtle border\nBackground 3',
		reference: 'gray-20',
	},
	{
		name: 'ui-03',
		description: 'Medium contrast border',
		reference: 'gray-50',
	},
	{
		name: 'ui-04',
		description: 'High contrast border',
		reference: 'gray-60',
	},
	{
		name: 'ui-05',
		description: 'Lightly colored background',
		reference: 'primary-10',
	},
	{
		name: 'text-01',
		description: 'Primary text\nHeaders',
		reference: 'gray-80',
	},
	{
		name: 'text-02',
		description: 'Secondary text\nForm labels',
		reference: 'gray-60',
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
		name: 'text-05',
		description: 'Disabled text',
		reference: 'gray-30',
	},
	{
		name: 'interactive-01',
		description: 'Primary interactive color\nPrimary buttons\nChecked color',
		reference: 'primary-60',
	},
	{
		name: 'interactive-01-hover',
		description: 'Hover for Interactive-01',
		reference: 'primary-70',
	},
	{
		name: 'interactive-01-active',
		description: 'Active for Interactive-01',
		reference: 'primary-90',
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
		name: 'interactive-04',
		description: 'Selected elements light\n Alternative border',
		reference: 'primary-20',
	},
	{
		name: 'interactive-05',
		description: 'Active element border',
		reference: 'primary-40',
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
		name: 'link-03',
		description: 'Active link',
		reference: 'primary-50',
	},
	{
		name: 'link-04',
		description: 'Dark background link',
		reference: 'primary-40',
	},
	{
		name: 'link-05',
		description: 'Dark background active link',
		reference: 'primary-30',
	},
	{
		name: 'icon-01',
		description: 'Primary icon',
		reference: 'gray-80',
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
		name: 'support-error-bg',
		description: 'Error Background',
		reference: 'red-10',
	},
	{
		name: 'support-error-dark',
		description: 'Error dark',
		reference: 'red-70',
	},
	{
		name: 'support-error-light',
		description: 'Error light',
		reference: 'red-20',
	},
	{
		name: 'support-warning',
		description: 'Warning',
		reference: 'orange-50',
	},
	{
		name: 'support-warning-bg',
		description: 'Warning Background',
		reference: 'orange-10',
	},
	{
		name: 'support-warning-dark',
		description: 'Warning dark',
		reference: 'orange-70',
	},
	{
		name: 'support-warning-light',
		description: 'Warning light',
		reference: 'orange-20',
	},
	{
		name: 'support-success',
		description: 'Success',
		reference: 'green-50',
	},
	{
		name: 'support-success-bg',
		description: 'Success Background',
		reference: 'green-10',
	},
	{
		name: 'support-success-dark',
		description: 'Success dark',
		reference: 'green-70',
	},
	{
		name: 'support-success-light',
		description: 'Success light',
		reference: 'green-20',
	},
	{
		name: 'support-info',
		description: 'Information',
		reference: 'blue-50',
	},
	{
		name: 'support-info-bg',
		description: 'Information Background',
		reference: 'blue-10',
	},
	{
		name: 'support-info-dark',
		description: 'Information dark',
		reference: 'blue-70',
	},
	{
		name: 'support-info-light',
		description: 'Information light',
		reference: 'blue-20',
	},
]
