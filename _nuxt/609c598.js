(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1075:function(e,t,o){"use strict";o(968)},1076:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,"pre[data-v-76e2dccf]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-76e2dccf]{list-style:none}h3[data-v-76e2dccf]{border-bottom:0}.wrapper[data-v-76e2dccf]{background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius);display:flex;flex-direction:column;margin:0 0 1.5em}@media(width < 960px){.wrapper[data-v-76e2dccf]{flex-direction:column}.wrapper[data-v-76e2dccf]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-76e2dccf]{flex-direction:row}.wrapper>*[data-v-76e2dccf]{flex:1}.wrapper[data-v-76e2dccf]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-76e2dccf]{margin:0!important;padding:1.5em}.field-row[data-v-76e2dccf]{display:flex}.field-row>*[data-v-76e2dccf]{flex:1}.field-row[data-v-76e2dccf]>:not(:first-child){margin-left:10px}.overview[data-v-76e2dccf]{display:flex;margin-bottom:20px}@media(width < 960px){.overview[data-v-76e2dccf]{flex-direction:column}.overview[data-v-76e2dccf]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-76e2dccf]{flex-direction:row}.overview>*[data-v-76e2dccf]{flex:1;flex-basis:0}.overview__code>pre[data-v-76e2dccf]{max-width:400px}.overview__component>*[data-v-76e2dccf]{margin-right:20px}}.overview__component[data-v-76e2dccf]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-76e2dccf]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-76e2dccf]{height:150px;margin:0;overflow:scroll}",""]),n.locals={},e.exports=n},1098:function(e,t,o){"use strict";o.r(t);o(120),o(99),o(84),o(223),o(101),o(224);var n=o(13),r=o(4),l=o(10),c=(o(104),o(98),o(305),o(222),o(45),o(100),o(468),o(0)),d=o(8),f=o(884),v=[{completed:!0,id:1,todo:"Watch a classic movie",userId:68},{completed:!1,id:2,todo:"Contribute code or a monetary donation to an open-source software project",userId:69},{completed:!1,id:3,todo:"Invite some friends over for a game night",userId:104},{completed:!0,id:4,todo:"Text a friend you haven't talked to in a long time",userId:2},{completed:!0,id:5,todo:"Plan a vacation you've always wanted to take",userId:162},{completed:!1,id:6,todo:"Clean out car",userId:71},{completed:!0,id:7,todo:"Create a cookbook with favorite recipes",userId:53},{completed:!1,id:8,todo:"Create a compost pile",userId:13},{completed:!0,id:9,todo:"Take a hike at a local park",userId:37},{completed:!0,id:10,todo:"Take a class at local community center that interests you",userId:65},{completed:!0,id:11,todo:"Research a topic interested in",userId:130},{completed:!1,id:12,todo:"Plan a trip to another country",userId:140},{completed:!1,id:13,todo:"Improve touch typing",userId:178},{completed:!1,id:14,todo:"Learn Express.js",userId:194},{completed:!1,id:15,todo:"Learn calligraphy",userId:80},{completed:!0,id:16,todo:"Go to the gym",userId:142}],m=o(308);function h(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function _(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?h(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):h(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}var y=Object(c.defineComponent)({name:"DocumentationPageUsageComponentsStandardTable",components:{ComponentInfo:f.a,KtButton:d.h,KtStandardTable:d.U},setup:function(){var e,t=Object(c.ref)(!1),o=Object(d.jb)({mode:"text",type:"boolean"}),r=Object(d.jb)({type:"integer"}),f=Object(d.jb)({type:"text"}),h=Object(c.ref)([{display:r,getData:function(e){return e.id},id:"id",isSortable:!0,label:"ID"},{display:f,getData:function(e){return e.todo},id:"todo",isSortable:!0,label:"Todo"},{display:o,getData:function(e){return e.completed},id:"completed",isSortable:!0,label:"Completed"},{display:r,getData:function(e){return e.userId},id:"userId",isSortable:!0,label:"User ID"}]),y=Object(c.ref)(v),x=Object(c.ref)([{display:r,getData:function(e){return e.id},id:"id",isSortable:!0,label:"ID"},{display:f,getData:function(e){return e.name},id:"name",isSortable:!0,label:"Name"},{display:f,getData:function(e){return e.ingredients.join("; ")},id:"ingredients",isSortable:!0,label:"Ingredients"},{display:r,getData:function(e){return e.prepTimeMinutes},id:"prepTimeMinutes",isSortable:!0,label:"Prep time minutes"},{display:r,getData:function(e){return e.cookTimeMinutes},id:"cookTimeMinutes",isSortable:!0,label:"Cook time minutes"},{display:f,getData:function(e){return e.difficulty},id:"difficulty",isSortable:!0,label:"Difficulty"},{display:f,getData:function(e){return e.cuisine},id:"cuisine",isSortable:!0,label:"Cuisine"},{display:r,getData:function(e){return e.rating},id:"rating",isSortable:!0,label:"Rating"}]),w=Object(c.ref)([]),S=Object(c.ref)(0),O=Object(c.ref)({columnsPopoverSize:d.a.Popover.Size.MEDIUM,filtersPopoverSize:d.a.Popover.Size.MEDIUM,hideControls:{columns:!1,filters:!1,search:!1},locale:"en-US",searchPlaceholder:null,showInlineFilters:!1,slots:{appliedFilterActionsSlot:!1,controlsActionsSlot:!1,headerActionsSlot:!1,tableSlot:!1},title:"Title"}),C=Object(c.computed)((function(){var e;return[{dataTest:"boolean-filter",id:"booleanFilter",label:"Boolean filter",slotLabels:["No","Yes"],type:d.a.StandardTable.FilterType.BOOLEAN},{dataTest:"single-select-filter",displayInline:null!==(e=O.value.showInlineFilters)&&void 0!==e&&e,id:"singleSelectFilter",isUnsorted:!0,label:"Single select filter",options:[{dataTest:"opt-1",isDisabled:!1,label:"Option 1",value:101},{dataTest:"opt-2",isDisabled:!1,label:"Option 2",value:102},{dataTest:"opt-3",isDisabled:!1,label:"Option 3",value:103}],type:d.a.StandardTable.FilterType.SINGLE_SELECT},{dataTest:"multi-select-filter",id:"multiSelectFilter",isUnsorted:!0,label:"Multi select filter",options:[{dataTest:"opt-1",isDisabled:!1,label:"Option 1",value:101},{dataTest:"opt-2",isDisabled:!1,label:"Option 2",value:102},{dataTest:"opt-3",isDisabled:!1,label:"Option 3",value:103}],type:d.a.StandardTable.FilterType.MULTI_SELECT},{dataTest:"date-range-filter",id:"dateRangeFilter",label:"Date range filter",type:d.a.StandardTable.FilterType.DATE_RANGE},{dataTest:"number-range-filter",decimalPlaces:2,id:"numberRangeFilter",label:"Number range filter",type:d.a.StandardTable.FilterType.NUMBER_RANGE,unit:"Kg"}]}));return Object(d.mb)(Object(c.computed)((function(){return{id:"example-local-data",paginationOptions:{pageSize:5,pageSizeOptions:[5,10,15,20],type:"local"},selectMode:"single-page",storageAdapter:null,table:{columns:h.value,data:y.value,getRowBehavior:function(e){var t=e.row;return{click:{component:null,onClick:function(){Object(m.b)({text:t.todo})}},id:String(t.id)}},hasDragAndDrop:!0}}}))),Object(d.mb)(Object(c.computed)((function(){var e;return{filters:C.value,id:"example-remote-data",isLoading:t.value,options:{hideControls:O.value.hideControls,popoversSize:{columns:O.value.columnsPopoverSize,filters:O.value.filtersPopoverSize},searchPlaceholder:null!==(e=O.value.searchPlaceholder)&&void 0!==e?e:void 0},paginationOptions:{pageSize:5,pageSizeOptions:[5,10,15,30,50,100],rowCount:S.value,type:"remote"},selectMode:"global",storageAdapter:null,table:{columns:x.value,data:w.value,expandMode:O.value.slots.tableSlot?"single":void 0,getRowBehavior:function(e){var t=e.row;return{click:{component:null,onClick:function(){Object(m.b)({text:t.name})}},id:String(t.id)}},hasDragAndDrop:!0}}}))),{component:d.U,fetchData:(e=Object(l.a)(regeneratorRuntime.mark((function e(o){var n,r,l,c,d,f,v,m,h;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.value=!0,console.log("🚀 ~ docs ~ standard-table ~ fetchData:",_({},o)),n=o.pagination,r=n.pageIndex,l=n.pageSize,c=l*r,d="https://dummyjson.com/recipes?limit=".concat(l,"&skip=").concat(c),e.prev=6,e.next=9,fetch(d);case 9:if((f=e.sent).ok){e.next=12;break}throw new Error("Response status: ".concat(f.status));case 12:return e.next=14,f.json();case 14:v=e.sent,m=v.recipes,h=v.total,w.value=m,S.value=h,t.value=!1,e.next=26;break;case 22:throw e.prev=22,e.t0=e.catch(6),console.error(e.t0.message),e.t0;case 26:case"end":return e.stop()}}),e,null,[[6,22]])}))),function(t){return e.apply(this,arguments)}),settings:O,sizeOptions:Object(c.computed)((function(){return Object.entries(d.a.Popover.Size).map((function(e){var t=Object(n.a)(e,2),o=t[0],r=t[1];return{label:"Kotti.Popover.Size.".concat(o," (").concat(r,")"),value:r}}))}))}}}),x=y,w=(o(1075),o(32)),component=Object(w.a)(x,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),t("KtStandardTable",{attrs:{tableId:"example-local-data",title:"Title"}}),e._v(" "),t("br"),t("br"),e._v(" "),t("KtI18nContext",{attrs:{locale:e.settings.locale}},[t("KtStandardTable",{attrs:{tableId:"example-remote-data",title:e.settings.title},on:{"update:fetchData":e.fetchData},scopedSlots:e._u([e.settings.slots.headerActionsSlot?{key:"header-actions",fn:function(){return[t("KtButton",{attrs:{label:"Header Action"}})]},proxy:!0}:null,e.settings.slots.controlsActionsSlot?{key:"control-actions",fn:function(){return[t("KtButton",{attrs:{label:"Control Action"}})]},proxy:!0}:null,e.settings.slots.appliedFilterActionsSlot?{key:"applied-filter-actions",fn:function(){return[t("KtButton",{attrs:{label:"Applied Filter Action"}})]},proxy:!0}:null,e.settings.slots.tableSlot?{key:"table",fn:function(o){var n=o.isLoading,r=o.tableId;return[e._v("\n\t\t\t\t"+e._s(JSON.stringify({isLoading:n,tableId:r}))+"\n\t\t\t\t"),t("KtTable",e._b({scopedSlots:e._u([{key:"expanded-row",fn:function(t){var o=t.row;return[e._v("\n\t\t\t\t\t\t"+e._s(JSON.stringify(o))+"\n\t\t\t\t\t")]}}],null,!0)},"KtTable",{isLoading:n,tableId:r},!1))]}}:null],null,!0)})],1),e._v(" "),t("br"),e._v(" "),t("KtForm",{attrs:{size:"small"},model:{value:e.settings,callback:function(t){e.settings=t},expression:"settings"}},[t("div",{staticClass:"wrapper"},[t("div",[t("h4",[e._v("Settings")]),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}]}}),e._v(" "),t("KtFieldToggleGroup",{attrs:{formKey:"hideControls",helpText:"Can be set via hideControls prop",isOptional:"",label:"Hide Controls",options:[{key:"columns",label:"Hide columns"},{key:"filters",label:"Hide filters"},{key:"search",label:"Hide search"}],type:"switch"}}),e._v(" "),t("KtFieldToggle",{attrs:{formKey:"showInlineFilters",helpText:"Must set via filter definition: `displayInline: true`",isOptional:"",label:"Use inline filters",type:"switch"}}),e._v(" "),t("KtFieldToggleGroup",{attrs:{formKey:"slots",isOptional:"",label:"Slots",options:[{key:"headerActionsSlot",label:"Use header actions slot"},{key:"controlsActionsSlot",label:"Use controls actions slot"},{key:"appliedFilterActionsSlot",label:"Use applied filter actions slot"},{key:"tableSlot",label:"Use table slot"}],type:"switch"}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"columnsPopoverSize",helpText:"Can be set via popoversSize prop",hideClear:"",isOptional:"",label:"Columns popover size",options:e.sizeOptions}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{formKey:"filtersPopoverSize",helpText:"Can be set via popoversSize prop",hideClear:"",isOptional:"",label:"Filters popover size",options:e.sizeOptions}})],1),e._v(" "),t("div",[t("h4",[e._v("Texts")]),e._v(" "),t("KtFieldText",{attrs:{formKey:"title",isOptional:"",label:"title"}}),e._v(" "),t("KtFieldText",{attrs:{formKey:"searchPlaceholder",isOptional:"",label:"searchPlaceholder"}})],1)])])],1)}),[],!1,null,"76e2dccf",null);t.default=component.exports},882:function(e,t,o){var content=o(892);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("258f50c4",content,!0,{sourceMap:!1})},883:function(e,t,o){var content=o(894);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("7f9a7731",content,!0,{sourceMap:!1})},884:function(e,t,o){"use strict";var n=o(13),r=(o(98),o(222),o(895),o(885),o(468),o(45),o(119),o(120),o(99),o(84),o(223),o(101),o(224),o(4)),l=o(6),c=(o(68),o(121),o(100),o(305),o(85)),d=o(124),f=o.n(d),v=o(307),m=o.n(v),h=o(0),_=o(8),y=o(2),x=(o(157),Object(h.defineComponent)({name:"ComponentInfoSlots",components:{KtHeading:_.L},props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(h.ref)(!1)}}})),w=(o(891),o(32)),S=Object(w.a)(x,(function(){var e=this,t=e._self._c;e._self._setupProxy;return Object.entries(e.slots).length>0?t("KtHeading",{attrs:{text:"Slots",toggleStatus:e.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showSlots=!e.showSlots}}},[t("article",{staticClass:"slots-block"},e._l(Object.entries(e.slots),(function(o){var r=Object(n.a)(o,2),l=r[0],details=r[1];return t("section",{key:l},[t("div",{staticClass:"header"},[t("div",{staticClass:"header__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",{staticClass:"header__details"},[details.description?t("div",{staticClass:"header__description",domProps:{textContent:e._s(details.description)}}):t("div",{staticClass:"header__empty-description",domProps:{textContent:e._s("No description")}}),e._v(" "),null===details.scope?t("div",{staticClass:"header__empty-scope",domProps:{textContent:e._s("(Not Scoped)")}}):e._e()])]),e._v(" "),null!==details.scope?t("div",{staticClass:"scope"},e._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1],d=c.description,f=c.type;return t("div",{key:l,staticClass:"scope__item"},[t("div",{class:"scope__type scope__type--is-".concat(f),domProps:{textContent:e._s(f)}}),e._v(" "),t("div",{staticClass:"scope__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:e._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:e._s(d)}})])})),0):e._e()])})),0)]):e._e()}),[],!1,null,"18a948b4",null).exports;function O(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}var C=Object(h.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:S,KtHeading:_.L},props:{component:{required:!0,type:Object}},setup:function(e){return{Dashes:c.Dashes,labels:Object(h.computed)((function(){var t=[],o=e.component,n=o.meta,c=n.addedVersion,d=n.componentFolder,f=n.deprecated,v=n.designs,h=n.typeScript,y=o.name,x=null!=d?d:m()(y.replace(/^Kt/,"Kotti")),w=e.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==f&&t.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==v?Array.isArray(v)?t.push.apply(t,Object(l.a)(v.map((function(e){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(e.title,"”"),link:e.url,right:Object(r.a)({},_.a.MetaDesignType.FIGMA,"Figma")[e.type]}})))):t.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:v.url,right:Object(r.a)({},_.a.MetaDesignType.FIGMA,"Figma")[v.type]}):t.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&t.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:w?"".concat(w,"/types.ts"):void 0,right:h.namespace}),t.push(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?O(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):O(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),w&&t.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(w,"/").concat(y,".vue"),right:"".concat(y,".vue")}),t})),showEmits:Object(h.ref)(!1),showProps:Object(h.ref)(!1),stringifyPropDefault:function(e,t){return"function"==typeof e?f()(t).some((function(e){return"Function"===e.name}))?"".concat(e.toString()," *"):"".concat(JSON.stringify(e())," *"):JSON.stringify(e)},stringifyType:function(e){return f()(e).map((function(e){return e.name.toLowerCase()})).join(" | ")},Yoco:y.a}}}),k=C,j=(o(893),Object(w.a)(k,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"component-info-container"},[t("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==e.component.meta.deprecated}},[t("h1",{staticClass:"component-info__title",domProps:{textContent:e._s(e.component.name)}}),e._v(" "),t("div",[t("div",{staticClass:"component-info__labels"},e._l(e.labels,(function(label,o){return t("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[t("div",{staticClass:"component-info-label__left",domProps:{textContent:e._s(label.left)}}),e._v(" "),label.link?t("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:e._s(label.right)}}):t("div",{staticClass:"component-info-label__right",domProps:{textContent:e._s(label.right)}})])})),0)])]),e._v(" "),null!==e.component.meta.deprecated?t("article",{staticClass:"danger-block"},[t("section",[e._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),t("strong",{domProps:{textContent:e._s("v".concat(e.component.meta.deprecated.version))}})]),e._v(" "),t("section",[t("div",[t("strong",[e._v("Reason")]),e._v(": "+e._s(e.component.meta.deprecated.reason)+"\n\t\t\t")]),e._v(" "),t("div",[t("strong",{domProps:{textContent:e._s(e.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),e._v(":\n\t\t\t\t"),e._l(e.component.meta.deprecated.alternatives,(function(o){return t("code",{key:o,domProps:{textContent:e._s(o)}})})),e._v(" "),0===e.component.meta.deprecated.alternatives.length?t("span",{domProps:{textContent:e._s(e.Dashes.EmDash)}}):e._e()],2)])]):e._e(),e._v(" "),e.component.props?t("KtHeading",{attrs:{text:"Properties",toggleStatus:e.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showProps=!e.showProps}}},[t("table",[t("thead",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Default")]),e._v(" "),t("th",[e._v("Validator")])]),e._v(" "),t("tbody",e._l(Object.entries(e.component.props).sort((function(e,t){var a=Object(n.a)(e,1)[0],b=Object(n.a)(t,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1];return t("tr",{key:l},[t("td",[t("code",{domProps:{textContent:e._s(l)}})]),e._v(" "),t("td",[t("code",{domProps:{textContent:e._s(e.stringifyType(c.type))}})]),e._v(" "),t("td",[c.required?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("required")}}):void 0===c.default?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("No default")}}):t("code",{domProps:{textContent:e._s(e.stringifyPropDefault(c.default,c.type))}})]),e._v(" "),t("td",[t("div",{staticStyle:{display:"flex","align-items":"center"}},[t("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:e._s(c.validator?e.Yoco.Icon.CHECK:e.Yoco.Icon.CLOSE)}}),e._v(" "),c.validator?t("div",{domProps:{textContent:e._s(c.validator.name)}}):e._e()])])])})),0)])]):e._e(),e._v(" "),e.component.emits&&e.component.emits.length>0?t("KtHeading",{attrs:{text:"Emits",toggleStatus:e.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showEmits=!e.showEmits}}},[t("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[e._l(e.component.emits,(function(o){return[t("code",{key:o,domProps:{textContent:e._s("@".concat(o))}})]}))],2)]):e._e(),e._v(" "),t("ComponentInfoSlots",{attrs:{slots:e.component.meta.slots}})],1)}),[],!1,null,"6e674bb8",null));t.a=j.exports},885:function(e,t,o){"use strict";var n=o(11),r=o(15),l=o(70),c=o(61),d=o(78),f=o(886),v=o(38),m=o(14),h=o(887),_=o(306),y=o(888),x=o(889),w=o(158),S=o(890),O=[],C=r(O.sort),k=r(O.push),j=m((function(){O.sort(void 0)})),P=m((function(){O.sort(null)})),T=_("sort"),D=!m((function(){if(w)return w<70;if(!(y&&y>3)){if(x)return!0;if(S)return S<603;var code,e,t,o,n="";for(code=65;code<76;code++){switch(e=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:t=3;break;case 68:case 71:t=4;break;default:t=2}for(o=0;o<47;o++)O.push({k:e+o,v:t})}for(O.sort((function(a,b){return b.v-a.v})),o=0;o<O.length;o++)e=O[o].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:j||!P||!T||!D},{sort:function(e){void 0!==e&&l(e);var t=c(this);if(D)return void 0===e?C(t):C(t,e);var o,n,r=[],m=d(t);for(n=0;n<m;n++)n in t&&k(r,t[n]);for(h(r,function(e){return function(t,o){return void 0===o?-1:void 0===t?1:void 0!==e?+e(t,o)||0:v(t)>v(o)?1:-1}}(e)),o=d(r),n=0;n<o;)t[n]=r[n++];for(;n<m;)f(t,n++);return t}})},886:function(e,t,o){"use strict";var n=o(123),r=TypeError;e.exports=function(e,t){if(!delete e[t])throw new r("Cannot delete property "+n(t)+" of "+n(e))}},887:function(e,t,o){"use strict";var n=o(122),r=Math.floor,l=function(e,t){var o=e.length;if(o<8)for(var element,c,i=1;i<o;){for(c=i,element=e[i];c&&t(e[c-1],element)>0;)e[c]=e[--c];c!==i++&&(e[c]=element)}else for(var d=r(o/2),f=l(n(e,0,d),t),v=l(n(e,d),t),m=f.length,h=v.length,_=0,y=0;_<m||y<h;)e[_+y]=_<m&&y<h?t(f[_],v[y])<=0?f[_++]:v[y++]:_<m?f[_++]:v[y++];return e};e.exports=l},888:function(e,t,o){"use strict";var n=o(118).match(/firefox\/(\d+)/i);e.exports=!!n&&+n[1]},889:function(e,t,o){"use strict";var n=o(118);e.exports=/MSIE|Trident/.test(n)},890:function(e,t,o){"use strict";var n=o(118).match(/AppleWebKit\/(\d+)\./);e.exports=!!n&&+n[1]},891:function(e,t,o){"use strict";o(882)},892:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,".slots-block[data-v-18a948b4]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-18a948b4]{padding:.4rem .6rem}.slots-block[data-v-18a948b4]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-18a948b4]{align-items:center;display:flex;flex:1}.header__details[data-v-18a948b4]{flex:1}.header__name[data-v-18a948b4]{font-weight:700}.header>*[data-v-18a948b4]{align-items:center;display:flex}.header[data-v-18a948b4]>:not(:first-child){margin-left:.4rem}.header__description[data-v-18a948b4]{flex:1}.header__empty-description[data-v-18a948b4]{flex:1;font-style:italic}.header__empty-scope[data-v-18a948b4]{font-style:italic}.scope[data-v-18a948b4]{margin-left:1.5rem}.scope__item[data-v-18a948b4]{align-items:center;display:flex}.scope__item[data-v-18a948b4]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-18a948b4]{font-style:italic}.scope__name[data-v-18a948b4]{font-weight:700;min-width:100px}.scope__type[data-v-18a948b4]{min-width:60px}.scope__type--is-function[data-v-18a948b4]{color:var(--orange-50)}.scope__type--is-object[data-v-18a948b4]{color:var(--purple-50)}.scope__type--is-integer[data-v-18a948b4]{color:var(--green-50)}",""]),n.locals={},e.exports=n},893:function(e,t,o){"use strict";o(883)},894:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,".component-info[data-v-6e674bb8]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-6e674bb8]{align-items:center;flex-direction:row}}.component-info>*[data-v-6e674bb8]{display:flex;margin:5px 10px}.component-info__labels[data-v-6e674bb8]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-6e674bb8]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50);-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.component-info-label[data-v-6e674bb8]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-6e674bb8],.component-info-label__right[data-v-6e674bb8]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-6e674bb8]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-6e674bb8]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-6e674bb8]{margin-bottom:32px}.component-info-container[data-v-6e674bb8]>:not(:first-child){margin-top:16px}.danger-block[data-v-6e674bb8]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-6e674bb8]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-6e674bb8]{margin-left:8px}.danger-block>section[data-v-6e674bb8]{padding:.4rem .6rem}.danger-block>section[data-v-6e674bb8]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},e.exports=n},895:function(e,t,o){"use strict";var n=o(11),r=o(896);n({target:"String",proto:!0,forced:o(897)("link")},{link:function(e){return r(this,"a","href",e)}})},896:function(e,t,o){"use strict";var n=o(15),r=o(69),l=o(38),c=/"/g,d=n("".replace);e.exports=function(e,t,o,n){var f=l(r(e)),v="<"+t;return""!==o&&(v+=" "+o+'="'+d(l(n),c,"&quot;")+'"'),v+">"+f+"</"+t+">"}},897:function(e,t,o){"use strict";var n=o(14);e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},968:function(e,t,o){var content=o(1076);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("6ad201ac",content,!0,{sourceMap:!1})}}]);