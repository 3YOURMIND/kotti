import KtNavbar from './src/Navbar';

KtNavbar.install = function(Vue) {
	Vue.component(KtNavbar.name, KtNavbar);
};

export default KtNavbar;
