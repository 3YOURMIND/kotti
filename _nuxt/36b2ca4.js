(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{1063:function(e,t,o){"use strict";o.r(t);var n=o(21),r=o(6),l=(o(204),o(92),o(849),o(453),o(147),o(10)),c=o(0),d=o(833),v=Object(c.defineComponent)({name:"DocumentationPageUsageComponentsFieldInlineEdit",components:{ComponentInfo:d.a,KtFieldInlineEdit:l.u,KtFieldSingleSelect:l.A,KtForm:l.I},setup:function(){var e=Object(c.ref)({autoComplete:null,autoCompleteToken:null,booleanFlags:{hideValidation:!1,isDisabled:!1,isLoading:!1,isMultiline:!1,isOptional:!1,isReadonly:!1},dataTest:null,helpDescription:null,helpText:null,label:"Label",placeholder:null,preventConfirmationOn:l.a.FieldInlineEdit.ConfirmationValidation.NEVER,tabIndex:null,textStyle:null,validation:"empty"}),t=Object(c.ref)({fieldValue:null});return{autoCompleteOptions:Object(c.computed)((function(){return[].concat(Object(r.a)(Object.values(l.a.Field.AutoComplete).map((function(option){return{label:option,value:option}}))),[{label:"<token>",value:"token"}])})),component:l.u,formValue:t,fieldValue:Object(c.computed)((function(){return t.value.fieldValue})),fieldProps:Object(c.computed)((function(){return{autoComplete:"token"===e.value.autoComplete?e.value.autoCompleteToken:e.value.autoComplete,dataTest:e.value.dataTest,helpDescription:e.value.helpDescription,helpText:e.value.helpText,hideValidation:e.value.booleanFlags.hideValidation,isDisabled:e.value.booleanFlags.isDisabled,isLoading:e.value.booleanFlags.isLoading,isMultiline:e.value.booleanFlags.isMultiline,isOptional:e.value.booleanFlags.isOptional,isReadonly:e.value.booleanFlags.isReadonly,label:e.value.label,placeholder:e.value.placeholder,preventConfirmationOn:e.value.preventConfirmationOn,tabIndex:e.value.tabIndex,textStyle:e.value.textStyle,validator:function(){var t;return{type:null!==(t=e.value.validation)&&void 0!==t?t:"empty",text:"Some validation text"}}}})),onConfirm:function(e){window.alert(e)},preventConfirmationOptions:Object(c.ref)(Object.entries(l.a.FieldInlineEdit.ConfirmationValidation).map((function(e){var t=Object(n.a)(e,2),label=t[0],o=t[1];return{label:o===l.a.FieldInlineEdit.ConfirmationValidation.NEVER?"".concat(label," (Default)"):label,value:o}}))),reset:function(){window.setTimeout((function(){t.value={fieldValue:null}}),0)},settings:e,textStyleOptions:Object(c.ref)([{label:"No Styling (DEFAULT)",value:null}].concat(Object(r.a)(Object.entries(l.a.FieldInlineEdit.TextStyle).map((function(e){var t=Object(n.a)(e,2);return{label:t[0],value:t[1]}}))))),validationOptions:Object(c.ref)([{label:"Empty (Default)",value:"empty"},{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}])}}}),f=(o(972),o(32)),component=Object(f.a)(v,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),t("div",{staticClass:"overview"},[t("div",{staticClass:"overview__component"},[t("KtForm",{model:{value:e.formValue,callback:function(t){e.formValue=t},expression:"formValue"}},[t("KtFieldInlineEdit",e._b({attrs:{formKey:"fieldValue"},on:{confirm:e.onConfirm}},"KtFieldInlineEdit",e.fieldProps,!1)),e._v(" "),t("div",{staticClass:"overview__component-value"},[t("strong",[e._v("Value:")]),e._v(" "),t("span",{domProps:{textContent:e._s(JSON.stringify(e.fieldValue))}}),e._v(" "),t("a",{on:{click:e.reset}},[e._v("reset")])])],1)],1)]),e._v(" "),t("KtForm",{attrs:{size:"small"},model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[t("div",{staticClass:"wrapper"},[t("div",[t("h4",[e._v("Settings")]),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"validation",isOptional:"",label:"Validation State",options:e.validationOptions}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"preventConfirmationOn",isOptional:"",label:"preventConfirmationOn",options:e.preventConfirmationOptions}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"textStyle",helpText:"Only supported with single-line KtFieldInlineEdit",hideClear:"",isDisabled:e.settings.booleanFlags.isMultiline,isOptional:"",label:"Text Styles",options:e.textStyleOptions}}),e._v(" "),t("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"hideValidation",label:"hideValidation"},{key:"isDisabled",label:"isDisabled"},{key:"isReadonly",label:"isReadonly"},{key:"isLoading",label:"isLoading"},{key:"isMultiline",label:"isMultiline"},{key:"isOptional",label:"isOptional"}],type:"switch"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"placeholder",isOptional:"",label:"placeholder"}}),e._v(" "),t("KtFieldNumber",{attrs:{formKey:"tabIndex",isOptional:"",label:"tabIndex"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}})],1),e._v(" "),t("div",[t("h4",[e._v("Texts")]),e._v(" "),t("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"helpText",isOptional:"",label:"helpText"}}),e._v(" "),t("div",{staticClass:"field-row"},[t("KtFieldSingleSelect",{attrs:{formKey:"autoComplete",helpText:"Support Varies",isOptional:"",isUnsorted:"",label:"autoComplete",options:e.autoCompleteOptions}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"autoCompleteToken",helpText:"A space-separated <token-list> that describes the meaning of the autocompletion value. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values",isDisabled:"token"!==e.settings.autoComplete,isOptional:"",label:"<token>"}})],1)],1)])])],1)}),[],!1,null,"3281c536",null);t.default=component.exports},830:function(e,t,o){var content=o(843);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(62).default)("40a884e7",content,!0,{sourceMap:!1})},831:function(e,t,o){var content=o(845);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(62).default)("56ed51a9",content,!0,{sourceMap:!1})},832:function(e,t,o){"use strict";var n=o(9),r=o(12),l=o(65),c=o(52),d=o(71),v=o(834),f=o(35),m=o(11),_=o(835),h=o(289),x=o(836),y=o(837),C=o(145),w=o(838),O=[],k=r(O.sort),S=r(O.push),j=m((function(){O.sort(void 0)})),P=m((function(){O.sort(null)})),F=h("sort"),K=!m((function(){if(C)return C<70;if(!(x&&x>3)){if(y)return!0;if(w)return w<603;var code,e,t,o,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(o=0;o<47;o++)O.push({k:e+o,v:t})}for(O.sort((function(a,b){return b.v-a.v})),o=0;o<O.length;o++)e=O[o].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:j||!P||!F||!K},{sort:function(e){void 0!==e&&l(e);var t=c(this);if(K)return void 0===e?k(t):k(t,e);var o,n,r=[],m=d(t);for(n=0;n<m;n++)n in t&&S(r,t[n]);for(_(r,function(e){return function(t,o){return void 0===o?-1:void 0===t?1:void 0!==e?+e(t,o)||0:f(t)>f(o)?1:-1}}(e)),o=d(r),n=0;n<o;)t[n]=r[n++];for(;n<m;)v(t,n++);return t}})},833:function(e,t,o){"use strict";var n=o(21),r=(o(90),o(204),o(839),o(832),o(453),o(40),o(112),o(113),o(91),o(76),o(205),o(93),o(206),o(5)),l=o(6),c=(o(63),o(114),o(92),o(288),o(10)),d=o(2),v=o(207),f=o(117),m=o.n(f),_=o(290),h=o.n(_),x=o(0),y=(o(146),Object(x.defineComponent)({name:"ComponentInfoSlots",components:{KtHeading:c.L},props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(x.ref)(!1)}}})),C=(o(842),o(32)),w=Object(C.a)(y,(function(){var e=this,t=e._self._c;e._self._setupProxy;return Object.entries(e.slots).length>0?t("KtHeading",{attrs:{text:"Slots",toggleStatus:e.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showSlots=!e.showSlots}}},[t("article",{staticClass:"slots-block"},e._l(Object.entries(e.slots),(function(o){var r=Object(n.a)(o,2),l=r[0],details=r[1];return t("section",{key:l},[t("div",{staticClass:"header"},[t("div",{staticClass:"header__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",{staticClass:"header__details"},[details.description?t("div",{staticClass:"header__description",domProps:{textContent:e._s(details.description)}}):t("div",{staticClass:"header__empty-description",domProps:{textContent:e._s("No description")}}),e._v(" "),null===details.scope?t("div",{staticClass:"header__empty-scope",domProps:{textContent:e._s("(Not Scoped)")}}):e._e()])]),e._v(" "),null!==details.scope?t("div",{staticClass:"scope"},e._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1],d=c.description,v=c.type;return t("div",{key:l,staticClass:"scope__item"},[t("div",{class:"scope__type scope__type--is-".concat(v),domProps:{textContent:e._s(v)}}),e._v(" "),t("div",{staticClass:"scope__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:e._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:e._s(d)}})])})),0):e._e()])})),0)]):e._e()}),[],!1,null,"3cdb2c70",null).exports;function O(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}var k=Object(x.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:w,KtHeading:c.L},props:{component:{required:!0,type:Object}},setup:function(e){return{Dashes:v.Dashes,labels:Object(x.computed)((function(){var t=[],o=e.component,n=o.meta,d=n.addedVersion,v=n.componentFolder,f=n.deprecated,m=n.designs,_=n.typeScript,x=o.name,y=null!=v?v:h()(x.replace(/^Kt/,"Kotti")),C=e.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(y):null;return null!==f&&t.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==m?Array.isArray(m)?t.push.apply(t,Object(l.a)(m.map((function(e){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(e.title,"”"),link:e.url,right:Object(r.a)({},c.a.MetaDesignType.FIGMA,"Figma")[e.type]}})))):t.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(r.a)({},c.a.MetaDesignType.FIGMA,"Figma")[m.type]}):t.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&t.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:_.namespace}),t.push(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?O(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):O(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),C&&t.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(x,".vue"),right:"".concat(x,".vue")}),t})),showEmits:Object(x.ref)(!1),showProps:Object(x.ref)(!1),stringifyPropDefault:function(e,t){return"function"==typeof e?m()(t).some((function(e){return"Function"===e.name}))?"".concat(e.toString()," *"):"".concat(JSON.stringify(e())," *"):JSON.stringify(e)},stringifyType:function(e){return m()(e).map((function(e){return e.name.toLowerCase()})).join(" | ")},Yoco:d.a}}}),S=k,j=(o(844),Object(C.a)(S,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"component-info-container"},[t("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==e.component.meta.deprecated}},[t("h1",{staticClass:"component-info__title",domProps:{textContent:e._s(e.component.name)}}),e._v(" "),t("div",[t("div",{staticClass:"component-info__labels"},e._l(e.labels,(function(label,o){return t("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[t("div",{staticClass:"component-info-label__left",domProps:{textContent:e._s(label.left)}}),e._v(" "),label.link?t("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:e._s(label.right)}}):t("div",{staticClass:"component-info-label__right",domProps:{textContent:e._s(label.right)}})])})),0)])]),e._v(" "),null!==e.component.meta.deprecated?t("article",{staticClass:"danger-block"},[t("section",[e._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),t("strong",{domProps:{textContent:e._s("v".concat(e.component.meta.deprecated.version))}})]),e._v(" "),t("section",[t("div",[t("strong",[e._v("Reason")]),e._v(": "+e._s(e.component.meta.deprecated.reason)+"\n\t\t\t")]),e._v(" "),t("div",[t("strong",{domProps:{textContent:e._s(e.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),e._v(":\n\t\t\t\t"),e._l(e.component.meta.deprecated.alternatives,(function(o){return t("code",{key:o,domProps:{textContent:e._s(o)}})})),e._v(" "),0===e.component.meta.deprecated.alternatives.length?t("span",{domProps:{textContent:e._s(e.Dashes.EmDash)}}):e._e()],2)])]):e._e(),e._v(" "),t("ComponentInfoSlots",{attrs:{slots:e.component.meta.slots}}),e._v(" "),e.component.props?t("KtHeading",{attrs:{text:"Properties",toggleStatus:e.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showProps=!e.showProps}}},[t("table",[t("thead",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Default")]),e._v(" "),t("th",[e._v("Validator")])]),e._v(" "),t("tbody",e._l(Object.entries(e.component.props).sort((function(e,t){var a=Object(n.a)(e,1)[0],b=Object(n.a)(t,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1];return t("tr",{key:l},[t("td",[t("code",{domProps:{textContent:e._s(l)}})]),e._v(" "),t("td",[t("code",{domProps:{textContent:e._s(e.stringifyType(c.type))}})]),e._v(" "),t("td",[c.required?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("required")}}):void 0===c.default?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("No default")}}):t("code",{domProps:{textContent:e._s(e.stringifyPropDefault(c.default,c.type))}})]),e._v(" "),t("td",[t("div",{staticStyle:{display:"flex","align-items":"center"}},[t("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:e._s(c.validator?e.Yoco.Icon.CHECK:e.Yoco.Icon.CLOSE)}}),e._v(" "),c.validator?t("div",{domProps:{textContent:e._s(c.validator.name)}}):e._e()])])])})),0)])]):e._e(),e._v(" "),e.component.emits&&e.component.emits.length>0?t("KtHeading",{attrs:{text:"Emits",toggleStatus:e.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showEmits=!e.showEmits}}},[t("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[e._l(e.component.emits,(function(o){return[t("code",{key:o,domProps:{textContent:e._s("@".concat(o))}})]}))],2)]):e._e()],1)}),[],!1,null,"85d7c186",null));t.a=j.exports},834:function(e,t,o){"use strict";var n=o(116),r=TypeError;e.exports=function(e,t){if(!delete e[t])throw new r("Cannot delete property "+n(t)+" of "+n(e))}},835:function(e,t,o){"use strict";var n=o(115),r=Math.floor,l=function(e,t){var o=e.length;if(o<8)for(var element,c,i=1;i<o;){for(c=i,element=e[i];c&&t(e[c-1],element)>0;)e[c]=e[--c];c!==i++&&(e[c]=element)}else for(var d=r(o/2),v=l(n(e,0,d),t),f=l(n(e,d),t),m=v.length,_=f.length,h=0,x=0;h<m||x<_;)e[h+x]=h<m&&x<_?t(v[h],f[x])<=0?v[h++]:f[x++]:h<m?v[h++]:f[x++];return e};e.exports=l},836:function(e,t,o){"use strict";var n=o(111).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},837:function(e,t,o){"use strict";var n=o(111);e.exports=/MSIE|Trident/.test(n)},838:function(e,t,o){"use strict";var n=o(111).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},839:function(e,t,o){"use strict";var n=o(9),r=o(840);n({target:"String",proto:!0,forced:o(841)("link")},{link:function(e){return r(this,"a","href",e)}})},840:function(e,t,o){"use strict";var n=o(12),r=o(64),l=o(35),c=/"/g,d=n("".replace);e.exports=function(e,t,o,n){var v=l(r(e)),f="<"+t;return""!==o&&(f+=" "+o+'="'+d(l(n),c,"&quot;")+'"'),f+">"+v+"</"+t+">"}},841:function(e,t,o){"use strict";var n=o(11);e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},842:function(e,t,o){"use strict";o(830)},843:function(e,t,o){var n=o(61)((function(i){return i[1]}));n.push([e.i,".slots-block[data-v-3cdb2c70]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-3cdb2c70]{padding:.4rem .6rem}.slots-block[data-v-3cdb2c70]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-3cdb2c70]{align-items:center;display:flex;flex:1}.header__details[data-v-3cdb2c70]{flex:1}.header__name[data-v-3cdb2c70]{font-weight:700}.header>*[data-v-3cdb2c70]{align-items:center;display:flex}.header[data-v-3cdb2c70]>:not(:first-child){margin-left:.4rem}.header__description[data-v-3cdb2c70]{flex:1}.header__empty-description[data-v-3cdb2c70]{flex:1;font-style:italic}.header__empty-scope[data-v-3cdb2c70]{font-style:italic}.scope[data-v-3cdb2c70]{margin-left:1.5rem}.scope__item[data-v-3cdb2c70]{align-items:center;display:flex}.scope__item[data-v-3cdb2c70]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-3cdb2c70]{font-style:italic}.scope__name[data-v-3cdb2c70]{font-weight:700;min-width:100px}.scope__type[data-v-3cdb2c70]{min-width:60px}.scope__type--is-function[data-v-3cdb2c70]{color:var(--orange-50)}.scope__type--is-object[data-v-3cdb2c70]{color:var(--purple-50)}.scope__type--is-integer[data-v-3cdb2c70]{color:var(--green-50)}",""]),n.locals={},e.exports=n},844:function(e,t,o){"use strict";o(831)},845:function(e,t,o){var n=o(61)((function(i){return i[1]}));n.push([e.i,".component-info[data-v-85d7c186]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-85d7c186]{align-items:center;flex-direction:row}}.component-info>*[data-v-85d7c186]{display:flex;margin:5px 10px}.component-info__labels[data-v-85d7c186]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-85d7c186]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-85d7c186]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-85d7c186],.component-info-label__right[data-v-85d7c186]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-85d7c186]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-85d7c186]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-85d7c186]{margin-bottom:32px}.component-info-container[data-v-85d7c186]>:not(:first-child){margin-top:16px}.danger-block[data-v-85d7c186]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-85d7c186]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-85d7c186]{margin-left:8px}.danger-block>section[data-v-85d7c186]{padding:.4rem .6rem}.danger-block>section[data-v-85d7c186]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},e.exports=n},849:function(e,t,o){"use strict";var n=o(9),r=o(454).values;n({target:"Object",stat:!0},{values:function(e){return r(e)}})},887:function(e,t,o){var content=o(973);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(62).default)("3bce8ce6",content,!0,{sourceMap:!1})},972:function(e,t,o){"use strict";o(887)},973:function(e,t,o){var n=o(61)((function(i){return i[1]}));n.push([e.i,"pre[data-v-3281c536]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-3281c536]{list-style:none}h3[data-v-3281c536]{border-bottom:0}.wrapper[data-v-3281c536]{background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius);display:flex;flex-direction:column;margin:0 0 1.5em}@media(width < 960px){.wrapper[data-v-3281c536]{flex-direction:column}.wrapper[data-v-3281c536]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-3281c536]{flex-direction:row}.wrapper>*[data-v-3281c536]{flex:1}.wrapper[data-v-3281c536]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-3281c536]{margin:0!important;padding:1.5em}.field-row[data-v-3281c536]{display:flex}.field-row>*[data-v-3281c536]{flex:1}.field-row[data-v-3281c536]>:not(:first-child){margin-left:10px}.overview[data-v-3281c536]{display:flex;margin-bottom:20px}@media(width < 960px){.overview[data-v-3281c536]{flex-direction:column}.overview[data-v-3281c536]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-3281c536]{flex-direction:row}.overview>*[data-v-3281c536]{flex:1;flex-basis:0}.overview__code>pre[data-v-3281c536]{max-width:400px}.overview__component>*[data-v-3281c536]{margin-right:20px}}.overview__component[data-v-3281c536]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-3281c536]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-3281c536]{height:150px;margin:0;overflow:scroll}",""]),n.locals={},e.exports=n}}]);