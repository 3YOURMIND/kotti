(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{712:function(t,e,o){var content=o(718);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(113).default)("24122391",content,!0,{sourceMap:!1})},713:function(t,e,o){var content=o(720);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(113).default)("3377c674",content,!0,{sourceMap:!1})},714:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(334);var r=o(402);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},715:function(t,e,o){"use strict";o(333),o(505),o(171),o(400),o(272),o(104),o(219),o(401),o(271);var n=o(77),r=o(714),l=o(332),c=o(5),d=o(716),_=o(0),f=o(45),v=Object(_.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(_.ref)(!1)}}}),m=(o(717),o(64)),h=Object(m.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"1f580630",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var x=Object(_.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:h},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(_.computed)((function(){var e=[],o=t.component,c=o.meta,d=c.addedVersion,_=c.componentFolder,v=c.deprecated,m=c.designs,h=c.typeScript,x=o.name,k=null!=_?_:Object(f.kebabCase)(x.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(k):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(r.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(x,".vue"),right:"".concat(x,".vue")}),e})),showProps:Object(_.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(f.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(f.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),k=(o(719),Object(m.a)(x,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"7a5883f0",null));e.a=k.exports},716:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},717:function(t,e,o){"use strict";var n=o(712);o.n(n).a},718:function(t,e,o){(e=o(112)(!1)).push([t.i,".slots-block[data-v-1f580630]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-1f580630]{padding:.4rem .6rem}.slots-block[data-v-1f580630]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-1f580630]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-1f580630],.slots-block__header__details__description[data-v-1f580630]{flex:1}.slots-block__header__details__empty-description[data-v-1f580630]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-1f580630]{font-style:italic}.slots-block__header__name[data-v-1f580630]{font-weight:700}.slots-block__header>*[data-v-1f580630]{display:flex;align-items:center}.slots-block__header[data-v-1f580630]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-1f580630]{margin-left:1.5rem}.slots-block__scope__item[data-v-1f580630]{display:flex;align-items:center}.slots-block__scope__item[data-v-1f580630]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-1f580630]{font-style:italic}.slots-block__scope__item__name[data-v-1f580630]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-1f580630]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-1f580630]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-1f580630]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-1f580630]{color:var(--green-50)}",""]),t.exports=e},719:function(t,e,o){"use strict";var n=o(713);o.n(n).a},720:function(t,e,o){(e=o(112)(!1)).push([t.i,".table-style[data-v-7a5883f0],table[data-v-7a5883f0]{width:100%;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;table-layout:auto;border-collapse:collapse}.table-style .th-style[data-v-7a5883f0],.table-style th[data-v-7a5883f0],table .th-style[data-v-7a5883f0],table th[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);font-size:.6rem;line-height:1em;color:#8f8f8f;text-align:inherit;text-transform:uppercase;border-bottom:.05rem solid #dbdbdb}.table-style .tr-style[data-v-7a5883f0],.table-style tr[data-v-7a5883f0],table .tr-style[data-v-7a5883f0],table tr[data-v-7a5883f0]{margin:0}.table-style .td-style[data-v-7a5883f0],.table-style td[data-v-7a5883f0],table .td-style[data-v-7a5883f0],table td[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);line-height:1.2rem;border-bottom:1px solid #dbdbdb}.table-style i[data-v-7a5883f0],table i[data-v-7a5883f0]{margin:0 .2rem;font-size:1rem!important;color:#8a8a8a}.component-info[data-v-7a5883f0]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-7a5883f0]{flex-direction:row;align-items:center}}.component-info>*[data-v-7a5883f0]{display:flex;margin:5px 10px}.component-info__labels[data-v-7a5883f0]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-7a5883f0]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-7a5883f0],.component-info__label__right[data-v-7a5883f0]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-7a5883f0]:hover{text-decoration:underline}.component-info__label__left[data-v-7a5883f0]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-7a5883f0]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-7a5883f0]{margin-bottom:32px}.component-info-container[data-v-7a5883f0]>:not(:first-child){margin-top:16px}.danger-block[data-v-7a5883f0]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-7a5883f0]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-7a5883f0]{margin-left:8px}.danger-block>section[data-v-7a5883f0]{padding:.4rem .6rem}.danger-block>section[data-v-7a5883f0]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},723:function(t,e,o){var n=o(787),r="object"==typeof self&&self&&self.Object===Object&&self,l=n||r||Function("return this")();t.exports=l},725:function(t,e){t.exports=function(t){return null!=t&&"object"==typeof t}},727:function(t,e,o){var n=o(731),r=o(891),l=o(892),c=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":c&&c in Object(t)?r(t):l(t)}},731:function(t,e,o){var n=o(723).Symbol;t.exports=n},732:function(t,e){var o=Array.isArray;t.exports=o},787:function(t,e,o){(function(e){var o="object"==typeof e&&e&&e.Object===Object&&e;t.exports=o}).call(this,o(93))},891:function(t,e,o){var n=o(731),r=Object.prototype,l=r.hasOwnProperty,c=r.toString,d=n?n.toStringTag:void 0;t.exports=function(t){var e=l.call(t,d),o=t[d];try{t[d]=void 0;var n=!0}catch(t){}var r=c.call(t);return n&&(e?t[d]=o:delete t[d]),r}},892:function(t,e){var o=Object.prototype.toString;t.exports=function(t){return o.call(t)}}}]);