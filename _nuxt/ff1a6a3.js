(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{1056:function(t,e,o){"use strict";o(986)},1057:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".copy[data-v-a875e75a]{align-items:center;display:flex;font-size:.875em;height:45px;justify-content:center;line-height:2em}.icon-container[data-v-a875e75a]{box-sizing:border-box;float:left;padding:24px 0;text-align:center}.icon-container .size-1[data-v-a875e75a],.icon-container .size-3[data-v-a875e75a]{opacity:0}.icon-container .copy-hover[data-v-a875e75a]{display:none}.icon-container .copy-nohover[data-v-a875e75a]{display:block}.icon-container[data-v-a875e75a]:hover{background:#f8f8f8;box-shadow:0 2px 2px #ddd;box-sizing:border-box;cursor:pointer}.icon-container:hover .size-1[data-v-a875e75a],.icon-container:hover .size-3[data-v-a875e75a]{opacity:1}.icon-container:hover .copy-hover[data-v-a875e75a]{display:block}.icon-container:hover .copy-nohover[data-v-a875e75a]{display:none}.icon-liga[data-v-a875e75a]{font-weight:700;line-height:2em}.icon-enum[data-v-a875e75a]{color:#ccc;font-size:.6em;line-height:2em}.yoco-flex[data-v-a875e75a]{align-items:center}.yoco-container[data-v-a875e75a],.yoco-flex[data-v-a875e75a]{display:flex;justify-content:center}.yoco-container[data-v-a875e75a]{align-items:flex-end;height:32px;width:32px}.yoco.size-1[data-v-a875e75a]{font-size:16px!important}.yoco.size-2[data-v-a875e75a]{font-size:24px!important}.yoco.size-3[data-v-a875e75a]{font-size:32px!important}",""]),n.locals={},t.exports=n},1058:function(t,e,o){"use strict";o(987)},1059:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,"img[alt=npm-version][data-v-05b9c638]{display:block;width:120px}",""]),n.locals={},t.exports=n},1135:function(t,e,o){"use strict";o.r(e);var n=o(21),r=(o(518),o(18)),c=o(3),l=o(0),d=o(939),f=(o(162),o(963)),v=o.n(f),m=o(343),_=Object(l.defineComponent)({name:"YocoPreview",props:{enum:{required:!0,type:String},icon:{required:!0,type:String}},setup:function(t){var e=Object(l.ref)(!1);return{copyIconSuccessMessage:Object(l.computed)((function(){return'Copied icon "'.concat(t.icon,'"')})),copyLiga:function(t){var o='<i class="yoco">'.concat(t,"</i>");v()(o)?(e.value=!0,window.setTimeout((function(){e.value=!1}),2*m.TimeConversion.MILLISECONDS_PER_SECOND)):window.alert("failed")},copySuccess:e,enumRepresentation:Object(l.computed)((function(){return"Yoco.Icon.".concat(t.enum)}))}}}),y=(o(1056),o(32)),h=Object(y.a)(_,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"icon-container",on:{click:function(e){return t.copyLiga(t.icon)}}},[e("div",{staticClass:"yoco-flex"},[e("div",{staticClass:"yoco-container"},[e("i",{staticClass:"yoco size-1",domProps:{textContent:t._s(t.icon)}})]),t._v(" "),e("div",{staticClass:"yoco-container"},[e("i",{staticClass:"yoco size-2",domProps:{textContent:t._s(t.icon)}})]),t._v(" "),e("div",{staticClass:"yoco-container"},[e("i",{staticClass:"yoco size-3",domProps:{textContent:t._s(t.icon)}})])]),t._v(" "),e("div",{staticClass:"copy copy-nohover"},[e("div",{staticClass:"icon-liga",domProps:{textContent:t._s(t.icon)}}),t._v(" "),e("div",{staticClass:"icon-enum",domProps:{textContent:t._s(t.enumRepresentation)}})]),t._v(" "),t._m(0),t._v(" "),t.copySuccess?e("div",{staticClass:"success-message",domProps:{textContent:t._s(t.copyIconSuccessMessage)}}):t._e()])}),[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"copy copy-hover"},[e("div",[t._v("Click to Copy")])])}],!1,null,"a875e75a",null).exports,x=Object(l.defineComponent)({name:"DocumentationPageFoundationsIconsList",components:{ComponentInfo:d.a,YocoPreview:h},setup:function(){return{component:{name:"Icons",meta:{addedVersion:null,deprecated:null,designs:{type:r.a.MetaDesignType.FIGMA,url:"https://www.figma.com/file/h37hGvsaYJBkjBldtc6Xcp/Yoco-icons"},slots:{},typeScript:{namespace:"Yoco.Icon",schema:c.c}}},copySuccess:Object(l.ref)(!1),Yoco:c.a}}}),C=(o(1058),Object(y.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("section",[e("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),t._m(0),t._v(" "),e("h3",[t._v("List of Icons")]),t._v(" "),e("div",{staticClass:"columns"},t._l(Object.entries(t.Yoco.Icon),(function(o){var r=Object(n.a)(o,2),c=r[0],l=r[1];return e("YocoPreview",{key:l,staticClass:"column col-2 col-md-6",attrs:{enum:c,icon:l},on:{click:function(e){return t.copyLiga(l)}}})})),1)],1)}),[function(){var t=this._self._c;this._self._setupProxy;return t("p",[t("a",{attrs:{href:"https://www.npmjs.com/package/@3yourmind/yoco"}},[t("img",{attrs:{src:"https://badge.fury.io/js/%403yourmind%2Fyoco.svg",alt:"npm-version"}})])])}],!1,null,"05b9c638",null));e.default=C.exports},936:function(t,e,o){var content=o(949);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("5ab58312",content,!0,{sourceMap:!1})},937:function(t,e,o){var content=o(951);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("1b2060d8",content,!0,{sourceMap:!1})},938:function(t,e,o){"use strict";var n=o(9),r=o(11),c=o(67),l=o(55),d=o(74),f=o(940),v=o(35),m=o(10),_=o(941),y=o(332),h=o(942),x=o(943),C=o(160),w=o(944),k=[],P=r(k.sort),O=r(k.push),j=m((function(){k.sort(void 0)})),S=m((function(){k.sort(null)})),D=y("sort"),I=!m((function(){if(C)return C<70;if(!(h&&h>3)){if(x)return!0;if(w)return w<603;var code,t,e,o,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(o=0;o<47;o++)k.push({k:t+o,v:e})}for(k.sort((function(a,b){return b.v-a.v})),o=0;o<k.length;o++)t=k[o].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:j||!S||!D||!I},{sort:function(t){void 0!==t&&c(t);var e=l(this);if(I)return void 0===t?P(e):P(e,t);var o,n,r=[],m=d(e);for(n=0;n<m;n++)n in e&&O(r,e[n]);for(_(r,function(t){return function(e,o){return void 0===o?-1:void 0===e?1:void 0!==t?+t(e,o)||0:v(e)>v(o)?1:-1}}(t)),o=d(r),n=0;n<o;)e[n]=r[n++];for(;n<m;)f(e,n++);return e}})},939:function(t,e,o){"use strict";var n=o(21),r=(o(98),o(226),o(945),o(938),o(518),o(40),o(125),o(126),o(99),o(80),o(227),o(101),o(228),o(5)),c=o(7),l=(o(65),o(127),o(100),o(331),o(18)),d=o(3),f=o(229),v=o(130),m=o.n(v),_=o(333),y=o.n(_),h=o(0),x=(o(161),Object(h.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(h.ref)(!1)}}})),C=(o(948),o(32)),w=Object(C.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(o){var r=Object(n.a)(o,2),c=r[0],details=r[1];return e("section",{key:c},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(c)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),c=r[0],l=r[1],d=l.description,f=l.type;return e("div",{key:c,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(f),domProps:{textContent:t._s(f)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(c)}}),t._v(" "),e("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(d)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"88744c10",null).exports;function k(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}var P=Object(h.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:w},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:f.Dashes,labels:Object(h.computed)((function(){var e=[],o=t.component,n=o.meta,d=n.addedVersion,f=n.componentFolder,v=n.deprecated,m=n.designs,_=n.typeScript,h=o.name,x=null!=f?f:y()(h.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(c.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(r.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:_.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?k(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):k(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(h,".vue"),right:"".concat(h,".vue")}),e})),showProps:Object(h.ref)(!1),stringifyPropDefault:function(t,e){return"function"==typeof t?m()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return m()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:d.a}}}),O=P,j=(o(950),Object(C.a)(O,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,o){return e("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(o){return e("code",{key:o,domProps:{textContent:t._s(o)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(n.a)(t,1)[0],b=Object(n.a)(e,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),c=r[0],l=r[1];return e("tr",{key:c},[e("td",[e("code",{domProps:{textContent:t._s(c)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),e("td",[l.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyPropDefault(l.default,l.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?e("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"f916cf2a",null));e.a=j.exports},940:function(t,e,o){"use strict";var n=o(129),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+n(e)+" of "+n(t))}},941:function(t,e,o){"use strict";var n=o(128),r=Math.floor,c=function(t,e){var o=t.length;if(o<8)for(var element,l,i=1;i<o;){for(l=i,element=t[i];l&&e(t[l-1],element)>0;)t[l]=t[--l];l!==i++&&(t[l]=element)}else for(var d=r(o/2),f=c(n(t,0,d),e),v=c(n(t,d),e),m=f.length,_=v.length,y=0,h=0;y<m||h<_;)t[y+h]=y<m&&h<_?e(f[y],v[h])<=0?f[y++]:v[h++]:y<m?f[y++]:v[h++];return t};t.exports=c},942:function(t,e,o){"use strict";var n=o(124).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},943:function(t,e,o){"use strict";var n=o(124);t.exports=/MSIE|Trident/.test(n)},944:function(t,e,o){"use strict";var n=o(124).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},945:function(t,e,o){"use strict";var n=o(9),r=o(946);n({target:"String",proto:!0,forced:o(947)("link")},{link:function(t){return r(this,"a","href",t)}})},946:function(t,e,o){"use strict";var n=o(11),r=o(66),c=o(35),l=/"/g,d=n("".replace);t.exports=function(t,e,o,n){var f=c(r(t)),v="<"+e;return""!==o&&(v+=" "+o+'="'+d(c(n),l,"&quot;")+'"'),v+">"+f+"</"+e+">"}},947:function(t,e,o){"use strict";var n=o(10);t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},948:function(t,e,o){"use strict";o(936)},949:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".slots-block[data-v-88744c10]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-88744c10]{padding:.4rem .6rem}.slots-block[data-v-88744c10]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-88744c10]{align-items:center;display:flex;flex:1}.header__details[data-v-88744c10]{flex:1}.header__name[data-v-88744c10]{font-weight:700}.header>*[data-v-88744c10]{align-items:center;display:flex}.header[data-v-88744c10]>:not(:first-child){margin-left:.4rem}.header__description[data-v-88744c10]{flex:1}.header__empty-description[data-v-88744c10]{flex:1;font-style:italic}.header__empty-scope[data-v-88744c10]{font-style:italic}.scope[data-v-88744c10]{margin-left:1.5rem}.scope__item[data-v-88744c10]{align-items:center;display:flex}.scope__item[data-v-88744c10]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-88744c10]{font-style:italic}.scope__name[data-v-88744c10]{font-weight:700;min-width:100px}.scope__type[data-v-88744c10]{min-width:60px}.scope__type--is-function[data-v-88744c10]{color:var(--orange-50)}.scope__type--is-object[data-v-88744c10]{color:var(--purple-50)}.scope__type--is-integer[data-v-88744c10]{color:var(--green-50)}",""]),n.locals={},t.exports=n},950:function(t,e,o){"use strict";o(937)},951:function(t,e,o){var n=o(63)((function(i){return i[1]}));n.push([t.i,".component-info[data-v-f916cf2a]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-f916cf2a]{align-items:center;flex-direction:row}}.component-info>*[data-v-f916cf2a]{display:flex;margin:5px 10px}.component-info__labels[data-v-f916cf2a]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-f916cf2a]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-f916cf2a]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-f916cf2a],.component-info-label__right[data-v-f916cf2a]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-f916cf2a]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-f916cf2a]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-f916cf2a]{margin-bottom:32px}.component-info-container[data-v-f916cf2a]>:not(:first-child){margin-top:16px}.danger-block[data-v-f916cf2a]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-f916cf2a]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-f916cf2a]{margin-left:8px}.danger-block>section[data-v-f916cf2a]{padding:.4rem .6rem}.danger-block>section[data-v-f916cf2a]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},t.exports=n},963:function(t,e,o){"use strict";var n=o(964),r={"text/plain":"Text","text/html":"Url",default:"Text"};t.exports=function(text,t){var e,o,c,l,d,mark,f=!1;t||(t={}),e=t.debug||!1;try{if(c=n(),l=document.createRange(),d=document.getSelection(),(mark=document.createElement("span")).textContent=text,mark.ariaHidden="true",mark.style.all="unset",mark.style.position="fixed",mark.style.top=0,mark.style.clip="rect(0, 0, 0, 0)",mark.style.whiteSpace="pre",mark.style.webkitUserSelect="text",mark.style.MozUserSelect="text",mark.style.msUserSelect="text",mark.style.userSelect="text",mark.addEventListener("copy",(function(o){if(o.stopPropagation(),t.format)if(o.preventDefault(),void 0===o.clipboardData){e&&console.warn("unable to use e.clipboardData"),e&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var n=r[t.format]||r.default;window.clipboardData.setData(n,text)}else o.clipboardData.clearData(),o.clipboardData.setData(t.format,text);t.onCopy&&(o.preventDefault(),t.onCopy(o.clipboardData))})),document.body.appendChild(mark),l.selectNodeContents(mark),d.addRange(l),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");f=!0}catch(n){e&&console.error("unable to copy using execCommand: ",n),e&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",text),t.onCopy&&t.onCopy(window.clipboardData),f=!0}catch(n){e&&console.error("unable to copy using clipboardData: ",n),e&&console.error("falling back to prompt"),o=function(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(o,text)}}finally{d&&("function"==typeof d.removeRange?d.removeRange(l):d.removeAllRanges()),mark&&document.body.removeChild(mark),c()}return f}},964:function(t,e){t.exports=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],i=0;i<t.rangeCount;i++)o.push(t.getRangeAt(i));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null}return t.removeAllRanges(),function(){"Caret"===t.type&&t.removeAllRanges(),t.rangeCount||o.forEach((function(e){t.addRange(e)})),e&&e.focus()}}},986:function(t,e,o){var content=o(1057);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("244d7065",content,!0,{sourceMap:!1})},987:function(t,e,o){var content=o(1059);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("500aefe2",content,!0,{sourceMap:!1})}}]);