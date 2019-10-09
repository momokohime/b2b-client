<template>
  <div class="app">
    <AppHeader/>
    <div class="profile-tab-sec">
        <div class="container header-sec">
          <b-row>
            <div class="app-body">
                <AppSidebar/>
                <nuxt />
            </div>
          </b-row>
        </div>
      </div>
    <AppFooter/>
  </div>
</template>

<script>

import  AppHeader  from '~/components/frontend/header'
import  AppSidebar  from '~/components/frontend/AccountSidebar'
import  AppFooter  from '~/components/frontend/footer'
import  mapGetters  from 'vuex';

export default {
  name: 'profile',
  components: {
    AppHeader,
    AppSidebar,
    AppFooter,

  },
  data () {
    return {

    }
  },
};
</script>
