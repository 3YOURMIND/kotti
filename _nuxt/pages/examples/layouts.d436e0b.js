(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{959:function(e,t,o){"use strict";o.r(t);var n=o(10),l={name:"DocumentationPageExamplesLayouts",components:{LayoutContainer:o(484).a},layout:"empty",data:function(){return{isNarrow:!1,theme:null,quickLinksData:[{title:"Create New Issue",link:"https://jira.3yourmind.com/secure/RapidBoard.jspa?rapidView=52"}],navbarMenu:[{links:[{icon:n.Yoco.Icon.DASHBOARD,isActive:!0,props:{href:"#"},title:"Dashboard"},{icon:n.Yoco.Icon.CLOSE,isActive:!0,component:"nuxt-link",props:{to:"/usage/layouts/navbar"},title:"Close Example"}],title:null},{links:[{icon:n.Yoco.Icon.INVOICE,isActive:!1,props:{href:"#"},title:"Orders"},{icon:n.Yoco.Icon.REQUEST,isActive:!1,props:{href:"#"},title:"Quotes"}],title:"Order Management"},{links:[{icon:n.Yoco.Icon.BOX_3D,isActive:!1,props:{href:"#"},title:"Parts"},{icon:n.Yoco.Icon.CALENDAR,isActive:!1,props:{href:"#"},title:"Schedule"}],title:"Agile MES"}],navbarNotification:{count:1,title:"Message",link:"#"},userMenuData:[{links:[{props:{href:"#"},title:"User Panel"},{props:{href:"#"},title:"Service Panel"}],title:"Switch To"},{links:[{props:{href:"#"},title:"2YOURMIND Service"},{props:{href:"#"},title:"3YOURMIND Service"},{props:{href:"#"},title:"4YOURMIND Service"}],title:"Recent Service"},{links:[{props:{href:"#"},title:"Settings"},{component:"nuxt-link",props:{to:"/usage/layouts/navbar"},title:"Logout (Close Example)"}],title:null}],actionbarMenu:[{label:"First Link",to:"/examples/layouts",icon:n.Yoco.Icon.USER,active:!1,disabled:!1},{label:"Second Link",to:"#",icon:n.Yoco.Icon.BASKET,active:!0},{label:"Third Link",to:"/",icon:n.Yoco.Icon.BELL,disabled:!0}]}},methods:{handleMenuClick:function(){alert("Link Clicked")},setIsNarrow:function(e){this.isNarrow=e}}},r=o(57),component=Object(r.a)(l,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("LayoutContainer",[o("KtNavbar",{attrs:{slot:"navbar",isNarrow:e.isNarrow,logoUrl:"https://via.placeholder.com/160x50",notification:e.navbarNotification,quickLinks:e.quickLinksData,sections:e.navbarMenu,theme:e.theme},on:{setIsNarrow:e.setIsNarrow},slot:"navbar"},[o("div",{attrs:{slot:"navbar-footer"},slot:"navbar-footer"},[o("KtUserMenu",{attrs:{sections:e.userMenuData,userName:"Jony'O Five",userStatus:"Invisible"},on:{click:function(t){return e.handleMenuClick(t)}}})],1)]),e._v(" "),o("KtActionbar",{attrs:{slot:"actionbar",headerTitle:"LayoutContainer Example",menu:e.actionbarMenu},slot:"actionbar"}),e._v(" "),o("div",{attrs:{slot:"workspace"},slot:"workspace"},[o("KtFieldSingleSelect",{attrs:{hideClear:"",isOptional:"",label:"Navbar Theme",options:[{label:"Reversed theme",value:"reverse"},{label:"Light theme",value:"light"},{label:"Dark theme",value:"dark"},{label:"None",value:null}]},model:{value:e.theme,callback:function(t){e.theme=t},expression:"theme"}})],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);