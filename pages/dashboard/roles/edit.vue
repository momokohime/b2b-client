<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
        <div slot="header">
            <strong>{{ $t('edit_role') }}</strong>
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
  data () {
    return {
      error: null,
      id : null,
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
  components: {
    Fields
  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchRole(this.id)
  },
  methods: {
    fetchRole(id){
      this.$axios.get('roles/'+id+'/edit')
     .then(response => {
        // JSON responses are automatically parsed.
        var vf = this.form 
        response = response.data.data
        vf.role.name = response.role.name
        vf.role.display_name = response.role.display_name
        vf.role.options = response.permissions;
        vf.role.permissions = response.selected;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    async role () {
        
        var data = this.form.role

        this.error = null
        
        await this.$axios.put('roles/'+this.id,data)
         .then(response => {        
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/roles')
      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/roles')
    }
  }
}
</script>
