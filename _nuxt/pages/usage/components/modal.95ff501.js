(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1125:function(t,e,o){"use strict";o.r(e);var n=o(360),r=o(397),l=o(0),c=o(889),d=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsModal",components:{ComponentInfo:c.a},setup:function(){return{component:n.a,showAnnouncement:Object(l.ref)(!0),showModal:Object(l.ref)(!1),settings:Object(l.ref)({preventCloseOutside:!1,size:r.a.Modal.Size.MEDIUM,usedSlots:{body:!0,footer:!0,header:!0}})}}}),v=o(86),component=Object(v.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("KtForm",{model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[o("KtFieldSingleSelect",{attrs:{formKey:"size",isOptional:"",label:"size",options:[{label:"sm",value:"sm"},{label:"md (default)",value:"md"},{label:"lg",value:"lg"},{label:"xl",value:"xl"}]}}),t._v(" "),o("KtFieldToggle",{attrs:{formKey:"preventCloseOutside",helpText:"Disables closing the modal by clicking outside when set",isOptional:"",label:"preventCloseOutside",type:"switch"}}),t._v(" "),o("KtFieldToggleGroup",{attrs:{formKey:"usedSlots",isOptional:"",label:"Used Slots",options:[{label:"header",key:"header"},{label:"body",key:"body"},{label:"footer",key:"footer"}]}})],1),t._v(" "),o("KtModal",{attrs:{isOpen:t.showAnnouncement},on:{close:function(e){t.showAnnouncement=!1}}},[o("span",{attrs:{slot:"body"},slot:"body"},[t._v(" I am an announcement. I open by default ")]),t._v(" "),o("KtButton",{attrs:{slot:"footer",label:"close"},on:{click:function(e){t.showAnnouncement=!1}},slot:"footer"})],1),t._v(" "),o("KtButton",{attrs:{label:"Open Modal"},on:{click:function(e){t.showModal=!0}}}),t._v(" "),o("KtModal",{attrs:{isOpen:t.showModal,preventCloseOutside:t.settings.preventCloseOutside,size:t.settings.size},on:{close:function(e){t.showModal=!1}},scopedSlots:t._u([t.settings.usedSlots.header?{key:"header",fn:function(){return[o("h2",{staticStyle:{margin:"0"}},[t._v("This the modal title")])]},proxy:!0}:null,t.settings.usedSlots.body?{key:"body",fn:function(){return[o("p",{staticStyle:{margin:"0"}},[t._v("\n\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t")]),t._v(" "),o("p",{staticStyle:{margin:"0"}},[t._v("\n\t\t\t\tNunc a sollicitudin libero, consectetur interdum ligula.\n\t\t\t")])]},proxy:!0}:null,t.settings.usedSlots.footer?{key:"footer",fn:function(){return[o("KtButton",{attrs:{label:"Close"},on:{click:function(e){t.showModal=!1}}})]},proxy:!0}:null],null,!0)})],1)}),[],!1,null,null,null);e.default=component.exports},886:function(t,e,o){var content=o(892);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(150).default)("6b9a0cdd",content,!0,{sourceMap:!1})},887:function(t,e,o){var content=o(894);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(150).default)("7adb7ed7",content,!0,{sourceMap:!1})},888:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(399);var r=o(493);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},889:function(t,e,o){"use strict";o(398),o(623),o(189),o(491),o(302),o(151),o(268),o(492),o(301);var n=o(122),r=o(888),l=o(397),c=o(5),d=o(303),v=o(0),f=o(890),m=o.n(f),_=o(494),y=o.n(_),h=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),x=(o(891),o(86)),C=Object(x.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"header"},[o("div",{staticClass:"header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"header__details"},[details.description?o("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"scope__item"},[o("div",{class:"scope__type scope__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"scope__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"3aa80673",null).exports;function k(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var O=Object(v.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:C},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(v.computed)((function(){var e=[],o=t.component,c=o.meta,d=c.addedVersion,v=c.componentFolder,f=c.deprecated,m=c.designs,_=c.typeScript,h=o.name,x=null!=v?v:y()(h.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==f&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(r.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:_.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(h,".vue"),right:"".concat(h,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?m()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return m()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),w=(o(893),Object(x.a)(O,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info-label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"29ca70be",null));e.a=w.exports},890:function(t,e,o){var n=o(622);t.exports=function(){if(!arguments.length)return[];var t=arguments[0];return n(t)?t:[t]}},891:function(t,e,o){"use strict";var n=o(886);o.n(n).a},892:function(t,e,o){(e=o(149)(!1)).push([t.i,".slots-block[data-v-3aa80673]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-3aa80673]{padding:.4rem .6rem}.slots-block[data-v-3aa80673]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-3aa80673]{display:flex;flex:1;align-items:center}.header__details[data-v-3aa80673]{flex:1}.header__name[data-v-3aa80673]{font-weight:700}.header>*[data-v-3aa80673]{display:flex;align-items:center}.header[data-v-3aa80673]>:not(:first-child){margin-left:.4rem}.header__description[data-v-3aa80673]{flex:1}.header__empty-description[data-v-3aa80673]{flex:1;font-style:italic}.header__empty-scope[data-v-3aa80673]{font-style:italic}.scope[data-v-3aa80673]{margin-left:1.5rem}.scope__item[data-v-3aa80673]{display:flex;align-items:center}.scope__item[data-v-3aa80673]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-3aa80673]{font-style:italic}.scope__name[data-v-3aa80673]{min-width:100px;font-weight:700}.scope__type[data-v-3aa80673]{min-width:60px}.scope__type--is-function[data-v-3aa80673]{color:var(--orange-50)}.scope__type--is-object[data-v-3aa80673]{color:var(--purple-50)}.scope__type--is-integer[data-v-3aa80673]{color:var(--green-50)}",""]),t.exports=e},893:function(t,e,o){"use strict";var n=o(887);o.n(n).a},894:function(t,e,o){(e=o(149)(!1)).push([t.i,".component-info[data-v-29ca70be]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-29ca70be]{flex-direction:row;align-items:center}}.component-info>*[data-v-29ca70be]{display:flex;margin:5px 10px}.component-info__labels[data-v-29ca70be]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-29ca70be]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-29ca70be]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info-label__left[data-v-29ca70be],.component-info-label__right[data-v-29ca70be]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-29ca70be]:hover{text-decoration:underline}.component-info-label__left[data-v-29ca70be]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info-container[data-v-29ca70be]{margin-bottom:32px}.component-info-container[data-v-29ca70be]>:not(:first-child){margin-top:16px}.danger-block[data-v-29ca70be]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-29ca70be]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-29ca70be]{margin-left:8px}.danger-block>section[data-v-29ca70be]{padding:.4rem .6rem}.danger-block>section[data-v-29ca70be]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e}}]);