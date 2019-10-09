<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('add_role') }}</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>

          <!-- Form fields -->
          <b-form @submit.prevent="role" >
          <Fields :role="form.role"></Fields>

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
import Fields from '~/pages/dashboard/roles/form'

export default {
  name: 'forms',
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return { 
      error: null,
      form: {
        role: {
          name: '',
          display_name: '',
          permissions: [],
          options: [],
        }
      }
    }
  },
  mounted() {
    this.fetchPermissions()
  },
  methods: {
    fetchPermissions(ctx, callback){
      this.$axios.get(`permissions`)
     .then(response => {
        // JSON responses are automatically parsed.
        this.form.role.options = response.data.data;

      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    async role () {
        
        var data = this.form.role

        this.error = null
        
        await this.$axios.post('roles',data)
         .then(response => {        
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/roles');

      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/roles')
    }
  },
  components: {
    Fields
  }
}
</script>
