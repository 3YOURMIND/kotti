(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{1131:function(e,t,o){"use strict";o.r(t);var n=o(6),r=(o(98),o(68),o(121),o(905),o(45),o(945),o(127),o(947),o(948),o(949),o(950),o(951),o(952),o(953),o(954),o(955),o(956),o(957),o(958),o(959),o(960),o(961),o(962),o(125),o(222),o(0)),l=o(8),c=o(884),d=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsTable",components:{ComponentInfo:c.a,KtButton:l.h,KtFieldSingleSelect:l.A,KtFieldToggleGroup:l.F,KtTable:l.V,KtValueLabel:l.eb},setup:function(){var e=Object(r.ref)({hasDragAndDrop:!1,isEmpty:!1,isLoading:!1,isSelectable:!0,showEmptySlot:!1,showLoadingSlot:!1}),t=Object(r.ref)("single"),o=Object(r.ref)(0),c=Object(r.ref)(null),d=Object(l.jb)({mode:"text",type:"boolean"}),m=Object(l.jb)({type:"date"}),f=Object(l.jb)({type:"text"}),v=Object(r.computed)((function(){switch(c.value){case"component":return{component:"nuxt-link",props:{to:"/usage/layouts/navbar"}};case"expand":return"expand";case"link":return{component:"a",props:{href:"https://www.google.com"}};case"simple-event":return{component:null,onClick:function(){o.value+=1}};default:return}})),data=Object(r.ref)([{age:27.1,bestSkill:"Perfect naps",id:1,isAlive:!0,lifespan:"9 lives",name:"Cats",preferredSound:"Purring",purpose:"Ignoring humans",someDate:"2013-11-11",speed:"Slow and stealthy",worstEnemy:"Vacuum cleaners"},{age:85.8,bestSkill:"Quantum jumps",id:2,isAlive:!1,lifespan:"Until it crashes",name:"Spaceships",preferredSound:"Engine roar",purpose:"Exploring the universe",someDate:"1922-12-01",speed:"Faster than light",worstEnemy:"Black holes"},{age:2134412,bestSkill:"Outlasting everything",id:3,isAlive:!1,lifespan:"Infinite (obviously)",name:"Tungsten",preferredSound:"Eternal silence",purpose:"Being immortal and holy",someDate:"1833-04-23",speed:null,worstEnemy:"Rust (blasphemy!)"},{age:.1,bestSkill:"Fueling all-nighters",id:4,isAlive:!1,lifespan:"10 minutes per cup",name:"Coffee",preferredSound:"Slurping",purpose:"Keeping people awake",someDate:"2044-01-03",speed:"Varies by caffeine level",worstEnemy:"Decaf"}]),_=Object(r.ref)([]),y=Object(l.fb)().createColumn,h=Object(l.nb)(Object(r.computed)((function(){var o;return{columns:[y({display:Object(l.jb)({type:"integer"}),getData:function(e){return e.id},id:"id",isSortable:!0,label:"# Id"}),y({display:Object(l.ib)({align:"left",disableCellClick:!0,isNumeric:!1,render:function(e){return Object(r.h)("div",{},[Object(r.h)("em",{style:{color:"green"}},e.id)," ".concat(e.name," is "),Object(r.h)("b",{},e.age)])},sortBehavior:"asc-desc"}),getData:function(e){return e},id:"age",isSortable:!0,label:"age (click disabled)",minWidth:"300px"}),y({display:d,getData:function(e){return e.isAlive},id:"isAlive",label:"Aliveness",width:"300px"}),y({display:Object(l.ib)({align:"center",disableCellClick:!1,isNumeric:!1,render:function(e){return e.replaceAll("e","x")},sortBehavior:"asc-desc"}),getData:function(e){return e.lifespan},id:"lifespan",isSortable:!0,label:"Lifespan (click allowed)"}),y({display:f,getData:function(e){return e.name},id:"name",isSortable:!0,label:"Name"}),y({display:f,getData:function(e){return e.purpose},id:"purpose",isSortable:!0,label:"Primary Purpose"}),y({display:f,getData:function(e){return e.speed},id:"speed",isSortable:!0,label:"Speed",maxWidth:"120px"}),y({display:m,getData:function(e){return new Date(e.someDate)},id:"randomDate",isSortable:!0,label:"Random Date"}),y({display:f,getData:function(e){return e.bestSkill},id:"bestSkill",isSortable:!0,label:"Best Skill"}),y({display:f,getData:function(e){return e.worstEnemy},id:"worstEnemy",isSortable:!0,label:"Worst Enemy"}),y({display:f,getData:function(e){return e.preferredSound},id:"preferredSound",isSortable:!0,label:"Preferred Sound"})],data:e.value.isEmpty?[]:_.value,expandMode:null!==(o=t.value)&&void 0!==o?o:void 0,getRowBehavior:function(e){var t=e.row,o=e.rowIndex;return{actions:o%2==0?[{dataTest:"download-test-data-".concat(o),icon:"download",isDisabled:!0,onClick:function(){window.alert("download icon clicked")}},{icon:"send",onClick:function(){window.alert("send icon clicked")}}]:void 0,click:v.value,disable:{actions:!1,click:1===o,expand:1===o,select:1===o},id:String(t.id)}},hasDragAndDrop:e.value.hasDragAndDrop,id:"example",isSelectable:e.value.isSelectable}})));return Object(l.ob)({locallySortedData:_,ordering:h.api.ordering,rawData:data,sortingFunctions:{age:function(e){return Object(l.kb)((function(e){return e.age}),e)},bestSkill:function(e){return Object(l.lb)((function(e){return e.bestSkill}),e)},id:function(e){return Object(l.kb)((function(e){return e.id}),e)},isAlive:function(e){return Object(l.kb)((function(e){return e.isAlive?1:0}),e)},lifespan:function(e){return Object(l.lb)((function(e){return e.lifespan}),e)},name:function(e){return Object(l.lb)((function(e){return e.name}),e)},preferredSound:function(e){return Object(l.lb)((function(e){return e.preferredSound}),e)},purpose:function(e){return Object(l.lb)((function(e){return e.purpose}),e)},randomDate:function(e){return Object(l.lb)((function(e){return e.someDate}),e)},speed:function(e){return Object(l.lb)((function(e){return e.speed}),e)},worstEnemy:function(e){return Object(l.lb)((function(e){return e.worstEnemy}),e)}}}),Object(r.watch)(h.api.ordering,(function(){try{console.log(JSON.stringify(h.api.ordering.value))}catch(e){console.error(e)}})),{booleanFlags:e,clickBehavior:c,component:l.V,counter:o,emptySelection:function(){h.api.selectedRows.value={}},expandMode:t,reverseColumnOrder:function(){h.api.columnOrder.value=h.api.columnOrder.value.reverse()},showAllColumns:function(){h.api.hiddenColumns.value=new Set},table:h,toggleGroupOptions:Object(r.computed)((function(){return[{key:"hasDragAndDrop",label:"table has drag and drop"},{key:"isEmpty",label:"table is empty"}].concat(Object(n.a)(e.value.isEmpty?[{key:"showEmptySlot",label:"show table's #empty slot"}]:[]),[{key:"isLoading",label:"table is loading"}],Object(n.a)(e.value.isLoading&&e.value.isEmpty?[{key:"showLoadingSlot",label:"show table's #loading slot"}]:[]),[{key:"isSelectable",label:"table is selectable"}])}))}}}),m=o(32),component=Object(m.a)(d,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",[t("ComponentInfo",e._b({},"ComponentInfo",{component:e.component},!1)),e._v(" "),t("KtFieldToggleGroup",{attrs:{isOptional:"",options:e.toggleGroupOptions,type:"switch"},model:{value:e.booleanFlags,callback:function(t){e.booleanFlags=t},expression:"booleanFlags"}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{label:"Expand Mode",options:[{label:"None",value:null},{label:"Single",value:"single"},{label:"Multi",value:"multi"}]},model:{value:e.expandMode,callback:function(t){e.expandMode=t},expression:"expandMode"}}),e._v(" "),t("KtFieldSingleSelect",{attrs:{label:"Row Click Behavior",options:[{label:"expand",value:"expand"},{label:"track row clicks",value:"simple-event"},{label:"go to google",value:"link"},{label:"Custom component",value:"component"}]},model:{value:e.clickBehavior,callback:function(t){e.clickBehavior=t},expression:"clickBehavior"}}),e._v(" "),"simple-event"===e.clickBehavior?t("KtValueLabel",{attrs:{label:"Row clicks",value:e.counter}}):e._e(),e._v(" "),t("KtTable",{staticClass:"mb-4",attrs:{isLoading:e.booleanFlags.isLoading,tableId:"example"},scopedSlots:e._u([{key:"actions",fn:function(){return[e._v(" I am a nice action ")]},proxy:!0},{key:"mycolumnid",fn:function(){return[e._v(" costum content ")]},proxy:!0},e.booleanFlags.isEmpty&&e.booleanFlags.showEmptySlot?{key:"empty",fn:function(){return[t("img",{attrs:{src:"https://picsum.photos/400/150"}})]},proxy:!0}:null,e.booleanFlags.isLoading&&e.booleanFlags.showLoadingSlot?{key:"loading",fn:function(){return[t("img",{attrs:{src:"https://picsum.photos/400/150"}})]},proxy:!0}:null,{key:"expanded-row",fn:function(){return[t("div",[e._v("Expanded content")])]},proxy:!0}],null,!0)}),e._v(" "),t("div",{staticStyle:{display:"flex",gap:"var(--unit-1)"}},[t("KtButton",{attrs:{label:"empty selection"},on:{click:e.emptySelection}}),e._v(" "),t("KtButton",{attrs:{label:"reverse columns"},on:{click:e.reverseColumnOrder}}),e._v(" "),t("br"),e._v(" "),t("KtButton",{attrs:{label:"show all columns"},on:{click:e.showAllColumns}})],1)],1)}),[],!1,null,null,null);t.default=component.exports},882:function(e,t,o){var content=o(892);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("258f50c4",content,!0,{sourceMap:!1})},883:function(e,t,o){var content=o(894);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(67).default)("7f9a7731",content,!0,{sourceMap:!1})},884:function(e,t,o){"use strict";var n=o(14),r=(o(98),o(222),o(895),o(885),o(468),o(45),o(119),o(120),o(99),o(84),o(223),o(101),o(224),o(4)),l=o(6),c=(o(68),o(121),o(100),o(305),o(85)),d=o(124),m=o.n(d),f=o(307),v=o.n(f),_=o(0),y=o(8),h=o(2),x=(o(157),Object(_.defineComponent)({name:"ComponentInfoSlots",components:{KtHeading:y.L},props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(_.ref)(!1)}}})),k=(o(891),o(32)),w=Object(k.a)(x,(function(){var e=this,t=e._self._c;e._self._setupProxy;return Object.entries(e.slots).length>0?t("KtHeading",{attrs:{text:"Slots",toggleStatus:e.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showSlots=!e.showSlots}}},[t("article",{staticClass:"slots-block"},e._l(Object.entries(e.slots),(function(o){var r=Object(n.a)(o,2),l=r[0],details=r[1];return t("section",{key:l},[t("div",{staticClass:"header"},[t("div",{staticClass:"header__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",{staticClass:"header__details"},[details.description?t("div",{staticClass:"header__description",domProps:{textContent:e._s(details.description)}}):t("div",{staticClass:"header__empty-description",domProps:{textContent:e._s("No description")}}),e._v(" "),null===details.scope?t("div",{staticClass:"header__empty-scope",domProps:{textContent:e._s("(Not Scoped)")}}):e._e()])]),e._v(" "),null!==details.scope?t("div",{staticClass:"scope"},e._l(Object.entries(details.scope),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1],d=c.description,m=c.type;return t("div",{key:l,staticClass:"scope__item"},[t("div",{class:"scope__type scope__type--is-".concat(m),domProps:{textContent:e._s(m)}}),e._v(" "),t("div",{staticClass:"scope__name",domProps:{textContent:e._s(l)}}),e._v(" "),t("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:e._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:e._s(d)}})])})),0):e._e()])})),0)]):e._e()}),[],!1,null,"18a948b4",null).exports;function C(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}var O=Object(_.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:w,KtHeading:y.L},props:{component:{required:!0,type:Object}},setup:function(e){return{Dashes:c.Dashes,labels:Object(_.computed)((function(){var t=[],o=e.component,n=o.meta,c=n.addedVersion,d=n.componentFolder,m=n.deprecated,f=n.designs,_=n.typeScript,h=o.name,x=null!=d?d:v()(h.replace(/^Kt/,"Kotti")),k=e.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==m&&t.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(m.version)}),null!==f?Array.isArray(f)?t.push.apply(t,Object(l.a)(f.map((function(e){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(e.title,"”"),link:e.url,right:Object(r.a)({},y.a.MetaDesignType.FIGMA,"Figma")[e.type]}})))):t.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(r.a)({},y.a.MetaDesignType.FIGMA,"Figma")[f.type]}):t.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&t.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:k?"".concat(k,"/types.ts"):void 0,right:_.namespace}),t.push(function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?C(Object(o),!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):C(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),k&&t.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(k,"/").concat(h,".vue"),right:"".concat(h,".vue")}),t})),showEmits:Object(_.ref)(!1),showProps:Object(_.ref)(!1),stringifyPropDefault:function(e,t){return"function"==typeof e?m()(t).some((function(e){return"Function"===e.name}))?"".concat(e.toString()," *"):"".concat(JSON.stringify(e())," *"):JSON.stringify(e)},stringifyType:function(e){return m()(e).map((function(e){return e.name.toLowerCase()})).join(" | ")},Yoco:h.a}}}),S=O,j=(o(893),Object(k.a)(S,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{staticClass:"component-info-container"},[t("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==e.component.meta.deprecated}},[t("h1",{staticClass:"component-info__title",domProps:{textContent:e._s(e.component.name)}}),e._v(" "),t("div",[t("div",{staticClass:"component-info__labels"},e._l(e.labels,(function(label,o){return t("div",{key:o,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[t("div",{staticClass:"component-info-label__left",domProps:{textContent:e._s(label.left)}}),e._v(" "),label.link?t("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:e._s(label.right)}}):t("div",{staticClass:"component-info-label__right",domProps:{textContent:e._s(label.right)}})])})),0)])]),e._v(" "),null!==e.component.meta.deprecated?t("article",{staticClass:"danger-block"},[t("section",[e._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),t("strong",{domProps:{textContent:e._s("v".concat(e.component.meta.deprecated.version))}})]),e._v(" "),t("section",[t("div",[t("strong",[e._v("Reason")]),e._v(": "+e._s(e.component.meta.deprecated.reason)+"\n\t\t\t")]),e._v(" "),t("div",[t("strong",{domProps:{textContent:e._s(e.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),e._v(":\n\t\t\t\t"),e._l(e.component.meta.deprecated.alternatives,(function(o){return t("code",{key:o,domProps:{textContent:e._s(o)}})})),e._v(" "),0===e.component.meta.deprecated.alternatives.length?t("span",{domProps:{textContent:e._s(e.Dashes.EmDash)}}):e._e()],2)])]):e._e(),e._v(" "),e.component.props?t("KtHeading",{attrs:{text:"Properties",toggleStatus:e.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showProps=!e.showProps}}},[t("table",[t("thead",[t("th",[e._v("Name")]),e._v(" "),t("th",[e._v("Type")]),e._v(" "),t("th",[e._v("Default")]),e._v(" "),t("th",[e._v("Validator")])]),e._v(" "),t("tbody",e._l(Object.entries(e.component.props).sort((function(e,t){var a=Object(n.a)(e,1)[0],b=Object(n.a)(t,1)[0];return a.localeCompare(b)})),(function(o){var r=Object(n.a)(o,2),l=r[0],c=r[1];return t("tr",{key:l},[t("td",[t("code",{domProps:{textContent:e._s(l)}})]),e._v(" "),t("td",[t("code",{domProps:{textContent:e._s(e.stringifyType(c.type))}})]),e._v(" "),t("td",[c.required?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("required")}}):void 0===c.default?t("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:e._s("No default")}}):t("code",{domProps:{textContent:e._s(e.stringifyPropDefault(c.default,c.type))}})]),e._v(" "),t("td",[t("div",{staticStyle:{display:"flex","align-items":"center"}},[t("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:e._s(c.validator?e.Yoco.Icon.CHECK:e.Yoco.Icon.CLOSE)}}),e._v(" "),c.validator?t("div",{domProps:{textContent:e._s(c.validator.name)}}):e._e()])])])})),0)])]):e._e(),e._v(" "),e.component.emits&&e.component.emits.length>0?t("KtHeading",{attrs:{text:"Emits",toggleStatus:e.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(t){e.showEmits=!e.showEmits}}},[t("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[e._l(e.component.emits,(function(o){return[t("code",{key:o,domProps:{textContent:e._s("@".concat(o))}})]}))],2)]):e._e(),e._v(" "),t("ComponentInfoSlots",{attrs:{slots:e.component.meta.slots}})],1)}),[],!1,null,"6e674bb8",null));t.a=j.exports},891:function(e,t,o){"use strict";o(882)},892:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,".slots-block[data-v-18a948b4]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-18a948b4]{padding:.4rem .6rem}.slots-block[data-v-18a948b4]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-18a948b4]{align-items:center;display:flex;flex:1}.header__details[data-v-18a948b4]{flex:1}.header__name[data-v-18a948b4]{font-weight:700}.header>*[data-v-18a948b4]{align-items:center;display:flex}.header[data-v-18a948b4]>:not(:first-child){margin-left:.4rem}.header__description[data-v-18a948b4]{flex:1}.header__empty-description[data-v-18a948b4]{flex:1;font-style:italic}.header__empty-scope[data-v-18a948b4]{font-style:italic}.scope[data-v-18a948b4]{margin-left:1.5rem}.scope__item[data-v-18a948b4]{align-items:center;display:flex}.scope__item[data-v-18a948b4]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-18a948b4]{font-style:italic}.scope__name[data-v-18a948b4]{font-weight:700;min-width:100px}.scope__type[data-v-18a948b4]{min-width:60px}.scope__type--is-function[data-v-18a948b4]{color:var(--orange-50)}.scope__type--is-object[data-v-18a948b4]{color:var(--purple-50)}.scope__type--is-integer[data-v-18a948b4]{color:var(--green-50)}",""]),n.locals={},e.exports=n},893:function(e,t,o){"use strict";o(883)},894:function(e,t,o){var n=o(66)((function(i){return i[1]}));n.push([e.i,".component-info[data-v-6e674bb8]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-6e674bb8]{align-items:center;flex-direction:row}}.component-info>*[data-v-6e674bb8]{display:flex;margin:5px 10px}.component-info__labels[data-v-6e674bb8]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-6e674bb8]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50);-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.component-info-label[data-v-6e674bb8]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-6e674bb8],.component-info-label__right[data-v-6e674bb8]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-6e674bb8]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-6e674bb8]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-6e674bb8]{margin-bottom:32px}.component-info-container[data-v-6e674bb8]>:not(:first-child){margin-top:16px}.danger-block[data-v-6e674bb8]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-6e674bb8]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-6e674bb8]{margin-left:8px}.danger-block>section[data-v-6e674bb8]{padding:.4rem .6rem}.danger-block>section[data-v-6e674bb8]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),n.locals={},e.exports=n}}]);