(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{1018:function(e,o,r){"use strict";r.r(o);var t=r(812),l={name:"DocumenationPageFoundationsColorsTokens",data:function(){return{baseColorsFactory:t.a,tokenColorsFactory:t.d,columns:[{label:"Name",prop:"name"},{label:"Description",prop:"description"},{label:"Refers to",prop:"reference"},{label:"",prop:"reference"}]}},methods:{renderColor:function(e,o){var r=o.row,l=t.a.object[r.reference];return l?e("div",{class:"color-box",style:"--localColor: ".concat(l,";")},[" "]):"No color"},renderColorVar:function(e,o){return e("code",["--",o.value])}}},n=(r(870),r(65)),component=Object(n.a)(l,(function(){var e=this,o=e.$createElement,r=e._self._c||o;return r("section",[r("h1",[e._v("Color Tokens")]),e._v(" "),r("h2",[e._v("Migration")]),e._v(" "),e._m(0),e._v(" "),r("h2",[e._v("List of tokens")]),e._v(" "),r("p",[e._v("This list is automatically generated so you can consider it a source of truth.")]),e._v(" "),r("KtTable",{staticClass:"colorize",attrs:{rows:e.tokenColorsFactory.array}},[r("KtTableColumn",{attrs:{label:"Name",renderCell:e.renderColorVar,prop:"name"}}),e._v(" "),r("KtTableColumn",{attrs:{label:"Refers to",renderCell:e.renderColorVar,prop:"reference"}}),e._v(" "),r("KtTableColumn",{attrs:{label:"Color",prop:"",renderCell:e.renderColor}}),e._v(" "),r("KtTableColumn",{attrs:{label:"Description",prop:"description"}})],1),e._v(" "),r("h2",[e._v("CSS custom properties generated")]),e._v(" "),r("p",[e._v("Again, these are automatically generated so it can be considered source of truth.")]),e._v(" "),r("pre",{staticClass:"long"},[e._v("/* Base colors */\n\n"+e._s(e.baseColorsFactory.string)+"\n\n/* Token colors */\n\n"+e._s(e.tokenColorsFactory.string)+"\n")])],1)}),[function(){var e=this.$createElement,o=this._self._c||e;return o("p",[this._v("Old scss variables will still be available but we will drop support in the next major release. "),o("br"),this._v("\nWe encourage you to replace usage of kotti colors with kotti color tokens.")])}],!1,null,"206e03d8",null);o.default=component.exports},753:function(e,o,r){var content=r(871);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(117).default)("6c44d3ec",content,!0,{sourceMap:!1})},870:function(e,o,r){"use strict";var t=r(753);r.n(t).a},871:function(e,o,r){(o=r(116)(!1)).push([e.i,".colorize[data-v-206e03d8]  .color-box{width:50px;height:50px;margin:8px;background:var(--localColor);border:4px solid #fff;border-radius:50%;box-shadow:2px 2px 5px #ccc}",""]),e.exports=o}}]);