(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{1026:function(e,t,l){"use strict";l(900)},1027:function(e,t,l){var o=l(61)((function(i){return i[1]}));o.push([e.i,"pre[data-v-4388082d]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-4388082d]{list-style:none}h3[data-v-4388082d]{border-bottom:0}.wrapper[data-v-4388082d]{background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius);display:flex;flex-direction:column;margin:0 0 1.5em}@media(width < 960px){.wrapper[data-v-4388082d]{flex-direction:column}.wrapper[data-v-4388082d]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-4388082d]{flex-direction:row}.wrapper>*[data-v-4388082d]{flex:1}.wrapper[data-v-4388082d]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-4388082d]{margin:0!important;padding:1.5em}.field-row[data-v-4388082d]{display:flex}.field-row>*[data-v-4388082d]{flex:1}.field-row[data-v-4388082d]>:not(:first-child){margin-left:10px}.overview[data-v-4388082d]{display:flex;margin-bottom:20px}@media(width < 960px){.overview[data-v-4388082d]{flex-direction:column}.overview[data-v-4388082d]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-4388082d]{flex-direction:row}.overview>*[data-v-4388082d]{flex:1;flex-basis:0}.overview__code>pre[data-v-4388082d]{max-width:400px}.overview__component>*[data-v-4388082d]{margin-right:20px}}.overview__component[data-v-4388082d]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-4388082d]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-4388082d]{height:150px;margin:0;overflow:scroll}",""]),o.locals={},e.exports=o},1069:function(e,t,l){"use strict";l.r(t);var o=l(13),n=l(60),r=l.n(n),d=l(0),v=l(868),c=l(838),f="Default slot content",h=Object(d.defineComponent)({name:"DocumentationPageUsageComponentsValueLabel",components:{ComponentInfo:c.a,KtValueLabel:o.W},setup:function(){var e=Object(d.ref)({dataTest:null,hasHelpTextSlot:!1,helpDescription:null,helpText:null,isLoading:!1,isUnset:!1,label:"Label",locale:"en-US",hasDefaultSlot:!1,validation:null,value:"Value"}),t=Object(d.computed)((function(){return{dataTest:e.value.dataTest,helpDescription:e.value.helpDescription,helpText:e.value.helpText,isLoading:e.value.isLoading,isUnset:e.value.isUnset,label:e.value.label,validation:(t=e.value.validation,null!==t?{text:"Some Validation Text",type:t}:null),value:e.value.value};var t}));return{component:o.W,componentCode:Object(d.computed)((function(){return Object(v.c)({contentSlot:null,defaultSlot:e.value.hasDefaultSlot?f:null,hasActions:!1,hasHelpTextSlot:e.value.hasHelpTextSlot,hasOptionSlot:!1,hasRemoteUpload:!1,headerSlot:null,name:"KtValueLabel",props:r()(t.value),showHeaderSideSlot:!1,validation:"empty"})})),componentProps:t,DEFAULT_SLOT_CONTENT:f,Kotti:o.a,settings:e}}}),m=(l(1026),l(32)),component=Object(m.a)(h,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),t("KtI18nContext",{attrs:{locale:e.settings.locale}},[t("div",{staticClass:"overview"},[t("div",{staticClass:"overview__component"},[t("h4",[e._v("Component")]),e._v(" "),t("KtValueLabel",e._b({scopedSlots:e._u([e.settings.hasHelpTextSlot?{key:"helpText",fn:function(){return[t("div",[e._v("\n\t\t\t\t\t\t\tSupports\n\t\t\t\t\t\t\t"),t("abbr",{attrs:{title:"Hypertext Markup Language"}},[e._v("HTML")]),e._v(" via\n\t\t\t\t\t\t\t"),t("code",[e._v("<template #helpText>")])])]},proxy:!0}:null],null,!0)},"KtValueLabel",e.componentProps,!1),[e.settings.hasDefaultSlot?t("div",{domProps:{textContent:e._s(e.DEFAULT_SLOT_CONTENT)}}):e._e()])],1),e._v(" "),t("div",{staticClass:"overview__code"},[t("h4",[e._v("Code")]),e._v(" "),t("pre",{domProps:{textContent:e._s(e.componentCode)}})])]),e._v(" "),t("KtForm",{model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[t("div",{staticClass:"wrapper"},[t("div",[t("h4",[e._v("Texts")]),e._v(" "),t("KtFieldText",{attrs:{formKey:"label",isOptional:"",label:"label"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"value",isOptional:"",label:"value"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"helpDescription",isOptional:"",label:"helpDescription"}}),e._v(" "),t("div",{staticClass:"field-row"},[t("KtFieldText",{attrs:{formKey:"helpText",helpText:e.settings.hasHelpTextSlot?"Not supported when using a #helpText slot":null,isDisabled:e.settings.hasHelpTextSlot,isOptional:"",label:"helpText"}}),e._v(" "),t("KtFieldToggle",{attrs:{formKey:"hasHelpTextSlot",isOptional:"",label:"Use #helpText Slot",type:"switch"}})],1),e._v(" "),t("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"validation",isOptional:"",label:"validation",options:[{label:"Success",value:"success"},{label:"Warning",value:"warning"},{label:"Error",value:"error"}]},scopedSlots:e._u([{key:"helpText",fn:function(){return[e._v("\n\t\t\t\t\t\t\tPassed as an object:\n\t\t\t\t\t\t\t"),t("code",[e._v("{ type: 'error', message: '' }")])]},proxy:!0}])})],1),e._v(" "),t("div",[t("h4",[e._v("Settings")]),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}]}}),e._v(" "),t("KtFieldToggle",{attrs:{formKey:"isLoading",isOptional:"",label:"isLoading",size:e.Kotti.Field.Size.SMALL,type:"switch"}}),e._v(" "),t("KtFieldToggle",{attrs:{formKey:"isUnset",isOptional:"",label:"isUnset",size:e.Kotti.Field.Size.SMALL,type:"switch"}}),e._v(" "),t("KtFieldToggle",{attrs:{formKey:"hasDefaultSlot",isOptional:"",label:"Use #default Slot",type:"switch"}})],1)])])],1),e._v(" "),t("h2",[e._v("Usage")]),e._v(" "),e._m(0),e._v(" "),t("p",[e._v("\n\t\t- The last row of the layout where value labels are stacked should not\n\t\tcontain any extra margin → ensure a good margin is handled on the\n\t\tdifferent sections of the more general layout.\n\t")])],1)}),[function(){var e=this,t=e._self._c;e._self._setupProxy;return t("p",[e._v("\n\t\t- When stacking labels on top of each other, create a layout that ensure a\n\t\tmin margin of "),t("code",[e._v("16px")]),e._v(" ("),t("code",[e._v("unit-4")]),e._v(") between the various\n\t\tvalue labels.\n\t")])}],!1,null,"4388082d",null);t.default=component.exports},900:function(e,t,l){var content=l(1027);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(62).default)("7d20dee4",content,!0,{sourceMap:!1})}}]);