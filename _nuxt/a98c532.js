(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{1038:function(t,e,r){"use strict";r(978)},1039:function(t,e,r){var o=r(63)((function(i){return i[1]}));o.push([t.i,"section[data-v-58bd993c] img{border:1px solid var(--ui-02);border-radius:5px;display:block;overflow:hidden}section[data-v-58bd993c]:not(:first-of-type){margin-top:64px}h2[data-v-58bd993c]{align-items:center;display:flex}h2 a[data-v-58bd993c]{color:inherit}.tags[data-v-58bd993c]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.tags>*[data-v-58bd993c]{margin:5px}.tag[data-v-58bd993c]{align-items:stretch;border:1px solid var(--color);border-radius:3px;display:flex;overflow:hidden}.tag__left[data-v-58bd993c],.tag__right[data-v-58bd993c]{align-items:center;display:flex;padding:2px 8px}.tag__left[data-v-58bd993c]>:not(:first-child),.tag__right[data-v-58bd993c]>:not(:first-child){margin-left:5px}.tag img[data-v-58bd993c]{height:1em;width:1em}.tag a.tag__right[data-v-58bd993c]:hover{-webkit-text-decoration:underline;text-decoration:underline}.tag__left[data-v-58bd993c]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.content[data-v-58bd993c]{margin-top:16px}",""]),o.locals={},t.exports=o},1137:function(t,e,r){"use strict";r.r(e);r(98),r(65),r(127);var o=r(14),n=(r(104),r(958),r(938),r(1133)),l=r(216),c=r.n(l),d=r(62),v=r.n(d),_=r(1004),m=r(1026),f=r.n(m),h=r(0),C=new n.a,x=Object(h.defineComponent)({name:"DocumentationPageChangelog",layout:"fullpage",setup:function(){var t=Object(h.ref)(!0),e=Object(h.ref)([]);return Object(h.onBeforeMount)(Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,C.repos.listReleases({owner:"3yourmind",per_page:1e3,repo:"kotti"});case 2:e.value=r.sent.data,t.value=!1;case 4:case"end":return r.stop()}}),r)})))),{dayjs:c.a,isLoading:t,renderMarkdown:function(t){return _.marked.parse(t.replaceAll(/#(\d+)/g,"[#$1](https://github.com/3YOURMIND/kotti/issues/$1)"))},releases:e,sortedReleases:Object(h.computed)((function(){return v()(e.value).sort((function(a,b){return f()({direction:"desc"})(a.tag_name,b.tag_name)}))}))}}}),k=(r(1038),r(32)),component=Object(k.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[e("h1",[t._v("Changelog")]),t._v(" "),t.isLoading?e("div",[e("div",{staticClass:"skeleton rectangle md"}),t._v(" "),e("div",{staticClass:"skeleton rectangle lg"}),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"skeleton rectangle md"}),t._v(" "),e("div",{staticClass:"skeleton rectangle lg"}),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"skeleton rectangle md"}),t._v(" "),e("div",{staticClass:"skeleton rectangle lg"})]):t._l(t.sortedReleases,(function(r){return e("section",{key:r.tag_name},[e("h2",[e("a",{attrs:{href:"#".concat(r.tag_name),name:r.tag_name},domProps:{textContent:t._s(r.name)}})]),t._v(" "),e("div",{staticClass:"tags"},[r.prerelease?e("div",{staticClass:"tag",style:{"--color":"var(--yellow-70)","--background-color":"var(--yellow-20)"}},[e("div",{staticClass:"tag__left"},[t._v("⚠️")]),t._v(" "),e("div",{staticClass:"tag__right",domProps:{textContent:t._s("Prerelease")}})]):t._e(),t._v(" "),e("div",{staticClass:"tag",style:{"--color":"var(--green-70)","--background-color":"var(--green-20)"}},[e("div",{staticClass:"tag__left"},[t._v("Tag")]),t._v(" "),e("a",{staticClass:"tag__right",attrs:{href:r.html_url},domProps:{textContent:t._s(r.tag_name)}})]),t._v(" "),e("div",{staticClass:"tag",style:{"--color":"var(--primary-70)","--background-color":"var(--primary-20)"}},[e("div",{staticClass:"tag__left"},[t._v("Date")]),t._v(" "),e("div",{staticClass:"tag__right",domProps:{textContent:t._s(t.dayjs(r.created_at).format("YYYY-MM-DD"))}})]),t._v(" "),e("div",{staticClass:"tag",style:{"--color":"var(--red-70)","--background-color":"var(--red-20)"}},[e("div",{staticClass:"tag__left"},[t._v("NPM")]),t._v(" "),e("a",{staticClass:"tag__right",attrs:{href:"https://npmjs.com/package/@3yourmind/kotti-ui/v/".concat(r.tag_name.replace(/^v/,""))},domProps:{textContent:t._s(r.tag_name)}})]),t._v(" "),e("div",{staticClass:"tag",style:{"--color":"var(--orange-70)","--background-color":"var(--orange-20)"}},[e("div",{staticClass:"tag__left"},[t._v("Released By")]),t._v(" "),e("a",{staticClass:"tag__right",attrs:{href:r.author.html_url}},[e("img",{attrs:{src:r.author.avatar_url}}),t._v(" "),e("div",{domProps:{textContent:t._s(r.author.login)}})])])]),t._v(" "),r.body?[e("div",{staticClass:"content",domProps:{innerHTML:t._s(t.renderMarkdown(r.body))}})]:t._e()],2)}))],2)}),[],!1,null,"58bd993c",null);e.default=component.exports},978:function(t,e,r){var content=r(1039);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(64).default)("ecd89556",content,!0,{sourceMap:!1})}}]);