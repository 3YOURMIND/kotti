(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1066:function(t,e,o){"use strict";o(1067)},1067:function(t,e,o){"use strict";var n=o(9),r=o(24),c=o(11),l=o(66),d=o(17),f=o(102),v=o(343),m=o(35),_=o(131),h=o(339),y=o(528),x=o(19),C=o(42),O=x("replace"),k=TypeError,j=c("".indexOf),S=c("".replace),w=c("".slice),P=Math.max;n({target:"String",proto:!0},{replaceAll:function(t,e){var o,n,c,x,D,F,K,T,A,M=l(this),I=0,N=0,R="";if(!f(t)){if((o=v(t))&&(n=m(l(h(t))),!~j(n,"g")))throw new k("`.replaceAll` does not allow non-global regexes");if(c=_(t,O))return r(c,t,M,e);if(C&&o)return S(m(M),t,e)}for(x=m(M),D=m(t),(F=d(e))||(e=m(e)),K=D.length,T=P(1,K),I=j(x,D);-1!==I;)A=F?m(e(D,I,x)):y(D,x,I,[],void 0,e),R+=w(x,N,I)+A,N=I+K,I=I+T>x.length?-1:j(x,D,I+T);return N<x.length&&(R+=w(x,N)),R}})},937:function(t,e,o){var content=o(950);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("4ff54064",content,!0,{sourceMap:!1})},938:function(t,e,o){var content=o(952);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("4e0c6a7e",content,!0,{sourceMap:!1})},939:function(t,e,o){"use strict";var n=o(9),r=o(11),c=o(67),l=o(55),d=o(74),f=o(941),v=o(35),m=o(10),_=o(942),h=o(330),y=o(943),x=o(944),C=o(158),O=o(945),k=[],j=r(k.sort),S=r(k.push),w=m((function(){k.sort(void 0)})),P=m((function(){k.sort(null)})),D=h("sort"),F=!m((function(){if(C)return C<70;if(!(y&&y>3)){if(x)return!0;if(O)return O<603;var code,t,e,o,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(o=0;o<47;o++)k.push({k:t+o,v:e})}for(k.sort((function(a,b){return b.v-a.v})),o=0;o<k.length;o++)t=k[o].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:w||!P||!D||!F},{sort:function(t){void 0!==t&&c(t);var e=l(this);if(F)return void 0===t?j(e):j(e,t);var o,n,r=[],m=d(e);for(n=0;n<m;n++)n in e&&S(r,e[n]);for(_(r,function(t){return function(e,o){return void 0===o?-1:void 0===e?1:void 0!==t?+t(e,o)||0:v(e)>v(o)?1:-1}}(t)),o=d(r),n=0;n<o;)e[n]=r[n++];for(;n<m;)f(e,n++);return e}})},940:function(t,e,o){"use strict";var n=o(20),r=(o(97),o(157),o(946),o(939),o(518),o(41),o(124),o(125),o(98),o(99),o(223),o(101),o(224),o(5)),c=o(6),l=(o(65),o(126),o(100),o(519),o(18)),d=o(3),f=o(225),v=o(129),m=o.n(v),_=o(331),h=o.n(_),y=o(0),x=(o(159),Object(y.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(y.ref)(!1)}}})),C=(o(949),o(32)),O=Object(C.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(o){var r=Object(n.a)(o,2),c=r[0],details=r[1];return e("section",{key:c},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(c)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),c=r[0],l=r[1],d=l.description,f=l.type;return e("div",{key:c,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(f),domProps:{textContent:t._s(f)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(c)}}),t._v(" "),e("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(d)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"2187adcd",null).exports;function k(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}var j=Object(y.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:O},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:f.Dashes,labels:Object(y.computed)((function(){var e=[],o=t.component,n=o.meta,d=n.addedVersion,f=n.componentFolder,v=n.deprecated,m=n.designs,_=n.typeScript,y=o.name,x=null!=f?f:h()(y.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(c.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:_.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?k(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):k(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showProps:Object(y.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?m()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return m()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:d.a}}}),S=j,w=(o(951),Object(C.a)(S,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,o){return e("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(o){return e("code",{key:o,domProps:{textContent:t._s(o)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(n.a)(t,1)[0],b=Object(n.a)(e,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),c=r[0],l=r[1];return e("tr",{key:c},[e("td",[e("code",{domProps:{textContent:t._s(c)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),e("td",[l.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyDefault(l.default,l.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?e("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"e3deffa6",null));e.a=w.exports},941:function(t,e,o){"use strict";var n=o(128),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+n(e)+" of "+n(t))}},942:function(t,e,o){"use strict";var n=o(127),r=Math.floor,c=function(t,e){var o=t.length;if(o<8)for(var element,l,i=1;i<o;){for(l=i,element=t[i];l&&e(t[l-1],element)>0;)t[l]=t[--l];l!==i++&&(t[l]=element)}else for(var d=r(o/2),f=c(n(t,0,d),e),v=c(n(t,d),e),m=f.length,_=v.length,h=0,y=0;h<m||y<_;)t[h+y]=h<m&&y<_?e(f[h],v[y])<=0?f[h++]:v[y++]:h<m?f[h++]:v[y++];return t};t.exports=c},943:function(t,e,o){"use strict";var n=o(123).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},944:function(t,e,o){"use strict";var n=o(123);t.exports=/MSIE|Trident/.test(n)},945:function(t,e,o){"use strict";var n=o(123).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},946:function(t,e,o){"use strict";var n=o(9),r=o(947);n({target:"String",proto:!0,forced:o(948)("link")},{link:function(t){return r(this,"a","href",t)}})},947:function(t,e,o){"use strict";var n=o(11),r=o(66),c=o(35),l=/"/g,d=n("".replace);t.exports=function(t,e,o,n){var f=c(r(t)),v="<"+e;return""!==o&&(v+=" "+o+'="'+d(c(n),l,"&quot;")+'"'),v+">"+f+"</"+e+">"}},948:function(t,e,o){"use strict";var n=o(10);t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},949:function(t,e,o){"use strict";o(937)},950:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".slots-block[data-v-2187adcd]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-2187adcd]{padding:.4rem .6rem}.slots-block[data-v-2187adcd]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-2187adcd]{align-items:center;display:flex;flex:1}.header__details[data-v-2187adcd]{flex:1}.header__name[data-v-2187adcd]{font-weight:700}.header>*[data-v-2187adcd]{align-items:center;display:flex}.header[data-v-2187adcd]>:not(:first-child){margin-left:.4rem}.header__description[data-v-2187adcd]{flex:1}.header__empty-description[data-v-2187adcd]{flex:1;font-style:italic}.header__empty-scope[data-v-2187adcd]{font-style:italic}.scope[data-v-2187adcd]{margin-left:1.5rem}.scope__item[data-v-2187adcd]{align-items:center;display:flex}.scope__item[data-v-2187adcd]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-2187adcd]{font-style:italic}.scope__name[data-v-2187adcd]{font-weight:700;min-width:100px}.scope__type[data-v-2187adcd]{min-width:60px}.scope__type--is-function[data-v-2187adcd]{color:var(--orange-50)}.scope__type--is-object[data-v-2187adcd]{color:var(--purple-50)}.scope__type--is-integer[data-v-2187adcd]{color:var(--green-50)}",""]),n.locals={},t.exports=n},951:function(t,e,o){"use strict";o(938)},952:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".component-info[data-v-e3deffa6]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-e3deffa6]{align-items:center;flex-direction:row}}.component-info>*[data-v-e3deffa6]{display:flex;margin:5px 10px}.component-info__labels[data-v-e3deffa6]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-e3deffa6]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-e3deffa6]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-e3deffa6],.component-info-label__right[data-v-e3deffa6]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-e3deffa6]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-e3deffa6]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-e3deffa6]{margin-bottom:32px}.component-info-container[data-v-e3deffa6]>:not(:first-child){margin-top:16px}.danger-block[data-v-e3deffa6]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-e3deffa6]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-e3deffa6]{margin-left:8px}.danger-block>section[data-v-e3deffa6]{padding:.4rem .6rem}.danger-block>section[data-v-e3deffa6]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},t.exports=n},959:function(t,e,o){"use strict";o.d(e,"d",(function(){return f})),o.d(e,"a",(function(){return v})),o.d(e,"b",(function(){return m})),o.d(e,"c",(function(){return y}));var n=o(23),r=o(20),c=o(6),l=(o(226),o(519),o(99),o(41),o(100),o(518),o(157),o(125),o(65),o(126),o(97),o(939),o(1066),o(18)),d=["KtFieldDate","KtFieldDateRange","KtFieldDateTime","KtFieldDateTimeRange","KtFieldFileUpload","KtFieldFileUploadRemote","KtFieldMultiSelect","KtFieldMultiSelectRemote","KtFieldNumber","KtFieldPassword","KtFieldRadioGroup","KtFieldSingleSelect","KtFieldSingleSelectRemote","KtFieldText","KtFieldTextArea","KtFieldToggle","KtFieldToggleGroup","KtFilters","KtValueLabel"],f=function(t){return d.includes(t)},v=function(t){return t?[{label:"Create Item",onClick:function(){return alert("actions[0].onClick called")}},{label:"Edit Item",onClick:function(){return alert("actions[1].onClick called")}}]:void 0},m=function(t){return t?{actions:{onCancel:function(t){return console.log("onCancel: ".concat(t))},onDelete:function(t){return console.log("onDelete: ".concat(t))},onRetry:function(t){return console.log("onRetry: ".concat(t))},onUpload:function(t){return console.log("onUpload: ".concat(t))}},payload:{}}:void 0},_=function(component){var t=m(component.hasRemoteUpload);return t?"".concat(Object(c.a)(Object.entries(t).map((function(t){var e=Object(r.a)(t,2),o=e[0],n=e[1];return"actions"===o?["\t:".concat(o,": {")].concat(Object(c.a)(Object.keys(n).map((function(t){return"\t\t".concat(t,": (id: number | string) => {},")}))),["\t},"]).join("\n"):"payload"===o?"\t:".concat(o,": ").concat(JSON.stringify(n).replace(/"/g,"'"),","):void 0})).filter((function(t){return t}))).join("\n")):null},h=function(component){return null!==component.contentSlot||null!==component.defaultSlot||component.hasHelpTextSlot||null!==component.headerSlot?[">"].concat(Object(c.a)(null!==component.contentSlot?['\t<template #content :option="option">',"\t\t".concat(component.contentSlot),"\t</template>"]:[]),Object(c.a)(null!==component.defaultSlot?["\t".concat(component.defaultSlot)]:[]),Object(c.a)(component.hasHelpTextSlot?["\t<template #helpText>","\t\t<div>","\t\t\tSlot Content","\t\t</div>","\t</template>"]:[]),Object(c.a)(null!==component.headerSlot?['\t<template #header :option="option">',"\t\t".concat(component.headerSlot),"\t</template>"]:[]),["</".concat(component.name,">")]).join("\n"):"/>"},y=function(component){var t,e;return["<".concat(component.name)].concat(Object(c.a)(Object.entries(component.props).sort((function(t,e){var a=Object(r.a)(t,1)[0],b=Object(r.a)(e,1)[0];return a.localeCompare(b)})).filter((function(t){var e=Object(r.a)(t,2),o=e[0],n=e[1];return!!["query"].includes(o)||null!==n&&!1!==n})).filter((function(t){var e=Object(r.a)(t,2),o=e[0],n=e[1];return!("size"===o&&n===l.a.Field.Size.MEDIUM||"helpText"===o&&component.hasHelpTextSlot||"extensions"===o&&Array.isArray(n)&&0===n.length||"actions"===o||"payload"===o)})).map((function(t){var e=Object(r.a)(t,2),o=e[0],c=e[1];switch(Object(n.a)(c)){case"boolean":return o;case"string":return"".concat(o,'="').concat(c,'"');default:return":".concat(o,'="').concat(JSON.stringify(c).replace(/"/g,"'"),'"')}})).map((function(t){return"\t".concat(t)}))),Object(c.a)(component.hasActions?['\t:actions="'.concat(JSON.stringify(null!==(e=null===(t=v(!0))||void 0===t?void 0:t.map((function(a){return"{ label: '".concat(a.label,"', onClick: () => {} }")})))&&void 0!==e?e:[]).replaceAll('"',""),'"')]:[]),Object(c.a)("empty"===component.validation?[]:["\t:validator=\"(value) => ({ text: 'Some Validation Text', type: \"".concat(component.validation,'" })"')]),[_(component),h(component)]).filter((function(t){return t})).join("\n")}}}]);