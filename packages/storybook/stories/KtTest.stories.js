import { Test } from '@3yourmind/kotti-ui'
import { linkTo } from '@storybook/addon-links'

export default {
	title: 'Test',
	component: Test,
}

export const Example = () => ({
	components: { Test },
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render(h) {
		return <Test onClick={this.action}>With JSX</Test>
	},
	methods: { action: linkTo('clicked') },
})
