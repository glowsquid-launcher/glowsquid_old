import Vue from 'vue'
import VuetifyToast from 'vuetify-toast-snackbar'

export default ({ $vuetify }, inject) => {
  Vue.use(VuetifyToast, {
    timeout: 5000,
    queuable: true,
    $vuetify,
    y: 'top'
  })
  inject('toast', Vue.prototype.$toast)
}
