<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('update_users') }}</strong>
          </div>
           <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
          <b-form @submit.prevent="updateUser" >
          <b-form-group
            label="Nombre de usuario"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"   v-model="user.name" placeholder="Ingresa tu nombre"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Email"
            label-for="basicEmail"
            label-cols-lg="3"
            >
            <b-form-input id="basicEmail" type="email"  v-model="user.email" placeholder="Ingresa email"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Contraseña"
            label-for="basicPassword"
            label-cols-lg="3"
            >
            <b-form-input id="basicPassword" :type="passwordFieldType"  v-model="user.password"placeholder="Ingresa contraseña"></b-form-input>
            <b-input-group-append class="sucure-sec"><a @click="switchVisibility">
              <b-input-group-text><i class="fa fa-eye"></i></b-input-group-text>
            </a></b-input-group-append>
          </b-form-group>

          <b-form-group
            label="Teléfono"
            label-for="basicPhone"
            label-cols-lg="3"
            >
            <b-form-input id="basicPhone" type="text"  v-model="user.phone"placeholder="Ingresa número"></b-form-input>
          </b-form-group>
           <b-form-group
            label="Estatus"
            label-for="basicStatus"
            label-cols-lg="3"
            >
            <b-form-radio-group
              v-model="user.status"
              :options="user.statusOptions"
              class="mt-3"
            ></b-form-radio-group>
          </b-form-group>
          </b-form-group>
           <b-form-group
            label="Rol"
            label-for="basicSelectSm"
             label-cols-lg="3">
             <multiselect
              v-model="user.selectedRole"
              :options="roles"
              track-by="id"
              label="display_name"
              @input="selectUserRole"
              placeholder="Select Role">
            </multiselect>
          </b-form-group>

          <!-- <b-form-group
            label="Image"
            label-for="fileInput"
            label-cols-lg="3"
            >
            <b-form-file id="fileInput" v-model="user.image" :plain="true"></b-form-file>
          </b-form-group> -->
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
export default {
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      roles: [],
      error: null,
      id: null,
      selected: [], // Must be an array reference!
      password: '',
      passwordFieldType: 'password',
      user: {
          name: '',
          email: '',
          password: '',
          phone: '',
          role: '',
          selectedRole: '',
          user_type: '',
          image: '',
          status: 1,
          statusOptions:[
            { value: 1, text: 'Activo'},
            { value: 0, text: 'Inactivo' }
          ],
        }
    }
  },
  mounted() {
        this.fetchRoles()
        this.id = this.$route.params.id
        this.fetchUser(this.id)
  },
   methods: {
     switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
    fetchRoles(ctx, callback){
      this.$axios.get(`roles`)
     .then(response => {
        // JSON responses are automatically parsed.
       this.roles = response.data.data;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    fetchUser(id){
      var vm = this
      this.$axios.get('users/'+id)
     .then(response => {
        // JSON responses are automatically parsed.
        var vf = this.user 
        response = response.data.data
        vf.name = response.name
        vf.email = response.email
        vf.phone = response.phone;
       // vf.selectedRole = response.role;
        vf.status = response.status;
        vf.user_type = response.user_type;
        vm.roles.forEach(role => {
          if(role.name == response.user_type) {
            vf.selectedRole = role
            vf.role = role.id
          }
        })
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    async updateUser () {
        
        var data = this.user

        this.error = null
        
        await this.$axios.put('users/'+this.id,data)
         .then(response => {        
        // JSON responses are automatically parsed.
        this.$router.push('/dashboard/users')
      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/users')
    },
    selectUserRole() {
      this.user.role = this.user.selectedRole.id
      this.user.user_type = this.user.selectedRole.name
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
