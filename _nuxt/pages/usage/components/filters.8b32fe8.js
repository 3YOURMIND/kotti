(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{765:function(e,t,l){var content=l(934);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,l(112).default)("4a0cca3c",content,!0,{sourceMap:!1})},933:function(e,t,l){"use strict";var o=l(765);l.n(o).a},934:function(e,t,l){(t=l(111)(!1)).push([e.i,"pre[data-v-962407ba]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-962407ba]{list-style:none}h3[data-v-962407ba]{border-bottom:0}.wrapper[data-v-962407ba]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius)}@media(max-width:959px){.wrapper[data-v-962407ba]{flex-direction:column}.wrapper[data-v-962407ba]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-962407ba]{flex-direction:row}.wrapper>*[data-v-962407ba]{flex:1}.wrapper[data-v-962407ba]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-962407ba]{padding:1.5em;margin:0!important}.field-row[data-v-962407ba]{display:flex}.field-row>*[data-v-962407ba]{flex:1}.field-row[data-v-962407ba]>:not(:first-child){margin-left:10px}.overview[data-v-962407ba]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-962407ba]{flex-direction:column}.overview[data-v-962407ba]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-962407ba]{flex-direction:row}.overview>*[data-v-962407ba]{flex:1;flex-basis:0}.overview__code>pre[data-v-962407ba]{max-width:400px}.overview__component>*[data-v-962407ba]{margin-right:20px}}.overview__component[data-v-962407ba]{display:flex;flex-direction:column;justify-content:space-between}.overview__component__value span[data-v-962407ba]{font-family:monospace}.overview__code>pre[data-v-962407ba]{height:150px;margin:0;overflow:scroll}",""]),e.exports=t},973:function(e,t,l){"use strict";l.r(t);var o=l(335),n=l(309),r=l(0),c=l(780),v=l.n(c),d=l(744),m=l(715),_=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsFilters",components:{ComponentInfo:m.a},setup:function(){var e=Object(r.ref)([{key:"stringColumn",operation:o.a.Filters.Operation.String.CONTAINS,value:null},{key:"integerColumn",operation:o.a.Filters.Operation.Integer.EQUAL,value:null}]),t=Object(r.ref)({booleanFlags:{isLoading:!1},currencyCurrency:"USD",locale:"en-US",numberDecimalPlaces:null,numberPrefix:null,numberStep:null,numberSuffix:null,searchPlaceholder:null}),l=Object(r.computed)((function(){var e,l,n;return{columns:[{key:"globalSearch",label:"Search",placeholder:null!==(e=t.value.searchPlaceholder)&&void 0!==e?e:void 0,type:o.a.Filters.FilterType.SEARCH},{key:"stringColumn",label:"String Column",operations:[o.a.Filters.Operation.String.CONTAINS,o.a.Filters.Operation.String.EQUAL,o.a.Filters.Operation.String.IS_EMPTY],type:o.a.Filters.FilterType.STRING},{key:"integerColumn",label:"Integer Column",operations:[o.a.Filters.Operation.Integer.EQUAL,o.a.Filters.Operation.Integer.GREATER_THAN,o.a.Filters.Operation.Integer.GREATER_THAN_OR_EQUAL,o.a.Filters.Operation.Integer.LESS_THAN,o.a.Filters.Operation.Integer.LESS_THAN_OR_EQUAL,o.a.Filters.Operation.Integer.IS_EMPTY],type:o.a.Filters.FilterType.INTEGER},{decimalPlaces:null!==(l=t.value.numberDecimalPlaces)&&void 0!==l?l:void 0,key:"floatColumn",label:"Float Column",operations:[o.a.Filters.Operation.Float.EQUAL,o.a.Filters.Operation.Float.GREATER_THAN,o.a.Filters.Operation.Float.GREATER_THAN_OR_EQUAL,o.a.Filters.Operation.Float.LESS_THAN,o.a.Filters.Operation.Float.LESS_THAN_OR_EQUAL,o.a.Filters.Operation.Float.IS_EMPTY],prefix:t.value.numberPrefix,step:null!==(n=t.value.numberStep)&&void 0!==n?n:void 0,suffix:t.value.numberSuffix,type:o.a.Filters.FilterType.FLOAT},{currency:t.value.currencyCurrency,key:"currencyColumn",label:"Currency Column",operations:[o.a.Filters.Operation.Currency.EQUAL,o.a.Filters.Operation.Currency.GREATER_THAN,o.a.Filters.Operation.Currency.GREATER_THAN_OR_EQUAL,o.a.Filters.Operation.Currency.LESS_THAN,o.a.Filters.Operation.Currency.LESS_THAN_OR_EQUAL,o.a.Filters.Operation.Currency.IS_EMPTY],type:o.a.Filters.FilterType.CURRENCY},{key:"booleanColumn",label:"Boolean Column",operations:[o.a.Filters.Operation.Boolean.EQUAL,o.a.Filters.Operation.Boolean.IS_EMPTY],type:o.a.Filters.FilterType.BOOLEAN},{key:"dateRangeColumn",label:"Date Range Column",operations:[o.a.Filters.Operation.DateRange.IN_RANGE,o.a.Filters.Operation.DateRange.IS_EMPTY],type:o.a.Filters.FilterType.DATE_RANGE},{key:"singleEnumColumn",label:"Single Enum Column",operations:[o.a.Filters.Operation.SingleEnum.EQUAL,o.a.Filters.Operation.SingleEnum.IS_EMPTY],options:[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",value:"option-3"}],type:o.a.Filters.FilterType.SINGLE_ENUM},{key:"multiEnumColumn",label:"Multi Enum Column",operations:[o.a.Filters.Operation.MultiEnum.ONE_OF,o.a.Filters.Operation.MultiEnum.IS_EMPTY],options:[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",value:"option-3"}],type:o.a.Filters.FilterType.MULTI_ENUM}],isLoading:t.value.booleanFlags.isLoading}})),c=Object(r.computed)((function(){var component={contentSlot:null,hasActions:!1,hasHelpTextSlot:!1,hasOptionSlot:!1,headerSlot:null,name:"KtFilters",props:v()(l.value),validation:"empty"};return Object(d.generateComponentCode)(component)}));return{component:n.a,componentCode:c,componentProps:l,filters:e,Kotti:o.a,reset:function(){return e.value=[]},settings:t}}}),F=(l(933),l(56)),f=Object(F.a)(_,(function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("section",[l("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),l("KtI18nContext",{attrs:{currencyMap:{EUR:{symbol:"€",decimalPlaces:2},USD:{symbol:"$",decimalPlaces:2}},locale:e.settings.locale}},[l("div",{staticClass:"overview"},[l("div",{staticClass:"overview__component"},[l("h4",[e._v("Component")]),e._v(" "),l("KtFilters",{attrs:{columns:e.componentProps.columns,dataTest:"ktFilters",isLoading:e.componentProps.isLoading},model:{value:e.filters,callback:function(t){e.filters=t},expression:"filters"}}),e._v(" "),l("div",{staticClass:"overview__component__value"},[l("strong",[e._v("Value")]),e._v(": "),l("span",{domProps:{textContent:e._s(JSON.stringify(e.filters))}}),e._v(" "),l("a",{on:{click:function(t){return t.preventDefault(),e.reset(t)}}},[e._v("reset")])])],1),e._v(" "),l("div",{staticClass:"overview__code"},[l("h4",[e._v("Code")]),e._v(" "),l("pre",{domProps:{textContent:e._s(e.componentCode)}})])]),e._v(" "),l("KtForm",{model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[l("div",{staticClass:"wrapper"},[l("div",[l("h4",[e._v("Settings")]),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}],size:e.Kotti.Field.Size.SMALL}}),e._v(" "),l("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"isLoading",label:"isLoading"}],size:e.Kotti.Field.Size.SMALL,type:"switch"}}),e._v(" "),l("h4",[e._v("Additional Props")]),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldNumber",{attrs:{formKey:"numberDecimalPlaces",helpText:"Support on FLOAT column type only",isOptional:"",label:"decimalPlaces",minimum:0}}),e._v(" "),l("KtFieldNumber",{attrs:{formKey:"numberStep",helpText:"Support on FLOAT column type only",isOptional:"",label:"step"}})],1),e._v(" "),l("KtFieldSingleSelect",{attrs:{formKey:"currencyCurrency",helpText:'Available Currencies can be defined via <KtI18nContext :currencyMap="..."/>',label:"currency",options:[{label:"EUR",value:"EUR"},{label:"USD",value:"USD"}]}})],1),e._v(" "),l("div",[l("h4",[e._v("Texts")]),e._v(" "),l("KtFieldText",{attrs:{formKey:"searchPlaceholder",isOptional:"",label:"placeholder",size:e.Kotti.Field.Size.SMALL}}),e._v(" "),l("h4",[e._v("Decoration")]),e._v(" "),l("div",{staticClass:"field-row"},[l("KtFieldText",{attrs:{formKey:"numberPrefix",helpText:"Support on FLOAT column type only",isOptional:"",label:"prefix"}}),e._v(" "),l("KtFieldText",{attrs:{formKey:"numberSuffix",helpText:"Support on FLOAT column type only",isOptional:"",label:"suffix"}})],1)],1)])])],1)],1)}),[],!1,null,"962407ba",null);t.default=f.exports}}]);