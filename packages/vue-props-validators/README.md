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
		},
		icon: {
			default: () => null,
			nullable: true,
			type: vuePropsValidators.Type.ENUM,
			options: Object.values(Yoco.Icon)
		}
	}
}
```

## Supported Prop Types

|                                                                 Type | Description  |                      Custom Props                       |
| -------------------------------------------------------------------: | :----------- | :-----------------------------------------------------: |
|                                                              `array` |              |        [minimum*, maximum*, validator*(args..)]         |
|                                                            `boolean` |              |                                                         |
|                                                      `enum` (string) |              |                        [options]                        |
|                                                   `enum` (integer)\* | ktcol        |                        [options]                        |
|                                                              `float` |              |                   [minimum, maximum]                    |
|                                                            `integer` |              |                   [minimum, maximum]                    |
|                                                             `object` |              |                                                         |
|                                                             `string` |              |              [regex*, minimum*, maximum*]               |
|                                                              `set`\* |              |                  [minimum*, maximum*]                   |
|                                                             `date`\* | ISO8601      |                  [minimum*, maximum*]                   |
|                                                         `dateTime`\* | ISO8601      |                  [minimum*, maximum*]                   |
|                                                         `function`\* | pass-through |                                                         |
|                                            `id: [Number, String],`\* |              |                                                         |
| `tdClasses: { default: () => [], type: [Array, String, Object] },`\* |              |                                                         |
|                                            `options`\* array of objs |              | [unique, labelKey:'label/name', valueKey: 'value/id', ] |

\* Planned
