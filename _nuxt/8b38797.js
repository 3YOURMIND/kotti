(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{1052:function(e,t,n){"use strict";n.r(t);var o=n(8),r=n(2),l=n(436),c=n(292),h={name:"DocumentationPageExamplesLayouts",components:{LayoutContainer:l.a},layout:"empty",data:function(){return{isNarrow:!1,theme:o.a.Navbar.Theme.DEFAULT,Kotti:o.a,quickLinksData:[{title:"Create New Issue",link:"https://jira.3yourmind.com/secure/RapidBoard.jspa?rapidView=52"}],navbarMenu:[{links:[{icon:r.a.Icon.DASHBOARD,isActive:!0,props:{href:"#"},title:"Dashboard"},{icon:r.a.Icon.CLOSE,isActive:!0,component:"nuxt-link",props:{to:"/usage/layouts/navbar"},title:"Close Example"}],title:null},{links:[{icon:r.a.Icon.INVOICE,isActive:!1,props:{href:"#"},title:"Orders"},{icon:r.a.Icon.REQUEST,isActive:!1,props:{href:"#"},title:"Quotes"}],title:"Order Management"},{links:[{icon:r.a.Icon.BOX_3D,isActive:!1,props:{href:"#"},title:"Parts"},{icon:r.a.Icon.CALENDAR,isActive:!1,props:{href:"#"},title:"Schedule"}],title:"Agile MES"}],navbarNotification:{count:1,title:"Message",link:"#"},userMenuData:[{links:[{props:{href:"#"},title:"User Panel"},{props:{href:"#"},title:"Service Panel"}],title:"Switch To"},{links:[{props:{href:"#"},title:"2YOURMIND Service"},{props:{href:"#"},title:"3YOURMIND Service"},{props:{href:"#"},title:"4YOURMIND Service"}],title:"Recent Service"},{links:[{props:{href:"#"},title:"Settings"},{component:"nuxt-link",props:{to:"/usage/layouts/navbar"},title:"Logout (Close Example)"}],title:null}],actionbarMenu:[{label:"First Link",to:"/examples/layouts",icon:r.a.Icon.USER,active:!1,disabled:!1},{label:"Second Link",to:"#",icon:r.a.Icon.BASKET,active:!0},{label:"Third Link",to:"/",icon:r.a.Icon.BELL,disabled:!0}]}},methods:{handleMenuClick:function(){Object(c.b)({text:"Link Clicked"})},setIsNarrow:function(e){this.isNarrow=e}}},v=n(27),component=Object(v.a)(h,(function(){var e=this,t=e._self._c;return t("LayoutContainer",{scopedSlots:e._u([{key:"navbar",fn:function(){return[t("KtNavbar",{attrs:{isNarrow:e.isNarrow,logoUrl:"https://via.placeholder.com/160x50",notification:e.navbarNotification,quickLinks:e.quickLinksData,sections:e.navbarMenu,theme:e.theme},on:{setIsNarrow:e.setIsNarrow},scopedSlots:e._u([{key:"navbar-footer",fn:function(){return[t("KtUserMenu",{attrs:{sections:e.userMenuData,userName:"Jony'O Five",userStatus:"Invisible"},on:{click:function(t){return e.handleMenuClick(t)}}})]},proxy:!0}])})]},proxy:!0},{key:"actionbar",fn:function(){return[t("KtActionbar",{attrs:{headerTitle:"LayoutContainer Example",menu:e.actionbarMenu}})]},proxy:!0},{key:"workspace",fn:function(){return[t("KtFieldSingleSelect",{attrs:{hideClear:"",isOptional:"",label:"Navbar Theme",options:[{label:"Reversed theme",value:e.Kotti.Navbar.Theme.REVERSE},{label:"Light theme",value:e.Kotti.Navbar.Theme.LIGHT},{label:"Dark theme",value:e.Kotti.Navbar.Theme.DARK},{label:"Default",value:e.Kotti.Navbar.Theme.DEFAULT}]},model:{value:e.theme,callback:function(t){e.theme=t},expression:"theme"}})]},proxy:!0}])})}),[],!1,null,null,null);t.default=component.exports}}]);