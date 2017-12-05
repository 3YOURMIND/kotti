var iconStrings = [
  'announce',
  '3dbox',
  'attachment',
  'bell',
  'calendar',
  'card',
  'charts',
  'chevron_down',
  'chevron_left',
  'chevron_right',
  'chevron_up',
  'circle_attention',
  'circle_check',
  'circle_cross',
  'circle_i',
  'circle_load',
  'circle_question',
  'clock',
  'close',
  'cloud_download',
  'cloud_upload',
  'cloud',
  'comment',
  'copy',
  'dashboard',
  'dimension',
  'dots_vertical',
  'dots',
  'download',
  'upload',
  'edit',
  'exit_fullscreen',
  'eye',
  'file',
  'filter',
  'folder',
  'fullscreen',
  'global',
  'heart',
  'invoice',
  'layer',
  'list',
  'minus',
  'not_allow',
  'permission',
  'picture',
  'plus',
  'print',
  'save',
  'scale',
  'search',
  'setting',
  'share',
  'shop',
  'start',
  'support',
  'tag',
  'tech',
  'trash',
  'triangle_down',
  'triangle_up',
  'triangle_right',
  'triangle_left',
  'user',
  'usergroup',
  'view',
  'zip'
]

var app = new Vue({
  el: '#app',
  data: {
    iconString: iconStrings,
    copySuccess: false,
    showHowToUse: false,
    showLogs: false,
  },
  methods: {
    copyLiga(string) {
      let vm = this;
      let codeString = `<i class="yoco">${string}</i>`
      this.$copyText(codeString).then(function (e) {
        vm.copySuccess = true;
        setTimeout(() => {
          vm.copySuccess = false;
        }, 2000);
      }, function(e) {
        alert('failed');
      })
    },
    show() {
      console.log('dld');
    }
  }
})