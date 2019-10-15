<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Agregar Supervisor</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>

          <!-- Form fields -->
          <b-form @submit.prevent="salesman" >
            <!-- form starts -->
        

          <b-form-group
                  label="Nombre"
                  label-for="basicName"
                  label-cols-lg="3"
                  >
            <b-form-input id="basicName" type="text"  v-model="form.salesman.name" placeholder="Ingresa nombre del Supervisor"></b-form-input>
          </b-form-group>

          <b-form-group
                  label="Email"
                  label-for="basicEmail"
                  label-cols-lg="3"
                  >
            <b-form-input id="basicEmail" type="email"  v-model="form.salesman.email" placeholder="Ingresa mail de vendedor"></b-form-input>
          </b-form-group>

          <b-form-group
                  label="Contraseña"
                  label-for="basicPassword"
                  label-cols-lg="3"
                  >
            <b-form-input id="basicPassword" :type="passwordFieldType"  v-model="form.salesman.password" placeholder="Ingresa contraseña"></b-form-input>

            <b-input-group-append class="sucure-sec"><a @click="switchVisibility">
              <b-input-group-text><i class="fa fa-eye"></i></b-input-group-text>
            </a></b-input-group-append>

          </b-form-group>   

          <div slot="footer">
             <div class="form-actions">
                <b-button type="submit" variant="primary">{{ $t('save_changes') }}</b-button>
                <b-button type="button" @click="cancel" variant="secondary">{{ $t('cancel') }}</b-button>
              </div>
          </div>
          </b-form>
        </b-card>
       
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import Fields from '~/pages/dashboard/salesman/form'

export default {
  name: 'forms',
  layout: 'dashboard',
  middleware: 'auth',

  // async asyncData({ $axios }) {
  //   var options = await $axios.get('/users/dropdown');
  //   var options = options.data.data
  //   return { options }
  // },

  data () {
    return { 
      error: null,
      selected_salesman: 'default',
      form: {
        salesman: {
          name: '',
          email: '',
          password: '',
          relation_id: '',
          relation_value: '',
        },
      },
      password: '',
      passwordFieldType: 'password',
    }
  },
  mounted() {
    // this.fetchPermissions()
  },
  methods: {
     switchVisibility() {

        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
    fetchPermissions(ctx, callback){
      this.$axios.get(`permissions`)
     .then(response => {
        // JSON responses are automatically parsed.
        this.form.salesman.options = response.data.data;

      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    async salesman () {
        var data = this.form.salesman
        this.error = null
        
        await this.$axios.post('supervisors',data)
         .then(response => {        
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/supervisors');
          // console.log(response)
      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/supervisors')
    }
  }
};
</script>
<style scoped>
  #basicPassword {
    position: relative;
}
.sucure-sec {
    position: absolute;
    right: 5px;
    top: 0px;
}
.sucure-sec a .input-group-text {
    height: 38px;
    cursor: pointer;
}
</style>
