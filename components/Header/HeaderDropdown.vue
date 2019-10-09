<template>
      <b-nav-item-dropdown right no-caret>
       
        <template slot="button-content">
         <!--  @error="img404()" -->
          <img :src="loggedInUser.image"  class="img-avatar" >
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Configuración</strong></b-dropdown-header>
      <b-dropdown-item class="profileHead"><nuxt-link to="/dashboard/settings"><i class="fa fa-user"></i> Perfil</nuxt-link></b-dropdown-item>
        <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Cerrar sesión</b-dropdown-item>
      </b-nav-item-dropdown>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'header-dropdown',
    data: () => {
      return { itemsCount: 42,}
    },
     computed: {
    ...mapGetters({
     loggedInUser: 'loggedInUser',
     })
    },
    methods: {
      async logout() {
        this.$store.commit('cart/logout')
        this.$store.commit('products/logout')
        await this.$auth.logout();
      },
       img404() {
        this.loggedInUser.image = '/img/avatar.png'
      },
    }
  };
</script>


