(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{625:function(t,e,o){var content=o(631);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(106).default)("6285525e",content,!0,{sourceMap:!1})},626:function(t,e,o){var content=o(633);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(106).default)("154a18a7",content,!0,{sourceMap:!1})},627:function(t,e,o){"use strict";o.d(e,"a",(function(){return r}));var n=o(312);var l=o(372);function r(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},628:function(t,e,o){"use strict";o(143),o(144),o(130),o(457),o(129),o(128),o(310),o(311),o(243),o(145);var n=o(146),l=o(627),r=o(242),c=o(18),d=o(629),_=o(0),v=Object(_.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(_.ref)(!1)}}}),m=(o(630),o(55)),f=Object(m.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],l=e[1],r=l.description,c=l.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===r?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(r)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var y=Object(_.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:d.Dashes,labels:Object(_.computed)((function(){var e=[],o=t.component.meta,c=o.addedVersion,d=o.deprecated,_=o.designs,v=o.typeScript;return null!==d&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(d.version)}),null!==_?Array.isArray(_)?e.push.apply(e,Object(l.a)(_.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},r.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:_.url,right:Object(n.a)({},r.a.MetaDesignType.FIGMA,"Figma")[_.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),v&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",right:v.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),e})),showProps:Object(_.ref)(!1),stringifyDefault:function(t){return"function"==typeof t?"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Array.isArray(t)?t.map((function(t){return t.name.toLowerCase()})).join(" | "):t.name.toLowerCase()},Yoco:c.Yoco}}}),C=(o(632),Object(m.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],l=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),o("td",[l.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(l.default))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?o("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"4842cdd2",null));e.a=C.exports},629:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},630:function(t,e,o){"use strict";var n=o(625);o.n(n).a},631:function(t,e,o){(e=o(105)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},632:function(t,e,o){"use strict";var n=o(626);o.n(n).a},633:function(t,e,o){(e=o(105)(!1)).push([t.i,".component-info[data-v-4842cdd2]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-4842cdd2]{flex-direction:row;align-items:center}}.component-info>*[data-v-4842cdd2]{display:flex;margin:5px 10px}.component-info__labels[data-v-4842cdd2]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-4842cdd2]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-4842cdd2],.component-info__label__right[data-v-4842cdd2]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-4842cdd2]:hover{text-decoration:underline}.component-info__label__left[data-v-4842cdd2]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-4842cdd2]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-4842cdd2]{margin-bottom:32px}.component-info-container[data-v-4842cdd2]>:not(:first-child){margin-top:16px}.danger-block[data-v-4842cdd2]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-4842cdd2]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-4842cdd2]{margin-left:8px}.danger-block>section[data-v-4842cdd2]{padding:.4rem .6rem}.danger-block>section[data-v-4842cdd2]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},836:function(t,e,o){"use strict";o.r(e);var n=o(211),l=o(0),r=o(628),c=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsAccordion",components:{ComponentInfo:r.a},setup:function(){return{component:n.a}}}),d=o(55),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("p",[t._v("An accordion for hiding content on click.\nIt is animated but the animation doesn't work with IE11.")]),t._v(" "),t._m(0),t._v(" "),o("KtAccordion",{attrs:{title:"Accordion"}},[t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n")]),t._v(" "),o("h2",[t._v("Using icons")]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),o("KtAccordion",{attrs:{icon:"edit",title:"Accordion with icon"}},[t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n")]),t._v(" "),o("h2",[t._v("Fully clickable")]),t._v(" "),o("p",[t._v("We might want to use the whole header as a toggling zone:")]),t._v(" "),t._m(3),t._v(" "),o("KtAccordion",{attrs:{isFullyClickable:!0,icon:"edit",title:"Accordion with icon"}},[t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n")]),t._v(" "),o("h2",[t._v("Closed by default")]),t._v(" "),t._m(4),t._v(" "),o("KtAccordion",{attrs:{isClosed:!0,title:"Openable block :)"}},[t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n")]),t._v(" "),o("h2",[t._v("Properties")]),t._v(" "),t._m(5)],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Accordion"')]),t._v(">")]),t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(">")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("We can use "),e("code",[this._v("yoco")]),this._v(" icons as well:")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Accordion with icon"')]),t._v(">")]),t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":isFullyClickable")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"true"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("icon")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"edit"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Accordion with icon"')]),t._v(">")]),t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":isClosed")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"true"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Openable block :)"')]),t._v(">")]),t._v("\n  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.\n"),o("span",{staticClass:"hljs-tag"},[t._v("</"),o("span",{staticClass:"hljs-name"},[t._v("KtAccordion")]),t._v(">")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("table",[o("thead",[o("tr",[o("th",{staticStyle:{"text-align":"left"}},[t._v("Attribute")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Description")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Type")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Accepted values")]),t._v(" "),o("th",{staticStyle:{"text-align":"left"}},[t._v("Default")])])]),t._v(" "),o("tbody",[o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("title")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("Title of the block")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("icon")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("A yoco icon name")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("String")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("isClosed")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("Is the block closed by default?")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("Boolean")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("false")])])]),t._v(" "),o("tr",[o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("isFullyClickable")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("Is the whole header clickable?")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("Boolean")])]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[t._v("—")]),t._v(" "),o("td",{staticStyle:{"text-align":"left"}},[o("code",[t._v("false")])])])])])}],!1,null,null,null);e.default=component.exports}}]);