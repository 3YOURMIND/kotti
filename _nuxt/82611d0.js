(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{1056:function(t,e,o){"use strict";o.r(e);var n=o(7),r=o(21),l=(o(92),o(458),o(147),o(203),o(13)),c=o(0),d=o(838),v=Object(c.defineComponent)({name:"DocumentationPageUsageComponentsFieldInlineEdit",components:{ComponentInfo:d.a,KtFieldInlineEdit:l.t,KtFieldSingleSelect:l.z,KtForm:l.G},setup:function(){var t=Object(c.ref)({booleanFlags:{hideValidation:!1,isDisabled:!1,isLoading:!1,isMultiline:!1,isOptional:!1,isReadonly:!1},dataTest:null,helpDescription:null,helpText:null,label:"Label",placeholder:null,preventConfirmationOn:l.a.FieldInlineEdit.ConfirmationValidation.NEVER,tabIndex:null,textStyle:null,validation:"empty"}),e=Object(c.ref)({fieldValue:null});return{component:l.t,formValue:e,fieldValue:Object(c.computed)((function(){return e.value.fieldValue})),fieldProps:Object(c.computed)((function(){return{dataTest:t.value.dataTest,helpDescription:t.value.helpDescription,helpText:t.value.helpText,hideValidation:t.value.booleanFlags.hideValidation,isDisabled:t.value.booleanFlags.isDisabled,isLoading:t.value.booleanFlags.isLoading,isMultiline:t.value.booleanFlags.isMultiline,isOptional:t.value.booleanFlags.isOptional,isReadonly:t.value.booleanFlags.isReadonly,label:t.value.label,placeholder:t.value.placeholder,preventConfirmationOn:t.value.preventConfirmationOn,tabIndex:t.value.tabIndex,textStyle:t.value.textStyle,validator:function(){var e;return{type:null!==(e=t.value.validation)&&void 0!==e?e:"empty",text:"Some validation text"}}}})),onConfirm:function(t){window.alert(t)},preventConfirmationOptions:Object(c.ref)(Object.entries(l.a.FieldInlineEdit.ConfirmationValidation).map((function(t){var e=Object(r.a)(t,2),label=e[0],o=e[1];return{label:o===l.a.FieldInlineEdit.ConfirmationValidation.NEVER?"".concat(label," (Default)"):label,value:o}}))),reset:function(){window.setTimeout((function(){e.value={fieldValue:null}}),0)},settings:t,textStyleOptions:Object(c.ref)([{label:"No Styling (DEFAULT)",value:null}].concat(Object(n.a)(Object.entries(l.a.FieldInlineEdit.TextStyle).map((function(t){var e=Object(r.a)(t,2);return{label:e[0],value:e[1]}}))))),validationOptions:Object(c.ref)([{label:"Empty (Default)",value:"empty"},{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}])}}}),f=(o(975),o(32)),component=Object(f.a)(v,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[e("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),e("div",{staticClass:"element-example white"},[e("KtForm",{model:{value:t.formValue,callback:function(e){t.formValue=e},expression:"formValue"}},[e("KtFieldInlineEdit",t._b({staticClass:"mb-16px",attrs:{formKey:"fieldValue"},on:{confirm:t.onConfirm}},"KtFieldInlineEdit",t.fieldProps,!1)),t._v(" "),e("div",{staticClass:"overview__component__value mb-8px"},[e("strong",[t._v("Value:")]),t._v(" "),e("span",{domProps:{textContent:t._s(JSON.stringify(t.fieldValue))}}),t._v(" "),e("a",{on:{click:t.reset}},[t._v("reset")])])],1),t._v(" "),e("KtForm",{attrs:{size:"small"},model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[e("div",{staticClass:"wrapper"},[e("div",[e("h4",[t._v("Settings")]),t._v(" "),e("KtFieldSingleSelect",{attrs:{formKey:"validation",isOptional:"",label:"Validation State",options:t.validationOptions}}),t._v(" "),e("KtFieldSingleSelect",{attrs:{formKey:"preventConfirmationOn",isOptional:"",label:"preventConfirmationOn",options:t.preventConfirmationOptions}}),t._v(" "),e("KtFieldSingleSelect",{attrs:{formKey:"textStyle",helpText:"Only supported with single-line KtFieldInlineEdit",hideClear:"",isDisabled:t.settings.booleanFlags.isMultiline,isOptional:"",label:"Text Styles",options:t.textStyleOptions}}),t._v(" "),e("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"hideValidation",label:"hideValidation"},{key:"isDisabled",label:"isDisabled"},{key:"isReadonly",label:"isReadonly"},{key:"isLoading",label:"isLoading"},{key:"isMultiline",label:"isMultiline"},{key:"isOptional",label:"isOptional"}],type:"switch"}}),t._v(" "),e("KtFieldText",{attrs:{formKey:"placeholder",isOptional:"",label:"placeholder"}}),t._v(" "),e("KtFieldNumber",{attrs:{formKey:"tabIndex",isOptional:"",label:"tabIndex"}}),t._v(" "),e("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}})],1),t._v(" "),e("div",[e("h4",[t._v("Texts")]),t._v(" "),e("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),t._v(" "),e("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),t._v(" "),e("div",{staticClass:"field-row"},[e("KtFieldText",{attrs:{formKey:"helpText",isOptional:"",label:"helpText"}})],1)],1)])])],1)],1)}),[],!1,null,"4d61993b",null);e.default=component.exports},835:function(t,e,o){var content=o(848);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(62).default)("5ab58312",content,!0,{sourceMap:!1})},836:function(t,e,o){var content=o(850);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(62).default)("145e1866",content,!0,{sourceMap:!1})},837:function(t,e,o){"use strict";var n=o(9),r=o(11),l=o(65),c=o(54),d=o(71),v=o(839),f=o(35),m=o(10),_=o(840),x=o(288),h=o(841),y=o(842),w=o(145),C=o(843),O=[],k=r(O.sort),S=r(O.push),j=m((function(){O.sort(void 0)})),P=m((function(){O.sort(null)})),F=x("sort"),K=!m((function(){if(w)return w<70;if(!(h&&h>3)){if(y)return!0;if(C)return C<603;var code,t,e,o,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(o=0;o<47;o++)O.push({k:t+o,v:e})}for(O.sort((function(a,b){return b.v-a.v})),o=0;o<O.length;o++)t=O[o].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:j||!P||!F||!K},{sort:function(t){void 0!==t&&l(t);var e=c(this);if(K)return void 0===t?k(e):k(e,t);var o,n,r=[],m=d(e);for(n=0;n<m;n++)n in e&&S(r,e[n]);for(_(r,function(t){return function(e,o){return void 0===o?-1:void 0===e?1:void 0!==t?+t(e,o)||0:f(e)>f(o)?1:-1}}(t)),o=d(r),n=0;n<o;)e[n]=r[n++];for(;n<m;)v(e,n++);return e}})},838:function(t,e,o){"use strict";var n=o(21),r=(o(90),o(203),o(844),o(837),o(458),o(40),o(112),o(113),o(91),o(76),o(204),o(93),o(205),o(5)),l=o(7),c=(o(63),o(114),o(92),o(287),o(13)),d=o(3),v=o(206),f=o(117),m=o.n(f),_=o(289),x=o.n(_),h=o(0),y=(o(146),Object(h.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(h.ref)(!1)}}})),w=(o(847),o(32)),C=Object(w.a)(y,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(o){var r=Object(n.a)(o,2),l=r[0],details=r[1];return e("section",{key:l},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1],d=c.description,v=c.type;return e("div",{key:l,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(v),domProps:{textContent:t._s(v)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(d)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"88744c10",null).exports;function O(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}var k=Object(h.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:C,KtHeading:c.J},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:v.Dashes,labels:Object(h.computed)((function(){var e=[],o=t.component,n=o.meta,d=n.addedVersion,v=n.componentFolder,f=n.deprecated,m=n.designs,_=n.typeScript,h=o.name,y=null!=v?v:x()(h.replace(/^Kt/,"Kotti")),w=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(y):null;return null!==f&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(l.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},c.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(r.a)({},c.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:w?"".concat(w,"/types.ts"):void 0,right:_.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?O(Object(o),!0).forEach((function(e){Object(r.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):O(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),w&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(w,"/").concat(h,".vue"),right:"".concat(h,".vue")}),e})),showEmits:Object(h.ref)(!1),showProps:Object(h.ref)(!1),stringifyPropDefault:function(t,e){return"function"==typeof t?m()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return m()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:d.a}}}),S=k,j=(o(849),Object(w.a)(S,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,o){return e("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(o){return e("code",{key:o,domProps:{textContent:t._s(o)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(n.a)(t,1)[0],b=Object(n.a)(e,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1];return e("tr",{key:l},[e("td",[e("code",{domProps:{textContent:t._s(l)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(c.type))}})]),t._v(" "),e("td",[c.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===c.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyPropDefault(c.default,c.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:t._s(c.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),c.validator?e("div",{domProps:{textContent:t._s(c.validator.name)}}):t._e()])])])})),0)])]):t._e(),t._v(" "),t.component.emits&&t.component.emits.length>0?e("KtHeading",{attrs:{text:"Emits",toggleStatus:t.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showEmits=!t.showEmits}}},[e("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[t._l(t.component.emits,(function(o){return[e("code",{key:o,domProps:{textContent:t._s("@".concat(o))}})]}))],2)]):t._e()],1)}),[],!1,null,"85d7c186",null));e.a=j.exports},839:function(t,e,o){"use strict";var n=o(116),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+n(e)+" of "+n(t))}},840:function(t,e,o){"use strict";var n=o(115),r=Math.floor,l=function(t,e){var o=t.length;if(o<8)for(var element,c,i=1;i<o;){for(c=i,element=t[i];c&&e(t[c-1],element)>0;)t[c]=t[--c];c!==i++&&(t[c]=element)}else for(var d=r(o/2),v=l(n(t,0,d),e),f=l(n(t,d),e),m=v.length,_=f.length,x=0,h=0;x<m||h<_;)t[x+h]=x<m&&h<_?e(v[x],f[h])<=0?v[x++]:f[h++]:x<m?v[x++]:f[h++];return t};t.exports=l},841:function(t,e,o){"use strict";var n=o(111).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},842:function(t,e,o){"use strict";var n=o(111);t.exports=/MSIE|Trident/.test(n)},843:function(t,e,o){"use strict";var n=o(111).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},844:function(t,e,o){"use strict";var n=o(9),r=o(845);n({target:"String",proto:!0,forced:o(846)("link")},{link:function(t){return r(this,"a","href",t)}})},845:function(t,e,o){"use strict";var n=o(11),r=o(64),l=o(35),c=/"/g,d=n("".replace);t.exports=function(t,e,o,n){var v=l(r(t)),f="<"+e;return""!==o&&(f+=" "+o+'="'+d(l(n),c,"&quot;")+'"'),f+">"+v+"</"+e+">"}},846:function(t,e,o){"use strict";var n=o(10);t.exports=function(t){return n((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},847:function(t,e,o){"use strict";o(835)},848:function(t,e,o){var n=o(61)((function(i){return i[1]}));n.push([t.i,".slots-block[data-v-88744c10]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-88744c10]{padding:.4rem .6rem}.slots-block[data-v-88744c10]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-88744c10]{align-items:center;display:flex;flex:1}.header__details[data-v-88744c10]{flex:1}.header__name[data-v-88744c10]{font-weight:700}.header>*[data-v-88744c10]{align-items:center;display:flex}.header[data-v-88744c10]>:not(:first-child){margin-left:.4rem}.header__description[data-v-88744c10]{flex:1}.header__empty-description[data-v-88744c10]{flex:1;font-style:italic}.header__empty-scope[data-v-88744c10]{font-style:italic}.scope[data-v-88744c10]{margin-left:1.5rem}.scope__item[data-v-88744c10]{align-items:center;display:flex}.scope__item[data-v-88744c10]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-88744c10]{font-style:italic}.scope__name[data-v-88744c10]{font-weight:700;min-width:100px}.scope__type[data-v-88744c10]{min-width:60px}.scope__type--is-function[data-v-88744c10]{color:var(--orange-50)}.scope__type--is-object[data-v-88744c10]{color:var(--purple-50)}.scope__type--is-integer[data-v-88744c10]{color:var(--green-50)}",""]),n.locals={},t.exports=n},849:function(t,e,o){"use strict";o(836)},850:function(t,e,o){var n=o(61)((function(i){return i[1]}));n.push([t.i,".component-info[data-v-85d7c186]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-85d7c186]{align-items:center;flex-direction:row}}.component-info>*[data-v-85d7c186]{display:flex;margin:5px 10px}.component-info__labels[data-v-85d7c186]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-85d7c186]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-85d7c186]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-85d7c186],.component-info-label__right[data-v-85d7c186]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-85d7c186]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-85d7c186]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-85d7c186]{margin-bottom:32px}.component-info-container[data-v-85d7c186]>:not(:first-child){margin-top:16px}.danger-block[data-v-85d7c186]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-85d7c186]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-85d7c186]{margin-left:8px}.danger-block>section[data-v-85d7c186]{padding:.4rem .6rem}.danger-block>section[data-v-85d7c186]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},t.exports=n},892:function(t,e,o){var content=o(976);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(62).default)("40c04dba",content,!0,{sourceMap:!1})},975:function(t,e,o){"use strict";o(892)},976:function(t,e,o){var n=o(61)((function(i){return i[1]}));n.push([t.i,"pre[data-v-4d61993b]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-4d61993b]{list-style:none}h3[data-v-4d61993b]{border-bottom:0}.wrapper[data-v-4d61993b]{background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius);display:flex;flex-direction:column;margin:0 0 1.5em}@media(width < 960px){.wrapper[data-v-4d61993b]{flex-direction:column}.wrapper[data-v-4d61993b]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-4d61993b]{flex-direction:row}.wrapper>*[data-v-4d61993b]{flex:1}.wrapper[data-v-4d61993b]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-4d61993b]{margin:0!important;padding:1.5em}.field-row[data-v-4d61993b]{display:flex}.field-row>*[data-v-4d61993b]{flex:1}.field-row[data-v-4d61993b]>:not(:first-child){margin-left:10px}.overview[data-v-4d61993b]{display:flex;margin-bottom:20px}@media(width < 960px){.overview[data-v-4d61993b]{flex-direction:column}.overview[data-v-4d61993b]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-4d61993b]{flex-direction:row}.overview>*[data-v-4d61993b]{flex:1;flex-basis:0}.overview__code>pre[data-v-4d61993b]{max-width:400px}.overview__component>*[data-v-4d61993b]{margin-right:20px}}.overview__component[data-v-4d61993b]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-4d61993b]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-4d61993b]{height:150px;margin:0;overflow:scroll}",""]),n.locals={},t.exports=n}}]);