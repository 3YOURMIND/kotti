(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{923:function(e,t,o){"use strict";o.r(t);var n=o(322),r=o(5),l={name:"DocumentationPageExamplesLayouts",components:{LayoutContainer:o(448).a},layout:"empty",data:function(){return{isNarrow:!1,theme:n.a.Navbar.Theme.DEFAULT,Kotti:n.a,quickLinksData:[{title:"Create New Issue",link:"https://jira.3yourmind.com/secure/RapidBoard.jspa?rapidView=52"}],navbarMenu:[{links:[{icon:r.Yoco.Icon.DASHBOARD,isActive:!0,props:{href:"#"},title:"Dashboard"},{icon:r.Yoco.Icon.CLOSE,isActive:!0,component:"nuxt-link",props:{to:"/usage/layouts/navbar"},title:"Close Example"}],title:null},{links:[{icon:r.Yoco.Icon.INVOICE,isActive:!1,props:{href:"#"},title:"Orders"},{icon:r.Yoco.Icon.REQUEST,isActive:!1,props:{href:"#"},title:"Quotes"}],title:"Order Management"},{links:[{icon:r.Yoco.Icon.BOX_3D,isActive:!1,props:{href:"#"},title:"Parts"},{icon:r.Yoco.Icon.CALENDAR,isActive:!1,props:{href:"#"},title:"Schedule"}],title:"Agile MES"}],navbarNotification:{count:1,title:"Message",link:"#"},userMenuData:[{links:[{props:{href:"#"},title:"User Panel"},{props:{href:"#"},title:"Service Panel"}],title:"Switch To"},{links:[{props:{href:"#"},title:"2YOURMIND Service"},{props:{href:"#"},title:"3YOURMIND Service"},{props:{href:"#"},title:"4YOURMIND Service"}],title:"Recent Service"},{links:[{props:{href:"#"},title:"Settings"},{component:"nuxt-link",props:{to:"/usage/layouts/navbar"},title:"Logout (Close Example)"}],title:null}],actionbarMenu:[{label:"First Link",to:"/examples/layouts",icon:r.Yoco.Icon.USER,active:!1,disabled:!1},{label:"Second Link",to:"#",icon:r.Yoco.Icon.BASKET,active:!0},{label:"Third Link",to:"/",icon:r.Yoco.Icon.BELL,disabled:!0}]}},methods:{handleMenuClick:function(){alert("Link Clicked")},setIsNarrow:function(e){this.isNarrow=e}}},c=o(68),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("LayoutContainer",[o("KtNavbar",{attrs:{slot:"navbar",isNarrow:e.isNarrow,logoUrl:"https://via.placeholder.com/160x50",notification:e.navbarNotification,quickLinks:e.quickLinksData,sections:e.navbarMenu,theme:e.theme},on:{setIsNarrow:e.setIsNarrow},slot:"navbar"},[o("div",{attrs:{slot:"navbar-footer"},slot:"navbar-footer"},[o("KtUserMenu",{attrs:{sections:e.userMenuData,userName:"Jony'O Five",userStatus:"Invisible"},on:{click:function(t){return e.handleMenuClick(t)}}})],1)]),e._v(" "),o("KtActionbar",{attrs:{slot:"actionbar",headerTitle:"LayoutContainer Example",menu:e.actionbarMenu},slot:"actionbar"}),e._v(" "),o("div",{attrs:{slot:"workspace"},slot:"workspace"},[o("KtFieldSingleSelect",{attrs:{hideClear:"",isOptional:"",label:"Navbar Theme",options:[{label:"Reversed theme",value:e.Kotti.Navbar.Theme.REVERSE},{label:"Light theme",value:e.Kotti.Navbar.Theme.LIGHT},{label:"Dark theme",value:e.Kotti.Navbar.Theme.DARK},{label:"Default",value:e.Kotti.Navbar.Theme.DEFAULT}]},model:{value:e.theme,callback:function(t){e.theme=t},expression:"theme"}})],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);