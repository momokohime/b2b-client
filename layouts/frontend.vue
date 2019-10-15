<template>
  <div class="app">
    <FrontHeader/>
          <nuxt />
    <FrontFooter/>
  </div>
</template>

<script>

import  FrontHeader  from '~/components/frontend/header'
import  FrontFooter  from '~/components/frontend/footer'

import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'frontend',
  scrollToTop: true,
  components: {
    FrontHeader,
    FrontFooter,

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch:{
      $route (to, from){
          // console.log('route has been changed 00--00 ');
          var vm = this  
          const customer = vm.$store.state.cart.customer     
          this.$axios.post('/sync_cart_get', customer).then(function(response){
            const items = response.data
            vm.syncCart(items)
          }).catch(function(err){
            // console.log(err, 'Something went wrong while fetching the cart items..')
            console.log('Cart can not be synced !')
          })
      }
  },
  methods: {
    ...mapMutations({
      syncCart: 'cart/syncCart',
    })   

  }
};
</script>
