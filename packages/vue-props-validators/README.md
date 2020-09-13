# `@3yourmind/vue-props-validators`

> Generate Properly Validated Vue Props

## Usage

```typescript
import { vuePropsValidators } from '@3yourmind/vue-props-validators'

export default defineComponent {
	props: vuePropsValidators({
		example: {
			nullable: true,
			required: true,
			type: 'enum',
		}
	}
}
```
