(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1017:function(t,e,n){"use strict";n.r(e);var o=n(817),l={name:"DocumenationPageFoundationsColorsFigma",data:function(){return{baseColorsFactory:o.a,figma:o.c,tokenColorsFactory:o.d,figmaImportScript:"tokens.forEach(token => {\n\t// edit the style if already existing\n\tconst existingStyles = figma.getLocalPaintStyles()\n\tlet existing = existingStyles.find(style => style.name === token.name)\n\tlet figmaStyle\n\tif (existing) {\n\t\tfigmaStyle = existing\n\t} else {\n\t\tfigmaStyle = figma.createPaintStyle()\n\t}\n\n\tfigmaStyle.name = token.name\n\tfigmaStyle.description = token.description\n\n\tfigmaStyle.paints = [\n\t\t{\n\t\t\ttype: 'SOLID',\n\t\t\tcolor: {\n\t\t\t\tr: token.color.r / 255,\n\t\t\t\tg: token.color.g / 255,\n\t\t\t\tb: token.color.b / 255,\n\t\t\t},\n\t\t},\n\t]\n})"}},computed:{tokenImportableList:function(){return Object(o.b)(o.d,o.a,!0)},baseImportableList:function(){return Object(o.b)(o.a,o.a,!0)}}},r=n(65),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("h1",[t._v("Figma")]),t._v(" "),n("p",[t._v("We are using figma for proptotyping and managing our components.\nOur goal is to keep everything updated between the code and the figma files.")]),t._v(" "),n("p",[t._v("We wrote few scripts that uses the figma API to avoid us any manual work.")]),t._v(" "),n("h2",[t._v("Import into figma")]),t._v(" "),t._m(0),t._v(" "),n("h3",[t._v("Clean up old color styles")]),t._v(" "),n("p",[t._v("This snippet will help you delete every color style (paint style, also include gradients\nand patterns) on a project.")]),t._v(" "),t._m(1),t._v(" "),n("pre",{staticClass:"long"},[t._v("// remove all style from pages\nexistingStyles = figma.getLocalPaintStyles()\nexistingStyles.forEach(style=> style.remove())\n")]),t._v(" "),n("h3",[t._v("Color list")]),t._v(" "),n("p",[t._v("This is useful if you use the color importer figma plugin (TBA).")]),t._v(" "),n("h4",[t._v("Base colors")]),t._v(" "),n("pre",{staticClass:"long"},[t._v(t._s(t.baseImportableList)+"\n")]),t._v(" "),n("h4",[t._v("Tokens")]),t._v(" "),n("pre",{staticClass:"long"},[t._v(t._s(t.tokenImportableList)+"\n")]),t._v(" "),n("h3",[t._v("The script")]),t._v(" "),n("p",[t._v("This can be copy and pasted directly into the console and will import your colors.\nIt will also edit existant colors if they exists already. Name will be used to\ncheck existence.")]),t._v(" "),n("h4",[t._v("Base colors only")]),t._v(" "),n("pre",{staticClass:"long"},[t._v("tokens = "+t._s(t.baseImportableList)+"\n\n"+t._s(t.figmaImportScript)+"\n")]),t._v(" "),n("h4",[t._v("Tokens only")]),t._v(" "),n("pre",{staticClass:"long"},[t._v("tokens = "+t._s(t.tokenImportableList)+"\n\n"+t._s(t.figmaImportScript)+"\n")]),t._v(" "),n("h4",[t._v("Base colors and tokens")]),t._v(" "),n("pre",{staticClass:"long"},[t._v("tokens = "+t._s(t.baseImportableList.concat(t.tokenImportableList))+"\n\n"+t._s(t.figmaImportScript)+"\n")])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Figma let you use the "),e("code",[this._v("figma")]),this._v(" object in the console, so we can easily interact with\nthe API without even having to create or publish plugins. We'll use that feature to\neasily import the colors into figma as styles.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("strong",{staticStyle:{color:"var(--red-70)"}},[this._v("It should not be used in a production file, it is just for cleaning up tests,\nif you use it on the library file, you will break every team projects!")])])}],!1,null,null,null);e.default=component.exports}}]);