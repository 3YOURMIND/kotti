(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{720:function(t,e,n){var content=n(726);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(114).default)("6285525e",content,!0,{sourceMap:!1})},721:function(t,e,n){var content=n(728);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(114).default)("43cccb2f",content,!0,{sourceMap:!1})},722:function(t,e,n){"use strict";n(163),n(340),n(161),n(164),n(511),n(162),n(402),n(143),n(341),n(342),n(272),n(105),n(209),n(166),n(271),n(165);var o=n(78),r=n(723),l=n(339),c=n(11),_=n(724),v=n(0),d=n(123),f=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),h=(n(725),n(61)),m=Object(h.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var o=e[0],details=e[1];return n("section",{key:o},[n("div",{staticClass:"slots-block__header"},[n("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",{staticClass:"slots-block__header__details"},[details.description?n("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var o=e[0],r=e[1],l=r.description,c=r.type;return n("div",{key:o,staticClass:"slots-block__scope__item"},[n("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),n("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",null===l?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var y=Object(v.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:m},setup:function(t){return{Dashes:_.Dashes,labels:Object(v.computed)((function(){var e=[],n=t.component,c=n.meta,_=c.addedVersion,v=c.deprecated,f=c.designs,h=c.typeScript,m=n.name,y=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(d.kebabCase)(m.replace(/^Kt/,"Kotti"))):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==f?Array.isArray(f)?e.push.apply(e,Object(r.a)(f.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(o.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(o.a)({},l.a.MetaDesignType.FIGMA,"Figma")[f.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:y?"".concat(y,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),y&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(y,"/").concat(m,".vue"),right:"".concat(m,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(d.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(d.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),k=(n(727),Object(h.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var o=e[0],r=e[1];return n("tr",{key:o},[n("td",[n("code",{domProps:{textContent:t._s(o)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),n("td",[r.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?n("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"40fb8180",null));e.a=k.exports},723:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var o=n(343);var r=n(403);function l(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},724:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},725:function(t,e,n){"use strict";var o=n(720);n.n(o).a},726:function(t,e,n){(e=n(113)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},727:function(t,e,n){"use strict";var o=n(721);n.n(o).a},728:function(t,e,n){(e=n(113)(!1)).push([t.i,".component-info[data-v-40fb8180]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-40fb8180]{flex-direction:row;align-items:center}}.component-info>*[data-v-40fb8180]{display:flex;margin:5px 10px}.component-info__labels[data-v-40fb8180]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-40fb8180]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-40fb8180],.component-info__label__right[data-v-40fb8180]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-40fb8180]:hover{text-decoration:underline}.component-info__label__left[data-v-40fb8180]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-40fb8180]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-40fb8180]{margin-bottom:32px}.component-info-container[data-v-40fb8180]>:not(:first-child){margin-top:16px}.danger-block[data-v-40fb8180]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-40fb8180]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-40fb8180]{margin-left:8px}.danger-block>section[data-v-40fb8180]{padding:.4rem .6rem}.danger-block>section[data-v-40fb8180]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},951:function(t,e,n){t.exports=n.p+"img/navbar.1f46ebf.png"},994:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:n(951),alt:"Navbar Structure"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("KtNavbar")]),this._v(" has four components:")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ol",[n("li",[n("strong",[t._v("Notification:")]),t._v(" Shows global notification with number indicator")]),t._v(" "),n("li",[n("strong",[t._v("Menu:")]),t._v(" Navigation links")]),t._v(" "),n("li",[n("strong",[t._v("Quick Links:")]),t._v(" Customizable quick links")]),t._v(" "),n("li",[n("strong",[t._v("Navbar Footer:")]),t._v(" Customizable slots")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtNavbar")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":notification")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"notificationData"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":sections")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"menuData"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":quickLinks")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"quickLinksData"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("logoClick")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"redirect($event)"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("linkClick")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"redirect($event)"')]),t._v("\n/>")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("To show notifications in "),e("code",[this._v("KtNavbar")]),this._v(", you can use the "),e("code",[this._v("notification")]),this._v(" prop.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[t._v("notificationData: {\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("showNotification")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("number")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("1")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Message'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("link")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'/messages'")]),t._v("\n}\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("This is how you display navigation links in "),e("code",[this._v("KtNavbar")]),this._v(":")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[t._v("menuData: [\n\t{\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Order Management'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("links")]),t._v(": [\n\t\t\t{\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'invoice'")]),t._v(",\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isActive")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("props")]),t._v(": {\n\t\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("href")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(",\n\t\t\t\t},\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Orders'")]),t._v(",\n\t\t\t},\n\t\t\t{\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'request'")]),t._v(",\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isActive")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("props")]),t._v(": {\n\t\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("href")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(",\n\t\t\t\t},\n\t\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Quotes'")]),t._v(",\n\t\t\t},\n\t\t],\n\t},\n]\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("By default the elements from the "),n("code",[t._v("links")]),t._v(" prop on "),n("code",[t._v("KtNavbar")]),t._v(" are bound to an anchor\nHTML element ("),n("code",[t._v("<a />")]),t._v("). Therefore, providing "),n("code",[t._v("href")]),t._v(" attribute on each element suffices\nin most cases. In case of the need for a custom component, provide the "),n("code",[t._v("component")]),t._v("\nattribute and any corresponding prop that would need to be bound to it.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[n("span",{staticClass:"hljs-keyword"},[t._v("const")]),t._v(" links = [\n\t"),n("span",{staticClass:"hljs-comment"},[t._v("// For Nuxt's router framework")]),t._v("\n\t{\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("component")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'nuxt-link'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'invoice'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isActive")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("props")]),t._v(": {\n\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("to")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(",\n\t\t},\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Orders'")]),t._v(",\n\t},\n\t"),n("span",{staticClass:"hljs-comment"},[t._v("// For VueRouter")]),t._v("\n\t{\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("component")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'router-link'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'request'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isActive")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("props")]),t._v(": {\n\t\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("to")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(",\n\t\t},\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Quotes'")]),t._v(",\n\t},\n],\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[t._v("quickLinksData: [{\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Create New Issue'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("link")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'https://github.com/3YOURMIND/kotti/issues/new'")]),t._v(",\n}],\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("Event Name")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Payload")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Description")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("@linkClick")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("$emit")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("$event")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("navbar menu link was clicked")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("@logoClick")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("$emit")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("$event")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("navbar logo was clicked")])])])])}],r=n(236),l=n(0),c=n(722),_=Object(l.defineComponent)({name:"DocumentationPageUsageLayoutsNavbar",components:{ComponentInfo:c.a},setup:function(){return{component:r.a}}}),v=n(61),component=Object(v.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("h2",[t._v("Structure")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),n("h2",[t._v("Components")]),t._v(" "),n("nuxt-link",{attrs:{to:"/examples/layouts"}},[n("KtButton",{attrs:{type:"primary",icon:"link"}},[t._v("Open Example")])],1),t._v(" "),t._m(3),t._v(" "),n("h3",[t._v("Notification")]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),n("h3",[t._v("Menu")]),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),n("h3",[t._v("Quick Links")]),t._v(" "),t._m(10),t._v(" "),n("h2",[t._v("Usage")]),t._v(" "),n("h3",[t._v("Events")]),t._v(" "),t._m(11)],1)}),o,!1,null,null,null);e.default=component.exports}}]);