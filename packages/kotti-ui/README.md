# `@3yourmind/kotti`

> TODO: description

## Usage

```typescript
import { KtFieldText } from '@3yourmind/kotti'

// TODO: Improve Usage Documentation
```

## Types

Kotti components are internally annotated like this:

```typescript
export module KottiComponent {
	export type Events = {}

	export type Props = {}

	export type Translations = {}
}
```

externally, they can be used via `Kotti.Component.Props`:

```typescript
import { Kotti } from '@3yourmind/kotti-ui'

const options: Kotti.FieldSingleSelect.Props['options'] = []
```
