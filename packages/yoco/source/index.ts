import { z } from 'zod'

export module Yoco {
	export enum Icon {
		ADDRESS_BOOK = 'address_book',
		ANNOUNCE = 'announce',
		ARROW_DOWN = 'arrow_down',
		ARROW_LINE = 'arrow_line',
		ARROW_UP = 'arrow_up',
		ARROW_UP_DOWN = 'arrow_up_down',
		ATTACHMENT = 'attachment',
		ATTENTION = 'attention',
		BASKET = 'basket',
		BELL = 'bell',
		BOOKMARK = 'bookmark',
		BOOKMARK_SOLID = 'bookmark_solid',
		BOX_3D = 'box_3d',
		BURGER = 'burger',
		CAD = 'cad',
		CALENDAR = 'calendar',
		CALENDAR_CLOCK = 'calendar_clock',
		CAMERA = 'camera',
		CAMERA_SWITCH = 'camera_switch',
		CARD = 'card',
		CATALOG = 'catalog',
		CHARTS = 'charts',
		CHECK = 'check',
		CHEVRON_DOWN = 'chevron_down',
		CHEVRON_DOWN_DOUBLE = 'chevron_down_double',
		CHEVRON_LEFT = 'chevron_left',
		CHEVRON_LEFT_DOUBLE = 'chevron_left_double',
		CHEVRON_RIGHT = 'chevron_right',
		CHEVRON_RIGHT_DOUBLE = 'chevron_right_double',
		CHEVRON_UP = 'chevron_up',
		CHEVRON_UP_DOUBLE = 'chevron_up_double',
		CIRCLE_ATTENTION = 'circle_attention',
		CIRCLE_CHECK = 'circle_check',
		CIRCLE_CROSS = 'circle_cross',
		CIRCLE_I = 'circle_i',
		CIRCLE_LOAD = 'circle_load',
		CIRCLE_MINUS = 'circle_minus',
		CIRCLE_QUESTION = 'circle_question',
		CIRCLE_SEARCH = 'circle_search',
		CLOCK = 'clock',
		CLOSE = 'close',
		CLOUD = 'cloud',
		CLOUD_DOWNLOAD = 'cloud_download',
		CLOUD_UPLOAD = 'cloud_upload',
		COLUMN_FIXLEFT = 'column_fixleft',
		COLUMN_FIXRIGHT = 'column_fixright',
		COLUMN_HIDE = 'column_hide',
		COMMENT = 'comment',
		COPY = 'copy',
		CSV = 'csv',
		DASHBOARD = 'dashboard',
		DIMENSION = 'dimension',
		DOC = 'doc',
		DOTS = 'dots',
		DOTS_VERTICAL = 'dots_vertical',
		DOWNLOAD = 'download',
		EDIT = 'edit',
		EMAIL = 'email',
		EXIT_FULLSCREEN = 'exit_fullscreen',
		EYE = 'eye',
		EYE_SLASHED = 'eye_slashed',
		FILE = 'file',
		FILTER = 'filter',
		FIX_RIGHT = 'fix_right',
		FLAG = 'flag',
		FOLDER = 'folder',
		FULLSCREEN = 'fullscreen',
		GANT_CHART = 'gant_chart',
		GLOBAL = 'global',
		HEART = 'heart',
		HEART_SOLID = 'heart_solid',
		HIDE_MENU = 'hide_menu',
		HOME = 'home',
		IDEA = 'idea',
		INVOICE = 'invoice',
		JSON = 'json',
		KANBAN = 'kanban',
		LANDLINE = 'landline',
		LAYER = 'layer',
		LINK = 'link',
		LIST = 'list',
		LOCATION = 'location',
		LOGOUT = 'logout',
		MARKUP = 'markup',
		MATERIAL = 'material',
		MINUS = 'minus',
		MOBILE = 'mobile',
		NOT_ALLOW = 'not_allow',
		NOTES = 'notes',
		OFFICE = 'office',
		ORDER = 'order',
		OUTLINK = 'outlink',
		PDF = 'pdf',
		PERMISSION_LOCKED = 'permission_locked',
		PERMISSION_UNLOCKED = 'permission_unlocked',
		PICTURE = 'picture',
		PLUS = 'plus',
		PRINT = 'print',
		PRINTER = 'printer',
		QR_CODE = 'qr_code',
		QUOTE = 'quote',
		RELOAD = 'reload',
		REQUEST = 'request',
		SAVE = 'save',
		SCALE = 'scale',
		SEARCH = 'search',
		SEND = 'send',
		SETTING = 'setting',
		SHARE = 'share',
		SHIPPING = 'shipping',
		SHOP = 'shop',
		SIDEBAR = 'sidebar',
		SORT_ASCEND = 'sort_ascend',
		SORT_DESCEND = 'sort_descend',
		STAR = 'star',
		STAR_SOLID = 'star_solid',
		STRUCTURE = 'structure',
		SUPPORT = 'support',
		TAG = 'tag',
		TECH = 'tech',
		THUMB_DOWN = 'thumb_down',
		THUMB_UP = 'thumb_up',
		TILE_LAYOUT = 'tile_layout',
		TRASH = 'trash',
		TRIANGLE_DOWN = 'triangle_down',
		TRIANGLE_LEFT = 'triangle_left',
		TRIANGLE_RIGHT = 'triangle_right',
		TRIANGLE_SWITCH = 'triangle_switch',
		TRIANGLE_UP = 'triangle_up',
		UPLOAD = 'upload',
		USER = 'user',
		USER_SOLID = 'user_solid',
		USERGROUP = 'usergroup',
		VERSION = 'version',
		VIEW = 'view',
		VIEW_SIDEBAR = 'view_sidebar',
		ZIP = 'zip',
	}
}

/**
 * returns enum and the union of enum members
 * https://stackoverflow.com/a/77528920
 */
type EnumToPrimitiveUnion<
	T extends {
		[k: string]: string
	},
> = T extends Record<string, infer V extends string> ? `${V}` : never

type OneOrMore<T> = [T, ...T[]]

const iconEnumMembers = Object.values(Yoco.Icon) as OneOrMore<
	EnumToPrimitiveUnion<typeof Yoco.Icon>
>

/**
 * `yocoIconSchema` supports both the members of the Yoco.Icon and the equivalent string union
 */
export const yocoIconSchema = z.union([
	z.enum(iconEnumMembers),
	z.nativeEnum(Yoco.Icon),
])

export const isYocoIcon = (value: unknown): value is Yoco.Icon => {
	return yocoIconSchema.safeParse(value).success
}
