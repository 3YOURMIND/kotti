import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';

import KtNavbar from '../packages/kotti-navbar';
import NavLog from '../www/assets/img/nav_logo.svg';
import KtAvatar from '../packages/kotti-avatar';

storiesOf('Navbar', module)
	.add('Default', () => ({
		components: { KtNavbar, KtAvatar },
		template: `<div class="d-flex responsive">
    <KtNavbar :src="imgSrc" :menu="menu">
      <div slot="navbar-footer">
        <KtAvatar :small="true"/>
      </div>
      <div slot="navbar-menu">
        <li><i class="yoco">dashboard</i>Dashboard</li>
        <li><i class="yoco">charts</i>Status</li>
      </div>
    </KtNavbar>
    </div>`,
		data() {
			return {
				comment: {
					name: 'Margaret Atwood',
					message:
						'Marine Le Pen, a Fierce Campaigner, Heads to Finale in French Election',
				},
				imgSrc: NavLog,
				menu: [
					{
						icon: 'dashboard',
						label: 'Dashboard',
						to: 'dashboard',
					},
					{
						icon: 'cloud',
						label: 'Cloud',
						to: 'cloud',
					},
				],
			};
		},
	}))
	.add('Narrow Navbar', () => ({
		components: { KtNavbar, KtAvatar },
		template: `<div class="d-flex responsive">
    <KtNavbar :src="imgSrc" :menu="menu" :narrow="true">
      <div slot="navbar-footer">
        <KtAvatar :small="true"/>
      </div>
      <div slot="navbar-menu">
        <li><i class="yoco">dashboard</i>Dashboard</li>
        <li><i class="yoco">charts</i>Status</li>
      </div>
    </KtNavbar>
    </div>`,
		data() {
			return {
				comment: {
					name: 'Margaret Atwood',
					message:
						'Marine Le Pen, a Fierce Campaigner, Heads to Finale in French Election',
				},
				imgSrc: NavLog,
				menu: [
					{
						icon: 'dashboard',
						label: 'Dashboard',
						to: 'dashboard',
					},
					{
						icon: 'cloud',
						label: 'Cloud',
						to: 'cloud',
					},
				],
			};
		},
	}));
