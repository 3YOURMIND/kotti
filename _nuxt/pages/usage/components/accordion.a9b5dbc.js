(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{712:function(t,e,o){var content=o(718);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(112).default)("6285525e",content,!0,{sourceMap:!1})},713:function(t,e,o){var content=o(720);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(112).default)("047968ca",content,!0,{sourceMap:!1})},714:function(t,e,o){"use strict";o(164),o(336),o(162),o(165),o(507),o(163),o(401),o(144),o(337),o(338),o(273),o(99),o(212),o(167),o(272),o(166);var n=o(70),r=o(715),l=o(335),c=o(11),d=o(716),_=o(0),v=o(71),m=Object(_.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(_.ref)(!1)}}}),f=(o(717),o(56)),h=Object(f.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var y=Object(_.defineComponent)({name:"ComponentInfo",props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:h},setup:function(t){return{Dashes:d.Dashes,labels:Object(_.computed)((function(){var e=[],o=t.component,c=o.meta,d=c.addedVersion,_=c.componentFolder,m=c.deprecated,f=c.designs,h=c.typeScript,y=o.name,k=null!=_?_:Object(v.kebabCase)(y.replace(/^Kt/,"Kotti")),j=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(k):null;return null!==m&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(m.version)}),null!==f?Array.isArray(f)?e.push.apply(e,Object(r.a)(f.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[f.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:j?"".concat(j,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),j&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(j,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showProps:Object(_.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(v.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(v.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),k=(o(719),Object(f.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"0dba9de5",null));e.a=k.exports},715:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(339);var r=o(402);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},716:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},717:function(t,e,o){"use strict";var n=o(712);o.n(n).a},718:function(t,e,o){(e=o(111)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},719:function(t,e,o){"use strict";var n=o(713);o.n(n).a},720:function(t,e,o){(e=o(111)(!1)).push([t.i,".component-info[data-v-0dba9de5]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-0dba9de5]{flex-direction:row;align-items:center}}.component-info>*[data-v-0dba9de5]{display:flex;margin:5px 10px}.component-info__labels[data-v-0dba9de5]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-0dba9de5]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-0dba9de5],.component-info__label__right[data-v-0dba9de5]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-0dba9de5]:hover{text-decoration:underline}.component-info__label__left[data-v-0dba9de5]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-0dba9de5]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-0dba9de5]{margin-bottom:32px}.component-info-container[data-v-0dba9de5]>:not(:first-child){margin-top:16px}.danger-block[data-v-0dba9de5]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-0dba9de5]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-0dba9de5]{margin-left:8px}.danger-block>section[data-v-0dba9de5]{padding:.4rem .6rem}.danger-block>section[data-v-0dba9de5]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},966:function(t,e,o){"use strict";o.r(e);var n=o(244),r=o(0),l=o(714),c=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsAccordion",components:{ComponentInfo:l.a},setup:function(){return{component:n.a,isFirstAccordionClosed:Object(r.ref)(!1),isSecondAccordionClosed:Object(r.ref)(!1),isThirdAccordionClosed:Object(r.ref)(!1)}}}),d=o(56),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("p",[t._v("An animated accordion for hiding content on click. The accordion is fully controlled.")]),t._v(" "),t._m(0),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAccordion",{attrs:{isClosed:t.isFirstAccordionClosed,title:"Accordion"},on:{"update:isClosed":function(e){return t.isFirstAccordionClosed=e}}},[t._v("\n\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n\t")])],1),t._v(" "),o("h2",[t._v("Using icons")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAccordion",{attrs:{icon:"edit",isClosed:t.isSecondAccordionClosed,title:"Accordion with icon"},on:{"update:isClosed":function(e){return t.isSecondAccordionClosed=e}}},[t._v("\n\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n\t")])],1),t._v(" "),o("h2",[t._v("Since the component is fully controlled, custom open/close logic can be easily set up.")]),t._v(" "),t._m(3),t._v(" "),o("div",{staticClass:"element-example"},[o("KtButton",{attrs:{label:"Toggle Accordion"},on:{click:function(){return t.isThirdAccordionClosed=!t.isThirdAccordionClosed}}}),t._v(" "),o("KtAccordion",{attrs:{isClosed:t.isThirdAccordionClosed,title:"Openable block :)"}},[t._v("\n\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n\t")])],1)],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v(":isClosed")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"isFirstAccordionClosed"')]),t._v("\n\t@"),o("span",{staticClass:"hljs-attr"},[t._v("update:isClosed")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"(newVal) => isFirstAccordionClosed = newVal"')]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Accordion"')]),t._v("\n>")]),t._v("\n\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus\n\tvel felis posuere, quis posuere enim consequat. Cras vel metus non nibh\n\tvestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.\n\tAenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus\n\ttincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui\n\tultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis\n\teget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("We can use "),e("code",[this._v("yoco")]),this._v(" icons as well:")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v(":isClosed")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"isSecondAccordionClosed"')]),t._v("\n\t@"),o("span",{staticClass:"hljs-attr"},[t._v("update:isClosed")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"(newVal) => isSecondAccordionClosed = newVal"')]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Accordion with icon"')]),t._v("\n>")]),t._v("\n\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus\n\tvel felis posuere, quis posuere enim consequat. Cras vel metus non nibh\n\tvestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.\n\tAenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus\n\ttincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui\n\tultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis\n\teget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtButton")]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("label")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Toggle Accordion"')]),t._v("\n\t@"),o("span",{staticClass:"hljs-attr"},[t._v("click")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"() => isThirdAccordionClosed = !isThirdAccordionClosed"')]),t._v("\n/>")]),t._v("\n"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":isClosed")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"isThirdAccordionClosed"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Openable block :)"')]),t._v(">")]),t._v("\n\tLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus\n\tvel felis posuere, quis posuere enim consequat. Cras vel metus non nibh\n\tvestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.\n\tAenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus\n\ttincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui\n\tultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis\n\teget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(">")]),t._v("\n")])])}],!1,null,null,null);e.default=component.exports}}]);