(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{714:function(t,e,o){var content=o(720);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(112).default)("6285525e",content,!0,{sourceMap:!1})},715:function(t,e,o){var content=o(722);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(112).default)("43cccb2f",content,!0,{sourceMap:!1})},716:function(t,e,o){"use strict";o.d(e,"a",(function(){return r}));var n=o(344);var l=o(406);function r(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},717:function(t,e,o){"use strict";o(165),o(341),o(163),o(166),o(509),o(164),o(405),o(144),o(342),o(343),o(276),o(99),o(213),o(168),o(275),o(167);var n=o(69),l=o(716),r=o(340),c=o(11),_=o(718),d=o(0),v=o(86),m=Object(d.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(d.ref)(!1)}}}),h=(o(719),o(55)),f=Object(h.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],l=e[1],r=l.description,c=l.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===r?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(r)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var y=Object(d.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:_.Dashes,labels:Object(d.computed)((function(){var e=[],o=t.component,c=o.meta,_=c.addedVersion,d=c.deprecated,m=c.designs,h=c.typeScript,f=o.name,y=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(v.kebabCase)(f.replace(/^Kt/,"Kotti"))):null;return null!==d&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(d.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(l.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},r.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},r.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:y?"".concat(y,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),y&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(y,"/").concat(f,".vue"),right:"".concat(f,".vue")}),e})),showProps:Object(d.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(v.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(v.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),j=(o(721),Object(h.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],l=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),o("td",[l.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(l.default,l.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?o("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"40fb8180",null));e.a=j.exports},718:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},719:function(t,e,o){"use strict";var n=o(714);o.n(n).a},720:function(t,e,o){(e=o(111)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},721:function(t,e,o){"use strict";var n=o(715);o.n(n).a},722:function(t,e,o){(e=o(111)(!1)).push([t.i,".component-info[data-v-40fb8180]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-40fb8180]{flex-direction:row;align-items:center}}.component-info>*[data-v-40fb8180]{display:flex;margin:5px 10px}.component-info__labels[data-v-40fb8180]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-40fb8180]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-40fb8180],.component-info__label__right[data-v-40fb8180]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-40fb8180]:hover{text-decoration:underline}.component-info__label__left[data-v-40fb8180]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-40fb8180]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-40fb8180]{margin-bottom:32px}.component-info-container[data-v-40fb8180]>:not(:first-child){margin-top:16px}.danger-block[data-v-40fb8180]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-40fb8180]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-40fb8180]{margin-left:8px}.danger-block>section[data-v-40fb8180]{padding:.4rem .6rem}.danger-block>section[data-v-40fb8180]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},972:function(t,e,o){"use strict";o.r(e);var n=o(251),l=o(0),r=o(717),c=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsCards",components:{ComponentInfo:r.a},setup:function(){return{component:n.a}}}),_=o(55),component=Object(_.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("h2",[t._v("Structure")]),t._v(" "),o("div",{staticClass:"element-example"},[o("KtCard",[o("div",{attrs:{slot:"card-header"},slot:"card-header"},[o("h2",[t._v("Lorem Ipsum")]),t._v(" "),o("b",[t._v("consectetur adipiscing elit")])]),t._v(" "),o("div",{attrs:{slot:"card-body"},slot:"card-body"},[o("p",[t._v("Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\tPhasellus consequat nisl at nisl condimentum vehicula.\n\t\t\t")])]),t._v(" "),o("div",{attrs:{slot:"card-footer"},slot:"card-footer"},[o("KtButton",{attrs:{label:"Button"}})],1)])],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),o("h2",[t._v("Images and Position")]),t._v(" "),o("div",{staticClass:"element-example"},[o("KtRow",{attrs:{gap:16}},[o("KtCol",{attrs:{span:8}},[o("KtCard",{attrs:{imgUrl:"https://picsum.photos/900/300"}},[o("div",{attrs:{slot:"card-header"},slot:"card-header"},[o("h2",[t._v("Lorem Ipsum")])]),t._v(" "),o("div",{attrs:{slot:"card-body"},slot:"card-body"},[o("p",[t._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\tPhasellus consequat nisl at nisl condimentum vehicula.\n\t\t\t\t\t")])])])],1),t._v(" "),o("KtCol",{attrs:{span:8}},[o("KtCard",{attrs:{imgUrl:"https://picsum.photos/900/300",imgPosition:"middle"}},[o("div",{attrs:{slot:"card-header"},slot:"card-header"},[o("h2",[t._v("Lorem Ipsum")])]),t._v(" "),o("div",{attrs:{slot:"card-body"},slot:"card-body"},[o("p",[t._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\tPhasellus consequat nisl at nisl condimentum vehicula.\n\t\t\t\t\t")])]),t._v(" "),o("div",{attrs:{slot:"card-footer"},slot:"card-footer"},[t._v("\n\t\t\t\t\tThis is the end\n\t\t\t\t")])])],1),t._v(" "),o("KtCol",{attrs:{span:8}},[o("KtCard",{attrs:{imgUrl:"https://picsum.photos/900/300",imgPosition:"bottom"}},[o("div",{attrs:{slot:"card-header"},slot:"card-header"},[o("h2",[t._v("Lorem Ipsum")])]),t._v(" "),o("div",{attrs:{slot:"card-body"},slot:"card-body"},[o("p",[t._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t\t\t\tPhasellus consequat nisl at nisl condimentum vehicula.\n\t\t\t\t\t")])]),t._v(" "),o("div",{attrs:{slot:"card-footer"},slot:"card-footer"},[t._v("\n\t\t\t\t\tThis is the end\n\t\t\t\t")])])],1)],1)],1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),o("h2",[t._v("Usage")]),t._v(" "),o("h3",[t._v("Attributes")]),t._v(" "),t._m(5)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The Card component has slots for the "),e("code",[this._v("card-header")]),this._v(", "),e("code",[this._v("card-body")]),this._v(", and "),e("code",[this._v("card-footer")]),this._v(":")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtCard")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"card-header"')]),t._v(">")]),t._v("\n\t\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("h2")]),t._v(">")]),t._v("Lorem Ipsum"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("h2")]),t._v(">")]),t._v("\n\t\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("b")]),t._v(">")]),t._v("consectetur adipiscing elit"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("b")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"card-body"')]),t._v(">")]),t._v("\n\t\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("p")]),t._v(">")]),t._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus\n\t\t\tconsequat nisl at nisl condimentum vehicula.\n\t\t"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("p")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"card-footer"')]),t._v(">")]),t._v("This is the end"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtCard")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The "),e("code",[this._v("imgUrl")]),this._v(" property defines the image’s "),e("code",[this._v("url")]),this._v(".")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("p",[o("code",[t._v("imgPosition")]),t._v(" sets the image position. Valid values are "),o("code",[t._v("top")]),t._v(", "),o("code",[t._v("middle")]),t._v(" and "),o("code",[t._v("bottom")]),t._v(".")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtCard")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("imgUrl")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"https://picsum.photos/900/300"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("imgPosition")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"middle"')]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"card-header"')]),t._v(">")]),t._v("\n\t\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("h2")]),t._v(">")]),t._v("Lorem Ipsum"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("h2")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"card-body"')]),t._v(">")]),t._v("\n\t\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("p")]),t._v(">")]),t._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus\n\t\t\tconsequat nisl at nisl condimentum vehicula.\n\t\t"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("p")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"card-footer"')]),t._v(">")]),t._v("This is the end"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtCard")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("table",[o("thead",[o("tr",[o("th",{staticStyle:{"text-align":"left"}},[t._v("Attribute")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Accepted Values")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Default")])])]),t._v(" "),o("tbody",[o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("imgPosition")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("postion of image in the card")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v('"top"')]),t._v(", "),o("code",[t._v('"middle"')]),t._v(", "),o("code",[t._v('"bottom"')])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("top")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("imgUrl")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("url of image")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")])])])])}],!1,null,null,null);e.default=component.exports}}]);