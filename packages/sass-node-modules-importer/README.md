# `@3yourmind/sass-node-modules-importer`

> `node_modules` importer for `sass`

## Usage

**`rollup.config.js**:

```typescript
import sassNodeModulesImporter from '@3yourmind/sass-node-modules-importer'
import scss from 'rollup-plugin-scss'

export default [
	scss({
		// passed directly to sass
		importer: sassNodeModulesImporter(),
		importer: sassNodeModulesImporter({ debug: true }),
		importer: sassNodeModulesImporter({ start: '~' }),
	}),
]
```

```scss
@import '~normalize.css/'; // Trailing slash is important if module ends with .css as sass will not call the importer otherwise
```

## Supported Source

- (recursive) parent `node_modules`
- `package.json` `style` property
- files ending with `importExtensions`
- `index.css`

## Options

|              name | default                      |    type    |                                           description |
| ----------------: | :--------------------------- | :--------: | ----------------------------------------------------: |
|           `debug` | `false`                      | `boolean`  |                                      activates logger |
| `indexExtensions` | `['.css', '.sass', '.scss']` | `string[]` |       extensions to resolve when extension is omitted |
|           `start` | `~`                          |  `string`  | prefix string/char to refer to `node_modules` folders |
