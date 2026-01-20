import{d as u,O as r,m as p,_ as m,r as n,c,o as v,b as a,a as l,e as f,u as h,v as b,A as s,F as y,i as T,f as C,g as S,h as g}from"../chunks/chunk-CzpiwWmA.js";import{C as P}from"../chunks/chunk-K-MxK_OI.js";import{C as x}from"../chunks/chunk-1-fZTzUx.js";import{i as k}from"../chunks/chunk-BqENbO1r.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-CndCLVA3.js";import"../chunks/chunk-LOTtwplp.js";import"../chunks/chunk-BXl3LOEh.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-CtuKcwFs.js";/* empty css                      *//* empty css                      *//* empty css                      */const w=u({name:"DocumentationPageUsageComponentsBreadcrumb",components:{CodePreview:P,ComponentInfo:x,KtBreadcrumb:r},setup(){const e=p(2);return{activeIndex:e,component:r,links:[{isCompleted:!0,onClick:()=>{e.value=0},title:"Kotti"},{isCompleted:!0,onClick:()=>{e.value=1},title:"Usage"},{isCompleted:!0,onClick:()=>{e.value=2},title:"Components"},{isCompleted:!1,onClick:()=>{e.value=3},title:"Links"},{isDisabled:!0,onClick:()=>{e.value=4},title:"Breadcrumbs"}]}}});function z(e,t,A,D,_,I){const d=n("ComponentInfo"),o=n("KtBreadcrumb"),i=n("CodePreview");return v(),c(y,null,[a(d,h(b({component:e.component})),null,16),t[0]||(t[0]=l("h2",null,"Basic",-1)),t[1]||(t[1]=f(" Indicate the current page’s location within a navigational hierarchy. ",-1)),a(i,{code:`
		<KtBreadcrumb
			:activeIndex="activeIndex"
			:breadcrumbs="[
				{
					title: "Kotti",
					onClick: () => (activeIndex.value = 0),
					isCompleted: true,
				},
				{
					title: "Usage",
					onClick: () => (activeIndex.value = 1),
					isCompleted: true,
				},
				{
					title: "Components",
					onClick: () => (activeIndex.value = 2),
					isCompleted: true,
				},
				{
					title: "Links",
					onClick: () => (activeIndex.value = 3),
					isCompleted: false,
				},
				{
					title: "Breadcrumbs",
					isDisabled: true,
				}
			]"
		/>`,language:"vue-html"},{default:s(()=>[a(o,{activeIndex:e.activeIndex,breadcrumbs:e.links},null,8,["activeIndex","breadcrumbs"])]),_:1}),t[2]||(t[2]=l("h2",null,"Separator Style",-1)),a(i,{code:`
			<KtBreadcrumb
				:breadcrumbs="links"
				:separator="{
					style: "text",
					value: "/",
				}"
			/>
			<KtBreadcrumb
				:breadcrumbs="links"
				:separator="{
					style: "icon",
					value: "chevron_right",
				}"
			/>
		`,language:"vue-html"},{default:s(()=>[a(o,{breadcrumbs:e.links,separator:{style:"text",value:"/"}},null,8,["breadcrumbs"]),a(o,{breadcrumbs:e.links,separator:{style:"icon",value:"chevron_right"}},null,8,["breadcrumbs"])]),_:1})],64)}const U=m(w,[["render",z]]),B=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"})),J={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:g}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:S}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:C}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/components/breadcrumb/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:B}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:k},{type:"pointer-import",value:T}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{J as configValuesSerialized};
