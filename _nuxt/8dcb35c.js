(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{1054:function(t,e,n){"use strict";n(977)},1055:function(t,e,n){var o=n(74)((function(i){return i[1]}));o.push([t.i,".no-background[data-v-e7547fb4]{background:transparent none repeat 0 0/auto auto padding-box border-box scroll;background:initial}",""]),o.locals={},t.exports=o},1108:function(t,e,n){"use strict";n.r(e);n(127),n(100),n(223),n(103),n(224);var o=n(5),r=(n(521),n(41),n(102),n(101),n(64),n(128),n(18)),l=n(439),d=n.n(l),c=n(0),m=n(940);function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var _=Object(c.defineComponent)({name:"DocumentationPageUsageComponentsComment",components:{ComponentInfo:m.a},setup:function(){var t=Object(c.ref)([{createdAt:"2018-03-21 09:49",id:1,isDeletable:!0,isEditable:!0,isInternal:!0,message:"We miss you, David",replies:[{createdAt:"2018-03-21 09:57",id:2,isDeletable:!1,isEditable:!1,isInternal:!0,message:"Join Bright Side Now!<br/>Join Bright Side Now!",user:{avatar:"https://picsum.photos/100",id:13,name:"Benni"}},{createdAt:"2018-03-21 10:05",id:3,isDeletable:!1,isEditable:!0,isInternal:!0,isModified:!0,message:"RE: Your trip to Montreal",user:{avatar:"https://picsum.photos/120",id:2,name:"Cooky"}},{createdAt:"2018-03-21 10:06",id:4,isDeletable:!0,isEditable:!1,isInternal:!0,message:"PS: Bring a jacket!",user:{avatar:"https://picsum.photos/120",id:2,name:"Cooky"}}],user:{avatar:"https://picsum.photos/200",id:12,name:"Margaret"}},{createdAt:"2018-03-23 11:20",id:5,isDeletable:!0,isEditable:!0,message:"BBQ tonite?",replies:[{createdAt:"2018-03-23 11:43",id:6,isDeletable:!0,isEditable:!0,message:"I'm in!",user:{avatar:"https://picsum.photos/210",id:9,name:"Janis"}}],user:{avatar:"https://picsum.photos/230",id:6,name:"Lemmy"}}]),e=Object(c.ref)({avatar:"https://picsum.photos/10",id:3,name:"James"}),n=Object(c.ref)({allowInternal:!0,dataTest:null,isReadOnly:!1,locale:"en-US",placeholder:"Add a comment",tabIndex:null}),o=function(t){var n=t.isInternal,o=t.message;return{createdAt:(new Date).toDateString(),id:Math.floor(101*Math.random()),isDeletable:!0,isEditable:!0,isInternal:n,message:o,replies:[],user:e.value}},l=function(t){return function(e){return e.id===t.id?f(f({},e),{},{isModified:!0,isInternal:t.isInternal,message:t.message}):e}};return{comments:t,component:r.j,currentUser:e,dangerouslyOverrideParser:function(t){return d()(t)},handleAdd:function(e){if(e.parentId){var n=t.value.find((function(t){return t.id===e.parentId}));if(!n)throw new Error("Comment not found, comment id: ".concat(e.parentId));n.replies.push(o({isInternal:e.isInternal,message:e.message}))}else t.value.push(o({isInternal:e.isInternal,message:e.message}))},handleEdit:function(e){if(e.parentId){var n=t.value.find((function(t){return t.id===e.parentId}));if(!n)throw new Error("Comment not found, comment id: ".concat(e.parentId));if(!n.replies.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));n.replies=n.replies.map(l(e))}else{if(!t.value.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));t.value=t.value.map(l(e))}},handleDelete:function(e){if(e.parentId){var n=t.value.find((function(t){return t.id===e.parentId}));if(!n)throw new Error("Comment not found, comment id: ".concat(e.parentId));if(!n.replies.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));n.replies=n.replies.filter((function(t){return t.id!==e.id}))}else{if(!t.value.find((function(t){return t.id===e.id})))throw new Error("Comment not found, comment id: ".concat(e.id));t.value=t.value.filter((function(t){return t.id!==e.id}))}},postEscapeParser:function(t){return t.replace(/\n/g,"</br>")},settings:n}}}),h=_,y=(n(1054),n(32)),component=Object(y.a)(h,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[e("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),e("h2",[t._v("Example")]),t._v(" "),e("KtI18nContext",{attrs:{locale:t.settings.locale}},[e("div",{staticClass:"element-example no-background"},[t._l(t.comments,(function(n){return e("KtComment",t._b({key:n.id,staticClass:"mb-block",attrs:{allowInternal:t.settings.allowInternal,dataTest:t.settings.dataTest,isReadOnly:t.settings.isReadOnly,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)},delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)}}},"KtComment",n,!1))})),t._v(" "),e("KtCommentInput",{attrs:{allowInternal:t.settings.allowInternal,dataTest:t.settings.dataTest,placeholder:t.settings.placeholder,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)}}})],2),t._v(" "),e("KtForm",{attrs:{size:"small"},model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[e("div",{staticClass:"wrapper"},[e("div",[e("h4",[t._v("Settings")]),t._v(" "),e("KtFieldSingleSelect",{attrs:{formKey:"locale",helpText:"Can be set via KtI18nContext",hideClear:"",label:"Language",leftIcon:"global",options:[{label:"German (de-DE)",value:"de-DE"},{label:"English (en-US)",value:"en-US"},{label:"Spanish (es-ES)",value:"es-ES"},{label:"French (fr-FR)",value:"fr-FR"},{label:"Japanese (ja-JP)",value:"ja-JP"}]}}),t._v(" "),e("KtFieldNumber",{attrs:{formKey:"tabIndex",isOptional:"",label:"tabIndex"}}),t._v(" "),e("KtFieldToggle",{attrs:{formKey:"allowInternal",helpText:"Allows Internal Comments i.e. Restricted access",isOptional:"",label:"allowInternal",type:"switch"}}),t._v(" "),e("KtFieldToggle",{attrs:{formKey:"isReadOnly",helpText:"Hides KtComment action buttons",isOptional:"",label:"isReadOnly",type:"switch"}})],1),t._v(" "),e("div",[e("h4",[t._v("Texts")]),t._v(" "),e("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}}),t._v(" "),e("KtFieldText",{attrs:{formKey:"placeholder",isOptional:"",label:"placeholder"}})],1)])]),t._v(" "),e("pre",[e("code",{attrs:{"data-lang":"vue"}},[t._v('<KtComment\n\tv-for="comment in comments"\n\t:key="comment.id"\n\tv-bind="comment"\n\tallowInternal\n\tdataTest="comments"\n\t:isReadOnly="false"\n\t:tabIndex="1"\n\t:userAvatar="currentUser.avatar"\n\t@add="handleAdd($event)"\n\t@delete="handleDelete($event)"\n\t@edit="handleEdit($event)"\n/>\n<KtCommentInput\n\tallowInternal\n\tdataTest="comments"\n\tplaceholder="Add a comment"\n\t:tabIndex="1"\n\t:userAvatar="currentUser.avatar"\n\t@add="handleAdd($event)"\n/>\n')])]),t._v(" "),e("h2",[t._v("Usage")]),t._v(" "),e("h3",[t._v("Comment Object")]),t._v(" "),e("pre",[e("code",{attrs:{"data-lang":"js"}},[t._v("{\n\tcreatedAt: '2018-12-04 09:57',\n\tid: 1,\n\tisDeletable: true,\n\tisEditable: true,\n\tisInternal: true,\n\tisModified: true,\n\tmessage: 'Comment message',\n\treplies: [\n\t\t{\n\t\t\tcreatedAt: '2018-12-04 09:57',\n\t\t\tid: 2,\n\t\t\tisDeletable: false,\n\t\t\tisEditable: false,\n\t\t\tisInternal: true,\n\t\t\tisModified: true,\n\t\t\tmessage: 'Reply message',\n\t\t\tuser: {\n\t\t\t\tavatar: 'https://picsum.photos/200',\n\t\t\t\tid: 102,\n\t\t\t\tname: 'User name',\n\t\t\t},\n\t\t},\n\t],\n\tuser: {\n\t\tavatar: 'https://picsum.photos/230',\n\t\tid: 101,\n\t\tname: 'User name',\n\t},\n}")])]),t._v(" "),e("h3",[t._v("Events")]),t._v(" "),e("table",[e("tr",[e("th",[t._v("Event Name")]),t._v(" "),e("th",[t._v("Component")]),t._v(" "),e("th",[t._v("Payload")]),t._v(" "),e("th",[t._v("Description")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("@add")])]),t._v(" "),e("td",[e("code",[t._v("KtComment")]),t._v(", "),e("code",[t._v("KtCommentInput")])]),t._v(" "),e("td",[e("pre",[e("code",{attrs:{"data-lang":"ts"}},[t._v("{\n\tisInternal?: boolean,\n\tmessage: string,\n\tparentId?: number | string,\n\treplyToUserId?: number | string,\n}")])])]),t._v(" "),e("td",[t._v("Add new comment")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("@delete")])]),t._v(" "),e("td",[e("code",[t._v("KtComment")])]),t._v(" "),e("td",[e("pre",[e("code",{attrs:{"data-lang":"ts"}},[t._v("{\n\tid: number | string,\n\tparentId?: number | string,\n}")])])]),t._v(" "),e("td",[t._v("Delete comment")])]),t._v(" "),e("tr",[e("td",[e("code",[t._v("@edit")])]),t._v(" "),e("td",[e("code",[t._v("KtComment")])]),t._v(" "),e("td",[e("pre",[e("code",{attrs:{"data-lang":"ts"}},[t._v("{\n\tid: number | string,\n\tisInternal?: boolean,\n\tmessage: string,\n\tparentId?: number | string,\n}")])])]),t._v(" "),e("td",[t._v("Edit comment")])])]),t._v(" "),e("h2",[t._v("Parsing HTML")]),t._v(" "),e("p",[t._v("\n\t\t\t\tKtComment will escape all tags by default but you can opt out and pass\n\t\t\t\tyour own parser by using the parser prop.\n\t\t\t")]),t._v(" "),e("blockquote",{attrs:{cite:"https://en.wikipedia.org/wiki/Cross-site_scripting"}},[t._v("\n\t\t\t\tRemember to "),e("b",[t._v("escape malicious tags")]),t._v(" to prevent\n\t\t\t\t"),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Cross-site_scripting"}},[t._v("Cross-site-scripting")]),t._v("\n\t\t\t\tattacks, you can use KtComment's default parser function with\n\t\t\t\tKtComment.defaultParser.\n\t\t\t")]),t._v(" "),e("pre",[e("code",{attrs:{"data-lang":"js"}},[t._v("methods: {\n\tdangerouslyOverrideParser: msg => escape(msg).replace(/\\n/g, '<br />'),\n\t// alternativly you could\n\tdangerouslyOverrideParser: msg => escape(msg),\n\tpostEscapeParser: msg => msg.replace(/\\n/g, '<br />'),\n\t// or just\n\tpostEscapeParser: msg => msg.replace(/\\n/g, '<br />'),\n}")])]),t._v(" "),e("div",{staticClass:"element-example no-background"},[t._l(t.comments,(function(n){return e("KtComment",t._b({key:n.id,staticClass:"mb-block",attrs:{allowInternal:t.settings.allowInternal,dangerouslyOverrideParser:t.dangerouslyOverrideParser,dataTest:t.settings.dataTest,isReadOnly:t.settings.isReadOnly,postEscapeParser:t.postEscapeParser,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)},delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)}}},"KtComment",n,!1))})),t._v(" "),e("KtCommentInput",{attrs:{allowInternal:t.settings.allowInternal,dataTest:t.settings.dataTest,placeholder:t.settings.placeholder,tabIndex:t.settings.tabIndex,userAvatar:t.currentUser.avatar},on:{add:function(e){return t.handleAdd(e)}}})],2)],1)],1)}),[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[t._v("\n\t\t\tUse "),e("code",[t._v("KtComment")]),t._v(" to display a comment thread, a comment post and\n\t\t\tcomment replies. It allows adding new replies by clicking on the\n\t\t\t"),e("strong",[t._v("Reply")]),t._v("\n\t\t\tbutton.\n\t\t")])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[t._v("Use "),e("code",[t._v("KtCommentInput")]),t._v(" to input new comment posts.")])}],!1,null,"e7547fb4",null);e.default=component.exports},937:function(t,e,n){var content=n(950);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(75).default)("4ff54064",content,!0,{sourceMap:!1})},938:function(t,e,n){var content=n(952);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(75).default)("4e0c6a7e",content,!0,{sourceMap:!1})},939:function(t,e,n){"use strict";var o=n(9),r=n(11),l=n(66),d=n(56),c=n(76),m=n(941),v=n(35),f=n(10),_=n(942),h=n(331),y=n(943),x=n(944),C=n(160),w=n(945),O=[],I=r(O.sort),k=r(O.push),P=f((function(){O.sort(void 0)})),j=f((function(){O.sort(null)})),D=h("sort"),S=!f((function(){if(C)return C<70;if(!(y&&y>3)){if(x)return!0;if(w)return w<603;var code,t,e,n,o="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)O.push({k:t+n,v:e})}for(O.sort((function(a,b){return b.v-a.v})),n=0;n<O.length;n++)t=O[n].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}}));o({target:"Array",proto:!0,forced:P||!j||!D||!S},{sort:function(t){void 0!==t&&l(t);var e=d(this);if(S)return void 0===t?I(e):I(e,t);var n,o,r=[],f=c(e);for(o=0;o<f;o++)o in e&&k(r,e[o]);for(_(r,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:v(e)>v(n)?1:-1}}(t)),n=c(r),o=0;o<n;)e[o]=r[o++];for(;o<f;)m(e,o++);return e}})},940:function(t,e,n){"use strict";var o=n(20),r=(n(99),n(159),n(946),n(939),n(518),n(41),n(126),n(127),n(100),n(101),n(223),n(103),n(224),n(5)),l=n(6),d=(n(64),n(128),n(102),n(519),n(18)),c=n(3),m=n(225),v=n(131),f=n.n(v),_=n(332),h=n.n(_),y=n(0),x=(n(161),Object(y.defineComponent)({name:"ComponentInfoSlots",props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(y.ref)(!1)}}})),C=(n(949),n(32)),w=Object(C.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(n){var r=Object(o.a)(n,2),l=r[0],details=r[1];return e("section",{key:l},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(n){var r=Object(o.a)(n,2),l=r[0],d=r[1],c=d.description,m=d.type;return e("div",{key:l,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(m),domProps:{textContent:t._s(m)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",null===c?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(c)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"2187adcd",null).exports;function O(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var I=Object(y.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:w},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:m.Dashes,labels:Object(y.computed)((function(){var e=[],n=t.component,o=n.meta,c=o.addedVersion,m=o.componentFolder,v=o.deprecated,f=o.designs,_=o.typeScript,y=n.name,x=null!=m?m:h()(y.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==f?Array.isArray(f)?e.push.apply(e,Object(l.a)(f.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},d.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:f.url,right:Object(r.a)({},d.a.MetaDesignType.FIGMA,"Figma")[f.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),_&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:_.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?O(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showProps:Object(y.ref)(!1),stringifyDefault:function(t,e){return"function"==typeof t?f()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return f()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:c.Yoco}}}),k=I,P=(n(951),Object(C.a)(k,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,n){return e("div",{key:n,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(n){return e("code",{key:n,domProps:{textContent:t._s(n)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}}),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(o.a)(t,1)[0],b=Object(o.a)(e,1)[0];return a.localeCompare(b)})),(function(n){var r=Object(o.a)(n,2),l=r[0],d=r[1];return e("tr",{key:l},[e("td",[e("code",{domProps:{textContent:t._s(l)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(d.type))}})]),t._v(" "),e("td",[d.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===d.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyDefault(d.default,d.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:d.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:d.validator?d.validator.toString():void 0},domProps:{textContent:t._s(d.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),d.validator?e("div",{domProps:{textContent:t._s(d.validator.name)}}):t._e()])])])})),0)])]):t._e()],1)}),[],!1,null,"e3deffa6",null));e.a=P.exports},941:function(t,e,n){"use strict";var o=n(130),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+o(e)+" of "+o(t))}},942:function(t,e,n){"use strict";var o=n(129),r=Math.floor,l=function(t,e){var n=t.length;if(n<8)for(var element,d,i=1;i<n;){for(d=i,element=t[i];d&&e(t[d-1],element)>0;)t[d]=t[--d];d!==i++&&(t[d]=element)}else for(var c=r(n/2),m=l(o(t,0,c),e),v=l(o(t,c),e),f=m.length,_=v.length,h=0,y=0;h<f||y<_;)t[h+y]=h<f&&y<_?e(m[h],v[y])<=0?m[h++]:v[y++]:h<f?m[h++]:v[y++];return t};t.exports=l},943:function(t,e,n){"use strict";var o=n(125).match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},944:function(t,e,n){"use strict";var o=n(125);t.exports=/MSIE|Trident/.test(o)},945:function(t,e,n){"use strict";var o=n(125).match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},946:function(t,e,n){"use strict";var o=n(9),r=n(947);o({target:"String",proto:!0,forced:n(948)("link")},{link:function(t){return r(this,"a","href",t)}})},947:function(t,e,n){"use strict";var o=n(11),r=n(65),l=n(35),d=/"/g,c=o("".replace);t.exports=function(t,e,n,o){var m=l(r(t)),v="<"+e;return""!==n&&(v+=" "+n+'="'+c(l(o),d,"&quot;")+'"'),v+">"+m+"</"+e+">"}},948:function(t,e,n){"use strict";var o=n(10);t.exports=function(t){return o((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},949:function(t,e,n){"use strict";n(937)},950:function(t,e,n){var o=n(74)((function(i){return i[1]}));o.push([t.i,".slots-block[data-v-2187adcd]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-2187adcd]{padding:.4rem .6rem}.slots-block[data-v-2187adcd]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-2187adcd]{align-items:center;display:flex;flex:1}.header__details[data-v-2187adcd]{flex:1}.header__name[data-v-2187adcd]{font-weight:700}.header>*[data-v-2187adcd]{align-items:center;display:flex}.header[data-v-2187adcd]>:not(:first-child){margin-left:.4rem}.header__description[data-v-2187adcd]{flex:1}.header__empty-description[data-v-2187adcd]{flex:1;font-style:italic}.header__empty-scope[data-v-2187adcd]{font-style:italic}.scope[data-v-2187adcd]{margin-left:1.5rem}.scope__item[data-v-2187adcd]{align-items:center;display:flex}.scope__item[data-v-2187adcd]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-2187adcd]{font-style:italic}.scope__name[data-v-2187adcd]{font-weight:700;min-width:100px}.scope__type[data-v-2187adcd]{min-width:60px}.scope__type--is-function[data-v-2187adcd]{color:var(--orange-50)}.scope__type--is-object[data-v-2187adcd]{color:var(--purple-50)}.scope__type--is-integer[data-v-2187adcd]{color:var(--green-50)}",""]),o.locals={},t.exports=o},951:function(t,e,n){"use strict";n(938)},952:function(t,e,n){var o=n(74)((function(i){return i[1]}));o.push([t.i,".component-info[data-v-e3deffa6]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-e3deffa6]{align-items:center;flex-direction:row}}.component-info>*[data-v-e3deffa6]{display:flex;margin:5px 10px}.component-info__labels[data-v-e3deffa6]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-e3deffa6]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50)}.component-info-label[data-v-e3deffa6]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-e3deffa6],.component-info-label__right[data-v-e3deffa6]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-e3deffa6]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-e3deffa6]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-e3deffa6]{margin-bottom:32px}.component-info-container[data-v-e3deffa6]>:not(:first-child){margin-top:16px}.danger-block[data-v-e3deffa6]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-e3deffa6]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-e3deffa6]{margin-left:8px}.danger-block>section[data-v-e3deffa6]{padding:.4rem .6rem}.danger-block>section[data-v-e3deffa6]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),o.locals={},t.exports=o},977:function(t,e,n){var content=n(1055);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(75).default)("127b8a91",content,!0,{sourceMap:!1})}}]);