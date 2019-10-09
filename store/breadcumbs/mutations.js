export default {
   setBreadCrumb(state, crumbs) {
    state.breadcrumbs = crumbs
    console.log(crumbs)
    // this.$axios.post('/sync_cart', { items: [], customer: state.customer })
  },
}