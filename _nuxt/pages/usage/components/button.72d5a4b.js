(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{687:function(t,e,n){var content=n(693);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(111).default)("24122391",content,!0,{sourceMap:!1})},688:function(t,e,n){var content=n(695);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(111).default)("3377c674",content,!0,{sourceMap:!1})},689:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(325);var l=n(388);function r(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},690:function(t,e,n){"use strict";n(324),n(471),n(150),n(215),n(264),n(112),n(214),n(387),n(265);var o=n(91),l=n(689),r=n(323),c=n(5),_=n(691),v=n(0),d=n(46),h=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(v.ref)(!1)}}}),m=(n(692),n(65)),f=Object(m.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var o=e[0],details=e[1];return n("section",{key:o},[n("div",{staticClass:"slots-block__header"},[n("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",{staticClass:"slots-block__header__details"},[details.description?n("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var o=e[0],l=e[1],r=l.description,c=l.type;return n("div",{key:o,staticClass:"slots-block__scope__item"},[n("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),n("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",null===r?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(r)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"1f580630",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var y=Object(v.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:f},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:_.Dashes,labels:Object(v.computed)((function(){var e=[],n=t.component,c=n.meta,_=c.addedVersion,v=c.componentFolder,h=c.deprecated,m=c.designs,f=c.typeScript,y=n.name,j=null!=v?v:Object(d.kebabCase)(y.replace(/^Kt/,"Kotti")),x=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(j):null;return null!==h&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(h.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(l.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(o.a)({},r.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(o.a)({},r.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),f&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:x?"".concat(x,"/types.ts"):void 0,right:f.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),x&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(x,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(d.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(d.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),j=(n(694),Object(m.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var o=e[0],l=e[1];return n("tr",{key:o},[n("td",[n("code",{domProps:{textContent:t._s(o)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),n("td",[l.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(l.default,l.type))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?n("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"7a5883f0",null));e.a=j.exports},691:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},692:function(t,e,n){"use strict";var o=n(687);n.n(o).a},693:function(t,e,n){(e=n(110)(!1)).push([t.i,".slots-block[data-v-1f580630]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-1f580630]{padding:.4rem .6rem}.slots-block[data-v-1f580630]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-1f580630]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-1f580630],.slots-block__header__details__description[data-v-1f580630]{flex:1}.slots-block__header__details__empty-description[data-v-1f580630]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-1f580630]{font-style:italic}.slots-block__header__name[data-v-1f580630]{font-weight:700}.slots-block__header>*[data-v-1f580630]{display:flex;align-items:center}.slots-block__header[data-v-1f580630]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-1f580630]{margin-left:1.5rem}.slots-block__scope__item[data-v-1f580630]{display:flex;align-items:center}.slots-block__scope__item[data-v-1f580630]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-1f580630]{font-style:italic}.slots-block__scope__item__name[data-v-1f580630]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-1f580630]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-1f580630]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-1f580630]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-1f580630]{color:var(--green-50)}",""]),t.exports=e},694:function(t,e,n){"use strict";var o=n(688);n.n(o).a},695:function(t,e,n){(e=n(110)(!1)).push([t.i,".table-style[data-v-7a5883f0],table[data-v-7a5883f0]{width:100%;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;table-layout:auto;border-collapse:collapse}.table-style .th-style[data-v-7a5883f0],.table-style th[data-v-7a5883f0],table .th-style[data-v-7a5883f0],table th[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);font-size:.6rem;line-height:1em;color:#8f8f8f;text-align:inherit;text-transform:uppercase;border-bottom:.05rem solid #dbdbdb}.table-style .tr-style[data-v-7a5883f0],.table-style tr[data-v-7a5883f0],table .tr-style[data-v-7a5883f0],table tr[data-v-7a5883f0]{margin:0}.table-style .td-style[data-v-7a5883f0],.table-style td[data-v-7a5883f0],table .td-style[data-v-7a5883f0],table td[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);line-height:1.2rem;border-bottom:1px solid #dbdbdb}.table-style i[data-v-7a5883f0],table i[data-v-7a5883f0]{margin:0 .2rem;font-size:1rem!important;color:#8a8a8a}.component-info[data-v-7a5883f0]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-7a5883f0]{flex-direction:row;align-items:center}}.component-info>*[data-v-7a5883f0]{display:flex;margin:5px 10px}.component-info__labels[data-v-7a5883f0]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-7a5883f0]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-7a5883f0],.component-info__label__right[data-v-7a5883f0]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-7a5883f0]:hover{text-decoration:underline}.component-info__label__left[data-v-7a5883f0]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-7a5883f0]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-7a5883f0]{margin-bottom:32px}.component-info-container[data-v-7a5883f0]>:not(:first-child){margin-top:16px}.danger-block[data-v-7a5883f0]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-7a5883f0]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-7a5883f0]{margin-left:8px}.danger-block>section[data-v-7a5883f0]{padding:.4rem .6rem}.danger-block>section[data-v-7a5883f0]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},828:function(t,e,n){t.exports=n.p+"img/button_label.184f383.png"},967:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:n(828),alt:"Button labels"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("Yes/No")]),this._v(" buttons are not self-explanatory, the user needs to read the"),e("br"),this._v("\ncontext to understand the action. Using "),e("code",[this._v("Cancel/Replace")]),this._v(" buttons"),e("br"),this._v("\nlet the user respond quickly without thinking.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Primary button")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Use the primary button to lead a main call to"),e("br"),this._v("\naction, such as changing the status of an order, or submitting a form. We suggest"),e("br"),this._v("\nonly using one primary button on each page (not including the primary button"),e("br"),this._v("\non a different layer). If there is another strong action needed, compare"),e("br"),this._v("\ntheir priority and choose the most important one.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Secondary Button")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Danger Button")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The danger button should be used only for actions which can't be undone."),e("br"),this._v("\nFor example, canceling an order or deleting a material. Like the primary button, it should also limited to once per page.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Default button")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",[this._v("Text button")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("A text button can be used for sub-menus and page navigation. It also can pair with a primary button for destructive actions such as "),e("code",[this._v("Cancel")]),this._v(".")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("Instead of using the default slot, you can also provide text via the "),n("code",[t._v("label")]),t._v(" property. Note that "),n("code",[t._v("v-text")]),t._v(" and "),n("code",[t._v("v-t")]),t._v(" are "),n("strong",[t._v("NOT SUPPORTED")]),t._v(".")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Edit Button"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("strong",[t._v("Label only:")]),t._v(" Used in most cases.")]),t._v(" "),n("li",[n("strong",[t._v("Icon and label:")]),t._v(" Use when you need to catch the user's attention.")]),t._v(" "),n("li",[n("strong",[t._v("Icon only:")]),t._v(" Use when you have limited space, such as when the page needs to fit on a mobile device, and a single icon is enough to convey the meaning,")]),t._v(" "),n("li",[n("strong",[t._v("iconPosition")]),t._v(" prop can be used to place icon to the right of the label. Is left by default.")]),t._v(" "),n("li",[n("strong",[t._v("helpText")]),t._v(" prop can be passed to "),n("strong",[t._v("Icon only")]),t._v(" buttons that is displayed on button hover.")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(">")]),t._v("Edit button"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Edit Button"')]),t._v(" />")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("helpText")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"This is an icon button"')]),t._v("/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Right Icon Button"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("iconPosition")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"right"')]),t._v("/>")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",[e("code",[this._v("toggleStatus")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[t._v("For buttons that are "),n("strong",[t._v("toggleable")]),t._v(', and can have two different status: "ON" or "OFF"')]),t._v(" "),n("li",[t._v("This prop is only valid for buttons of type "),n("strong",[t._v('"default"')]),t._v(" or type "),n("strong",[t._v('"text"')]),t._v(".")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",[e("code",[this._v("isMultiline")]),this._v("/"),e("code",[this._v("isBlock")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("For handling long text, we can use the "),e("code",[this._v("isMultiline")]),this._v(" and "),e("code",[this._v("isBlock")]),this._v(" properties.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("Purchase"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("isMultiline")]),t._v(">")]),t._v("Purchase this product without the 5 year garantee and proceed with the 2 year only garantee"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("isLoading")]),t._v(">")]),t._v("Loading button"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("isLoading")]),t._v(">")]),t._v("Loading button"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"secondary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("isLoading")]),t._v("/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"danger"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("isLoading")]),t._v("/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButtonGroup")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(">")]),t._v("Edit"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"secondary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"trash"')]),t._v(">")]),t._v("Delete"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButtonGroup")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("code",[t._v("KtButton")]),t._v(" has 3 size: "),n("code",[t._v("small")]),t._v(", "),n("code",[t._v("medium")]),t._v(" and "),n("code",[t._v("large")]),t._v(".")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v("\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("size")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"small"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"mr-16px"')]),t._v(">")]),t._v("Small"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("isLoading")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("size")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"medium"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"mr-16px"')]),t._v(">")]),t._v("Medium (Default)"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("size")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"large"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(">")]),t._v("Large"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",[e("code",[this._v("isSubmit")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("If you want the button to trigger the native "),e("code",[this._v("form")]),this._v(" "),e("code",[this._v("submit")]),this._v(" event, you need to opt-in via "),e("code",[this._v("<KtButton isSubmit/>")])])}],l=n(122),r=n(323),c=n(0),_=n(690),v=Object(c.defineComponent)({name:"DocumentationPageUsageComponentsButton",components:{ComponentInfo:_.a},setup:function(){var t=Object(c.ref)(r.a.Button.ToggleStatus.OFF),e=Object(c.ref)(r.a.Button.ToggleStatus.OFF);return{alert:function(t){return window.alert(t)},component:l.a,onToggleDefaultClick:function(e){t.value=e},onToggleTextClick:function(t){e.value=t},toggleDefaultIcon:Object(c.computed)((function(){return t.value===r.a.Button.ToggleStatus.ON?"check":"close"})),toggleDefaultLabel:Object(c.computed)((function(){return t.value===r.a.Button.ToggleStatus.ON?"DEFAULT ON":"DEFAULT OFF"})),toggleDefaultStatus:t,toggleTextIcon:Object(c.computed)((function(){return e.value===r.a.Button.ToggleStatus.ON?"check":"close"})),toggleTextLabel:Object(c.computed)((function(){return e.value===r.a.Button.ToggleStatus.ON?"TEXT ON":"TEXT OFF"})),toggleTextStatus:e}}}),d=n(65),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("p",[t._v("Use buttons to lead a call to action or guide a user to their next steps.")]),t._v(" "),n("h2",[t._v("Labels")]),t._v(" "),n("p",[t._v("The label text explains the purpose of the button, which should be clear, self-explanatory and short.")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),n("h2",[t._v("Types")]),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"primary"},on:{click:function(e){return t.alert("primary")}}},[t._v("Primary Button")]),t._v(" "),n("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"secondary"},on:{click:function(e){return t.alert("secondary")}}},[t._v("Secondary Button")]),t._v(" "),n("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"danger"},on:{click:function(e){return t.alert("danger")}}},[t._v("Danger Button")]),t._v(" "),n("KtButton",{staticClass:"mt-4 mr-4",on:{click:function(e){return t.alert("default")}}},[t._v("Default Button")]),t._v(" "),n("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"text"},on:{click:function(e){return t.alert("text")}}},[t._v("Text Button")])],1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),n("p",[t._v("Use a secondary button only when there is a main call to action in the page.")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),n("p",[t._v("This button can be used in most cases.")]),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),n("h2",[t._v("Label")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtButton",{attrs:{type:"primary",icon:"edit",label:"Edit Button"}})],1),t._v(" "),t._m(10),t._v(" "),t._m(11),t._v(" "),n("h2",[t._v("Icon")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtButton",{staticClass:"mr-4",attrs:{type:"primary"}},[t._v("Edit button")]),t._v(" "),n("KtButton",{staticClass:"mr-4",attrs:{type:"primary",icon:"edit",label:"Edit Button"}}),t._v(" "),n("KtButton",{attrs:{type:"primary",icon:"edit",label:"Right Icon Button",iconPosition:"right"}}),t._v(" "),n("KtButton",{attrs:{type:"primary",icon:"edit",helpText:"This is an icon button"}})],1),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtButton",{staticClass:"mr-4",attrs:{type:"default",icon:t.toggleDefaultIcon,toggleStatus:t.toggleDefaultStatus},on:{"update:toggleStatus":function(e){return t.onToggleDefaultClick(e)}}},[t._v(t._s(t.toggleDefaultLabel))]),t._v(" "),n("KtButton",{staticClass:"mr-4",attrs:{type:"text",icon:t.toggleTextIcon,toggleStatus:t.toggleTextStatus,label:t.toggleTextLabel},on:{"update:toggleStatus":function(e){return t.onToggleTextClick(e)}}})],1),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),t._m(18),t._v(" "),n("div",{staticClass:"element-example"},[n("div",{staticStyle:{width:"200px"}},[n("KtButton",{attrs:{block:"",type:"primary"}},[t._v("Purchase")]),n("br"),t._v(" "),n("KtButton",{attrs:{icon:"save",isBlock:"",isMultiline:""}},[t._v("Purchase this product without the 5 year garantee")]),n("br"),t._v(" "),n("KtButton",{attrs:{isBlock:"",isMultiline:""}},[t._v("Purchase this product without the 5 year garantee and proceed with the 2 year only garantee")])],1),t._v(" "),n("br"),t._v(" "),n("br"),t._v(" "),n("KtButton",{attrs:{isMultiline:""}},[t._v("Multiline works on one line if the parent does not constraint the width")]),n("br"),t._v(" "),n("KtButton",{attrs:{isMultiline:""}},[t._v("(But the height is less reliable as it uses "),n("code",[t._v("line-height")]),t._v(")")])],1),t._v(" "),n("h2",[t._v("Loading")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtButton",{staticClass:"mr-16px",attrs:{isLoading:"",icon:"edit"}},[t._v("Loading button")]),t._v(" "),n("KtButton",{staticClass:"mr-16px",attrs:{type:"primary",isLoading:"",icon:"edit",iconPosition:"right"}},[t._v("Loading button")]),t._v(" "),n("KtButton",{staticClass:"mr-16px",attrs:{type:"secondary",isLoading:""}},[t._v("Loading")]),t._v(" "),n("KtButton",{staticClass:"mr-16px",attrs:{type:"danger",isLoading:""}},[t._v("Loading")])],1),t._v(" "),t._m(19),t._v(" "),n("h2",[t._v("Button Group")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtButtonGroup",[n("KtButton",{attrs:{type:"primary",icon:"edit"}},[t._v("Edit")]),t._v(" "),n("KtButton",{attrs:{type:"secondary",icon:"trash"}},[t._v("Delete")])],1)],1),t._v(" "),t._m(20),t._v(" "),n("h2",[t._v("Size")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtButton",{staticClass:"mr-16px",attrs:{type:"primary",size:"small",icon:"edit"}},[t._v("Small")]),t._v(" "),n("KtButton",{staticClass:"mr-16px",attrs:{isLoading:"",size:"medium"}},[t._v("Medium (Default)")]),t._v(" "),n("KtButton",{attrs:{size:"large",icon:"edit"}},[t._v("Large")])],1),t._v(" "),t._m(21),t._v(" "),t._m(22),t._v(" "),t._m(23),t._v(" "),t._m(24)],1)}),o,!1,null,null,null);e.default=component.exports}}]);