(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{628:function(t,e,n){var content=n(634);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(105).default)("6285525e",content,!0,{sourceMap:!1})},629:function(t,e,n){var content=n(636);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(105).default)("74fb5490",content,!0,{sourceMap:!1})},630:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var l=n(317);var o=n(375);function r(t){return function(t){if(Array.isArray(t))return Object(l.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},631:function(t,e,n){"use strict";n(143),n(314),n(144),n(130),n(460),n(129),n(128),n(315),n(316),n(249),n(186),n(248),n(145);var l=n(146),o=n(630),r=n(247),c=n(18),_=n(632),v=n(0),d=n(318),f=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),h=(n(633),n(56)),m=Object(h.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var l=e[0],details=e[1];return n("section",{key:l},[n("div",{staticClass:"slots-block__header"},[n("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(l)}}),t._v(" "),n("div",{staticClass:"slots-block__header__details"},[details.description?n("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var l=e[0],o=e[1],r=o.description,c=o.type;return n("div",{key:l,staticClass:"slots-block__scope__item"},[n("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),n("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(l)}}),t._v(" "),n("div",null===r?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(r)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var y=Object(v.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:m},setup:function(t){return{Dashes:_.Dashes,labels:Object(v.computed)((function(){var e=[],n=t.component,c=n.meta,_=c.addedVersion,v=c.deprecated,f=c.designs,h=c.typeScript,m=n.name,y=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(d.kebabCase)(m.replace(/^Kt/,"Kotti"))):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==f?Array.isArray(f)?e.push.apply(e,Object(o.a)(f.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(l.a)({},r.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(l.a)({},r.a.MetaDesignType.FIGMA,"Figma")[f.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:y?"".concat(y,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),y&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(y,"/").concat(m,".vue"),right:"".concat(m,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t){return"function"==typeof t?"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Array.isArray(t)?t.map((function(t){return t.name.toLowerCase()})).join(" | "):t.name.toLowerCase()},Yoco:c.Yoco}}}),x=(n(635),Object(h.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var l=e[0],o=e[1];return n("tr",{key:l},[n("td",[n("code",{domProps:{textContent:t._s(l)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(o.type))}})]),t._v(" "),n("td",[o.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===o.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(o.default))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:o.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:o.validator?o.validator.toString():void 0},domProps:{textContent:t._s(o.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),o.validator?n("div",{domProps:{textContent:t._s(o.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"d499df5c",null));e.a=x.exports},632:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},633:function(t,e,n){"use strict";var l=n(628);n.n(l).a},634:function(t,e,n){(e=n(104)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},635:function(t,e,n){"use strict";var l=n(629);n.n(l).a},636:function(t,e,n){(e=n(104)(!1)).push([t.i,".component-info[data-v-d499df5c]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-d499df5c]{flex-direction:row;align-items:center}}.component-info>*[data-v-d499df5c]{display:flex;margin:5px 10px}.component-info__labels[data-v-d499df5c]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-d499df5c]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-d499df5c],.component-info__label__right[data-v-d499df5c]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-d499df5c]:hover{text-decoration:underline}.component-info__label__left[data-v-d499df5c]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-d499df5c]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-d499df5c]{margin-bottom:32px}.component-info-container[data-v-d499df5c]>:not(:first-child){margin-top:16px}.danger-block[data-v-d499df5c]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-d499df5c]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-d499df5c]{margin-left:8px}.danger-block>section[data-v-d499df5c]{padding:.4rem .6rem}.danger-block>section[data-v-d499df5c]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},857:function(t,e,n){"use strict";n.r(e);var l=n(209),o=n(0),r=n(631),c=Object(o.defineComponent)({name:"DocumentationPageUsageComponentsPagination",components:{ComponentInfo:r.a},setup:function(){return{component:l.a}}}),_=n(56),component=Object(_.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("h2",[t._v("Basic Usage")]),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtPagination",{attrs:{total:50,pageSize:10}})],1),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Default Page")]),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtPagination",{attrs:{total:50,pageSize:10,page:3}})],1),t._v(" "),t._m(1),t._v(" "),n("h2",[t._v("Styles")]),t._v(" "),n("h4",[t._v("Expanded")]),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtPagination",{attrs:{pagingStyle:"expand",total:50,pageSize:10}})],1),t._v(" "),t._m(2),t._v(" "),n("h4",[t._v("Fraction")]),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtPagination",{attrs:{pagingStyle:"fraction",total:50,pageSize:10}})],1),t._v(" "),t._m(3),t._v(" "),n("h4",[t._v("Flexible")]),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtPagination",{attrs:{pagingStyle:"flex",total:500,pageSize:10}})],1),t._v(" "),t._m(4),t._v(" "),n("h4",[t._v("Extra Options")]),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtPagination",{attrs:{pagingStyle:"flex",total:500,pageSize:10,page:25,adjacentAmount:1}}),t._v(" "),n("KtPagination",{attrs:{pagingStyle:"flex",total:500,pageSize:10,page:25,adjacentAmount:2}}),t._v(" "),n("KtPagination",{attrs:{pagingStyle:"flex",total:500,pageSize:10,page:25,adjacentAmount:3}}),t._v(" "),n("br"),t._v(" "),n("KtPagination",{attrs:{pagingStyle:"flex",total:500,pageSize:10}}),t._v(" "),n("KtPagination",{attrs:{pagingStyle:"flex",total:500,pageSize:10,fixedWidth:""}})],1),t._v(" "),t._m(5),t._v(" "),n("h2",[t._v("Usage")]),t._v(" "),n("h3",[t._v("Props")]),t._v(" "),t._m(6),t._v(" "),n("h3",[t._v("Events")]),t._v(" "),t._m(7)],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"50"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"50"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":page")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"3"')]),t._v(" />")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v("\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"expand"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"50"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v("\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"fraction"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"50"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v("\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"flex"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"500"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v("\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"flex"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"500"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":page")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"25"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":adjacentAmount")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"1"')]),t._v("/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"flex"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"500"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":page")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"25"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":adjacentAmount")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"2"')]),t._v("/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"flex"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"500"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":page")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"25"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":adjacentAmount")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"3"')]),t._v("/>")]),t._v("\n\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"flex"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"500"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v("/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtPagination")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("pagingStyle")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"flex"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":total")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"500"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":pageSize")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"10"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("fixedWidth")]),t._v("/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("Attribute")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Accepted Values")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Default")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("adjacentAmount")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("number of pairs of adjacent pages to display")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Number")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("--")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("1")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("fixedWidth")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("set width based on max number of elements")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Boolean")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("True")]),t._v(", "),n("code",[t._v("False")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("False")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("page")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("the default page to show")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Number")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("--")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("--")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("pageSize")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("amount of items each page")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Number")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("--")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("10")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("pagingStyle")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("style of the pagination")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("expand")]),t._v(", "),n("code",[t._v("flex")]),t._v(", "),n("code",[t._v("fraction")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("expand")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("total")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("total amount of items")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Number")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("--")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Required")])])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("Event Name")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Parameters")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("currentPageChange")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("trigger when number clicked")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("(event: Event, payload: currentPage)")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("nextPageClicked")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("trigger when next page button clicked")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("(event: Event, payload: currentPage)")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("previousPageClicked")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("trigger when previous page button clicked")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("(event: Event, payload: currentPage)")])])])])])}],!1,null,null,null);e.default=component.exports}}]);