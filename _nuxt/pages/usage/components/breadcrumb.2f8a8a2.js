(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{647:function(t,e,o){var content=o(653);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(116).default)("dc9cb9a6",content,!0,{sourceMap:!1})},648:function(t,e,o){var content=o(655);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(116).default)("a16e466a",content,!0,{sourceMap:!1})},649:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(328);var r=o(384);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},650:function(t,e,o){"use strict";o(158),o(325),o(159),o(145),o(470),o(144),o(143),o(326),o(327),o(260),o(198),o(259),o(160);var n=o(161),r=o(649),l=o(324),c=o(16),_=o(651),d=o(0),v=o(103),m=Object(d.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(d.ref)(!1)}}}),h=(o(652),o(64)),f=Object(h.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"\n\t\t\t\t\t\t\tslots-block__scope__item__description\n\t\t\t\t\t\t\tslots-block__scope__item__description--is-empty\n\t\t\t\t\t\t",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"6a36844a",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var y=Object(d.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:_.Dashes,labels:Object(d.computed)((function(){var e=[],o=t.component,c=o.meta,_=c.addedVersion,d=c.deprecated,m=c.designs,h=c.typeScript,f=o.name,y=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(v.kebabCase)(f.replace(/^Kt/,"Kotti"))):null;return null!==d&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(d.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(r.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:y?"".concat(y,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),y&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(y,"/").concat(f,".vue"),right:"".concat(f,".vue")}),e})),showProps:Object(d.ref)(!1),stringifyDefault:function(t){return"function"==typeof t?"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Array.isArray(t)?t.map((function(t){return t.name.toLowerCase()})).join(" | "):t.name.toLowerCase()},Yoco:c.Yoco}}}),k=(o(654),Object(h.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"3ac0794d",null));e.a=k.exports},651:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},652:function(t,e,o){"use strict";var n=o(647);o.n(n).a},653:function(t,e,o){(e=o(115)(!1)).push([t.i,".slots-block[data-v-6a36844a]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-6a36844a]{padding:.4rem .6rem}.slots-block[data-v-6a36844a]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-6a36844a]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-6a36844a],.slots-block__header__details__description[data-v-6a36844a]{flex:1}.slots-block__header__details__empty-description[data-v-6a36844a]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-6a36844a]{font-style:italic}.slots-block__header__name[data-v-6a36844a]{font-weight:700}.slots-block__header>*[data-v-6a36844a]{display:flex;align-items:center}.slots-block__header[data-v-6a36844a]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-6a36844a]{margin-left:1.5rem}.slots-block__scope__item[data-v-6a36844a]{display:flex;align-items:center}.slots-block__scope__item[data-v-6a36844a]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-6a36844a]{font-style:italic}.slots-block__scope__item__name[data-v-6a36844a]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-6a36844a]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-6a36844a]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-6a36844a]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-6a36844a]{color:var(--green-50)}",""]),t.exports=e},654:function(t,e,o){"use strict";var n=o(648);o.n(n).a},655:function(t,e,o){(e=o(115)(!1)).push([t.i,".component-info[data-v-3ac0794d]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-3ac0794d]{flex-direction:row;align-items:center}}.component-info>*[data-v-3ac0794d]{display:flex;margin:5px 10px}.component-info__labels[data-v-3ac0794d]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-3ac0794d]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-3ac0794d],.component-info__label__right[data-v-3ac0794d]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-3ac0794d]:hover{text-decoration:underline}.component-info__label__left[data-v-3ac0794d]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-3ac0794d]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-3ac0794d]{margin-bottom:32px}.component-info-container[data-v-3ac0794d]>:not(:first-child){margin-top:16px}.danger-block[data-v-3ac0794d]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-3ac0794d]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-3ac0794d]{margin-left:8px}.danger-block>section[data-v-3ac0794d]{padding:.4rem .6rem}.danger-block>section[data-v-3ac0794d]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},861:function(t,e,o){"use strict";o.r(e);var n=o(229),r=o(0),l=o(438),c=o(650),_=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsBreadcrumb",components:{ComponentInfo:c.a},setup:function(){var t=Object(l.a)();return{component:n.a,links:[{title:"Kotti",onClick:function(){return t.value.push("/")},isCompleted:!0},{title:"Usage",onClick:function(){return t.value.push("#")},isCompleted:!0},{title:"Components",onClick:function(){return t.value.push("#")},isCompleted:!0},{title:"Breadcrumbs",onClick:function(){return t.value.push("/usage/components/breadcrumb")},isCompleted:!1}],textSeparator:{style:"text",value:"/"}}}}),d=o(64),component=Object(d.a)(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("p",[t._v("Indicate the current page’s location within a navigational hierarchy.")]),t._v(" "),o("h2",[t._v("Basic")]),t._v(" "),o("div",{staticClass:"element-example white"},[o("KtBreadcrumb",{attrs:{breadcrumbs:t.links}})],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),o("h2",[t._v("Separator Style")]),t._v(" "),o("div",{staticClass:"element-example white"},[o("KtBreadcrumb",{attrs:{breadcrumbs:t.links,separator:t.textSeparator}})],1),t._v(" "),t._m(2),t._v(" "),t._m(3)],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtBreadcrumb")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":breadcrumbs")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"links"')]),t._v(" />")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-js"},[t._v("links: [\n\t{\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'Kotti'")]),t._v(",\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),o("span",{staticClass:"hljs-function"},[o("span",{staticClass:"hljs-params"},[t._v("()")]),t._v(" =>")]),t._v(" "),o("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".$router.push("),o("span",{staticClass:"hljs-string"},[t._v("'/'")]),t._v("),\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("isCompleted")]),t._v(": "),o("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t},\n\t{\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'Components'")]),t._v(",\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),o("span",{staticClass:"hljs-function"},[o("span",{staticClass:"hljs-params"},[t._v("()")]),t._v(" =>")]),t._v(" "),o("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".$router.push("),o("span",{staticClass:"hljs-string"},[t._v("'/components'")]),t._v("),\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("isCompleted")]),t._v(": "),o("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t},\n\t{\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'Breadcrumbs'")]),t._v(",\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),o("span",{staticClass:"hljs-function"},[o("span",{staticClass:"hljs-params"},[t._v("()")]),t._v(" =>")]),t._v(" "),o("span",{staticClass:"hljs-keyword"},[t._v("this")]),t._v(".$router.push("),o("span",{staticClass:"hljs-string"},[t._v("'/usage/components/breadcrumb'")]),t._v("),\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("isCompleted")]),t._v(": "),o("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t},\n]\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtBreadcrumb")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":breadcrumbs")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"links"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":separator")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"textSeparator"')]),t._v(" />")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-js"},[o("span",{staticClass:"hljs-comment"},[t._v("// default separator")]),t._v("\n"),o("span",{staticClass:"hljs-attr"},[t._v("iconSeparator")]),t._v(": {\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("style")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'icon'")]),t._v(",\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("value")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'chevron_right'")]),t._v("\n},\n"),o("span",{staticClass:"hljs-attr"},[t._v("textSeparator")]),t._v(": {\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("style")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'text'")]),t._v(",\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("value")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'/'")]),t._v("\n},\n")])])}],!1,null,null,null);e.default=component.exports}}]);