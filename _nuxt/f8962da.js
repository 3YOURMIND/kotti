(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1046:function(e,t,o){"use strict";o(11)({target:"Number",stat:!0,nonConfigurable:!0,nonWritable:!0},{MAX_SAFE_INTEGER:9007199254740991})},1047:function(e,t,o){"use strict";o(944)},1048:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,"pre[data-v-397291ee]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-397291ee]{list-style:none}h3[data-v-397291ee]{border-bottom:0}.wrapper[data-v-397291ee]{background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius);display:flex;flex-direction:column;margin:0 0 1.5em}@media(width < 960px){.wrapper[data-v-397291ee]{flex-direction:column}.wrapper[data-v-397291ee]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-397291ee]{flex-direction:row}.wrapper>*[data-v-397291ee]{flex:1}.wrapper[data-v-397291ee]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-397291ee]{margin:0!important;padding:1.5em}.field-row[data-v-397291ee]{display:flex}.field-row>*[data-v-397291ee]{flex:1}.field-row[data-v-397291ee]>:not(:first-child){margin-left:10px}.overview[data-v-397291ee]{display:flex;margin-bottom:20px}@media(width < 960px){.overview[data-v-397291ee]{flex-direction:column}.overview[data-v-397291ee]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-397291ee]{flex-direction:row}.overview>*[data-v-397291ee]{flex:1;flex-basis:0}.overview__code>pre[data-v-397291ee]{max-width:400px}.overview__component>*[data-v-397291ee]{margin-right:20px}}.overview__component[data-v-397291ee]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-397291ee]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-397291ee]{height:150px;margin:0;overflow:scroll}",""]),n.locals={},e.exports=n},1121:function(e,t,o){"use strict";o.r(t),o.d(t,"useRequestAnimationFrame",(function(){return N}));o(120),o(99),o(223),o(101),o(224);var n=o(6),r=o(4),l=(o(1046),o(473),o(100),o(222),o(84),o(45),o(901),o(917)),c=o(82),d=o.n(c),_=o(0),v=o(8),f=o(2),O=o(884);function E(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function S(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?E(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):E(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function N(e){var t=Object(_.ref)(null),o=function(){t.value=window.requestAnimationFrame((function animate(){e(),t.value=window.requestAnimationFrame(animate)}))},n=function(){t.value&&(window.cancelAnimationFrame(t.value),t.value=null)};return Object(_.onMounted)((function(){o()})),Object(_.onBeforeUnmount)((function(){n()})),{start:o,stop:n}}var m=Object(_.defineComponent)({name:"DocumentationPageUsageComponentsFileUpload",components:{ComponentInfo:O.a,KtFieldMultiSelect:v.v,KtFieldNumber:v.x,KtFieldSingleSelect:v.A,KtFieldText:v.C,KtFieldToggleGroup:v.F,KtFileUpload:v.G,KtForm:v.I},setup:function(){var e=Object(_.ref)({booleanFlags:{allowMultiple:!0,allowPhotos:!1,hideDropArea:!1,isDisabled:!1,isLoading:!1},collapseExtensionsAfter:5,dataTest:null,extensions:[],externalUrl:null,helpDescription:null,helpText:null,icon:f.a.Icon.CLOUD_UPLOAD,label:"Label",maxFileSize:Number.MAX_SAFE_INTEGER,tabIndex:null}),t=Object(_.ref)([]);return N((function(){t.value=t.value.map((function(e){if(e.status!==v.a.FileUpload.Status.UPLOADING)return e;var t=d()();if(t.isAfter(e.uploadEndTime))return S(S({},e),{},{progress:1,status:v.a.FileUpload.Status.UPLOADED});var o=t.valueOf()-e.uploadStartTime.valueOf(),n=e.uploadEndTime.valueOf()-e.uploadStartTime.valueOf();return S(S({},e),{},{progress:o/n})}))})),{component:v.G,fieldProps:Object(_.computed)((function(){return{allowMultiple:e.value.booleanFlags.allowMultiple,allowPhotos:e.value.booleanFlags.allowPhotos,collapseExtensionsAfter:e.value.collapseExtensionsAfter,dataTest:e.value.dataTest,extensions:e.value.extensions,externalUrs:e.value.externalUrl,helpDescription:e.value.helpDescription,helpText:e.value.helpText,hideDropArea:e.value.booleanFlags.hideDropArea,icon:e.value.icon,isDisabled:e.value.booleanFlags.isDisabled,isLoading:e.value.booleanFlags.isLoading,label:e.value.label,maxFileSize:e.value.maxFileSize,state:t.value,tabIndex:e.value.tabIndex}})),onAddFiles:function(e){var o=d()();t.value=[].concat(Object(n.a)(e.map((function(e){return S(S({},e.fileInfo),{},{status:v.a.FileUpload.Status.UPLOADING,uploadEndTime:d()().add(Math.random()*l.TimeConversion.SECONDS_PER_MINUTE,"second"),uploadStartTime:o})}))),Object(n.a)(t.value))},onCancelUpload:function(e){t.value=t.value.map((function(t){return t.id!==e?t:S(S({},t),{},{status:v.a.FileUpload.Status.CANCELED})}))},onDeleteFile:function(e){t.value=t.value.filter((function(t){return t.id!==e}))},onRestartUpload:function(e){t.value=t.value.map((function(t){return t.id!==e?t:S(S({},t),{},{status:v.a.FileUpload.Status.UPLOADING,uploadEndTime:d()().add(Math.random()*l.TimeConversion.SECONDS_PER_MINUTE,"second"),uploadStartTime:d()()})}))},settings:e,yocoIconOptions:Object.values(f.a.Icon).map((function(e){return{label:e,value:e}}))}}}),C=(o(1047),o(32)),component=Object(C.a)(m,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),t("div",{staticClass:"overview"},[t("div",{staticClass:"overview__component"},[t("KtFileUpload",e._b({on:{addFiles:e.onAddFiles,cancelUpload:e.onCancelUpload,deleteFile:e.onDeleteFile,restartUpload:e.onRestartUpload}},"KtFileUpload",e.fieldProps,!1))],1)]),e._v(" "),t("KtForm",{attrs:{size:"small"},model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[t("div",{staticClass:"wrapper"},[t("div",[t("h4",[e._v("Settings")]),e._v(" "),t("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"allowMultiple",label:"allowMultiple"},{key:"allowPhotos",label:"allowPhotos"},{key:"hideDropArea",label:"hideDropArea"},{key:"isDisabled",label:"isDisabled"},{key:"isLoading",label:"isLoading"}],type:"switch"}}),e._v(" "),t("KtFieldNumber",{attrs:{formKey:"collapseExtensionsAfter",isOptional:"",label:"collapseExtensionsAfter"}}),e._v(" "),t("KtFieldNumber",{attrs:{formKey:"maxFileSize",isOptional:"",label:"maxFileSize"}}),e._v(" "),t("KtFieldNumber",{attrs:{formKey:"tabIndex",isOptional:"",label:"tabIndex"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}}),e._v(" "),t("KtFieldMultiSelect",{attrs:{formKey:"extensions",helpText:"List of allowed file extensions. Takes an array of case-insensitive strings.",isOptional:"",label:"extensions",options:[{label:"DOC",value:"DOC"},{label:"GIF",value:"GIF"},{label:"JP2",value:"JP2"},{label:"JPEG",value:"JPEG"},{label:"JPG",value:"JPG"},{label:"OBJ",value:"OBJ"},{label:"PDF",value:"PDF"},{label:"PNG",value:"PNG"},{label:"STL",value:"STL"},{label:"TXT",value:"TXT"}]}})],1),e._v(" "),t("div",[t("h4",[e._v("Texts")]),e._v(" "),t("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"externalUrl",isOptional:"",label:"externalUrl"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"helpText",isOptional:"",label:"helpText"}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"icon",isOptional:"",label:"icon",options:e.yocoIconOptions},scopedSlots:e._u([{key:"option",fn:function(o){var option=o.option;return[t("i",{staticClass:"yoco",staticStyle:{"margin-right":"10px","font-size":"24px"},domProps:{textContent:e._s(option.value)}}),e._v(" "),t("span",{domProps:{textContent:e._s(option.label)}})]}}])})],1)])])],1)}),[],!1,null,"397291ee",null);t.default=component.exports},882:function(e,t,o){var content=o(892);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("258f50c4",content,!0,{sourceMap:!1})},883:function(e,t,o){var content=o(894);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("7f9a7731",content,!0,{sourceMap:!1})},884:function(e,t,o){"use strict";var n=o(14),r=(o(98),o(222),o(895),o(885),o(468),o(45),o(119),o(120),o(99),o(84),o(223),o(101),o(224),o(4)),l=o(6),c=(o(68),o(121),o(100),o(305),o(85)),d=o(124),_=o.n(d),v=o(307),f=o.n(v),O=o(0),E=o(8),S=o(2),N=(o(157),Object(O.defineComponent)({name:"ComponentInfoSlots",components:{KtHeading:E.L},props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(O.ref)(!1)}}})),m=(o(891),o(32)),C=Object(m.a)(N,(function(){var e=this,t=e._self._c;e._self._setupProxy;return Object.entries(e.slots).length>0?t("KtHeading",{attrs:{text:"Slots",toggleStatus:e.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showSlots=!e.showSlots}}},[t("article",{staticClass:"slots-block"},e._l(Object.entries(e.slots),(function(o){var r=Object(n.a)(o,2),l=r[0],details=r[1];return t("section",{key:l},[t("div",{staticClass:"header"},[t("div",{staticClass:"header__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",{staticClass:"header__details"},[details.description?t("div",{staticClass:"header__description",domProps:{textContent:e._s(details.description)}}):t("div",{staticClass:"header__empty-description",domProps:{textContent:e._s("No description")}}),e._v(" "),null===details.scope?t("div",{staticClass:"header__empty-scope",domProps:{textContent:e._s("(Not Scoped)")}}):e._e()])]),e._v(" "),null!==details.scope?t("div",{staticClass:"scope"},e._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1],d=c.description,_=c.type;return t("div",{key:l,staticClass:"scope__item"},[t("div",{class:"scope__type scope__type--is-".concat(_),domProps:{textContent:e._s(_)}}),e._v(" "),t("div",{staticClass:"scope__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:e._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:e._s(d)}})])})),0):e._e()])})),0)]):e._e()}),[],!1,null,"18a948b4",null).exports;function I(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}var D=Object(O.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:C,KtHeading:E.L},props:{component:{required:!0,type:Object}},setup:function(e){return{Dashes:c.Dashes,labels:Object(O.computed)((function(){var t=[],o=e.component,n=o.meta,c=n.addedVersion,d=n.componentFolder,_=n.deprecated,v=n.designs,O=n.typeScript,S=o.name,N=null!=d?d:f()(S.replace(/^Kt/,"Kotti")),m=e.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(N):null;return null!==_&&t.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(_.version)}),null!==v?Array.isArray(v)?t.push.apply(t,Object(l.a)(v.map((function(e){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(e.title,"”"),link:e.url,right:Object(r.a)({},E.a.MetaDesignType.FIGMA,"Figma")[e.type]}})))):t.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:v.url,right:Object(r.a)({},E.a.MetaDesignType.FIGMA,"Figma")[v.type]}):t.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),O&&t.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:m?"".concat(m,"/types.ts"):void 0,right:O.namespace}),t.push(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?I(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):I(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),m&&t.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(m,"/").concat(S,".vue"),right:"".concat(S,".vue")}),t})),showEmits:Object(O.ref)(!1),showProps:Object(O.ref)(!1),stringifyPropDefault:function(e,t){return"function"==typeof e?_()(t).some((function(e){return"Function"===e.name}))?"".concat(e.toString()," *"):"".concat(JSON.stringify(e())," *"):JSON.stringify(e)},stringifyType:function(e){return _()(e).map((function(e){return e.name.toLowerCase()})).join(" | ")},Yoco:S.a}}}),x=D,h=(o(893),Object(m.a)(x,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"component-info-container"},[t("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==e.component.meta.deprecated}},[t("h1",{staticClass:"component-info__title",domProps:{textContent:e._s(e.component.name)}}),e._v(" "),t("div",[t("div",{staticClass:"component-info__labels"},e._l(e.labels,(function(label,o){return t("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[t("div",{staticClass:"component-info-label__left",domProps:{textContent:e._s(label.left)}}),e._v(" "),label.link?t("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:e._s(label.right)}}):t("div",{staticClass:"component-info-label__right",domProps:{textContent:e._s(label.right)}})])})),0)])]),e._v(" "),null!==e.component.meta.deprecated?t("article",{staticClass:"danger-block"},[t("section",[e._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),t("strong",{domProps:{textContent:e._s("v".concat(e.component.meta.deprecated.version))}})]),e._v(" "),t("section",[t("div",[t("strong",[e._v("Reason")]),e._v(": "+e._s(e.component.meta.deprecated.reason)+"\n\t\t\t")]),e._v(" "),t("div",[t("strong",{domProps:{textContent:e._s(e.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),e._v(":\n\t\t\t\t"),e._l(e.component.meta.deprecated.alternatives,(function(o){return t("code",{key:o,domProps:{textContent:e._s(o)}})})),e._v(" "),0===e.component.meta.deprecated.alternatives.length?t("span",{domProps:{textContent:e._s(e.Dashes.EmDash)}}):e._e()],2)])]):e._e(),e._v(" "),e.component.props?t("KtHeading",{attrs:{text:"Properties",toggleStatus:e.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showProps=!e.showProps}}},[t("table",[t("thead",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Default")]),e._v(" "),t("th",[e._v("Validator")])]),e._v(" "),t("tbody",e._l(Object.entries(e.component.props).sort((function(e,t){var a=Object(n.a)(e,1)[0],b=Object(n.a)(t,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1];return t("tr",{key:l},[t("td",[t("code",{domProps:{textContent:e._s(l)}})]),e._v(" "),t("td",[t("code",{domProps:{textContent:e._s(e.stringifyType(c.type))}})]),e._v(" "),t("td",[c.required?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("required")}}):void 0===c.default?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("No default")}}):t("code",{domProps:{textContent:e._s(e.stringifyPropDefault(c.default,c.type))}})]),e._v(" "),t("td",[t("div",{staticStyle:{display:"flex","align-items":"center"}},[t("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:e._s(c.validator?e.Yoco.Icon.CHECK:e.Yoco.Icon.CLOSE)}}),e._v(" "),c.validator?t("div",{domProps:{textContent:e._s(c.validator.name)}}):e._e()])])])})),0)])]):e._e(),e._v(" "),e.component.emits&&e.component.emits.length>0?t("KtHeading",{attrs:{text:"Emits",toggleStatus:e.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showEmits=!e.showEmits}}},[t("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[e._l(e.component.emits,(function(o){return[t("code",{key:o,domProps:{textContent:e._s("@".concat(o))}})]}))],2)]):e._e(),e._v(" "),t("ComponentInfoSlots",{attrs:{slots:e.component.meta.slots}})],1)}),[],!1,null,"6e674bb8",null));t.a=h.exports},885:function(e,t,o){"use strict";var n=o(11),r=o(15),l=o(70),c=o(61),d=o(78),_=o(886),v=o(38),f=o(13),O=o(887),E=o(306),S=o(888),N=o(889),m=o(158),C=o(890),I=[],D=r(I.sort),x=r(I.push),h=f((function(){I.sort(void 0)})),y=f((function(){I.sort(null)})),P=E("sort"),w=!f((function(){if(m)return m<70;if(!(S&&S>3)){if(N)return!0;if(C)return C<603;var code,e,t,o,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(o=0;o<47;o++)I.push({k:e+o,v:t})}for(I.sort((function(a,b){return b.v-a.v})),o=0;o<I.length;o++)e=I[o].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:h||!y||!P||!w},{sort:function(e){void 0!==e&&l(e);var t=c(this);if(w)return void 0===e?D(t):D(t,e);var o,n,r=[],f=d(t);for(n=0;n<f;n++)n in t&&x(r,t[n]);for(O(r,function(e){return function(t,o){return void 0===o?-1:void 0===t?1:void 0!==e?+e(t,o)||0:v(t)>v(o)?1:-1}}(e)),o=d(r),n=0;n<o;)t[n]=r[n++];for(;n<f;)_(t,n++);return t}})},886:function(e,t,o){"use strict";var n=o(123),r=TypeError;e.exports=function(e,t){if(!delete e[t])throw new r("Cannot delete property "+n(t)+" of "+n(e))}},887:function(e,t,o){"use strict";var n=o(122),r=Math.floor,l=function(e,t){var o=e.length;if(o<8)for(var element,c,i=1;i<o;){for(c=i,element=e[i];c&&t(e[c-1],element)>0;)e[c]=e[--c];c!==i++&&(e[c]=element)}else for(var d=r(o/2),_=l(n(e,0,d),t),v=l(n(e,d),t),f=_.length,O=v.length,E=0,S=0;E<f||S<O;)e[E+S]=E<f&&S<O?t(_[E],v[S])<=0?_[E++]:v[S++]:E<f?_[E++]:v[S++];return e};e.exports=l},888:function(e,t,o){"use strict";var n=o(118).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},889:function(e,t,o){"use strict";var n=o(118);e.exports=/MSIE|Trident/.test(n)},890:function(e,t,o){"use strict";var n=o(118).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},891:function(e,t,o){"use strict";o(882)},892:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,".slots-block[data-v-18a948b4]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-18a948b4]{padding:.4rem .6rem}.slots-block[data-v-18a948b4]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-18a948b4]{align-items:center;display:flex;flex:1}.header__details[data-v-18a948b4]{flex:1}.header__name[data-v-18a948b4]{font-weight:700}.header>*[data-v-18a948b4]{align-items:center;display:flex}.header[data-v-18a948b4]>:not(:first-child){margin-left:.4rem}.header__description[data-v-18a948b4]{flex:1}.header__empty-description[data-v-18a948b4]{flex:1;font-style:italic}.header__empty-scope[data-v-18a948b4]{font-style:italic}.scope[data-v-18a948b4]{margin-left:1.5rem}.scope__item[data-v-18a948b4]{align-items:center;display:flex}.scope__item[data-v-18a948b4]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-18a948b4]{font-style:italic}.scope__name[data-v-18a948b4]{font-weight:700;min-width:100px}.scope__type[data-v-18a948b4]{min-width:60px}.scope__type--is-function[data-v-18a948b4]{color:var(--orange-50)}.scope__type--is-object[data-v-18a948b4]{color:var(--purple-50)}.scope__type--is-integer[data-v-18a948b4]{color:var(--green-50)}",""]),n.locals={},e.exports=n},893:function(e,t,o){"use strict";o(883)},894:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,".component-info[data-v-6e674bb8]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-6e674bb8]{align-items:center;flex-direction:row}}.component-info>*[data-v-6e674bb8]{display:flex;margin:5px 10px}.component-info__labels[data-v-6e674bb8]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-6e674bb8]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50);-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.component-info-label[data-v-6e674bb8]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-6e674bb8],.component-info-label__right[data-v-6e674bb8]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-6e674bb8]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-6e674bb8]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-6e674bb8]{margin-bottom:32px}.component-info-container[data-v-6e674bb8]>:not(:first-child){margin-top:16px}.danger-block[data-v-6e674bb8]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-6e674bb8]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-6e674bb8]{margin-left:8px}.danger-block>section[data-v-6e674bb8]{padding:.4rem .6rem}.danger-block>section[data-v-6e674bb8]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},e.exports=n},895:function(e,t,o){"use strict";var n=o(11),r=o(896);n({target:"String",proto:!0,forced:o(897)("link")},{link:function(e){return r(this,"a","href",e)}})},896:function(e,t,o){"use strict";var n=o(15),r=o(69),l=o(38),c=/"/g,d=n("".replace);e.exports=function(e,t,o,n){var _=l(r(e)),v="<"+t;return""!==o&&(v+=" "+o+'="'+d(l(n),c,"&quot;")+'"'),v+">"+_+"</"+t+">"}},897:function(e,t,o){"use strict";var n=o(13);e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},901:function(e,t,o){"use strict";var n=o(11),r=o(469).values;n({target:"Object",stat:!0},{values:function(e){return r(e)}})},917:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Ki=Math.pow(1024,1)]="Ki",e[e.Mi=Math.pow(1024,2)]="Mi",e[e.Gi=Math.pow(1024,3)]="Gi",e[e.Ti=Math.pow(1024,4)]="Ti",e[e.Pi=Math.pow(1024,5)]="Pi",e[e.Ei=Math.pow(1024,6)]="Ei",e[e.Zi=Math.pow(1024,7)]="Zi",e[e.Yi=Math.pow(1024,8)]="Yi"}(t.BinaryPrefixes||(t.BinaryPrefixes={})),function(e){e[e.DAYS_PER_WEEK=7]="DAYS_PER_WEEK",e[e.WEEK_IN_DAYS=7]="WEEK_IN_DAYS",e[e.HOURS_PER_DAY=24]="HOURS_PER_DAY",e[e.DAY_IN_HOURS=24]="DAY_IN_HOURS",e[e.MINUTES_PER_HOUR=60]="MINUTES_PER_HOUR",e[e.HOUR_IN_MINUTES=60]="HOUR_IN_MINUTES",e[e.SECONDS_PER_MINUTE=60]="SECONDS_PER_MINUTE",e[e.MINUTE_IN_SECONDS=60]="MINUTE_IN_SECONDS",e[e.MILLISECONDS_PER_SECOND=1e3]="MILLISECONDS_PER_SECOND",e[e.SECOND_IN_MILLISECONDS=1e3]="SECOND_IN_MILLISECONDS",e[e.MICROSECONDS_PER_MILLISECOND=1e3]="MICROSECONDS_PER_MILLISECOND",e[e.MILLISECOND_IN_MICROSECONDS=1e3]="MILLISECOND_IN_MICROSECONDS",e[e.NANOSECONDS_PER_MICROSECOND=1e3]="NANOSECONDS_PER_MICROSECOND",e[e.MICROSECOND_IN_NANOSECONDS=1e3]="MICROSECOND_IN_NANOSECONDS",e[e.HOURS_PER_WEEK=168]="HOURS_PER_WEEK",e[e.WEEK_IN_HOURS=168]="WEEK_IN_HOURS",e[e.MINUTES_PER_WEEK=10080]="MINUTES_PER_WEEK",e[e.WEEK_IN_MINUTES=10080]="WEEK_IN_MINUTES",e[e.MINUTES_PER_DAY=1440]="MINUTES_PER_DAY",e[e.DAY_IN_MINUTES=1440]="DAY_IN_MINUTES",e[e.SECONDS_PER_WEEK=604800]="SECONDS_PER_WEEK",e[e.WEEK_IN_SECONDS=604800]="WEEK_IN_SECONDS",e[e.SECONDS_PER_DAY=86400]="SECONDS_PER_DAY",e[e.DAY_IN_SECONDS=86400]="DAY_IN_SECONDS",e[e.SECONDS_PER_HOUR=3600]="SECONDS_PER_HOUR",e[e.HOUR_IN_SECONDS=3600]="HOUR_IN_SECONDS",e[e.MILLISECONDS_PER_WEEK=6048e5]="MILLISECONDS_PER_WEEK",e[e.WEEK_IN_MILLISECONDS=6048e5]="WEEK_IN_MILLISECONDS",e[e.MILLISECONDS_PER_DAY=864e5]="MILLISECONDS_PER_DAY",e[e.DAY_IN_MILLISECONDS=864e5]="DAY_IN_MILLISECONDS",e[e.MILLISECONDS_PER_HOUR=36e5]="MILLISECONDS_PER_HOUR",e[e.HOUR_IN_MILLISECONDS=36e5]="HOUR_IN_MILLISECONDS",e[e.MILLISECONDS_PER_MINUTE=6e4]="MILLISECONDS_PER_MINUTE",e[e.MINUTE_IN_MILLISECONDS=6e4]="MINUTE_IN_MILLISECONDS",e[e.MICROSECONDS_PER_WEEK=6048e8]="MICROSECONDS_PER_WEEK",e[e.WEEK_IN_MICROSECONDS=6048e8]="WEEK_IN_MICROSECONDS",e[e.MICROSECONDS_PER_DAY=864e8]="MICROSECONDS_PER_DAY",e[e.DAY_IN_MICROSECONDS=864e8]="DAY_IN_MICROSECONDS",e[e.MICROSECONDS_PER_HOUR=36e8]="MICROSECONDS_PER_HOUR",e[e.HOUR_IN_MICROSECONDS=36e8]="HOUR_IN_MICROSECONDS",e[e.MICROSECONDS_PER_MINUTE=6e7]="MICROSECONDS_PER_MINUTE",e[e.MINUTE_IN_MICROSECONDS=6e7]="MINUTE_IN_MICROSECONDS",e[e.MICROSECONDS_PER_SECOND=1e6]="MICROSECONDS_PER_SECOND",e[e.SECOND_IN_MICROSECONDS=1e6]="SECOND_IN_MICROSECONDS",e[e.NANOSECONDS_PER_WEEK=6048e11]="NANOSECONDS_PER_WEEK",e[e.WEEK_IN_NANOSECONDS=6048e11]="WEEK_IN_NANOSECONDS",e[e.NANOSECONDS_PER_DAY=864e11]="NANOSECONDS_PER_DAY",e[e.DAY_IN_NANOSECONDS=864e11]="DAY_IN_NANOSECONDS",e[e.NANOSECONDS_PER_HOUR=36e11]="NANOSECONDS_PER_HOUR",e[e.HOUR_IN_NANOSECONDS=36e11]="HOUR_IN_NANOSECONDS",e[e.NANOSECONDS_PER_MINUTE=6e10]="NANOSECONDS_PER_MINUTE",e[e.MINUTE_IN_NANOSECONDS=6e10]="MINUTE_IN_NANOSECONDS",e[e.NANOSECONDS_PER_SECOND=1e9]="NANOSECONDS_PER_SECOND",e[e.SECOND_IN_NANOSECONDS=1e9]="SECOND_IN_NANOSECONDS",e[e.NANOSECONDS_PER_MILLISECOND=1e6]="NANOSECONDS_PER_MILLISECOND",e[e.MILLISECOND_IN_NANOSECONDS=1e6]="MILLISECOND_IN_NANOSECONDS"}(t.TimeConversion||(t.TimeConversion={}))},944:function(e,t,o){var content=o(1048);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("0822ac7e",content,!0,{sourceMap:!1})}}]);