(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{728:function(t,e,n){var content=n(733);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(115).default)("c5a5ccd2",content,!0,{sourceMap:!1})},729:function(t,e,n){var content=n(735);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(115).default)("5ab1c5c8",content,!0,{sourceMap:!1})},730:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var o=n(336);var r=n(402);function c(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},731:function(t,e,n){var o=n(490);t.exports=function(){if(!arguments.length)return[];var t=arguments[0];return o(t)?t:[t]}},732:function(t,e,n){"use strict";var o=n(728);n.n(o).a},733:function(t,e,n){(e=n(114)(!1)).push([t.i,".slots-block[data-v-b328c096]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-b328c096]{padding:.4rem .6rem}.slots-block[data-v-b328c096]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-b328c096]{display:flex;flex:1;align-items:center}.header__details[data-v-b328c096]{flex:1}.header__name[data-v-b328c096]{font-weight:700}.header>*[data-v-b328c096]{display:flex;align-items:center}.header[data-v-b328c096]>:not(:first-child){margin-left:.4rem}.header__description[data-v-b328c096]{flex:1}.header__empty-description[data-v-b328c096]{flex:1;font-style:italic}.header__empty-scope[data-v-b328c096]{font-style:italic}.scope[data-v-b328c096]{margin-left:1.5rem}.scope__item[data-v-b328c096]{display:flex;align-items:center}.scope__item[data-v-b328c096]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-b328c096]{font-style:italic}.scope__name[data-v-b328c096]{min-width:100px;font-weight:700}.scope__type[data-v-b328c096]{min-width:60px}.scope__type--is-function[data-v-b328c096]{color:var(--orange-50)}.scope__type--is-object[data-v-b328c096]{color:var(--purple-50)}.scope__type--is-integer[data-v-b328c096]{color:var(--green-50)}",""]),t.exports=e},734:function(t,e,n){"use strict";var o=n(729);n.n(o).a},735:function(t,e,n){(e=n(114)(!1)).push([t.i,".component-info[data-v-097dbb28]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-097dbb28]{flex-direction:row;align-items:center}}.component-info>*[data-v-097dbb28]{display:flex;margin:5px 10px}.component-info__labels[data-v-097dbb28]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-097dbb28]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-097dbb28]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info-label__left[data-v-097dbb28],.component-info-label__right[data-v-097dbb28]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-097dbb28]:hover{text-decoration:underline}.component-info-label__left[data-v-097dbb28]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info-container[data-v-097dbb28]{margin-bottom:32px}.component-info-container[data-v-097dbb28]>:not(:first-child){margin-top:16px}.danger-block[data-v-097dbb28]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-097dbb28]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-097dbb28]{margin-left:8px}.danger-block>section[data-v-097dbb28]{padding:.4rem .6rem}.danger-block>section[data-v-097dbb28]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},736:function(t,e,n){"use strict";n(335),n(489),n(154),n(224),n(273),n(116),n(223),n(401),n(274);var o=n(98),r=n(730),c=n(334),l=n(5),d=n(275),v=n(0),_=n(731),m=n.n(_),f=n(403),h=n.n(f),C=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(v.ref)(!1)}}}),x=(n(732),n(69)),y=Object(x.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return Object.entries(t.slots).length>0?n("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[n("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var o=e[0],details=e[1];return n("section",{key:o},[n("div",{staticClass:"header"},[n("div",{staticClass:"header__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",{staticClass:"header__details"},[details.description?n("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):n("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?n("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?n("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(e){var o=e[0],r=e[1],c=r.description,l=r.type;return n("div",{key:o,staticClass:"scope__item"},[n("div",{class:"scope__type scope__type--is-"+l,domProps:{textContent:t._s(l)}}),t._v(" "),n("div",{staticClass:"scope__name",domProps:{textContent:t._s(o)}}),t._v(" "),n("div",null===c?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(c)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"b328c096",null).exports;function j(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var k=Object(v.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:y},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(v.computed)((function(){var e=[],n=t.component,l=n.meta,d=l.addedVersion,v=l.componentFolder,_=l.deprecated,m=l.designs,f=l.typeScript,C=n.name,x=null!=v?v:h()(C.replace(/^Kt/,"Kotti")),y=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==_&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(_.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(r.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(o.a)({},c.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(o.a)({},c.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),f&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:y?"".concat(y,"/types.ts"):void 0,right:f.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?j(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):j(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),y&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(y,"/").concat(C,".vue"),right:"".concat(C,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?m()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return m()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:l.Yoco}}}),w=(n(734),Object(x.a)(k,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-info-container"},[n("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[n("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),n("div",[n("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return n("div",{key:e,staticClass:"component-info-label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[n("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?n("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):n("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?n("article",{staticClass:"danger-block"},[n("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),n("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),n("section",[n("div",[n("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),n("div",[n("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return n("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?n("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),n("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?n("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[n("table",[n("thead",[n("th",[t._v("Name")]),t._v(" "),n("th",[t._v("Type")]),t._v(" "),n("th",[t._v("Default")]),t._v(" "),n("th",[t._v("Validator")])]),t._v(" "),n("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var o=e[0],r=e[1];return n("tr",{key:o},[n("td",[n("code",{domProps:{textContent:t._s(o)}})]),t._v(" "),n("td",[n("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),n("td",[r.required?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?n("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):n("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),n("td",[n("div",{staticStyle:{display:"flex","align-items":"center"}},[n("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?n("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"097dbb28",null));e.a=w.exports},778:function(t,e,n){var content=n(932);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(115).default)("08c07129",content,!0,{sourceMap:!1})},931:function(t,e,n){"use strict";var o=n(778);n.n(o).a},932:function(t,e,n){(e=n(114)(!1)).push([t.i,".line-description[data-v-657fbb36]{margin:1.5rem 0 .5rem}",""]),t.exports=e},973:function(t,e,n){"use strict";n.r(e);var o=n(257),r=n(0),c=n(736),l=Object(r.defineComponent)({name:"DocumentationPageUsageComponentsLine",components:{ComponentInfo:c.a},setup:function(){return{component:o.a,handleClick:function(text){alert(text)}}}}),d=(n(931),n(69)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("p",[t._v("Use a horizontal line as a separator between rows, to create a better information structure.")]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"element-example white"},[n("div",{staticClass:"line-description",domProps:{textContent:t._s("Full Line")}}),t._v(" "),n("KtLine"),t._v(" "),n("div",{staticClass:"line-description",domProps:{textContent:t._s("Title in center position")}}),t._v(" "),n("KtLine",{attrs:{text:"Title Center"}}),t._v(" "),n("div",{staticClass:"line-description",domProps:{textContent:t._s("Title in left position")}}),t._v(" "),n("KtLine",{attrs:{position:"left",text:"Title Left"}}),t._v(" "),n("div",{staticClass:"line-description",domProps:{textContent:t._s("Title in right position")}}),t._v(" "),n("KtLine",{attrs:{position:"right",text:"Title Right"}}),t._v(" "),n("div",{staticClass:"line-description",domProps:{textContent:t._s("Interactive title in center position")}}),t._v(" "),n("KtLine",{attrs:{isInteractive:"",text:"Action Center"},on:{click:function(e){return t.handleClick("clicked center title")}}}),t._v(" "),n("div",{staticClass:"line-description",domProps:{textContent:t._s("Interactive title in left position")}}),t._v(" "),n("KtLine",{attrs:{isInteractive:"",position:"left",text:"Action Left"},on:{click:function(e){return t.handleClick("clicked left title")}}}),t._v(" "),n("div",{staticClass:"line-description",domProps:{textContent:t._s("Interactive title in right position")}}),t._v(" "),n("KtLine",{attrs:{isInteractive:"",position:"right",text:"Action Right"},on:{click:function(e){return t.handleClick("clicked right title")}}})],1),t._v(" "),t._m(1)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("You can add "),e("code",[this._v("text")]),this._v(" to "),e("code",[this._v("KtLine")]),this._v(" to display the text in the middle.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[t._v("\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtLine")]),t._v("/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtLine")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Title Center"')]),t._v(" />")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtLine")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("position")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"left"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Title Left"')]),t._v(" />")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtLine")]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("position")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"right"')]),t._v(" "),n("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Title Right"')]),t._v(" />")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtLine")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isInteractive")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Action Center"')]),t._v("\n\t\t@"),n("span",{staticClass:"hljs-attr"},[t._v("click")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v("\"alert('clicked center title')\"")]),t._v("\n\t/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtLine")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isInteractive")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("position")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"left"')]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Action Left"')]),t._v("\n\t\t@"),n("span",{staticClass:"hljs-attr"},[t._v("click")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v("\"alert('clicked left title')\"")]),t._v("\n\t/>")]),t._v("\n\t"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtLine")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isInteractive")]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("position")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"right"')]),t._v("\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("text")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Action Right"')]),t._v("\n\t\t@"),n("span",{staticClass:"hljs-attr"},[t._v("click")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v("\"alert('clicked right title')\"")]),t._v("\n\t/>")]),t._v("\n")])])}],!1,null,"657fbb36",null);e.default=component.exports}}]);