# `@3yourmind/vue-props-validators`

> Generate Properly Validated Vue Props

## Usage

```typescript
import { vuePropsValidators } from '@3yourmind/vue-props-validators'

export default defineComponent {
	props: vuePropsValidators.create({
		example: {
			default: () => 'world',
			nullable: false,
			type: vuePropsValidators.Type.ENUM,
			options: ['hello', 'world']
		}
	}
}
```
