import KtTable from './src/Table';

KtTable.install = function(Vue) {
	Vue.component(KtTable.name, KtTable);
};

export default KtTable;
