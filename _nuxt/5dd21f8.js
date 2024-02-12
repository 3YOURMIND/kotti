(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1037:function(e,r,n){"use strict";n(972)},1038:function(e,r,n){var o=n(74)((function(i){return i[1]}));o.push([e.i,".colorize[data-v-1fdc510c] .color-box{background:var(--local-color);border:4px solid #fff;border-radius:50%;box-shadow:2px 2px 5px #ccc;height:50px;margin:8px;width:50px}",""]),o.locals={},e.exports=o},1096:function(e,r,n){"use strict";n.r(r);var o=n(958),t={name:"DocumenationPageFoundationsColorsTokens",data:function(){return{baseColorsFactory:o.a,tokenColorsFactory:o.d,columns:[{label:"Name",prop:"name"},{label:"Description",prop:"description"},{label:"Refers to",prop:"reference"},{label:"",prop:"reference"}]}},methods:{renderColor:function(e,r){var n=r.row,t=o.a.object[n.reference];return t?e("div",{class:"color-box",style:"--local-color: ".concat(t,";")},[" "]):"No color"},renderColorVar:function(e,r){return e("code",["--",r.value])}}},c=(n(1037),n(32)),component=Object(c.a)(t,(function(){var e=this,r=e._self._c;return r("section",[r("h1",[e._v("Color Tokens")]),e._v(" "),r("h2",[e._v("Migration")]),e._v(" "),e._m(0),e._v(" "),r("h2",[e._v("List of tokens")]),e._v(" "),r("p",[e._v("This list is automatically generated so you can consider it a source of truth.")]),e._v(" "),r("KtTable",{staticClass:"colorize",attrs:{rows:e.tokenColorsFactory.array}},[r("KtTableColumn",{attrs:{label:"Name",renderCell:e.renderColorVar,prop:"name"}}),e._v(" "),r("KtTableColumn",{attrs:{label:"Refers to",renderCell:e.renderColorVar,prop:"reference"}}),e._v(" "),r("KtTableColumn",{attrs:{label:"Color",prop:"",renderCell:e.renderColor}}),e._v(" "),r("KtTableColumn",{attrs:{label:"Description",prop:"description"}})],1),e._v(" "),r("h2",[e._v("CSS custom properties generated")]),e._v(" "),r("p",[e._v("Again, these are automatically generated so it can be considered source of truth.")]),e._v(" "),r("pre",{staticClass:"long"},[e._v("/* Base colors */\n\n"+e._s(e.baseColorsFactory.string)+"\n\n/* Token colors */\n\n"+e._s(e.tokenColorsFactory.string)+"\n")])],1)}),[function(){var e=this,r=e._self._c;return r("p",[e._v("Old scss variables will still be available but we will drop support in the next major release. "),r("br"),r("br"),e._v("\nWe encourage you to replace usage of kotti colors with kotti color tokens.")])}],!1,null,"1fdc510c",null);r.default=component.exports},958:function(e,r,n){"use strict";n.d(r,"a",(function(){return v})),n.d(r,"d",(function(){return h})),n.d(r,"b",(function(){return k})),n.d(r,"c",(function(){return C}));n(334),n(233),n(335),n(333),n(228),n(230),n(231);var o,t=n(967),c=n.n(t),l={white:"#FFF",black:"#000","gray-10":"#F8F8F8","gray-20":"#E0E0E0","gray-30":"#C6C6C6","gray-40":"#A8A8A8","gray-50":"#8D8D8D","gray-60":"#6F6F6F","gray-70":"#525252","gray-80":"#393939","gray-90":"#262626","gray-100":"#141414","primary-10":"#EAF0FA","primary-20":"#C1D7FB","primary-30":"#AFC5E8","primary-40":"#6795E0","primary-50":"#3173DE","primary-60":"#2C66C4","primary-70":"#2659AB","primary-80":"#1F55AD","primary-90":"#153C7A","primary-100":"#0D244A","green-20":"#C4E0A5","green-50":"#71C716","green-60":"#64AD13","green-70":"#549410","red-20":"#F0A8A8","red-50":"#F21D1D","red-60":"#D91919","red-70":"#BF1717","purple-20":"#B995CA","purple-50":"#932DC2","purple-60":"#6C218F","purple-70":"#591B75","yellow-20":"#FFF9C0","yellow-50":"#FFF490","yellow-60":"#FFE60D","yellow-70":"#DFC903","orange-20":"#FAB980","orange-50":"#FF9333","orange-60":"#FF7800","orange-70":"#BA6820"},d=[{name:"ui-background",description:"Page background",reference:"white"},{name:"ui-01",description:"Secondary page\nBackground 2",reference:"gray-10"},{name:"ui-02",description:"Subtle border\nBackground 3",reference:"gray-20"},{name:"ui-03",description:"Medium contrast border",reference:"gray-50"},{name:"ui-04",description:"High contrast border",reference:"gray-60"},{name:"ui-05",description:"Lightly colored background",reference:"primary-10"},{name:"text-01",description:"Primary text\nHeaders",reference:"gray-80"},{name:"text-02",description:"Secondary text\nForm labels",reference:"gray-60"},{name:"text-03",description:"Tertiary text\nHelp text\nPlaceholder text",reference:"gray-40"},{name:"text-04",description:"Text on interactive colors",reference:"white"},{name:"text-05",description:"Disabled text",reference:"gray-30"},{name:"interactive-01",description:"Primary interactive color\nPrimary buttons\nChecked color",reference:"primary-60"},{name:"interactive-01-hover",description:"Hover for Interactive-01",reference:"primary-70"},{name:"interactive-02",description:"Secondary interactive color\nSecondary button",reference:"gray-10"},{name:"interactive-02-hover",description:"Hover for Interactive-02",reference:"primary-10"},{name:"interactive-03",description:"Selected elements\nActive elements\nAccent icons",reference:"primary-50"},{name:"interactive-04",description:"Selected elements light\n Alternative border",reference:"primary-20"},{name:"interactive-05",description:"Active element border",reference:"primary-40"},{name:"danger",description:"Danger button background",reference:"red-50"},{name:"hover-danger",description:"Danger hover",reference:"red-70"},{name:"link-01",description:"Primary links\nText buttons",reference:"primary-60"},{name:"link-02",description:"Secondary links",reference:"gray-50"},{name:"link-03",description:"Active link",reference:"primary-50"},{name:"link-04",description:"Dark background link",reference:"primary-40"},{name:"link-05",description:"Dark background active link",reference:"primary-30"},{name:"icon-01",description:"Primary icon",reference:"gray-80"},{name:"icon-02",description:"Secondary icon",reference:"gray-50"},{name:"icon-03",description:"Icons on interactive colors",reference:"white"},{name:"support-error",description:"Error",reference:"red-50"},{name:"support-error-dark",description:"Error dark",reference:"red-70"},{name:"support-error-light",description:"Error light",reference:"red-20"},{name:"support-warning",description:"Warning",reference:"orange-50"},{name:"support-warning-dark",description:"Warning dark",reference:"orange-70"},{name:"support-warning-light",description:"Warning light",reference:"orange-20"},{name:"support-success",description:"Success",reference:"green-50"},{name:"support-success-dark",description:"Success dark",reference:"green-70"},{name:"support-success-light",description:"Success light",reference:"green-20"},{name:"support-info",description:"Information",reference:"primary-50"},{name:"support-info-dark",description:"Information dark",reference:"primary-70"},{name:"support-info-light",description:"Information light",reference:"primary-20"}],m=n(20),f=(n(232),n(523),n(522),function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"reference";return e.map((function(e){return"--".concat(e.name,": ").concat("reference"===r?"var(--".concat(e.reference,")"):e.value,";")})).join("\n")}),y=function(e){return Object.entries(e).map((function(e){var r=Object(m.a)(e,2);return{name:r[0],value:r[1]}}))},v={object:l,array:y(l),string:f(y(l),"color")},h={object:(o=d,Object.fromEntries(o.map((function(e){return[e.name,e.value||e.reference]})))),array:d,string:f(d)},k=("\n".concat(v.string,"\n\n\n").concat(h.string),function(e,r){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],output=[];return e.array.forEach((function(e){var o=e.name.split("--").join("");n&&(o=o.split("-").join(" / "));var t=e.reference?r.object[e.reference]:e.value,l=c()(t).rgb().object(),d=e.description?"".concat(e.description,".\nOriginal color: '").concat(e.reference,"'"):"";output.push({name:o,description:d,color:l})})),output}),C=k(h,v)},972:function(e,r,n){var content=n(1038);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(75).default)("522403e6",content,!0,{sourceMap:!1})}}]);