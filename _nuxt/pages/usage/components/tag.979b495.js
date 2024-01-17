(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1089:function(t,e,o){"use strict";var n=o(939);o.n(n).a},1090:function(t,e,o){(e=o(149)(!1)).push([t.i,".line-description[data-v-0d2c2812]{margin:1.5rem 0 .5rem}",""]),t.exports=e},1133:function(t,e,o){"use strict";o.r(e);var n=o(246),r=o(0),c=o(893),l=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsLine",components:{ComponentInfo:c.a},setup:function(){return{component:n.a,showTag:Object(r.ref)(!0)}}}),d=(o(1089),o(86)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("p",[t._v("Tags should either visualize active user input or invite for a user action.")]),t._v(" "),t._m(0),t._v(" "),o("KtTag",{attrs:{text:"I display Information",isDisabled:""}}),t._v(" "),t.showTag?o("KtTag",{attrs:{text:"You can remove me if you want"},on:{close:function(e){t.showTag=!1}}}):t._e()],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[t._v("\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtTag")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"I display Information"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("isDisabled")]),t._v("/>")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtTag")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("v-if")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"showTag"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"You can remove me if you want"')]),t._v(" @"),o("span",{staticClass:"hljs-attr"},[t._v("close")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"showTag = false"')]),t._v(" />")]),t._v("\n")])])}],!1,null,"0d2c2812",null);e.default=component.exports},890:function(t,e,o){var content=o(896);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(150).default)("c5a5ccd2",content,!0,{sourceMap:!1})},891:function(t,e,o){var content=o(898);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(150).default)("5ab1c5c8",content,!0,{sourceMap:!1})},892:function(t,e,o){"use strict";o.d(e,"a",(function(){return c}));var n=o(399);var r=o(493);function c(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},893:function(t,e,o){"use strict";o(398),o(625),o(189),o(491),o(302),o(151),o(269),o(492),o(301);var n=o(122),r=o(892),c=o(397),l=o(5),d=o(303),v=o(0),_=o(894),m=o.n(_),f=o(494),h=o.n(f),y=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(v.ref)(!1)}}}),x=(o(895),o(86)),C=Object(x.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"header"},[o("div",{staticClass:"header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"header__details"},[details.description?o("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],c=r.description,l=r.type;return o("div",{key:n,staticClass:"scope__item"},[o("div",{class:"scope__type scope__type--is-"+l,domProps:{textContent:t._s(l)}}),t._v(" "),o("div",{staticClass:"scope__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===c?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(c)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"b328c096",null).exports;function w(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var j=Object(v.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:C},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(v.computed)((function(){var e=[],o=t.component,l=o.meta,d=l.addedVersion,v=l.componentFolder,_=l.deprecated,m=l.designs,f=l.typeScript,y=o.name,x=null!=v?v:h()(y.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==_&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(_.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(r.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},c.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},c.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),f&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:f.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?w(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):w(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?m()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return m()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:l.Yoco}}}),k=(o(897),Object(x.a)(j,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info-label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"097dbb28",null));e.a=k.exports},894:function(t,e,o){var n=o(624);t.exports=function(){if(!arguments.length)return[];var t=arguments[0];return n(t)?t:[t]}},895:function(t,e,o){"use strict";var n=o(890);o.n(n).a},896:function(t,e,o){(e=o(149)(!1)).push([t.i,".slots-block[data-v-b328c096]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-b328c096]{padding:.4rem .6rem}.slots-block[data-v-b328c096]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-b328c096]{display:flex;flex:1;align-items:center}.header__details[data-v-b328c096]{flex:1}.header__name[data-v-b328c096]{font-weight:700}.header>*[data-v-b328c096]{display:flex;align-items:center}.header[data-v-b328c096]>:not(:first-child){margin-left:.4rem}.header__description[data-v-b328c096]{flex:1}.header__empty-description[data-v-b328c096]{flex:1;font-style:italic}.header__empty-scope[data-v-b328c096]{font-style:italic}.scope[data-v-b328c096]{margin-left:1.5rem}.scope__item[data-v-b328c096]{display:flex;align-items:center}.scope__item[data-v-b328c096]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-b328c096]{font-style:italic}.scope__name[data-v-b328c096]{min-width:100px;font-weight:700}.scope__type[data-v-b328c096]{min-width:60px}.scope__type--is-function[data-v-b328c096]{color:var(--orange-50)}.scope__type--is-object[data-v-b328c096]{color:var(--purple-50)}.scope__type--is-integer[data-v-b328c096]{color:var(--green-50)}",""]),t.exports=e},897:function(t,e,o){"use strict";var n=o(891);o.n(n).a},898:function(t,e,o){(e=o(149)(!1)).push([t.i,".component-info[data-v-097dbb28]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-097dbb28]{flex-direction:row;align-items:center}}.component-info>*[data-v-097dbb28]{display:flex;margin:5px 10px}.component-info__labels[data-v-097dbb28]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-097dbb28]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-097dbb28]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info-label__left[data-v-097dbb28],.component-info-label__right[data-v-097dbb28]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-097dbb28]:hover{text-decoration:underline}.component-info-label__left[data-v-097dbb28]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info-container[data-v-097dbb28]{margin-bottom:32px}.component-info-container[data-v-097dbb28]>:not(:first-child){margin-top:16px}.danger-block[data-v-097dbb28]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-097dbb28]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-097dbb28]{margin-left:8px}.danger-block>section[data-v-097dbb28]{padding:.4rem .6rem}.danger-block>section[data-v-097dbb28]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},939:function(t,e,o){var content=o(1090);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(150).default)("d1aac22c",content,!0,{sourceMap:!1})}}]);