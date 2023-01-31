(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{966:function(e,t,o){"use strict";o.r(t);var n={name:"DocumenationPageFoundationsColorsTheming",data:function(){return{navbarBackground:null,navbarColor:null,navbarLightColor:null,navbarBorder:null,navbarColorActive:null,colors:[{label:"Default",value:null},{label:"Blue",value:"#001f3f"},{label:"Red",value:"#FF4136"},{label:"Green",value:"#2ECC40"},{label:"Teal",value:"#39CCCC"},{label:"White",value:"white"},{label:"Black",value:"#111111"}]}}},l=o(56),component=Object(l.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",[o("h1",[e._v("Theming")]),e._v(" "),o("p",[e._v("You can apply your own theme to the kotti design system.\nSince we are defining design tokens with CSS custom properties, you can override any of them easily, on the fly.")]),e._v(" "),o("h2",[e._v("Method 1: CSS file")]),e._v(" "),o("p",[e._v("One easy way of theming kotti component is to overwrite custom props using CSS diretcly. You will need to load this file after loading kotti CSS tho.")]),e._v(" "),o("p",[e._v("Example:")]),e._v(" "),e._m(0),e._v(" "),o("p",[e._v("or")]),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),o("h2",[e._v("Demo")]),e._v(" "),o("p",[e._v("Stylise the navbar with the select fields:")]),e._v(" "),o("KtFieldSingleSelect",{attrs:{isOptional:"",label:"Navbar Background",options:e.colors},model:{value:e.navbarBackground,callback:function(t){e.navbarBackground=t},expression:"navbarBackground"}}),e._v(" "),o("KtFieldSingleSelect",{attrs:{isOptional:"",label:"Navbar Color",options:e.colors},model:{value:e.navbarColor,callback:function(t){e.navbarColor=t},expression:"navbarColor"}}),e._v(" "),o("KtFieldSingleSelect",{attrs:{isOptional:"",label:"Navbar Light Color",options:e.colors},model:{value:e.navbarLightColor,callback:function(t){e.navbarLightColor=t},expression:"navbarLightColor"}}),e._v(" "),o("KtFieldSingleSelect",{attrs:{isOptional:"",label:"Navbar Border Color",options:e.colors},model:{value:e.navbarBorder,callback:function(t){e.navbarBorder=t},expression:"navbarBorder"}}),e._v(" "),o("KtFieldSingleSelect",{attrs:{isOptional:"",label:"Navbar Color Active",options:e.colors},model:{value:e.navbarColorActive,callback:function(t){e.navbarColorActive=t},expression:"navbarColorActive"}}),e._v(" "),o("KtTheme",{attrs:{customProperties:{"navbar-background":e.navbarBackground,"navbar-color":e.navbarColor,"navbar-color-light":e.navbarLightColor,"navbar-border":e.navbarBorder,"navbar-color-active":e.navbarColorActive}}})],1)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",{staticClass:"language-css"},[t("span",{staticClass:"hljs-selector-class"},[this._v(".kt-navbar")]),this._v(" {\n\t"),t("span",{staticClass:"hljs-attribute"},[this._v("--navbar-background")]),this._v(": red;\n\t"),t("span",{staticClass:"hljs-attribute"},[this._v("--navbar-color")]),this._v(": blue;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",{staticClass:"language-css"},[t("span",{staticClass:"hljs-selector-pseudo"},[this._v(":root")]),this._v(" {\n\t"),t("span",{staticClass:"hljs-attribute"},[this._v("--navbar-background")]),this._v(": red;\n\t"),t("span",{staticClass:"hljs-attribute"},[this._v("--navbar-color")]),this._v(": blue;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",[this._v("Method 2: Using the "),t("code",[this._v("KtTheme")]),this._v(" component (deprecated)")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("CSS custom props can be get and set using javascript. We take advantage of that in our "),t("code",[this._v("KtTheme")]),this._v(" component.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("You can pass a key-value object to the component and the component will "),t("code",[this._v("setProperty")]),this._v(" on "),t("code",[this._v(":root")]),this._v(" for you.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",{staticClass:"language-vue"},[this._v("<KtTheme\n\t:customProperties=\"{ 'navbar-background': 'red', 'navbar-color': 'blue' }\"\n/>\n")])])}],!1,null,null,null);t.default=component.exports}}]);