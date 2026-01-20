import{aW as k,d as w,aX as f,aY as y,C as v,_ as K,r as u,c as C,o as S,b as o,a as n,e as s,A as a,t as T,i as b,f as B,g as P,h as $}from"../chunks/chunk-BfwLKwyU.js";import{C as H}from"../chunks/chunk-uCf9zVVi.js";import{C as x}from"../chunks/chunk-DTKb9fuY.js";import{i as z}from"../chunks/chunk-BR9qhM7b.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-xnFUk1ri.js";import"../chunks/chunk-cvdaDHmF.js";import"../chunks/chunk-CMVVuJD0.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-B9oOmv4T.js";/* empty css                      *//* empty css                      *//* empty css                      */const m=k(),i=m.withOptions({duration:5e3}),A=w({name:"DocumentationPageUsageComponentsToaster",components:{CodePreview:H,ComponentInfo:x,KtButton:v,KtToast:y,KtToaster:f},setup(){return globalThis.toaster=m,{defaultToast:()=>{i({header:"default header",text:"default toast"})},errorToast:()=>{i({text:"I am an error toast",type:"my-error-toast"})},infoToast:()=>{i({text:"I am an info toast",type:"my-info-toast"})},KtToast:y,KtToaster:f,linkToast:()=>{i({custom:{href:"https://github.com/3YOURMIND/kotti",label:"See documentation"},text:"link toast",type:"my-link-toast"})},minimalisticToast:()=>{i({text:"minimalistic toast",type:"my-minimalistic-toast"})},parserHack:{script:"script",template:"template"},permanentToast:()=>{i({duration:null,text:"This is a one-line toast message. This is a one-line toast message. This is a one-line toast message."})},successToast:()=>{i({text:"I am a success toast",type:"my-success-toast"})},toaster:m,warningToast:()=>{i({text:"I am a warning toast",type:"my-warning-toast"})}}}}),U=["textContent"],D=["href"],R={style:{display:"flex","flex-wrap":"wrap",gap:"var(--unit-6)"}};function E(t,e,N,j,V,L){const d=u("ComponentInfo"),l=u("KtToast"),g=u("KtToaster"),r=u("KtButton"),p=u("CodePreview");return S(),C("div",null,[o(d,{component:t.KtToaster},null,8,["component"]),o(p,{code:`
				<${t.parserHack.script} lang="ts">
				import { createToaster, KtButton, KtToast, KtToaster } from '@3yourmind/kotti-ui'

				const toaster = createToaster<{
					default: Record<string, never>
					'my-error-toast': Record<string, never>
					'my-info-toast': Record<string, never>
					'my-link-toast': {
						href: string,
						label: string,
					},
					'my-minimalistic-toast': Record<string, never>
					'my-success-toast': Record<string, never>,
					'my-warning-toast': Record<string, never>
				}>()

				const show = toaster.withOptions({ duration: 5000 })

				export default defineComponent({
					name: 'Example',
					components: {
						KtButton,
						KtToast,
						KtToaster,
					},
					setup () {
						// you can also try this in your browser console
						globalThis.toaster = toaster

						return {
							defaultToast: () => {
								show({
									header: 'default header',
									text: 'default toast',
								})
							},
							errorToast: () => {
								show({
									text: 'I am an error toast',
									type: 'my-error-toast',
								})
							},
							infoToast: () => {
								show({
									text: 'I am an info toast',
									type: 'my-info-toast',
								})
							},
							linkToast: () => {
								show({
									custom: {
										href: 'https://github.com/3YOURMIND/kotti',
										label: 'See documentation',
									},
									text: 'link toast',
									type: 'my-link-toast',
								})
							},
							minimalisticToast: () => {
								show({
									text: 'minimalistic toast',
									type: 'my-minimalistic-toast',
								})
							},
							permanentToast: () => {
								show({
									duration: null,
									text: 'This is a one-line toast message. This is a one-line toast message. This is a one-line toast message.',
								})
							},
							successToast: () => {
								show({
									text: 'success toast',
									type: 'my-success-toast',
								})
							},
							warningToast: () => {
								show({
									text: 'I am a warning toast',
									type: 'my-warning-toast',
								})
							},
						}
					}
				})
				</${t.parserHack.script}>

				<${t.parserHack.template}>
					<KtToaster :toaster='toaster'>
						<${t.parserHack.template} #my-minimalistic-toast>
							<KtToast
								:type='{
									icon: null,
									backgroundColor: 'black',
									darkColor: 'black',
									lightColor: 'var(--gray-70)'
								}'
							/>
						</${t.parserHack.template}>
						<${t.parserHack.template} #my-link-toast='{ custom, text }'>
							<KtToast>
								<${t.parserHack.template} #text>
									<span v-text='text' />
									<a :href='custom.href'>{{ custom.label }}</a>
								</${t.parserHack.template}>
							</KtToast>
						</${t.parserHack.template}>
						<${t.parserHack.template} #my-error-toast>
							<KtToast type='error' />
						</${t.parserHack.template}>
						<${t.parserHack.template} #my-info-toast>
							<KtToast type='info' />
						</${t.parserHack.template}>
						<${t.parserHack.template} #my-success-toast>
							<KtToast type='success' />
						</${t.parserHack.template}>
						<${t.parserHack.template} #my-warning-toast>
							<KtToast type='warning' />
						</${t.parserHack.template}>
					</KtToaster>

					<div style='display: flex; flex-wrap: wrap; gap: var(--unit-6);'>
						<KtButton @click='defaultToast'>default toast</KtButton>
						<KtButton @click='errorToast'>error toast</KtButton>
						<KtButton @click='infoToast'>info toast</KtButton>
						<KtButton @click='successToast'>success toast</KtButton>
						<KtButton @click='warningToast'>warning toast</KtButton>
						<KtButton @click='permanentToast'>permanent toast</KtButton>
						<KtButton @click='minimalisticToast'>minimalistic toast</KtButton>
						<KtButton @click='linkToast'>link toast</KtButton>
					</div>
				</${t.parserHack.template}>
			`,fileName:"Example.vue",language:"vue"},{default:a(()=>[o(g,{toaster:t.toaster},{"my-minimalistic-toast":a(()=>[o(l,{type:{icon:null,backgroundColor:"black",darkColor:"black",lightColor:"var(--gray-70)"}})]),"my-link-toast":a(({custom:c,text:h})=>[o(l,null,{text:a(()=>[n("span",{textContent:T(h)},null,8,U),n("a",{href:c.href},T(c.label),9,D)]),_:2},1024)]),"my-error-toast":a(()=>[o(l,{type:"error"})]),"my-info-toast":a(()=>[o(l,{type:"info"})]),"my-success-toast":a(()=>[o(l,{type:"success"})]),"my-warning-toast":a(()=>[o(l,{type:"warning"})]),_:1},8,["toaster"]),n("div",R,[o(r,{onClick:t.defaultToast},{default:a(()=>[...e[0]||(e[0]=[s("default toast",-1)])]),_:1},8,["onClick"]),o(r,{onClick:t.errorToast},{default:a(()=>[...e[1]||(e[1]=[s("error toast",-1)])]),_:1},8,["onClick"]),o(r,{onClick:t.infoToast},{default:a(()=>[...e[2]||(e[2]=[s("info toast",-1)])]),_:1},8,["onClick"]),o(r,{onClick:t.successToast},{default:a(()=>[...e[3]||(e[3]=[s("success toast",-1)])]),_:1},8,["onClick"]),o(r,{onClick:t.warningToast},{default:a(()=>[...e[4]||(e[4]=[s("warning toast",-1)])]),_:1},8,["onClick"]),o(r,{onClick:t.permanentToast},{default:a(()=>[...e[5]||(e[5]=[s("permanent toast",-1)])]),_:1},8,["onClick"]),o(r,{onClick:t.minimalisticToast},{default:a(()=>[...e[6]||(e[6]=[s("minimalistic toast",-1)])]),_:1},8,["onClick"]),o(r,{onClick:t.linkToast},{default:a(()=>[...e[7]||(e[7]=[s("link toast",-1)])]),_:1},8,["onClick"])])]),_:1},8,["code"]),e[8]||(e[8]=n("h2",null,"Usage",-1)),o(p,{code:`
				import { success, toaster } from "~/shared/toaster.ts"

				export const someAction = async () => {
					// show a toast without waiting for it
					success({ text: "success" })

					// wait for toast to be done showing, or to error when aborted
					await success({ text: "will wait for this toast" }).done

					// abort the toast early
					const toBeAborted = success({ text: "will be aborted" })
					toBeAborted.abort()

					// programmatically push any kind of notification
					toaster.show({ text: "anything", type: "error" })

					// create some custom show handlers with default options
					const customizedShow = toaster.withOptions({ type: "success" })
					const message = customizedShow({ text: "my message" })
					await message.done
				}
			`,fileName:"~/store/my-module.ts",language:"typescript"}),o(p,{code:`
				<${t.parserHack.script} lang="ts">
				import { defineComponent } from "vue"

				import { success } from "~/shared/toaster.ts"

				export default defineComponent({
					setup() {
						return {
							onClick: async () => {
								await success({
									text: "something went well",
								})
							}
						}
					}
				})
				</${t.parserHack.script}>

				<${t.parserHack.template}>
					<KtButton label="Show Toast" @click="onClick">
				</${t.parserHack.template}>
			`,fileName:"~/components/MyComponent.vue",language:"vue"},null,8,["code"]),e[9]||(e[9]=n("h2",null,"Initial Setup",-1)),e[10]||(e[10]=s(" This is the per-app setup process for ",-1)),e[11]||(e[11]=n("code",null,"KtToaster",-1)),o(p,{code:`
				<${t.parserHack.template}>
					<KtToaster :toaster="toaster" />
				</${t.parserHack.template}>

				<${t.parserHack.script} lang="ts">
				import { defineComponent } from "vue"

				import { toaster } from "~/shared/toaster.ts"

				export default defineComponent({
					setup() {
						return {
							// KtToaster needs a reference to your per-app toaster instance
							toaster
						}
					}
				})
				</${t.parserHack.script}>
			`,fileName:"App.vue",language:"vue"},null,8,["code"]),o(p,{code:`
				import { createToaster } from "@3yourmind/kotti-ui"

				// create a toaster instance, usually there should only ever be one per app
				export const toaster = createToaster<{
					default: Record<string, never>
					error: Record<string, never>
					success: Record<string, never>
				}>()

				// show a maximum number of toasts simultaneously, defaults to 3
				// export const toaster = createToaster({ numberOfToasts: 6 })

				// define custom notification presets with pre-configured options
				export const error = toaster.withOptions({ duration: 5_000, type: "error" })
				export const success = toaster.withOptions({ duration: 5_000, type: "success" })
				export const successPersistent = toaster.withOptions({ type: "success" })
			`,fileName:"~/shared/toaster.ts",language:"typescript"}),o(d,{component:t.KtToast},null,8,["component"]),e[12]||(e[12]=n("a",{href:"/usage/components/banner"},[s(" See "),n("code",null,"KtBanner")],-1)),o(p,{code:`
				<KtToast type='error' />
				<KtToast type='info' />
				<KtToast type='success' />
				<KtToast type='warning' />
				<KtToast
					:type="{
						icon: null,
						backgroundColor: 'var(--gray-10)',
						darkColor: 'var(--gray-70)',
						lightColor: 'var(--gray-20)'
					}"
				/>
			`,language:"vue-html"})])}const I=K(A,[["render",E]]),O=Object.freeze(Object.defineProperty({__proto__:null,default:I},Symbol.toStringTag,{value:"Module"})),at={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:$}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:P}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:B}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/components/toaster/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:O}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:z},{type:"pointer-import",value:b}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{at as configValuesSerialized};
