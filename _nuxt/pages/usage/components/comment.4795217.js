(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{858:function(t,e,n){"use strict";var r=n(31),l=n(149).findIndex,c=n(280),v=!0;"findIndex"in[]&&Array(1).findIndex((function(){v=!1})),r({target:"Array",proto:!0,forced:v},{findIndex:function(t){return l(this,t,arguments.length>1?arguments[1]:void 0)}}),c("findIndex")},859:function(t,e,n){var r=n(860),l=n(862),c=/[&<>"']/g,v=RegExp(c.source);t.exports=function(t){return(t=l(t))&&v.test(t)?t.replace(c,r):t}},860:function(t,e,n){var r=n(861)({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});t.exports=r},861:function(t,e){t.exports=function(object){return function(t){return null==object?void 0:object[t]}}},862:function(t,e,n){var r=n(863);t.exports=function(t){return null==t?"":r(t)}},863:function(t,e,n){var r=n(736),l=n(864),c=n(737),v=n(865),_=r?r.prototype:void 0,o=_?_.toString:void 0;t.exports=function t(e){if("string"==typeof e)return e;if(c(e))return l(e,t)+"";if(v(e))return o?o.call(e):"";var n=e+"";return"0"==n&&1/e==-1/0?"-0":n}},864:function(t,e){t.exports=function(t,e){for(var n=-1,r=null==t?0:t.length,l=Array(r);++n<r;)l[n]=e(t[n],n,t);return l}},865:function(t,e,n){var r=n(730),l=n(728);t.exports=function(t){return"symbol"==typeof t||l(t)&&"[object Symbol]"==r(t)}},977:function(t,e,n){"use strict";n.r(e);n(168),n(339),n(166),n(512),n(858),n(169),n(218),n(146),n(340),n(341),n(276),n(215),n(275),n(170);var r=n(72),l=n(718),c=n(156),v=n(859),_=n.n(v);function o(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={name:"DocumentationPageUsageComponentsComment",components:{ComponentInfo:n(717).a},data:function(){return{currentUuid:"",currentUser:{userAvatar:"https://picsum.photos/48",userId:3,userName:"Junyu"},comments:[{createdTime:"2018-12-04T09:57:20+00:00",id:1,isDeletable:!0,isEditable:!0,message:"We miss you, David",replies:[{createdTime:"2018-03-20",id:2,isDeletable:!1,isEditable:!1,message:"Join Bright Side Now!<br/>Join Bright Side Now! Join Bright Side Now! Join Bright Side Now!",userAvatar:"https://picsum.photos/100",userId:13,userName:"Benni"},{createdTime:"2018-03-20",id:3,isDeletable:!1,isEditable:!0,message:"RE: Your trip to Montreal",userAvatar:"https://picsum.photos/120",userId:2,userName:"Cooky"},{createdTime:"2018-03-20",id:4,isDeletable:!0,isEditable:!1,message:"PS: Bring a jacket!",userAvatar:"https://picsum.photos/120",userId:2,userName:"Cooky"}],userAvatar:"https://picsum.photos/200",userId:12,userName:"Margaret Atwood"}],component:c.a}},computed:{replyName:function(){var t=this,e=this.comments.find((function(e){return e.uuid===t.currentUuid}));return e?e.name:null}},methods:{dangerouslyOverrideParser:function(t){return _()(t)},postEscapeParser:function(t){return t.replace(/\n/g,"</br>")},handleEdit:function(t){var e=t.id,n=t.message,r=t.parentId;if(null===r){var c=this.comments.findIndex((function(t){return t.id===e}));return this.comments=[].concat(Object(l.a)(this.comments.slice(0,c)),[m(m({},this.comments[c]),{},{message:n})],Object(l.a)(this.comments.slice(c+1)))}var v=this.comments.findIndex((function(t){return t.id===r})),_=this.comments[v].replies,o=_.findIndex((function(t){return t.id===e})),h=[].concat(Object(l.a)(_.slice(0,o)),[m(m({},_[o]),{},{message:n})],Object(l.a)(_.slice(o+1)));this.comments=[].concat(Object(l.a)(this.comments.slice(0,v)),[m(m({},this.comments[v]),{},{replies:h})],Object(l.a)(this.comments.slice(v+1)))},handleSubmit:function(t){var e=m(m({},this.currentUser),{},{id:Math.floor(101*Math.random()),message:t.message,createdTime:(new Date).toDateString(),replies:[]}),n=this.comments.find((function(e){return e.id===t.parentId}));n?n.replies.push(e):this.comments.push(e)},handleDelete:function(t){if(t.parentId){var e=this.comments.find((function(e){return e.id===t.parentId}));e.replies=e.replies.filter((function(e){return e.id!==t.id}))}this.comments=this.comments.filter((function(e){return e.id!==t.id}))}}},d=n(57),component=Object(d.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",[n("ComponentInfo",t._b({},"ComponentInfo",{component:t.component},!1)),t._v(" "),n("h2",[t._v("Example")]),t._v(" "),n("div",{staticClass:"element-example"},[t._l(t.comments,(function(e){return n("KtComment",{key:e.id,attrs:{createdTime:e.createdTime,id:e.id,isDeletable:e.isDeletable,isEditable:e.isEditable,message:e.message,replies:e.replies,userAvatar:e.userAvatar,userId:e.userId,userName:e.userName},on:{delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)},submit:function(e){return t.handleSubmit(e)}}})})),t._v(" "),n("KtCommentInput",{staticClass:"mt-16px",attrs:{placeholder:"Add comment",userAvatar:"https://picsum.photos/120"},on:{submit:function(e){return t.handleSubmit(e)}}})],2),t._v(" "),t._m(0),t._v(" "),n("h2",[t._v("Usage")]),t._v(" "),n("h3",[t._v("Comment Object")]),t._v(" "),t._m(1),t._v(" "),n("h3",[t._v("Payload Object")]),t._v(" "),t._m(2),t._v(" "),n("h2",[t._v("Parsing HTML")]),t._v(" "),n("p",[t._v("KtComment will escape all tags by default but you can opt out and pass your own parser by using the parser prop")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),n("div",{staticClass:"element-example"},[t._l(t.comments,(function(e){return n("KtComment",{key:e.id,attrs:{createdTime:e.createdTime,dangerouslyOverrideParser:t.dangerouslyOverrideParser,id:e.id,isDeletable:e.isDeletable,isEditable:e.isEditable,message:e.message,postEscapeParser:t.postEscapeParser,replies:e.replies,userAvatar:e.userAvatar,userId:e.userId,userName:e.userName},on:{delete:function(e){return t.handleDelete(e)},edit:function(e){return t.handleEdit(e)},submit:function(e){return t.handleSubmit(e)}}})})),t._v(" "),n("KtCommentInput",{staticClass:"mt-16px",attrs:{placeholder:"Add comment",userAvatar:"https://picsum.photos/120"},on:{submit:function(e){return t.handleSubmit(e)}}})],2),t._v(" "),n("h3",[t._v("Event")]),t._v(" "),t._m(5)],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-html"},[n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtComment")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("v-for")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment in comments"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":key")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.id"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":createdTime")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.createdTime"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":id")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.id"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":isDeletable")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.isDeletable"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":isEditable")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.isEditable"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":message")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.message"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":replies")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.replies"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":userAvatar")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.userAvatar"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":userId")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.userId"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v(":userName")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"comment.userName"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("delete")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handleDelete($event)"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("edit")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handleEdit($event)"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("submit")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handlePost($event)"')]),t._v("\n/>")]),t._v("\n"),n("span",{staticClass:"hljs-tag"},[t._v("<"),n("span",{staticClass:"hljs-name"},[t._v("KtCommentInput")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("class")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"mt-16px"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("placeholder")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"Add comment"')]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userAvatar")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"https://picsum.photos/120"')]),t._v("\n\t@"),n("span",{staticClass:"hljs-attr"},[t._v("submit")]),t._v("="),n("span",{staticClass:"hljs-string"},[t._v('"handlePost($event)"')]),t._v("\n/>")]),t._v("\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[t._v("{\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("id")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("1")]),t._v(", "),n("span",{staticClass:"hljs-comment"},[t._v("// Comment ID")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userId")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("12")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userName")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Margaret Atwood'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Marine Le Pen, a Fierce Campaigner'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("userAvatar")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'https://picsum.photos/200'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("createdTime")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'2018-12-04T09:57:20+00:00'")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("isDeletable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("isEditable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("true")]),t._v(",\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("replies")]),t._v(": [{\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("id")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("2")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("userId")]),t._v(": "),n("span",{staticClass:"hljs-number"},[t._v("12")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("userName")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Margaret Atwood'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'Marine Le Pen, a Fierce Campaigner'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("userAvatar")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'https://picsum.photos/200'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("createdTime")]),t._v(": "),n("span",{staticClass:"hljs-string"},[t._v("'2018-12-04T09:57:20+00:00'")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isDeletable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v(",\n\t\t"),n("span",{staticClass:"hljs-attr"},[t._v("isEditable")]),t._v(": "),n("span",{staticClass:"hljs-literal"},[t._v("false")]),t._v("\n\t}]\n}\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[n("span",{staticClass:"hljs-comment"},[t._v("// Submit Payload")]),t._v("\n{\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("parentId")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("Number")]),t._v(" "),n("span",{staticClass:"hljs-comment"},[t._v("// If null => parent comment")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("replyToUserId")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("Number")]),t._v(" "),n("span",{staticClass:"hljs-comment"},[t._v("// Reserved variable for @ function")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("String")]),t._v("\n}\n\n"),n("span",{staticClass:"hljs-comment"},[t._v("// Edit Payload")]),t._v("\n{\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("id")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("Number")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("message")]),t._v(": "),n("span",{staticClass:"hljs-built_in"},[t._v("String")]),t._v("\n}\n\n"),n("span",{staticClass:"hljs-comment"},[t._v("// Delete Payload")]),t._v("\n{\n}\n")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("Remember to "),e("strong",[this._v("escape malicious tags")]),this._v(" to prevent "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Cross-site_scripting"}},[this._v("Cross-site-scripting")]),this._v(" attacks,\nyou can use KtComment's default parser function with KtComment.defaultParser")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("pre",[n("code",{staticClass:"language-js"},[t._v("methods: {\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("dangerouslyOverrideParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" "),n("span",{staticClass:"hljs-built_in"},[t._v("escape")]),t._v("(msg).replace("),n("span",{staticClass:"hljs-regexp"},[t._v("/\\n/g")]),t._v(", "),n("span",{staticClass:"hljs-string"},[t._v("'<br>'")]),t._v("),\n\t"),n("span",{staticClass:"hljs-comment"},[t._v("// alternativly you could")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("dangerouslyOverrideParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" "),n("span",{staticClass:"hljs-built_in"},[t._v("escape")]),t._v("(msg),\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("postEscapeParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" msg.replace("),n("span",{staticClass:"hljs-regexp"},[t._v("/\\n/g")]),t._v(", "),n("span",{staticClass:"hljs-string"},[t._v("'<br/>'")]),t._v("),\n\t"),n("span",{staticClass:"hljs-comment"},[t._v("// or just")]),t._v("\n\t"),n("span",{staticClass:"hljs-attr"},[t._v("postEscapeParser")]),t._v(": "),n("span",{staticClass:"hljs-function"},[n("span",{staticClass:"hljs-params"},[t._v("msg")]),t._v(" =>")]),t._v(" msg.replace("),n("span",{staticClass:"hljs-regexp"},[t._v("/\\n/g")]),t._v(", "),n("span",{staticClass:"hljs-string"},[t._v("'<br/>'")]),t._v("),\n}\n")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("table",[n("thead",[n("tr",[n("th",[t._v("Event Name")]),t._v(" "),n("th",[t._v("Component")]),t._v(" "),n("th",[t._v("Payload")]),t._v(" "),n("th",[t._v("Description")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[n("code",[t._v("@submit")])]),t._v(" "),n("td",[n("code",[t._v("KtCommentInput")])]),t._v(" "),n("td",[t._v("See above")]),t._v(" "),n("td",[t._v("Add new comment")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("@delete")])]),t._v(" "),n("td",[n("code",[t._v("KtComment")])]),t._v(" "),n("td",[t._v("See above")]),t._v(" "),n("td",[t._v("Delete comment")])]),t._v(" "),n("tr",[n("td",[n("code",[t._v("@edit")])]),t._v(" "),n("td",[n("code",[t._v("KtComment")])]),t._v(" "),n("td",[t._v("See above")]),t._v(" "),n("td",[t._v("Edit comment")])])])])}],!1,null,null,null);e.default=component.exports}}]);