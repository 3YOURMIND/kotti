(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{726:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(357);var c=n(417);function r(t){return function(t){if(Array.isArray(t))return Object(o.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(c.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},733:function(t,e,n){var o=n(38),c=n(734).entries;o({target:"Object",stat:!0},{entries:function(t){return c(t)}})},734:function(t,e,n){var o=n(81),c=n(288),r=n(109),l=n(358).f,d=function(t){return function(e){for(var n,d=r(e),f=c(d),m=f.length,i=0,j=[];m>i;)n=f[i++],o&&!l.call(d,n)||j.push(t?[n,d[n]]:d[n]);return j}};t.exports={entries:d(!0),values:d(!1)}},741:function(t,e,n){"use strict";n.r(e),n.d(e,"isComponentName",(function(){return f})),n.d(e,"createActions",(function(){return m})),n.d(e,"createRemoteUpload",(function(){return j})),n.d(e,"generateComponentCode",(function(){return O}));n(354),n(177),n(359),n(519),n(176),n(155),n(733),n(286),n(226),n(287);var o=n(195),c=n(229),r=n(726),l=n(353),d=["KtFieldDate","KtFieldDateRange","KtFieldDateTime","KtFieldDateTimeRange","KtFieldFileUpload","KtFieldFileUploadRemote","KtFieldMultiSelect","KtFieldMultiSelectRemote","KtFieldNumber","KtFieldPassword","KtFieldRadioGroup","KtFieldSingleSelect","KtFieldSingleSelectRemote","KtFieldText","KtFieldTextArea","KtFieldToggle","KtFieldToggleGroup","KtFilters","KtValueLabel"],f=function(t){return d.includes(t)},m=function(t){return t?[{label:"Create Item",onClick:function(){return alert("actions[0].onClick called")}},{label:"Edit Item",onClick:function(){return alert("actions[1].onClick called")}}]:void 0},j=function(t){return t?{actions:{onCancel:function(t){return console.log("onCancel: ".concat(t))},onDelete:function(t){return console.log("onDelete: ".concat(t))},onRetry:function(t){return console.log("onRetry: ".concat(t))},onUpload:function(t){return console.log("onUpload: ".concat(t))}},payload:{}}:void 0},v=function(component){var t=j(component.hasRemoteUpload);return t?"".concat(Object(r.a)(Object.entries(t).map((function(t){var e=Object(c.a)(t,2),n=e[0],o=e[1];return"actions"===n?["\t:".concat(n,": {")].concat(Object(r.a)(Object.keys(o).map((function(t){return"\t\t".concat(t,": (id: number | string) => {},")}))),["\t},"]).join("\n"):"payload"===n?"\t:".concat(n,": ").concat(JSON.stringify(o).replace(/"/g,"'"),","):void 0})).filter((function(t){return t}))).join("\n")):null},S=function(component){return null!==component.contentSlot||null!==component.defaultSlot||component.hasHelpTextSlot||null!==component.headerSlot?[">"].concat(Object(r.a)(null!==component.contentSlot?['\t<template #content :option="option">',"\t\t".concat(component.contentSlot),"\t</template>"]:[]),Object(r.a)(null!==component.defaultSlot?["\t".concat(component.defaultSlot)]:[]),Object(r.a)(component.hasHelpTextSlot?["\t<template #helpText>","\t\t<div>","\t\t\tSlot Content","\t\t</div>","\t</template>"]:[]),Object(r.a)(null!==component.headerSlot?['\t<template #header :option="option">',"\t\t".concat(component.headerSlot),"\t</template>"]:[]),["</".concat(component.name,">")]).join("\n"):"/>"},O=function(component){var t,e;return["<".concat(component.name)].concat(Object(r.a)(Object.entries(component.props).sort((function(t,e){var a=Object(c.a)(t,1)[0],b=Object(c.a)(e,1)[0];return a.localeCompare(b)})).filter((function(t){var e=Object(c.a)(t,2),n=e[0],o=e[1];return!!["query"].includes(n)||null!==o&&!1!==o})).filter((function(t){var e=Object(c.a)(t,2),n=e[0],o=e[1];return!("size"===n&&o===l.a.Field.Size.MEDIUM||"helpText"===n&&component.hasHelpTextSlot||"extensions"===n&&Array.isArray(o)&&0===o.length||"actions"===n||"payload"===n)})).map((function(t){var e=Object(c.a)(t,2),n=e[0],r=e[1];switch(Object(o.a)(r)){case"boolean":return n;case"string":return"".concat(n,'="').concat(r,'"');default:return":".concat(n,'="').concat(JSON.stringify(r).replace(/"/g,"'"),'"')}})).map((function(t){return"\t".concat(t)}))),Object(r.a)(component.hasActions?['\t:actions="'.concat(JSON.stringify(null!==(e=null===(t=m(!0))||void 0===t?void 0:t.map((function(a){return"{ label: '".concat(a.label,"', onClick: () => {} }")})))&&void 0!==e?e:[]).replaceAll('"',""),'"')]:[]),Object(r.a)("empty"===component.validation?[]:["\t:validator=\"(value) => ({ text: 'Some Validation Text', type: \"".concat(component.validation,'" })"')]),[v(component),S(component)]).filter((function(t){return t})).join("\n")}}}]);