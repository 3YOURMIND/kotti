const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/kotti/'
  }
} : {}

const outputDir = process.env.DEPLOY_ENV === 'GH_PAGES' ? 'docs' : 'dist' 

module.exports = {
  ...routerBase,
  /*
  ** Headers of the page
  */
  head: {
    title: 'Kotti Design System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{ description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  css: [
    // Load a node module directly (here it's a SASS file)
    'spectre.css',
    // CSS file in the project
    // '@/assets/css/main.css',
    // SCSS file in the project
    '@/assets/css/main.scss'
  ],
  plugins: [
    { src: '~plugins/vue-highlightjs.js', ssr: false },
    { src: '~plugins/vue-clipboard.js', ssr: false }
  ],
  loading: { color: '#2C64CC' },
  /*
  ** Build configuration
  */
  generate: {
    dir: outputDir
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
