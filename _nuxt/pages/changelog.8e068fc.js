(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{660:function(t,e,r){var content=r(714);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(111).default)("6af42896",content,!0,{sourceMap:!1})},713:function(t,e,r){"use strict";var o=r(660);r.n(o).a},714:function(t,e,r){(e=r(110)(!1)).push([t.i,"section[data-v-78093f4c]  img{display:block;overflow:hidden;border:1px solid var(--ui-02);border-radius:5px}section[data-v-78093f4c]:not(:first-of-type){margin-top:64px}h2[data-v-78093f4c]{display:flex;align-items:center}h2 a[data-v-78093f4c]{color:inherit}.tags[data-v-78093f4c]{display:flex;flex-wrap:wrap;align-items:center;margin:-5px}.tags>*[data-v-78093f4c]{margin:5px}.tag[data-v-78093f4c]{display:flex;align-items:stretch;overflow:hidden;border:1px solid var(--color);border-radius:3px}.tag__left[data-v-78093f4c],.tag__right[data-v-78093f4c]{display:flex;align-items:center;padding:2px 8px}.tag__left[data-v-78093f4c]>:not(:first-child),.tag__right[data-v-78093f4c]>:not(:first-child){margin-left:5px}.tag img[data-v-78093f4c]{width:1em;height:1em}.tag a.tag__right[data-v-78093f4c]:hover{text-decoration:underline}.tag__left[data-v-78093f4c]{font-weight:700;color:var(--color);background-color:var(--background-color);border-right:1px solid var(--color)}.content[data-v-78093f4c]{margin-top:16px}",""]),t.exports=e},831:function(t,e,r){"use strict";r.r(e);r(190),r(251),r(192);var o=r(50),n=r(826),l=r(0),c=r(703),d=r.n(c),v=r(98),_=r(704),f=r.n(_),m=r(705),h=r.n(m),C=new n.a,x=Object(l.defineComponent)({name:"DocumentationPageChangelog",layout:"fullpage",setup:function(){var t=Object(l.ref)(!0),e=Object(l.ref)([]);return Object(l.onBeforeMount)(Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,C.repos.listReleases({owner:"3yourmind",per_page:1e3,repo:"kotti"});case 2:e.value=r.sent.data,t.value=!1;case 4:case"end":return r.stop()}}),r)})))),{dayjs:d.a,isLoading:t,renderMarkdown:function(t){return f()(t.replace(/#(\d+)/g,"[#$1](https://github.com/3YOURMIND/kotti/issues/$1)"))},releases:e,sortedReleases:Object(l.computed)((function(){return Object(v.cloneDeep)(e.value).sort((function(a,b){return h()({direction:"desc"})(a.tag_name,b.tag_name)}))}))}}}),k=(r(713),r(59)),component=Object(k.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h1",[t._v("Changelog")]),t._v(" "),t.isLoading?r("div",[r("div",{staticClass:"skeleton rectangle md"}),t._v(" "),r("div",{staticClass:"skeleton rectangle lg"}),t._v(" "),r("br"),t._v(" "),r("div",{staticClass:"skeleton rectangle md"}),t._v(" "),r("div",{staticClass:"skeleton rectangle lg"}),t._v(" "),r("br"),t._v(" "),r("div",{staticClass:"skeleton rectangle md"}),t._v(" "),r("div",{staticClass:"skeleton rectangle lg"})]):t._l(t.sortedReleases,(function(e){return r("section",{key:e.tag_name},[r("h2",[r("a",{attrs:{href:"#"+e.tag_name,name:e.tag_name},domProps:{textContent:t._s(e.name)}})]),t._v(" "),r("div",{staticClass:"tags"},[e.prerelease?r("div",{staticClass:"tag",staticStyle:{"--color":"var(--yellow-70)","--background-color":"var(--yellow-20)"}},[r("div",{staticClass:"tag__left"},[t._v("⚠️")]),t._v(" "),r("div",{staticClass:"tag__right",domProps:{textContent:t._s("Prerelease")}})]):t._e(),t._v(" "),r("div",{staticClass:"tag",staticStyle:{"--color":"var(--green-70)","--background-color":"var(--green-20)"}},[r("div",{staticClass:"tag__left"},[t._v("Tag")]),t._v(" "),r("a",{staticClass:"tag__right",attrs:{href:e.html_url},domProps:{textContent:t._s(e.tag_name)}})]),t._v(" "),r("div",{staticClass:"tag",staticStyle:{"--color":"var(--primary-70)","--background-color":"var(--primary-20)"}},[r("div",{staticClass:"tag__left"},[t._v("Date")]),t._v(" "),r("div",{staticClass:"tag__right",domProps:{textContent:t._s(t.dayjs(e.created_at).format("YYYY-MM-DD"))}})]),t._v(" "),r("div",{staticClass:"tag",staticStyle:{"--color":"var(--red-70)","--background-color":"var(--red-20)"}},[r("div",{staticClass:"tag__left"},[t._v("NPM")]),t._v(" "),r("a",{staticClass:"tag__right",attrs:{href:"https://npmjs.com/package/@3yourmind/kotti-ui/v/"+e.tag_name.replace(/^v/,"")},domProps:{textContent:t._s(e.tag_name)}})]),t._v(" "),r("div",{staticClass:"tag",staticStyle:{"--color":"var(--orange-70)","--background-color":"var(--orange-20)"}},[r("div",{staticClass:"tag__left"},[t._v("Released By")]),t._v(" "),r("a",{staticClass:"tag__right",attrs:{href:e.author.html_url}},[r("img",{attrs:{src:e.author.avatar_url}}),t._v(" "),r("div",{domProps:{textContent:t._s(e.author.login)}})])])]),t._v(" "),r("div",{staticClass:"content",domProps:{innerHTML:t._s(t.renderMarkdown(e.body))}})])}))],2)}),[],!1,null,"78093f4c",null);e.default=component.exports}}]);