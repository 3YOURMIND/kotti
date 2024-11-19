(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{1067:function(t,e,n){"use strict";n.r(e);var o=n(21),r=n(6),l=(n(92),n(856),n(871),n(76),n(40),n(206),n(455),n(0)),c=n(8),d=n(2),v=n(839),_=n(292),f=Object(l.defineComponent)({name:"DocumentationPageUsageComponentsButton",components:{ComponentInfo:v.a},setup:function(){var t=Object(l.ref)(c.a.Button.ToggleStatus.OFF),e=Object(l.ref)(c.a.Button.ToggleStatus.OFF),n=Object(l.ref)({booleanFlags:{isDisabled:null,isLoading:null},dataTest:null,icon:null,iconPosition:null,label:"Split Button",size:c.a.SplitButton.Size.MEDIUM,type:c.a.SplitButton.Type.DEFAULT});return{iconOptions:Object.values(d.a.Icon).map((function(t){return{label:t,value:t}})),info:_.b,ktButtonComponent:c.h,ktSplitButtonComponent:c.T,onToggleDefaultClick:function(e){t.value=e},onToggleTextClick:function(t){e.value=t},settings:n,splitButtonProps:Object(l.computed)((function(){return Object.fromEntries([].concat(Object(r.a)(Object.entries(n.value).filter((function(t){return"booleanFlags"!==Object(o.a)(t,1)[0]}))),Object(r.a)(Object.entries(n.value.booleanFlags))).filter((function(t){var e=Object(o.a)(t,2);e[0];return null!==e[1]})))})),toggleDefaultIcon:Object(l.computed)((function(){return t.value===c.a.Button.ToggleStatus.ON?"check":"close"})),toggleDefaultLabel:Object(l.computed)((function(){return t.value===c.a.Button.ToggleStatus.ON?"DEFAULT ON":"DEFAULT OFF"})),toggleDefaultStatus:t,toggleTextIcon:Object(l.computed)((function(){return e.value===c.a.Button.ToggleStatus.ON?"check":"close"})),toggleTextLabel:Object(l.computed)((function(){return e.value===c.a.Button.ToggleStatus.ON?"TEXT ON":"TEXT OFF"})),toggleTextStatus:e}}}),m=(n(974),n(27)),component=Object(m.a)(f,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",[e("ComponentInfo",t._b({},"ComponentInfo",{component:t.ktButtonComponent},!1)),t._v(" "),e("p",[t._v("\n\t\t\tUse buttons to lead a call to action or guide a user to their next steps.\n\t\t")]),t._v(" "),e("h2",[t._v("Labels")]),t._v(" "),e("p",[t._v("\n\t\t\tThe label text explains the purpose of the button, which should be clear,\n\t\t\tself-explanatory and short.\n\t\t")]),t._v(" "),e("img",{attrs:{alt:"Button labels",src:n(973)}}),t._v(" "),t._m(0),t._v(" "),e("h2",[t._v("Types")]),t._v(" "),e("div",{staticClass:"element-example white"},[e("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"primary"},on:{click:function(e){return t.info({text:"primary"})}}},[t._v("\n\t\t\t\tPrimary Button\n\t\t\t")]),t._v(" "),e("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"secondary"},on:{click:function(e){return t.info({text:"secondary"})}}},[t._v("\n\t\t\t\tSecondary Button\n\t\t\t")]),t._v(" "),e("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"danger"},on:{click:function(e){return t.info({text:"danger"})}}},[t._v("\n\t\t\t\tDanger Button\n\t\t\t")]),t._v(" "),e("KtButton",{staticClass:"mt-4 mr-4",on:{click:function(e){return t.info({text:"default"})}}},[t._v("\n\t\t\t\tDefault Button\n\t\t\t")]),t._v(" "),e("KtButton",{staticClass:"mt-4 mr-4",attrs:{type:"text"},on:{click:function(e){return t.info({text:"text"})}}},[t._v("\n\t\t\t\tText Button\n\t\t\t")])],1),t._v(" "),e("h4",[t._v("Primary button")]),t._v(" "),e("p",[t._v("\n\t\t\tUse the primary button to lead a main call to action, such as changing the\n\t\t\tstatus of an order, or submitting a form. We suggest only using one\n\t\t\tprimary button on each page (not including the primary button on a\n\t\t\tdifferent layer). If there is another strong action needed, compare their\n\t\t\tpriority and choose the most important one.\n\t\t")]),t._v(" "),e("h4",[t._v("Secondary Button")]),t._v(" "),e("p",[t._v("\n\t\t\tUse a secondary button only when there is a main call to action in the\n\t\t\tpage.\n\t\t")]),t._v(" "),e("h4",[t._v("Danger Button")]),t._v(" "),e("p",[t._v("\n\t\t\tThe danger button should be used only for actions which can't be undone.\n\t\t\tFor example, canceling an order or deleting a material. Like the primary\n\t\t\tbutton, it should also limited to once per page.\n\t\t")]),t._v(" "),e("h4",[t._v("Default button")]),t._v(" "),e("p",[t._v("This button can be used in most cases.")]),t._v(" "),e("h4",[t._v("Text button")]),t._v(" "),t._m(1),t._v(" "),e("h2",[t._v("Label")]),t._v(" "),e("div",{staticClass:"element-example"},[e("KtButton",{attrs:{icon:"edit",label:"Edit Button",type:"primary"}})],1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),e("h2",[t._v("Icon")]),t._v(" "),e("div",{staticClass:"element-example"},[e("KtButton",{staticClass:"mr-4",attrs:{type:"primary"}},[t._v("Edit button")]),t._v(" "),e("KtButton",{staticClass:"mr-4",attrs:{icon:"edit",label:"Edit Button",type:"primary"}}),t._v(" "),e("KtButton",{attrs:{icon:"edit",iconPosition:"right",label:"Right Icon Button",type:"primary"}}),t._v(" "),e("KtButton",{attrs:{helpText:"This is an icon button",icon:"edit",type:"primary"}})],1),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),t._m(7),t._v(" "),e("div",{staticClass:"element-example white"},[e("KtButton",{staticClass:"mr-4",attrs:{icon:t.toggleDefaultIcon,toggleStatus:t.toggleDefaultStatus,type:"default"},on:{"update:toggleStatus":function(e){return t.onToggleDefaultClick(e)}}},[t._v(t._s(t.toggleDefaultLabel))]),t._v(" "),e("KtButton",{staticClass:"mr-4",attrs:{icon:t.toggleTextIcon,label:t.toggleTextLabel,toggleStatus:t.toggleTextStatus,type:"text"},on:{"update:toggleStatus":function(e){return t.onToggleTextClick(e)}}})],1),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),t._m(10),t._v(" "),e("div",{staticClass:"element-example"},[e("div",{staticStyle:{width:"200px"}},[e("KtButton",{attrs:{block:"",type:"primary"}},[t._v("Purchase")]),e("br"),t._v(" "),e("KtButton",{attrs:{icon:"save",isBlock:"",isMultiline:""}},[t._v("Purchase this product without the 5 year garantee")]),e("br"),t._v(" "),e("KtButton",{attrs:{isBlock:"",isMultiline:""}},[t._v("Purchase this product without the 5 year garantee and proceed with\n\t\t\t\t\tthe 2 year only garantee")])],1),t._v(" "),e("br"),t._v(" "),e("br"),t._v(" "),e("KtButton",{attrs:{isMultiline:""}},[t._v("Multiline works on one line if the parent does not constraint the\n\t\t\t\twidth")]),e("br"),t._v(" "),e("KtButton",{attrs:{isMultiline:""}},[t._v("(But the height is less reliable as it uses\n\t\t\t\t"),e("code",[t._v("line-height")]),t._v(")")])],1),t._v(" "),e("h2",[t._v("Loading")]),t._v(" "),e("div",{staticClass:"element-example"},[e("KtButton",{staticClass:"mr-16px",attrs:{icon:"edit",isLoading:""}},[t._v("Loading button")]),t._v(" "),e("KtButton",{staticClass:"mr-16px",attrs:{icon:"edit",iconPosition:"right",isLoading:"",type:"primary"}},[t._v("Loading button")]),t._v(" "),e("KtButton",{staticClass:"mr-16px",attrs:{isLoading:"",type:"secondary"}},[t._v("Loading")]),t._v(" "),e("KtButton",{staticClass:"mr-16px",attrs:{isLoading:"",type:"danger"}},[t._v("Loading")])],1),t._v(" "),t._m(11),t._v(" "),e("h2",[t._v("Button Group")]),t._v(" "),e("div",{staticClass:"element-example"},[e("KtButtonGroup",[e("KtButton",{attrs:{icon:"edit",type:"primary"}},[t._v("Edit")]),t._v(" "),e("KtButton",{attrs:{icon:"trash",type:"secondary"}},[t._v("Delete")])],1)],1),t._v(" "),t._m(12),t._v(" "),e("h2",[t._v("Size")]),t._v(" "),e("div",{staticClass:"element-example"},[e("KtButton",{staticClass:"mr-16px",attrs:{icon:"edit",size:"small",type:"primary"}},[t._v("Small")]),t._v(" "),e("KtButton",{staticClass:"mr-16px",attrs:{isLoading:"",size:"medium"}},[t._v("Medium (Default)")]),t._v(" "),e("KtButton",{attrs:{icon:"edit",size:"large"}},[t._v("Large")])],1),t._v(" "),t._m(13),t._v(" "),t._m(14),t._v(" "),t._m(15),t._v(" "),t._m(16),t._v(" "),e("br"),t._v(" "),e("ComponentInfo",t._b({},"ComponentInfo",{component:t.ktSplitButtonComponent},!1)),t._v(" "),e("p",[t._v("\n\t\t\tA split button lets someone take one of several related actions. The\n\t\t\tdominant action is the left button, while additional actions are tucked\n\t\t\taway in a popover menu that is triggered by clicking on the dropdown\n\t\t\tbutton.\n\t\t")]),t._v(" "),e("div",{staticClass:"element-example"},[e("KtSplitButton",t._b({staticClass:"mr-4",attrs:{actions:[{icon:"calendar",label:"Action 1",onClick:function(){return t.info({text:"Action 1"})},dataTest:"action-1"},{icon:"landline",label:"Action 2",onClick:function(){return t.info({text:"Action 2"})},dataTest:"action-2"},{icon:"location",label:"Action 3",onClick:function(){return t.info({text:"Action 3"})},dataTest:"action-3",isDisabled:!0}]},on:{click:function(e){return t.info({text:t.splitButtonProps.label})}}},"KtSplitButton",t.splitButtonProps,!1)),t._v(" "),e("KtSplitButton",t._b({attrs:{actions:[{label:"Action 4",onClick:function(){return t.info({text:"Action 4"})},dataTest:"action-4"},{label:"Action 5",onClick:function(){return t.info({text:"Action 5"})},dataTest:"action-5",isDisabled:!0},{label:"Action 6",onClick:function(){return t.info({text:"Action 6"})},dataTest:"action-6"}]},on:{click:function(e){return t.info({text:t.splitButtonProps.label})}}},"KtSplitButton",t.splitButtonProps,!1))],1),t._v(" "),e("KtForm",{attrs:{size:"small"},model:{value:t.settings,callback:function(e){t.settings=e},expression:"settings"}},[e("div",{staticClass:"wrapper"},[e("div",[e("h4",[t._v("Settings")]),t._v(" "),e("KtFieldSingleSelect",{attrs:{formKey:"type",hideClear:"",isUnsorted:"",label:"type",options:[{label:"default (default)",value:"default"},{label:"primary",value:"primary"}]}}),t._v(" "),e("KtFieldSingleSelect",{attrs:{formKey:"size",hideClear:"",isUnsorted:"",label:"size",options:[{label:"small",value:"small"},{label:"medium (default)",value:"medium"},{label:"large",value:"large"}]}}),t._v(" "),e("KtFieldToggleGroup",{attrs:{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"isDisabled",label:"isDisabled"},{key:"isLoading",label:"isLoading"}],type:"switch"}})],1),t._v(" "),e("div",[e("h4",[t._v("Texts")]),t._v(" "),e("KtFieldText",{attrs:{formKey:"label",label:"label"}}),t._v(" "),e("KtFieldText",{attrs:{formKey:"dataTest",isOptional:"",label:"dataTest"}}),t._v(" "),e("h4",[t._v("Decoration")]),t._v(" "),e("div",{staticClass:"field-row"},[e("KtFieldSingleSelect",{attrs:{formKey:"icon",isOptional:"",label:"icon",options:t.iconOptions},scopedSlots:t._u([{key:"option",fn:function(n){var option=n.option;return[e("i",{staticClass:"yoco",staticStyle:{"margin-right":"10px","font-size":"24px"},domProps:{textContent:t._s(option.value)}}),t._v(" "),e("span",{domProps:{textContent:t._s(option.label)}})]}}])}),t._v(" "),e("KtFieldSingleSelect",{attrs:{formKey:"iconPosition",isOptional:"",isUnsorted:"",label:"iconPosition",options:[{label:"left (default)",value:"left"},{label:"right",value:"right"}]}})],1)],1)])]),t._v(" "),t._m(17),t._v(" "),e("h3",[t._v("Best practices")]),t._v(" "),t._m(18)],1)}),[function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[e("code",[t._v("Yes/No")]),t._v(" buttons are not self-explanatory, the user needs to\n\t\t\tread the context to understand the action. Using\n\t\t\t"),e("code",[t._v("Cancel/Replace")]),t._v(" buttons let the user respond quickly without\n\t\t\tthinking.\n\t\t")])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[t._v("\n\t\t\tA text button can be used for sub-menus and page navigation. It also can\n\t\t\tpair with a primary button for destructive actions such as\n\t\t\t"),e("code",[t._v("Cancel")]),t._v(".\n\t\t")])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[t._v("\n\t\t\tInstead of using the default slot, you can also provide text via the\n\t\t\t"),e("code",[t._v("label")]),t._v(" property. Note that "),e("code",[t._v("v-text")]),t._v(" and\n\t\t\t"),e("code",[t._v("v-t")]),t._v(" are "),e("strong",[t._v("NOT SUPPORTED")]),t._v(".\n\t\t")])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{attrs:{"data-lang":"html"}},[t._v('\n<KtButton type="primary" icon="edit" label="Edit Button" />\n        ')])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("ul",[e("li",[e("strong",[t._v("Label only:")]),t._v(" Used in most cases.")]),t._v(" "),e("li",[e("strong",[t._v("Icon and label:")]),t._v(" Use when you need to catch the user's\n\t\t\t\tattention.\n\t\t\t")]),t._v(" "),e("li",[e("strong",[t._v("Icon only:")]),t._v(" Use when you have limited space, such as\n\t\t\t\twhen the page needs to fit on a mobile device, and a single icon is\n\t\t\t\tenough to convey the meaning,\n\t\t\t")]),t._v(" "),e("li",[e("strong",[t._v("iconPosition")]),t._v(" prop can be used to place icon to the\n\t\t\t\tright of the label. Is left by default.\n\t\t\t")]),t._v(" "),e("li",[e("strong",[t._v("helpText")]),t._v(" prop can be passed to\n\t\t\t\t"),e("strong",[t._v("Icon only")]),t._v(" buttons that is displayed on button hover.\n\t\t\t")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{attrs:{"data-lang":"html"}},[t._v('\n<KtButton type="primary">Edit button</KtButton>\n<KtButton type="primary" icon="edit" label="Edit Button" />\n<KtButton type="primary" icon="edit" helpText="This is an icon button" />\n<KtButton type="primary" icon="edit" label="Right Icon Button" iconPosition="right" />\n        ')])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("h2",[e("code",[t._v("toggleStatus")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("ul",[e("li",[t._v("\n\t\t\t\tFor buttons that are "),e("strong",[t._v("toggleable")]),t._v(', and can have two\n\t\t\t\tdifferent status: "ON" or "OFF"\n\t\t\t')]),t._v(" "),e("li",[t._v("\n\t\t\t\tThis prop is only valid for buttons of type\n\t\t\t\t"),e("strong",[t._v('"default"')]),t._v(" or type "),e("strong",[t._v('"text"')]),t._v(".\n\t\t\t")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("h2",[e("code",[t._v("isMultiline")]),t._v("/"),e("code",[t._v("isBlock")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[t._v("\n\t\t\tFor handling long text, we can use the "),e("code",[t._v("isMultiline")]),t._v(" and\n\t\t\t"),e("code",[t._v("isBlock")]),t._v(" properties.\n\t\t")])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{attrs:{"data-lang":"html"}},[t._v("\n<KtButton>Purchase</KtButton>\n<KtButton isMultiline>Purchase this product without the 5 year garantee and proceed with the 2 year only garantee</KtButton>\n        ")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{attrs:{"data-lang":"html"}},[t._v('\n<KtButton isLoading>Loading button</KtButton>\n<KtButton type="primary" isLoading>Loading button</KtButton>\n<KtButton type="secondary" isLoading />\n<KtButton type="danger" isLoading />\n        ')])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{attrs:{"data-lang":"html"}},[t._v('\n<KtButtonGroup>\n    <KtButton type="primary" icon="edit">Edit</KtButton>\n    <KtButton type="secondary" icon="trash">Delete</KtButton>\n</KtButtonGroup>\n        ')])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[e("code",[t._v("KtButton")]),t._v(" has 3 size: "),e("code",[t._v("small")]),t._v(",\n\t\t\t"),e("code",[t._v("medium")]),t._v(" and "),e("code",[t._v("large")]),t._v(".\n\t\t")])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{attrs:{"data-lang":"html"}},[t._v('\n<KtButton type="primary" size="small" icon="edit">Small</KtButton>\n<KtButton isLoading size="medium">Medium (Default)</KtButton>\n<KtButton size="large" icon="edit">>Large</KtButton>\n        ')])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("h2",[e("code",[t._v("isSubmit")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("p",[t._v("\n\t\t\tIf you want the button to trigger the native "),e("code",[t._v("form")]),t._v(" "),e("code",[t._v("submit")]),t._v(" event, you need to opt-in via\n\t\t\t"),e("code",[t._v("<KtButton isSubmit />")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("pre",[e("code",{attrs:{"data-lang":"html"}},[t._v("\n<KtSplitButton\n    :actions=\"[\n        { icon: 'calendar', label: 'Action 1', onClick: () => info({text: 'Action 1'}), dataTest: 'calendar' },\n        { icon: 'landline', label: 'Action 2', onClick: () => info({text: 'Action 2'}), dataTest: 'landline' },\n        { icon: 'location', label: 'Action 3', onClick: () => info({text: 'Action 3'}), dataTest: 'location', isDisabled: true },\n    ]\"\n    dataTest=\"btn-1\"\n    icon=\"download\"\n    label=\"Split Button\"\n    type=\"primary\"\n    @click=\"info({text: 'Split Button'})\"\n/>\n        ")])])},function(){var t=this,e=t._self._c;t._self._setupProxy;return e("ul",[e("li",[t._v("\n\t\t\t\tWhen there isn't a clear default action, present all options equally by\n\t\t\t\tusing a dropdown menu or button group.\n\t\t\t")]),t._v(" "),e("li",[t._v("\n\t\t\t\tTry to keep the number of secondary actions to a minimum to aid focus\n\t\t\t\tand comprehension.\n\t\t\t")]),t._v(" "),e("li",[t._v("\n\t\t\t\tRemember that some users may miss the secondary action entirely, so\n\t\t\t\tensure users aren't required to interact with the secondary action to\n\t\t\t\tproceed. In other words, make sure the main action button allows people\n\t\t\t\tto proceed in most cases.\n\t\t\t")]),t._v(" "),e("li",[t._v("Do not repeat the default action in the secondary actions menu.")]),t._v(" "),e("li",[t._v("\n\t\t\t\tAvoid grouping actions that are dissimilar in the secondary actions\n\t\t\t\tmenu.\n\t\t\t")]),t._v(" "),e("li",[t._v('\n\t\t\t\tTo represent a ”more actions” button, use a simple dropdown menu button\n\t\t\t\twith the "...” icon.\n\t\t\t')])])}],!1,null,"6d420f2e",null);e.default=component.exports},837:function(t,e,n){var content=n(850);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(63).default)("258f50c4",content,!0,{sourceMap:!1})},838:function(t,e,n){var content=n(852);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(63).default)("7f9a7731",content,!0,{sourceMap:!1})},839:function(t,e,n){"use strict";var o=n(21),r=(n(90),n(206),n(846),n(840),n(455),n(40),n(112),n(113),n(91),n(76),n(207),n(93),n(208),n(5)),l=n(6),c=(n(64),n(114),n(92),n(289),n(209)),d=n(117),v=n.n(d),_=n(291),f=n.n(_),m=n(0),h=n(8),y=n(2),x=(n(146),Object(m.defineComponent)({name:"ComponentInfoSlots",components:{KtHeading:h.L},props:{slots:{required:!0,type:Object}},setup:function(){return{showSlots:Object(m.ref)(!1)}}})),C=(n(849),n(27)),w=Object(C.a)(x,(function(){var t=this,e=t._self._c;t._self._setupProxy;return Object.entries(t.slots).length>0?e("KtHeading",{attrs:{text:"Slots",toggleStatus:t.showSlots,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showSlots=!t.showSlots}}},[e("article",{staticClass:"slots-block"},t._l(Object.entries(t.slots),(function(n){var r=Object(o.a)(n,2),l=r[0],details=r[1];return e("section",{key:l},[e("div",{staticClass:"header"},[e("div",{staticClass:"header__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",{staticClass:"header__details"},[details.description?e("div",{staticClass:"header__description",domProps:{textContent:t._s(details.description)}}):e("div",{staticClass:"header__empty-description",domProps:{textContent:t._s("No description")}}),t._v(" "),null===details.scope?e("div",{staticClass:"header__empty-scope",domProps:{textContent:t._s("(Not Scoped)")}}):t._e()])]),t._v(" "),null!==details.scope?e("div",{staticClass:"scope"},t._l(Object.entries(details.scope),(function(n){var r=Object(o.a)(n,2),l=r[0],c=r[1],d=c.description,v=c.type;return e("div",{key:l,staticClass:"scope__item"},[e("div",{class:"scope__type scope__type--is-".concat(v),domProps:{textContent:t._s(v)}}),t._v(" "),e("div",{staticClass:"scope__name",domProps:{textContent:t._s(l)}}),t._v(" "),e("div",null===d?{staticClass:"scope__description scope__description--is-empty",domProps:{textContent:t._s("No Description")}}:{staticClass:"scope__description",domProps:{textContent:t._s(d)}})])})),0):t._e()])})),0)]):t._e()}),[],!1,null,"18a948b4",null).exports;function k(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var B=Object(m.defineComponent)({name:"ComponentInfo",components:{ComponentInfoSlots:w,KtHeading:h.L},props:{component:{required:!0,type:Object}},setup:function(t){return{Dashes:c.Dashes,labels:Object(m.computed)((function(){var e=[],n=t.component,o=n.meta,c=o.addedVersion,d=o.componentFolder,v=o.deprecated,_=o.designs,m=o.typeScript,y=n.name,x=null!=d?d:f()(y.replace(/^Kt/,"Kotti")),C=t.component.props?"https://github.com/3YOURMIND/kotti/blob/master/packages/kotti-ui/source/".concat(x):null;return null!==v&&e.push({backgroundColor:"var(--red-20)",color:"var(--red-70)",left:"Deprecated for",right:"v".concat(v.version)}),null!==_?Array.isArray(_)?e.push.apply(e,Object(l.a)(_.map((function(t){return{backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design “".concat(t.title,"”"),link:t.url,right:Object(r.a)({},h.a.MetaDesignType.FIGMA,"Figma")[t.type]}})))):e.push({backgroundColor:"var(--yellow-20)",color:"var(--yellow-70)",left:"Design",link:_.url,right:Object(r.a)({},h.a.MetaDesignType.FIGMA,"Figma")[_.type]}):e.push({backgroundColor:"var(--orange-20)",color:"var(--orange-70)",left:"Design",right:"MISSING"}),m&&e.push({backgroundColor:"var(--primary-20)",color:"var(--primary-70)",left:"TS",link:C?"".concat(C,"/types.ts"):void 0,right:m.namespace}),e.push(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?k(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({backgroundColor:"var(--green-20)",color:"var(--green-70)",left:"Added"},null===c?{right:"unknown"}:{link:"https://github.com/3YOURMIND/kotti/releases/tag/v".concat(c),right:"v".concat(c)})),C&&e.push({backgroundColor:"var(--purple-20)",color:"var(--purple-70)",left:"Source",link:"".concat(C,"/").concat(y,".vue"),right:"".concat(y,".vue")}),e})),showEmits:Object(m.ref)(!1),showProps:Object(m.ref)(!1),stringifyPropDefault:function(t,e){return"function"==typeof t?v()(e).some((function(t){return"Function"===t.name}))?"".concat(t.toString()," *"):"".concat(JSON.stringify(t())," *"):JSON.stringify(t)},stringifyType:function(t){return v()(t).map((function(t){return t.name.toLowerCase()})).join(" | ")},Yoco:y.a}}}),K=B,O=(n(851),Object(C.a)(K,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{staticClass:"component-info-container"},[e("div",{staticClass:"component-info",class:{"component-info--is-deprecated":null!==t.component.meta.deprecated}},[e("h1",{staticClass:"component-info__title",domProps:{textContent:t._s(t.component.name)}}),t._v(" "),e("div",[e("div",{staticClass:"component-info__labels"},t._l(t.labels,(function(label,n){return e("div",{key:n,staticClass:"component-info-label",style:"--background-color: ".concat(label.backgroundColor,"; --color: ").concat(label.color)},[e("div",{staticClass:"component-info-label__left",domProps:{textContent:t._s(label.left)}}),t._v(" "),label.link?e("a",{staticClass:"component-info-label__right",attrs:{href:label.link,rel:"noreferrer noopener",target:"_blank"},domProps:{textContent:t._s(label.right)}}):e("div",{staticClass:"component-info-label__right",domProps:{textContent:t._s(label.right)}})])})),0)])]),t._v(" "),null!==t.component.meta.deprecated?e("article",{staticClass:"danger-block"},[e("section",[t._v("\n\t\t\tThis component is deprecated and will be removed in Kotti\n\t\t\t"),e("strong",{domProps:{textContent:t._s("v".concat(t.component.meta.deprecated.version))}})]),t._v(" "),e("section",[e("div",[e("strong",[t._v("Reason")]),t._v(": "+t._s(t.component.meta.deprecated.reason)+"\n\t\t\t")]),t._v(" "),e("div",[e("strong",{domProps:{textContent:t._s(t.component.meta.deprecated.alternatives.length<2?"Alternative":"Alternatives")}}),t._v(":\n\t\t\t\t"),t._l(t.component.meta.deprecated.alternatives,(function(n){return e("code",{key:n,domProps:{textContent:t._s(n)}})})),t._v(" "),0===t.component.meta.deprecated.alternatives.length?e("span",{domProps:{textContent:t._s(t.Dashes.EmDash)}}):t._e()],2)])]):t._e(),t._v(" "),t.component.props?e("KtHeading",{attrs:{text:"Properties",toggleStatus:t.showProps,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showProps=!t.showProps}}},[e("table",[e("thead",[e("th",[t._v("Name")]),t._v(" "),e("th",[t._v("Type")]),t._v(" "),e("th",[t._v("Default")]),t._v(" "),e("th",[t._v("Validator")])]),t._v(" "),e("tbody",t._l(Object.entries(t.component.props).sort((function(t,e){var a=Object(o.a)(t,1)[0],b=Object(o.a)(e,1)[0];return a.localeCompare(b)})),(function(n){var r=Object(o.a)(n,2),l=r[0],c=r[1];return e("tr",{key:l},[e("td",[e("code",{domProps:{textContent:t._s(l)}})]),t._v(" "),e("td",[e("code",{domProps:{textContent:t._s(t.stringifyType(c.type))}})]),t._v(" "),e("td",[c.required?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("required")}}):void 0===c.default?e("code",{staticStyle:{"font-style":"italic"},domProps:{textContent:t._s("No default")}}):e("code",{domProps:{textContent:t._s(t.stringifyPropDefault(c.default,c.type))}})]),t._v(" "),e("td",[e("div",{staticStyle:{display:"flex","align-items":"center"}},[e("i",{staticClass:"yoco",style:{color:c.validator?"var(--green-50)":"var(--red-50)"},attrs:{title:c.validator?c.validator.toString():void 0},domProps:{textContent:t._s(c.validator?t.Yoco.Icon.CHECK:t.Yoco.Icon.CLOSE)}}),t._v(" "),c.validator?e("div",{domProps:{textContent:t._s(c.validator.name)}}):t._e()])])])})),0)])]):t._e(),t._v(" "),t.component.emits&&t.component.emits.length>0?e("KtHeading",{attrs:{text:"Emits",toggleStatus:t.showEmits,toggleCloseText:"Hide",toggleText:"Show",type:"toggle"},on:{toggle:function(e){t.showEmits=!t.showEmits}}},[e("div",{staticStyle:{display:"flex","flex-wrap":"wrap",gap:"4px"}},[t._l(t.component.emits,(function(n){return[e("code",{key:n,domProps:{textContent:t._s("@".concat(n))}})]}))],2)]):t._e(),t._v(" "),e("ComponentInfoSlots",{attrs:{slots:t.component.meta.slots}})],1)}),[],!1,null,"6e674bb8",null));e.a=O.exports},840:function(t,e,n){"use strict";var o=n(10),r=n(12),l=n(66),c=n(52),d=n(71),v=n(841),_=n(35),f=n(11),m=n(842),h=n(290),y=n(843),x=n(844),C=n(145),w=n(845),k=[],B=r(k.sort),K=r(k.push),O=f((function(){k.sort(void 0)})),P=f((function(){k.sort(null)})),S=h("sort"),T=!f((function(){if(C)return C<70;if(!(y&&y>3)){if(x)return!0;if(w)return w<603;var code,t,e,n,o="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)k.push({k:t+n,v:e})}for(k.sort((function(a,b){return b.v-a.v})),n=0;n<k.length;n++)t=k[n].k.charAt(0),o.charAt(o.length-1)!==t&&(o+=t);return"DGBEFHACIJK"!==o}}));o({target:"Array",proto:!0,forced:O||!P||!S||!T},{sort:function(t){void 0!==t&&l(t);var e=c(this);if(T)return void 0===t?B(e):B(e,t);var n,o,r=[],f=d(e);for(o=0;o<f;o++)o in e&&K(r,e[o]);for(m(r,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:_(e)>_(n)?1:-1}}(t)),n=d(r),o=0;o<n;)e[o]=r[o++];for(;o<f;)v(e,o++);return e}})},841:function(t,e,n){"use strict";var o=n(116),r=TypeError;t.exports=function(t,e){if(!delete t[e])throw new r("Cannot delete property "+o(e)+" of "+o(t))}},842:function(t,e,n){"use strict";var o=n(115),r=Math.floor,l=function(t,e){var n=t.length;if(n<8)for(var element,c,i=1;i<n;){for(c=i,element=t[i];c&&e(t[c-1],element)>0;)t[c]=t[--c];c!==i++&&(t[c]=element)}else for(var d=r(n/2),v=l(o(t,0,d),e),_=l(o(t,d),e),f=v.length,m=_.length,h=0,y=0;h<f||y<m;)t[h+y]=h<f&&y<m?e(v[h],_[y])<=0?v[h++]:_[y++]:h<f?v[h++]:_[y++];return t};t.exports=l},843:function(t,e,n){"use strict";var o=n(111).match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},844:function(t,e,n){"use strict";var o=n(111);t.exports=/MSIE|Trident/.test(o)},845:function(t,e,n){"use strict";var o=n(111).match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},846:function(t,e,n){"use strict";var o=n(10),r=n(847);o({target:"String",proto:!0,forced:n(848)("link")},{link:function(t){return r(this,"a","href",t)}})},847:function(t,e,n){"use strict";var o=n(12),r=n(65),l=n(35),c=/"/g,d=o("".replace);t.exports=function(t,e,n,o){var v=l(r(t)),_="<"+e;return""!==n&&(_+=" "+n+'="'+d(l(o),c,"&quot;")+'"'),_+">"+v+"</"+e+">"}},848:function(t,e,n){"use strict";var o=n(11);t.exports=function(t){return o((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},849:function(t,e,n){"use strict";n(837)},850:function(t,e,n){var o=n(62)((function(i){return i[1]}));o.push([t.i,".slots-block[data-v-18a948b4]{background:var(--support-info-light);border:1px solid var(--support-info-dark);border-radius:3px;color:var(--support-info-dark)}.slots-block>*[data-v-18a948b4]{padding:.4rem .6rem}.slots-block[data-v-18a948b4]>:not(:first-child){border-top:1px solid var(--support-info-dark)}.header[data-v-18a948b4]{align-items:center;display:flex;flex:1}.header__details[data-v-18a948b4]{flex:1}.header__name[data-v-18a948b4]{font-weight:700}.header>*[data-v-18a948b4]{align-items:center;display:flex}.header[data-v-18a948b4]>:not(:first-child){margin-left:.4rem}.header__description[data-v-18a948b4]{flex:1}.header__empty-description[data-v-18a948b4]{flex:1;font-style:italic}.header__empty-scope[data-v-18a948b4]{font-style:italic}.scope[data-v-18a948b4]{margin-left:1.5rem}.scope__item[data-v-18a948b4]{align-items:center;display:flex}.scope__item[data-v-18a948b4]>:not(:first-child){margin-left:.3rem}.scope__description--is-empty[data-v-18a948b4]{font-style:italic}.scope__name[data-v-18a948b4]{font-weight:700;min-width:100px}.scope__type[data-v-18a948b4]{min-width:60px}.scope__type--is-function[data-v-18a948b4]{color:var(--orange-50)}.scope__type--is-object[data-v-18a948b4]{color:var(--purple-50)}.scope__type--is-integer[data-v-18a948b4]{color:var(--green-50)}",""]),o.locals={},t.exports=o},851:function(t,e,n){"use strict";n(838)},852:function(t,e,n){var o=n(62)((function(i){return i[1]}));o.push([t.i,".component-info[data-v-6e674bb8]{display:flex;flex-wrap:wrap;margin:-5px -10px}@media(min-width:960px){.component-info[data-v-6e674bb8]{align-items:center;flex-direction:row}}.component-info>*[data-v-6e674bb8]{display:flex;margin:5px 10px}.component-info__labels[data-v-6e674bb8]{align-items:center;display:flex;flex-wrap:wrap;margin:-5px}.component-info--is-deprecated .component-info__title[data-v-6e674bb8]{-webkit-text-decoration:underline wavy var(--red-50);text-decoration:underline wavy var(--red-50);-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}.component-info-label[data-v-6e674bb8]{border:1px solid var(--color);border-radius:3px;display:flex;margin:5px;overflow:hidden}.component-info-label__left[data-v-6e674bb8],.component-info-label__right[data-v-6e674bb8]{padding:2px 8px}.component-info-label a.component-info-label__right[data-v-6e674bb8]:hover{-webkit-text-decoration:underline;text-decoration:underline}.component-info-label__left[data-v-6e674bb8]{background-color:var(--background-color);border-right:1px solid var(--color);color:var(--color);font-weight:700}.component-info-container[data-v-6e674bb8]{margin-bottom:32px}.component-info-container[data-v-6e674bb8]>:not(:first-child){margin-top:16px}.danger-block[data-v-6e674bb8]{background:var(--support-error-light);border:1px solid var(--support-error-dark);border-radius:3px;color:var(--red-70)}.danger-block a[data-v-6e674bb8]{color:inherit;-webkit-text-decoration:underline;text-decoration:underline}.danger-block code+code[data-v-6e674bb8]{margin-left:8px}.danger-block>section[data-v-6e674bb8]{padding:.4rem .6rem}.danger-block>section[data-v-6e674bb8]:not(:first-child){border-top:1px solid var(--support-error-dark)}",""]),o.locals={},t.exports=o},856:function(t,e,n){"use strict";var o=n(10),r=n(456).values;o({target:"Object",stat:!0},{values:function(t){return r(t)}})},871:function(t,e,n){"use strict";var o=n(10),r=n(295),l=n(148);o({target:"Object",stat:!0},{fromEntries:function(t){var e={};return r(t,(function(t,n){l(e,t,n)}),{AS_ENTRIES:!0}),e}})},895:function(t,e,n){var content=n(975);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(63).default)("0d8a4725",content,!0,{sourceMap:!1})},973:function(t,e,n){t.exports=n.p+"img/button_label.7f6b3bb.png"},974:function(t,e,n){"use strict";n(895)},975:function(t,e,n){var o=n(62)((function(i){return i[1]}));o.push([t.i,"pre[data-v-6d420f2e]{-moz-tab-size:2;-o-tab-size:2;tab-size:2}li[data-v-6d420f2e]{list-style:none}h3[data-v-6d420f2e]{border-bottom:0}.wrapper[data-v-6d420f2e]{background-color:var(--ui-01);border:1px solid var(--ui-02);border-radius:var(--border-radius);display:flex;flex-direction:column;margin:0 0 1.5em}@media(width < 960px){.wrapper[data-v-6d420f2e]{flex-direction:column}.wrapper[data-v-6d420f2e]>:not(:first-child){border-top:1px solid var(--ui-02)}}@media(min-width:960px){.wrapper[data-v-6d420f2e]{flex-direction:row}.wrapper>*[data-v-6d420f2e]{flex:1}.wrapper[data-v-6d420f2e]>:not(:last-child){border-right:1px solid var(--ui-02)}}.wrapper>*[data-v-6d420f2e]{margin:0!important;padding:1.5em}.field-row[data-v-6d420f2e]{display:flex}.field-row>*[data-v-6d420f2e]{flex:1}.field-row[data-v-6d420f2e]>:not(:first-child){margin-left:10px}.overview[data-v-6d420f2e]{display:flex;margin-bottom:20px}@media(width < 960px){.overview[data-v-6d420f2e]{flex-direction:column}.overview[data-v-6d420f2e]>:not(:first-child){margin-top:5px}}@media(min-width:960px){.overview[data-v-6d420f2e]{flex-direction:row}.overview>*[data-v-6d420f2e]{flex:1;flex-basis:0}.overview__code>pre[data-v-6d420f2e]{max-width:400px}.overview__component>*[data-v-6d420f2e]{margin-right:20px}}.overview__component[data-v-6d420f2e]{display:flex;flex-direction:column;justify-content:space-between}.overview__component-value span[data-v-6d420f2e]{font-family:monospace;word-break:break-word}.overview__code>pre[data-v-6d420f2e]{height:150px;margin:0;overflow:scroll}",""]),o.locals={},t.exports=o}}]);