(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1059:function(e,t,o){"use strict";o(979)},1060:function(e,t,o){var n=o(74)((function(i){return i[1]}));n.push([e.i,"pre[data-v-0a29a39a]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-0a29a39a]{list-style:none}h3[data-v-0a29a39a]{border-bottom:0}.wrapper[data-v-0a29a39a]{background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius);display:flex;flex-direction:column;margin:0 0 1.5em}@media(max-width:959.98px){.wrapper[data-v-0a29a39a]{flex-direction:column}.wrapper[data-v-0a29a39a]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-0a29a39a]{flex-direction:row}.wrapper>*[data-v-0a29a39a]{flex:1}.wrapper[data-v-0a29a39a]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-0a29a39a]{margin:0!important;padding:1.5em}.field-row[data-v-0a29a39a]{display:flex}.field-row>*[data-v-0a29a39a]{flex:1}.field-row[data-v-0a29a39a]>:not(:first-child){margin-left:10px}.overview[data-v-0a29a39a]{display:flex;margin-bottom:20px}@media(max-width:959.98px){.overview[data-v-0a29a39a]{flex-direction:column}.overview[data-v-0a29a39a]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-0a29a39a]{flex-direction:row}.overview>*[data-v-0a29a39a]{flex:1;flex-basis:0}.overview__code>pre[data-v-0a29a39a]{max-width:400px}.overview__component>*[data-v-0a29a39a]{margin-right:20px}}.overview__component[data-v-0a29a39a]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-0a29a39a]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-0a29a39a]{height:150px;margin:0;overflow:scroll}",""]),n.locals={},e.exports=n},1110:function(e,t,o){"use strict";o.r(t);var n=o(6),r=o(20),l=(o(102),o(518),o(162),o(159),o(18)),d=o(0),c=o(940),f=Object(d.defineComponent)({name:"DocumentationPageUsageComponentsFieldInlineEdit",components:{ComponentInfo:c.a,KtFieldInlineEdit:l.s,KtFieldSingleSelect:l.y,KtForm:l.F},setup:function(){var e=Object(d.ref)({booleanFlags:{hideValidation:!1,isDisabled:!1,isLoading:!1,isMultiline:!1,isOptional:!1,isReadonly:!1},dataTest:null,helpDescription:null,helpText:null,label:"Label",placeholder:null,preventConfirmationOn:l.a.FieldInlineEdit.ConfirmationValidation.ERROR,tabIndex:null,textStyle:null,validation:"empty"}),t=Object(d.ref)({fieldValue:null});return{component:l.s,formValue:t,fieldValue:Object(d.computed)((function(){return t.value.fieldValue})),fieldProps:Object(d.computed)((function(){var t;return{dataTest:e.value.dataTest,helpDescription:e.value.helpDescription,helpText:e.value.helpText,hideValidation:e.value.booleanFlags.hideValidation,isDisabled:e.value.booleanFlags.isDisabled,isLoading:e.value.booleanFlags.isLoading,isMultiline:e.value.booleanFlags.isMultiline,isOptional:e.value.booleanFlags.isOptional,isReadonly:e.value.booleanFlags.isReadonly,label:e.value.label,placeholder:e.value.placeholder,preventConfirmationOn:null!==(t=e.value.preventConfirmationOn)&&void 0!==t?t:l.a.FieldInlineEdit.ConfirmationValidation.NEVER,tabIndex:e.value.tabIndex,textStyle:e.value.textStyle,validator:function(){var t;return{type:null!==(t=e.value.validation)&&void 0!==t?t:"empty",text:"Some validation text"}}}})),onConfirm:function(e){window.alert(e)},preventConfirmationOptions:Object(d.ref)(Object.entries(l.a.FieldInlineEdit.ConfirmationValidation).map((function(e){var t=Object(r.a)(e,2),label=t[0],o=t[1];return{label:label===l.a.FieldInlineEdit.ConfirmationValidation.NEVER?"".concat(label," (Default)"):label,value:o}}))),reset:function(){window.setTimeout((function(){t.value={fieldValue:null}}),0)},settings:e,textStyleOptions:Object(d.ref)([{label:"No Styling (DEFAULT)",value:null}].concat(Object(n.a)(Object.entries(l.a.FieldInlineEdit.TextStyle).map((function(e){var t=Object(r.a)(e,2);return{label:t[0],value:t[1]}}))))),validationOptions:Object(d.ref)([{label:"Empty (Default)",value:"empty"},{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}])}}}),v=(o(1059),o(32)),component=Object(v.a)(f,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),t("div",{staticClass:"element-example white"},[t("KtForm",{model:{value:e.formValue,callback:function(t){e.formValue=t},expression:"formValue"}},[t("KtFieldInlineEdit",e._b({staticClass:"mb-16px",attrs:{formKey:"fieldValue"},on:{confirm:e.onConfirm}},"KtFieldInlineEdit",e.fieldProps,!1)),e._v(" "),t("div",{staticClass:"overview__component__value mb-8px"},[t("strong",[e._v("Value:")]),e._v(" "),t("span",{domProps:{textContent:e._s(JSON.stringify(e.fieldValue))}}),e._v(" "),t("a",{on:{click:e.reset}},[e._v("reset")])])],1),e._v(" "),t("KtForm",{attrs:{size:"small"},model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[t("div",{staticClass:"wrapper"},[t("div",[t("h4",[e._v("Settings")]),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"validation",hideClear:"",isOptional:"",label:"Validation State",options:e.validationOptions}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"preventConfirmationOn",hideClear:"",isOptional:"",label:"preventConfirmationOn",options:e.preventConfirmationOptions}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"textStyle",helpText:"Only supported with single-line KtFieldInlineEdit",hideClear:"",isDisabled:e.settings.booleanFlags.isMultiline,isOptional:"",label:"Text Styles",options:e.textStyleOptions}}),e._v(" "),t("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"hideValidation",label:"hideValidation"},{key:"isDisabled",label:"isDisabled"},{key:"isReadonly",label:"isReadonly"},{key:"isLoading",label:"isLoading"},{key:"isMultiline",label:"isMultiline"},{key:"isOptional",label:"isOptional"}],type:"switch"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"placeholder",isOptional:"",label:"placeholder"}}),e._v(" "),t("KtFieldNumber",{attrs:{formKey:"tabIndex",isOptional:"",label:"tabIndex"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}})],1),e._v(" "),t("div",[t("h4",[e._v("Texts")]),e._v(" "),t("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),e._v(" "),t("div",{staticClass:"field-row"},[t("KtFieldText",{attrs:{formKey:"helpText",isOptional:"",label:"helpText"}})],1)],1)])])],1)],1)}),[],!1,null,"0a29a39a",null);t.default=component.exports},937:function(e,t,o){var content=o(950);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(75).default)("4ff54064",content,!0,{sourceMap:!1})},938:function(e,t,o){var content=o(952);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(75).default)("4e0c6a7e",content,!0,{sourceMap:!1})},939:function(e,t,o){"use strict";var n=o(9),r=o(11),l=o(66),d=o(56),c=o(76),f=o(941),v=o(35),m=o(10),_=o(942),x=o(331),h=o(943),y=o(944),C=o(160),w=o(945),O=[],k=r(O.sort),S=r(O.push),j=m((function(){O.sort(void 0)})),F=m((function(){O.sort(null)})),P=x("sort"),K=!m((function(){if(C)return C<70;if(!(h&&h>3)){if(y)return!0;if(w)return w<603;var code,e,t,o,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(o=0;o<47;o++)O.push({k:e+o,v:t})}for(O.sort((function(a,b){return b.v-a.v})),o=0;o<O.length;o++)e=O[o].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:j||!F||!P||!K},{sort:function(e){void 0!==e&&l(e);var t=d(this);if(K)return void 0===e?k(t):k(t,e);var o,n,r=[],m=c(t);for(n=0;n<m;n++)n in t&&S(r,t[n]);for(_(r,function(e){return function(t,o){return void 0===o?-1:void 0===t?1:void 0!==e?+e(t,o)||0:v(t)>v(o)?1:-1}}(e)),o=c(r),n=0;n<o;)t[n]=r[n++];for(;n<m;)f(t,n++);return t}})},940:function(e,t,o){"use strict";var n=o(20),r=(o(99),o(159),o(946),o(939),o(518),o(41),o(126),o(127),o(100),o(101),o(223),o(103),o(224),o(5)),l=o(6),d=(o(64),o(128),o(102),o(519),o(18)),c=o(3),f=o(225),v=o(131),m=o.n(v),_=o(332),x=o.n(_),h=o(0),y=(o(161),Object(h.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(h.ref)(!1)}}})),C=(o(949),o(32)),w=Object(C.a)(y,(function(){var e=this,t=e._self._c;e._self._setupProxy;return Object.entries(e.slots).length>0?t("KtHeading",{attrs:{text:"Slots",toggleStatus:e.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showSlots=!e.showSlots}}},[t("article",{staticClass:"slots-block"},e._l(Object.entries(e.slots),(function(o){var r=Object(n.a)(o,2),l=r[0],details=r[1];return t("section",{key:l},[t("div",{staticClass:"header"},[t("div",{staticClass:"header__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",{staticClass:"header__details"},[details.description?t("div",{staticClass:"header__description",domProps:{textContent:e._s(details.description)}}):t("div",{staticClass:"header__empty-description",domProps:{textContent:e._s("No description")}}),e._v(" "),null===details.scope?t("div",{staticClass:"header__empty-scope",domProps:{textContent:e._s("(Not Scoped)")}}):e._e()])]),e._v(" "),null!==details.scope?t("div",{staticClass:"scope"},e._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),l=r[0],d=r[1],c=d.description,f=d.type;return t("div",{key:l,staticClass:"scope__item"},[t("div",{class:"scope__type scope__type--is-".concat(f),domProps:{textContent:e._s(f)}}),e._v(" "),t("div",{staticClass:"scope__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",null===c?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:e._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:e._s(c)}})])})),0):e._e()])})),0)]):e._e()}),[],!1,null,"2187adcd",null).exports;function O(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}var k=Object(h.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:w},props:{component:{required:!0,type:Object}},setup:function(e){return{Dashes:f.Dashes,labels:Object(h.computed)((function(){var t=[],o=e.component,n=o.meta,c=n.addedVersion,f=n.componentFolder,v=n.deprecated,m=n.designs,_=n.typeScript,h=o.name,y=null!=f?f:x()(h.replace(/^Kt/,"Kotti")),C=e.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(y):null;return null!==v&&t.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?t.push.apply(t,Object(l.a)(m.map((function(e){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(e.title,"”"),link:e.url,right:Object(r.a)({},d.a.MetaDesignType.FIGMA,"Figma")[e.type]}})))):t.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(r.a)({},d.a.MetaDesignType.FIGMA,"Figma")[m.type]}):t.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&t.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:_.namespace}),t.push(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?O(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):O(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),C&&t.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(h,".vue"),right:"".concat(h,".vue")}),t})),showProps:Object(h.ref)(!1),stringifyDefault:function(e,t){return"function"==typeof e?m()(t).some((function(e){return"Function"===e.name}))?"".concat(e.toString()," *"):"".concat(JSON.stringify(e())," *"):JSON.stringify(e)},stringifyType:function(e){return m()(e).map((function(e){return e.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),S=k,j=(o(951),Object(C.a)(S,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"component-info-container"},[t("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==e.component.meta.deprecated}},[t("h1",{staticClass:"component-info__title",domProps:{textContent:e._s(e.component.name)}}),e._v(" "),t("div",[t("div",{staticClass:"component-info__labels"},e._l(e.labels,(function(label,o){return t("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[t("div",{staticClass:"component-info-label__left",domProps:{textContent:e._s(label.left)}}),e._v(" "),label.link?t("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:e._s(label.right)}}):t("div",{staticClass:"component-info-label__right",domProps:{textContent:e._s(label.right)}})])})),0)])]),e._v(" "),null!==e.component.meta.deprecated?t("article",{staticClass:"danger-block"},[t("section",[e._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),t("strong",{domProps:{textContent:e._s("v".concat(e.component.meta.deprecated.version))}})]),e._v(" "),t("section",[t("div",[t("strong",[e._v("Reason")]),e._v(": "+e._s(e.component.meta.deprecated.reason)+"\n\t\t\t")]),e._v(" "),t("div",[t("strong",{domProps:{textContent:e._s(e.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),e._v(":\n\t\t\t\t"),e._l(e.component.meta.deprecated.alternatives,(function(o){return t("code",{key:o,domProps:{textContent:e._s(o)}})})),e._v(" "),0===e.component.meta.deprecated.alternatives.length?t("span",{domProps:{textContent:e._s(e.Dashes.EmDash)}}):e._e()],2)])]):e._e(),e._v(" "),t("ComponentInfoSlots",{attrs:{slots:e.component.meta.slots}}),e._v(" "),e.component.props?t("KtHeading",{attrs:{text:"Properties",toggleStatus:e.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showProps=!e.showProps}}},[t("table",[t("thead",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Default")]),e._v(" "),t("th",[e._v("Validator")])]),e._v(" "),t("tbody",e._l(Object.entries(e.component.props).sort((function(e,t){var a=Object(n.a)(e,1)[0],b=Object(n.a)(t,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),l=r[0],d=r[1];return t("tr",{key:l},[t("td",[t("code",{domProps:{textContent:e._s(l)}})]),e._v(" "),t("td",[t("code",{domProps:{textContent:e._s(e.stringifyType(d.type))}})]),e._v(" "),t("td",[d.required?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("required")}}):void 0===d.default?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("No default")}}):t("code",{domProps:{textContent:e._s(e.stringifyDefault(d.default,d.type))}})]),e._v(" "),t("td",[t("div",{staticStyle:{display:"flex","align-items":"center"}},[t("i",{staticClass:"yoco",style:{color:d.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:d.validator?d.validator.toString():void 0},domProps:{textContent:e._s(d.validator?e.Yoco.Icon.CHECK:e.Yoco.Icon.CLOSE)}}),e._v(" "),d.validator?t("div",{domProps:{textContent:e._s(d.validator.name)}}):e._e()])])])})),0)])]):e._e()],1)}),[],!1,null,"e3deffa6",null));t.a=j.exports},941:function(e,t,o){"use strict";var n=o(130),r=TypeError;e.exports=function(e,t){if(!delete e[t])throw new r("Cannot delete property "+n(t)+" of "+n(e))}},942:function(e,t,o){"use strict";var n=o(129),r=Math.floor,l=function(e,t){var o=e.length;if(o<8)for(var element,d,i=1;i<o;){for(d=i,element=e[i];d&&t(e[d-1],element)>0;)e[d]=e[--d];d!==i++&&(e[d]=element)}else for(var c=r(o/2),f=l(n(e,0,c),t),v=l(n(e,c),t),m=f.length,_=v.length,x=0,h=0;x<m||h<_;)e[x+h]=x<m&&h<_?t(f[x],v[h])<=0?f[x++]:v[h++]:x<m?f[x++]:v[h++];return e};e.exports=l},943:function(e,t,o){"use strict";var n=o(125).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},944:function(e,t,o){"use strict";var n=o(125);e.exports=/MSIE|Trident/.test(n)},945:function(e,t,o){"use strict";var n=o(125).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},946:function(e,t,o){"use strict";var n=o(9),r=o(947);n({target:"String",proto:!0,forced:o(948)("link")},{link:function(e){return r(this,"a","href",e)}})},947:function(e,t,o){"use strict";var n=o(11),r=o(65),l=o(35),d=/"/g,c=n("".replace);e.exports=function(e,t,o,n){var f=l(r(e)),v="<"+t;return""!==o&&(v+=" "+o+'="'+c(l(n),d,"&quot;")+'"'),v+">"+f+"</"+t+">"}},948:function(e,t,o){"use strict";var n=o(10);e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},949:function(e,t,o){"use strict";o(937)},950:function(e,t,o){var n=o(74)((function(i){return i[1]}));n.push([e.i,".slots-block[data-v-2187adcd]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-2187adcd]{padding:.4rem .6rem}.slots-block[data-v-2187adcd]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-2187adcd]{align-items:center;display:flex;flex:1}.header__details[data-v-2187adcd]{flex:1}.header__name[data-v-2187adcd]{font-weight:700}.header>*[data-v-2187adcd]{align-items:center;display:flex}.header[data-v-2187adcd]>:not(:first-child){margin-left:.4rem}.header__description[data-v-2187adcd]{flex:1}.header__empty-description[data-v-2187adcd]{flex:1;font-style:italic}.header__empty-scope[data-v-2187adcd]{font-style:italic}.scope[data-v-2187adcd]{margin-left:1.5rem}.scope__item[data-v-2187adcd]{align-items:center;display:flex}.scope__item[data-v-2187adcd]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-2187adcd]{font-style:italic}.scope__name[data-v-2187adcd]{font-weight:700;min-width:100px}.scope__type[data-v-2187adcd]{min-width:60px}.scope__type--is-function[data-v-2187adcd]{color:var(--orange-50)}.scope__type--is-object[data-v-2187adcd]{color:var(--purple-50)}.scope__type--is-integer[data-v-2187adcd]{color:var(--green-50)}",""]),n.locals={},e.exports=n},951:function(e,t,o){"use strict";o(938)},952:function(e,t,o){var n=o(74)((function(i){return i[1]}));n.push([e.i,".component-info[data-v-e3deffa6]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-e3deffa6]{align-items:center;flex-direction:row}}.component-info>*[data-v-e3deffa6]{display:flex;margin:5px 10px}.component-info__labels[data-v-e3deffa6]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-e3deffa6]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-e3deffa6]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-e3deffa6],.component-info-label__right[data-v-e3deffa6]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-e3deffa6]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-e3deffa6]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-e3deffa6]{margin-bottom:32px}.component-info-container[data-v-e3deffa6]>:not(:first-child){margin-top:16px}.danger-block[data-v-e3deffa6]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-e3deffa6]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-e3deffa6]{margin-left:8px}.danger-block>section[data-v-e3deffa6]{padding:.4rem .6rem}.danger-block>section[data-v-e3deffa6]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},e.exports=n},979:function(e,t,o){var content=o(1060);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(75).default)("9dd8826a",content,!0,{sourceMap:!1})}}]);