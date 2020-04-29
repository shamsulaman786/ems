import Vue from 'vue'
import Vuetify from 'vuetify'
import store from '~/store'
import router from '~/router'
import { i18n } from '~/plugins'
import App from '~/components/App'
import '~/components'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueHtmlToPaper from 'vue-html-to-paper'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
    'https://cdn.jsdelivr.net/npm/vuetify@1.x/dist/vuetify.min.css'
  ]
}

Vue.use(VueHtmlToPaper, options)

// or, using the defaults with no stylesheet
Vue.use(VueHtmlToPaper)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  store,
  router,
  ...App
})
