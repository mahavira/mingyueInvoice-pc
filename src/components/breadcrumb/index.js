import { mapState } from 'vuex'
export default {
  name: 'ComponentsBreadcrumb',
  computed: {
    ...mapState(['breadcrumb'])
  }
}
