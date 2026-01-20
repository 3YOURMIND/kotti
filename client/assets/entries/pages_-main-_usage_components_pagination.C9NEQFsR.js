import{d as P,av as s,I as T,B as z,y as K,G as h,m as r,_ as U,r as p,c as C,o as w,b as t,a as o,u as A,v as b,A as i,an as x,e as u,ao as F,F as j,i as D,f as E,g as V,h as B}from"../chunks/chunk-CzpiwWmA.js";import{C as N}from"../chunks/chunk-K-MxK_OI.js";import{C as R}from"../chunks/chunk-BoMBMuJh.js";import{C as k}from"../chunks/chunk-1-fZTzUx.js";import{i as I}from"../chunks/chunk-BqENbO1r.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-CndCLVA3.js";import"../chunks/chunk-LOTtwplp.js";import"../chunks/chunk-BXl3LOEh.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-CtuKcwFs.js";/* empty css                      *//* empty css                      *//* empty css                      */const O=P({name:"DocumentationPageUsageComponentsPagination",components:{CodePreview:N,ComponentForm:R,ComponentInfo:k,KtFieldNumber:h,KtFieldSingleSelect:K,KtFieldToggle:z,KtForm:T,KtPagination:s},setup(){return{component:s,page50:r(1),page500:r(1),settings:r({adjacentAmount:2,fixedWidth:!1,page:1,pageSize:10,pagingStyle:"expand",total:100})}}});function W(a,e,G,H,M,q){const m=p("ComponentInfo"),l=p("KtPagination"),g=p("CodePreview"),f=p("KtFieldSingleSelect"),S=p("KtFieldToggle"),d=p("KtFieldNumber"),y=p("ComponentForm"),v=p("KtForm");return w(),C(j,null,[t(m,A(b({component:a.component})),null,16),e[14]||(e[14]=o("h2",null,"Basic Usage",-1)),t(g,{code:'<KtPagination :total="50" :pageSize="10" v-model:page="page50" />',language:"vue-html"},{default:i(()=>[t(l,{page:a.page50,"onUpdate:page":e[0]||(e[0]=n=>a.page50=n),pageSize:10,total:50},null,8,["page"])]),_:1}),e[15]||(e[15]=o("h2",null,"Default Page",-1)),t(g,{code:'<KtPagination :total="50" :pageSize="10" :page="3" v-model:page="page50" />',language:"vue-html"},{default:i(()=>[t(l,{page:a.page50,"onUpdate:page":e[1]||(e[1]=n=>a.page50=n),pageSize:10,total:50},null,8,["page"])]),_:1}),e[16]||(e[16]=o("h2",null,"Styles",-1)),e[17]||(e[17]=o("h4",null,"Expanded",-1)),t(g,{code:'<KtPagination pagingStyle="expand" :total="50" :pageSize="10" v-model:page="page50" />',language:"vue-html"},{default:i(()=>[t(l,{page:a.page50,"onUpdate:page":e[2]||(e[2]=n=>a.page50=n),pageSize:10,pagingStyle:"expand",total:50},null,8,["page"])]),_:1}),e[18]||(e[18]=o("h4",null,"Fraction",-1)),t(g,{code:'<KtPagination pagingStyle="fraction" :total="50" :pageSize="10" v-model:page="page50" />',language:"vue-html"},{default:i(()=>[t(l,{page:a.page50,"onUpdate:page":e[3]||(e[3]=n=>a.page50=n),pageSize:10,pagingStyle:"fraction",total:50},null,8,["page"])]),_:1}),e[19]||(e[19]=o("h4",null,"Flexible",-1)),t(g,{code:'<KtPagination pagingStyle="flex" :total="50" :pageSize="10" v-model:page="page50" />',language:"vue-html"},{default:i(()=>[t(l,{page:a.page50,"onUpdate:page":e[4]||(e[4]=n=>a.page50=n),pageSize:10,pagingStyle:"flex",total:50},null,8,["page"])]),_:1}),e[20]||(e[20]=o("h4",null,"Extra Options",-1)),t(g,{code:`
			<KtPagination
				v-model:page="page500"
				:adjacentAmount="1"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
			<KtPagination
				v-model:page="page500"
				:adjacentAmount="2"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
			<KtPagination
				v-model:page="page500"
				:adjacentAmount="3"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>

			<!-- Separate fixed width example -->
			<KtPagination
				v-model:page="page500"
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
			<KtPagination
				v-model:page="page500"
				fixedWidth
				:pageSize="10"
				pagingStyle="flex"
				:total="500"
			/>
		`,language:"vue-html"},{default:i(()=>[t(l,{page:a.page500,"onUpdate:page":e[5]||(e[5]=n=>a.page500=n),adjacentAmount:1,pageSize:10,pagingStyle:"flex",total:500},null,8,["page"]),t(l,{page:a.page500,"onUpdate:page":e[6]||(e[6]=n=>a.page500=n),adjacentAmount:2,pageSize:10,pagingStyle:"flex",total:500},null,8,["page"]),t(l,{page:a.page500,"onUpdate:page":e[7]||(e[7]=n=>a.page500=n),adjacentAmount:3,pageSize:10,pagingStyle:"flex",total:500},null,8,["page"]),t(l,{page:a.page500,"onUpdate:page":e[8]||(e[8]=n=>a.page500=n),pageSize:10,pagingStyle:"flex",total:500},null,8,["page"]),t(l,{page:a.page500,"onUpdate:page":e[9]||(e[9]=n=>a.page500=n),fixedWidth:"",pageSize:10,pagingStyle:"flex",total:500},null,8,["page"])]),_:1}),t(v,{modelValue:a.settings,"onUpdate:modelValue":e[10]||(e[10]=n=>a.settings=n)},{default:i(()=>[t(y,{component:a.component,hiddenProps:{"onUpdate:page":n=>a.settings.page=n},props:a.settings},{"component-form-settings":i(()=>[o("div",null,[e[12]||(e[12]=o("h4",null,"Settings",-1)),t(f,{formKey:"pagingStyle",hideClear:"",label:"Paging style",options:[{label:"expand (default)",value:"expand"},{label:"flex",value:"flex"},{label:"fraction",value:"fraction"}]}),x(t(S,{formKey:"fixedWidth",isOptional:"",label:"Fixed width",type:"switch"},{helpText:i(()=>[...e[11]||(e[11]=[o("code",null,"fixedWidth",-1),u(" only has an effect if ",-1),o("code",null,"pagingStyle",-1),u(" is set to ",-1),o("code",null,"flex",-1)])]),_:1},512),[[F,a.settings.pagingStyle==="flex"]])]),o("div",null,[e[13]||(e[13]=o("h4",null,"Numbers",-1)),t(d,{formKey:"page",hideClear:"",label:"Page"}),t(d,{formKey:"pageSize",hideClear:"",label:"Page size"}),t(d,{formKey:"total",hideClear:"",label:"Total"}),t(d,{formKey:"adjacentAmount",hideClear:"",label:"Adjacent Pages"})])]),_:1},8,["component","hiddenProps","props"])]),_:1},8,["modelValue"]),e[21]||(e[21]=o("div",null,null,-1))],64)}const L=U(O,[["render",W]]),$=Object.freeze(Object.defineProperty({__proto__:null,default:L},Symbol.toStringTag,{value:"Module"})),ge={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:B}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:V}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:E}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/components/pagination/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:$}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:I},{type:"pointer-import",value:D}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{ge as configValuesSerialized};
