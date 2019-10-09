<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('permissions') }}</strong>
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
  middleware: 'auth',
  data () {
    return { 
      error: null,
      form: {
        permission: {
          name: ''
        }
      }
    }
  },
  methods: {
    async permission () {
        
        var data = this.form.permission

        this.error = null
        
        await this.$axios.post('permissions',data)
         .then(response => {        
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/permissions');

      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/permissions')
    }
  },
  components: {
    Fields
  }
}
</script>
