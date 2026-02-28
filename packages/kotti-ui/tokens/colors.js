// Base colors are not meant to change
// They CAN but should not be used directly
// Instead, we are using tokens that are role based colors
// The tokens are defined with these base colors

export const baseColors = {
	black: '#000',
	white: '#FFF',

	// Blue
	'blue-05': '#F3F8FF',
	'blue-10': '#E7F0FF',
	'blue-20': '#C7DAF9',
	'blue-30': '#99BDF7',
	'blue-40': '#689CF1',
	'blue-50': '#3173DE',
	'blue-60': '#2E65BF',
	'blue-70': '#2757A6',
	'blue-80': '#1A4488',
	'blue-90': '#0F2F62',
	'blue-100': '#071A38',

	// Gray
	'gray-05': '#F8F8F8',
	'gray-10': '#F3F3F3',
	'gray-20': '#E3E3E3',
	'gray-25': '#D2D2D2',
	'gray-30': '#BABABA',
	'gray-40': '#9D9D9D',
	'gray-50': '#848484',
	'gray-60': '#696969',
	'gray-70': '#4F4F4F',
	'gray-80': '#3A3A3A',
	'gray-90': '#222',
	'gray-100': '#141414',

	// Green
	'green-05': '#E5FFE1',
	'green-10': '#CBFCC5',
	'green-20': '#A2F298',
	'green-30': '#7BE46E',
	'green-40': '#58C74A',
	'green-50': '#40B032',
	'green-60': '#359928',
	'green-70': '#237618',
	'green-80': '#13510C',
	'green-90': '#0C3507',
	'green-100': '#0A3505',

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
	'mint-100': '#0B3B37',

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
	'orange-100': '#5B2612',

	// Primary
	'primary-05': '#F3F8FF',
	'primary-10': '#E7F0FF',
	'primary-20': '#C7DAF9',
	'primary-30': '#99BDF7',
	'primary-40': '#689CF1',
	'primary-50': '#3173DE',
	'primary-60': '#2E65BF',
	'primary-70': '#2757A6',
	'primary-80': '#1A4488',
	'primary-90': '#0F2F62',
	'primary-100': '#071A38',

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
	'purple-100': '#32183D',

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
	'red-100': '#5B1A1A',

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
	'slate-90': '#2B2B36',
	'slate-100': '#212129',

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
	'violet-90': '#672143',
	'violet-100': '#49172F',

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
	'yellow-100': '#4F3310',
}

// Tokens are calling base colors

