import kebabCase from 'lodash/kebabCase.js'
import startCase from 'lodash/startCase.js'

import type { Kotti } from '@3yourmind/kotti-ui'
import {
	KtAccordion,
	KtActionbar,
	KtAvatar,
	KtBanner,
	KtBreadcrumb,
	KtButton,
	KtCard,
	KtComment,
	KtDrawer,
	KtFieldInlineEdit,
	KtFileUpload,
	KtFilters,
	KtForm,
	KtHeading,
	KtLine,
	KtModal,
	KtNavbar,
	KtPagination,
	KtPopover,
	KtTable,
	KtTableLegacy,
	KtTag,
	KtToaster,
	KtUserMenu,
	KtValueLabel,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

export enum Tag {
	CSS = 'css',
	DEPRECATED = 'deprecated',
	GUIDE = 'guide',
	OUTDATED = 'outdated',
	TS = 'ts',
	ZOD = 'zod',
}

type SubsectionPage = {
	label: string
	path: string
	tags: Array<Tag>
}

export type Subsection = {
	icon: Yoco.Icon
	pages: Array<SubsectionPage>
	path: string
	title: string
}

export type Section = {
	subsections: Array<Subsection>
	title: string | null
}

const makeComponentMenuItem = (component: {
	meta: Kotti.Meta
	name: string
}): SubsectionPage => ({
	label: startCase(component.name.replace(/^Kt/, '')),
	path: kebabCase(component.name.replace(/^Kt/, '')),
	tags: [
		component.meta.deprecated === null ? null : Tag.DEPRECATED,
		component.meta.typeScript === null ? null : Tag.TS,
		component.meta.typeScript?.schema ? Tag.ZOD : null,
	].filter((x) => x !== null) as Tag[],
})

export const menu: Array<Section> = [
	{
		subsections: [
			{ icon: Yoco.Icon.FILE, pages: [], path: '', title: 'Overview' },
			{
				icon: Yoco.Icon.VERSION,
				pages: [],
				path: 'changelog',
				title: 'Changelog',
			},
		],
		title: null,
	},
	{
		subsections: [
			{
				icon: Yoco.Icon.EDIT,
				pages: [
					{ label: 'Typography', path: 'typography', tags: [Tag.CSS] },
					{ label: 'Writing Style ', path: 'writing-style', tags: [Tag.GUIDE] },
				],
				path: 'foundations/text',
				title: 'Text',
			},
			{
				icon: Yoco.Icon.DIMENSION,
				pages: [],
				path: 'foundations/units',
				title: 'Units',
			},
			{
				icon: Yoco.Icon.MARKUP,
				pages: [
					{ label: 'List', path: 'list', tags: [Tag.CSS, Tag.TS] },
					{
						label: 'TypeScript Usage',
						path: 'typescript',
						tags: [Tag.GUIDE],
					},
					{
						label: 'Design Guidelines',
						path: 'design-guidelines',
						tags: [Tag.GUIDE],
					},
				],
				path: 'foundations/icons',
				title: 'Icons',
			},
			{
				icon: Yoco.Icon.MATERIAL,
				pages: [
					{
						label: 'Introduction to Design Tokens',
						path: 'introduction',
						tags: [Tag.GUIDE],
					},
					{ label: 'List of Tokens', path: 'list-of-tokens', tags: [Tag.CSS] },
					{
						label: 'List of Colors',
						path: 'list-of-colors',
						tags: [Tag.CSS, Tag.OUTDATED],
					},
					{ label: 'Figma', path: 'figma', tags: [Tag.GUIDE, Tag.OUTDATED] },
					{
						label: 'Theming',
						path: 'theming',
						tags: [Tag.GUIDE, Tag.OUTDATED],
					},
				],
				path: 'foundations/colors',
				title: 'Colors & Tokens',
			},
		],
		title: 'Foundations',
	},
	{
		subsections: [
			{
				icon: Yoco.Icon.DASHBOARD,
				pages: [
					makeComponentMenuItem(KtAccordion),
					makeComponentMenuItem(KtAvatar),
					makeComponentMenuItem(KtBanner),
					makeComponentMenuItem(KtButton),
					makeComponentMenuItem(KtBreadcrumb),
					makeComponentMenuItem(KtCard),
					makeComponentMenuItem(KtComment),
					makeComponentMenuItem(KtDrawer),
					makeComponentMenuItem(KtFileUpload),
					makeComponentMenuItem(KtFilters),
					makeComponentMenuItem(KtForm),
					{
						label: 'Form Fields',
						path: 'form-fields',
						tags: [Tag.TS, Tag.ZOD],
					},
					makeComponentMenuItem(KtFieldInlineEdit),
					makeComponentMenuItem(KtHeading),
					makeComponentMenuItem(KtLine),
					{ label: 'Loadings', path: 'loadings', tags: [Tag.CSS] },
					makeComponentMenuItem(KtModal),
					makeComponentMenuItem(KtPagination),
					makeComponentMenuItem(KtPopover),
					makeComponentMenuItem(KtTable),
					makeComponentMenuItem(KtTableLegacy),
					makeComponentMenuItem(KtTag),
					makeComponentMenuItem(KtToaster),
					makeComponentMenuItem(KtValueLabel),
				],
				path: 'usage/components',
				title: 'Components',
			},
			{
				icon: Yoco.Icon.LAYER,
				pages: [
					{ label: 'Introduction', path: 'introduction', tags: [Tag.GUIDE] },
					{ label: 'Grid System', path: 'grid-system', tags: [Tag.TS] },
					makeComponentMenuItem(KtNavbar),
					makeComponentMenuItem(KtActionbar),
					makeComponentMenuItem(KtUserMenu),
				],
				path: 'usage/layouts',
				title: 'Layouts',
			},
			{
				icon: Yoco.Icon.SCALE,
				pages: [],
				path: 'usage/utilities',
				title: 'Utilities',
			},
		],
		title: 'Usage',
	},
]
