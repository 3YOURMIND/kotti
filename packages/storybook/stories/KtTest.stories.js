import { Test } from '@3yourmind/kotti-ui'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

export default {
	title: 'Test',
	component: Test,
}

export const Example = () => ({
	components: { Test },
	render(h) {
		return <Test onClick={this.action}>With JSX</Test>
	},
	methods: { action: linkTo('clicked') },
})
