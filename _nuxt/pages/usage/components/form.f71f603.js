(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{687:function(t,e,o){var content=o(693);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(111).default)("24122391",content,!0,{sourceMap:!1})},688:function(t,e,o){var content=o(695);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(111).default)("3377c674",content,!0,{sourceMap:!1})},689:function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var n=o(325);var r=o(388);function l(t){return function(t){if(Array.isArray(t))return Object(n.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(r.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},690:function(t,e,o){"use strict";o(324),o(471),o(150),o(215),o(264),o(112),o(214),o(387),o(265);var n=o(91),r=o(689),l=o(323),c=o(5),d=o(691),_=o(0),m=o(46),f=Object(_.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(t){return{showSlots:Object(_.ref)(!1)}}}),v=(o(692),o(65)),h=Object(v.a)(f,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return Object.entries(t.slots).length>0?o("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[o("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(e){var n=e[0],details=e[1];return o("section",{key:n},[o("div",{staticClass:"slots-block__header"},[o("div",{staticClass:"slots-block__header__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",{staticClass:"slots-block__header__details"},[details.description?o("div",{staticClass:"slots-block__header__details__description",domProps:{textContent:t._s(details.description)}}):o("div",{staticClass:"slots-block__header__details__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?o("div",{staticClass:"slots-block__header__details__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?o("div",{staticClass:"slots-block__scope"},t._l(Object.entries(details.scope),(function(e){var n=e[0],r=e[1],l=r.description,c=r.type;return o("div",{key:n,staticClass:"slots-block__scope__item"},[o("div",{class:"slots-block__scope__item__type slots-block__scope__item__type--is-"+c,domProps:{textContent:t._s(c)}}),t._v(" "),o("div",{staticClass:"slots-block__scope__item__name",domProps:{textContent:t._s(n)}}),t._v(" "),o("div",null===l?{staticClass:"slots-block__scope__item__description slots-block__scope__item__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"slots-block__scope__item__description",domProps:{textContent:t._s(l)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"1f580630",null).exports;function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(object);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,o)}return e}var x=Object(_.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:h},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:d.Dashes,labels:Object(_.computed)((function(){var e=[],o=t.component,c=o.meta,d=c.addedVersion,_=c.componentFolder,f=c.deprecated,v=c.designs,h=c.typeScript,x=o.name,C=null!=_?_:Object(m.kebabCase)(x.replace(/^Kt/,"Kotti")),k=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(C):null;return null!==f&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(f.version)}),null!==v?Array.isArray(v)?e.push.apply(e,Object(r.a)(v.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:v.url,right:Object(n.a)({},l.a.MetaDesignType.FIGMA,"Figma")[v.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),h&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:k?"".concat(k,"/types.ts"):void 0,right:h.namespace}),e.push(function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===d?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(d),right:"v".concat(d)})),k&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(k,"/").concat(x,".vue"),right:"".concat(x,".vue")}),e})),showProps:Object(_.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?Object(m.castArray)(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return Object(m.castArray)(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),C=(o(694),Object(v.a)(x,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"component-info-container"},[o("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[o("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),o("div",[o("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,e){return o("div",{key:e,staticClass:"component-info__label",style:"--background-color: "+label.backgroundColor+"; --color: "+label.color},[o("div",{staticClass:"component-info__label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?o("a",{staticClass:"component-info__label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):o("div",{staticClass:"component-info__label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?o("article",{staticClass:"danger-block"},[o("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),o("strong",{domProps:{textContent:t._s("v"+t.component.meta.deprecated.version)}})]),t._v(" "),o("section",[o("div",[o("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),o("div",[o("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(e){return o("code",{key:e,domProps:{textContent:t._s(e)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?o("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),o("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?o("KtHeading",{attrs:{text:"Properties (Beta)",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[o("table",[o("thead",[o("th",[t._v("Name")]),t._v(" "),o("th",[t._v("Type")]),t._v(" "),o("th",[t._v("Default")]),t._v(" "),o("th",[t._v("Validator")])]),t._v(" "),o("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=t[0],b=e[0];return a.localeCompare(b)})),(function(e){var n=e[0],r=e[1];return o("tr",{key:n},[o("td",[o("code",{domProps:{textContent:t._s(n)}})]),t._v(" "),o("td",[o("code",{domProps:{textContent:t._s(t.stringifyType(r.type))}})]),t._v(" "),o("td",[r.required?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===r.default?o("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):o("code",{domProps:{textContent:t._s(t.stringifyDefault(r.default,r.type))}})]),t._v(" "),o("td",[o("div",{staticStyle:{display:"flex","align-items":"center"}},[o("i",{staticClass:"yoco",style:{color:r.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:r.validator?r.validator.toString():void 0},domProps:{textContent:t._s(r.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),r.validator?o("div",{domProps:{textContent:t._s(r.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"7a5883f0",null));e.a=C.exports},691:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t.EmDash="—",t.EmDashHTML="&mdash;",t.EnDash="–",t.EnDashHTML="&ndash;",t.FigureDash="‒",t.FigureDashHTML="&#x2012;",t.QuotationDash="―",t.QuotationDashHTML="&horbar;",t.SwungDash="⁓",t.SwungDashHTML="&#x2053;"}(e.Dashes||(e.Dashes={}))},692:function(t,e,o){"use strict";var n=o(687);o.n(n).a},693:function(t,e,o){(e=o(110)(!1)).push([t.i,".slots-block[data-v-1f580630]{color:var(--support-info-dark);background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px}.slots-block>*[data-v-1f580630]{padding:.4rem .6rem}.slots-block[data-v-1f580630]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.slots-block__header[data-v-1f580630]{display:flex;flex:1;align-items:center}.slots-block__header__details[data-v-1f580630],.slots-block__header__details__description[data-v-1f580630]{flex:1}.slots-block__header__details__empty-description[data-v-1f580630]{flex:1;font-style:italic}.slots-block__header__details__empty-scope[data-v-1f580630]{font-style:italic}.slots-block__header__name[data-v-1f580630]{font-weight:700}.slots-block__header>*[data-v-1f580630]{display:flex;align-items:center}.slots-block__header[data-v-1f580630]>:not(:first-child){margin-left:.4rem}.slots-block__scope[data-v-1f580630]{margin-left:1.5rem}.slots-block__scope__item[data-v-1f580630]{display:flex;align-items:center}.slots-block__scope__item[data-v-1f580630]>:not(:first-child){margin-left:.3rem}.slots-block__scope__item__description--is-empty[data-v-1f580630]{font-style:italic}.slots-block__scope__item__name[data-v-1f580630]{min-width:100px;font-weight:700}.slots-block__scope__item__type[data-v-1f580630]{min-width:60px}.slots-block__scope__item__type--is-function[data-v-1f580630]{color:var(--orange-50)}.slots-block__scope__item__type--is-object[data-v-1f580630]{color:var(--purple-50)}.slots-block__scope__item__type--is-integer[data-v-1f580630]{color:var(--green-50)}",""]),t.exports=e},694:function(t,e,o){"use strict";var n=o(688);o.n(n).a},695:function(t,e,o){(e=o(110)(!1)).push([t.i,".table-style[data-v-7a5883f0],table[data-v-7a5883f0]{width:100%;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;table-layout:auto;border-collapse:collapse}.table-style .th-style[data-v-7a5883f0],.table-style th[data-v-7a5883f0],table .th-style[data-v-7a5883f0],table th[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);font-size:.6rem;line-height:1em;color:#8f8f8f;text-align:inherit;text-transform:uppercase;border-bottom:.05rem solid #dbdbdb}.table-style .tr-style[data-v-7a5883f0],.table-style tr[data-v-7a5883f0],table .tr-style[data-v-7a5883f0],table tr[data-v-7a5883f0]{margin:0}.table-style .td-style[data-v-7a5883f0],.table-style td[data-v-7a5883f0],table .td-style[data-v-7a5883f0],table td[data-v-7a5883f0]{padding:var(--unit-2) var(--unit-1);line-height:1.2rem;border-bottom:1px solid #dbdbdb}.table-style i[data-v-7a5883f0],table i[data-v-7a5883f0]{margin:0 .2rem;font-size:1rem!important;color:#8a8a8a}.component-info[data-v-7a5883f0]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-7a5883f0]{flex-direction:row;align-items:center}}.component-info>*[data-v-7a5883f0]{display:flex;margin:5px 10px}.component-info__labels[data-v-7a5883f0]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.component-info__label[data-v-7a5883f0]{display:flex;margin:5px;overflow:hidden;border:1px solid var(--color);border-radius:3px}.component-info__label__left[data-v-7a5883f0],.component-info__label__right[data-v-7a5883f0]{padding:2px 8px}.component-info__label a.component-info__label__right[data-v-7a5883f0]:hover{text-decoration:underline}.component-info__label__left[data-v-7a5883f0]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.component-info--is-deprecated .component-info__title[data-v-7a5883f0]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-container[data-v-7a5883f0]{margin-bottom:32px}.component-info-container[data-v-7a5883f0]>:not(:first-child){margin-top:16px}.danger-block[data-v-7a5883f0]{color:var(--red-70);background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px}.danger-block a[data-v-7a5883f0]{color:inherit;text-decoration:underline}.danger-block code+code[data-v-7a5883f0]{margin-left:8px}.danger-block>section[data-v-7a5883f0]{padding:.4rem .6rem}.danger-block>section[data-v-7a5883f0]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),t.exports=e},740:function(t,e,o){var content=o(918);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(111).default)("e0158552",content,!0,{sourceMap:!1})},917:function(t,e,o){"use strict";var n=o(740);o.n(n).a},918:function(t,e,o){(e=o(110)(!1)).push([t.i,".address-controller[data-v-5c476704]>:not(:first-child){padding-top:20px;margin-top:20px;border-top:1px solid var(--ui-02)}.address[data-v-5c476704]{display:flex;align-items:center}.address button[data-v-5c476704]{outline:none}.address[data-v-5c476704]>:not(:first-child){margin-left:20px}.address__content[data-v-5c476704]{flex:1}.address__content__fields[data-v-5c476704]{display:flex;align-items:center}.address__content__fields>*[data-v-5c476704]{flex:1;margin-bottom:0!important}.address__content__fields[data-v-5c476704]>:not(:first-child){margin-left:20px}.address__content__footer[data-v-5c476704]{margin-top:10px}.address__content__footer[data-v-5c476704],.address__content__header[data-v-5c476704]{display:flex;align-items:center;justify-content:space-between}.address__buttons[data-v-5c476704]{display:flex;flex-direction:column}.address__buttons[data-v-5c476704]>:not(:first-child){margin-top:5px}li[data-v-5c476704]{margin:0;list-style:none}h3[data-v-5c476704]{border-bottom:0}.wrapper[data-v-5c476704]{display:flex;margin:0 0 1.5em;background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius)}.wrapper>*[data-v-5c476704]{flex:1;padding:1.5em;margin:0!important}@media(max-width:959px){.wrapper[data-v-5c476704]{flex-direction:column}.wrapper[data-v-5c476704]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-5c476704]{flex-direction:row}.wrapper[data-v-5c476704]>:not(:last-child){border-right:1px solid var(--ui-02)}}",""]),t.exports=e},973:function(t,e,o){"use strict";o.r(e);o(324);var n=o(160),r=o(182),l=o(256),c=o(0),d=o(690),_=Object(c.defineComponent)({name:"DocumentationPageUsageComponentsForm",components:{ComponentInfo:d.a},setup:function(){var t=Object(c.ref)({addresses:[{country:null,houseNumber:null,streetName:null}],personalDetails:{age:1,firstName:"John",firstNameFirst:!1,fullName:"Smith,John",lastName:"Smith"},username:null,gender:"other"});return{component:n.a,createRandomRow:function(){return{country:Math.random()>.5?"eg":"de",houseNumber:"".concat(Math.ceil(999*Math.random())).concat(Math.random()>.5?"a":""),streetName:"".concat(Math.random()>.5?"Bismarck":"Other").concat(Math.random()>.5?"street":"straße")}},genderOptions:Object(c.computed)((function(){return[{label:"MALE",value:"male",dataTest:"unique-male-data-test"},{label:"FEMALE",value:"female"},{label:"OTHER",value:"other",dataTest:"unique-other-data-test"}]})),isDeleteDisabled:Object(c.computed)((function(){return 1===t.value.addresses.length})),KtFormControllerList:r.a,KtFormControllerObject:l.a,onSubmit:function(t){console.debug("onSubmit",t),alert("onSubmit: See Console for Event Details")},settings:Object(c.ref)({booleanFlags:{hideClear:!1,hideValidation:!1,isDisabled:!1,isLoading:!1},locale:Object(c.ref)("en-US"),preventSubmissionOn:"error",size:"medium"}),validators:Object(c.computed)((function(){return{username:function(t){return null===t?{type:"empty"}:t.length<3?{text:"Username is too short",type:"error"}:t.length<5?{text:"Username is already taken",type:"warning"}:{text:null,type:"success"}}}})),values:t}}}),m=(o(917),o(65)),component=Object(m.a)(_,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),o("ClientOnly",[o("KtI18nContext",{attrs:{locale:t.settings.locale}},[o("KtForm",{model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[o("div",{staticClass:"wrapper"},[o("section",[o("h3",[t._v("Shared Form ↔ Field Settings")]),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"size",helpDescription:"Can be overridden in individual fields",isOptional:"",label:"Size",options:[{label:"small",value:"small"},{label:"medium (default)",value:"medium"},{label:"large",value:"large"}]}}),t._v(" "),o("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",helpDescription:"Can be overridden in individual fields",isOptional:"",label:"Boolean Flags",options:[{key:"isDisabled",label:"isDisabled"},{key:"hideClear",label:"hideClear"},{key:"hideValidation",label:"hideValidation"},{key:"isLoading",label:"isLoading"}],type:"switch"}})],1),t._v(" "),o("div",[o("h3",[t._v("Form Settings")]),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"preventSubmissionOn",helpDescription:"Which types of validation error prevent the form from submitting?",isOptional:"",label:"Prevent Submission",options:[{label:"error (default)",value:"error"},{label:"warning",value:"warning"},{label:"NEVER",value:"NEVER"}]}}),t._v(" "),o("h3",[t._v("Kotti Settings")]),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"locale",helpDescription:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}]}})],1)])]),t._v(" "),o("KtForm",t._b({attrs:{preventSubmissionOn:t.settings.preventSubmissionOn,size:t.settings.size,validators:t.validators},on:{submit:t.onSubmit},model:{value:t.values,callback:function(e){t.values=e},expression:"values"}},"KtForm",t.settings.booleanFlags,!1),[o("KtFieldText",{attrs:{formKey:"username",label:"Username",rightIcon:"user"}}),t._v(" "),o("br"),t._v(" "),o("ComponentInfo",{attrs:{component:t.KtFormControllerObject}}),t._v(" "),o("h2",[t._v("Personal Details")]),t._v(" "),o("KtFormControllerObject",{attrs:{formKey:"personalDetails"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.setValues,r=e.values;return[o("KtFieldNumber",{attrs:{formKey:"age",helpText:"help for age",label:"age",placeholder:"how old are you?"}}),t._v(" "),o("KtFieldText",{attrs:{formKey:"firstName",helpText:"help for firstName",label:"First Name",placeholder:"Klaus"}}),t._v(" "),o("KtFieldText",{attrs:{formKey:"lastName",helpText:"help for lastName",label:"Last Name",placeholder:"Dieter"}}),t._v(" "),o("div",[o("KtFieldText",{attrs:{formKey:"NONE",hideClear:"",label:"Full Name",value:(r.firstNameFirst?[r.firstName,r.lastName]:[r.lastName,r.firstName]).join(",")}}),t._v(" "),o("KtFieldToggle",{attrs:{formKey:"NONE",isOptional:"",label:"Show First Name First",value:r.firstNameFirst},on:{input:function(t){return n(Object.assign({},r,{firstNameFirst:!r.firstNameFirst}))}}})],1)]}}])}),t._v(" "),o("br"),t._v(" "),o("ComponentInfo",{attrs:{component:t.KtFormControllerList}}),t._v(" "),o("h2",[t._v("Addresses")]),t._v(" "),o("ul",[o("KtFormControllerList",{staticClass:"address-controller",attrs:{formKey:"addresses"},scopedSlots:t._u([{key:"header",fn:function(e){var n=e.addBefore,r=e.setValues,l=e.values;return[o("div",[o("button",{staticClass:"kt-button secondary",attrs:{type:"button"},domProps:{textContent:t._s("Add New Address To The Start")},on:{click:function(t){return n({country:null,houseNumber:null,streetName:null})}}}),t._v(" "),o("button",{staticClass:"kt-button secondary",attrs:{type:"button"},domProps:{textContent:t._s("Duplicate List")},on:{click:function(t){return r(l.concat(l))}}})])]}},{key:"default",fn:function(e){var n=e.addAfter,r=e.addBefore,l=e.deleteSelf,c=e.index,d=e.setValues;return[o("li",{staticClass:"address"},[o("div",{staticClass:"address__content"},[o("div",{staticClass:"address__content__header"},[o("h3",{domProps:{textContent:t._s("Address #"+(c+1))}})]),t._v(" "),o("div",{staticClass:"address__content__fields"},[o("KtFieldText",{attrs:{formKey:"streetName",isOptional:"",label:"Street Name",leftIcon:"address_book"}}),t._v(" "),o("KtFieldText",{attrs:{formKey:"houseNumber",isOptional:"",label:"House Number",leftIcon:"address_book"}}),t._v(" "),o("KtFieldSingleSelect",{attrs:{formKey:"country",isOptional:"",label:"Country",leftIcon:"global",options:[{label:"Egypt",value:"eg"},{label:"France",value:"fr"},{label:"Germany",value:"de"},{label:"USA",value:"us"}]}})],1),t._v(" "),o("div",{staticClass:"address__content__footer"},[o("button",{staticClass:"kt-button secondary",attrs:{type:"button"},on:{click:function(e){d(t.createRandomRow())}}},[t._v("\n\t\t\t\t\t\t\t\t\t\t\tsetValues\n\t\t\t\t\t\t\t\t\t\t")])])]),t._v(" "),o("div",{staticClass:"address__buttons"},[o("button",{staticClass:"kt-button secondary",attrs:{title:"Add Field Before",type:"button"},on:{click:function(t){return r({country:null,houseNumber:null,streetName:null})}}},[o("i",{staticClass:"yoco"},[t._v("plus")]),o("i",{staticClass:"yoco"},[t._v("triangle_up")])]),t._v(" "),o("button",{staticClass:"kt-button danger",attrs:{disabled:t.isDeleteDisabled,title:"deleteSelf",type:"button"},on:{click:l}},[o("i",{staticClass:"yoco"},[t._v("close")])]),t._v(" "),o("button",{staticClass:"kt-button secondary",attrs:{title:"Add Field After",type:"button"},on:{click:function(t){return n({country:null,houseNumber:null,streetName:null})}}},[o("i",{staticClass:"yoco"},[t._v("plus")]),o("i",{staticClass:"yoco"},[t._v("triangle_down")])])])])]}},{key:"footer",fn:function(e){var n=e.addAfter,r=e.setValues;return[o("div",[o("button",{staticClass:"kt-button secondary",attrs:{type:"button"},domProps:{textContent:t._s("Add New Address To The End")},on:{click:function(t){return n({country:null,houseNumber:null,streetName:null})}}}),t._v(" "),o("button",{staticClass:"kt-button secondary",attrs:{type:"button"},domProps:{textContent:t._s("Replace List")},on:{click:function(e){r([t.createRandomRow(),t.createRandomRow(),t.createRandomRow()])}}})])]}}])})],1),t._v(" "),o("KtFieldRadioGroup",{attrs:{dataTest:"unique-radio-group",formKey:"gender",label:"Gender",options:t.genderOptions},scopedSlots:t._u([{key:"header",fn:function(e){var option=e.option;return[t._v(" ~"+t._s(option.label)+"~ ")]}},{key:"content",fn:function(e){var option=e.option;return[t._v(" *"+t._s(option.value)+"* ")]}}])}),t._v(" "),o("KtFormSubmit")],1),t._v(" "),o("br"),t._v(" "),o("h2",[t._v("values")]),t._v(" "),o("pre",{domProps:{textContent:t._s(JSON.stringify(t.values,null,"\t"))}})],1)],1)],1)}),[],!1,null,"5c476704",null);e.default=component.exports}}]);