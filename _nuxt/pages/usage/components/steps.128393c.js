(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{708:function(t,e,o){var content=o(714);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(114).default)("dc9cb9a6",content,!0,{sourceMap:!1})},709:function(t,e,o){var content=o(716);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(114).default)("43cccb2f",content,!0,{sourceMap:!1})},710:function(t,e,o){"use strict";o(159),o(335),o(157),o(160),o(505),o(158),o(397),o(142),o(336),o(337),o(265),o(104),o(199),o(162),o(264),o(161);var n=o(86),r=o(711),l=o(334),c=o(16),_=o(712),v=o(0),d=o(105),f=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),h=(o(713),o(60)),m=Object(h.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"\n\t\t\t\t\t\t\tslots-block__scope__item__description\n\t\t\t\t\t\t\tslots-block__scope__item__description--is-empty\n\t\t\t\t\t\t",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"6a36844a",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var x=Object(v.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:m},setup:function(t){return{Dashes:_.Dashes,labels:Object(v.computed)((function(){var e=[],o=t.component,c=o.meta,_=c.addedVersion,v=c.deprecated,f=c.designs,h=c.typeScript,m=o.name,x=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(d.kebabCase)(m.replace(/^Kt/,"Kotti"))):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==f?Array.isArray(f)?e.push.apply(e,Object(r.a)(f.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[f.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:x?"".concat(x,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),x&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(x,"/").concat(m,".vue"),right:"".concat(m,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(d.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(d.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),S=(o(715),Object(h.a)(x,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"40fb8180",null));e.a=S.exports},711:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(338);var r=o(398);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},712:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},713:function(t,e,o){"use strict";var n=o(708);o.n(n).a},714:function(t,e,o){(e=o(113)(!1)).push([t.i,".slots-block[data-v-6a36844a]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-6a36844a]{padding:.4rem .6rem}.slots-block[data-v-6a36844a]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-6a36844a]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-6a36844a],.slots-block__header__details__description[data-v-6a36844a]{flex:1}.slots-block__header__details__empty-description[data-v-6a36844a]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-6a36844a]{font-style:italic}.slots-block__header__name[data-v-6a36844a]{font-weight:700}.slots-block__header>*[data-v-6a36844a]{display:flex;align-items:center}.slots-block__header[data-v-6a36844a]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-6a36844a]{margin-left:1.5rem}.slots-block__scope__item[data-v-6a36844a]{display:flex;align-items:center}.slots-block__scope__item[data-v-6a36844a]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-6a36844a]{font-style:italic}.slots-block__scope__item__name[data-v-6a36844a]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-6a36844a]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-6a36844a]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-6a36844a]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-6a36844a]{color:var(--green-50)}",""]),t.exports=e},715:function(t,e,o){"use strict";var n=o(709);o.n(n).a},716:function(t,e,o){(e=o(113)(!1)).push([t.i,".component-info[data-v-40fb8180]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-40fb8180]{flex-direction:row;align-items:center}}.component-info>*[data-v-40fb8180]{display:flex;margin:5px 10px}.component-info__labels[data-v-40fb8180]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-40fb8180]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-40fb8180],.component-info__label__right[data-v-40fb8180]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-40fb8180]:hover{text-decoration:underline}.component-info__label__left[data-v-40fb8180]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-40fb8180]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-40fb8180]{margin-bottom:32px}.component-info-container[data-v-40fb8180]>:not(:first-child){margin-top:16px}.danger-block[data-v-40fb8180]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-40fb8180]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-40fb8180]{margin-left:8px}.danger-block>section[data-v-40fb8180]{padding:.4rem .6rem}.danger-block>section[data-v-40fb8180]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},977:function(t,e,o){"use strict";o.r(e);var n=o(243),r=o(0),l=o(710),c=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsSteps",components:{ComponentInfo:l.a},setup:function(){var t=Object(r.ref)(1);return{component:n.a,current:t,labelText:Object(r.computed)((function(){return t.value>2?"Finished":"Next Status"})),status:Object(r.ref)("error")}}}),_=o(60),component=Object(_.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("h2",[t._v("Step Status")]),t._v(" "),o("div",{staticClass:"element-example"},[o("KtStep",{attrs:{title:"Finished",description:"Your order has been accepted"}}),t._v(" "),o("KtStep",{attrs:{title:"Process",description:"Your items are Printing",status:"process"}}),t._v(" "),o("KtStep",{attrs:{title:"Wait",status:"wait",indexNumber:3,description:"with index number"}}),t._v(" "),o("KtStep",{attrs:{title:"Error",status:"error",hideLine:"",icon:"cloud",description:"Customized icons"}})],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),o("h2",[t._v("Step Structure")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),o("h2",[t._v("Steps")]),t._v(" "),t._m(5),t._v(" "),o("div",{staticClass:"element-example"},[o("KtRow",[o("KtCol",{attrs:{span:12,xs:24}},[o("KtSteps",{attrs:{current:t.current,status:"process"}},[o("KtStep",{attrs:{title:"Pending",description:"Your items have been ordered"}}),t._v(" "),o("KtStep",{attrs:{title:"Print",description:"Your items are printing"}}),t._v(" "),o("KtStep",{attrs:{title:"Shipped",description:"Your items have been shipped"}})],1)],1),t._v(" "),o("KtCol",{attrs:{span:12,xs:24}},[o("KtSteps",{attrs:{current:t.current,status:"process",showIcon:""}},[o("KtStep",{attrs:{title:"Pending",description:"Your items have been ordered"}}),t._v(" "),o("KtStep",{attrs:{title:"Print",description:"Your items are printing"}}),t._v(" "),o("KtStep",{attrs:{title:"Shipped",description:"Your items have been shipped"}})],1)],1)],1),t._v(" "),o("KtRow",{staticClass:"mt-16px"},[o("KtButton",{attrs:{label:"Reset"},on:{click:function(e){t.current=0}}}),t._v(" "),o("KtButton",{attrs:{label:t.labelText},on:{click:function(e){t.current++}}})],1)],1),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),o("h2",[t._v("Usage")]),t._v(" "),o("h3",[t._v("Steps Attributes")]),t._v(" "),t._m(8),t._v(" "),o("h3",[t._v("Step Attributes")]),t._v(" "),t._m(9),t._v(" "),o("h3",[t._v("Theme")]),t._v(" "),t._m(10)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("KtStep")]),this._v(" includes 4 statuses that can be controlled via the "),e("code",[this._v("status")]),this._v(" prop:")])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li",[this._v("Finished: The step is finished (default)")]),this._v(" "),e("li",[this._v("Process: The step is procssing")]),this._v(" "),e("li",[this._v("Wait: The step is waiting for last step to be finished")]),this._v(" "),e("li",[this._v("Error: The step is finished with an error")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtStep")]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Process"')]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("description")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Your items are Printing"')]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("status")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"process"')]),t._v("\n/>")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Each "),e("code",[this._v("KtStep")]),this._v(" has four elements:")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ol",[o("li",[t._v("Indicator: The icon on the left, can be changed with the "),o("code",[t._v("icon")]),t._v(" prop")]),t._v(" "),o("li",[t._v("Line: The line under the icon, if the step is last in the group, you may want to use "),o("code",[t._v("hideLine")]),t._v(" to disable the line")]),t._v(" "),o("li",[t._v("Title: The bold text on the right side, given via "),o("code",[t._v("title")]),t._v(" props.")]),t._v(" "),o("li",[t._v("Description: The gray text under title, given via "),o("code",[t._v("description")]),t._v(" props.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("KtSteps")]),this._v(" provides easier use of "),e("code",[this._v("KtStep")]),this._v(", since "),e("code",[this._v("KtStep")]),this._v(" normally used as a group.")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtSteps")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":current")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"1"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("status")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"process"')]),t._v(">")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtStep")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Pending"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("description")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Your items have been ordered"')]),t._v(" />")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtStep")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Print"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("description")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Your items are printing"')]),t._v(" />")]),t._v("\n\t"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtStep")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Shipped"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("description")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Your items has been shipped"')]),t._v(" />")]),t._v("\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtSteps")]),t._v(">")]),t._v("\n"),o("span",{staticClass:"hljs-comment"},[t._v("\x3c!-- Show as icons --\x3e")]),t._v("\n"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtSteps")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":current")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"1"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("status")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"process"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("showIcon")]),t._v(">")]),t._v(" ... "),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtSteps")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("p",[o("code",[t._v("current")]),t._v(" props controls which step is current step. "),o("code",[t._v("status")]),t._v(" specifies the status of current step. By default "),o("code",[t._v("KtSteps")]),t._v(" uses numberic indicator, if you want to use icons, set "),o("code",[t._v("showIcon")]),t._v(" to "),o("code",[t._v("true")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("table",[o("thead",[o("tr",[o("th",{staticStyle:{"text-align":"left"}},[t._v("Attribute")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Accepted Values")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Default")])])]),t._v(" "),o("tbody",[o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("current")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("index of current step")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("Number")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("0")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("showIcon")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("show indicator as icons")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("Boolean")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("false")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("status")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("status of the step")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("process")]),t._v(", "),o("code",[t._v("finished")]),t._v(", "),o("code",[t._v("error")]),t._v(" and "),o("code",[t._v("wait")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("process")])])])])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("table",[o("thead",[o("tr",[o("th",{staticStyle:{"text-align":"left"}},[t._v("Attribute")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Accepted Values")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Default")])])]),t._v(" "),o("tbody",[o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("description")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("description text of the step")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("null")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("hideLine")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("should be used for the last step")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("Boolean")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("true")]),t._v(", "),o("code",[t._v("false")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("false")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("icon")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("icon of the step")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("yoco icon string")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("check")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("status")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("status of the step")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("process")]),t._v(", "),o("code",[t._v("finished")]),t._v(", "),o("code",[t._v("error")]),t._v(" and "),o("code",[t._v("wait")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("process")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("title")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("title text of the step")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("null")])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"left"}},[this._v("Attribute")]),this._v(" "),e("th",{staticStyle:{"text-align":"left"}},[this._v("Description")])])]),this._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"left"}},[e("code",[this._v("brandColor")])]),this._v(" "),e("td",{staticStyle:{"text-align":"left"}},[this._v("Changes the color of indicator and line")])])])])}],!1,null,null,null);e.default=component.exports}}]);