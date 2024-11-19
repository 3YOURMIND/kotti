(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1079:function(t,e,o){"use strict";o.r(e);var n=o(0),r=o(8),l=o(839),c=Object(n.defineComponent)({name:"DocumentationPageUsageComponentsModal",components:{ComponentInfo:l.a,KtButton:r.h,KtFieldSingleSelect:r.A,KtFieldToggle:r.E,KtFieldToggleGroup:r.F,KtForm:r.I,KtModal:r.O},setup:function(){return{component:r.O,showAnnouncement:Object(n.ref)(!0),showModal:Object(n.ref)(!1),settings:Object(n.ref)({preventCloseOutside:!1,size:r.a.Modal.Size.MEDIUM,usedSlots:{body:!0,footer:!0,header:!0}})}}}),d=o(27),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[e("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),e("KtForm",{model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[e("KtFieldSingleSelect",{attrs:{formKey:"size",isOptional:"",label:"size",options:[{label:"sm",value:"sm"},{label:"md (default)",value:"md"},{label:"lg",value:"lg"},{label:"xl",value:"xl"}]}}),t._v(" "),e("KtFieldToggle",{attrs:{formKey:"preventCloseOutside",helpText:"Disables closing the modal by clicking outside when set",isOptional:"",label:"preventCloseOutside",type:"switch"}}),t._v(" "),e("KtFieldToggleGroup",{attrs:{formKey:"usedSlots",isOptional:"",label:"Used Slots",options:[{label:"header",key:"header"},{label:"body",key:"body"},{label:"footer",key:"footer"}]}})],1),t._v(" "),e("KtModal",{attrs:{isOpen:t.showAnnouncement},on:{close:function(e){t.showAnnouncement=!1}},scopedSlots:t._u([{key:"body",fn:function(){return[e("span",[t._v(" I am an announcement. I open by default ")])]},proxy:!0},{key:"footer",fn:function(){return[e("KtButton",{attrs:{label:"close"},on:{click:function(e){t.showAnnouncement=!1}}})]},proxy:!0}])}),t._v(" "),e("KtButton",{attrs:{label:"Open Modal"},on:{click:function(e){t.showModal=!0}}}),t._v(" "),e("KtModal",{attrs:{isOpen:t.showModal,preventCloseOutside:t.settings.preventCloseOutside,size:t.settings.size},on:{close:function(e){t.showModal=!1}},scopedSlots:t._u([t.settings.usedSlots.header?{key:"header",fn:function(){return[e("h2",{staticStyle:{margin:"0"}},[t._v("This the modal title")])]},proxy:!0}:null,t.settings.usedSlots.body?{key:"body",fn:function(){return[e("p",{staticStyle:{margin:"0"}},[t._v("\n\t\t\t\tLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\t\t\t")]),t._v(" "),e("p",{staticStyle:{margin:"0"}},[t._v("\n\t\t\t\tNunc a sollicitudin libero, consectetur interdum ligula.\n\t\t\t")])]},proxy:!0}:null,t.settings.usedSlots.footer?{key:"footer",fn:function(){return[e("KtButton",{attrs:{label:"Close"},on:{click:function(e){t.showModal=!1}}})]},proxy:!0}:null],null,!0)})],1)}),[],!1,null,null,null);e.default=component.exports},837:function(t,e,o){var content=o(850);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(63).default)("258f50c4",content,!0,{sourceMap:!1})},838:function(t,e,o){var content=o(852);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(63).default)("7f9a7731",content,!0,{sourceMap:!1})},839:function(t,e,o){"use strict";var n=o(21),r=(o(90),o(206),o(846),o(840),o(455),o(40),o(112),o(113),o(91),o(76),o(207),o(93),o(208),o(5)),l=o(6),c=(o(64),o(114),o(92),o(289),o(209)),d=o(117),f=o.n(d),v=o(291),m=o.n(v),_=o(0),h=o(8),y=o(2),x=(o(146),Object(_.defineComponent)({name:"ComponentInfoSlots",components:{KtHeading:h.L},props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(_.ref)(!1)}}})),C=(o(849),o(27)),k=Object(C.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(o){var r=Object(n.a)(o,2),l=r[0],details=r[1];return e("section",{key:l},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1],d=c.description,f=c.type;return e("div",{key:l,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(f),domProps:{textContent:t._s(f)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(d)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"18a948b4",null).exports;function w(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}var O=Object(_.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:k,KtHeading:h.L},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:c.Dashes,labels:Object(_.computed)((function(){var e=[],o=t.component,n=o.meta,c=n.addedVersion,d=n.componentFolder,f=n.deprecated,v=n.designs,_=n.typeScript,y=o.name,x=null!=d?d:m()(y.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==f&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==v?Array.isArray(v)?e.push.apply(e,Object(l.a)(v.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},h.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:v.url,right:Object(r.a)({},h.a.MetaDesignType.FIGMA,"Figma")[v.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:_.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?w(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):w(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showEmits:Object(_.ref)(!1),showProps:Object(_.ref)(!1),stringifyPropDefault:function(t,e){return"function"==typeof t?f()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return f()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:y.a}}}),S=O,P=(o(851),Object(C.a)(S,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,o){return e("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(o){return e("code",{key:o,domProps:{textContent:t._s(o)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(n.a)(t,1)[0],b=Object(n.a)(e,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1];return e("tr",{key:l},[e("td",[e("code",{domProps:{textContent:t._s(l)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(c.type))}})]),t._v(" "),e("td",[c.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===c.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyPropDefault(c.default,c.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:t._s(c.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),c.validator?e("div",{domProps:{textContent:t._s(c.validator.name)}}):t._e()])])])})),0)])]):t._e(),t._v(" "),t.component.emits&&t.component.emits.length>0?e("KtHeading",{attrs:{text:"Emits",toggleStatus:t.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showEmits=!t.showEmits}}},[e("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[t._l(t.component.emits,(function(o){return[e("code",{key:o,domProps:{textContent:t._s("@".concat(o))}})]}))],2)]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}})],1)}),[],!1,null,"6e674bb8",null));e.a=P.exports},840:function(t,e,o){"use strict";var n=o(10),r=o(12),l=o(66),c=o(52),d=o(71),f=o(841),v=o(35),m=o(11),_=o(842),h=o(290),y=o(843),x=o(844),C=o(145),k=o(845),w=[],O=r(w.sort),S=r(w.push),P=m((function(){w.sort(void 0)})),j=m((function(){w.sort(null)})),K=h("sort"),M=!m((function(){if(C)return C<70;if(!(y&&y>3)){if(x)return!0;if(k)return k<603;var code,t,e,o,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(o=0;o<47;o++)w.push({k:t+o,v:e})}for(w.sort((function(a,b){return b.v-a.v})),o=0;o<w.length;o++)t=w[o].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:P||!j||!K||!M},{sort:function(t){void 0!==t&&l(t);var e=c(this);if(M)return void 0===t?O(e):O(e,t);var o,n,r=[],m=d(e);for(n=0;n<m;n++)n in e&&S(r,e[n]);for(_(r,function(t){return function(e,o){return void 0===o?-1:void 0===e?1:void 0!==t?+t(e,o)||0:v(e)>v(o)?1:-1}}(t)),o=d(r),n=0;n<o;)e[n]=r[n++];for(;n<m;)f(e,n++);return e}})},841:function(t,e,o){"use strict";var n=o(116),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+n(e)+" of "+n(t))}},842:function(t,e,o){"use strict";var n=o(115),r=Math.floor,l=function(t,e){var o=t.length;if(o<8)for(var element,c,i=1;i<o;){for(c=i,element=t[i];c&&e(t[c-1],element)>0;)t[c]=t[--c];c!==i++&&(t[c]=element)}else for(var d=r(o/2),f=l(n(t,0,d),e),v=l(n(t,d),e),m=f.length,_=v.length,h=0,y=0;h<m||y<_;)t[h+y]=h<m&&y<_?e(f[h],v[y])<=0?f[h++]:v[y++]:h<m?f[h++]:v[y++];return t};t.exports=l},843:function(t,e,o){"use strict";var n=o(111).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},844:function(t,e,o){"use strict";var n=o(111);t.exports=/MSIE|Trident/.test(n)},845:function(t,e,o){"use strict";var n=o(111).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},846:function(t,e,o){"use strict";var n=o(10),r=o(847);n({target:"String",proto:!0,forced:o(848)("link")},{link:function(t){return r(this,"a","href",t)}})},847:function(t,e,o){"use strict";var n=o(12),r=o(65),l=o(35),c=/"/g,d=n("".replace);t.exports=function(t,e,o,n){var f=l(r(t)),v="<"+e;return""!==o&&(v+=" "+o+'="'+d(l(n),c,"&quot;")+'"'),v+">"+f+"</"+e+">"}},848:function(t,e,o){"use strict";var n=o(11);t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},849:function(t,e,o){"use strict";o(837)},850:function(t,e,o){var n=o(62)((function(i){return i[1]}));n.push([t.i,".slots-block[data-v-18a948b4]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-18a948b4]{padding:.4rem .6rem}.slots-block[data-v-18a948b4]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-18a948b4]{align-items:center;display:flex;flex:1}.header__details[data-v-18a948b4]{flex:1}.header__name[data-v-18a948b4]{font-weight:700}.header>*[data-v-18a948b4]{align-items:center;display:flex}.header[data-v-18a948b4]>:not(:first-child){margin-left:.4rem}.header__description[data-v-18a948b4]{flex:1}.header__empty-description[data-v-18a948b4]{flex:1;font-style:italic}.header__empty-scope[data-v-18a948b4]{font-style:italic}.scope[data-v-18a948b4]{margin-left:1.5rem}.scope__item[data-v-18a948b4]{align-items:center;display:flex}.scope__item[data-v-18a948b4]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-18a948b4]{font-style:italic}.scope__name[data-v-18a948b4]{font-weight:700;min-width:100px}.scope__type[data-v-18a948b4]{min-width:60px}.scope__type--is-function[data-v-18a948b4]{color:var(--orange-50)}.scope__type--is-object[data-v-18a948b4]{color:var(--purple-50)}.scope__type--is-integer[data-v-18a948b4]{color:var(--green-50)}",""]),n.locals={},t.exports=n},851:function(t,e,o){"use strict";o(838)},852:function(t,e,o){var n=o(62)((function(i){return i[1]}));n.push([t.i,".component-info[data-v-6e674bb8]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-6e674bb8]{align-items:center;flex-direction:row}}.component-info>*[data-v-6e674bb8]{display:flex;margin:5px 10px}.component-info__labels[data-v-6e674bb8]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-6e674bb8]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50);-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.component-info-label[data-v-6e674bb8]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-6e674bb8],.component-info-label__right[data-v-6e674bb8]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-6e674bb8]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-6e674bb8]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-6e674bb8]{margin-bottom:32px}.component-info-container[data-v-6e674bb8]>:not(:first-child){margin-top:16px}.danger-block[data-v-6e674bb8]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-6e674bb8]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-6e674bb8]{margin-left:8px}.danger-block>section[data-v-6e674bb8]{padding:.4rem .6rem}.danger-block>section[data-v-6e674bb8]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},t.exports=n}}]);