(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{712:function(e,t,n){e.exports=function(){"use strict";var e="millisecond",t="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",l="date",c=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,d=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},f=function(e,t,n){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(n)+e},v={s:f,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),r=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+f(r,2,"0")+":"+f(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var r=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(r,u),s=n-i<0,a=t.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(c){return{M:u,y:o,w:s,d:i,D:l,h:r,m:n,s:t,ms:e,Q:a}[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},h="en",y={};y[h]=m;var O=function(e){return e instanceof F},S=function(e,t,n){var r;if(!e)return h;if("string"==typeof e)y[e]&&(r=e),t&&(y[e]=t,r=e);else{var i=e.name;y[i]=e,r=i}return!n&&r&&(h=r),r||!n&&h},_=function(e,t){if(O(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new F(n)},g=v;g.l=S,g.i=O,g.w=function(e,t){return _(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var F=function(){function m(e){this.$L=this.$L||S(e.locale,null,!0),this.parse(e)}var f=m.prototype;return f.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(g.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(c);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},f.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},f.$utils=function(){return g},f.isValid=function(){return!("Invalid Date"===this.$d.toString())},f.isSame=function(e,t){var n=_(e);return this.startOf(t)<=n&&n<=this.endOf(t)},f.isAfter=function(e,t){return _(e)<this.startOf(t)},f.isBefore=function(e,t){return this.endOf(t)<_(e)},f.$g=function(e,t,n){return g.u(e)?this[t]:this.set(n,e)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(e,a){var c=this,d=!!g.u(a)||a,m=g.p(e),f=function(e,t){var n=g.w(c.$u?Date.UTC(c.$y,t,e):new Date(c.$y,t,e),c);return d?n:n.endOf(i)},v=function(e,t){return g.w(c.toDate()[e].apply(c.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),c)},h=this.$W,y=this.$M,O=this.$D,S="set"+(this.$u?"UTC":"");switch(m){case o:return d?f(1,0):f(31,11);case u:return d?f(1,y):f(0,y+1);case s:var _=this.$locale().weekStart||0,F=(h<_?h+7:h)-_;return f(d?O-F:O+(6-F),y);case i:case l:return v(S+"Hours",0);case r:return v(S+"Minutes",1);case n:return v(S+"Seconds",2);case t:return v(S+"Milliseconds",3);default:return this.clone()}},f.endOf=function(e){return this.startOf(e,!1)},f.$set=function(s,a){var c,d=g.p(s),m="set"+(this.$u?"UTC":""),f=(c={},c[i]=m+"Date",c[l]=m+"Date",c[u]=m+"Month",c[o]=m+"FullYear",c[r]=m+"Hours",c[n]=m+"Minutes",c[t]=m+"Seconds",c[e]=m+"Milliseconds",c)[d],v=d===i?this.$D+(a-this.$W):a;if(d===u||d===o){var h=this.clone().set(l,1);h.$d[f](v),h.init(),this.$d=h.set(l,Math.min(this.$D,h.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},f.set=function(e,t){return this.clone().$set(e,t)},f.get=function(e){return this[g.p(e)]()},f.add=function(e,a){var l,c=this;e=Number(e);var d=g.p(a),m=function(t){var n=_(c);return g.w(n.date(n.date()+Math.round(t*e)),c)};if(d===u)return this.set(u,this.$M+e);if(d===o)return this.set(o,this.$y+e);if(d===i)return m(1);if(d===s)return m(7);var f=(l={},l[n]=6e4,l[r]=36e5,l[t]=1e3,l)[d]||1,v=this.$d.getTime()+e*f;return g.w(v,this)},f.subtract=function(e,t){return this.add(-1*e,t)},f.format=function(e){var t=this;if(!this.isValid())return"Invalid Date";var n=e||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,l=i.months,c=function(e,r,i,s){return e&&(e[r]||e(t,n))||i[r].substr(0,s)},m=function(e){return g.s(s%12||12,e,"0")},f=i.meridiem||function(e,t,n){var r=e<12?"AM":"PM";return n?r.toLowerCase():r},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:c(i.monthsShort,a,l,3),MMMM:c(l,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,o,2),ddd:c(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:m(1),hh:m(2),a:f(s,u,!0),A:f(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(d,(function(e,t){return t||v[e]||r.replace(":","")}))},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(e,l,c){var d,m=g.p(l),f=_(e),v=6e4*(f.utcOffset()-this.utcOffset()),h=this-f,y=g.m(this,f);return y=(d={},d[o]=y/12,d[u]=y,d[a]=y/3,d[s]=(h-v)/6048e5,d[i]=(h-v)/864e5,d[r]=h/36e5,d[n]=h/6e4,d[t]=h/1e3,d)[m]||h,c?y:g.a(y)},f.daysInMonth=function(){return this.endOf(u).$D},f.$locale=function(){return y[this.$L]},f.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),r=S(e,t,!0);return r&&(n.$L=r),n},f.clone=function(){return g.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},m}(),p=F.prototype;return _.prototype=p,[["$ms",e],["$s",t],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",l]].forEach((function(e){p[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),_.extend=function(e,t){return e(t,F,_),_},_.locale=S,_.isDayjs=O,_.unix=function(e){return _(1e3*e)},_.en=y[h],_.Ls=y,_}()},717:function(e,t,n){var r=n(44),o=n(472),l=n(392);r({target:"Object",stat:!0},{fromEntries:function(e){var t={};return o(e,(function(e,n){l(t,e,n)}),{AS_ENTRIES:!0}),t}})},741:function(e,t,n){var content=n(916);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(111).default)("5f6fd339",content,!0,{sourceMap:!1})},915:function(e,t,n){"use strict";var r=n(741);n.n(r).a},916:function(e,t,n){(t=n(110)(!1)).push([e.i,"pre[data-v-31d75c41]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-31d75c41]{list-style:none}h3[data-v-31d75c41]{border-bottom:0}.wrapper[data-v-31d75c41]{display:flex;flex-direction:column;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius)}@media(max-width:959px){.wrapper[data-v-31d75c41]{flex-direction:column}.wrapper[data-v-31d75c41]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-31d75c41]{flex-direction:row}.wrapper>*[data-v-31d75c41]{flex:1}.wrapper[data-v-31d75c41]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-31d75c41]{padding:1.5em;margin:0!important}.field-row[data-v-31d75c41]{display:flex}.field-row>*[data-v-31d75c41]{flex:1}.field-row[data-v-31d75c41]>:not(:first-child){margin-left:10px}.overview[data-v-31d75c41]{display:flex;margin-bottom:20px}@media(max-width:959px){.overview[data-v-31d75c41]{flex-direction:column}.overview[data-v-31d75c41]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-31d75c41]{flex-direction:row}.overview>*[data-v-31d75c41]{flex:1;flex-basis:0}.overview__code>pre[data-v-31d75c41]{max-width:400px}.overview__component>*[data-v-31d75c41]{margin-right:20px}}.overview__component[data-v-31d75c41]{display:flex;flex-direction:column;justify-content:space-between}.overview__component__value span[data-v-31d75c41]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-31d75c41]{height:150px;margin:0;overflow:scroll}",""]),e.exports=t},950:function(e,t,n){"use strict";n.r(t);n(266),n(150),n(696),n(717);var r=n(91),o=n(216),l=n(323),c=n(295),d=n(0),m=n(712),f=n.n(m),v=n(732),h=n.n(v),y=n(704),O=n(690);function S(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function _(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?S(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):S(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var F=function(){return f()().format("YYYY-MM-DD")},x=function(e){return f()().subtract(1,e).format("YYYY-MM-DD")},E={today:{label:"Today",value:[F(),F()]},lastWeek:{label:"Last Week",value:[x("week"),F()]},lastMonth:{label:"Last Month",value:[x("month"),F()]},lastYear:{label:"Last Year",value:[x("year"),F()]}},T=Object(d.defineComponent)({name:"DocumentationPageUsageComponentsFilters",components:{ComponentInfo:O.a},setup:function(){var e=Object(d.ref)([{key:"stringColumn",operation:l.a.Filters.Operation.String.CONTAINS,value:null},{key:"integerColumn",operation:l.a.Filters.Operation.Integer.EQUAL,value:null}]),t=Object(d.ref)({booleanFlags:{isLoading:!1},currencyCurrency:"USD",dateRangeMaximumDate:null,dateRangeMinimumDate:null,dateRangeShortcuts:[],locale:"en-US",numberDecimalPlaces:null,numberMaximum:null,numberMinimum:null,numberPrefix:null,numberStep:null,numberSuffix:null,searchPlaceholder:null}),n=Object(d.ref)(Object.fromEntries(Object.entries(E).map((function(e){return[Object(o.a)(e,1)[0],!1]})))),r=Object(d.computed)((function(){var e,n,r,o,c,d,m;return{columns:[{key:"globalSearch",label:"Search",placeholder:null!==(e=t.value.searchPlaceholder)&&void 0!==e?e:void 0,type:l.a.Filters.FilterType.SEARCH},{key:"stringColumn",label:"String Column",operations:[l.a.Filters.Operation.String.CONTAINS,l.a.Filters.Operation.String.EQUAL,l.a.Filters.Operation.String.IS_EMPTY],type:l.a.Filters.FilterType.STRING},{key:"integerColumn",label:"Integer Column",maximum:null!==(n=t.value.numberMaximum)&&void 0!==n?n:void 0,minimum:null!==(r=t.value.numberMinimum)&&void 0!==r?r:void 0,operations:[l.a.Filters.Operation.Integer.EQUAL,l.a.Filters.Operation.Integer.GREATER_THAN,l.a.Filters.Operation.Integer.GREATER_THAN_OR_EQUAL,l.a.Filters.Operation.Integer.LESS_THAN,l.a.Filters.Operation.Integer.LESS_THAN_OR_EQUAL,l.a.Filters.Operation.Integer.IS_EMPTY],prefix:t.value.numberPrefix,suffix:t.value.numberSuffix,type:l.a.Filters.FilterType.INTEGER},{decimalPlaces:null!==(o=t.value.numberDecimalPlaces)&&void 0!==o?o:void 0,key:"floatColumn",label:"Float Column",maximum:null!==(c=t.value.numberMaximum)&&void 0!==c?c:void 0,minimum:null!==(d=t.value.numberMinimum)&&void 0!==d?d:void 0,operations:[l.a.Filters.Operation.Float.EQUAL,l.a.Filters.Operation.Float.GREATER_THAN,l.a.Filters.Operation.Float.GREATER_THAN_OR_EQUAL,l.a.Filters.Operation.Float.LESS_THAN,l.a.Filters.Operation.Float.LESS_THAN_OR_EQUAL,l.a.Filters.Operation.Float.IS_EMPTY],prefix:t.value.numberPrefix,step:null!==(m=t.value.numberStep)&&void 0!==m?m:void 0,suffix:t.value.numberSuffix,type:l.a.Filters.FilterType.FLOAT},{currency:t.value.currencyCurrency,key:"currencyColumn",label:"Currency Column",operations:[l.a.Filters.Operation.Currency.EQUAL,l.a.Filters.Operation.Currency.GREATER_THAN,l.a.Filters.Operation.Currency.GREATER_THAN_OR_EQUAL,l.a.Filters.Operation.Currency.LESS_THAN,l.a.Filters.Operation.Currency.LESS_THAN_OR_EQUAL,l.a.Filters.Operation.Currency.IS_EMPTY],type:l.a.Filters.FilterType.CURRENCY},{key:"booleanColumn",label:"Boolean Column",operations:[l.a.Filters.Operation.Boolean.EQUAL,l.a.Filters.Operation.Boolean.IS_EMPTY],type:l.a.Filters.FilterType.BOOLEAN},{key:"dateRangeColumn",label:"Date Range Column",operations:[l.a.Filters.Operation.DateRange.IN_RANGE,l.a.Filters.Operation.DateRange.IS_EMPTY],type:l.a.Filters.FilterType.DATE_RANGE,maximumDate:t.value.dateRangeMaximumDate,minimumDate:t.value.dateRangeMinimumDate,shortcuts:t.value.dateRangeShortcuts},{key:"singleEnumColumn",label:"Single Enum Column",operations:[l.a.Filters.Operation.SingleEnum.EQUAL,l.a.Filters.Operation.SingleEnum.IS_EMPTY],options:[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",value:"option-3"}],type:l.a.Filters.FilterType.SINGLE_ENUM},{key:"multiEnumColumn",label:"Multi Enum Column",operations:[l.a.Filters.Operation.MultiEnum.ONE_OF,l.a.Filters.Operation.MultiEnum.IS_EMPTY],options:[{label:"Option 1",value:"option-1"},{label:"Option 2",value:"option-2"},{label:"Option 3",value:"option-3"}],type:l.a.Filters.FilterType.MULTI_ENUM}],isLoading:t.value.booleanFlags.isLoading}}));return{component:c.a,componentCode:Object(d.computed)((function(){var component={contentSlot:null,defaultSlot:null,hasActions:!1,hasHelpTextSlot:!1,hasOptionSlot:!1,hasRemoteUpload:!1,headerSlot:null,name:"KtFilters",props:h()(r.value),showHeaderSideSlot:!1,validation:"empty"};return Object(y.generateComponentCode)(component)})),componentProps:r,filters:e,Kotti:l.a,onSelectedShortcutsChange:function(e){var r;n.value=e,t.value=_(_({},t.value),{},{dateRangeShortcuts:Object.entries(null!==(r=n.value)&&void 0!==r?r:{}).filter((function(e){var t=Object(o.a)(e,2);t[0];return t[1]})).map((function(e){var t=Object(o.a)(e,1)[0],n=E[t];return{label:n.label,value:n.value}}))})},reset:function(){return e.value=[]},selectedShortcuts:n,settings:t,shortcutsOptions:Object.entries(E).map((function(e){var t=Object(o.a)(e,2);return{key:t[0],label:t[1].label}}))}}}),M=(n(915),n(65)),$=Object(M.a)(T,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",[n("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),n("KtI18nContext",{attrs:{currencyMap:{EUR:{symbol:"€",decimalPlaces:2},USD:{symbol:"$",decimalPlaces:2}},locale:e.settings.locale}},[n("div",{staticClass:"overview"},[n("div",{staticClass:"overview__component"},[n("h4",[e._v("Component")]),e._v(" "),n("KtFilters",{attrs:{columns:e.componentProps.columns,dataTest:"ktFilters",isLoading:e.componentProps.isLoading},model:{value:e.filters,callback:function(t){e.filters=t},expression:"filters"}}),e._v(" "),n("div",{staticClass:"overview__component__value"},[n("strong",[e._v("Value")]),e._v(": "),n("span",{domProps:{textContent:e._s(JSON.stringify(e.filters))}}),e._v(" "),n("a",{on:{click:function(t){return t.preventDefault(),e.reset(t)}}},[e._v("reset")])])],1),e._v(" "),n("div",{staticClass:"overview__code"},[n("h4",[e._v("Code")]),e._v(" "),n("pre",{domProps:{textContent:e._s(e.componentCode)}})])]),e._v(" "),n("KtForm",{model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[n("div",{staticClass:"wrapper"},[n("div",[n("h4",[e._v("Settings")]),e._v(" "),n("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}],size:e.Kotti.Field.Size.SMALL}}),e._v(" "),n("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"isLoading",label:"isLoading"}],size:e.Kotti.Field.Size.SMALL,type:"switch"}}),e._v(" "),n("h4",[e._v("Additional Props")]),e._v(" "),n("div",{staticClass:"field-row"},[n("KtFieldNumber",{attrs:{formKey:"numberDecimalPlaces",helpText:"Support on FLOAT column type only",isOptional:"",label:"decimalPlaces",minimum:0}}),e._v(" "),n("KtFieldNumber",{attrs:{formKey:"numberStep",helpText:"Support on FLOAT column type only",isOptional:"",label:"step"}})],1),e._v(" "),n("div",{staticClass:"field-row"},[n("KtFieldNumber",{attrs:{formKey:"numberMinimum",helpText:"Support on FLOAT & INTEGER column types",isOptional:"",label:"minimum"}}),e._v(" "),n("KtFieldNumber",{attrs:{formKey:"numberMaximum",helpText:"Support on FLOAT & INTEGER column types",isOptional:"",label:"maximum"}})],1),e._v(" "),n("div",{staticClass:"field-row"},[n("KtFieldDate",{attrs:{formKey:"dateRangeMaximumDate",helpText:"Support on DATE_RANGE column type only",isOptional:"",label:"maximumDate"}}),e._v(" "),n("KtFieldDate",{attrs:{formKey:"dateRangeMinimumDate",helpText:"Support on DATE_RANGE column type only",isOptional:"",label:"minimumDate"}})],1),e._v(" "),n("KtFieldToggleGroup",{attrs:{formKey:"NONE",helpText:"Support on DATE_RANGE column type only",isOptional:"",label:"shortcuts",options:e.shortcutsOptions,value:e.selectedShortcuts},on:{input:e.onSelectedShortcutsChange}}),e._v(" "),n("KtFieldSingleSelect",{attrs:{formKey:"currencyCurrency",helpText:'Available Currencies can be defined via <KtI18nContext :currencyMap="..."/>',label:"currency",options:[{label:"EUR",value:"EUR"},{label:"USD",value:"USD"}]}})],1),e._v(" "),n("div",[n("h4",[e._v("Texts")]),e._v(" "),n("KtFieldText",{attrs:{formKey:"searchPlaceholder",isOptional:"",label:"placeholder",size:e.Kotti.Field.Size.SMALL}}),e._v(" "),n("h4",[e._v("Decoration")]),e._v(" "),n("div",{staticClass:"field-row"},[n("KtFieldText",{attrs:{formKey:"numberPrefix",helpText:"Support on FLOAT & INTEGER column types",isOptional:"",label:"prefix"}}),e._v(" "),n("KtFieldText",{attrs:{formKey:"numberSuffix",helpText:"Support on FLOAT & INTEGER column types",isOptional:"",label:"suffix"}})],1)],1)])])],1)],1)}),[],!1,null,"31d75c41",null);t.default=$.exports}}]);