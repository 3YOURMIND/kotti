import{d as f,R as P,y as v,S as y,T as p,m as S,M as m,_ as T,r as n,c as C,o as U,b as i,a as o,u as L,v as b,A as t,U as l,i as w,f as K,g as z,h as A}from"../chunks/chunk-CzpiwWmA.js";import{C as I}from"../chunks/chunk-K-MxK_OI.js";import{C as E}from"../chunks/chunk-1-fZTzUx.js";import{i as D}from"../chunks/chunk-BqENbO1r.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-CndCLVA3.js";import"../chunks/chunk-LOTtwplp.js";import"../chunks/chunk-BXl3LOEh.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-CtuKcwFs.js";/* empty css                      *//* empty css                      *//* empty css                      */const R=f({name:"DocumentationPageUsageComponentsCards",components:{CodePreview:I,ComponentInfo:E,KtCard:p,KtCol:y,KtFieldSingleSelect:v,KtRow:P},setup(){return{component:p,imgPosition:S(m.Card.ImagePosition.TOP),imgPositionOptions:Object.entries(m.Card.ImagePosition).map(([a,e])=>({label:a,value:e}))}}}),j={class:"card-usage-standard"},x={class:"card-usage-standard"};function V(a,e,B,k,q,$){const u=n("ComponentInfo"),s=n("KtCard"),r=n("CodePreview"),g=n("KtFieldSingleSelect"),d=n("KtCol"),h=n("KtRow");return U(),C("div",null,[i(u,L(b({component:a.component})),null,16),e[12]||(e[12]=o("h2",null,"Standard Usage",-1)),i(r,{code:`
			<KtCard imgUrl="https://picsum.photos/400/200">
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum dolor [...]
				</template>
			</KtCard>

			<KtCard
				imgUrl="https://picsum.photos/400/200"
				primaryActionLabel="Confirm"
				secondaryActionLabel="Cancel"
			>
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum [...]
				</template>
			</KtCard>
		`,language:"vue-html"},{default:t(()=>[o("div",j,[i(s,l({imgPosition:a.imgPosition},{imgUrl:"https://picsum.photos/380/200"}),{"card-header":t(()=>[...e[1]||(e[1]=[o("h2",null,"Simple display",-1)])]),"card-body":t(()=>[...e[2]||(e[2]=[o("p",null," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat nisl at nisl condimentum vehicula. ",-1)])]),_:1},16),i(s,l({imgPosition:a.imgPosition},{imgUrl:"https://picsum.photos/390/200",primaryActionLabel:"Confirm",secondaryActionLabel:"Cancel"}),{"card-header":t(()=>[...e[3]||(e[3]=[o("h2",null,"Example with buttons",-1)])]),"card-body":t(()=>[...e[4]||(e[4]=[o("p",null," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat nisl at nisl condimentum vehicula. ",-1)])]),_:1},16)])]),_:1}),i(r,{code:`
			<KtCard
				imgUrl="https://picsum.photos/400/200"
				isImgLoading
			>
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum [...]
				</template>
			</KtCard>

			<KtCard
				imgUrl="https://picsum.photos/400/200"
				isTextLoading
			>
				<template #card-header>
					<h2>Lorem Ipsum</h2>
				</template>
				<template #card-body>
					Lorem ipsum [...]
				</template>
			</KtCard>
		`,language:"vue-html"},{default:t(()=>[o("div",x,[i(s,l({imgPosition:a.imgPosition},{imgUrl:"https://picsum.photos/400/200",isImgLoading:""}),{"card-header":t(()=>[...e[5]||(e[5]=[o("h2",null,"Lorem Ipsum",-1)])]),"card-body":t(()=>[...e[6]||(e[6]=[o("p",null," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat nisl at nisl condimentum vehicula. ",-1)])]),_:1},16),i(s,l({imgPosition:a.imgPosition},{imgUrl:"https://picsum.photos/410/200",isTextLoading:""}),{"card-header":t(()=>[...e[7]||(e[7]=[o("h2",null,"Lorem Ipsum",-1)])]),"card-body":t(()=>[...e[8]||(e[8]=[o("p",null," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat nisl at nisl condimentum vehicula. ",-1)])]),_:1},16)])]),_:1}),i(h,{gap:8},{default:t(()=>[i(d,{span:12},{default:t(()=>[i(g,{modelValue:a.imgPosition,"onUpdate:modelValue":e[0]||(e[0]=c=>a.imgPosition=c),hideClear:"",label:"Image Position",options:a.imgPositionOptions},null,8,["modelValue","options"])]),_:1}),i(d,{span:12},{default:t(()=>[i(s,l({imgPosition:a.imgPosition},{imgUrl:"https://picsum.photos/420/300"}),{"card-header":t(()=>[...e[9]||(e[9]=[o("h2",null,"Lorem Ipsum",-1)])]),"card-body":t(()=>[...e[10]||(e[10]=[o("p",null," Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat nisl at nisl condimentum vehicula. ",-1)])]),"card-footer":t(()=>[...e[11]||(e[11]=[o("p",null,"This is the end",-1)])]),_:1},16)]),_:1})]),_:1})])}const _=T(R,[["render",V],["__scopeId","data-v-cd925c14"]]),O=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"})),ie={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:A}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:z}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:K}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/components/card/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:O}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:D},{type:"pointer-import",value:w}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{ie as configValuesSerialized};
