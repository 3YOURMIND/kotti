(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{722:function(t,e,n){var content=n(728);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(114).default)("6285525e",content,!0,{sourceMap:!1})},723:function(t,e,n){var content=n(730);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(114).default)("43cccb2f",content,!0,{sourceMap:!1})},724:function(t,e,n){"use strict";n(167),n(342),n(165),n(168),n(513),n(166),n(404),n(145),n(343),n(344),n(274),n(104),n(211),n(170),n(273),n(169);var o=n(78),l=n(725),r=n(341),c=n(11),_=n(726),v=n(0),d=n(125),m=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),h=(n(727),n(62)),f=Object(h.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var o=e[0],details=e[1];return n("section",{key:o},[n("div",{staticClass:"slots-block__header"},[n("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",{staticClass:"slots-block__header__details"},[details.description?n("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var o=e[0],l=e[1],r=l.description,c=l.type;return n("div",{key:o,staticClass:"slots-block__scope__item"},[n("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),n("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",null===r?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(r)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var j=Object(v.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:_.Dashes,labels:Object(v.computed)((function(){var e=[],n=t.component,c=n.meta,_=c.addedVersion,v=c.deprecated,m=c.designs,h=c.typeScript,f=n.name,j=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(d.kebabCase)(f.replace(/^Kt/,"Kotti"))):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(l.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(o.a)({},r.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(o.a)({},r.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:j?"".concat(j,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),j&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(j,"/").concat(f,".vue"),right:"".concat(f,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(d.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(d.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),y=(n(729),Object(h.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var o=e[0],l=e[1];return n("tr",{key:o},[n("td",[n("code",{domProps:{textContent:t._s(o)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),n("td",[l.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(l.default,l.type))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?n("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"40fb8180",null));e.a=y.exports},725:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(345);var l=n(405);function r(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},726:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},727:function(t,e,n){"use strict";var o=n(722);n.n(o).a},728:function(t,e,n){(e=n(113)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},729:function(t,e,n){"use strict";var o=n(723);n.n(o).a},730:function(t,e,n){(e=n(113)(!1)).push([t.i,".component-info[data-v-40fb8180]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-40fb8180]{flex-direction:row;align-items:center}}.component-info>*[data-v-40fb8180]{display:flex;margin:5px 10px}.component-info__labels[data-v-40fb8180]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-40fb8180]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-40fb8180],.component-info__label__right[data-v-40fb8180]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-40fb8180]:hover{text-decoration:underline}.component-info__label__left[data-v-40fb8180]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-40fb8180]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-40fb8180]{margin-bottom:32px}.component-info-container[data-v-40fb8180]>:not(:first-child){margin-top:16px}.danger-block[data-v-40fb8180]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-40fb8180]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-40fb8180]{margin-left:8px}.danger-block>section[data-v-40fb8180]{padding:.4rem .6rem}.danger-block>section[data-v-40fb8180]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},988:function(t,e,n){"use strict";n.r(e);var o=n(341),l=n(0),r=n(724),c=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsLoading",components:{ComponentInfo:r.a},setup:function(){return{component:{name:"Loadings",meta:{addedVersion:null,deprecated:null,designs:{type:o.a.MetaDesignType.FIGMA,url:"https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=99%3A45"},slots:{},typeScript:null}}}}}),_=n(62),v=Object(_.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("h2",[t._v("Skeleton Screen")]),t._v(" "),n("p",[t._v("A skeleton screen gives a visual cue that content is loading one after the other into each UI element area. We suggest using skeleton screen for content densitive pages.")]),t._v(" "),n("p",[t._v("There are three types of skeleton elements:")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),n("p",[t._v("Rectangle skeleton with different height.")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),n("h2",[t._v("Spin Loading")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16)],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ol",[n("li",[n("strong",[t._v("Circle:")]),t._v(" Cicular shape which width and height are equal to parents' width, class name "),n("code",[t._v("circle")]),t._v(";")]),t._v(" "),n("li",[n("strong",[t._v("Square:")]),t._v(" Width and height are equal to parents' width, class name "),n("code",[t._v("square")]),t._v(";")]),t._v(" "),n("li",[n("strong",[t._v("Rectangle:")]),t._v(" Width equals to parents, height can be medium "),n("code",[t._v("md")]),t._v(" or large "),n("code",[t._v("lg")]),t._v(".")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"element-example"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column col-2"},[e("div",{staticClass:"skeleton circle"})]),this._v(" "),e("div",{staticClass:"column col-2"},[e("div",{staticClass:"skeleton square"})]),this._v(" "),e("div",{staticClass:"column col-8"},[e("div",{staticClass:"skeleton rectangle md"}),this._v(" "),e("div",{staticClass:"skeleton rectangle md"}),this._v(" "),e("div",{staticClass:"skeleton rectangle md"}),this._v(" "),e("div",{staticClass:"skeleton rectangle md"}),this._v(" "),e("div",{staticClass:"skeleton rectangle md"})])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"skeleton circle"')]),t._v(" />")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"skeleton square"')]),t._v("/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"skeleton rectangle"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"element-example"},[e("div",{staticClass:"skeleton rectangle"}),this._v(" "),e("div",{staticClass:"skeleton rectangle md"}),this._v(" "),e("div",{staticClass:"skeleton rectangle md"}),this._v(" "),e("div",{staticClass:"skeleton rectangle lg"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"skeleton rectangle"')]),t._v("/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"skeleton rectangle md"')]),t._v("/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"skeleton rectangle md"')]),t._v("/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"skeleton rectangle lg"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Loading indicator is used for loading and updating. "),e("code",[this._v("loading")]),this._v(" class is regular size, "),e("code",[this._v("lg")]),this._v(" is large size.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"element-example"},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column col-6"},[e("div",{staticClass:"loading"})]),this._v(" "),e("div",{staticClass:"column col-6"},[e("div",{staticClass:"loading lg"})])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"loading"')]),t._v("/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"loading lg"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can also use animated loading indicator inline "),e("code",[this._v("inline")]),this._v(" with other elements.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",[e("div",{staticClass:"loading inline"}),this._v("\n\tUploading\n")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"loading inline"')]),t._v(">")]),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t\t Uploading\n"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Using "),e("code",[this._v("white")]),this._v(" class can change the ring color to white.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"primary"},[e("div",{staticClass:"loading inline white"}),this._v("\n\t\t Uploading\n")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"loading inline white"')]),t._v(">")]),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t\tUploading\n"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Using "),e("code",[this._v("gray")]),this._v(" class can change the ring color to gray.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"primary"},[e("div",{staticClass:"loading inline gray"}),this._v("\n\t\t Uploading\n")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"loading inline gray"')]),t._v(">")]),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t\tUploading\n"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("button")]),t._v(">")]),t._v("\n")])])}],!1,null,null,null);e.default=v.exports}}]);