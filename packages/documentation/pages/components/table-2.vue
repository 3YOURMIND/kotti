<template>
	<div>
		<ComponentInfo :meta="meta" title="Table 2" />
		<KtTable2 :columns="columns" :rows="rows" />
	</div>
</template>

<script lang="tsx">
import { Kotti, KtTable2 } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'
import faker from 'faker'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'KtTable2Documentation',
	components: {
		ComponentInfo,
	},
	setup() {
		faker.name.findName()

		let id = 1

		const makeRow = () => ({
			id: id++,
			avatarUrl: faker.image.avatar(),
			address: {
				city: faker.address.city(),
				houseNumber: faker.address.streetSuffix(),
				streetName: faker.address.streetName(),
			},
			gender: faker.name.gender(),
			name: faker.name.findName(),
			motto: faker.hacker.phrase(),
		})

		type Row = ReturnType<typeof makeRow>

		const columns: Array<Kotti.Table2.Column<Row>> = [
			{
				align: Kotti.Table2.Align.RIGHT,
				icon: Yoco.Icon.PICTURE,
				isSortable: true,
				key: 'avatarUrl',
				label: 'Avatar',
				renderCell: (url) => <img src={url} />,
			},
			// {
			// 	align: Kotti.Table2.Align.CENTER,
			// 	icon: Yoco.Icon.ADDRESS_BOOK,
			// 	isSortable: true,
			// 	key: 'address.city',
			// 	label: 'City',
			// },
			{
				align: Kotti.Table2.Align.LEFT,
				icon: Yoco.Icon.ANNOUNCE,
				isSortable: true,
				key: 'motto',
				label: 'Motto',
			},
		]

		return {
			columns,
			meta: KtTable2.meta,
			rows: [makeRow(), makeRow(), makeRow()],
		}
	},
})
</script>
