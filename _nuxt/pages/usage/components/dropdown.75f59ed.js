(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{633:function(t,e,n){var content=n(639);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(111).default)("6285525e",content,!0,{sourceMap:!1})},634:function(t,e,n){var content=n(641);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(111).default)("74fb5490",content,!0,{sourceMap:!1})},635:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(321);var l=n(377);function r(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},636:function(t,e,n){"use strict";n(148),n(318),n(149),n(136),n(463),n(135),n(134),n(319),n(320),n(252),n(190),n(251),n(150);var o=n(151),l=n(635),r=n(122),_=n(16),c=n(637),v=n(0),d=n(98),m=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),h=(n(638),n(59)),f=Object(h.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var o=e[0],details=e[1];return n("section",{key:o},[n("div",{staticClass:"slots-block__header"},[n("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",{staticClass:"slots-block__header__details"},[details.description?n("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var o=e[0],l=e[1],r=l.description,_=l.type;return n("div",{key:o,staticClass:"slots-block__scope__item"},[n("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+_,domProps:{textContent:t._s(_)}}),t._v(" "),n("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",null===r?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(r)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var w=Object(v.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:c.Dashes,labels:Object(v.computed)((function(){var e=[],n=t.component,_=n.meta,c=_.addedVersion,v=_.deprecated,m=_.designs,h=_.typeScript,f=n.name,w=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(d.kebabCase)(f.replace(/^Kt/,"Kotti"))):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(l.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(o.a)({},r.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(o.a)({},r.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:w?"".concat(w,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),w&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(w,"/").concat(f,".vue"),right:"".concat(f,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t){return"function"==typeof t?"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Array.isArray(t)?t.map((function(t){return t.name.toLowerCase()})).join(" | "):t.name.toLowerCase()},Yoco:_.Yoco}}}),j=(n(640),Object(h.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var o=e[0],l=e[1];return n("tr",{key:o},[n("td",[n("code",{domProps:{textContent:t._s(o)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),n("td",[l.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(l.default))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?n("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"d499df5c",null));e.a=j.exports},637:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},638:function(t,e,n){"use strict";var o=n(633);n.n(o).a},639:function(t,e,n){(e=n(110)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},640:function(t,e,n){"use strict";var o=n(634);n.n(o).a},641:function(t,e,n){(e=n(110)(!1)).push([t.i,".component-info[data-v-d499df5c]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-d499df5c]{flex-direction:row;align-items:center}}.component-info>*[data-v-d499df5c]{display:flex;margin:5px 10px}.component-info__labels[data-v-d499df5c]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-d499df5c]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-d499df5c],.component-info__label__right[data-v-d499df5c]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-d499df5c]:hover{text-decoration:underline}.component-info__label__left[data-v-d499df5c]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-d499df5c]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-d499df5c]{margin-bottom:32px}.component-info-container[data-v-d499df5c]>:not(:first-child){margin-top:16px}.danger-block[data-v-d499df5c]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-d499df5c]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-d499df5c]{margin-left:8px}.danger-block>section[data-v-d499df5c]{padding:.4rem .6rem}.danger-block>section[data-v-d499df5c]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},852:function(t,e,n){"use strict";n.r(e);var o=n(225),l=n(0),r=n(636),_=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsDropdowns",components:{ComponentInfo:r.a},setup:function(){return{component:o.a}}}),c=n(59),component=Object(c.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("h2",[t._v("Basic Usage")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtDropdown",[n("KtButton",{attrs:{type:"secondary",label:"More Action"}}),t._v(" "),n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",[t._v("Add New Item")]),t._v(" "),n("KtDropdownMenu",[t._v("Download Item")])],1)],1)],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),n("h2",[t._v("Dropdown button")]),t._v(" "),n("p",[t._v("A dropdown button is a current pattern nowadays.\nIt allows to have a subaction without changing page or opening a modal.")]),t._v(" "),t._m(4),t._v(" "),n("div",{staticClass:"element-example"},[n("KtDropdownButton",{attrs:{type:"primary",label:"Dropdown button"}},[n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",[t._v("Request item")]),t._v(" "),n("KtDropdownMenu",[t._v("Download Item")])],1)]),t._v(" "),n("KtDropdownButton",{attrs:{placement:"top-end",dropdownIcon:"chevron_up",size:"sm",type:"primary",label:"Dropdown button"}},[n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",[t._v("Request item")]),t._v(" "),n("KtDropdownMenu",[t._v("Download Item")])],1)]),t._v(" "),n("KtDropdownButton",{attrs:{disabled:!0,size:"sm",type:"primary",label:"Dropdown button"}},[n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",[t._v("Request item")]),t._v(" "),n("KtDropdownMenu",[t._v("Download Item")])],1)])],1),t._v(" "),t._m(5),t._v(" "),n("h2",[t._v("Icons and Size")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtDropdown",{attrs:{size:"sm"}},[n("KtButton",{attrs:{type:"text",label:"Dropdown with icons"}}),t._v(" "),n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",{attrs:{icon:"plus"}},[t._v("Add New Item")]),t._v(" "),n("KtDropdownMenu",{attrs:{icon:"download"}},[t._v("Download Item")])],1)],1)],1),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),t._m(8),t._v(" "),n("h2",[t._v("Placement")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtDropdown",{staticClass:"d-inline",attrs:{placement:"top-start"}},[n("KtButton",{attrs:{type:"secondary",label:"Top Start"}}),t._v(" "),n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",{attrs:{icon:"plus"}},[t._v("Add New Item")]),t._v(" "),n("KtDropdownMenu",{attrs:{icon:"download"}},[t._v("Download Item")])],1)],1),t._v(" "),n("KtDropdown",{staticClass:"d-inline",attrs:{placement:"top-end"}},[n("KtButton",{attrs:{type:"secondary",label:"Top End"}}),t._v(" "),n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",{attrs:{icon:"plus"}},[t._v("Add New Item")]),t._v(" "),n("KtDropdownMenu",{attrs:{icon:"download"}},[t._v("Download Item")])],1)],1),t._v(" "),n("KtDropdown",{staticClass:"d-inline",attrs:{placement:"bottom-start"}},[n("KtButton",{attrs:{type:"secondary",label:"Bottom Start"}}),t._v(" "),n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",{attrs:{icon:"plus"}},[t._v("Add New Item")]),t._v(" "),n("KtDropdownMenu",{attrs:{icon:"download"}},[t._v("Download Item")])],1)],1),t._v(" "),n("KtDropdown",{staticClass:"d-inline",attrs:{placement:"bottom-end"}},[n("KtButton",{attrs:{type:"secondary",label:"Bottom End"}}),t._v(" "),n("div",{attrs:{slot:"KtDropdownMenus"},slot:"KtDropdownMenus"},[n("KtDropdownMenu",{attrs:{icon:"plus"}},[t._v("Add New Item")]),t._v(" "),n("KtDropdownMenu",{attrs:{icon:"download"}},[t._v("Download Item")])],1)],1)],1),t._v(" "),t._m(9),t._v(" "),n("h2",[t._v("Usage")]),t._v(" "),n("h3",[t._v("Attributes")]),t._v(" "),t._m(10)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("KtDropdown")]),this._v(" is a wrapper of "),e("code",[this._v("KtPopover")]),this._v(" but with per-defined style.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Default slot is the trigger element. "),e("code",[this._v("KtDropdownMenus")]),this._v(" slot contains the dropdown elements.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("In "),e("code",[this._v("KtDropdownMenus")]),this._v(" slot, you can write your own stylied element. However, we suggest you use "),e("code",[this._v("KtDropdownMenu")]),this._v(" components.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdown")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"secondary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"More Action"')]),t._v("/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"KtDropdownMenus"')]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Add New Item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Download Item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdown")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("Note the "),n("code",[t._v("dropdownIcon")]),t._v(" prop. It will default to "),n("code",[t._v("chevron_down")]),t._v(".\nYou can also use any attribute you would pass to "),n("code",[t._v("KtPopover")]),t._v(" or "),n("code",[t._v("KtButton")]),t._v(". They will be passed.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v("\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Dropdown button"')]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"KtDropdownMenus"')]),t._v(">")]),t._v("\n\t\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Request item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Download Item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownButton")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("placement")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"top-end"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("dropdownIcon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"chevron_up"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("size")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"sm"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Dropdown button"')]),t._v(" >")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"KtDropdownMenus"')]),t._v(">")]),t._v("\n\t\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Request item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Download Item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownButton")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v(":disabled")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"true"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("size")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"sm"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"primary"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Dropdown button"')]),t._v(" >")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"KtDropdownMenus"')]),t._v(">")]),t._v("\n\t\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Request item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("Download Item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownButton")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[t._v("As "),n("code",[t._v("KtPopover")]),t._v(", "),n("code",[t._v("KtDropdown")]),t._v(" accpets "),n("code",[t._v("size")]),t._v(", when "),n("code",[t._v("size")]),t._v(" is not given, the width of dropdown will be auto.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("If you are using "),e("code",[this._v("KtDropdownMenu")]),this._v(", you can use "),e("code",[this._v("icon")]),this._v(" props to define the icon in front of the text.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdown")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("size")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"sm"')]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("type")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"text"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"dots"')]),t._v("/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("slot")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"KtDropdownMenus"')]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"plus"')]),t._v(">")]),t._v("Add New Item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"download"')]),t._v(">")]),t._v("Download Item"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdownMenu")]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtDropdown")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("The "),e("code",[this._v("placement")]),this._v(" prop accepts same values as "),e("code",[this._v("KtPopover")]),this._v(". We suggest using the default placement.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("Attribute")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Accepted values")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Default")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("KtDropdown.size")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("size of the dropdown")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("Same as KtPopover")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("auto")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("KtDropdown.placement")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("placement of the dropdown")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("Same as KtPopover")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("auto")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("KtDropdownMenu.icon")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("icon of the dropdown denu")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("Yoco icon text")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("-")])])])])}],!1,null,null,null);e.default=component.exports}}]);