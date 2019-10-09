require('dotenv').config()

const changeLoaderOptions = loaders => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['./assets']
        })
      }
    }
  }
}

module.exports = {
  env: {
      apis_base_url: process.env.API_BASE_URL,
      openpay_pub_key: process.env.OPENPAY_PUB_KEY,
  },
  server: {
    port: process.env.APP_SERVER_PORT, // default: 4445
    host: process.env.APP_SERVER_HOST, // default: 172.16.0.71
  },
  // mode: process.env.APP_MODE,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.APP_NAME }
    ],
    script: [
       { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
       { src: 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js' , ssr: false},
       { src: 'https://openpay.s3.amazonaws.com/openpay.v1.min.js' , ssr: false},
       { src: 'https://openpay.s3.amazonaws.com/openpay-data.v1.min.js' , ssr: false},
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js' },
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js' },
      // { src: 'libs/sidebar.js' },
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
       { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,500,700,800,900&display=swap' }
      // { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },

  css: [
    /* Import Font Awesome Icons Set */
    '~/node_modules/flag-icon-css/css/flag-icon.min.css',
    /* Import Font Awesome Icons Set */
    '~/node_modules/font-awesome/css/font-awesome.min.css',
    /* Import Simple Line Icons Set */
    '~/node_modules/simple-line-icons/css/simple-line-icons.css',
    /* Import Bootstrap Vue Styles */
    '~/node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    /* Import Core SCSS */
    { src: '~/assets/scss/style.scss', lang: 'scss' },
    { src: '~/assets/frontend/css/style.css', lang: 'css' },
    { src: '~/assets/backend/css/style.css', lang: 'css' },
    { src: '~/assets/frontend/css/bootstrap.min.css', lang: 'css' }
  ],

  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3ea8d8', height: '10px' },

  /*
  ** Style resources configuration
  */
  styleResources: {
    scss: './assets/scss/style.scss'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })

        const vueLoader = config.module.rules.find(
          ({loader}) => loader === 'vue-loader')
        const { options: {loaders} } = vueLoader || { options: {} }
        
        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
          }
        }

        config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
      }
    }
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/i18n',
    '~plugins/filters.js',
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/vue-star-rating', mode: 'client' },
    { src: '~/plugins/vue-owl-carousel', mode: 'client' },
    { src: '~plugins/vue-full-calendar', ssr: false },
    { src: '~plugins/vue-tour', ssr: false },
    { src: "~plugins/quill-editor.js", ssr: false }
  ],
  
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/router', 
    '@nuxtjs/axios', 
    '@nuxtjs/auth', 
    'bootstrap-vue/nuxt',
    'nuxt-vue-multiselect',
    'vue-scrollto/nuxt'
  ],

  axios: {
    baseURL: process.env.API_BASE_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  }
}
