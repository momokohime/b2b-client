<template>
    <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Iniciar sesión</h1>
                 <b-form @submit.prevent="login" >
                <p class="text-muted">¡Bienvenido de nuevo!</p>

                <div class="alert alert-danger" role="alert" v-show="error">
                  {{ error }}
                </div>

                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                  <input class="form-control"  type="email" name="email" v-model="email" placeholder="Email" >
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input type="password" name="password" v-model="password" class="form-control" placeholder="Password">
                </b-input-group>
                <b-row class="login-btn-n-sec">
                  <b-col cols="12" class="col-md-7">
                    <b-button variant="primary" type="submit" class="px-4">Iniciar sesión</b-button>
                    <nuxt-link class="btn px-4 btn-primary" to="signup">Registro</nuxt-link>
                  </b-col>
                  <b-col cols="12" class="col-md-5 login-footer-sec">
                    <router-link to="/frontend/forgotPassword">¿Olvidaste tu contraseña?</router-link>
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
      email: '',
      password: '',
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
    async login() {
      this.error = null;
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },

        });
         this.$router.push('/dashboard');
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
  },
};
</script>

