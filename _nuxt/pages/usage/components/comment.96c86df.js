(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{686:function(t,e,n){var content=n(692);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(113).default)("c5a5ccd2",content,!0,{sourceMap:!1})},687:function(t,e,n){var content=n(694);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(113).default)("75bee2d0",content,!0,{sourceMap:!1})},688:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var o=n(324);var r=n(387);function l(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},689:function(t,e,n){"use strict";n(323),n(470),n(151),n(216),n(265),n(114),n(215),n(386),n(266);var o=n(93),r=n(688),l=n(322),c=n(5),d=n(690),m=n(0),v=n(43),f=Object(m.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(m.ref)(!1)}}}),_=(n(691),n(68)),h=Object(_.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var o=e[0],details=e[1];return n("section",{key:o},[n("div",{staticClass:"header"},[n("div",{staticClass:"header__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",{staticClass:"header__details"},[details.description?n("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(e){var o=e[0],r=e[1],l=r.description,c=r.type;return n("div",{key:o,staticClass:"scope__item"},[n("div",{class:"scope__type scope__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),n("div",{staticClass:"scope__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",null===l?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"b328c096",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var x=Object(m.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:h},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(m.computed)((function(){var e=[],n=t.component,c=n.meta,d=c.addedVersion,m=c.componentFolder,f=c.deprecated,_=c.designs,h=c.typeScript,x=n.name,C=null!=m?m:Object(v.kebabCase)(x.replace(/^Kt/,"Kotti")),w=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(C):null;return null!==f&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==_?Array.isArray(_)?e.push.apply(e,Object(r.a)(_.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(o.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:_.url,right:Object(o.a)({},l.a.MetaDesignType.FIGMA,"Figma")[_.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:w?"".concat(w,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),w&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(w,"/").concat(x,".vue"),right:"".concat(x,".vue")}),e})),showProps:Object(m.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(v.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(v.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),C=(n(693),Object(_.a)(x,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info-label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var o=e[0],r=e[1];return n("tr",{key:o},[n("td",[n("code",{domProps:{textContent:t._s(o)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),n("td",[r.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?n("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"f0e99726",null));e.a=C.exports},690:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},691:function(t,e,n){"use strict";var o=n(686);n.n(o).a},692:function(t,e,n){(e=n(112)(!1)).push([t.i,".slots-block[data-v-b328c096]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-b328c096]{padding:.4rem .6rem}.slots-block[data-v-b328c096]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-b328c096]{display:flex;flex:1;align-items:center}.header__details[data-v-b328c096]{flex:1}.header__name[data-v-b328c096]{font-weight:700}.header>*[data-v-b328c096]{display:flex;align-items:center}.header[data-v-b328c096]>:not(:first-child){margin-left:.4rem}.header__description[data-v-b328c096]{flex:1}.header__empty-description[data-v-b328c096]{flex:1;font-style:italic}.header__empty-scope[data-v-b328c096]{font-style:italic}.scope[data-v-b328c096]{margin-left:1.5rem}.scope__item[data-v-b328c096]{display:flex;align-items:center}.scope__item[data-v-b328c096]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-b328c096]{font-style:italic}.scope__name[data-v-b328c096]{min-width:100px;font-weight:700}.scope__type[data-v-b328c096]{min-width:60px}.scope__type--is-function[data-v-b328c096]{color:var(--orange-50)}.scope__type--is-object[data-v-b328c096]{color:var(--purple-50)}.scope__type--is-integer[data-v-b328c096]{color:var(--green-50)}",""]),t.exports=e},693:function(t,e,n){"use strict";var o=n(687);n.n(o).a},694:function(t,e,n){(e=n(112)(!1)).push([t.i,".component-info[data-v-f0e99726]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-f0e99726]{flex-direction:row;align-items:center}}.component-info>*[data-v-f0e99726]{display:flex;margin:5px 10px}.component-info__labels[data-v-f0e99726]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-f0e99726]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-f0e99726]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info-label__left[data-v-f0e99726],.component-info-label__right[data-v-f0e99726]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-f0e99726]:hover{text-decoration:underline}.component-info-label__left[data-v-f0e99726]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info-container[data-v-f0e99726]{margin-bottom:32px}.component-info-container[data-v-f0e99726]>:not(:first-child){margin-top:16px}.danger-block[data-v-f0e99726]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-f0e99726]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-f0e99726]{margin-left:8px}.danger-block>section[data-v-f0e99726]{padding:.4rem .6rem}.danger-block>section[data-v-f0e99726]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},697:function(t,e,n){var o=n(707),r="object"==typeof self&&self&&self.Object===Object&&self,l=o||r||Function("return this")();t.exports=l},698:function(t,e,n){var o=n(697).Symbol;t.exports=o},699:function(t,e){t.exports=function(t){return null!=t&&"object"==typeof t}},702:function(t,e,n){var o=n(698),r=n(726),l=n(727),c=o?o.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":c&&c in Object(t)?r(t):l(t)}},704:function(t,e){var n=Array.isArray;t.exports=n},707:function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(this,n(94))},726:function(t,e,n){var o=n(698),r=Object.prototype,l=r.hasOwnProperty,c=r.toString,d=o?o.toStringTag:void 0;t.exports=function(t){var e=l.call(t,d),n=t[d];try{t[d]=void 0;var o=!0}catch(t){}var r=c.call(t);return o&&(e?t[d]=n:delete t[d]),r}},727:function(t,e){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},728:function(t,e,n){var content=n(824);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(113).default)("19a2f8a7",content,!0,{sourceMap:!1})},816:function(t,e,n){var o=n(817),r=n(819),l=/[&<>"']/g,c=RegExp(l.source);t.exports=function(t){return(t=r(t))&&c.test(t)?t.replace(l,o):t}},817:function(t,e,n){var o=n(818)({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});t.exports=o},818:function(t,e){t.exports=function(object){return function(t){return null==object?void 0:object[t]}}},819:function(t,e,n){var o=n(820);t.exports=function(t){return null==t?"":o(t)}},820:function(t,e,n){var o=n(698),r=n(821),l=n(704),c=n(822),d=o?o.prototype:void 0,m=d?d.toString:void 0;t.exports=function t(e){if("string"==typeof e)return e;if(l(e))return r(e,t)+"";if(c(e))return m?m.call(e):"";var n=e+"";return"0"==n&&1/e==-1/0?"-0":n}},821:function(t,e){t.exports=function(t,e){for(var n=-1,o=null==t?0:t.length,r=Array(o);++n<o;)r[n]=e(t[n],n,t);return r}},822:function(t,e,n){var o=n(702),r=n(699);t.exports=function(t){return"symbol"==typeof t||r(t)&&"[object Symbol]"==o(t)}},823:function(t,e,n){"use strict";var o=n(728);n.n(o).a},824:function(t,e,n){(e=n(112)(!1)).push([t.i,".no-background[data-v-009e715a]{background:unset}",""]),t.exports=e},939:function(t,e,n){"use strict";n.r(e);n(267),n(472),n(151),n(215),n(266);var o=n(93),r=n(160),l=n(0),c=n(816),d=n.n(c),m=n(689);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsComment",components:{ComponentInfo:m.a},setup:function(){var t=Object(l.ref)([{createdAt:"2018-03-21 09:49",id:1,isDeletable:!0,isEditable:!0,isInternal:!0,message:"We miss you, David",replies:[{createdAt:"2018-03-21 09:57",id:2,isDeletable:!1,isEditable:!1,isInternal:!0,message:"Join Bright Side Now!<br/>Join Bright Side Now!",user:{avatar:"https://picsum.photos/100",id:13,name:"Benni"}},{createdAt:"2018-03-21 10:05",id:3,isDeletable:!1,isEditable:!0,isInternal:!0,isModified:!0,message:"RE: Your trip to Montreal",user:{avatar:"https://picsum.photos/120",id:2,name:"Cooky"}},{createdAt:"2018-03-21 10:06",id:4,isDeletable:!0,isEditable:!1,isInternal:!0,message:"PS: Bring a jacket!",user:{avatar:"https://picsum.photos/120",id:2,name:"Cooky"}}],user:{avatar:"https://picsum.photos/200",id:12,name:"Margaret"}},{createdAt:"2018-03-23 11:20",id:5,isDeletable:!0,isEditable:!0,message:"BBQ tonite?",replies:[{createdAt:"2018-03-23 11:43",id:6,isDeletable:!0,isEditable:!0,message:"I'm in!",user:{avatar:"https://picsum.photos/210",id:9,name:"Janis"}}],user:{avatar:"https://picsum.photos/230",id:6,name:"Lemmy"}}]),e=Object(l.ref)({avatar:"https://picsum.photos/10",id:3,name:"James"}),n=Object(l.ref)({allowInternal:!0,dataTest:null,isReadOnly:!1,locale:"en-US",placeholder:"Add a comment",tabIndex:null}),o=function(t){var n=t.isInternal,o=t.message;return{createdAt:(new Date).toDateString(),id:Math.floor(101*Math.random()),isDeletable:!0,isEditable:!0,isInternal:n,message:o,replies:[],user:e.value}},c=function(t){return function(e){return e.id===t.id?f(f({},e),{},{isModified:!0,isInternal:t.isInternal,message:t.message}):e}};return{comments:t,component:r.a,currentUser:e,dangerouslyOverrideParser:function(t){return d()(t)},handleAdd:function(e){if(e.parentId){var n=t.value.find((function(t){return t.id===e.parentId}));if(!n)throw new Error("Comment not found, comment id: ".concat(e.parentId));n.replies.push(o({isInternal:e.isInternal,message:e.message}))}else t.value.push(o({isInternal:e.isInternal,message:e.message}))},handleEdit:function(e){if(e.parentId){var n=t.value.find((function(t){return t.id===e.parentId}));if(!n)throw new Error("Comment not found, comment id: ".concat(e.parentId));if(!n.replies.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));n.replies=n.replies.map(c(e))}else{if(!t.value.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));t.value=t.value.map(c(e))}},handleDelete:function(e){if(e.parentId){var n=t.value.find((function(t){return t.id===e.parentId}));if(!n)throw new Error("Comment not found, comment id: ".concat(e.parentId));if(!n.replies.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));n.replies=n.replies.filter((function(t){return t.id!==e.id}))}else{if(!t.value.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));t.value=t.value.filter((function(t){return t.id!==e.id}))}},postEscapeParser:function(t){return t.replace(/\n/g,"</br>")},settings:n}}}),h=(n(823),n(68)),component=Object(h.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),n("h2",[t._v("Example")]),t._v(" "),n("KtI18nContext",{attrs:{locale:t.settings.locale}},[n("div",{staticClass:"element-example no-background"},[t._l(t.comments,(function(e){return n("KtComment",t._b({key:e.id,staticClass:"mb-block",attrs:{allowInternal:t.settings.allowInternal,dataTest:t.settings.dataTest,isReadOnly:t.settings.isReadOnly,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)},delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)}}},"KtComment",e,!1))})),t._v(" "),n("KtCommentInput",{attrs:{allowInternal:t.settings.allowInternal,dataTest:t.settings.dataTest,placeholder:t.settings.placeholder,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)}}})],2),t._v(" "),n("KtForm",{attrs:{size:"small"},model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[n("div",{staticClass:"wrapper"},[n("div",[n("h4",[t._v("Settings")]),t._v(" "),n("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}]}}),t._v(" "),n("KtFieldNumber",{attrs:{formKey:"tabIndex",isOptional:"",label:"tabIndex"}}),t._v(" "),n("KtFieldToggle",{attrs:{formKey:"allowInternal",helpText:"Allows Internal Comments i.e. Restricted access",isOptional:"",label:"allowInternal",type:"switch"}}),t._v(" "),n("KtFieldToggle",{attrs:{formKey:"isReadOnly",helpText:"Hides KtComment action buttons",isOptional:"",label:"isReadOnly",type:"switch"}})],1),t._v(" "),n("div",[n("h4",[t._v("Texts")]),t._v(" "),n("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}}),t._v(" "),n("KtFieldText",{attrs:{formKey:"placeholder",isOptional:"",label:"placeholder"}})],1)])]),t._v(" "),n("pre",[n("code",{attrs:{"data-lang":"vue"}},[t._v('<KtComment\n\tv-for="comment in comments"\n\t:key="comment.id"\n\tv-bind="comment"\n\tallowInternal\n\tdataTest="comments"\n\t:isReadOnly="false"\n\t:tabIndex="1"\n\t:userAvatar="currentUser.avatar"\n\t@add="handleAdd($event)"\n\t@delete="handleDelete($event)"\n\t@edit="handleEdit($event)"\n/>\n<KtCommentInput\n\tallowInternal\n\tdataTest="comments"\n\tplaceholder="Add a comment"\n\t:tabIndex="1"\n\t:userAvatar="currentUser.avatar"\n\t@add="handleAdd($event)"\n/>\n')])]),t._v(" "),n("h2",[t._v("Usage")]),t._v(" "),n("h3",[t._v("Comment Object")]),t._v(" "),n("pre",[n("code",{attrs:{"data-lang":"js"}},[t._v("{\n\tcreatedAt: '2018-12-04 09:57',\n\tid: 1,\n\tisDeletable: true,\n\tisEditable: true,\n\tisInternal: true,\n\tisModified: true,\n\tmessage: 'Comment message',\n\treplies: [\n\t\t{\n\t\t\tcreatedAt: '2018-12-04 09:57',\n\t\t\tid: 2,\n\t\t\tisDeletable: false,\n\t\t\tisEditable: false,\n\t\t\tisInternal: true,\n\t\t\tisModified: true,\n\t\t\tmessage: 'Reply message',\n\t\t\tuser: {\n\t\t\t\tavatar: 'https://picsum.photos/200',\n\t\t\t\tid: 102,\n\t\t\t\tname: 'User name',\n\t\t\t},\n\t\t},\n\t],\n\tuser: {\n\t\tavatar: 'https://picsum.photos/230',\n\t\tid: 101,\n\t\tname: 'User name',\n\t},\n}")])]),t._v(" "),n("h3",[t._v("Events")]),t._v(" "),n("table",[n("tr",[n("th",[t._v("Event Name")]),t._v(" "),n("th",[t._v("Component")]),t._v(" "),n("th",[t._v("Payload")]),t._v(" "),n("th",[t._v("Description")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("@add")])]),t._v(" "),n("td",[n("code",[t._v("KtComment")]),t._v(", "),n("code",[t._v("KtCommentInput")])]),t._v(" "),n("td",[n("pre",[n("code",{attrs:{"data-lang":"ts"}},[t._v("{\n\tisInternal?: boolean,\n\tmessage: string,\n\tparentId?: number | string,\n\treplyToUserId?: number | string,\n}")])])]),t._v(" "),n("td",[t._v("Add new comment")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("@delete")])]),t._v(" "),n("td",[n("code",[t._v("KtComment")])]),t._v(" "),n("td",[n("pre",[n("code",{attrs:{"data-lang":"ts"}},[t._v("{\n\tid: number | string,\n\tparentId?: number | string,\n}")])])]),t._v(" "),n("td",[t._v("Delete comment")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("@edit")])]),t._v(" "),n("td",[n("code",[t._v("KtComment")])]),t._v(" "),n("td",[n("pre",[n("code",{attrs:{"data-lang":"ts"}},[t._v("{\n\tid: number | string,\n\tisInternal?: boolean,\n\tmessage: string,\n\tparentId?: number | string,\n}")])])]),t._v(" "),n("td",[t._v("Edit comment")])])]),t._v(" "),n("h2",[t._v("Parsing HTML")]),t._v(" "),n("p",[t._v("\n\t\t\t\tKtComment will escape all tags by default but you can opt out and pass\n\t\t\t\tyour own parser by using the parser prop.\n\t\t\t")]),t._v(" "),n("blockquote",{attrs:{cite:"https://en.wikipedia.org/wiki/Cross-site_scripting"}},[t._v("\n\t\t\t\tRemember to "),n("b",[t._v("escape malicious tags")]),t._v(" to prevent\n\t\t\t\t"),n("a",{attrs:{href:"https://en.wikipedia.org/wiki/Cross-site_scripting"}},[t._v("Cross-site-scripting")]),t._v("\n\t\t\t\tattacks, you can use KtComment's default parser function with\n\t\t\t\tKtComment.defaultParser.\n\t\t\t")]),t._v(" "),n("pre",[n("code",{attrs:{"data-lang":"js"}},[t._v("methods: {\n\tdangerouslyOverrideParser: msg => escape(msg).replace(/\\n/g, '<br />'),\n\t// alternativly you could\n\tdangerouslyOverrideParser: msg => escape(msg),\n\tpostEscapeParser: msg => msg.replace(/\\n/g, '<br />'),\n\t// or just\n\tpostEscapeParser: msg => msg.replace(/\\n/g, '<br />'),\n}")])]),t._v(" "),n("div",{staticClass:"element-example no-background"},[t._l(t.comments,(function(e){return n("KtComment",t._b({key:e.id,staticClass:"mb-block",attrs:{allowInternal:t.settings.allowInternal,dangerouslyOverrideParser:t.dangerouslyOverrideParser,dataTest:t.settings.dataTest,isReadOnly:t.settings.isReadOnly,postEscapeParser:t.postEscapeParser,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)},delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)}}},"KtComment",e,!1))})),t._v(" "),n("KtCommentInput",{attrs:{allowInternal:t.settings.allowInternal,dataTest:t.settings.dataTest,placeholder:t.settings.placeholder,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)}}})],2)],1)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("\n\t\t\tUse "),e("code",[this._v("KtComment")]),this._v(" to display a comment thread, a comment post and\n\t\t\tcomment replies. It allows adding new replies by clicking on the\n\t\t\t"),e("strong",[this._v("Reply")]),this._v("\n\t\t\tbutton.\n\t\t")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Use "),e("code",[this._v("KtCommentInput")]),this._v(" to input new comment posts.")])}],!1,null,"009e715a",null);e.default=component.exports}}]);