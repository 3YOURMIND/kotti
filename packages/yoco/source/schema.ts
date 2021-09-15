import { z } from 'zod'

import { Icon } from './types'

export const yocoIconSchema = z.nativeEnum(Icon)
