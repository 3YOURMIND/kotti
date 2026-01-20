import{d as l,aL as s,_ as p,r as a,c as d,o as u,b as e,a as n,u as m,v as f,F as c,i as h,f as y,g as v,h as T}from"../chunks/chunk-CzpiwWmA.js";import{C as S}from"../chunks/chunk-K-MxK_OI.js";import{C as P}from"../chunks/chunk-1-fZTzUx.js";import{i as g}from"../chunks/chunk-BqENbO1r.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-CndCLVA3.js";import"../chunks/chunk-LOTtwplp.js";import"../chunks/chunk-BXl3LOEh.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-CtuKcwFs.js";/* empty css                      *//* empty css                      *//* empty css                      */const b=l({name:"DocumentationPageUsageLayoutsActionbar",components:{CodePreview:S,ComponentInfo:P},setup(){return{component:s}}});function w(i,t,C,U,_,A){const r=a("ComponentInfo"),o=a("CodePreview");return u(),d(c,null,[e(r,m(f({component:i.component})),null,16),t[0]||(t[0]=n("a",{href:"/examples/layouts"},[n("button",{class:"primary"},"Show Layout Example")],-1)),e(o,{code:`
		<KtActionbar
			slot="actionbar"
			headerTitle="KtContainer Example"
			:menuStyle="menuStyle"
			:menu="menu"
		/>`,language:"vue-html"}),e(o,{code:`
		menuStyle: {
			iconPosition: "left",
		},
		menu: [
			{
				label: "First Link",
				to: "/examples/layouts",
				icon: "user",
				active: false,
				disabled: false,
			},
			{
				label: "Second Link",
				to: "https://google.com",
				icon: "basket",
				active: true,
			},
			{
				label: "Third Link",
				to: "/",
				icon: "bell",
				disabled: true,
			},
		],`,language:"js"})],64)}const z=p(b,[["render",w]]),x=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),G={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:T}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:v}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:y}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/layouts/actionbar/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:x}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:g},{type:"pointer-import",value:h}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{G as configValuesSerialized};
