(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{1039:function(e,t,l){"use strict";l.r(t);var o=l(255),n=l(332),r=l(0),d=l(757),v=l.n(d),c=l(729),m=l(715),f=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsValueLabel",components:{ComponentInfo:m.a,KtValueLabel:o.a},setup:function(){var e=Object(r.ref)({dataTest:null,hasHelpTextSlot:!1,helpDescription:null,helpText:null,isLoading:!1,isUnset:!1,label:"Label",locale:"en-US",hasDefaultSlot:!1,validation:null,value:"Value"}),t=Object(r.computed)((function(){return{dataTest:e.value.dataTest,helpDescription:e.value.helpDescription,helpText:e.value.helpText,isLoading:e.value.isLoading,isUnset:e.value.isUnset,label:e.value.label,validation:(t=e.value.validation,null!==t?{text:"Some Validation Text",type:t}:null),value:e.value.value};var t}));return{component:o.a,componentCode:Object(r.computed)((function(){return Object(c.generateComponentCode)({contentSlot:null,defaultSlot:e.value.hasDefaultSlot?"Default slot content":null,hasActions:!1,hasHelpTextSlot:e.value.hasHelpTextSlot,hasOptionSlot:!1,hasRemoteUpload:!1,headerSlot:null,name:"KtValueLabel",props:v()(t.value),showHeaderSideSlot:!1,validation:"empty"})})),componentProps:t,DEFAULT_SLOT_CONTENT:"Default slot content",Kotti:n.a,settings:e}}}),x=(l(991),l(64)),component=Object(x.a)(f,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),l("KtI18nContext",{attrs:{locale:e.settings.locale}},[l("div",{staticClass:"overview"},[l("div",{staticClass:"overview__component"},[l("h4",[e._v("Component")]),e._v(" "),l("KtValueLabel",e._b({scopedSlots:e._u([e.settings.hasHelpTextSlot?{key:"helpText",fn:function(){return[l("div",[e._v("\n\t\t\t\t\t\t\tSupports\n\t\t\t\t\t\t\t"),l("abbr",{attrs:{title:"Hypertext Markup Language"}},[e._v("HTML")]),e._v(" via\n\t\t\t\t\t\t\t"),l("code",[e._v("<template #helpText>")])])]},proxy:!0}:null],null,!0)},"KtValueLabel",e.componentProps,!1),[e.settings.hasDefaultSlot?l("div",{domProps:{textContent:e._s(e.DEFAULT_SLOT_CONTENT)}}):e._e()])],1),e._v(" "),l("div",{staticClass:"overview__code"},[l("h4",[e._v("Code")]),e._v(" "),l("pre",{domProps:{textContent:e._s(e.componentCode)}})])]),e._v(" "),l("KtForm",{model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[l("div",{staticClass:"wrapper"},[l("div",[l("h4",[e._v("Texts")]),e._v(" "),l("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"value",isOptional:"",label:"value"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldText",{attrs:{formKey:"helpText",helpText:e.settings.hasHelpTextSlot?"Not supported when using a #helpText slot":null,isDisabled:e.settings.hasHelpTextSlot,isOptional:"",label:"helpText"}}),e._v(" "),l("KtFieldToggle",{attrs:{formKey:"hasHelpTextSlot",isOptional:"",label:"Use #helpText Slot",type:"switch"}})],1),e._v(" "),l("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}}),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"validation",isOptional:"",label:"validation",options:[{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}]}},[l("div",{attrs:{slot:"helpText"},slot:"helpText"},[e._v("\n\t\t\t\t\t\t\tPassed as an object:\n\t\t\t\t\t\t\t"),l("code",[e._v("{ type: 'error', message: '' }")])])])],1),e._v(" "),l("div",[l("h4",[e._v("Settings")]),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}]}}),e._v(" "),l("KtFieldToggle",{attrs:{formKey:"isLoading",isOptional:"",label:"isLoading",size:e.Kotti.Field.Size.SMALL,type:"switch"}}),e._v(" "),l("KtFieldToggle",{attrs:{formKey:"isUnset",isOptional:"",label:"isUnset",size:e.Kotti.Field.Size.SMALL,type:"switch"}}),e._v(" "),l("KtFieldToggle",{attrs:{formKey:"hasDefaultSlot",isOptional:"",label:"Use #default Slot",type:"switch"}})],1)])])],1)],1)}),[],!1,null,"146e91dc",null);t.default=component.exports},775:function(e,t,l){var content=l(992);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(113).default)("507974a6",content,!0,{sourceMap:!1})},991:function(e,t,l){"use strict";var o=l(775);l.n(o).a},992:function(e,t,l){(t=l(112)(!1)).push([e.i,"pre[data-v-146e91dc]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-146e91dc]{list-style:none}h3[data-v-146e91dc]{border-bottom:0}.wrapper[data-v-146e91dc]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius)}@media(max-width:959px){.wrapper[data-v-146e91dc]{flex-direction:column}.wrapper[data-v-146e91dc]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-146e91dc]{flex-direction:row}.wrapper>*[data-v-146e91dc]{flex:1}.wrapper[data-v-146e91dc]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-146e91dc]{padding:1.5em;margin:0!important}.field-row[data-v-146e91dc]{display:flex}.field-row>*[data-v-146e91dc]{flex:1}.field-row[data-v-146e91dc]>:not(:first-child){margin-left:10px}.overview[data-v-146e91dc]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-146e91dc]{flex-direction:column}.overview[data-v-146e91dc]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-146e91dc]{flex-direction:row}.overview>*[data-v-146e91dc]{flex:1;flex-basis:0}.overview__code>pre[data-v-146e91dc]{max-width:400px}.overview__component>*[data-v-146e91dc]{margin-right:20px}}.overview__component[data-v-146e91dc]{display:flex;flex-direction:column;justify-content:space-between}.overview__component__value span[data-v-146e91dc]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-146e91dc]{height:150px;margin:0;overflow:scroll}",""]),e.exports=t}}]);