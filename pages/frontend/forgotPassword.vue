<template>
    <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h2>Forgot Password</h2>
                 <b-form @submit.prevent="forgotPwd" >
              

                <div class="alert alert-danger" role="alert" v-show="error">
                  {{ error }}
                </div>

                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <input class="form-control"  type="email" name="email" v-model="form.email" placeholder="Email" >
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" type="submit" class="px-4">Login</b-button>
                  </b-col>
                </b-row>
              </b-form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>

</template>

<script>
import Notification from '~/components/Notification';
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Login',
  layout: 'frontend',
  middleware: 'guest',

  components: {
    Notification,
  },

  data() {
    return {
      form: {
        email: '',
      },
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      loggedInUser: 'loggedInUser',
    })
  },
  methods: {


   async forgotPwd(){
      console.log(this.form)
     // var data =
      await this.$axios.post(`forgot/password`, this.form)
        .then(response => { 
          var _r = response.data
            console.log( this.response.data)
          })
        .catch(e => {
           // this.errors.push(e)
        })
    }
  },
};
</script>

