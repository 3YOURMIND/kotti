import pick from 'lodash/pick'
import { KT_TABLE_STATE_PROVIDER } from './constants'
import Table, { INITIAL_TABLE_STORE_PROPS } from './Table'
import TableStore from './logic/store'

let tableProviderIdSeed = 1

export default {
	components: {},
	name: 'KtTableProvider',
	props: { ...Table.props, rows: Array },
	render() {
		return <div>{this.$slots.default}</div>
	},
	beforeCreate() {
		this.tableId = `kt-table-provider_${tableProviderIdSeed}`
		tableProviderIdSeed += 1
	},
	data() {
		return {
			store: new TableStore(this, pick(this, INITIAL_TABLE_STORE_PROPS)),
		}
	},
	methods: {},
	provide() {
		return {
			[KT_TABLE_STATE_PROVIDER]: this,
		}
	},
}