export const tokens = [
	{
		name: 'ui-black',
		description: 'Black',
		reference: 'black',
	},
	{
		name: 'ui-white',
		description: 'White',
		reference: 'white',
	},
	{
		name: 'ui-background',
		description: 'Page background',
		reference: 'white',
	},
	{
		name: 'ui-background-shade',
		description: 'Shaded Page background',
		reference: 'gray-05',
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
		reference: 'gray-10',
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

export const darkModeTokens = [
	{
		name: 'ui-black',
		description: 'Black',
		reference: 'white',
	},
	{
		name: 'ui-white',
		description: 'White',
		reference: 'black',
	},
	{
		name: 'ui-background',
		description: 'Page background',
		reference: 'gray-100',
	},
	{
		name: 'ui-background-shade',
		description: 'Shaded Page background',
		reference: 'gray-90',
	},
	{
		name: 'ui-01',
		description: 'Secondary page\nBackground 2',
		reference: 'gray-90',
	},
	{
		name: 'ui-02',
		description: 'Subtle border\nBackground 3',
		reference: 'gray-80',
	},
	{
		name: 'ui-03',
		description: 'Medium contrast border',
		reference: 'gray-50',
	},
	{
		name: 'ui-04',
		description: 'High contrast border',
		reference: 'gray-40',
	},
	{
		name: 'ui-05',
		description: 'Lightly colored background',
		reference: 'primary-90',
	},
	{
		name: 'text-01',
		description: 'Primary text\nHeaders',
		reference: 'gray-25',
	},
	{
		name: 'text-02',
		description: 'Secondary text\nForm labels',
		reference: 'gray-40',
	},
	{
		name: 'text-03',
		description: 'Tertiary text\nHelp text\nPlaceholder text',
		reference: 'gray-60',
	},
	{
		name: 'text-04',
		description: 'Text on interactive colors',
		reference: 'primary-05',
	},
	{
		name: 'text-05',
		description: 'Disabled text',
		reference: 'gray-70',
	},
	{
		name: 'interactive-01',
		description: 'Primary interactive color\nPrimary buttons\nChecked color',
		reference: 'primary-50',
	},
	{
		name: 'interactive-01-hover',
		description: 'Hover for Interactive-01',
		reference: 'primary-60',
	},
	{
		name: 'interactive-01-active',
		description: 'Active for Interactive-01',
		reference: 'primary-10',
	},
	{
		name: 'interactive-02',
		description: 'Secondary interactive color\nSecondary button',
		reference: 'gray-90',
	},
	{
		name: 'interactive-02-hover',
		description: 'Hover for Interactive-02',
		reference: 'primary-90',
	},
	{
		name: 'interactive-03',
		description: 'Selected elements\nActive elements\nAccent icons',
		reference: 'primary-50',
	},
	{
		name: 'interactive-04',
		description: 'Selected elements light\n Alternative border',
		reference: 'primary-80',
	},
	{
		name: 'interactive-05',
		description: 'Active element border',
		reference: 'primary-60',
	},
	{
		name: 'danger',
		description: 'Danger button background',
		reference: 'red-50',
	},
	{
		name: 'hover-danger',
		description: 'Danger hover',
		reference: 'red-30',
	},
	{
		name: 'link-01',
		description: 'Primary links\nText buttons',
		reference: 'primary-40',
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
		reference: 'primary-60',
	},
	{
		name: 'link-05',
		description: 'Dark background active link',
		reference: 'primary-70',
	},
	{
		name: 'icon-01',
		description: 'Primary icon',
		reference: 'gray-25',
	},
	{
		name: 'icon-02',
		description: 'Secondary icon',
		reference: 'gray-50',
	},
	{
		name: 'icon-03',
		description: 'Icons on interactive colors',
		reference: 'black',
	},
	{
		name: 'support-error',
		description: 'Error',
		reference: 'red-50',
	},
	{
		name: 'support-error-bg',
		description: 'Error Background',
		reference: 'red-90',
	},
	{
		name: 'support-error-dark',
		description: 'Error dark',
		reference: 'red-30',
	},
	{
		name: 'support-error-light',
		description: 'Error light',
		reference: 'red-80',
	},
	{
		name: 'support-warning',
		description: 'Warning',
		reference: 'orange-50',
	},
	{
		name: 'support-warning-bg',
		description: 'Warning Background',
		reference: 'orange-90',
	},
	{
		name: 'support-warning-dark',
		description: 'Warning dark',
		reference: 'orange-30',
	},
	{
		name: 'support-warning-light',
		description: 'Warning light',
		reference: 'orange-80',
	},
	{
		name: 'support-success',
		description: 'Success',
		reference: 'green-50',
	},
	{
		name: 'support-success-bg',
		description: 'Success Background',
		reference: 'green-90',
	},
	{
		name: 'support-success-dark',
		description: 'Success dark',
		reference: 'green-30',
	},
	{
		name: 'support-success-light',
		description: 'Success light',
		reference: 'green-80',
	},
	{
		name: 'support-info',
		description: 'Information',
		reference: 'blue-50',
	},
	{
		name: 'support-info-bg',
		description: 'Information Background',
		reference: 'blue-90',
	},
	{
		name: 'support-info-dark',
		description: 'Information dark',
		reference: 'blue-30',
	},
	{
		name: 'support-info-light',
		description: 'Information light',
		reference: 'blue-80',
	},
]
