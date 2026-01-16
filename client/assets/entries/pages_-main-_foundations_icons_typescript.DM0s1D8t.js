import{d as n,_ as i,r,c as l,o as s,a as t,b as a,F as p,i as d,f as u,g as m,h as f}from"../chunks/chunk-Cap8pgze.js";import{C as c}from"../chunks/chunk-BKghwdQY.js";import{i as y}from"../chunks/chunk-BDRJS3w7.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-jcXJ05Qh.js";import"../chunks/chunk-LOTtwplp.js";import"../chunks/chunk-BXl3LOEh.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-CCqf0Ys0.js";/* empty css                      *//* empty css                      *//* empty css                      */const h=n({name:"DocumentationPageIconsTypeScript",components:{CodePreview:c}});function T(g,e,P,w,x,z){const o=r("CodePreview");return s(),l(p,null,[e[0]||(e[0]=t("h1",null,"TypeScript Usage",-1)),e[1]||(e[1]=t("h3",null,"TS Example",-1)),a(o,{code:`
			// enum of icons and the associated ligature / svg name
			import { Yoco } "@3yourmind/yoco"

			console.log(Yoco.Icon.ANNOUNCE)
			// "announce"
		`,language:"typescript"}),e[2]||(e[2]=t("h3",null,"Vue Example",-1)),a(o,{code:`
			<script lang="ts">
			import { Yoco } from "@3yourmind/yoco"
			import { defineComponent } from "vue"

			export default defineComponent({
				name: "Example",
				setup() {
					return {
						Yoco,
					}
				},
			})
			<\/script>

			<template>
				<!-- this is usually the best way to use yoco, but it won’t detect typos -->
				<i class="yoco">announce</i>

				<!-- or -->

				<!-- using the enum will catch typos at build time -->
				<i class="yoco" v-text="Yoco.Icon.ANNOUNCE" />
			</template>
		`,language:"vue"})],64)}const v=i(h,[["render",T]]),S=Object.freeze(Object.defineProperty({__proto__:null,default:v},Symbol.toStringTag,{value:"Module"})),R={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:f}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:m}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:u}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/foundations/icons/typescript/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:S}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:y},{type:"pointer-import",value:d}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{R as configValuesSerialized};
