(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1001:function(e,t,l){"use strict";l.r(t);l(176),l(350),l(175),l(517),l(177),l(355),l(174),l(152),l(729),l(351),l(352),l(283),l(960),l(223),l(358),l(284),l(178),l(286);var o=l(723),n=l(226),r=l(80),d=l(204),c=l(90),m=l(162),v=l(85),f=l(205),S=l(271),_=l(272),O=l(143),h=l(273),P=l(142),x=l(349),y=l(7),K=l(734),D=l(0),E=l(784),C=l.n(E),T=l(759),F=l(748),w=l(722);function R(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(object);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,l)}return t}function N(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?R(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):R(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var I=function(e){try{"undefined"!=typeof window&&window.document&&window.localStorage.setItem("kotti-documentation-form-fields-saved-components",JSON.stringify(e))}catch(e){console.warn("could not save to localStorage")}},M=["maximumDate","minimumDate"],j=["allowMultiple","allowPhotos","collapseExtensionsAfter","extensions","externalUrl","icon","maxFileSize"],U=[{additionalProps:["currencyCurrency","numberMaximum","numberMinimum"],formKey:"currencyValue",name:"KtFieldCurrency",supports:d.a.meta.supports},{additionalProps:M,formKey:"dateValue",name:"KtFieldDate",supports:c.a.meta.supports},{additionalProps:M,formKey:"dateRangeValue",name:"KtFieldDateRange",supports:c.b.meta.supports},{additionalProps:M,formKey:"dateTimeValue",name:"KtFieldDateTime",supports:c.c.meta.supports},{additionalProps:M,formKey:"dateTimeRangeValue",name:"KtFieldDateTimeRange",supports:c.d.meta.supports},{additionalProps:[].concat(j),formKey:"fileUploadValue",name:"KtFieldFileUpload",supports:m.a.meta.supports},{additionalProps:[].concat(j,["actions","payload"]),formKey:"fileUploadRemoteValue",name:"KtFieldFileUploadRemote",supports:m.b.meta.supports},{additionalProps:["actions","clearOnSelect","collapseTagsAfter","hasOptionSlot","isUnsorted","maximumSelectable"],formKey:"multiSelectValue",name:"KtFieldMultiSelect",supports:v.a.meta.supports},{additionalProps:["actions","clearOnSelect","collapseTagsAfter","hasOptionSlot","isLoadingOptions","isUnsorted","maximumSelectable","query"],formKey:"multiSelectValue",name:"KtFieldMultiSelectRemote",supports:v.b.meta.supports},{additionalProps:["numberDecimalPlaces","numberHideChangeButtons","numberHideMaximum","numberMaximum","numberMinimum","numberStep"],formKey:"numberValue",name:"KtFieldNumber",supports:f.a.meta.supports},{additionalProps:["autoComplete"],formKey:"textValue",name:"KtFieldPassword",supports:S.a.meta.supports},{additionalProps:["contentSlot","headerSlot","isInline","showHeaderSideSlot"],formKey:"singleSelectValue",name:"KtFieldRadioGroup",supports:_.a.meta.supports},{additionalProps:["actions","hasOptionSlot","isUnsorted"],formKey:"singleSelectValue",name:"KtFieldSingleSelect",supports:v.c.meta.supports},{additionalProps:["actions","hasOptionSlot","isLoadingOptions","isUnsorted","query"],formKey:"singleSelectValue",name:"KtFieldSingleSelectRemote",supports:v.d.meta.supports},{additionalProps:[],formKey:"textValue",name:"KtFieldText",supports:O.a.meta.supports},{additionalProps:[],formKey:"textValue",name:"KtFieldTextArea",supports:h.a.meta.supports},{additionalProps:["defaultSlot","toggleType"],formKey:"toggleValue",name:"KtFieldToggle",supports:P.a.meta.supports},{additionalProps:["contentSlot","headerSlot","isInline","showHeaderSideSlot","toggleType"],formKey:"toggleGroupValue",name:"KtFieldToggleGroup",supports:P.b.meta.supports}],A={currencyValue:null,dateRangeValue:[null,null],dateTimeRangeValue:[null,null],dateTimeValue:null,dateValue:null,fileUploadValue:[],fileUploadRemoteValue:[],multiSelectValue:[],numberValue:null,singleSelectValue:null,textValue:null,toggleGroupValue:{initiallyFalse:!1,initiallyNull:null,initiallyTrue:!0},toggleValue:null},L=function(e){return function(){return"empty"===e?{type:"empty"}:{text:"Some Validation Text",type:e}}},H=[{dataTest:"data-test-key-1",label:"Key 1",value:"value1"},{dataTest:"data-test-key-2",label:"Key 2",value:"value2",tooltip:"Some tooltip"},{isDisabled:!0,label:"Key 3",tooltip:"This option is disabled",value:"value3"},{label:"Key 4 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",value:"value4",tooltip:"This option has a long label"}],k=[{label:"Key 2",value:"value2"},{label:"Key 1",value:"value1"},{isDisabled:!0,label:"Key 3",value:"value3"},{label:"Key 7",value:"value7"},{label:"Key 4",value:"value4"},{label:"Key 9",value:"value9"},{label:"Key 6",value:"value6"},{label:"Key 8",value:"value8"},{label:"Key 5",value:"value5"}],V=[{dataTest:"data-test-initially-false",key:"initiallyFalse",label:"Initially False"},{dataTest:"data-test-initially-null",key:"initiallyNull",label:"Initially Null",tooltip:"null is for uninitialized data"},{key:"initiallyTrue",label:"Initially True"},{isDisabled:!0,key:"disabled",tooltip:"A tooltip!",label:"Disabled"},{key:"hasLongLabel",tooltip:"A tooltip!",label:"Long Label: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."}],z=Object(D.defineComponent)({name:"DocumentationPageUsageComponentsFormFields",components:{ComponentInfo:w.a},setup:function(){var component,e=Object(D.ref)(A),t=Object(T.a)(),l=(component=t.value.currentRoute.query.component,Object(F.isComponentName)(component)?component:null),r=Object(D.ref)(null),E=Object(D.ref)({additionalProps:{allowMultiple:!1,allowPhotos:!1,autoComplete:"current-password",clearOnSelect:!1,collapseExtensionsAfter:null,collapseTagsAfter:null,contentSlot:null,currencyCurrency:"USD",defaultSlot:"Default Slot",extensions:[],externalUrl:null,hasActions:!1,hasOptionSlot:!1,headerSlot:null,hideChangeButtons:!1,icon:null,isInline:!1,isLoadingOptions:!1,isUnsorted:!1,maxFileSize:null,maximumDate:null,maximumSelectable:null,minimumDate:null,numberDecimalPlaces:null,numberHideChangeButtons:!1,numberHideMaximum:!1,numberMaximum:null,numberMinimum:null,numberStep:null,showHeaderSideSlot:!1,toggleType:"checkbox"},booleanFlags:{hideClear:!1,hideValidation:!1,isDisabled:!1,isLoading:!1,isOptional:!0},component:null!=l?l:"KtFieldText",dataTest:null,decimalSeparator:x.a.DecimalSeparator.DOT,hasHelpTextSlot:!1,helpDescription:null,helpText:null,formId:null,label:"Label",leftIcon:null,locale:"en-US",placeholder:null,placeholder2:null,prefix:null,rightIcon:null,size:x.a.Field.Size.MEDIUM,suffix:null,tabIndex:null,validation:"empty"}),w=Object(D.computed)((function(){var e=U.find((function(e){return e.name===E.value.component}));if(!e)throw new Error("Invalid Component Name");return e})),R=Object(D.computed)((function(){return E.value.component.includes("Range")})),M=Object(D.computed)((function(){var component=E.value.component,e={dataTest:E.value.dataTest,formKey:w.value.formKey,helpDescription:E.value.helpDescription,helpText:E.value.helpText,hideValidation:E.value.booleanFlags.hideValidation,isDisabled:E.value.booleanFlags.isDisabled,isLoading:E.value.booleanFlags.isLoading,isOptional:E.value.booleanFlags.isOptional,label:E.value.label,size:E.value.size},t={};if(w.value.supports.clear&&Object.assign(t,{hideClear:E.value.booleanFlags.hideClear}),w.value.supports.decoration&&Object.assign(t,{leftIcon:E.value.leftIcon,prefix:E.value.prefix,rightIcon:E.value.rightIcon,suffix:E.value.suffix}),w.value.supports.placeholder&&(R.value?null===E.value.placeholder&&null===E.value.placeholder2||Object.assign(t,{placeholder:[E.value.placeholder,E.value.placeholder2]}):Object.assign(t,{placeholder:E.value.placeholder})),w.value.supports.tabIndex&&Object.assign(t,{tabIndex:E.value.tabIndex}),w.value.additionalProps.includes("toggleType")&&"checkbox"!==E.value.additionalProps.toggleType&&Object.assign(t,{type:E.value.additionalProps.toggleType}),w.value.additionalProps.includes("autoComplete")&&Object.assign(t,{autoComplete:E.value.additionalProps.autoComplete}),w.value.additionalProps.includes("numberDecimalPlaces")&&null!==E.value.additionalProps.numberDecimalPlaces&&Object.assign(t,{decimalPlaces:E.value.additionalProps.numberDecimalPlaces}),w.value.additionalProps.includes("currencyCurrency")&&Object.assign(t,{currency:E.value.additionalProps.currencyCurrency}),w.value.additionalProps.includes("numberHideChangeButtons")&&Object.assign(t,{hideChangeButtons:E.value.additionalProps.numberHideChangeButtons}),w.value.additionalProps.includes("numberHideMaximum")&&Object.assign(t,{hideMaximum:E.value.additionalProps.numberHideMaximum}),w.value.additionalProps.includes("numberMaximum")&&Object.assign(t,{maximum:E.value.additionalProps.numberMaximum}),w.value.additionalProps.includes("numberMinimum")&&Object.assign(t,{minimum:E.value.additionalProps.numberMinimum}),w.value.additionalProps.includes("numberStep")&&null!==E.value.additionalProps.numberStep&&Object.assign(t,{step:E.value.additionalProps.numberStep}),w.value.additionalProps.includes("isInline")&&Object.assign(t,{isInline:E.value.additionalProps.isInline}),w.value.additionalProps.includes("isLoadingOptions")&&Object.assign(t,{isLoadingOptions:E.value.additionalProps.isLoadingOptions}),w.value.additionalProps.includes("isUnsorted")&&Object.assign(t,{isUnsorted:E.value.additionalProps.isUnsorted}),w.value.additionalProps.includes("maximumDate")&&Object.assign(t,{maximumDate:E.value.additionalProps.maximumDate}),w.value.additionalProps.includes("maximumSelectable")&&null!==E.value.additionalProps.maximumSelectable&&Object.assign(t,{maximumSelectable:E.value.additionalProps.maximumSelectable}),w.value.additionalProps.includes("minimumDate")&&Object.assign(t,{minimumDate:E.value.additionalProps.minimumDate}),w.value.additionalProps.includes("collapseTagsAfter")&&null!==E.value.additionalProps.collapseTagsAfter&&Object.assign(t,{collapseTagsAfter:E.value.additionalProps.collapseTagsAfter}),w.value.additionalProps.includes("clearOnSelect")&&Object.assign(t,{clearOnSelect:E.value.additionalProps.clearOnSelect}),w.value.additionalProps.includes("allowMultiple")&&Object.assign(t,{allowMultiple:E.value.additionalProps.allowMultiple}),w.value.additionalProps.includes("allowPhotos")&&Object.assign(t,{allowPhotos:E.value.additionalProps.allowPhotos}),w.value.additionalProps.includes("collapseExtensionsAfter")&&null!==E.value.additionalProps.collapseExtensionsAfter&&Object.assign(t,{collapseExtensionsAfter:E.value.additionalProps.collapseExtensionsAfter}),w.value.additionalProps.includes("extensions")&&Object.assign(t,{extensions:E.value.additionalProps.extensions}),w.value.additionalProps.includes("externalUrl")&&Object.assign(t,{externalUrl:E.value.additionalProps.externalUrl}),w.value.additionalProps.includes("icon")&&null!==E.value.additionalProps.icon&&Object.assign(t,{icon:E.value.additionalProps.icon}),w.value.additionalProps.includes("maxFileSize")&&null!==E.value.additionalProps.maxFileSize&&Object.assign(t,{maxFileSize:E.value.additionalProps.maxFileSize}),["KtFieldFileUploadRemote"].includes(component)&&Object.assign(t,Object(F.createRemoteUpload)(!0)),["KtFieldMultiSelect","KtFieldMultiSelectRemote","KtFieldSingleSelect","KtFieldSingleSelectRemote"].includes(component)){var l=(["KtFieldMultiSelectRemote","KtFieldSingleSelectRemote"].includes(component)?k.filter((function(option){var e;return option.label.toLowerCase().includes((null!==(e=r.value)&&void 0!==e?e:"").toLowerCase())})):k).map((function(option,e){return N(N({},option),{},{dataTest:e%2==0?"".concat(String(option.value)):void 0})}));Object.assign(t,{options:l})}return G.value&&Object.assign(t,{actions:Object(F.createActions)(!0)}),["KtFieldMultiSelectRemote","KtFieldSingleSelectRemote"].includes(component)&&Object.assign(t,{query:r.value}),["KtFieldRadioGroup"].includes(component)&&Object.assign(t,{contentSlot:null,headerSlot:null,options:H,showHeaderSideSlot:!1}),["KtFieldToggle"].includes(component)&&Object.assign(t,{defaultSlot:"Default Slot"}),["KtFieldToggleGroup"].includes(component)&&Object.assign(t,{contentSlot:null,headerSlot:null,options:V}),N(N({},e),t)})),j=Object(D.ref)(function(){try{if("undefined"!=typeof window&&window.document){var e=window.localStorage.getItem("kotti-documentation-form-fields-saved-components");if(e)return JSON.parse(e)}}catch(e){console.warn("could not read localStorage")}return[]}()),z=Object(D.computed)((function(){return["KtFieldMultiSelect","KtFieldMultiSelectRemote","KtFieldSingleSelect","KtFieldSingleSelectRemote"].includes(E.value.component)})),G=Object(D.computed)((function(){return z.value&&E.value.additionalProps.hasActions})),J=Object(D.computed)((function(){return{contentSlot:E.value.additionalProps.contentSlot,defaultSlot:E.value.additionalProps.defaultSlot,hasActions:G.value,hasHelpTextSlot:E.value.hasHelpTextSlot,hasRemoteUpload:"KtFieldFileUploadRemote"===E.value.component,hasOptionSlot:E.value.additionalProps.hasOptionSlot,headerSlot:E.value.additionalProps.headerSlot,name:E.value.component,props:C()(M.value),showHeaderSideSlot:E.value.additionalProps.showHeaderSideSlot,validation:E.value.validation}})),Y=Object(D.computed)((function(){return N(N({},J.value),{},{code:Object(F.generateComponentCode)(J.value),validator:L(J.value.validation)})}));return{component:Object(D.computed)((function(){return{KtFieldCurrency:d.a,KtFieldDate:c.a,KtFieldDateRange:c.b,KtFieldDateTime:c.c,KtFieldDateTimeRange:c.d,KtFieldFileUpload:m.a,KtFieldFileUploadRemote:m.b,KtFieldNumber:f.a,KtFieldMultiSelect:v.a,KtFieldMultiSelectRemote:v.b,KtFieldPassword:S.a,KtFieldRadioGroup:_.a,KtFieldSingleSelect:v.c,KtFieldSingleSelectRemote:v.d,KtFieldText:O.a,KtFieldTextArea:h.a,KtFieldToggle:P.a,KtFieldToggleGroup:P.b}[J.value.name]})),componentDefinition:w,componentHasActionsToggle:z,componentOptions:U.map((function(component){return{label:component.name,value:component.name}})),componentProps:M,componentRepresentation:Y,decimalSeparatorOptions:Object.entries(x.a.DecimalSeparator).map((function(e){var t=Object(n.a)(e,2),l=t[0],o=t[1];return{label:"Kotti.DecimalSeparator.".concat(l),value:o}})),isRangeComponent:R,onSubmit:function(e){return window.alert("@submit: ".concat(JSON.stringify(e,null,"\t")))},reset:function(){e.value=A},savedFieldsMap:Object(D.computed)((function(){return j.value.map((function(component){return N(N({},component),{},{code:Object(F.generateComponentCode)(component),validator:L(component.validation)})}))})),savedFieldsAdd:function(){j.value=[].concat(Object(o.a)(j.value),[C()(J.value)]),I(j.value)},savedFieldsRemove:function(e){j.value=j.value.filter((function(t,l){return l!==e})),I(j.value)},settings:E,updateComponent:function(component){t.value.replace({query:{component:component}}),E.value=N(N({},E.value),{},{component:component})},updateQuery:function(e){r.value=e,E.value.additionalProps=N(N({},E.value.additionalProps),{},{isLoadingOptions:!0}),setTimeout((function(){E.value.additionalProps=N(N({},E.value.additionalProps),{},{isLoadingOptions:!1})}),K.TimeConversion.MILLISECONDS_PER_SECOND)},values:e,yocoIconOptions:Object.values(y.Yoco.Icon).map((function(e){return{label:e,value:e}}))}}}),G=(l(961),l(65)),J=Object(G.a)(z,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),l("KtI18nContext",{attrs:{currencyMap:{USD:{symbol:"$",decimalPlaces:2},EUR:{symbol:"€",decimalPlaces:2}},locale:e.settings.locale,numberFormat:{decimalSeparator:e.settings.decimalSeparator}}},[l("div",{staticClass:"overview"},[l("div",{staticClass:"overview__component"},[l("h4",[e._v("Component")]),e._v(" "),l("KtForm",{attrs:{formId:e.settings.formId||void 0},on:{submit:e.onSubmit},model:{value:e.values,callback:function(t){e.values=t},expression:"values"}},[l(e.componentRepresentation.name,e._b({tag:"component",attrs:{validator:e.componentRepresentation.validator},on:{"update:query":e.updateQuery},scopedSlots:e._u([e.componentRepresentation.hasHelpTextSlot?{key:"helpText",fn:function(){return[l("div",[e._v("\n\t\t\t\t\t\t\t\tSupports\n\t\t\t\t\t\t\t\t"),l("abbr",{attrs:{title:"Hypertext Markup Language"}},[e._v("HTML")]),e._v(" via\n\t\t\t\t\t\t\t\t"),l("code",[e._v("<template #helpText>")])])]},proxy:!0}:null,e.componentRepresentation.hasOptionSlot?{key:"option",fn:function(t){var option=t.option;return[l("div",{staticStyle:{display:"flex",gap:"10px","align-items":"center"}},[l("KtAvatar",{attrs:{size:"sm",src:"https://picsum.photos/seed/"+option.label+"/100/100"}}),e._v("\n\t\t\t\t\t\t\t\t"+e._s(option.label)+"\n\t\t\t\t\t\t\t")],1)]}}:null],null,!0)},"component",e.componentRepresentation.props,!1),[e._v(" "),e._v(" "),null!==e.componentRepresentation.headerSlot?l("template",{slot:"header"},[l("div",{domProps:{textContent:e._s(e.settings.additionalProps.headerSlot)}})]):e._e(),e._v(" "),null!==e.componentRepresentation.contentSlot?l("template",{slot:"content"},[l("div",{domProps:{textContent:e._s(e.settings.additionalProps.contentSlot)}})]):e._e(),e._v(" "),e.componentRepresentation.showHeaderSideSlot?l("a",{attrs:{slot:"headerSide",href:"#"},domProps:{textContent:e._s("Interactive")},slot:"headerSide"}):e._e(),e._v(" "),e.componentRepresentation.defaultSlot?[l("div",{domProps:{textContent:e._s(e.componentRepresentation.defaultSlot)}})]:e._e()],2)],1),e._v(" "),l("div",{staticClass:"overview__component__value"},[l("strong",[e._v("Value")]),e._v(":\n\t\t\t\t\t"),l("span",{domProps:{textContent:e._s(JSON.stringify(e.values[e.componentProps.formKey]))}}),e._v(" "),l("a",{on:{click:function(t){return t.preventDefault(),e.reset(t)}}},[e._v("reset")])])],1),e._v(" "),l("div",{staticClass:"overview__code"},[l("h4",[e._v("Code")]),e._v(" "),l("pre",{domProps:{textContent:e._s(e.componentRepresentation.code)}}),e._v(" "),l("KtButton",{staticClass:"mt-4",attrs:{label:"Save to LocalStorage",type:"primary"},on:{click:e.savedFieldsAdd}})],1)]),e._v(" "),l("KtForm",{attrs:{size:"small"},model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[l("div",{staticClass:"wrapper"},[l("div",[l("h4",[e._v("Settings")]),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"NONE",hideClear:"",label:"Component",options:e.componentOptions,value:e.settings.component},on:{input:e.updateComponent}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"decimalSeparator",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Decimal Separator",leftIcon:"csv",options:e.decimalSeparatorOptions}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}]}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"size",hideClear:"",isOptional:"",label:"Size",options:[{label:"Small",value:"small"},{label:"Medium (Default)",value:"medium"},{label:"Large",value:"large"}]}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"formId",isOptional:"",label:"Form ID"}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"validation",isOptional:"",label:"Validation State",options:[{label:"Empty (Default)",value:"empty"},{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}]}},[l("div",{attrs:{slot:"helpText"},slot:"helpText"},[e._v("\n\t\t\t\t\t\t\tPassed as a validation function:\n\t\t\t\t\t\t\t"),l("code",[e._v("() => ({ type: 'error', message: '' })")]),e._v("\n\t\t\t\t\t\t\tor via\n\t\t\t\t\t\t\t"),l("code",[e._v("KtForm.validators")])])]),e._v(" "),l("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{isDisabled:!e.componentDefinition.supports.clear,key:"hideClear",label:"hideClear",tooltip:"Support Varies"},{key:"hideValidation",label:"hideValidation"},{key:"isDisabled",label:"isDisabled"},{key:"isLoading",label:"isLoading"},{key:"isOptional",label:"isOptional"}],type:"switch"}}),e._v(" "),e.componentDefinition.supports.tabIndex?l("KtFieldNumber",{attrs:{formKey:"tabIndex",helpText:"Support varies",isOptional:"",label:"tabIndex"}}):e._e()],1),e._v(" "),l("div",[l("h4",[e._v("Texts")]),e._v(" "),l("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}}),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldText",{attrs:{formKey:"helpText",helpText:e.settings.hasHelpTextSlot?"Not supported when using a #helpText slot":null,isDisabled:e.settings.hasHelpTextSlot,isOptional:"",label:"helpText"}}),e._v(" "),l("KtFieldToggle",{attrs:{formKey:"hasHelpTextSlot",isOptional:"",label:"Use #helpText Slot",type:"switch"}})],1),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldText",{attrs:{formKey:"placeholder",helpText:"Support Varies",isDisabled:!e.componentDefinition.supports.placeholder,isOptional:"",label:"placeholder"}}),e._v(" "),e.isRangeComponent?l("KtFieldText",{attrs:{formKey:"placeholder2",helpText:"On range components, placeholder is an array of two strings",isDisabled:!e.componentDefinition.supports.placeholder,isOptional:"",label:"placeholder2"}}):e._e()],1),e._v(" "),l("h4",[e._v("Decoration")]),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldText",{attrs:{formKey:"prefix",helpText:"Support Varies",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"prefix"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"suffix",helpText:"Support Varies",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"suffix"}})],1),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldSingleSelect",{attrs:{formKey:"leftIcon",helpText:"Support Varies",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"leftIcon",options:e.yocoIconOptions},scopedSlots:e._u([{key:"option",fn:function(t){var option=t.option;return[l("i",{staticClass:"yoco",staticStyle:{"margin-right":"10px","font-size":"24px"},domProps:{textContent:e._s(option.value)}}),e._v(" "),l("span",{domProps:{textContent:e._s(option.label)}})]}}])}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"rightIcon",helpText:"Support Varies",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"rightIcon",options:e.yocoIconOptions},scopedSlots:e._u([{key:"option",fn:function(t){var option=t.option;return[l("i",{staticClass:"yoco",staticStyle:{"margin-right":"10px","font-size":"24px"},domProps:{textContent:e._s(option.value)}}),e._v(" "),l("span",{domProps:{textContent:e._s(option.label)}})]}}])})],1),e._v(" "),e.componentDefinition.additionalProps.length>0?l("KtFormControllerObject",{attrs:{formKey:"additionalProps"}},[l("h4",[e._v("Additional Props")]),e._v(" "),e.componentHasActionsToggle?l("KtFieldToggle",{attrs:{formKey:"hasActions",helpText:"List of actions that can be triggered from the end of the dropdown",isOptional:"",label:"actions",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("autoComplete")?l("KtFieldSingleSelect",{attrs:{formKey:"autoComplete",label:"autoComplete",options:[{label:"current-password",value:"current-password"},{label:"new-password",value:"new-password"}]}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("collapseTagsAfter")?l("KtFieldNumber",{attrs:{formKey:"collapseTagsAfter",isOptional:"",label:"collapseTagsAfter",minimum:0}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("toggleType")?l("KtFieldSingleSelect",{attrs:{formKey:"toggleType",isOptional:"",label:"type",options:[{label:"checkbox (Default)",value:"checkbox"},{label:"switch",value:"switch"}]}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("numberMaximum")?l("div",{staticClass:"field-row"},[l("KtFieldNumber",{attrs:{formKey:"numberMaximum",isOptional:"",label:"maximum"}}),e._v(" "),l("KtFieldNumber",{attrs:{formKey:"numberMinimum",isOptional:"",label:"minimum"}})],1):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("numberHideMaximum")?l("div",{staticClass:"field-row"},[l("KtFieldToggle",{attrs:{formKey:"numberHideMaximum",isOptional:"",label:"hideMaximum",type:"switch"}}),e._v(" "),l("KtFieldNumber",{attrs:{formKey:"numberStep",isOptional:"",label:"step"}})],1):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("numberHideChangeButtons")?l("div",{staticClass:"field-row"},[l("KtFieldToggle",{attrs:{formKey:"numberHideChangeButtons",isOptional:"",label:"hideChangeButtons",type:"switch"}}),e._v(" "),l("KtFieldNumber",{attrs:{formKey:"numberDecimalPlaces",isOptional:"",label:"decimalPlaces",minimum:0}})],1):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("currencyCurrency")?l("KtFieldSingleSelect",{attrs:{formKey:"currencyCurrency",helpText:'Available Currencies can be defined via <KtI18nContext :currencyMap="..."/>',label:"currency",options:[{label:"EUR",value:"EUR"},{label:"USD",value:"USD"}]}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("isInline")?l("KtFieldToggle",{attrs:{formKey:"isInline",isOptional:"",label:"isInline",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("isLoadingOptions")?l("KtFieldToggle",{attrs:{formKey:"isLoadingOptions",isOptional:"",label:"isLoadingOptions",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("isUnsorted")?l("KtFieldToggle",{attrs:{formKey:"isUnsorted",isOptional:"",label:"isUnsorted",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("maximumDate")?l("KtFieldDate",{attrs:{formKey:"maximumDate",isOptional:"",label:"maximumDate"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("maximumSelectable")?l("KtFieldNumber",{attrs:{formKey:"maximumSelectable",helpText:"Limits the amount of choices a user can select at the same time.",isOptional:"",label:"maximumSelectable"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("minimumDate")?l("KtFieldDate",{attrs:{formKey:"minimumDate",isOptional:"",label:"minimumDate"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("hasOptionSlot")?l("KtFieldToggle",{attrs:{formKey:"hasOptionSlot",isOptional:"",label:"option slot",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("clearOnSelect")?l("KtFieldToggle",{attrs:{formKey:"clearOnSelect",isOptional:"",label:"clearOnSelect",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("allowMultiple")?l("KtFieldToggle",{attrs:{formKey:"allowMultiple",helpText:"Allows selecting more than one file",isOptional:"",label:"allowMultiple",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("allowPhotos")?l("KtFieldToggle",{attrs:{formKey:"allowPhotos",helpText:"Allows taking photos with the device's camera. Photos are saved with .png extension.",isOptional:"",label:"allowPhotos",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("collapseExtensionsAfter")?l("KtFieldNumber",{attrs:{formKey:"collapseExtensionsAfter",helpText:"The maximum number of extensions to display in the Drop Area text",isOptional:"",label:"collapseExtensionsAfter",minimum:0,size:"small",step:1}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("extensions")?l("KtFieldMultiSelect",{attrs:{formKey:"extensions",helpText:"List of allowed file extensions. Takes an array of case-insensitive strings.",isOptional:"",label:"extensions",options:[{label:"DOC",value:"DOC"},{label:"GIF",value:"GIF"},{label:"JP2",value:"JP2"},{label:"JPEG",value:"JPEG"},{label:"JPG",value:"JPG"},{label:"OBJ",value:"OBJ"},{label:"PDF",value:"PDF"},{label:"PNG",value:"PNG"},{label:"STL",value:"STL"},{label:"TXT",value:"TXT"}]}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("externalUrl")?l("KtFieldText",{attrs:{formKey:"externalUrl",helpText:"URL for external documentation",isOptional:"",label:"externalUrl",size:"small"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("icon")?l("KtFieldSingleSelect",{attrs:{formKey:"icon",helpText:"The icon that appears inside the Drop Area",isOptional:"",label:"icon",options:e.yocoIconOptions},scopedSlots:e._u([{key:"option",fn:function(t){var option=t.option;return[l("i",{staticClass:"yoco",staticStyle:{"margin-right":"10px","font-size":"24px"},domProps:{textContent:e._s(option.value)}}),e._v(" "),l("span",{domProps:{textContent:e._s(option.label)}})]}}],null,!1,139900889)}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("maxFileSize")?l("KtFieldNumber",{attrs:{decimalPlaces:0,formKey:"maxFileSize",helpText:"The maximum file size allowed in bytes (in decimal base)",isOptional:"",label:"maxFileSize",minimum:1,step:1}}):e._e(),e._v(" "),l("h4",[e._v("Additional Slots")]),e._v(" "),e.componentDefinition.additionalProps.includes("defaultSlot")?l("KtFieldText",{attrs:{formKey:"defaultSlot",isOptional:"",label:"Slot for the label in a toggle",size:"small"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("contentSlot")?l("KtFieldText",{attrs:{formKey:"contentSlot",isOptional:"",label:"Slot for the sub-text of a radio/toggle group option",size:"small"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("headerSlot")?l("KtFieldText",{attrs:{formKey:"headerSlot",isOptional:"",label:"Slot for the header of a radio/toggle group option",size:"small"},scopedSlots:e._u([{key:"helpText",fn:function(){return[e._v("\n\t\t\t\t\t\t\t\tThe content in here will be put into the radio/toggle option's\n\t\t\t\t\t\t\t\t"),l("code",[e._v("label")]),e._v(" block.\n\t\t\t\t\t\t\t")]},proxy:!0}],null,!1,3255970571)}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("showHeaderSideSlot")?l("KtFieldToggle",{attrs:{formKey:"showHeaderSideSlot",isOptional:"",type:"switch"},scopedSlots:e._u([{key:"default",fn:function(){return[e._v("\n\t\t\t\t\t\t\t\tShow header-side slot of a radio/toggle group option\n\t\t\t\t\t\t\t")]},proxy:!0},{key:"helpText",fn:function(){return[e._v("\n\t\t\t\t\t\t\t\tThe content in here will be put outside the radio/toggle\n\t\t\t\t\t\t\t\toption's\n\t\t\t\t\t\t\t\t"),l("code",[e._v("label")]),e._v(" block. and can therefore contain\n\t\t\t\t\t\t\t\tinteractive elements like buttons or links\n\t\t\t\t\t\t\t")]},proxy:!0}],null,!1,3102755905)}):e._e()],1):e._e()],1)])]),e._v(" "),e.savedFieldsMap.length>0?l("KtForm",{model:{value:e.values,callback:function(t){e.values=t},expression:"values"}},[l("h3",[e._v("Saved Fields")]),e._v(" "),e._l(e.savedFieldsMap,(function(t,o){return l("div",{key:o,staticClass:"overview"},[l("div",{staticClass:"overview__component"},[l(t.name,e._b({tag:"component",attrs:{actions:t.actions,validator:t.validator}},"component",t.props,!1),[null!==t.headerSlot?l("div",{attrs:{slot:"header"},domProps:{textContent:e._s(t.headerSlot)},slot:"header"}):e._e(),e._v(" "),t.hasHelpTextSlot?l("div",{attrs:{slot:"helpText"},slot:"helpText"},[l("div",[e._v("\n\t\t\t\t\t\t\t\tSupports\n\t\t\t\t\t\t\t\t"),l("abbr",{attrs:{title:"Hypertext Markup Language"}},[e._v("HTML")]),e._v(" via\n\t\t\t\t\t\t\t\t"),l("code",[e._v("<template v-slot:helpText>")])])]):e._e(),e._v(" "),null!==t.contentSlot?l("div",{attrs:{slot:"content"},domProps:{textContent:e._s(t.contentSlot)},slot:"content"}):e._e(),e._v(" "),l("div",{attrs:{slot:"default"},slot:"default"},[l("div",[e._v("Default Slot")])])]),e._v(" "),l("KtButton",{attrs:{label:"Remove",type:"danger"},on:{click:function(t){return e.savedFieldsRemove(o)}}})],1),e._v(" "),l("div",{staticClass:"overview__code"},[l("pre",{domProps:{textContent:e._s(t.code)}})])])}))],2):e._e()],1)],1)}),[],!1,null,"0c16f4f4",null);t.default=J.exports},734:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Ki=Math.pow(1024,1)]="Ki",e[e.Mi=Math.pow(1024,2)]="Mi",e[e.Gi=Math.pow(1024,3)]="Gi",e[e.Ti=Math.pow(1024,4)]="Ti",e[e.Pi=Math.pow(1024,5)]="Pi",e[e.Ei=Math.pow(1024,6)]="Ei",e[e.Zi=Math.pow(1024,7)]="Zi",e[e.Yi=Math.pow(1024,8)]="Yi"}(t.BinaryPrefixes||(t.BinaryPrefixes={})),function(e){e[e.DAYS_PER_WEEK=7]="DAYS_PER_WEEK",e[e.HOURS_PER_DAY=24]="HOURS_PER_DAY",e[e.MINUTES_PER_HOUR=60]="MINUTES_PER_HOUR",e[e.SECONDS_PER_MINUTE=60]="SECONDS_PER_MINUTE",e[e.MILLISECONDS_PER_SECOND=1e3]="MILLISECONDS_PER_SECOND",e[e.MICROSECONDS_PER_MILLISECOND=1e3]="MICROSECONDS_PER_MILLISECOND",e[e.NANOSECONDS_PER_MICROSECOND=1e3]="NANOSECONDS_PER_MICROSECOND",e[e.HOURS_PER_WEEK=168]="HOURS_PER_WEEK",e[e.MINUTES_PER_WEEK=10080]="MINUTES_PER_WEEK",e[e.MINUTES_PER_DAY=1440]="MINUTES_PER_DAY",e[e.SECONDS_PER_WEEK=604800]="SECONDS_PER_WEEK",e[e.SECONDS_PER_DAY=86400]="SECONDS_PER_DAY",e[e.SECONDS_PER_HOUR=3600]="SECONDS_PER_HOUR",e[e.MILLISECONDS_PER_WEEK=6048e5]="MILLISECONDS_PER_WEEK",e[e.MILLISECONDS_PER_DAY=864e5]="MILLISECONDS_PER_DAY",e[e.MILLISECONDS_PER_HOUR=36e5]="MILLISECONDS_PER_HOUR",e[e.MILLISECONDS_PER_MINUTE=6e4]="MILLISECONDS_PER_MINUTE",e[e.MICROSECONDS_PER_WEEK=6048e8]="MICROSECONDS_PER_WEEK",e[e.MICROSECONDS_PER_DAY=864e8]="MICROSECONDS_PER_DAY",e[e.MICROSECONDS_PER_HOUR=36e8]="MICROSECONDS_PER_HOUR",e[e.MICROSECONDS_PER_MINUTE=6e7]="MICROSECONDS_PER_MINUTE",e[e.MICROSECONDS_PER_SECOND=1e6]="MICROSECONDS_PER_SECOND",e[e.NANOSECONDS_PER_WEEK=6048e11]="NANOSECONDS_PER_WEEK",e[e.NANOSECONDS_PER_DAY=864e11]="NANOSECONDS_PER_DAY",e[e.NANOSECONDS_PER_HOUR=36e11]="NANOSECONDS_PER_HOUR",e[e.NANOSECONDS_PER_MINUTE=6e10]="NANOSECONDS_PER_MINUTE",e[e.NANOSECONDS_PER_SECOND=1e9]="NANOSECONDS_PER_SECOND",e[e.NANOSECONDS_PER_MILLISECOND=1e6]="NANOSECONDS_PER_MILLISECOND"}(t.TimeConversion||(t.TimeConversion={}))},759:function(e,t,l){"use strict";l.d(t,"a",(function(){return n}));var o=l(0),n=function(){var e=Object(o.getCurrentInstance)();if(!e)throw new Error("This must be called within a setup function.");return Object(o.computed)((function(){return e.$router}))}},771:function(e,t,l){var content=l(962);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(117).default)("6f61d3f1",content,!0,{sourceMap:!1})},960:function(e,t,l){var o=l(37),n=l(730).values;o({target:"Object",stat:!0},{values:function(e){return n(e)}})},961:function(e,t,l){"use strict";var o=l(771);l.n(o).a},962:function(e,t,l){(t=l(116)(!1)).push([e.i,"pre[data-v-0c16f4f4]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-0c16f4f4]{list-style:none}h3[data-v-0c16f4f4]{border-bottom:0}.wrapper[data-v-0c16f4f4]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius)}@media(max-width:959px){.wrapper[data-v-0c16f4f4]{flex-direction:column}.wrapper[data-v-0c16f4f4]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-0c16f4f4]{flex-direction:row}.wrapper>*[data-v-0c16f4f4]{flex:1}.wrapper[data-v-0c16f4f4]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-0c16f4f4]{padding:1.5em;margin:0!important}.field-row[data-v-0c16f4f4]{display:flex}.field-row>*[data-v-0c16f4f4]{flex:1}.field-row[data-v-0c16f4f4]>:not(:first-child){margin-left:10px}.overview[data-v-0c16f4f4]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-0c16f4f4]{flex-direction:column}.overview[data-v-0c16f4f4]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-0c16f4f4]{flex-direction:row}.overview>*[data-v-0c16f4f4]{flex:1;flex-basis:0}.overview__code>pre[data-v-0c16f4f4]{max-width:400px}.overview__component>*[data-v-0c16f4f4]{margin-right:20px}}.overview__component[data-v-0c16f4f4]{display:flex;flex-direction:column;justify-content:space-between}.overview__component__value span[data-v-0c16f4f4]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-0c16f4f4]{height:150px;margin:0;overflow:scroll}",""]),e.exports=t}}]);