(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{685:function(e,t,l){var content=l(821);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(111).default)("b557ee70",content,!0,{sourceMap:!1})},819:function(e,t,l){var o=l(30),n=l(644).values;o({target:"Object",stat:!0},{values:function(e){return n(e)}})},820:function(e,t,l){"use strict";var o=l(685);l.n(o).a},821:function(e,t,l){(t=l(110)(!1)).push([e.i,"pre[data-v-ebf30be4]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-ebf30be4]{list-style:none}h3[data-v-ebf30be4]{border-bottom:0}.wrapper[data-v-ebf30be4]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:.2rem}@media(max-width:959px){.wrapper[data-v-ebf30be4]{flex-direction:column}.wrapper[data-v-ebf30be4]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-ebf30be4]{flex-direction:row}.wrapper>*[data-v-ebf30be4]{flex:1}.wrapper[data-v-ebf30be4]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-ebf30be4]{padding:1.5em;margin:0!important}.field-row[data-v-ebf30be4]{display:flex}.field-row>*[data-v-ebf30be4]{flex:1}.field-row[data-v-ebf30be4]>:not(:first-child){margin-left:10px}.overview[data-v-ebf30be4]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-ebf30be4]{flex-direction:column}.overview[data-v-ebf30be4]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-ebf30be4]{flex-direction:row}.overview>*[data-v-ebf30be4]{flex:1;flex-basis:0}.overview__code>pre[data-v-ebf30be4]{max-width:400px}.overview__component>*[data-v-ebf30be4]{margin-right:20px}}.overview__component[data-v-ebf30be4]{display:flex;flex-direction:column;justify-content:space-between}.overview__component__value span[data-v-ebf30be4]{font-family:monospace}.overview__code>pre[data-v-ebf30be4]{height:150px;margin:0;overflow:scroll}",""]),e.exports=t},855:function(e,t,l){"use strict";l.r(t);l(148),l(318),l(149),l(467),l(136),l(323),l(135),l(134),l(319),l(320),l(252),l(819),l(324),l(150);var o=l(635),n=l(151),r=l(87),d=l(167),c=l(94),m=l(228),v=l(229),f=l(168),x=l(230),y=l(127),h=l(16),K=l(0),_=l(688),O=l.n(_),F=l(663),w=l(636);function T(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(object);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,l)}return t}function S(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?T(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):T(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var D=function(e){try{"undefined"!=typeof window&&window.document&&window.localStorage.setItem("kotti-documentation-form-fields-saved-components",JSON.stringify(e))}catch(e){console.warn("could not save to localStorage")}},P=["maximumDate","minimumDate"],C=[{additionalProps:P,formKey:"dateValue",name:"KtFieldDate",supports:{clear:!0,decoration:!1,tabIndex:!1}},{additionalProps:P,formKey:"dateRangeValue",name:"KtFieldDateRange",supports:{clear:!0,decoration:!1,tabIndex:!1}},{additionalProps:P,formKey:"dateTimeValue",name:"KtFieldDateTime",supports:{clear:!0,decoration:!1,tabIndex:!1}},{additionalProps:P,formKey:"dateTimeRangeValue",name:"KtFieldDateTimeRange",supports:{clear:!0,decoration:!1,tabIndex:!1}},{additionalProps:["collapseTagsAfter","actions"],formKey:"multiSelectValue",name:"KtFieldMultiSelect",supports:{clear:!0,decoration:!0,tabIndex:!1}},{additionalProps:["hideChangeButtons","numberHideMaximum","numberMaximum","numberMinimum","step"],formKey:"numberValue",name:"KtFieldNumber",supports:{clear:!1,decoration:!0,tabIndex:!0}},{additionalProps:["autoComplete"],formKey:"textValue",name:"KtFieldPassword",supports:{clear:!0,decoration:!0,tabIndex:!0}},{additionalProps:["isInline"],formKey:"singleSelectValue",name:"KtFieldRadioGroup",supports:{clear:!1,decoration:!1,tabIndex:!0}},{additionalProps:["actions"],formKey:"singleSelectValue",name:"KtFieldSingleSelect",supports:{clear:!0,decoration:!0,tabIndex:!1}},{additionalProps:["isLoadingOptions","query"],formKey:"singleSelectValue",name:"KtFieldSingleSelectRemote",supports:{clear:!0,decoration:!0,tabIndex:!0}},{additionalProps:[],formKey:"textValue",name:"KtFieldText",supports:{clear:!0,decoration:!0,tabIndex:!0}},{additionalProps:[],formKey:"textValue",name:"KtFieldTextArea",supports:{clear:!1,decoration:!1,tabIndex:!0}},{additionalProps:["toggleType"],formKey:"toggleValue",name:"KtFieldToggle",supports:{clear:!1,decoration:!1,tabIndex:!0}},{additionalProps:["isInline","toggleType"],formKey:"toggleGroupValue",name:"KtFieldToggleGroup",supports:{clear:!1,decoration:!1,tabIndex:!0}}],j={dateRangeValue:[null,null],dateTimeRangeValue:[null,null],dateTimeValue:null,dateValue:null,multiSelectValue:[],numberValue:null,singleSelectValue:null,textValue:null,toggleGroupValue:{initiallyFalse:!1,initiallyNull:null,initiallyTrue:!0},toggleValue:null},I=function(e){return function(){return"empty"===e?{type:"empty"}:{text:"Some Validation Text",type:e}}},V=[{label:"Key 1",value:"value1"},{label:"Key 2",value:"value2",tooltip:"Some tooltip"},{isDisabled:!0,label:"Key 3",tooltip:"This option is disabled",value:"value3"},{label:"Key 4",value:"value4"}],z=[{label:"Key 1",value:"value1"},{label:"Key 2",value:"value2"},{isDisabled:!0,label:"Key 3",value:"value3"},{label:"Key 4",value:"value4"}],M=[{key:"initiallyFalse",label:"Initially False"},{key:"initiallyNull",label:"Initially Null",tooltip:"null is for uninitialized data"},{key:"initiallyTrue",label:"Initially True"},{isDisabled:!0,key:"disabled",tooltip:"A tooltip!",label:"Disabled"}],k=Object(K.defineComponent)({name:"DocumentationPageUsageComponentsFormFields",components:{ComponentInfo:w.a},setup:function(){var e=Object(K.ref)(j),t=Object(K.ref)(null),l=Object(K.ref)({additionalProps:{actions:!1,autoComplete:"current-password",collapseTagsAfter:null,hideChangeButtons:!1,isInline:!1,isLoadingOptions:!1,maximumDate:null,minimumDate:null,numberHideMaximum:!1,numberMaximum:null,numberMinimum:null,step:null,toggleType:"checkbox"},booleanFlags:{hideClear:!1,hideValidation:!1,isDisabled:!1,isLoading:!1,isOptional:!0},component:"KtFieldText",hasHelpTextSlot:!1,helpDescription:null,helpText:null,label:"Label",leftIcon:null,locale:"en-US",placeholder:null,prefix:null,rightIcon:null,size:"medium",suffix:null,validation:"empty"}),n=Object(K.computed)((function(){var e=C.find((function(e){return e.name===l.value.component}));if(!e)throw new Error("Invalid Component Name");return e})),_=Object(K.computed)((function(){var component=l.value.component,e={formKey:n.value.formKey,helpDescription:l.value.helpDescription,helpText:l.value.helpText,hideValidation:l.value.booleanFlags.hideValidation,isDisabled:l.value.booleanFlags.isDisabled,isLoading:l.value.booleanFlags.isLoading,isOptional:l.value.booleanFlags.isOptional,label:l.value.label,size:l.value.size},o={};if(n.value.supports.clear&&Object.assign(o,{hideClear:l.value.booleanFlags.hideClear}),n.value.supports.decoration&&Object.assign(o,{leftIcon:l.value.leftIcon,prefix:l.value.prefix,rightIcon:l.value.rightIcon,suffix:l.value.suffix}),n.value.additionalProps.includes("toggleType")&&"checkbox"!==l.value.additionalProps.toggleType&&Object.assign(o,{type:l.value.additionalProps.toggleType}),n.value.additionalProps.includes("autoComplete")&&Object.assign(o,{autoComplete:l.value.additionalProps.autoComplete}),n.value.additionalProps.includes("numberHideMaximum")&&Object.assign(o,{hideMaximum:l.value.additionalProps.numberHideMaximum}),n.value.additionalProps.includes("numberMaximum")&&Object.assign(o,{maximum:l.value.additionalProps.numberMaximum}),n.value.additionalProps.includes("numberMinimum")&&Object.assign(o,{minimum:l.value.additionalProps.numberMinimum}),n.value.additionalProps.includes("step")&&null!==l.value.additionalProps.step&&Object.assign(o,{step:l.value.additionalProps.step}),n.value.additionalProps.includes("isInline")&&Object.assign(o,{isInline:l.value.additionalProps.isInline}),n.value.additionalProps.includes("isLoadingOptions")&&Object.assign(o,{isLoadingOptions:l.value.additionalProps.isLoadingOptions}),n.value.additionalProps.includes("maximumDate")&&Object.assign(o,{maximumDate:l.value.additionalProps.maximumDate}),n.value.additionalProps.includes("minimumDate")&&Object.assign(o,{minimumDate:l.value.additionalProps.minimumDate}),n.value.additionalProps.includes("collapseTagsAfter")&&null!==l.value.additionalProps.collapseTagsAfter&&Object.assign(o,{collapseTagsAfter:l.value.additionalProps.collapseTagsAfter}),n.value.additionalProps.includes("hideChangeButtons")&&Object.assign(o,{hideChangeButtons:l.value.additionalProps.hideChangeButtons}),["KtFieldMultiSelect","KtFieldSingleSelect","KtFieldSingleSelectRemote"].includes(component)){var r="KtFieldSingleSelectRemote"===component?z.filter((function(option){var e;return option.label.toLowerCase().includes((null!==(e=t.value)&&void 0!==e?e:"").toLowerCase())})):z;Object.assign(o,{options:r}),l.value.additionalProps.actions&&Object.assign(o,{actions:[{label:"Create Item",onClick:function(){return alert("actions[0].onClick called")}}]})}return["KtFieldSingleSelectRemote"].includes(component)&&Object.assign(o,{query:t.value}),["KtFieldRadioGroup"].includes(component)&&Object.assign(o,{options:V}),["KtFieldToggleGroup"].includes(component)&&Object.assign(o,{options:M}),["KtFieldDate","KtFieldDateTime","KtFieldMultiSelect","KtFieldSingleSelect","KtFieldSingleSelectRemote","KtFieldText","KtFieldTextArea"].includes(component)&&Object.assign(o,{placeholder:l.value.placeholder}),S(S({},e),o)})),w=Object(K.ref)(function(){try{if("undefined"!=typeof window&&window.document){var e=window.localStorage.getItem("kotti-documentation-form-fields-saved-components");if(e)return JSON.parse(e)}}catch(e){console.warn("could not read localStorage")}return[]}()),T=Object(K.computed)((function(){return{hasHelpTextSlot:l.value.hasHelpTextSlot,name:l.value.component,props:O()(_.value),validation:l.value.validation}}));return{component:Object(K.computed)((function(){return{KtFieldDate:r.a,KtFieldDateRange:r.b,KtFieldDateTime:r.c,KtFieldDateTimeRange:r.d,KtFieldNumber:d.a,KtFieldMultiSelect:c.a,KtFieldPassword:m.a,KtFieldRadioGroup:v.a,KtFieldSingleSelect:c.b,KtFieldSingleSelectRemote:c.c,KtFieldText:f.a,KtFieldTextArea:x.a,KtFieldToggle:y.a,KtFieldToggleGroup:y.b}[T.value.name]})),componentDefinition:n,componentOptions:C.map((function(component){return{label:component.name,value:component.name}})),componentProps:_,componentRepresenation:Object(K.computed)((function(){return S(S({},T.value),{},{code:Object(F.generateComponentCode)(T.value),validator:I(T.value.validation)})})),reset:function(){e.value=j},savedFieldsMap:Object(K.computed)((function(){return w.value.map((function(component){return S(S({},component),{},{code:Object(F.generateComponentCode)(component),validator:I(component.validation)})}))})),savedFieldsAdd:function(){w.value=[].concat(Object(o.a)(w.value),[O()(T.value)]),D(w.value)},savedFieldsRemove:function(e){w.value=w.value.filter((function(t,l){return l!==e})),D(w.value)},settings:l,updateQuery:function(e){t.value=e},values:e,yocoIconOptions:Object.values(h.Yoco.Icon).map((function(e){return{label:e,value:e}}))}}}),R=(l(820),l(59)),L=Object(R.a)(k,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",[l("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),l("KtTranslationContext",{attrs:{locale:e.settings.locale}},[l("div",{staticClass:"overview"},[l("div",{staticClass:"overview__component"},[l("h4",[e._v("Component")]),e._v(" "),l("KtForm",{model:{value:e.values,callback:function(t){e.values=t},expression:"values"}},[l(e.componentRepresenation.name,e._b({tag:"component",attrs:{validator:e.componentRepresenation.validator},on:{"update:query":e.updateQuery}},"component",e.componentRepresenation.props,!1),[e.componentRepresenation.hasHelpTextSlot?l("div",{attrs:{slot:"helpText"},slot:"helpText"},[l("div",[e._v("\n\t\t\t\t\t\t\tSupports "),l("abbr",{attrs:{title:"Hypertext Markup Language"}},[e._v("HTML")]),e._v(" via "),l("code",[e._v("<template v-slot:helpText>")])])]):e._e(),e._v(" "),l("div",{attrs:{slot:"default"},slot:"default"},[e._v("\n\t\t\t\t\t\tDefault Slot\n\t\t\t\t\t")])])],1),e._v(" "),l("div",{staticClass:"overview__component__value"},[l("strong",[e._v("Value")]),e._v(": "),l("span",{domProps:{textContent:e._s(JSON.stringify(e.values[e.componentProps.formKey]))}}),e._v(" "),l("a",{on:{click:function(t){return t.preventDefault(),e.reset(t)}}},[e._v("reset")])])],1),e._v(" "),l("div",{staticClass:"overview__code"},[l("h4",[e._v("Code")]),e._v(" "),l("pre",{domProps:{textContent:e._s(e.componentRepresenation.code)}}),e._v(" "),l("button",{attrs:{type:"button"},on:{click:e.savedFieldsAdd}},[e._v("Save to LocalStorage")])])]),e._v(" "),l("KtForm",{model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[l("div",{staticClass:"wrapper"},[l("div",[l("h4",[e._v("Settings")]),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"component",hideClear:"",label:"Component",options:e.componentOptions,size:"small"}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"locale",hideClear:"",helpText:"Can be set via KtTranslationContext",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}],size:"small"}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"size",hideClear:"",isOptional:"",label:"Size",options:[{label:"Small",value:"small"},{label:"Medium (Default)",value:"medium"},{label:"Large",value:"large"}],size:"small"}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"validation",isOptional:"",label:"Validation State",options:[{label:"Empty (Default)",value:"empty"},{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}],size:"small"}},[l("div",{attrs:{slot:"helpText"},slot:"helpText"},[e._v("\n\t\t\t\t\t\tPassed as a validation function:\n\t\t\t\t\t\t"),l("code",[e._v("() => ({ type: 'error', message: '' })")]),e._v("\n\t\t\t\t\t\tor via\n\t\t\t\t\t\t"),l("code",[e._v("KtForm.validators")]),e._v("\n\t\t\t\t\t\tor via\n\t\t\t\t\t\t"),l("code",[e._v("validatorKey")])])]),e._v(" "),l("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{isDisabled:!e.componentDefinition.supports.clear,key:"hideClear",label:"hideClear",tooltip:"Support Varies"},{key:"hideValidation",label:"hideValidation"},{key:"isDisabled",label:"isDisabled"},{key:"isLoading",label:"isLoading"},{key:"isOptional",label:"isOptional"}],type:"switch",size:"small"}}),e._v(" "),e.componentDefinition.additionalProps.length>0?l("KtFormControllerObject",{attrs:{formKey:"additionalProps"}},[l("h4",[e._v("Additional Props")]),e._v(" "),e.componentDefinition.additionalProps.includes("actions")?l("KtFieldToggle",{attrs:{formKey:"actions",isOptional:"",helpText:"List of actions that can be triggered from the end of the dropdown",label:"actions",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("toggleType")?l("KtFieldSingleSelect",{attrs:{formKey:"toggleType",isOptional:"",label:"type",options:[{label:"checkbox (Default)",value:"checkbox"},{label:"switch",value:"switch"}],size:"small"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("numberMaximum")?l("div",{staticClass:"field-row"},[l("KtFieldNumber",{attrs:{formKey:"numberMaximum",isOptional:"",label:"maximum",size:"small"}}),e._v(" "),l("KtFieldNumber",{attrs:{formKey:"numberMinimum",isOptional:"",label:"minimum",size:"small"}})],1):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("numberHideMaximum")?l("div",{staticClass:"field-row"},[l("KtFieldToggle",{attrs:{formKey:"numberHideMaximum",isOptional:"",label:"hideMaximum",size:"small",type:"switch"}}),e._v(" "),l("KtFieldNumber",{attrs:{formKey:"step",minimum:0,isOptional:"",label:"step",size:"small"}})],1):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("hideChangeButtons")?l("KtFieldToggle",{attrs:{formKey:"hideChangeButtons",isOptional:"",label:"hideChangeButtons",size:"small",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("isInline")?l("KtFieldToggle",{attrs:{formKey:"isInline",isOptional:"",label:"isInline",size:"small",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("isLoadingOptions")?l("KtFieldToggle",{attrs:{formKey:"isLoadingOptions",isOptional:"",label:"isLoadingOptions",size:"small",type:"switch"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("maximumDate")?l("KtFieldDate",{attrs:{formKey:"maximumDate",isOptional:"",label:"maximumDate",size:"small"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("minimumDate")?l("KtFieldDate",{attrs:{formKey:"minimumDate",isOptional:"",label:"minimumDate",size:"small"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("collapseTagsAfter")?l("KtFieldNumber",{attrs:{formKey:"collapseTagsAfter",isOptional:"",label:"collapseTagsAfter",minimum:0,size:"small"}}):e._e(),e._v(" "),e.componentDefinition.additionalProps.includes("autoComplete")?l("KtFieldSingleSelect",{attrs:{formKey:"autoComplete",label:"autoComplete",options:[{label:"current-password",value:"current-password"},{label:"new-password",value:"new-password"}],size:"small"}}):e._e()],1):e._e()],1),e._v(" "),l("div",[l("h4",[e._v("Texts")]),e._v(" "),l("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label",size:"small"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription",size:"small"}}),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldText",{attrs:{formKey:"helpText",helpText:e.settings.hasHelpTextSlot?"Not supported when using a #helpText slot":null,isDisabled:e.settings.hasHelpTextSlot,isOptional:"",label:"helpText",size:"small"}}),e._v(" "),l("KtFieldToggle",{attrs:{type:"switch",formKey:"hasHelpTextSlot",isOptional:"",label:"Use #helpText Slot",size:"small"}})],1),e._v(" "),l("KtFieldText",{attrs:{formKey:"placeholder",isOptional:"",label:"placeholder",size:"small",helpText:"Support Varies"}}),e._v(" "),l("h4",[e._v("Decoration")]),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldText",{attrs:{formKey:"prefix",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"prefix",size:"small",helpText:"Support Varies"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"suffix",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"suffix",size:"small",helpText:"Support Varies"}})],1),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldSingleSelect",{attrs:{formKey:"leftIcon",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"leftIcon",options:e.yocoIconOptions,size:"small",helpText:"Support Varies"}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"rightIcon",isDisabled:!e.componentDefinition.supports.decoration,isOptional:"",label:"rightIcon",options:e.yocoIconOptions,size:"small",helpText:"Support Varies"}})],1)],1)]),e._v(" "),e.savedFieldsMap.length>0?l("KtForm",{model:{value:e.values,callback:function(t){e.values=t},expression:"values"}},[l("h3",[e._v("Saved Fields")]),e._v(" "),e._l(e.savedFieldsMap,(function(t,o){return l("div",{key:o,staticClass:"overview"},[l("div",{staticClass:"overview__component"},[l(t.name,e._b({tag:"component",attrs:{validator:t.validator}},"component",t.props,!1),[t.hasHelpTextSlot?l("div",{attrs:{slot:"helpText"},slot:"helpText"},[l("div",[e._v("\n\t\t\t\t\t\t\t\tSupports "),l("abbr",{attrs:{title:"Hypertext Markup Language"}},[e._v("HTML")]),e._v(" via "),l("code",[e._v("<template v-slot:helpText>")])])]):e._e(),e._v(" "),l("div",{attrs:{slot:"default"},slot:"default"},[l("div",[e._v("\n\t\t\t\t\t\t\t\tDefault Slot\n\t\t\t\t\t\t\t")])])]),e._v(" "),l("button",{attrs:{type:"button"},on:{click:function(t){return e.savedFieldsRemove(o)}}},[e._v("Remove")])],1),e._v(" "),l("div",{staticClass:"overview__code"},[l("pre",{domProps:{textContent:e._s(t.code)}})])])}))],2):e._e()],1)],1)],1)}),[],!1,null,"ebf30be4",null);t.default=L.exports}}]);