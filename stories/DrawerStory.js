import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import KtDrawer from '../packages/kotti-drawer';

storiesOf('Drawer', module)
	.add('Default Size', () => {
		return {
			components: { KtDrawer },
			data() {
				return {
					showDrawer: false,
				};
			},
			template: `
      <div>
      <button @click="showDrawer=true">Open Drawer</button>
      <KtDrawer v-if="showDrawer" @close="showDrawer=false"> 
      <div slot="drawer-header">
        <h2>Default Size Drawer</h2>
      </div>
      </KtDrawer>
      </div>
      `,
		};
	})
	.add('Wide Size', () => {
		return {
			components: { KtDrawer },
			data() {
				return {
					showDrawer: false,
				};
			},
			template: `
      <div>
      <button @click="showDrawer=true">Open Wide Drawer</button>
      <KtDrawer v-if="showDrawer" @close="showDrawer=false" :wide="true"> 
      <div slot="drawer-header">
        <h2>Wide Size Drawer</h2>
      </div>
      <div slot="drawer-body">
        <img src="https://picsum.photos/200/800">
      </div>
      </KtDrawer>
      </div>
      `,
		};
	});
