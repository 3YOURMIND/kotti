import{d as p,R as r,S as f,_ as v,r as i,c as K,o as C,b as n,a as o,e as a,l as m,u as w,v as y,A as l,F as T,i as k,f as S,g as R,h as P}from"../chunks/chunk-BfwLKwyU.js";import{C as x}from"../chunks/chunk-uCf9zVVi.js";import{C as b}from"../chunks/chunk-DTKb9fuY.js";import{i as c}from"../chunks/chunk-BR9qhM7b.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-xnFUk1ri.js";import"../chunks/chunk-cvdaDHmF.js";import"../chunks/chunk-CMVVuJD0.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-B9oOmv4T.js";/* empty css                      *//* empty css                      *//* empty css                      */const z=p({name:"DocumentationPageUsageLayoutsGridSystem",components:{CodePreview:x,ComponentInfo:b,KtCol:f,KtRow:r},setup(){return{component:{meta:r.meta,name:"Grid System"}}}});function U(u,t,D,E,B,V){const g=i("ComponentInfo"),e=i("KtCol"),d=i("KtRow"),s=i("CodePreview");return C(),K(T,null,[n(g,w(y({component:u.component})),null,16),t[39]||(t[39]=o("p",null,[a(" Kotti uses 24 columns "),o("code",null,"span"),a(" grid system. With "),o("code",null,"row"),a(" and "),o("code",null,"col"),a(" it can create dynamic layout. Grid can be also easily customized. ")],-1)),n(s,{code:`\`
		<KtRow>
			<KtCol :span="2"><div class="grid-content light" /></KtCol>
			<KtCol :span="4"><div class="grid-content dark" /></KtCol>
			<KtCol :span="8"><div class="grid-content light" /></KtCol>
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
		</KtRow>\``,language:"html"},{default:l(()=>[n(d,null,{default:l(()=>[n(e,{span:2},{default:l(()=>[...t[0]||(t[0]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:4},{default:l(()=>[...t[1]||(t[1]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:8},{default:l(()=>[...t[2]||(t[2]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:10},{default:l(()=>[...t[3]||(t[3]=[o("div",{class:"grid-content light"},null,-1)])]),_:1})]),_:1})]),_:1}),t[40]||(t[40]=o("h2",null,"Gutter",-1)),t[41]||(t[41]=o("p",null,[a(" The gutter in Kotti is "),o("code",null,"16px"),a(" ("),o("code",null,"8px"),a(" on each side of a column). You can change the gutter size by "),o("code",null,"gutter"),a(". ")],-1)),n(s,{code:`\`
		<KtRow :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content dark" /></KtCol>
		</KtRow>\``,language:"html"},{default:l(()=>[n(d,{gutter:20},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[4]||(t[4]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[5]||(t[5]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:12},{default:l(()=>[...t[6]||(t[6]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1})]),_:1})]),_:1}),t[42]||(t[42]=o("h2",null,"Gap",-1)),t[43]||(t[43]=a(" By default there is no gap between two rows, and ",-1)),t[44]||(t[44]=o("code",null,"gap",-1)),t[45]||(t[45]=a(" attribute specifies the number of pixes between two rows. ",-1)),n(s,{code:`\`
		<KtRow :gap="20" :gutter="0">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="8"><div class="grid-content dark" /></KtCol>
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="0">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content dark" /></KtCol>
		</KtRow>\``,language:"html"},{default:l(()=>[n(d,{gap:20,gutter:0},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[7]||(t[7]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:8},{default:l(()=>[...t[8]||(t[8]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:10},{default:l(()=>[...t[9]||(t[9]=[o("div",{class:"grid-content light"},null,-1)])]),_:1})]),_:1}),n(d,{gap:20,gutter:0},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[10]||(t[10]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[11]||(t[11]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:12},{default:l(()=>[...t[12]||(t[12]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1})]),_:1})]),_:1}),t[46]||(t[46]=o("h2",null,"Offset",-1)),t[47]||(t[47]=o("code",null,"offset",-1)),t[48]||(t[48]=a(" attribute specifies the number of column offset from left. ",-1)),n(s,{code:`\`
		<KtRow :gutter="20" :gap="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6" :offset="6"><div class="grid-content dark" /></KtCol>
		</KtRow>
		<KtRow :gutter="20" :gap="20">
			<KtCol :span="6" :offset="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
		</KtRow>\``,language:"html"},{default:l(()=>[n(d,{gap:20,gutter:20},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[13]||(t[13]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{offset:6,span:6},{default:l(()=>[...t[14]||(t[14]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1})]),_:1}),n(d,{gap:20,gutter:20},{default:l(()=>[n(e,{offset:6,span:6},{default:l(()=>[...t[15]||(t[15]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[16]||(t[16]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1})]),_:1})]),_:1}),t[49]||(t[49]=o("h2",null,"Alignment",-1)),t[50]||(t[50]=a(" You can change the justify of columns in one row by set ",-1)),t[51]||(t[51]=o("code",null,"justify",-1)),t[52]||(t[52]=a(" attribute in ",-1)),t[53]||(t[53]=o("code",null,"row",-1)),t[54]||(t[54]=a(". ",-1)),n(s,{code:`\`
		<KtRow :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="20" justify="center">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
		</KtRow>
		<KtRow :gap="20" :gutter="20" justify="end">
			<KtCol :span="10"><div class="grid-content light" /></KtCol>
			<KtCol :span="10"><div class="grid-content dark" /></KtCol>
		</KtRow>\``,language:"html"},{default:l(()=>[n(d,{gap:20,gutter:20},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[17]||(t[17]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[18]||(t[18]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[19]||(t[19]=[o("div",{class:"grid-content light"},null,-1)])]),_:1})]),_:1}),n(d,{gap:20,gutter:20,justify:"center"},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[20]||(t[20]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[21]||(t[21]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[22]||(t[22]=[o("div",{class:"grid-content light"},null,-1)])]),_:1})]),_:1}),n(d,{gap:20,gutter:20,justify:"end"},{default:l(()=>[n(e,{span:10},{default:l(()=>[...t[23]||(t[23]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:10},{default:l(()=>[...t[24]||(t[24]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1})]),_:1})]),_:1}),t[55]||(t[55]=a(" When columns has different height, ",-1)),t[56]||(t[56]=o("code",null,"align",-1)),t[57]||(t[57]=a(" attribute specifies the columns alignment. ",-1)),n(s,{code:`\`
		<KtRow :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>
		<KtRow align="center" :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>
		<KtRow align="bottom" :gap="20" :gutter="20">
			<KtCol :span="6"><div class="grid-content light" /></KtCol>
			<KtCol :span="6"><div class="grid-content dark" /></KtCol>
			<KtCol :span="12"><div class="grid-content tall light" /></KtCol>
		</KtRow>\``,language:"html"},{default:l(()=>[n(d,{gap:20,gutter:20},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[25]||(t[25]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[26]||(t[26]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:12},{default:l(()=>[...t[27]||(t[27]=[o("div",{class:"grid-content tall light"},null,-1)])]),_:1})]),_:1}),n(d,{align:"center",gap:20,gutter:20},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[28]||(t[28]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[29]||(t[29]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:12},{default:l(()=>[...t[30]||(t[30]=[o("div",{class:"grid-content tall light"},null,-1)])]),_:1})]),_:1}),n(d,{align:"bottom",gap:20,gutter:20},{default:l(()=>[n(e,{span:6},{default:l(()=>[...t[31]||(t[31]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{span:6},{default:l(()=>[...t[32]||(t[32]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:12},{default:l(()=>[...t[33]||(t[33]=[o("div",{class:"grid-content tall light"},null,-1)])]),_:1})]),_:1})]),_:1}),t[58]||(t[58]=m("<h2 data-v-3951d1aa>Responsive</h2> There are five media query breakpoints: <code data-v-3951d1aa>xs: 480px</code>, <code data-v-3951d1aa>sm: 600px</code>, <code data-v-3951d1aa>md: 840px</code> , <code data-v-3951d1aa>lg: 960px</code> and <code data-v-3951d1aa>xl: 1280px</code>. Breakpoint attribute accept <code data-v-3951d1aa>Number</code> as <code data-v-3951d1aa>span</code>. ",16)),n(s,{code:`\`
		<KtRow :gap="10">
			<KtCol :span="2" :xs="24"><div class="grid-content light" /></KtCol>
			<KtCol :sm="24" :span="3"><div class="grid-content dark" /></KtCol>
			<KtCol :md="24" :span="4"><div class="grid-content light" /></KtCol>
			<KtCol :lg="24" :span="5"><div class="grid-content dark" /></KtCol>
			<KtCol :span="6" :xl="24"><div class="grid-content light" /></KtCol>
		</KtRow>\``,language:"html"},{default:l(()=>[n(d,{gap:10},{default:l(()=>[n(e,{span:2,xs:24},{default:l(()=>[...t[34]||(t[34]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{sm:24,span:3},{default:l(()=>[...t[35]||(t[35]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{md:24,span:4},{default:l(()=>[...t[36]||(t[36]=[o("div",{class:"grid-content light"},null,-1)])]),_:1}),n(e,{lg:24,span:5},{default:l(()=>[...t[37]||(t[37]=[o("div",{class:"grid-content dark"},null,-1)])]),_:1}),n(e,{span:6,xl:24},{default:l(()=>[...t[38]||(t[38]=[o("div",{class:"grid-content light"},null,-1)])]),_:1})]),_:1})]),_:1})],64)}const A=v(z,[["render",U],["__scopeId","data-v-3951d1aa"]]),j=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"})),X={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:P}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:R}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:S}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/layouts/grid-system/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:j}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:c},{type:"pointer-import",value:k}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{X as configValuesSerialized};
