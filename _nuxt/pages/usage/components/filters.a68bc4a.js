(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{675:function(e,t,o){var content=o(808);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(106).default)("9a19e31c",content,!0,{sourceMap:!1})},807:function(e,t,o){"use strict";var n=o(675);o.n(n).a},808:function(e,t,o){(t=o(105)(!1)).push([e.i,"pre[data-v-98a71ef2]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-98a71ef2]{list-style:none}h3[data-v-98a71ef2]{border-bottom:0}.wrapper[data-v-98a71ef2]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:.2rem}@media(max-width:959px){.wrapper[data-v-98a71ef2]{flex-direction:column}.wrapper[data-v-98a71ef2]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-98a71ef2]{flex-direction:row}.wrapper>*[data-v-98a71ef2]{flex:1}.wrapper[data-v-98a71ef2]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-98a71ef2]{padding:1.5em;margin:0!important}.field-row[data-v-98a71ef2]{display:flex}.field-row>*[data-v-98a71ef2]{flex:1}.field-row[data-v-98a71ef2]>:not(:first-child){margin-left:10px}.overview[data-v-98a71ef2]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-98a71ef2]{flex-direction:column}.overview[data-v-98a71ef2]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-98a71ef2]{flex-direction:row}.overview>*[data-v-98a71ef2]{flex:1;flex-basis:0}.overview__code>pre[data-v-98a71ef2]{max-width:400px}.overview__component>*[data-v-98a71ef2]{margin-right:20px}}.overview__component[data-v-98a71ef2]{display:flex;flex-direction:column;justify-content:space-between}.overview__component__value span[data-v-98a71ef2]{font-family:monospace}.overview__code>pre[data-v-98a71ef2]{height:150px;margin:0;overflow:scroll}",""]),e.exports=t},845:function(e,t,o){"use strict";o.r(t);var n=o(242),l=o(279),r=o(0),v=o(680),c=o.n(v),d=o(655),m=o(628),f=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsFilters",components:{ComponentInfo:m.a},setup:function(){var e=Object(r.ref)([{key:"string-column",operation:n.a.Filters.Operation.String.CONTAINS,value:null},{key:"number-column",operation:n.a.Filters.Operation.Number.EQUAL,value:null}]),t=Object(r.ref)({booleanFlags:{isLoading:!1},locale:"en-US",searchPlaceholder:null}),o=Object(r.computed)((function(){return{columns:[{key:"global-search",label:"Search",placeholder:t.value.searchPlaceholder,type:n.a.Filters.FilterType.SEARCH},{key:"string-column",label:"String Column",operations:[n.a.Filters.Operation.String.CONTAINS,n.a.Filters.Operation.String.IS_EMPTY],type:n.a.Filters.FilterType.STRING},{key:"number-column",label:"Number Column",operations:[n.a.Filters.Operation.Number.EQUAL,n.a.Filters.Operation.Number.GREATER_THAN,n.a.Filters.Operation.Number.GREATER_THAN_OR_EQUAL,n.a.Filters.Operation.Number.LESS_THAN,n.a.Filters.Operation.Number.LESS_THAN_OR_EQUAL,n.a.Filters.Operation.Number.IS_EMPTY],type:n.a.Filters.FilterType.NUMBER},{key:"boolean-column",label:"Boolean Column",operations:[n.a.Filters.Operation.Boolean.EQUAL,n.a.Filters.Operation.Boolean.IS_EMPTY],type:n.a.Filters.FilterType.BOOLEAN},{key:"date-range-column",label:"Date Range Column",operations:[n.a.Filters.Operation.DateRange.IN_RANGE,n.a.Filters.Operation.DateRange.IS_EMPTY],type:n.a.Filters.FilterType.DATE_RANGE},{key:"single-enum-column",label:"Single Enum Column",operations:[n.a.Filters.Operation.SingleEnum.EQUAL,n.a.Filters.Operation.SingleEnum.IS_EMPTY],options:[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",value:"option-3"}],type:n.a.Filters.FilterType.SINGLE_ENUM},{key:"multi-enum-column",label:"Multi Enum Column",operations:[n.a.Filters.Operation.MultiEnum.ONE_OF,n.a.Filters.Operation.MultiEnum.IS_EMPTY],options:[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",value:"option-3"}],type:n.a.Filters.FilterType.MULTI_ENUM}],isLoading:t.value.booleanFlags.isLoading}})),v=Object(r.computed)((function(){var component={hasHelpTextSlot:!1,name:"KtFilters",props:c()(o.value),validation:"empty"};return Object(d.generateComponentCode)(component)}));return{component:l.a,componentCode:v,componentProps:o,filters:e,Kotti:n.a,reset:function(){return e.value=[]},settings:t}}}),_=(o(807),o(55)),F=Object(_.a)(f,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",[o("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),o("KtTranslationContext",{attrs:{locale:e.settings.locale}},[o("div",{staticClass:"overview"},[o("div",{staticClass:"overview__component"},[o("h4",[e._v("Component")]),e._v(" "),o("KtFilters",{attrs:{columns:e.componentProps.columns,isLoading:e.componentProps.isLoading},model:{value:e.filters,callback:function(t){e.filters=t},expression:"filters"}}),e._v(" "),o("div",{staticClass:"overview__component__value"},[o("strong",[e._v("Value")]),e._v(": "),o("span",{domProps:{textContent:e._s(JSON.stringify(e.filters))}}),e._v(" "),o("a",{on:{click:function(t){return t.preventDefault(),e.reset(t)}}},[e._v("reset")])])],1),e._v(" "),o("div",{staticClass:"overview__code"},[o("h4",[e._v("Code")]),e._v(" "),o("pre",{domProps:{textContent:e._s(e.componentCode)}})])]),e._v(" "),o("KtForm",{model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[o("div",{staticClass:"wrapper"},[o("div",[o("h4",[e._v("Settings")]),e._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtTranslationContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}],size:e.Kotti.Field.Size.SMALL}}),e._v(" "),o("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"isLoading",label:"isLoading"}],size:e.Kotti.Field.Size.SMALL,type:"switch"}})],1),e._v(" "),o("div",[o("h4",[e._v("Texts")]),e._v(" "),o("KtFieldText",{attrs:{formKey:"searchPlaceholder",isOptional:"",label:"placeholder",size:e.Kotti.Field.Size.SMALL}})],1)])])],1)],1)}),[],!1,null,"98a71ef2",null);t.default=F.exports}}]);