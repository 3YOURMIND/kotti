(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1051:function(t,e,n){"use strict";n.r(e);var o=n(13),r=n(0),l=n(864),c=n(838),v=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsBreadcrumb",components:{ComponentInfo:c.a},setup:function(){var t=Object(l.a)(),e=Object(r.ref)(2);return{activeIndex:e,component:o.g,links:[{title:"Kotti",onClick:function(){e.value=0,t.value.push("#")},isCompleted:!0},{title:"Usage",onClick:function(){e.value=1,t.value.push("#")},isCompleted:!0},{title:"Components",onClick:function(){e.value=2,t.value.push("#")},isCompleted:!0},{title:"Links",onClick:function(){e.value=3,t.value.push("#")},isCompleted:!1},{title:"Breadcrumbs",onClick:function(){e.value=4,t.value.push("#")},isDisabled:!0}],textSeparator:{style:"text",value:"/"}}}}),d=n(32),component=Object(d.a)(v,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("section",[e("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),e("p",[t._v("Indicate the current page’s location within a navigational hierarchy.")]),t._v(" "),e("h2",[t._v("Basic")]),t._v(" "),e("div",{staticClass:"element-example white"},[e("KtBreadcrumb",{attrs:{activeIndex:t.activeIndex,breadcrumbs:t.links}})],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),e("h2",[t._v("Separator Style")]),t._v(" "),e("div",{staticClass:"element-example white"},[e("KtBreadcrumb",{attrs:{breadcrumbs:t.links,separator:t.textSeparator}})],1),t._v(" "),t._m(2),t._v(" "),t._m(3)],1)}),[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{staticClass:"language-html"},[e("span",{staticClass:"hljs-tag"},[t._v("<"),e("span",{staticClass:"hljs-name"},[t._v("KtBreadcrumb")]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v(":activeIndex")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"activeIndex"')]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v(":breadcrumbs")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"links"')]),t._v(" />")]),t._v("\n")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{staticClass:"language-js"},[t._v("links: [\n\t{\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'Kotti'")]),t._v(",\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),e("span",{staticClass:"hljs-function"},[t._v("() =>")]),t._v(" {\n\t\t\tactiveIndex.value = "),e("span",{staticClass:"hljs-number"},[t._v("0")]),t._v(",\n\t\t\trouter.value.push("),e("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(")\n\t\t}\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("isCompleted")]),t._v(": "),e("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t},\n\t{\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'Usage'")]),t._v(",\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),e("span",{staticClass:"hljs-function"},[t._v("() =>")]),t._v(" {\n\t\t\tactiveIndex.value = "),e("span",{staticClass:"hljs-number"},[t._v("1")]),t._v(",\n\t\t\trouter.value.push("),e("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v("),\n\t\t}\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("isCompleted")]),t._v(": "),e("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t},\n\t{\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'Components'")]),t._v(",\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),e("span",{staticClass:"hljs-function"},[t._v("() =>")]),t._v(" {\n\t\t\tactiveIndex.value = "),e("span",{staticClass:"hljs-number"},[t._v("2")]),t._v(",\n\t\t\trouter.value.push("),e("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(")\n\t\t}\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("isCompleted")]),t._v(": "),e("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t},\n\t{\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'Links'")]),t._v(",\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),e("span",{staticClass:"hljs-function"},[t._v("() =>")]),t._v(" {\n\t\t\tactiveIndex.value = "),e("span",{staticClass:"hljs-number"},[t._v("3")]),t._v("\n\t\t\trouter.value.push("),e("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(")\n\t\t},\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("isCompleted")]),t._v(": "),e("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t},\n\t{\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("title")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'Breadcrumbs'")]),t._v(",\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("onClick")]),t._v(": "),e("span",{staticClass:"hljs-function"},[t._v("() =>")]),t._v(" {\n\t\t\tactiveIndex.value = "),e("span",{staticClass:"hljs-number"},[t._v("4")]),t._v(",\n\t\t\trouter.value.push("),e("span",{staticClass:"hljs-string"},[t._v("'#'")]),t._v(")\n\t\t}\n\t\t"),e("span",{staticClass:"hljs-attr"},[t._v("isDisabled")]),t._v(": "),e("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t}\n]\n")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{staticClass:"language-html"},[e("span",{staticClass:"hljs-tag"},[t._v("<"),e("span",{staticClass:"hljs-name"},[t._v("KtBreadcrumb")]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v(":breadcrumbs")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"links"')]),t._v(" "),e("span",{staticClass:"hljs-attr"},[t._v(":separator")]),t._v("="),e("span",{staticClass:"hljs-string"},[t._v('"textSeparator"')]),t._v(" />")]),t._v("\n")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{staticClass:"language-js"},[e("span",{staticClass:"hljs-comment"},[t._v("// default separator")]),t._v("\n"),e("span",{staticClass:"hljs-attr"},[t._v("iconSeparator")]),t._v(": {\n\t"),e("span",{staticClass:"hljs-attr"},[t._v("style")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'icon'")]),t._v(",\n\t"),e("span",{staticClass:"hljs-attr"},[t._v("value")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'chevron_right'")]),t._v("\n},\n"),e("span",{staticClass:"hljs-attr"},[t._v("textSeparator")]),t._v(": {\n\t"),e("span",{staticClass:"hljs-attr"},[t._v("style")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'text'")]),t._v(",\n\t"),e("span",{staticClass:"hljs-attr"},[t._v("value")]),t._v(": "),e("span",{staticClass:"hljs-string"},[t._v("'/'")]),t._v("\n},\n")])])}],!1,null,null,null);e.default=component.exports},835:function(t,e,n){var content=n(848);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(62).default)("5ab58312",content,!0,{sourceMap:!1})},836:function(t,e,n){var content=n(850);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(62).default)("145e1866",content,!0,{sourceMap:!1})},837:function(t,e,n){"use strict";var o=n(9),r=n(11),l=n(65),c=n(54),v=n(71),d=n(839),_=n(35),f=n(10),m=n(840),h=n(288),C=n(841),x=n(842),j=n(145),y=n(843),k=[],w=r(k.sort),O=r(k.push),P=f((function(){k.sort(void 0)})),S=f((function(){k.sort(null)})),I=h("sort"),D=!f((function(){if(j)return j<70;if(!(C&&C>3)){if(x)return!0;if(y)return y<603;var code,t,e,n,o="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)k.push({k:t+n,v:e})}for(k.sort((function(a,b){return b.v-a.v})),n=0;n<k.length;n++)t=k[n].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}}));o({target:"Array",proto:!0,forced:P||!S||!I||!D},{sort:function(t){void 0!==t&&l(t);var e=c(this);if(D)return void 0===t?w(e):w(e,t);var n,o,r=[],f=v(e);for(o=0;o<f;o++)o in e&&O(r,e[o]);for(m(r,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:_(e)>_(n)?1:-1}}(t)),n=v(r),o=0;o<n;)e[o]=r[o++];for(;o<f;)d(e,o++);return e}})},838:function(t,e,n){"use strict";var o=n(21),r=(n(90),n(203),n(844),n(837),n(458),n(40),n(112),n(113),n(91),n(76),n(204),n(93),n(205),n(5)),l=n(7),c=(n(63),n(114),n(92),n(287),n(13)),v=n(3),d=n(206),_=n(117),f=n.n(_),m=n(289),h=n.n(m),C=n(0),x=(n(146),Object(C.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(C.ref)(!1)}}})),j=(n(847),n(32)),y=Object(j.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(n){var r=Object(o.a)(n,2),l=r[0],details=r[1];return e("section",{key:l},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(n){var r=Object(o.a)(n,2),l=r[0],c=r[1],v=c.description,d=c.type;return e("div",{key:l,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(d),domProps:{textContent:t._s(d)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",null===v?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(v)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"88744c10",null).exports;function k(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var w=Object(C.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:y,KtHeading:c.J},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(C.computed)((function(){var e=[],n=t.component,o=n.meta,v=o.addedVersion,d=o.componentFolder,_=o.deprecated,f=o.designs,m=o.typeScript,C=n.name,x=null!=d?d:h()(C.replace(/^Kt/,"Kotti")),j=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==_&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(_.version)}),null!==f?Array.isArray(f)?e.push.apply(e,Object(l.a)(f.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},c.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(r.a)({},c.a.MetaDesignType.FIGMA,"Figma")[f.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),m&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:j?"".concat(j,"/types.ts"):void 0,right:m.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?k(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===v?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(v),right:"v".concat(v)})),j&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(j,"/").concat(C,".vue"),right:"".concat(C,".vue")}),e})),showEmits:Object(C.ref)(!1),showProps:Object(C.ref)(!1),stringifyPropDefault:function(t,e){return"function"==typeof t?f()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return f()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:v.a}}}),O=w,P=(n(849),Object(j.a)(O,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,n){return e("div",{key:n,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(n){return e("code",{key:n,domProps:{textContent:t._s(n)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(o.a)(t,1)[0],b=Object(o.a)(e,1)[0];return a.localeCompare(b)})),(function(n){var r=Object(o.a)(n,2),l=r[0],c=r[1];return e("tr",{key:l},[e("td",[e("code",{domProps:{textContent:t._s(l)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(c.type))}})]),t._v(" "),e("td",[c.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===c.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyPropDefault(c.default,c.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:t._s(c.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),c.validator?e("div",{domProps:{textContent:t._s(c.validator.name)}}):t._e()])])])})),0)])]):t._e(),t._v(" "),t.component.emits&&t.component.emits.length>0?e("KtHeading",{attrs:{text:"Emits",toggleStatus:t.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showEmits=!t.showEmits}}},[e("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[t._l(t.component.emits,(function(n){return[e("code",{key:n,domProps:{textContent:t._s("@".concat(n))}})]}))],2)]):t._e()],1)}),[],!1,null,"85d7c186",null));e.a=P.exports},839:function(t,e,n){"use strict";var o=n(116),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+o(e)+" of "+o(t))}},840:function(t,e,n){"use strict";var o=n(115),r=Math.floor,l=function(t,e){var n=t.length;if(n<8)for(var element,c,i=1;i<n;){for(c=i,element=t[i];c&&e(t[c-1],element)>0;)t[c]=t[--c];c!==i++&&(t[c]=element)}else for(var v=r(n/2),d=l(o(t,0,v),e),_=l(o(t,v),e),f=d.length,m=_.length,h=0,C=0;h<f||C<m;)t[h+C]=h<f&&C<m?e(d[h],_[C])<=0?d[h++]:_[C++]:h<f?d[h++]:_[C++];return t};t.exports=l},841:function(t,e,n){"use strict";var o=n(111).match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},842:function(t,e,n){"use strict";var o=n(111);t.exports=/MSIE|Trident/.test(o)},843:function(t,e,n){"use strict";var o=n(111).match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},844:function(t,e,n){"use strict";var o=n(9),r=n(845);o({target:"String",proto:!0,forced:n(846)("link")},{link:function(t){return r(this,"a","href",t)}})},845:function(t,e,n){"use strict";var o=n(11),r=n(64),l=n(35),c=/"/g,v=o("".replace);t.exports=function(t,e,n,o){var d=l(r(t)),_="<"+e;return""!==n&&(_+=" "+n+'="'+v(l(o),c,"&quot;")+'"'),_+">"+d+"</"+e+">"}},846:function(t,e,n){"use strict";var o=n(10);t.exports=function(t){return o((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},847:function(t,e,n){"use strict";n(835)},848:function(t,e,n){var o=n(61)((function(i){return i[1]}));o.push([t.i,".slots-block[data-v-88744c10]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-88744c10]{padding:.4rem .6rem}.slots-block[data-v-88744c10]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-88744c10]{align-items:center;display:flex;flex:1}.header__details[data-v-88744c10]{flex:1}.header__name[data-v-88744c10]{font-weight:700}.header>*[data-v-88744c10]{align-items:center;display:flex}.header[data-v-88744c10]>:not(:first-child){margin-left:.4rem}.header__description[data-v-88744c10]{flex:1}.header__empty-description[data-v-88744c10]{flex:1;font-style:italic}.header__empty-scope[data-v-88744c10]{font-style:italic}.scope[data-v-88744c10]{margin-left:1.5rem}.scope__item[data-v-88744c10]{align-items:center;display:flex}.scope__item[data-v-88744c10]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-88744c10]{font-style:italic}.scope__name[data-v-88744c10]{font-weight:700;min-width:100px}.scope__type[data-v-88744c10]{min-width:60px}.scope__type--is-function[data-v-88744c10]{color:var(--orange-50)}.scope__type--is-object[data-v-88744c10]{color:var(--purple-50)}.scope__type--is-integer[data-v-88744c10]{color:var(--green-50)}",""]),o.locals={},t.exports=o},849:function(t,e,n){"use strict";n(836)},850:function(t,e,n){var o=n(61)((function(i){return i[1]}));o.push([t.i,".component-info[data-v-85d7c186]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-85d7c186]{align-items:center;flex-direction:row}}.component-info>*[data-v-85d7c186]{display:flex;margin:5px 10px}.component-info__labels[data-v-85d7c186]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-85d7c186]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-85d7c186]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-85d7c186],.component-info-label__right[data-v-85d7c186]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-85d7c186]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-85d7c186]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-85d7c186]{margin-bottom:32px}.component-info-container[data-v-85d7c186]>:not(:first-child){margin-top:16px}.danger-block[data-v-85d7c186]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-85d7c186]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-85d7c186]{margin-left:8px}.danger-block>section[data-v-85d7c186]{padding:.4rem .6rem}.danger-block>section[data-v-85d7c186]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),o.locals={},t.exports=o},864:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(0),r=function(){var t=Object(o.getCurrentInstance)();if(!t)throw new Error("This must be called within a setup function.");return Object(o.computed)((function(){return t.proxy.$root.$router}))}}}]);