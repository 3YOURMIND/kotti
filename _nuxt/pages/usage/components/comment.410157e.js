(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{713:function(t,e,n){var content=n(719);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(108).default)("6285525e",content,!0,{sourceMap:!1})},714:function(t,e,n){var content=n(721);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(108).default)("43cccb2f",content,!0,{sourceMap:!1})},715:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(343);var o=n(405);function l(t){return function(t){if(Array.isArray(t))return Object(r.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(o.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},716:function(t,e,n){"use strict";n(163),n(340),n(161),n(164),n(508),n(162),n(404),n(142),n(341),n(342),n(275),n(95),n(211),n(166),n(274),n(165);var r=n(68),o=n(715),l=n(339),c=n(11),_=n(717),v=n(0),d=n(109),m=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),h=(n(718),n(56)),f=Object(h.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var r=e[0],details=e[1];return n("section",{key:r},[n("div",{staticClass:"slots-block__header"},[n("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(r)}}),t._v(" "),n("div",{staticClass:"slots-block__header__details"},[details.description?n("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var r=e[0],o=e[1],l=o.description,c=o.type;return n("div",{key:r,staticClass:"slots-block__scope__item"},[n("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),n("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(r)}}),t._v(" "),n("div",null===l?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var j=Object(v.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:_.Dashes,labels:Object(v.computed)((function(){var e=[],n=t.component,c=n.meta,_=c.addedVersion,v=c.deprecated,m=c.designs,h=c.typeScript,f=n.name,j=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(d.kebabCase)(f.replace(/^Kt/,"Kotti"))):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(o.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:j?"".concat(j,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),j&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(j,"/").concat(f,".vue"),right:"".concat(f,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(d.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(d.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),y=(n(720),Object(h.a)(j,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var r=e[0],o=e[1];return n("tr",{key:r},[n("td",[n("code",{domProps:{textContent:t._s(r)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(o.type))}})]),t._v(" "),n("td",[o.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===o.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(o.default,o.type))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:o.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:o.validator?o.validator.toString():void 0},domProps:{textContent:t._s(o.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),o.validator?n("div",{domProps:{textContent:t._s(o.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"40fb8180",null));e.a=y.exports},717:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},718:function(t,e,n){"use strict";var r=n(713);n.n(r).a},719:function(t,e,n){(e=n(107)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},720:function(t,e,n){"use strict";var r=n(714);n.n(r).a},721:function(t,e,n){(e=n(107)(!1)).push([t.i,".component-info[data-v-40fb8180]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-40fb8180]{flex-direction:row;align-items:center}}.component-info>*[data-v-40fb8180]{display:flex;margin:5px 10px}.component-info__labels[data-v-40fb8180]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-40fb8180]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-40fb8180],.component-info__label__right[data-v-40fb8180]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-40fb8180]:hover{text-decoration:underline}.component-info__label__left[data-v-40fb8180]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-40fb8180]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-40fb8180]{margin-bottom:32px}.component-info-container[data-v-40fb8180]>:not(:first-child){margin-top:16px}.danger-block[data-v-40fb8180]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-40fb8180]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-40fb8180]{margin-left:8px}.danger-block>section[data-v-40fb8180]{padding:.4rem .6rem}.danger-block>section[data-v-40fb8180]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},722:function(t,e,n){var r=n(736),o="object"==typeof self&&self&&self.Object===Object&&self,l=r||o||Function("return this")();t.exports=l},723:function(t,e,n){var r=n(722).Symbol;t.exports=r},724:function(t,e){t.exports=function(t){return null!=t&&"object"==typeof t}},728:function(t,e,n){var r=n(723),o=n(756),l=n(757),c=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":c&&c in Object(t)?o(t):l(t)}},730:function(t,e){var n=Array.isArray;t.exports=n},736:function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(this,n(83))},756:function(t,e,n){var r=n(723),o=Object.prototype,l=o.hasOwnProperty,c=o.toString,_=r?r.toStringTag:void 0;t.exports=function(t){var e=l.call(t,_),n=t[_];try{t[_]=void 0;var r=!0}catch(t){}var o=c.call(t);return r&&(e?t[_]=n:delete t[_]),o}},757:function(t,e){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},857:function(t,e,n){"use strict";var r=n(30),o=n(145).findIndex,l=n(279),c=!0;"findIndex"in[]&&Array(1).findIndex((function(){c=!1})),r({target:"Array",proto:!0,forced:c},{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),l("findIndex")},858:function(t,e,n){var r=n(859),o=n(861),l=/[&<>"']/g,c=RegExp(l.source);t.exports=function(t){return(t=o(t))&&c.test(t)?t.replace(l,r):t}},859:function(t,e,n){var r=n(860)({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});t.exports=r},860:function(t,e){t.exports=function(object){return function(t){return null==object?void 0:object[t]}}},861:function(t,e,n){var r=n(862);t.exports=function(t){return null==t?"":r(t)}},862:function(t,e,n){var r=n(723),o=n(863),l=n(730),c=n(864),_=r?r.prototype:void 0,v=_?_.toString:void 0;t.exports=function t(e){if("string"==typeof e)return e;if(l(e))return o(e,t)+"";if(c(e))return v?v.call(e):"";var n=e+"";return"0"==n&&1/e==-1/0?"-0":n}},863:function(t,e){t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}},864:function(t,e,n){var r=n(728),o=n(724);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==r(t)}},972:function(t,e,n){"use strict";n.r(e);n(163),n(340),n(161),n(510),n(857),n(164),n(214),n(142),n(341),n(342),n(275),n(211),n(274),n(165);var r=n(68),o=n(715),l=n(152),c=n(858),_=n.n(c);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={name:"DocumentationPageUsageComponentsComment",components:{ComponentInfo:n(716).a},data:function(){return{currentUuid:"",currentUser:{userAvatar:"https://picsum.photos/48",userId:3,userName:"Junyu"},comments:[{createdTime:"2018-12-04T09:57:20+00:00",id:1,isDeletable:!0,isEditable:!0,message:"We miss you, David",replies:[{createdTime:"2018-03-20",id:2,isDeletable:!1,isEditable:!1,message:"Join Bright Side Now!<br/>Join Bright Side Now! Join Bright Side Now! Join Bright Side Now!",userAvatar:"https://picsum.photos/100",userId:13,userName:"Benni"},{createdTime:"2018-03-20",id:3,isDeletable:!1,isEditable:!0,message:"RE: Your trip to Montreal",userAvatar:"https://picsum.photos/120",userId:2,userName:"Cooky"},{createdTime:"2018-03-20",id:4,isDeletable:!0,isEditable:!1,message:"PS: Bring a jacket!",userAvatar:"https://picsum.photos/120",userId:2,userName:"Cooky"}],userAvatar:"https://picsum.photos/200",userId:12,userName:"Margaret Atwood"}],component:l.a}},computed:{replyName:function(){var t=this,e=this.comments.find((function(e){return e.uuid===t.currentUuid}));return e?e.name:null}},methods:{dangerouslyOverrideParser:function(t){return _()(t)},postEscapeParser:function(t){return t.replace(/\n/g,"</br>")},handleEdit:function(t){var e=t.id,n=t.message,r=t.parentId;if(null===r){var l=this.comments.findIndex((function(t){return t.id===e}));return this.comments=[].concat(Object(o.a)(this.comments.slice(0,l)),[d(d({},this.comments[l]),{},{message:n})],Object(o.a)(this.comments.slice(l+1)))}var c=this.comments.findIndex((function(t){return t.id===r})),_=this.comments[c].replies,v=_.findIndex((function(t){return t.id===e})),m=[].concat(Object(o.a)(_.slice(0,v)),[d(d({},_[v]),{},{message:n})],Object(o.a)(_.slice(v+1)));this.comments=[].concat(Object(o.a)(this.comments.slice(0,c)),[d(d({},this.comments[c]),{},{replies:m})],Object(o.a)(this.comments.slice(c+1)))},handleSubmit:function(t){var e=d(d({},this.currentUser),{},{id:Math.floor(101*Math.random()),message:t.message,createdTime:(new Date).toDateString(),replies:[]}),n=this.comments.find((function(e){return e.id===t.parentId}));n?n.replies.push(e):this.comments.push(e)},handleDelete:function(t){if(t.parentId){var e=this.comments.find((function(e){return e.id===t.parentId}));e.replies=e.replies.filter((function(e){return e.id!==t.id}))}this.comments=this.comments.filter((function(e){return e.id!==t.id}))}}},h=n(56),component=Object(h.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("h2",[t._v("Example")]),t._v(" "),n("div",{staticClass:"element-example"},[t._l(t.comments,(function(e){return n("KtComment",{key:e.id,attrs:{createdTime:e.createdTime,id:e.id,isDeletable:e.isDeletable,isEditable:e.isEditable,message:e.message,replies:e.replies,userAvatar:e.userAvatar,userId:e.userId,userName:e.userName},on:{delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)},submit:function(e){return t.handleSubmit(e)}}})})),t._v(" "),n("KtCommentInput",{staticClass:"mt-16px",attrs:{placeholder:"Add comment",userAvatar:"https://picsum.photos/120"},on:{submit:function(e){return t.handleSubmit(e)}}})],2),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Usage")]),t._v(" "),n("h3",[t._v("Comment Object")]),t._v(" "),t._m(1),t._v(" "),n("h3",[t._v("Payload Object")]),t._v(" "),t._m(2),t._v(" "),n("h2",[t._v("Parsing HTML")]),t._v(" "),n("p",[t._v("KtComment will escape all tags by default but you can opt out and pass your own parser by using the parser prop")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),n("div",{staticClass:"element-example"},[t._l(t.comments,(function(e){return n("KtComment",{key:e.id,attrs:{createdTime:e.createdTime,dangerouslyOverrideParser:t.dangerouslyOverrideParser,id:e.id,isDeletable:e.isDeletable,isEditable:e.isEditable,message:e.message,postEscapeParser:t.postEscapeParser,replies:e.replies,userAvatar:e.userAvatar,userId:e.userId,userName:e.userName},on:{delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)},submit:function(e){return t.handleSubmit(e)}}})})),t._v(" "),n("KtCommentInput",{staticClass:"mt-16px",attrs:{placeholder:"Add comment",userAvatar:"https://picsum.photos/120"},on:{submit:function(e){return t.handleSubmit(e)}}})],2),t._v(" "),n("h3",[t._v("Event")]),t._v(" "),t._m(5)],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtComment")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("v-for")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment in comments"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":key")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.id"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":createdTime")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.createdTime"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":id")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.id"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":isDeletable")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.isDeletable"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":isEditable")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.isEditable"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":message")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.message"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":replies")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.replies"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":userAvatar")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.userAvatar"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":userId")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.userId"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":userName")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.userName"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("delete")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handleDelete($event)"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("edit")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handleEdit($event)"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("submit")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handlePost($event)"')]),t._v("\n/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtCommentInput")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"mt-16px"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("placeholder")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Add comment"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userAvatar")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"https://picsum.photos/120"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("submit")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handlePost($event)"')]),t._v("\n/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[t._v("{\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("id")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("1")]),t._v(", "),n("span",{staticClass:"hljs-comment"},[t._v("// Comment ID")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userId")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("12")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userName")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Margaret Atwood'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Marine Le Pen, a Fierce Campaigner'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userAvatar")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'https://picsum.photos/200'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("createdTime")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'2018-12-04T09:57:20+00:00'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("isDeletable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("isEditable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("replies")]),t._v(": [{\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("id")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("2")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("userId")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("12")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("userName")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Margaret Atwood'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Marine Le Pen, a Fierce Campaigner'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("userAvatar")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'https://picsum.photos/200'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("createdTime")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'2018-12-04T09:57:20+00:00'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isDeletable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isEditable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v("\n\t}]\n}\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[n("span",{staticClass:"hljs-comment"},[t._v("// Submit Payload")]),t._v("\n{\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("parentId")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("Number")]),t._v(" "),n("span",{staticClass:"hljs-comment"},[t._v("// If null => parent comment")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("replyToUserId")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("Number")]),t._v(" "),n("span",{staticClass:"hljs-comment"},[t._v("// Reserved variable for @ function")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("String")]),t._v("\n}\n\n"),n("span",{staticClass:"hljs-comment"},[t._v("// Edit Payload")]),t._v("\n{\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("id")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("Number")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("String")]),t._v("\n}\n\n"),n("span",{staticClass:"hljs-comment"},[t._v("// Delete Payload")]),t._v("\n{\n}\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("Remember to "),e("strong",[this._v("escape malicious tags")]),this._v(" to prevent "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Cross-site_scripting"}},[this._v("Cross-site-scripting")]),this._v(" attacks,\nyou can use KtComment's default parser function with KtComment.defaultParser")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[t._v("methods: {\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("dangerouslyOverrideParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" "),n("span",{staticClass:"hljs-built_in"},[t._v("escape")]),t._v("(msg).replace("),n("span",{staticClass:"hljs-regexp"},[t._v("/\\n/g")]),t._v(", "),n("span",{staticClass:"hljs-string"},[t._v("'<br>'")]),t._v("),\n\t"),n("span",{staticClass:"hljs-comment"},[t._v("// alternativly you could")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("dangerouslyOverrideParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" "),n("span",{staticClass:"hljs-built_in"},[t._v("escape")]),t._v("(msg),\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("postEscapeParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" msg.replace("),n("span",{staticClass:"hljs-regexp"},[t._v("/\\n/g")]),t._v(", "),n("span",{staticClass:"hljs-string"},[t._v("'<br/>'")]),t._v("),\n\t"),n("span",{staticClass:"hljs-comment"},[t._v("// or just")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("postEscapeParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" msg.replace("),n("span",{staticClass:"hljs-regexp"},[t._v("/\\n/g")]),t._v(", "),n("span",{staticClass:"hljs-string"},[t._v("'<br/>'")]),t._v("),\n}\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",[t._v("Event Name")]),t._v(" "),n("th",[t._v("Component")]),t._v(" "),n("th",[t._v("Payload")]),t._v(" "),n("th",[t._v("Description")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[n("code",[t._v("@submit")])]),t._v(" "),n("td",[n("code",[t._v("KtCommentInput")])]),t._v(" "),n("td",[t._v("See above")]),t._v(" "),n("td",[t._v("Add new comment")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("@delete")])]),t._v(" "),n("td",[n("code",[t._v("KtComment")])]),t._v(" "),n("td",[t._v("See above")]),t._v(" "),n("td",[t._v("Delete comment")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("@edit")])]),t._v(" "),n("td",[n("code",[t._v("KtComment")])]),t._v(" "),n("td",[t._v("See above")]),t._v(" "),n("td",[t._v("Edit comment")])])])])}],!1,null,null,null);e.default=component.exports}}]);