(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{735:function(t,e,o){var content=o(741);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(118).default)("6285525e",content,!0,{sourceMap:!1})},736:function(t,e,o){var content=o(743);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(118).default)("43cccb2f",content,!0,{sourceMap:!1})},737:function(t,e,o){"use strict";o(171),o(353),o(169),o(172),o(525),o(170),o(416),o(151),o(354),o(355),o(286),o(104),o(222),o(174),o(285),o(173);var n=o(75),r=o(738),l=o(352),c=o(10),_=o(739),v=o(0),d=o(88),m=Object(v.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(v.ref)(!1)}}}),h=(o(740),o(59)),f=Object(h.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"94399a1c",null).exports;function C(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var y=Object(v.defineComponent)({props:{component:{required:!0,type:Object}},components:{ComponentInfoSlots:f},setup:function(t){return{Dashes:_.Dashes,labels:Object(v.computed)((function(){var e=[],o=t.component,c=o.meta,_=c.addedVersion,v=c.deprecated,m=c.designs,h=c.typeScript,f=o.name,y=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(Object(d.kebabCase)(f.replace(/^Kt/,"Kotti"))):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==m?Array.isArray(m)?e.push.apply(e,Object(r.a)(m.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:m.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[m.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:y?"".concat(y,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):C(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===_?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(_),right:"v".concat(_)})),y&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(y,"/").concat(f,".vue"),right:"".concat(f,".vue")}),e})),showProps:Object(v.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(d.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(d.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),k=(o(742),Object(h.a)(y,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"40fb8180",null));e.a=k.exports},738:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(356);var r=o(417);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},739:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},740:function(t,e,o){"use strict";var n=o(735);o.n(n).a},741:function(t,e,o){(e=o(117)(!1)).push([t.i,".slots-block[data-v-94399a1c]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-94399a1c]{padding:.4rem .6rem}.slots-block[data-v-94399a1c]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-94399a1c]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-94399a1c],.slots-block__header__details__description[data-v-94399a1c]{flex:1}.slots-block__header__details__empty-description[data-v-94399a1c]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-94399a1c]{font-style:italic}.slots-block__header__name[data-v-94399a1c]{font-weight:700}.slots-block__header>*[data-v-94399a1c]{display:flex;align-items:center}.slots-block__header[data-v-94399a1c]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-94399a1c]{margin-left:1.5rem}.slots-block__scope__item[data-v-94399a1c]{display:flex;align-items:center}.slots-block__scope__item[data-v-94399a1c]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-94399a1c]{font-style:italic}.slots-block__scope__item__name[data-v-94399a1c]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-94399a1c]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-94399a1c]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-94399a1c]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-94399a1c]{color:var(--green-50)}",""]),t.exports=e},742:function(t,e,o){"use strict";var n=o(736);o.n(n).a},743:function(t,e,o){(e=o(117)(!1)).push([t.i,".component-info[data-v-40fb8180]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-40fb8180]{flex-direction:row;align-items:center}}.component-info>*[data-v-40fb8180]{display:flex;margin:5px 10px}.component-info__labels[data-v-40fb8180]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-40fb8180]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-40fb8180],.component-info__label__right[data-v-40fb8180]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-40fb8180]:hover{text-decoration:underline}.component-info__label__left[data-v-40fb8180]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-40fb8180]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-40fb8180]{margin-bottom:32px}.component-info-container[data-v-40fb8180]>:not(:first-child){margin-top:16px}.danger-block[data-v-40fb8180]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-40fb8180]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-40fb8180]{margin-left:8px}.danger-block>section[data-v-40fb8180]{padding:.4rem .6rem}.danger-block>section[data-v-40fb8180]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},988:function(t,e,o){"use strict";o.r(e);var n=o(352),r=o(62),l=o(269),c=o(0),_=o(737),v=Object(c.defineComponent)({name:"DocumentationPageUsageComponentsAvatar",components:{ComponentInfo:_.a},setup:function(){return{avatarData:[{name:"Beyoncé",src:"https://picsum.photos/200"},{name:"Justin",src:"https://picsum.photos/100"},{name:"Britney",src:"https://picsum.photos/130"},{name:"Shakira",src:"https://picsum.photos/140"},{name:"Rihanna",src:"https://picsum.photos/150"}],Kotti:n.a,KtAvatar:r.a,KtAvatarGroup:l.a}}}),d=o(59),component=Object(d.a)(v,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",[o("ComponentInfo",{attrs:{component:t.KtAvatar}}),t._v(" "),o("p",[t._v("Avatar is a round object to help identify the user information.")]),t._v(" "),o("h2",[t._v("Item")]),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAvatar",{staticClass:"mr-16px",attrs:{isHoverable:"",name:"Jony O'Five",src:"https://picsum.photos/200/100"}}),t._v(" "),o("KtAvatar",{staticClass:"mr-16px",attrs:{isHoverable:"",name:"Jony O'Five"}}),t._v(" "),o("KtAvatar",{staticClass:"mr-16px",attrs:{isHoverable:""}})],1),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),o("ComponentInfo",{attrs:{component:t.KtAvatarGroup}}),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAvatarGroup",{attrs:{count:3,isHoverable:"",items:t.avatarData}}),t._v(" "),o("br"),t._v(" "),o("KtAvatarGroup",{attrs:{count:3,isHoverable:"",isStack:"",items:t.avatarData}})],1),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAvatarGroup",{attrs:{count:3,isHoverable:"",isStack:"",items:t.avatarData}})],1),t._v(" "),o("h2",[t._v("Size")]),t._v(" "),o("h3",[t._v("Small")]),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAvatarGroup",{attrs:{count:3,isHoverable:"",isStack:"",items:t.avatarData,size:t.Kotti.Avatar.Size.SMALL}})],1),t._v(" "),o("h3",[t._v("Medium")]),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAvatarGroup",{attrs:{count:3,isHoverable:"",isStack:"",items:t.avatarData,size:t.Kotti.Avatar.Size.MEDIUM}})],1),t._v(" "),o("h3",[t._v("Large")]),t._v(" "),o("div",{staticClass:"element-example"},[o("KtAvatarGroup",{attrs:{count:3,isHoverable:"",isStack:"",items:t.avatarData,size:t.Kotti.Avatar.Size.LARGE}})],1)],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Avatar has "),e("code",[this._v("name")]),this._v(" and image "),e("code",[this._v("src")]),this._v(". If no image is given,\nor image error occurs avatar will use a placeholder avatar.")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Set "),e("code",[this._v(':size="Kotti.Avatar.Size.SMALL"')]),this._v(" to make the avatar smaller.")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAvatar")]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"mr-16px"')]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("isHoverable")]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("name")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Jony O\'Five"')]),t._v("\n\t"),o("span",{staticClass:"hljs-attr"},[t._v("src")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"https://picsum.photos/200/100"')]),t._v("\n/>")]),t._v("\n"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAvatar")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"mr-16px"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("isHoverable")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("name")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"Jony O\'Five"')]),t._v(" />")]),t._v("\n"),o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAvatar")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"mr-16px"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("isHoverable")]),t._v(" />")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Avatars can be grouped to avatar groups. Using "),e("code",[this._v("items")]),this._v(" props to pass the "),e("code",[this._v("avatarData")]),this._v(".\nThe example of the avatar data is shown here, which has same properities as avatar item:")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-js"},[o("span",{staticClass:"hljs-keyword"},[t._v("const")]),t._v(" avatarData = [\n\t{\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("name")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'Justin'")]),t._v(",\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("src")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'https://picsum.photos/100'")]),t._v(",\n\t},\n\t{\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("name")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'Beoncye'")]),t._v(",\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("src")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'https://picsum.photos/200'")]),t._v(",\n\t},\n\t{\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("name")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'Simens'")]),t._v(",\n\t\t"),o("span",{staticClass:"hljs-attr"},[t._v("src")]),t._v(": "),o("span",{staticClass:"hljs-string"},[t._v("'https://picsum.photos/120'")]),t._v(",\n\t},\n]\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("Avatar group can be stacked by setting "),e("code",[this._v("isStack")]),this._v(".\nYou can control how many avatar items are displayed with "),e("code",[this._v("count")]),this._v(".")])},function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("pre",[o("code",{staticClass:"language-html"},[o("span",{staticClass:"hljs-tag"},[t._v("<"),o("span",{staticClass:"hljs-name"},[t._v("KtAvatarGroup")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":count")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"3"')]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("isHoverable")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v("isStack")]),t._v(" "),o("span",{staticClass:"hljs-attr"},[t._v(":items")]),t._v("="),o("span",{staticClass:"hljs-string"},[t._v('"avatarData"')]),t._v(" />")]),t._v("\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",[e("code",[this._v("isStack")])])}],!1,null,null,null);e.default=component.exports}}]);