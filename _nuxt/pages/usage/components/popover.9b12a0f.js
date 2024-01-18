(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1127:function(t,e,o){"use strict";o.r(e);o(398),o(189),o(895);var n,r=o(269),l=o(122),c=o(350),d=o(397),v=o(5),_=o(0),m=o(889);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}!function(t){t.OPTIONS="OPTIONS",t.SELECTABLE_OPTIONS="SELECTABLE_OPTIONS",t.SLOT="SLOT"}(n||(n={}));var y=Object(_.defineComponent)({name:"DocumentationPageUsageComponentsPopever",components:{ComponentInfo:m.a},setup:function(){var t=Object(_.ref)(null),e=Object(_.ref)([{isDisabled:!1,isOptional:!0,dataTest:"data-test",label:"User",isSelected:!1,icon:v.Yoco.Icon.USER},{isDisabled:!1,isOptional:!0,label:"Attachment",icon:v.Yoco.Icon.ATTACHMENT},{isDisabled:!0,isOptional:!0,label:"Disabled Option",icon:v.Yoco.Icon.SHIPPING}]);return{component:c.a,exampleOptions:e,handleUpdateIsSelected:function(t){e.value=e.value.map((function(option,e){var o;return e===t.index?h(h({},option),{},{isSelected:null!==(o=t.value)&&void 0!==o?o:void 0}):option}))},interactiveExampleRef:t,isPopoverDisabled:Object(_.ref)(!1),placementOptions:Object(_.computed)((function(){return Object.entries(d.a.Popover.Placement).map((function(t){var e=Object(r.a)(t,2),o=e[0],n=e[1];return{label:"Kotti.Popover.Placement.".concat(o," ('").concat(n,"')"),value:n}}))})),replacer:function(t,e){return"function"==typeof e?e?"() => {}":void 0:e},sizeOptions:Object(_.computed)((function(){return Object.entries(d.a.Popover.Size).map((function(t){var e=Object(r.a)(t,2),o=e[0],n=e[1];return{label:"Kotti.Popover.Size.".concat(o," (").concat(n,")"),value:n}}))})),triggerOptions:Object(_.computed)((function(){return Object.entries(d.a.Popover.Trigger).map((function(t){var e=Object(r.a)(t,2),o=e[0],n=e[1];return{label:"Kotti.Popover.Trigger.".concat(o," (").concat(n,")"),value:n}}))})),usageOptions:Object(_.computed)((function(){return[{label:"Use Slot",value:n.SLOT},{label:"Use Options",value:n.OPTIONS},{label:"Use Selectable Options",value:n.SELECTABLE_OPTIONS}]})),UsageMode:n,values:Object(_.ref)({placement:d.a.Popover.Placement.AUTO,size:d.a.Popover.Size.AUTO,trigger:d.a.Popover.Trigger.CLICK,usageMode:n.SLOT,valueDateTime:null,valueDateTimeRange:[null,null],valueSingleSelect:null})}}}),O=o(86),component=Object(O.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),t._m(0),t._v(" "),o("h2",[t._v("Interactive Example")]),t._v(" "),o("KtForm",{model:{value:t.values,callback:function(e){t.values=e},expression:"values"}},[o("KtFieldSingleSelect",{attrs:{formKey:"usageMode",hideClear:"",isOptional:"",label:"usage",options:t.usageOptions},scopedSlots:t._u([{key:"helpText",fn:function(){return[t._v("\n\t\t\t\tPassing "),o("code",[t._v("options")]),t._v(" turns "),o("code",[t._v("KtPopover")]),t._v(" into a\n\t\t\t\tpre-made dropdown button menu.\n\t\t\t\t"),o("dl",[o("dt",[t._v("TypeScript")]),t._v(" "),o("dd",[o("code",[t._v("Kotti.Popover.Props['options']")])])]),t._v(" "),o("pre",{domProps:{textContent:t._s(JSON.stringify(t.exampleOptions,t.replacer," ".repeat(3)))}})]},proxy:!0}])}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"size",hideClear:"",isOptional:"",label:"size",options:t.sizeOptions}}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"placement",hideClear:"",isOptional:"",label:"placement",options:t.placementOptions},scopedSlots:t._u([{key:"helpText",fn:function(){return[t._v("\n\t\t\t\tThere are 4 different positions for popovers:\n\t\t\t\t"),o("code",[t._v("right")]),t._v(", "),o("code",[t._v("left")]),t._v(", "),o("code",[t._v("top")]),t._v(", and\n\t\t\t\t"),o("code",[t._v("bottom")]),t._v(", or "),o("code",[t._v("auto")]),t._v(". All of which can be\n\t\t\t\tappended with "),o("code",[t._v("-start")]),t._v(" and "),o("code",[t._v("-end")]),t._v(" to define\n\t\t\t\tplacement.\n\t\t\t\t"),o("br"),t._v(" "),o("a",{attrs:{href:"https://atomiks.github.io/tippyjs/v6/all-props/#placement"}},[t._v("\n\t\t\t\t\tSee Placement Options here\n\t\t\t\t")]),t._v(" "),o("br"),t._v("\n\t\t\t\tBy default, it flips if there's more space in the mirror placement.\n\t\t\t")]},proxy:!0}])}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"trigger",hideClear:"",label:"trigger",options:t.triggerOptions},scopedSlots:t._u([{key:"helpText",fn:function(){return[t._v("\n\t\t\t\tAssigning a "),o("code",[t._v("ref")]),t._v(" exposes "),o("code",[t._v("open()")]),t._v(" and\n\t\t\t\t"),o("code",[t._v("close()")]),t._v(" (Typed via "),o("code",[t._v("Kotti.Popover.Ref")]),t._v(")\n\t\t\t")]},proxy:!0}])}),t._v(" "),o("KtPopover",{ref:"interactiveExampleRef",attrs:{areOptionsSelectable:t.values.usageMode===t.UsageMode.SELECTABLE_OPTIONS,options:t.exampleOptions,placement:t.values.placement,size:t.values.size,trigger:t.values.trigger},on:{"update:isSelected":t.handleUpdateIsSelected},scopedSlots:t._u([t.values.usageMode===t.UsageMode.SLOT?{key:"content",fn:function(){return[o("div",{staticStyle:{"max-width":"500px"}},[o("pre",[t._v("\t\t\t\t\t\t"),o("code",{domProps:{textContent:t._s("<template #content>Slot</template>")}}),t._v("\n\t\t\t\t\t")]),t._v(" "),o("strong",[t._v("We also support sub-dropdowns")]),t._v(" like\n\t\t\t\t\t"),o("code",[t._v("KtFieldSingleSelect")]),t._v(", however it’s recommended to use\n\t\t\t\t\t"),o("code",[t._v('trigger="click"')]),t._v(" when utilizing this.\n\t\t\t\t\t"),o("br"),t._v(" "),o("KtFieldDateTime",{attrs:{formKey:"valueDateTime",isOptional:"",label:"Label"}}),t._v(" "),o("KtFieldDateTimeRange",{attrs:{formKey:"valueDateTimeRange",isOptional:"",label:"Label"}}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"valueSingleSelect",helpText:"Some helpText",isOptional:"",label:"Test with dropdown",options:[{label:"Click me",value:"test_click"}]}})],1)]},proxy:!0}:null],null,!0)},[o("KtButton",{attrs:{label:"KtPopover Button"}})],1),t._v(" "),o("br"),o("br"),t._v(" "),o("h3",{domProps:{textContent:t._s("Methods")}}),t._v(" "),o("KtButton",{attrs:{label:"interactiveExampleRef.open()"},on:{click:function(){return t.interactiveExampleRef.open()}}}),t._v(" "),o("KtButton",{attrs:{label:"interactiveExampleRef.close()"},on:{click:function(){return t.interactiveExampleRef.close()}}}),t._v(" "),o("br"),o("br")],1),t._v(" "),o("h2",{domProps:{textContent:t._s("Scoped Slot")}}),t._v(" "),t._m(1),t._v(" "),o("div",{staticClass:"element-example"},[o("KtPopover",{staticClass:"mt-4 ml-4",attrs:{trigger:"hover"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.showPopover;return[o("KtButton",{attrs:{label:e?"Close with Cancel Button":"Hover to open Popover"}})]}},{key:"content",fn:function(e){return[o("p",[t._v("Save your message")]),t._v(" "),o("KtButton",{attrs:{type:"text"},on:{click:e.close}},[t._v(" Cancel ")]),t._v(" "),o("KtButton",{attrs:{type:"primary"}},[t._v(" Save ")])]}}])})],1),t._v(" "),o("pre",[t._v('\t\t<KtPopover trigger="hover">\n\t\t\t<KtButton label="Close with Cancel Button" />\n\t\t\t<template #content="{ close }">\n\t\t\t\t<p>Save your message</p>\n\t\t\t\t<KtButton label="Cancel" type="text" @click="close" />\n\t\t\t\t<KtButton label="Save" type="primary" />\n\t\t\t</template>\n\t\t</KtPopover>\n\t')]),t._v(" "),o("h2",{domProps:{textContent:t._s("Disabling")}}),t._v(" "),t._m(2),t._v(" "),o("div",{staticClass:"element-example element-example--flex"},[o("KtPopover",{staticClass:"mt-4 ml-4",attrs:{isDisabled:t.isPopoverDisabled,trigger:"hover"},scopedSlots:t._u([{key:"content",fn:function(){return[o("p",[t._v("Switch the toggle to disable this popover")])]},proxy:!0}])},[o("a",{domProps:{textContent:t._s("Hover Me")}})]),t._v(" "),o("br"),t._v(" "),o("br"),t._v(" "),o("KtFieldToggle",{attrs:{isOptional:""},model:{value:t.isPopoverDisabled,callback:function(e){t.isPopoverDisabled=e},expression:"isPopoverDisabled"}},[t._v("\n\t\t\tIs Popover disabled\n\t\t")])],1)],1)}),[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("p",[t._v("\n\t\tUse popovers to provide extra information or actions. Compared to\n\t\t"),o("code",[t._v("tooltip")]),t._v(", "),o("code",[t._v("popovers")]),t._v(" can carry more information.\n\t\t"),o("code",[t._v("KtPopover")]),t._v(" "),o("strong",[t._v("supports")]),t._v(" escaping the\n\t\t"),o("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context"}},[t._v("\n\t\t\tCSS Stacking Context\n\t\t")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("\n\t\tBesides the default slot, KtPopover exposes "),e("code",[this._v("content")]),this._v(" slot,\n\t\twhich exposes a "),e("code",[this._v("close")]),this._v(" function on the slot-scope, which, when\n\t\tcalled, closes the popper.\n\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("span",[this._v("\n\t\tIf passing "),e("code",[this._v(" isDisabled ")]),this._v(" as "),e("code",[this._v(" true ")]),this._v(" clicking the\n\t\ttrigger element will not have any effect\n\t")])}],!1,null,null,null);e.default=component.exports},886:function(t,e,o){var content=o(892);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(150).default)("6b9a0cdd",content,!0,{sourceMap:!1})},887:function(t,e,o){var content=o(894);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(150).default)("7adb7ed7",content,!0,{sourceMap:!1})},888:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(399);var r=o(493);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},889:function(t,e,o){"use strict";o(398),o(623),o(189),o(491),o(302),o(151),o(268),o(492),o(301);var n=o(122),r=o(888),l=o(397),c=o(5),d=o(303),v=o(0),_=o(890),m=o.n(_),f=o(494),h=o.n(f),y=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),O=(o(891),o(86)),x=Object(O.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"header"},[o("div",{staticClass:"header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"header__details"},[details.description?o("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"scope__item"},[o("div",{class:"scope__type scope__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"scope__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"3aa80673",null).exports;function S(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var C=Object(v.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:x},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(v.computed)((function(){var e=[],o=t.component,c=o.meta,d=c.addedVersion,v=c.componentFolder,_=c.deprecated,m=c.designs,f=c.typeScript,y=o.name,O=null!=v?v:h()(y.replace(/^Kt/,"Kotti")),x=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(O):null;return null!==_&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(_.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(r.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),f&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:x?"".concat(x,"/types.ts"):void 0,right:f.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?S(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):S(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),x&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(x,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?m()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return m()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),P=(o(893),Object(O.a)(C,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info-label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"29ca70be",null));e.a=P.exports},890:function(t,e,o){var n=o(622);t.exports=function(){if(!arguments.length)return[];var t=arguments[0];return n(t)?t:[t]}},891:function(t,e,o){"use strict";var n=o(886);o.n(n).a},892:function(t,e,o){(e=o(149)(!1)).push([t.i,".slots-block[data-v-3aa80673]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-3aa80673]{padding:.4rem .6rem}.slots-block[data-v-3aa80673]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-3aa80673]{display:flex;flex:1;align-items:center}.header__details[data-v-3aa80673]{flex:1}.header__name[data-v-3aa80673]{font-weight:700}.header>*[data-v-3aa80673]{display:flex;align-items:center}.header[data-v-3aa80673]>:not(:first-child){margin-left:.4rem}.header__description[data-v-3aa80673]{flex:1}.header__empty-description[data-v-3aa80673]{flex:1;font-style:italic}.header__empty-scope[data-v-3aa80673]{font-style:italic}.scope[data-v-3aa80673]{margin-left:1.5rem}.scope__item[data-v-3aa80673]{display:flex;align-items:center}.scope__item[data-v-3aa80673]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-3aa80673]{font-style:italic}.scope__name[data-v-3aa80673]{min-width:100px;font-weight:700}.scope__type[data-v-3aa80673]{min-width:60px}.scope__type--is-function[data-v-3aa80673]{color:var(--orange-50)}.scope__type--is-object[data-v-3aa80673]{color:var(--purple-50)}.scope__type--is-integer[data-v-3aa80673]{color:var(--green-50)}",""]),t.exports=e},893:function(t,e,o){"use strict";var n=o(887);o.n(n).a},894:function(t,e,o){(e=o(149)(!1)).push([t.i,".component-info[data-v-29ca70be]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-29ca70be]{flex-direction:row;align-items:center}}.component-info>*[data-v-29ca70be]{display:flex;margin:5px 10px}.component-info__labels[data-v-29ca70be]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-29ca70be]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-29ca70be]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info-label__left[data-v-29ca70be],.component-info-label__right[data-v-29ca70be]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-29ca70be]:hover{text-decoration:underline}.component-info-label__left[data-v-29ca70be]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info-container[data-v-29ca70be]{margin-bottom:32px}.component-info-container[data-v-29ca70be]>:not(:first-child){margin-top:16px}.danger-block[data-v-29ca70be]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-29ca70be]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-29ca70be]{margin-left:8px}.danger-block>section[data-v-29ca70be]{padding:.4rem .6rem}.danger-block>section[data-v-29ca70be]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},895:function(t,e,o){var n=o(49),r=o(896).entries;n({target:"Object",stat:!0},{entries:function(t){return r(t)}})},896:function(t,e,o){var n=o(134),r=o(400),l=o(211),c=o(495).f,d=function(t){return function(e){for(var o,d=l(e),v=r(d),_=v.length,i=0,m=[];_>i;)o=v[i++],n&&!c.call(d,o)||m.push(t?[o,d[o]]:d[o]);return m}};t.exports={entries:d(!0),values:d(!1)}}}]);