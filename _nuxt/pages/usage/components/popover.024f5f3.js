(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{712:function(t,e,o){var content=o(718);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(112).default)("6285525e",content,!0,{sourceMap:!1})},713:function(t,e,o){var content=o(720);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(112).default)("047968ca",content,!0,{sourceMap:!1})},714:function(t,e,o){"use strict";o(164),o(336),o(162),o(165),o(507),o(163),o(401),o(144),o(337),o(338),o(273),o(99),o(212),o(167),o(272),o(166);var n=o(70),r=o(715),l=o(335),c=o(11),d=o(716),_=o(0),v=o(71),m=Object(_.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(_.ref)(!1)}}}),f=(o(717),o(56)),h=Object(f.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var x=Object(_.defineComponent)({name:"ComponentInfo",props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:h},setup:function(t){return{Dashes:d.Dashes,labels:Object(_.computed)((function(){var e=[],o=t.component,c=o.meta,d=c.addedVersion,_=c.componentFolder,m=c.deprecated,f=c.designs,h=c.typeScript,x=o.name,k=null!=_?_:Object(v.kebabCase)(x.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(k):null;return null!==m&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(m.version)}),null!==f?Array.isArray(f)?e.push.apply(e,Object(r.a)(f.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[f.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(x,".vue"),right:"".concat(x,".vue")}),e})),showProps:Object(_.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(v.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(v.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),k=(o(719),Object(f.a)(x,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"0dba9de5",null));e.a=k.exports},715:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(339);var r=o(402);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},716:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},717:function(t,e,o){"use strict";var n=o(712);o.n(n).a},718:function(t,e,o){(e=o(111)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},719:function(t,e,o){"use strict";var n=o(713);o.n(n).a},720:function(t,e,o){(e=o(111)(!1)).push([t.i,".component-info[data-v-0dba9de5]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-0dba9de5]{flex-direction:row;align-items:center}}.component-info>*[data-v-0dba9de5]{display:flex;margin:5px 10px}.component-info__labels[data-v-0dba9de5]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-0dba9de5]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-0dba9de5],.component-info__label__right[data-v-0dba9de5]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-0dba9de5]:hover{text-decoration:underline}.component-info__label__left[data-v-0dba9de5]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-0dba9de5]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-0dba9de5]{margin-bottom:32px}.component-info-container[data-v-0dba9de5]>:not(:first-child){margin-top:16px}.danger-block[data-v-0dba9de5]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-0dba9de5]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-0dba9de5]{margin-left:8px}.danger-block>section[data-v-0dba9de5]{padding:.4rem .6rem}.danger-block>section[data-v-0dba9de5]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},723:function(t,e,o){var n=o(31),r=o(724).entries;n({target:"Object",stat:!0},{entries:function(t){return r(t)}})},724:function(t,e,o){var n=o(72),r=o(274),l=o(100),c=o(342).f,d=function(t){return function(e){for(var o,d=l(e),_=r(d),v=_.length,i=0,m=[];v>i;)o=_[i++],n&&!c.call(d,o)||m.push(t?[o,d[o]]:d[o]);return m}};t.exports={entries:d(!0),values:d(!1)}},953:function(t,e,o){"use strict";o.r(e);o(336),o(163),o(723);var n=o(218),r=o(155),l=o(335),c=o(11),d=o(0),_=o(714),v=Object(d.defineComponent)({name:"DocumentationPageUsageComponentsPopever",components:{ComponentInfo:_.a},setup:function(){var t=Object(d.ref)(null),e=[{isDisabled:!1,onClick:function(){},dataTest:"data-test",label:"User",icon:c.Yoco.Icon.USER},{isDisabled:!1,label:"Attachment",icon:c.Yoco.Icon.ATTACHMENT},{isDisabled:!0,label:"Shipping",icon:c.Yoco.Icon.SHIPPING}];return{component:r.a,exampleOptions:e,interactiveExampleRef:t,placementOptions:Object(d.computed)((function(){return Object.entries(l.a.Popover.Placement).map((function(t){var e=Object(n.a)(t,2),o=e[0],r=e[1];return{label:"Kotti.Popover.Placement.".concat(o," ('").concat(r,"')"),value:r}}))})),PopoverExample:'<section><pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">KtPopover</span> <span class="hljs-attr">trigger</span>=<span class="hljs-string">"hover"</span>&gt;</span>\n\t<span class="hljs-tag">&lt;<span class="hljs-name">KtButton</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"Close with Cancel Button"</span> /&gt;</span>\n\t<span class="hljs-tag">&lt;<span class="hljs-name">template</span> #<span class="hljs-attr">content</span>=<span class="hljs-string">"{ close }"</span>&gt;</span>\n\t\t<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Save your message<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>\n\t\t<span class="hljs-tag">&lt;<span class="hljs-name">KtButton</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"Cancel"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"close"</span> /&gt;</span>\n\t\t<span class="hljs-tag">&lt;<span class="hljs-name">KtButton</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"Save"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> /&gt;</span>\n\t<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">KtPopover</span>&gt;</span>\n</code></pre>\n</section>\n',replacer:function(t,e){return"function"==typeof e?e?"() => {}":void 0:e},sizeOptions:Object(d.computed)((function(){return Object.entries(l.a.Popover.Size).map((function(t){var e=Object(n.a)(t,2),o=e[0],r=e[1];return{label:"Kotti.Popover.Size.".concat(o," (").concat(r,")"),value:r}}))})),triggerOptions:Object(d.computed)((function(){return Object.entries(l.a.Popover.Trigger).map((function(t){var e=Object(n.a)(t,2),o=e[0],r=e[1];return{label:"Kotti.Popover.Trigger.".concat(o," (").concat(r,")"),value:r}}))})),values:Object(d.ref)({placement:l.a.Popover.Placement.AUTO,size:l.a.Popover.Size.AUTO,trigger:l.a.Popover.Trigger.CLICK,useOptions:!1,valueDateTime:null,valueDateTimeRange:[null,null],valueSingleSelect:null})}}}),m=o(56),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),t._m(0),t._v(" "),o("h2",[t._v("Interactive Example")]),t._v(" "),o("KtForm",{model:{value:t.values,callback:function(e){t.values=e},expression:"values"}},[o("KtFieldToggle",{attrs:{formKey:"useOptions",isOptional:"",label:"use options",type:"switch"},scopedSlots:t._u([{key:"helpText",fn:function(){return[t._v("\n\t\t\t\tPassing "),o("code",[t._v("options")]),t._v(" turns "),o("code",[t._v("KtPopover")]),t._v(" into a\n\t\t\t\tpre-made dropdown button menu.\n\t\t\t\t"),o("dl",[o("dt",[t._v("TypeScript")]),t._v(" "),o("dd",[o("code",[t._v("Kotti.Popover.Props['options']")])])]),t._v(" "),o("pre",{domProps:{textContent:t._s(JSON.stringify(t.exampleOptions,t.replacer," ".repeat(3)))}})]},proxy:!0}])}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"size",hideClear:"",isOptional:"",label:"size",options:t.sizeOptions}}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"placement",hideClear:"",isOptional:"",label:"placement",options:t.placementOptions},scopedSlots:t._u([{key:"helpText",fn:function(){return[t._v("\n\t\t\t\tThere are 4 different positions for popovers:\n\t\t\t\t"),o("code",[t._v("right")]),t._v(", "),o("code",[t._v("left")]),t._v(", "),o("code",[t._v("top")]),t._v(", and\n\t\t\t\t"),o("code",[t._v("bottom")]),t._v(", or "),o("code",[t._v("auto")]),t._v(". All of which can be\n\t\t\t\tappended with "),o("code",[t._v("-start")]),t._v(" and "),o("code",[t._v("-end")]),t._v(" to define\n\t\t\t\tplacement.\n\t\t\t\t"),o("br"),t._v(" "),o("a",{attrs:{href:"https://atomiks.github.io/tippyjs/v6/all-props/#placement"}},[t._v("\n\t\t\t\t\tSee Placement Options here\n\t\t\t\t")]),t._v(" "),o("br"),t._v("\n\t\t\t\tBy default, it flips if there's more space in the mirror placement.\n\t\t\t")]},proxy:!0}])}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"trigger",hideClear:"",label:"trigger",options:t.triggerOptions},scopedSlots:t._u([{key:"helpText",fn:function(){return[t._v("\n\t\t\t\tAssigning a "),o("code",[t._v("ref")]),t._v(" exposes "),o("code",[t._v("open()")]),t._v(" and\n\t\t\t\t"),o("code",[t._v("close()")]),t._v(" (Typed via "),o("code",[t._v("Kotti.Popover.Ref")]),t._v(")\n\t\t\t")]},proxy:!0}])}),t._v(" "),o("KtPopover",{ref:"interactiveExampleRef",attrs:{options:t.values.useOptions?t.exampleOptions:[],placement:t.values.placement,size:t.values.size,trigger:t.values.trigger},scopedSlots:t._u([t.values.useOptions?null:{key:"content",fn:function(){return[o("div",{staticStyle:{"max-width":"500px"}},[o("code",{domProps:{textContent:t._s("<template #content>Slot</template>")}}),t._v(" "),o("br"),t._v(" "),o("strong",[t._v("We also support sub-dropdowns")]),t._v(" like\n\t\t\t\t\t"),o("code",[t._v("KtFieldSingleSelect")]),t._v(", however it’s recommended to use\n\t\t\t\t\t"),o("code",[t._v('trigger="click"')]),t._v(" when utilizing this.\n\t\t\t\t\t"),o("br"),t._v(" "),o("KtFieldDateTime",{attrs:{formKey:"valueDateTime",isOptional:"",label:"Label"}}),t._v(" "),o("KtFieldDateTimeRange",{attrs:{formKey:"valueDateTimeRange",isOptional:"",label:"Label"}}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"valueSingleSelect",helpText:"Some helpText",isOptional:"",label:"Test with dropdown",options:[{label:"Click me",value:"test_click"}]}})],1)]},proxy:!0}],null,!0)},[o("KtButton",{attrs:{label:"KtPopover Button"}})],1),t._v(" "),o("br"),o("br"),t._v(" "),o("h3",{domProps:{textContent:t._s("Methods")}}),t._v(" "),o("KtButton",{attrs:{label:"interactiveExampleRef.open()"},on:{click:function(){return t.interactiveExampleRef.open()}}}),t._v(" "),o("KtButton",{attrs:{label:"interactiveExampleRef.close()"},on:{click:function(){return t.interactiveExampleRef.close()}}}),t._v(" "),o("br"),o("br")],1),t._v(" "),o("h2",{domProps:{textContent:t._s("Scoped Slot")}}),t._v(" "),t._m(1),t._v(" "),o("div",{staticClass:"element-example"},[o("KtPopover",{staticClass:"mt-4 ml-4",attrs:{trigger:"hover"},scopedSlots:t._u([{key:"content",fn:function(e){return[o("p",[t._v("Save your message")]),t._v(" "),o("KtButton",{attrs:{type:"text"},on:{click:e.close}},[t._v("Cancel")]),t._v(" "),o("KtButton",{attrs:{type:"primary"}},[t._v("Save")])]}}])},[o("KtButton",{attrs:{label:"Close with Cancel Button"}})],1)],1),t._v(" "),o("div",{domProps:{innerHTML:t._s(t.PopoverExample)}})],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("p",[t._v("\n\t\tUse popovers to provide extra information or actions. Compared to\n\t\t"),o("code",[t._v("tooltip")]),t._v(", "),o("code",[t._v("popovers")]),t._v(" can carry more information.\n\t\t"),o("code",[t._v("KtPopover")]),t._v(" "),o("strong",[t._v("supports")]),t._v(" escaping the\n\t\t"),o("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context"}},[t._v("\n\t\t\tCSS Stacking Context\n\t\t")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("\n\t\tBesides the default slot, KtPopover exposes "),e("code",[this._v("content")]),this._v(" slot,\n\t\twhich exposes a "),e("code",[this._v("close")]),this._v(" function on the slot-scope, which, when\n\t\tcalled, closes the popper.\n\t")])}],!1,null,null,null);e.default=component.exports}}]);