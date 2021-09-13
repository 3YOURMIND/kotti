import { Yoco } from '@3yourmind/yoco'
import { z } from 'zod'

export const yocoIconSchema = z.nativeEnum(Yoco.Icon)

export const isYocoIcon = (value: unknown): value is Yoco.Icon =>
	yocoIconSchema.safeParse(value).success
