(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{647:function(t,e,n){var content=n(653);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(116).default)("dc9cb9a6",content,!0,{sourceMap:!1})},648:function(t,e,n){var content=n(655);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(116).default)("a16e466a",content,!0,{sourceMap:!1})},649:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var o=n(328);var r=n(384);function l(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},650:function(t,e,n){"use strict";n(158),n(325),n(159),n(145),n(470),n(144),n(143),n(326),n(327),n(260),n(198),n(259),n(160);var o=n(161),r=n(649),l=n(324),c=n(16),_=n(651),d=n(0),v=n(103),h=Object(d.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(d.ref)(!1)}}}),m=(n(652),n(64)),f=Object(m.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var o=e[0],details=e[1];return n("section",{key:o},[n("div",{staticClass:"slots-block__header"},[n("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",{staticClass:"slots-block__header__details"},[details.description?n("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var o=e[0],r=e[1],l=r.description,c=r.type;return n("div",{key:o,staticClass:"slots-block__scope__item"},[n("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),n("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",null===l?{staticClass:"\n\t\t\t\t\t\t\tslots-block__scope__item__description\n\t\t\t\t\t\t\tslots-block__scope__item__description--is-empty\n\t\t\t\t\t\t",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"6a36844a",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var x=Object(d.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:_.Dashes,labels:Object(d.computed)((function(){var e=[],n=t.component,c=n.meta,_=c.addedVersion,d=c.deprecated,h=c.designs,m=c.typeScript,f=n.name,x=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(v.kebabCase)(f.replace(/^Kt/,"Kotti"))):null;return null!==d&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(d.version)}),null!==h?Array.isArray(h)?e.push.apply(e,Object(r.a)(h.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(o.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:h.url,right:Object(o.a)({},l.a.MetaDesignType.FIGMA,"Figma")[h.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),m&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:x?"".concat(x,"/types.ts"):void 0,right:m.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),x&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(x,"/").concat(f,".vue"),right:"".concat(f,".vue")}),e})),showProps:Object(d.ref)(!1),stringifyDefault:function(t){return"function"==typeof t?"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Array.isArray(t)?t.map((function(t){return t.name.toLowerCase()})).join(" | "):t.name.toLowerCase()},Yoco:c.Yoco}}}),C=(n(654),Object(m.a)(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var o=e[0],r=e[1];return n("tr",{key:o},[n("td",[n("code",{domProps:{textContent:t._s(o)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),n("td",[r.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?n("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"3ac0794d",null));e.a=C.exports},651:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},652:function(t,e,n){"use strict";var o=n(647);n.n(o).a},653:function(t,e,n){(e=n(115)(!1)).push([t.i,".slots-block[data-v-6a36844a]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-6a36844a]{padding:.4rem .6rem}.slots-block[data-v-6a36844a]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-6a36844a]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-6a36844a],.slots-block__header__details__description[data-v-6a36844a]{flex:1}.slots-block__header__details__empty-description[data-v-6a36844a]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-6a36844a]{font-style:italic}.slots-block__header__name[data-v-6a36844a]{font-weight:700}.slots-block__header>*[data-v-6a36844a]{display:flex;align-items:center}.slots-block__header[data-v-6a36844a]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-6a36844a]{margin-left:1.5rem}.slots-block__scope__item[data-v-6a36844a]{display:flex;align-items:center}.slots-block__scope__item[data-v-6a36844a]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-6a36844a]{font-style:italic}.slots-block__scope__item__name[data-v-6a36844a]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-6a36844a]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-6a36844a]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-6a36844a]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-6a36844a]{color:var(--green-50)}",""]),t.exports=e},654:function(t,e,n){"use strict";var o=n(648);n.n(o).a},655:function(t,e,n){(e=n(115)(!1)).push([t.i,".component-info[data-v-3ac0794d]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-3ac0794d]{flex-direction:row;align-items:center}}.component-info>*[data-v-3ac0794d]{display:flex;margin:5px 10px}.component-info__labels[data-v-3ac0794d]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-3ac0794d]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-3ac0794d],.component-info__label__right[data-v-3ac0794d]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-3ac0794d]:hover{text-decoration:underline}.component-info__label__left[data-v-3ac0794d]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-3ac0794d]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-3ac0794d]{margin-bottom:32px}.component-info-container[data-v-3ac0794d]>:not(:first-child){margin-top:16px}.danger-block[data-v-3ac0794d]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-3ac0794d]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-3ac0794d]{margin-left:8px}.danger-block>section[data-v-3ac0794d]{padding:.4rem .6rem}.danger-block>section[data-v-3ac0794d]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},656:function(t,e,n){var content=n(661);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(116).default)("384b2d92",content,!0,{sourceMap:!1})},660:function(t,e,n){"use strict";var o=n(656);n.n(o).a},661:function(t,e,n){(e=n(115)(!1)).push([t.i,".code-switch[data-v-2724a750]{position:relative;display:inline-block;width:100%;padding-top:.5rem}.code-switch .switcher[data-v-2724a750]{position:absolute;top:0;left:0;padding:.2rem .5rem;font-size:12px;color:#fff;background:rgba(0,0,0,.4)}.code-switch .switcher[data-v-2724a750]:hover{cursor:pointer;background:rgba(44,100,204,.6)}",""]),t.exports=e},665:function(t,e,n){"use strict";var o={name:"ShowCase",props:{vueSlotLabel:String,styleSlotLabel:String},data:function(){return{showCode:!0}},computed:{currentCode:function(){return this.showCode?this.vueSlotLabel||"Kotti-UI":this.styleSlotLabel||"Kotti-Style"}}},r=(n(660),n(64)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"code-switch"},[n("div",{staticClass:"switcher",domProps:{textContent:t._s(t.currentCode)},on:{click:function(e){t.showCode=!t.showCode}}}),t._v(" "),t.showCode?t._t("vue"):t._t("style")],2)}),[],!1,null,"2724a750",null);e.a=component.exports},751:function(t,e,n){t.exports=n.p+"img/banner_alert.77338f7.png"},860:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Banners can be used as an alert at the top of the screen to display\ncritical messages or expandable information. It should not include a\ndismiss icon, and should "),e("strong",[this._v("only disappear")]),this._v(" once the problem is "),e("strong",[this._v("resolved")]),this._v(".")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("img",{attrs:{src:n(751),alt:"Banner Structure"}})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ol",[n("li",[n("strong",[t._v("Glyph icon:")]),t._v(" Indicates the type of this banner.")]),t._v(" "),n("li",[n("strong",[t._v("Message:")]),t._v(" Give a short description of this issue or summary of an important message.")]),t._v(" "),n("li",[n("strong",[t._v("Action:")]),t._v(" A textual call to action button to resolve this issue.")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtBanner")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Your material is not published yet"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"announce"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("actionText")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Publish"')]),t._v("\n/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtBanner")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Your material is not published yet"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"cloud"')]),t._v(">")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("h2")]),t._v(">")]),t._v("Order #100002"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("h2")]),t._v(">")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("h3")]),t._v(">")]),t._v("Order information"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("h3")]),t._v(">")]),t._v("\n\t\t.... ....\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("div")]),t._v(">")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("</"),n("span",{staticClass:"hljs-name"},[t._v("KtBanner")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can use "),e("code",[this._v("banner-grey")]),this._v(" to change the banner's background color,\nthis style is useful when you want add contrast to the page.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtBanner")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Your material is not published yet"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"announce"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("actionText")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Publish"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("isGray")]),t._v("\n/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("Attribute")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Accepted values")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Default")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("message")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("message in banner")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("—")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("icon")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("icon name from "),n("code",[t._v("yoco")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("icon name in "),n("code",[t._v("yoco")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v('"announce"')])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("isGray")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("gray background for high contrast")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Boolean")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("false")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("actionText")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("text shows when banner is not expandable")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("—")])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("expandLabel")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("text shows when expandable banner is collapsed")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("View")])])]),t._v(" "),n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("expandCloseLabel")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("text shows when expandable banner is expand")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("String")])]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("code",[t._v("Close")])])])])])}],r=n(228),l=n(0),c=n(650),_=n(665),d=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsBanner",components:{ComponentInfo:c.a,ShowCase:_.a},setup:function(){return{component:r.a}}}),v=n(64),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Structure")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),n("h2",[t._v("Types")]),t._v(" "),n("h3",[t._v("Collapsed Banner")]),t._v(" "),n("p",[t._v("Only use this type of banner when this issue will cause a significant error.")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtBanner",{attrs:{message:"Your material is not published yet",icon:"announce",actionText:"Publish"}})],1),t._v(" "),t._m(3),t._v(" "),n("h3",[t._v("Expand Banner")]),t._v(" "),n("p",[t._v("It shows the most import message inside the banner but hides other\ninformation. Use it when you want to create a clear, non-interrupting\ninterface.")]),t._v(" "),n("div",{staticClass:"element-example"},[n("KtBanner",{attrs:{message:"Your material is not published yet",icon:"cloud"}},[n("div",[n("h2",[t._v("Order #100002")]),t._v(" "),n("h3",[t._v("Order information")]),t._v("\n\t\t\t....\n\t\t\t....\n\t\t")])])],1),t._v(" "),t._m(4),t._v(" "),n("h2",[t._v("Style")]),t._v(" "),n("h3",[t._v("Background")]),t._v(" "),t._m(5),t._v(" "),n("div",{staticClass:"element-example white"},[n("KtBanner",{attrs:{message:"Your material is not published yet",icon:"announce",actionText:"Publish",isGray:""}})],1),t._v(" "),t._m(6),t._v(" "),n("h2",[t._v("Usage")]),t._v(" "),n("h3",[t._v("Attributes")]),t._v(" "),t._m(7)],1)}),o,!1,null,null,null);e.default=component.exports}}]);