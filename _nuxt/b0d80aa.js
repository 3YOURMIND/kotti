(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{1e3:function(t,e,o){var content=o(1125);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("c47b75f4",content,!0,{sourceMap:!1})},1124:function(t,e,o){"use strict";o(1e3)},1125:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".line-description[data-v-2f9a54da]{margin:1.5rem 0 .5rem}",""]),n.locals={},t.exports=n},1168:function(t,e,o){"use strict";o.r(e);var n=o(18),r=o(0),c=o(939),l=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsLine",components:{ComponentInfo:c.a},setup:function(){return{component:n.R,showTag:Object(r.ref)(!0)}}}),d=(o(1124),o(32)),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("section",[e("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),e("p",[t._v("Tags should either visualize active user input or invite for a user action.")]),t._v(" "),t._m(0),t._v(" "),e("KtTag",{attrs:{text:"I display Information",isDisabled:""}}),t._v(" "),t.showTag?e("KtTag",{attrs:{text:"You can remove me if you want"},on:{close:function(e){t.showTag=!1}}}):t._e()],1)}),[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{staticClass:"language-html"},[t._v("\t"),e("span",{staticClass:"hljs-tag"},[t._v("<"),e("span",{staticClass:"hljs-name"},[t._v("KtTag")]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"I display Information"')]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v("isDisabled")]),t._v("/>")]),t._v("\n\t"),e("span",{staticClass:"hljs-tag"},[t._v("<"),e("span",{staticClass:"hljs-name"},[t._v("KtTag")]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v("v-if")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"showTag"')]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"You can remove me if you want"')]),t._v(" @"),e("span",{staticClass:"hljs-attr"},[t._v("close")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"showTag = false"')]),t._v(" />")]),t._v("\n")])])}],!1,null,"2f9a54da",null);e.default=component.exports},936:function(t,e,o){var content=o(949);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("5ab58312",content,!0,{sourceMap:!1})},937:function(t,e,o){var content=o(951);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("1b2060d8",content,!0,{sourceMap:!1})},938:function(t,e,o){"use strict";var n=o(9),r=o(11),c=o(67),l=o(55),d=o(74),f=o(940),v=o(35),_=o(10),m=o(941),h=o(332),x=o(942),y=o(943),C=o(160),k=o(944),w=[],j=r(w.sort),O=r(w.push),P=_((function(){w.sort(void 0)})),S=_((function(){w.sort(null)})),D=h("sort"),T=!_((function(){if(C)return C<70;if(!(x&&x>3)){if(y)return!0;if(k)return k<603;var code,t,e,o,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(o=0;o<47;o++)w.push({k:t+o,v:e})}for(w.sort((function(a,b){return b.v-a.v})),o=0;o<w.length;o++)t=w[o].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:P||!S||!D||!T},{sort:function(t){void 0!==t&&c(t);var e=l(this);if(T)return void 0===t?j(e):j(e,t);var o,n,r=[],_=d(e);for(n=0;n<_;n++)n in e&&O(r,e[n]);for(m(r,function(t){return function(e,o){return void 0===o?-1:void 0===e?1:void 0!==t?+t(e,o)||0:v(e)>v(o)?1:-1}}(t)),o=d(r),n=0;n<o;)e[n]=r[n++];for(;n<_;)f(e,n++);return e}})},939:function(t,e,o){"use strict";var n=o(21),r=(o(98),o(226),o(945),o(938),o(518),o(40),o(125),o(126),o(99),o(80),o(227),o(101),o(228),o(5)),c=o(7),l=(o(65),o(127),o(100),o(331),o(18)),d=o(3),f=o(229),v=o(130),_=o.n(v),m=o(333),h=o.n(m),x=o(0),y=(o(161),Object(x.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(x.ref)(!1)}}})),C=(o(948),o(32)),k=Object(C.a)(y,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(o){var r=Object(n.a)(o,2),c=r[0],details=r[1];return e("section",{key:c},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(c)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),c=r[0],l=r[1],d=l.description,f=l.type;return e("div",{key:c,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(f),domProps:{textContent:t._s(f)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(c)}}),t._v(" "),e("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(d)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"88744c10",null).exports;function w(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}var j=Object(x.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:k},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:f.Dashes,labels:Object(x.computed)((function(){var e=[],o=t.component,n=o.meta,d=n.addedVersion,f=n.componentFolder,v=n.deprecated,_=n.designs,m=n.typeScript,x=o.name,y=null!=f?f:h()(x.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(y):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==_?Array.isArray(_)?e.push.apply(e,Object(c.a)(_.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:_.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[_.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),m&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:m.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?w(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):w(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(x,".vue"),right:"".concat(x,".vue")}),e})),showProps:Object(x.ref)(!1),stringifyPropDefault:function(t,e){return"function"==typeof t?_()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return _()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:d.a}}}),O=j,P=(o(950),Object(C.a)(O,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,o){return e("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(o){return e("code",{key:o,domProps:{textContent:t._s(o)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(n.a)(t,1)[0],b=Object(n.a)(e,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),c=r[0],l=r[1];return e("tr",{key:c},[e("td",[e("code",{domProps:{textContent:t._s(c)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),e("td",[l.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyPropDefault(l.default,l.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?e("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"f916cf2a",null));e.a=P.exports},940:function(t,e,o){"use strict";var n=o(129),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+n(e)+" of "+n(t))}},941:function(t,e,o){"use strict";var n=o(128),r=Math.floor,c=function(t,e){var o=t.length;if(o<8)for(var element,l,i=1;i<o;){for(l=i,element=t[i];l&&e(t[l-1],element)>0;)t[l]=t[--l];l!==i++&&(t[l]=element)}else for(var d=r(o/2),f=c(n(t,0,d),e),v=c(n(t,d),e),_=f.length,m=v.length,h=0,x=0;h<_||x<m;)t[h+x]=h<_&&x<m?e(f[h],v[x])<=0?f[h++]:v[x++]:h<_?f[h++]:v[x++];return t};t.exports=c},942:function(t,e,o){"use strict";var n=o(124).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},943:function(t,e,o){"use strict";var n=o(124);t.exports=/MSIE|Trident/.test(n)},944:function(t,e,o){"use strict";var n=o(124).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},945:function(t,e,o){"use strict";var n=o(9),r=o(946);n({target:"String",proto:!0,forced:o(947)("link")},{link:function(t){return r(this,"a","href",t)}})},946:function(t,e,o){"use strict";var n=o(11),r=o(66),c=o(35),l=/"/g,d=n("".replace);t.exports=function(t,e,o,n){var f=c(r(t)),v="<"+e;return""!==o&&(v+=" "+o+'="'+d(c(n),l,"&quot;")+'"'),v+">"+f+"</"+e+">"}},947:function(t,e,o){"use strict";var n=o(10);t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},948:function(t,e,o){"use strict";o(936)},949:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".slots-block[data-v-88744c10]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-88744c10]{padding:.4rem .6rem}.slots-block[data-v-88744c10]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-88744c10]{align-items:center;display:flex;flex:1}.header__details[data-v-88744c10]{flex:1}.header__name[data-v-88744c10]{font-weight:700}.header>*[data-v-88744c10]{align-items:center;display:flex}.header[data-v-88744c10]>:not(:first-child){margin-left:.4rem}.header__description[data-v-88744c10]{flex:1}.header__empty-description[data-v-88744c10]{flex:1;font-style:italic}.header__empty-scope[data-v-88744c10]{font-style:italic}.scope[data-v-88744c10]{margin-left:1.5rem}.scope__item[data-v-88744c10]{align-items:center;display:flex}.scope__item[data-v-88744c10]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-88744c10]{font-style:italic}.scope__name[data-v-88744c10]{font-weight:700;min-width:100px}.scope__type[data-v-88744c10]{min-width:60px}.scope__type--is-function[data-v-88744c10]{color:var(--orange-50)}.scope__type--is-object[data-v-88744c10]{color:var(--purple-50)}.scope__type--is-integer[data-v-88744c10]{color:var(--green-50)}",""]),n.locals={},t.exports=n},950:function(t,e,o){"use strict";o(937)},951:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".component-info[data-v-f916cf2a]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-f916cf2a]{align-items:center;flex-direction:row}}.component-info>*[data-v-f916cf2a]{display:flex;margin:5px 10px}.component-info__labels[data-v-f916cf2a]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-f916cf2a]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-f916cf2a]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-f916cf2a],.component-info-label__right[data-v-f916cf2a]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-f916cf2a]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-f916cf2a]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-f916cf2a]{margin-bottom:32px}.component-info-container[data-v-f916cf2a]>:not(:first-child){margin-top:16px}.danger-block[data-v-f916cf2a]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-f916cf2a]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-f916cf2a]{margin-left:8px}.danger-block>section[data-v-f916cf2a]{padding:.4rem .6rem}.danger-block>section[data-v-f916cf2a]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},t.exports=n}}]);