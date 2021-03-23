(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{645:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.Ki=Math.pow(1024,1)]="Ki",e[e.Mi=Math.pow(1024,2)]="Mi",e[e.Gi=Math.pow(1024,3)]="Gi",e[e.Ti=Math.pow(1024,4)]="Ti",e[e.Pi=Math.pow(1024,5)]="Pi",e[e.Ei=Math.pow(1024,6)]="Ei",e[e.Zi=Math.pow(1024,7)]="Zi",e[e.Yi=Math.pow(1024,8)]="Yi"}(t.BinaryPrefixes||(t.BinaryPrefixes={})),function(e){e[e.DAYS_PER_WEEK=7]="DAYS_PER_WEEK",e[e.HOURS_PER_DAY=24]="HOURS_PER_DAY",e[e.MINUTES_PER_HOUR=60]="MINUTES_PER_HOUR",e[e.SECONDS_PER_MINUTE=60]="SECONDS_PER_MINUTE",e[e.MILLISECONDS_PER_SECOND=1e3]="MILLISECONDS_PER_SECOND",e[e.MICROSECONDS_PER_MILLISECOND=1e3]="MICROSECONDS_PER_MILLISECOND",e[e.NANOSECONDS_PER_MICROSECOND=1e3]="NANOSECONDS_PER_MICROSECOND",e[e.HOURS_PER_WEEK=168]="HOURS_PER_WEEK",e[e.MINUTES_PER_WEEK=10080]="MINUTES_PER_WEEK",e[e.MINUTES_PER_DAY=1440]="MINUTES_PER_DAY",e[e.SECONDS_PER_WEEK=604800]="SECONDS_PER_WEEK",e[e.SECONDS_PER_DAY=86400]="SECONDS_PER_DAY",e[e.SECONDS_PER_HOUR=3600]="SECONDS_PER_HOUR",e[e.MILLISECONDS_PER_WEEK=6048e5]="MILLISECONDS_PER_WEEK",e[e.MILLISECONDS_PER_DAY=864e5]="MILLISECONDS_PER_DAY",e[e.MILLISECONDS_PER_HOUR=36e5]="MILLISECONDS_PER_HOUR",e[e.MILLISECONDS_PER_MINUTE=6e4]="MILLISECONDS_PER_MINUTE",e[e.MICROSECONDS_PER_WEEK=6048e8]="MICROSECONDS_PER_WEEK",e[e.MICROSECONDS_PER_DAY=864e8]="MICROSECONDS_PER_DAY",e[e.MICROSECONDS_PER_HOUR=36e8]="MICROSECONDS_PER_HOUR",e[e.MICROSECONDS_PER_MINUTE=6e7]="MICROSECONDS_PER_MINUTE",e[e.MICROSECONDS_PER_SECOND=1e6]="MICROSECONDS_PER_SECOND",e[e.NANOSECONDS_PER_WEEK=6048e11]="NANOSECONDS_PER_WEEK",e[e.NANOSECONDS_PER_DAY=864e11]="NANOSECONDS_PER_DAY",e[e.NANOSECONDS_PER_HOUR=36e11]="NANOSECONDS_PER_HOUR",e[e.NANOSECONDS_PER_MINUTE=6e10]="NANOSECONDS_PER_MINUTE",e[e.NANOSECONDS_PER_SECOND=1e9]="NANOSECONDS_PER_SECOND",e[e.NANOSECONDS_PER_MILLISECOND=1e6]="NANOSECONDS_PER_MILLISECOND"}(t.TimeConversion||(t.TimeConversion={}))},646:function(e,t,o){var content=o(698);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(103).default)("5fd46922",content,!0,{sourceMap:!1})},647:function(e,t,o){var content=o(700);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(103).default)("0bfdf2fe",content,!0,{sourceMap:!1})},697:function(e,t,o){"use strict";var l=o(646);o.n(l).a},698:function(e,t,o){(t=o(102)(!1)).push([e.i,".color-palette[data-v-5af78660]{margin:1rem 0}.color-palette__title[data-v-5af78660]{font-size:1em;line-height:1.55em;color:#8f8f8f}.color-palette__block[data-v-5af78660]{box-sizing:border-box;display:block;height:2.4rem;padding:0 .8rem;margin:.1rem 0;font-size:.875em;color:#fff}.color-palette__block:hover .color-palette__code[data-v-5af78660]{display:inline}.color-palette__name[data-v-5af78660]{float:left;line-height:2.4rem}.color-palette__code[data-v-5af78660]{display:none;float:right;width:50%;line-height:2.4rem;text-align:right}.slide-fade-enter-active[data-v-5af78660]{transition:all .3s ease}.slide-fade-leave-active[data-v-5af78660]{transition:all .2s cubic-bezier(1,.5,.8,1)}.slide-fade-enter[data-v-5af78660],.slide-fade-leave-to[data-v-5af78660]{opacity:0;transform:translateX(100px)}",""]),e.exports=t},699:function(e,t,o){"use strict";var l=o(647);o.n(l).a},700:function(e,t,o){(t=o(102)(!1)).push([e.i,".example-wrapper[data-v-255702fc]{padding:2rem 0;margin-bottom:1rem;background:#f8f8f8}.example-content[data-v-255702fc]{width:90%;max-width:480px;padding:.8rem;margin:0 auto}.example-content div[data-v-255702fc]{padding:.8rem}.example-content.light[data-v-255702fc]{background:#fff;border:1px solid #dbdbdb}.example-content.color[data-v-255702fc]{background:#2c66c4}.example-content.dark[data-v-255702fc]{background:#3d3d3d}.example-content.icon[data-v-255702fc]{padding:0;background:#fff;border:1px solid #dbdbdb}",""]),e.exports=t},805:function(e,t,o){"use strict";o.r(t);o(138);var l=o(645),r={name:"ColorPalette",props:{colorName:String,colors:Array},data:function(){return{copySuccess:!1}},methods:{copyColor:function(e){var t=this,o="".concat(e);this.$copyText(o).then((function(){t.copySuccess=!0,setTimeout((function(){t.copySuccess=!1}),l.TimeConversion.MILLISECONDS_PER_SECOND)}),(function(){alert("failed")}))},textColor:function(e){if("Lightgrey-300"===e||"Lightgrey-400"===e||"White-000"===e||"Yellow-300"===e||"Yellow-400"===e)return"#3d3d3d"}}},c=(o(697),o(46)),n=Object(c.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"color-palette"},[o("div",{staticClass:"color-palette__title",domProps:{textContent:e._s(e.colorName)}}),e._v(" "),e._l(e.colors,(function(t){return o("div",{key:t.name,staticClass:"color-palette__block c-hand",style:{background:t.code,color:e.textColor(t.name)},on:{click:function(o){return e.copyColor(t.code)}}},[o("div",{staticClass:"color-palette__name",domProps:{textContent:e._s(t.name)}}),e._v(" "),o("div",{staticClass:"color-palette__code",domProps:{textContent:e._s(t.code)}})])})),e._v(" "),o("transition",{attrs:{name:"slide-fade"}},[e.copySuccess?o("div",{staticClass:"success-message"},[e._v("Copy successful")]):e._e()])],2)}),[],!1,null,"5af78660",null).exports,_={name:"ColorUsage"},d=(o(699),{name:"Color",components:{ColorPalette:n,ColorUsage:Object(c.a)(_,(function(){var e=this.$createElement;this._self._c;return this._m(0)}),[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("h2",[e._v("Color Usage")]),e._v(" "),o("h3",[e._v("Meaning")]),e._v(" "),o("ul",[o("li",[o("b",[e._v("Primary Blue:")]),e._v(" A primary color/brand color, which delivers brand\n\t\t\tvalue.\n\t\t")]),e._v(" "),o("li",[o("b",[e._v("Green:")]),e._v(" Success or progress, which gives positive feedback.")]),e._v(" "),o("li",[o("b",[e._v("Red:")]),e._v(" signals attention or danger.")]),e._v(" "),o("li",[o("b",[e._v("Darkgrey:")]),e._v(" neutral color.")]),e._v(" "),o("li",[o("b",[e._v("Lightgrey:")]),e._v(" neutral color.")])]),e._v(" "),o("h3",[e._v("Dark text on light background")]),e._v(" "),o("div",{staticClass:"example-wrapper"},[o("div",{staticClass:"example-content light"},[o("div",{staticStyle:{color:"#3d3d3d"}},[e._v("\n\t\t\t\tDefault text "),o("code",[e._v("Darkgrey-500")])]),e._v(" "),o("div",{staticStyle:{color:"#575757"}},[e._v("\n\t\t\t\tSecondary text "),o("code",[e._v("Darkgrey-400")])]),e._v(" "),o("div",{staticStyle:{color:"#8a8a8a"}},[e._v("\n\t\t\t\tDisabled / hint text "),o("code",[e._v("Darkgrey-300")])])])]),e._v(" "),o("p",[e._v("\n\t\tDepends on text meaning and hierarchy, there are three different types:\n\t")]),e._v(" "),o("ul",[o("li",[o("b",[e._v("Default text")]),e._v(" should be "),o("code",[e._v("Darkgrey-500")]),e._v(".")]),e._v(" "),o("li",[o("b",[e._v("Secondary text, which is lower in the visual hierarchy,")]),e._v(" uses\n\t\t\t"),o("code",[e._v("Darkgrey-400")]),e._v(".\n\t\t")]),e._v(" "),o("li",[o("b",[e._v("Disabled / hint text")]),e._v(" should be "),o("code",[e._v("Darkgrey-300")]),e._v(".")])]),e._v(" "),o("h3",[e._v("Light text on dark background")]),e._v(" "),o("div",{staticClass:"example-wrapper"},[o("div",{staticClass:"example-content dark"},[o("div",{staticStyle:{color:"#f8f8f8"}},[e._v("\n\t\t\t\tDefault text "),o("code",[e._v("LightGrey-300")])]),e._v(" "),o("div",{staticStyle:{color:"#dbdbdb"}},[e._v("\n\t\t\t\tSecondary text "),o("code",[e._v("Lightgrey-400")])]),e._v(" "),o("div",{staticStyle:{color:"#a8a8a8"}},[e._v("\n\t\t\t\tDisabled / hint text "),o("code",[e._v("Lightgrey-500")])])])]),e._v(" "),o("p",[e._v("Similar to light text, there are three different types:")]),e._v(" "),o("ul",[o("li",[o("b",[e._v("Default text")]),e._v(" should be "),o("code",[e._v("Lightgrey-300")]),e._v(".")]),e._v(" "),o("li",[o("b",[e._v("Secondary text")]),e._v(" uses "),o("code",[e._v("Lightgrey-400")]),e._v(".")]),e._v(" "),o("li",[o("b",[e._v("Disabled / hint text")]),e._v(" should be "),o("code",[e._v("Lightgrey-500")]),e._v(".")])]),e._v(" "),o("h3",[e._v("Light text on color background")]),e._v(" "),o("div",{staticClass:"example-wrapper"},[o("div",{staticClass:"example-content color"},[o("div",{staticStyle:{color:"#ffffff"}},[e._v("\n\t\t\t\tDefault text "),o("code",[e._v("White, Opacity: 100%")])]),e._v(" "),o("div",{staticStyle:{color:"#ffffff",opacity:"0.68"}},[e._v("\n\t\t\t\tSecondary text "),o("code",[e._v("White, Opacity: 68%")])]),e._v(" "),o("div",{staticStyle:{color:"#ffffff",opacity:"0.46"}},[e._v("\n\t\t\t\tDisabled / hint text "),o("code",[e._v("White, Opacity: 46%")])])])]),e._v(" "),o("p",[e._v("Same as light text, there are three different types:")]),e._v(" "),o("ul",[o("li",[o("b",[e._v("Default text")]),e._v(" should be\n\t\t\t"),o("code",[e._v("white color with opacity 100%")]),e._v(".\n\t\t")]),e._v(" "),o("li",[o("b",[e._v("Secondary text")]),e._v(" uses "),o("code",[e._v("white color with opacity 68%")]),e._v(".\n\t\t")]),e._v(" "),o("li",[o("b",[e._v("Disabled / hint text")]),e._v(" should be\n\t\t\t"),o("code",[e._v("white color with opacity 46%")]),e._v(".\n\t\t")])]),e._v(" "),o("h3",[e._v("Icon color")]),e._v(" "),o("div",{staticClass:"example-wrapper"},[o("div",{staticClass:"example-content icon"},[o("div",{staticStyle:{background:"#f8f8f8"}},[o("i",{staticClass:"yoco",staticStyle:{color:"#8a8a8a"}},[e._v("file")]),e._v(" "),o("span",[e._v(" file_name.pdf")])]),e._v(" "),o("div",{staticStyle:{color:"#fff",background:"#2c66c4"}},[o("i",{staticClass:"yoco"},[e._v("announce")]),e._v(" "),o("span",[e._v(" Announce new icons.")])]),e._v(" "),o("div",{staticStyle:{color:"#2c66c4"}},[o("i",{staticClass:"yoco"},[e._v("print")]),e._v(" "),o("span",[e._v(" Print invoice.")])])])]),e._v(" "),o("p",[e._v("\n\t\tDepends on the meaning and visual hierarchy, icon should match the\n\t\tfollowing rules:\n\t")]),e._v(" "),o("ul",[o("li",[o("b",[e._v("If icon is supplementary to default text:")]),e._v(" Icon color should be\n\t\t\t"),o("code",[e._v("Darkgrey-300")]),e._v(".\n\t\t")]),e._v(" "),o("li",[o("b",[e._v("If icon has color background:")]),e._v(" Icon color is "),o("code",[e._v("White")]),e._v(".\n\t\t")]),e._v(" "),o("li",[o("b",[e._v("If text has color or status:")]),e._v(" Icon color should math to its text.\n\t\t")])])])}],!1,null,"255702fc",null).exports},data:function(){return{primaryColor:[{name:"Primary-300",code:"#AFC5E8"},{name:"Primary-400",code:"#3173DE"},{name:"Primary-500",code:"#2C66C4"},{name:"Primary-600",code:"#2659AB"}],greenColor:[{name:"Green-300",code:"#C4E0A5"},{name:"Green-400",code:"#71C716"},{name:"Green-500",code:"#64AD13"},{name:"Green-600",code:"#549410"}],redColor:[{name:"Red-300",code:"#F0A8A8"},{name:"Red-400",code:"#F21D1D"},{name:"Red-500",code:"#D91919"},{name:"Red-600",code:"#BF1717"}],orangeColor:[{name:"Orange-300",code:"#FFAE66"},{name:"Orange-400",code:"#FF9333"},{name:"Orange-500",code:"#FF7800"},{name:"Orange-600",code:"#D37D30"}],purpleColor:[{name:"Purple-300",code:"#B995CA"},{name:"Purple-400",code:"#932DC2"},{name:"Purple-500",code:"#6C218F"},{name:"Purple-600",code:"#591B75"}],darkGray:[{name:"Darkgray-300",code:"#8A8A8A"},{name:"Darkgray-400",code:"#575757"},{name:"Darkgray-500",code:"#3D3D3D"},{name:"Darkgray-600",code:"#242424"}],lightGray:[{name:"Lightgray-300",code:"#F8F8F8"},{name:"Lightgray-400",code:"#DBDBDB"},{name:"Lightgray-500",code:"#A8A8A8"},{name:"Lightgray-600",code:"#5C5C5C"}],neutrals:[{name:"White-000",code:"#FFFFFF"},{name:"Black-000",code:"#000000"}],yellowColor:[{name:"Yellow-300",code:"#FFF9C0"},{name:"Yellow-400",code:"#FFF490"},{name:"Yellow-500",code:"#FFE60D"},{name:"Yellow-600",code:"#DFC903"}]}}}),v=Object(c.a)(d,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"color"},[o("h1",[e._v("Colors")]),e._v(" "),o("h2",[e._v("Primary Color")]),e._v(" "),e._m(0),e._v(" "),o("h2",[e._v("Color Palettes")]),e._v(" "),o("h3",[e._v("Naming convention")]),e._v(" "),e._m(1),e._v(" "),o("h3",[e._v("Palettes")]),e._v(" "),o("div",{staticClass:"columns"},[o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Prirmary Blue",colors:e.primaryColor}}),e._v(" "),o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Green",colors:e.greenColor}}),e._v(" "),o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Red",colors:e.redColor}}),e._v(" "),o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Orange",colors:e.orangeColor}}),e._v(" "),o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Yellow",colors:e.yellowColor}}),e._v(" "),o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Purple",colors:e.purpleColor}})],1),e._v(" "),o("div",{staticClass:"columns"},[o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Dark Gray",colors:e.darkGray}}),e._v(" "),o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Light Gray",colors:e.lightGray}}),e._v(" "),o("ColorPalette",{staticClass:"column col-md-12 col-4",attrs:{colorName:"Neutrals",colors:e.neutrals}})],1),e._v(" "),o("ColorUsage")],1)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("p",[this._v("\n\t\t\tKotti uses "),t("code",[this._v("Primary Blue")]),this._v(" as the main design color which also\n\t\t\tmatch the 3YOURMIND brand color. We don't recommend against using\n\t\t\tmultiple colors in one page, but they should be limited to less than\n\t\t\t20%.\n\t\t")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("p",[this._v("\n\t\t\tThe colors in each palette have the same hue but different saturation\n\t\t\tand lightness. Palettes start with a primary color, then continue in the\n\t\t\tspectrum to create a complete and usable set of colors. An example color\n\t\t\tname is "),t("code",[this._v("ColorName-number")]),this._v(". "),t("code",[this._v("ColorName")]),this._v(" represents\n\t\t\tthe hue, and "),t("code",[this._v("number")]),this._v(" represents the lightness. A smaller\n\t\t\tnumber means lighter, and a greater number means darker.\n\t\t")])])}],!1,null,null,null);t.default=v.exports}}]);