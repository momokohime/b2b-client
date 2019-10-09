<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
        <div slot="header">
            <strong>{{ $t('edit_permission') }}</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>

          <!-- Form fields -->
          <b-form @submit.prevent="permission" >
          <Fields :permission="form.permission"></Fields>
          
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
import Fields from '~/pages/dashboard/permissions/form'

export default {
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      error: null,
      id : null,
      form: {
        permission: {
          name: ''
        }
      }
    }
  },
  components: {
    Fields
  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchPermission(this.id)
  },
  methods: {
    fetchPermission(id){
      this.$axios.get('permissions/'+id+'/edit')
     .then(response => {
        // JSON responses are automatically parsed.
        response = response.data
        this.form.permission.name = response.data.name
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    async permission () {
        
        var data = this.form.permission

        this.error = null
        
        await this.$axios.put('permissions/'+this.id,data)
         .then(response => {        
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/permissions')
      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/permissions')
    }
  }
}
</script>
