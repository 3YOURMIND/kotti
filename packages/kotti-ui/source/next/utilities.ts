/**
 * Takes a Vue Component and assigns an install function to it
 * this makes sure that it can be used with Vue.use(component)
 *
 * FIXME: Type definition for VueConstructor<Vue> was removed due to a bug
 * when generating the types using rollup
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeInstallable = (component: any) =>
	Object.assign(component, {
		install: (Vue) => Vue.component(component.name, component),
	} as Vue.PluginObject<{}>)
