import{d as h,C as m,z as p,m as f,Y as v,L as w,_ as g,r as u,c as C,o as a,b as o,a as l,u as b,v as T,e as c,A as i,x as s,i as k,f as S,g as A,h as P}from"../chunks/chunk-BfwLKwyU.js";import{C as x}from"../chunks/chunk-uCf9zVVi.js";import{C as B}from"../chunks/chunk-DTKb9fuY.js";import{i as z}from"../chunks/chunk-BR9qhM7b.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-xnFUk1ri.js";import"../chunks/chunk-cvdaDHmF.js";import"../chunks/chunk-CMVVuJD0.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-B9oOmv4T.js";/* empty css                      *//* empty css                      *//* empty css                      */const I=h({name:"DocumentationPageUsageComponentsBanner",components:{CodePreview:x,ComponentInfo:B,KtBanner:p,KtButton:m},setup(){const e=f(!1);return{closed:e,component:p,onAction:()=>{w({text:"Banner action was clicked"})},onClose:()=>{e.value=!e.value},Yoco:v}}}),U={style:{display:"flex","flex-direction":"column",gap:"var(--unit-4)"}};function K(e,t,E,W,_,j){const y=u("ComponentInfo"),n=u("KtBanner"),r=u("CodePreview"),d=u("KtButton");return a(),C("div",null,[o(y,b(T({component:e.component})),null,16),t[0]||(t[0]=l("p",null,[c(" The "),l("code",null,"KtBanner"),c(" component is a versatile alert box used for communicating important application-level or contextual information, such as errors, warnings, or success messages. ")],-1)),o(r,{code:`
				<div style="display: flex; gap: var(--unit-4); flex-direction: column;">
					<KtBanner text="I present you this error" type="error" />
					<KtBanner text="I present you this info" type="info" />
					<KtBanner text="I present you this success" type="success" />
					<KtBanner text="I present you this warning" type="warning" />
				</div>
			`,language:"vue-html"},{default:i(()=>[l("div",U,[o(n,{text:"I present you this error",type:"error"}),o(n,{text:"I present you this info",type:"info"}),o(n,{text:"I present you this success",type:"success"}),o(n,{text:"I present you this warning",type:"warning"})])]),_:1}),t[1]||(t[1]=l("h2",null,"With Action",-1)),o(r,{code:`
				<KtBanner
					action="Action"
					isCloseable
					text="..."
					:type="type"
					@action="onAction"
					@close="onClose"
				/>
			`,language:"vue-html"},{default:i(()=>[e.closed?(a(),s(d,{key:1,label:"May I please try again?",onClick:e.onClose},null,8,["onClick"])):(a(),s(n,{key:0,action:"Action",isCloseable:"",text:"You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can.",type:"info",onAction:e.onAction,onClose:e.onClose},null,8,["onAction","onClose"]))]),_:1}),t[2]||(t[2]=l("h2",null,"With Header",-1)),o(r,{code:`
				<KtBanner
					header="Important Announcement"
					text="You can’t close this banner. We do not know why you would do that but you can’t."
					type="success"
				/>
			`,language:"vue-html"},{default:i(()=>[o(n,{header:"Important Announcement",text:"You can’t close this banner. We do not know why you would do that but you can’t. You can’t close this banner. We do not know why you would do that but you can’t. You can’t close this banner. We do not know why you would do that but you can’t.",type:"success"})]),_:1}),t[3]||(t[3]=l("h2",null,"Close",-1)),o(r,{code:`
				<KtBanner
					isCloseable
					text="You can close this banner. We do not know why you would do that but you can."
					@close="onClose"
				/>
			`,language:"vue-html"},{default:i(()=>[e.closed?(a(),s(d,{key:1,label:"May I please try again?",onClick:e.onClose},null,8,["onClick"])):(a(),s(n,{key:0,isCloseable:"",text:"You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can. You can close this banner. We do not know why you would do that but you can.",onClose:e.onClose},null,8,["onClose"]))]),_:1}),t[4]||(t[4]=l("h2",null,"Custom Style",-1)),o(r,{code:`
				<KtBanner
					isCloseable
					text="As everyone knows, stonks only go up."
					:type="{
						icon: Yoco.Icon.CHARTS,
						backgroundColor: 'var(--gray-10)',
						darkColor: 'var(--gray-70)',
						lightColor: 'var(--gray-20)',
					}"
					@close="onClose"
				/>
			`,language:"vue-html"},{default:i(()=>[e.closed?(a(),s(d,{key:1,label:"May I please try again?",onClick:e.onClose},null,8,["onClick"])):(a(),s(n,{key:0,isCloseable:"",text:"As everyone knows, stonks only go up.",type:{icon:e.Yoco.Icon.CHARTS,backgroundColor:"var(--gray-10)",darkColor:"var(--gray-70)",lightColor:"var(--gray-20)"},onClose:e.onClose},null,8,["type","onClose"]))]),_:1})])}const Y=g(I,[["render",K]]),D=Object.freeze(Object.defineProperty({__proto__:null,default:Y},Symbol.toStringTag,{value:"Module"})),Z={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:P}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:A}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:S}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/components/banner/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:D}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:z},{type:"pointer-import",value:k}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{Z as configValuesSerialized};
