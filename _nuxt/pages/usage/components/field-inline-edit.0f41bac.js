(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{1039:function(t,e,o){"use strict";o.r(e);o(354),o(176),o(733),o(289);var n=o(726),l=o(229),r=o(256),d=o(85),c=o(167),v=o(353),f=o(114),_=o(0),m=o(727),h=Object(_.defineComponent)({name:"DocumentationPageUsageComponentsFieldInlineEdit",components:{ComponentInfo:m.a,KtFieldInlineEdit:r.a,KtFieldSingleSelect:d.c,KtForm:c.a},setup:function(){var t=Object(_.ref)({booleanFlags:{hideValidation:!1,isDisabled:!1,isLoading:!1,isMultiline:!1,isOptional:!1,isReadonly:!1},dataTest:null,helpDescription:null,helpText:null,label:"Label",placeholder:null,preventConfirmationOn:f.a.ConfirmationValidation.ERROR,tabIndex:null,textStyle:null,validation:"empty"}),e=Object(_.ref)({fieldValue:null});return{component:r.a,formValue:e,fieldValue:Object(_.computed)((function(){return e.value.fieldValue})),fieldProps:Object(_.computed)((function(){var e;return{dataTest:t.value.dataTest,helpDescription:t.value.helpDescription,helpText:t.value.helpText,hideValidation:t.value.booleanFlags.hideValidation,isDisabled:t.value.booleanFlags.isDisabled,isLoading:t.value.booleanFlags.isLoading,isMultiline:t.value.booleanFlags.isMultiline,isOptional:t.value.booleanFlags.isOptional,isReadonly:t.value.booleanFlags.isReadonly,label:t.value.label,placeholder:t.value.placeholder,preventConfirmationOn:null!==(e=t.value.preventConfirmationOn)&&void 0!==e?e:v.a.FieldInlineEdit.ConfirmationValidation.NEVER,tabIndex:t.value.tabIndex,textStyle:t.value.textStyle,validator:function(){var e;return{type:null!==(e=t.value.validation)&&void 0!==e?e:"empty",text:"Some validation text"}}}})),onConfirm:function(t){window.alert(t)},preventConfirmationOptions:Object(_.ref)(Object.entries(v.a.FieldInlineEdit.ConfirmationValidation).map((function(t){var e=Object(l.a)(t,2),label=e[0],o=e[1];return{label:label===v.a.FieldInlineEdit.ConfirmationValidation.NEVER?"".concat(label," (Default)"):label,value:o}}))),reset:function(){window.setTimeout((function(){e.value={fieldValue:null}}),0)},settings:t,textStyleOptions:Object(_.ref)([{label:"No Styling (DEFAULT)",value:null}].concat(Object(n.a)(Object.entries(f.a.TextStyle).map((function(t){var e=Object(l.a)(t,2);return{label:e[0],value:e[1]}}))))),validationOptions:Object(_.ref)([{label:"Empty (Default)",value:"empty"},{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}])}}}),y=(o(912),o(65)),component=Object(y.a)(h,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("div",{staticClass:"element-example white"},[o("KtForm",{model:{value:t.formValue,callback:function(e){t.formValue=e},expression:"formValue"}},[o("KtFieldInlineEdit",t._b({staticClass:"mb-16px",attrs:{formKey:"fieldValue"},on:{confirm:t.onConfirm}},"KtFieldInlineEdit",t.fieldProps,!1)),t._v(" "),o("div",{staticClass:"overview__component__value mb-8px"},[o("strong",[t._v("Value:")]),t._v(" "),o("span",{domProps:{textContent:t._s(JSON.stringify(t.fieldValue))}}),t._v(" "),o("a",{on:{click:t.reset}},[t._v("reset")])])],1),t._v(" "),o("KtForm",{attrs:{size:"small"},model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[o("div",{staticClass:"wrapper"},[o("div",[o("h4",[t._v("Settings")]),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"validation",hideClear:"",isOptional:"",label:"Validation State",options:t.validationOptions}}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"preventConfirmationOn",hideClear:"",isOptional:"",label:"preventConfirmationOn",options:t.preventConfirmationOptions}}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"textStyle",helpText:"Only supported with single-line KtFieldInlineEdit",hideClear:"",isDisabled:t.settings.booleanFlags.isMultiline,isOptional:"",label:"Text Styles",options:t.textStyleOptions}}),t._v(" "),o("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"hideValidation",label:"hideValidation"},{key:"isDisabled",label:"isDisabled"},{key:"isReadonly",label:"isReadonly"},{key:"isLoading",label:"isLoading"},{key:"isMultiline",label:"isMultiline"},{key:"isOptional",label:"isOptional"}],type:"switch"}}),t._v(" "),o("KtFieldText",{attrs:{formKey:"placeholder",isOptional:"",label:"placeholder"}}),t._v(" "),o("KtFieldNumber",{attrs:{formKey:"tabIndex",isOptional:"",label:"tabIndex"}}),t._v(" "),o("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}})],1),t._v(" "),o("div",[o("h4",[t._v("Texts")]),t._v(" "),o("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),t._v(" "),o("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),t._v(" "),o("div",{staticClass:"field-row"},[o("KtFieldText",{attrs:{formKey:"helpText",isOptional:"",label:"helpText"}})],1)],1)])])],1)],1)}),[],!1,null,"3411ddd2",null);e.default=component.exports},724:function(t,e,o){var content=o(730);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(119).default)("24122391",content,!0,{sourceMap:!1})},725:function(t,e,o){var content=o(732);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(119).default)("3377c674",content,!0,{sourceMap:!1})},726:function(t,e,o){"use strict";o.d(e,"a",(function(){return r}));var n=o(357);var l=o(417);function r(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(l.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},727:function(t,e,o){"use strict";o(178),o(354),o(177),o(179),o(519),o(176),o(416),o(155),o(355),o(356),o(286),o(108),o(226),o(181),o(287),o(180);var n=o(80),l=o(726),r=o(353),d=o(5),c=o(728),v=o(0),f=o(47),_=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(v.ref)(!1)}}}),m=(o(729),o(65)),h=Object(m.a)(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],l=e[1],r=l.description,d=l.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+d,domProps:{textContent:t._s(d)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===r?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(r)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"1f580630",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var x=Object(v.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:h},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:c.Dashes,labels:Object(v.computed)((function(){var e=[],o=t.component,d=o.meta,c=d.addedVersion,v=d.componentFolder,_=d.deprecated,m=d.designs,h=d.typeScript,x=o.name,k=null!=v?v:Object(f.kebabCase)(x.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(k):null;return null!==_&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(_.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(l.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},r.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},r.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(x,".vue"),right:"".concat(x,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(f.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(f.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:d.Yoco}}}),k=(o(731),Object(m.a)(x,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],l=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(l.type))}})]),t._v(" "),o("td",[l.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===l.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(l.default,l.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:l.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:l.validator?l.validator.toString():void 0},domProps:{textContent:t._s(l.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),l.validator?o("div",{domProps:{textContent:t._s(l.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"7a5883f0",null));e.a=k.exports},728:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},729:function(t,e,o){"use strict";var n=o(724);o.n(n).a},730:function(t,e,o){(e=o(118)(!1)).push([t.i,".slots-block[data-v-1f580630]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-1f580630]{padding:.4rem .6rem}.slots-block[data-v-1f580630]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-1f580630]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-1f580630],.slots-block__header__details__description[data-v-1f580630]{flex:1}.slots-block__header__details__empty-description[data-v-1f580630]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-1f580630]{font-style:italic}.slots-block__header__name[data-v-1f580630]{font-weight:700}.slots-block__header>*[data-v-1f580630]{display:flex;align-items:center}.slots-block__header[data-v-1f580630]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-1f580630]{margin-left:1.5rem}.slots-block__scope__item[data-v-1f580630]{display:flex;align-items:center}.slots-block__scope__item[data-v-1f580630]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-1f580630]{font-style:italic}.slots-block__scope__item__name[data-v-1f580630]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-1f580630]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-1f580630]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-1f580630]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-1f580630]{color:var(--green-50)}",""]),t.exports=e},731:function(t,e,o){"use strict";var n=o(725);o.n(n).a},732:function(t,e,o){(e=o(118)(!1)).push([t.i,".table-style[data-v-7a5883f0],table[data-v-7a5883f0]{width:100%;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;table-layout:auto;border-collapse:collapse}.table-style .th-style[data-v-7a5883f0],.table-style th[data-v-7a5883f0],table .th-style[data-v-7a5883f0],table th[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);font-size:.6rem;line-height:1em;color:#8f8f8f;text-align:inherit;text-transform:uppercase;border-bottom:.05rem solid #dbdbdb}.table-style .tr-style[data-v-7a5883f0],.table-style tr[data-v-7a5883f0],table .tr-style[data-v-7a5883f0],table tr[data-v-7a5883f0]{margin:0}.table-style .td-style[data-v-7a5883f0],.table-style td[data-v-7a5883f0],table .td-style[data-v-7a5883f0],table td[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);line-height:1.2rem;border-bottom:1px solid #dbdbdb}.table-style i[data-v-7a5883f0],table i[data-v-7a5883f0]{margin:0 .2rem;font-size:1rem!important;color:#8a8a8a}.component-info[data-v-7a5883f0]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-7a5883f0]{flex-direction:row;align-items:center}}.component-info>*[data-v-7a5883f0]{display:flex;margin:5px 10px}.component-info__labels[data-v-7a5883f0]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-7a5883f0]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-7a5883f0],.component-info__label__right[data-v-7a5883f0]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-7a5883f0]:hover{text-decoration:underline}.component-info__label__left[data-v-7a5883f0]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-7a5883f0]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-7a5883f0]{margin-bottom:32px}.component-info-container[data-v-7a5883f0]>:not(:first-child){margin-top:16px}.danger-block[data-v-7a5883f0]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-7a5883f0]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-7a5883f0]{margin-left:8px}.danger-block>section[data-v-7a5883f0]{padding:.4rem .6rem}.danger-block>section[data-v-7a5883f0]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},733:function(t,e,o){var n=o(38),l=o(734).entries;n({target:"Object",stat:!0},{entries:function(t){return l(t)}})},734:function(t,e,o){var n=o(81),l=o(288),r=o(109),d=o(358).f,c=function(t){return function(e){for(var o,c=r(e),v=l(c),f=v.length,i=0,_=[];f>i;)o=v[i++],n&&!d.call(c,o)||_.push(t?[o,c[o]]:c[o]);return _}};t.exports={entries:c(!0),values:c(!1)}},768:function(t,e,o){var content=o(913);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(119).default)("1763d64c",content,!0,{sourceMap:!1})},912:function(t,e,o){"use strict";var n=o(768);o.n(n).a},913:function(t,e,o){(e=o(118)(!1)).push([t.i,"pre[data-v-3411ddd2]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-3411ddd2]{list-style:none}h3[data-v-3411ddd2]{border-bottom:0}.wrapper[data-v-3411ddd2]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius)}@media(max-width:959px){.wrapper[data-v-3411ddd2]{flex-direction:column}.wrapper[data-v-3411ddd2]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-3411ddd2]{flex-direction:row}.wrapper>*[data-v-3411ddd2]{flex:1}.wrapper[data-v-3411ddd2]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-3411ddd2]{padding:1.5em;margin:0!important}.field-row[data-v-3411ddd2]{display:flex}.field-row>*[data-v-3411ddd2]{flex:1}.field-row[data-v-3411ddd2]>:not(:first-child){margin-left:10px}.overview[data-v-3411ddd2]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-3411ddd2]{flex-direction:column}.overview[data-v-3411ddd2]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-3411ddd2]{flex-direction:row}.overview>*[data-v-3411ddd2]{flex:1;flex-basis:0}.overview__code>pre[data-v-3411ddd2]{max-width:400px}.overview__component>*[data-v-3411ddd2]{margin-right:20px}}.overview__component[data-v-3411ddd2]{display:flex;flex-direction:column;justify-content:space-between}.overview__component__value span[data-v-3411ddd2]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-3411ddd2]{height:150px;margin:0;overflow:scroll}",""]),t.exports=e}}]);