(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{686:function(t,e,o){var content=o(692);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(113).default)("c5a5ccd2",content,!0,{sourceMap:!1})},687:function(t,e,o){var content=o(694);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(113).default)("75bee2d0",content,!0,{sourceMap:!1})},688:function(t,e,o){"use strict";o.d(e,"a",(function(){return c}));var n=o(324);var r=o(387);function c(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},689:function(t,e,o){"use strict";o(323),o(470),o(151),o(216),o(265),o(114),o(215),o(386),o(266);var n=o(93),r=o(688),c=o(322),l=o(5),d=o(690),v=o(0),m=o(43),f=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(v.ref)(!1)}}}),_=(o(691),o(68)),h=Object(_.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"header"},[o("div",{staticClass:"header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"header__details"},[details.description?o("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],c=r.description,l=r.type;return o("div",{key:n,staticClass:"scope__item"},[o("div",{class:"scope__type scope__type--is-"+l,domProps:{textContent:t._s(l)}}),t._v(" "),o("div",{staticClass:"scope__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===c?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(c)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"b328c096",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var x=Object(v.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:h},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(v.computed)((function(){var e=[],o=t.component,l=o.meta,d=l.addedVersion,v=l.componentFolder,f=l.deprecated,_=l.designs,h=l.typeScript,x=o.name,w=null!=v?v:Object(m.kebabCase)(x.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(w):null;return null!==f&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==_?Array.isArray(_)?e.push.apply(e,Object(r.a)(_.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},c.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:_.url,right:Object(n.a)({},c.a.MetaDesignType.FIGMA,"Figma")[_.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(x,".vue"),right:"".concat(x,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(m.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(m.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:l.Yoco}}}),w=(o(693),Object(_.a)(x,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info-label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"f0e99726",null));e.a=w.exports},690:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},691:function(t,e,o){"use strict";var n=o(686);o.n(n).a},692:function(t,e,o){(e=o(112)(!1)).push([t.i,".slots-block[data-v-b328c096]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-b328c096]{padding:.4rem .6rem}.slots-block[data-v-b328c096]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-b328c096]{display:flex;flex:1;align-items:center}.header__details[data-v-b328c096]{flex:1}.header__name[data-v-b328c096]{font-weight:700}.header>*[data-v-b328c096]{display:flex;align-items:center}.header[data-v-b328c096]>:not(:first-child){margin-left:.4rem}.header__description[data-v-b328c096]{flex:1}.header__empty-description[data-v-b328c096]{flex:1;font-style:italic}.header__empty-scope[data-v-b328c096]{font-style:italic}.scope[data-v-b328c096]{margin-left:1.5rem}.scope__item[data-v-b328c096]{display:flex;align-items:center}.scope__item[data-v-b328c096]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-b328c096]{font-style:italic}.scope__name[data-v-b328c096]{min-width:100px;font-weight:700}.scope__type[data-v-b328c096]{min-width:60px}.scope__type--is-function[data-v-b328c096]{color:var(--orange-50)}.scope__type--is-object[data-v-b328c096]{color:var(--purple-50)}.scope__type--is-integer[data-v-b328c096]{color:var(--green-50)}",""]),t.exports=e},693:function(t,e,o){"use strict";var n=o(687);o.n(n).a},694:function(t,e,o){(e=o(112)(!1)).push([t.i,".component-info[data-v-f0e99726]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-f0e99726]{flex-direction:row;align-items:center}}.component-info>*[data-v-f0e99726]{display:flex;margin:5px 10px}.component-info__labels[data-v-f0e99726]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-f0e99726]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-f0e99726]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info-label__left[data-v-f0e99726],.component-info-label__right[data-v-f0e99726]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-f0e99726]:hover{text-decoration:underline}.component-info-label__left[data-v-f0e99726]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info-container[data-v-f0e99726]{margin-bottom:32px}.component-info-container[data-v-f0e99726]>:not(:first-child){margin-top:16px}.danger-block[data-v-f0e99726]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-f0e99726]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-f0e99726]{margin-left:8px}.danger-block>section[data-v-f0e99726]{padding:.4rem .6rem}.danger-block>section[data-v-f0e99726]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},695:function(t,e,o){var n=o(45),r=o(696).entries;n({target:"Object",stat:!0},{entries:function(t){return r(t)}})},696:function(t,e,o){var n=o(115),r=o(325),c=o(170),l=o(388).f,d=function(t){return function(e){for(var o,d=c(e),v=r(d),m=v.length,i=0,f=[];m>i;)o=v[i++],n&&!l.call(d,o)||f.push(t?[o,d[o]]:d[o]);return f}};t.exports={entries:d(!0),values:d(!1)}},724:function(t,e,o){var content=o(813);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(113).default)("3f9fb994",content,!0,{sourceMap:!1})},812:function(t,e,o){"use strict";var n=o(724);o.n(n).a},813:function(t,e,o){(e=o(112)(!1)).push([t.i,"pre[data-v-308d5a00]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-308d5a00]{list-style:none}h3[data-v-308d5a00]{border-bottom:0}.wrapper[data-v-308d5a00]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius)}@media(max-width:959px){.wrapper[data-v-308d5a00]{flex-direction:column}.wrapper[data-v-308d5a00]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-308d5a00]{flex-direction:row}.wrapper>*[data-v-308d5a00]{flex:1}.wrapper[data-v-308d5a00]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-308d5a00]{padding:1.5em;margin:0!important}.field-row[data-v-308d5a00]{display:flex}.field-row>*[data-v-308d5a00]{flex:1}.field-row[data-v-308d5a00]>:not(:first-child){margin-left:10px}.overview[data-v-308d5a00]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-308d5a00]{flex-direction:column}.overview[data-v-308d5a00]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-308d5a00]{flex-direction:row}.overview>*[data-v-308d5a00]{flex:1;flex-basis:0}.overview__code>pre[data-v-308d5a00]{max-width:400px}.overview__component>*[data-v-308d5a00]{margin-right:20px}}.overview__component[data-v-308d5a00]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-308d5a00]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-308d5a00]{height:150px;margin:0;overflow:scroll}.user-container[data-v-308d5a00]{display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between;padding:var(--unit-4)}.user-container__info[data-v-308d5a00]{display:flex;flex-direction:column;align-items:flex-start;margin-left:var(--unit-2);word-wrap:break-word}",""]),t.exports=e},934:function(t,e,o){"use strict";o.r(e);o(151),o(695);var n=o(217),r=o(322),c=o(123),l=o(252),d=o(5),v=o(0),m=o(689),f=Object(v.defineComponent)({name:"DocumentationPageUsageComponentsAvatar",components:{ComponentInfo:m.a},setup:function(){return{avatarSettings:Object(v.ref)({isHoverable:!1,name:"Jony O'Five",showContentSlot:!1,size:r.a.Avatar.Size.MEDIUM,src:"https://picsum.photos/200/100"}),avatarGroupSettings:Object(v.ref)({count:1,isHoverable:!1,isStack:!1,items:[{name:"Beyoncé",src:"https://picsum.photos/200"},{name:"Justin",src:"https://picsum.photos/100"},{name:"Britney",src:"https://picsum.photos/130"},{name:"Shakira",src:"https://picsum.photos/140"},{name:"Rihanna",src:"https://picsum.photos/150"}],showContentSlot:!1,size:r.a.Avatar.Size.MEDIUM}),sizeOptions:Object.entries(r.a.Avatar.Size).map((function(t){var e=Object(n.a)(t,2);return{label:e[0],value:e[1]}})),Kotti:r.a,KtAvatar:c.a,KtAvatarGroup:l.a,Yoco:d.Yoco}}}),_=(o(812),o(68)),component=Object(_.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ComponentInfo",{attrs:{component:t.KtAvatar}}),t._v(" "),o("KtAvatar",t._b({scopedSlots:t._u([t.avatarSettings.showContentSlot?{key:"content",fn:function(){return[o("div",{staticClass:"user-container"},[o("KtAvatar",{attrs:{size:"lg",src:t.avatarSettings.src}}),t._v(" "),o("div",{staticClass:"user-container__info"},[o("h3",{domProps:{textContent:t._s(t.avatarSettings.name)}}),t._v(" "),o("div",[o("span",{staticClass:"yoco",domProps:{textContent:t._s(t.Yoco.Icon.USER)}}),t._v(" "),o("span",[t._v(" email@example.com ")])]),t._v(" "),o("div",[o("span",{staticClass:"yoco",domProps:{textContent:t._s(t.Yoco.Icon.OFFICE)}}),t._v(" "),o("span",[t._v("3yourmind GmbH")])])])],1)]},proxy:!0}:null],null,!0)},"KtAvatar",Object.assign({},t.avatarSettings),!1)),t._v(" "),o("div",{staticClass:"wrapper"},[o("KtForm",{attrs:{size:"small"},model:{value:t.avatarSettings,callback:function(e){t.avatarSettings=e},expression:"avatarSettings"}},[o("KtFieldSingleSelect",{attrs:{formKey:"size",hideClear:"",isOptional:"",label:"size",options:t.sizeOptions}}),t._v(" "),o("KtFieldToggle",{attrs:{formKey:"showContentSlot",isOptional:"",label:"show content slot",type:"switch"}}),t._v(" "),o("KtFieldToggle",{attrs:{formKey:"isHoverable",isOptional:"",label:"isHoverable",type:"switch"}})],1)],1),t._v(" "),o("ComponentInfo",{attrs:{component:t.KtAvatarGroup}}),t._v(" "),o("KtAvatarGroup",t._b({scopedSlots:t._u([t.avatarGroupSettings.showContentSlot?{key:"content",fn:function(e){var n=e.item;return[o("KtRow",[o("KtAvatar",{attrs:{src:n.src}}),t._v(" "),o("h4",{domProps:{textContent:t._s(n.name)}})],1),t._v(" "),o("KtRow",[o("span",{staticClass:"yoco",domProps:{textContent:t._s(t.Yoco.Icon.LOCATION)}}),t._v(" "),o("p",[t._v("Berlin, Germany")])])]}}:null],null,!0)},"KtAvatarGroup",Object.assign({},t.avatarGroupSettings),!1)),t._v(" "),o("div",{staticClass:"wrapper"},[o("KtForm",{attrs:{size:"small"},model:{value:t.avatarGroupSettings,callback:function(e){t.avatarGroupSettings=e},expression:"avatarGroupSettings"}},[o("KtFieldSingleSelect",{attrs:{formKey:"size",hideClear:"",isOptional:"",label:"size",options:t.sizeOptions}}),t._v(" "),o("KtFieldToggle",{attrs:{formKey:"isHoverable",isOptional:"",label:"isHoverable",type:"switch"}}),t._v(" "),o("KtFieldToggle",{attrs:{formKey:"isStack",isOptional:"",label:"isStack",type:"switch"}}),t._v(" "),o("KtFieldNumber",{attrs:{formKey:"count",hideMaximum:"",isOptional:"",label:"count",maximum:t.avatarGroupSettings.items.length,minimum:1}}),t._v(" "),o("KtFieldToggle",{attrs:{formKey:"showContentSlot",isOptional:"",label:"show content slot",type:"switch"}})],1)],1)],1)}),[],!1,null,"308d5a00",null);e.default=component.exports}}]);