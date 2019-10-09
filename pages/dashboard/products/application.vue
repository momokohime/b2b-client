<template>
  <div class="animated fadeIn">
    
    <b-row v-if="loggedInUser.is['admin']">
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('application') }} {{productId}}</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
          <div class="alert alert-success" role="alert" v-show="success">
            {{ success }}
          </div>

          <!-- Form fields -->
          <b-form  @submit.prevent="application" >
          <Fields  :application="form.application"></Fields>

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

    <b-row v-else>
      <b-col md="12">
          <div slot="header">
            <strong>{{ $t('application') }}  {{productId}}</strong>
          </div>
      </b-col>
    </b-row>
    </br>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fields="fields" responsive="sm" :items="applications" >
     
      <template v-if="loggedInUser.is['admin']" slot="Acción" slot-scope="data">
          <b-link @click="editApplication(data.item.id)"><i class="icon-pencil icons"> </i></b-link>
          <b-link href="" @click="delApplication(data.item.id)"><i class="icon-trash icons  "></i>
        </b-link>
      </template>
    </b-table>
    
  </b-card>
</div>
</template>

<script>
import Fields from '~/pages/dashboard/products/form'
import { mapGetters } from 'vuex';

export default {
  name: 'forms',
  layout: 'dashboard',
  middleware: 'auth',
  props: {
    caption: {
      type: String,
      default: 'Applicaciones'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return { 
      error: null,
      success: null,
      productId: null,
      applicationId: null,
      applications: [],
       fields: [
        'DESDE',
        'HASTA',
        'MARCA',
        'MODELO',
        'MOTOR',
        {
            label:'Fecha',
            key: 'updated_at'
        },
        'Acción',
      ],
      form: {
        application: {
          DESDE: '',
          HASTA: '',
          MARCA: '',
          MODELO: '',
          MOTOR: ''
        }
      }
    }
  },
  mounted() {
    this.productId = this.$route.params.id

    this.fetchApplicaions()
  },
  computed: {
      ...mapGetters(['loggedInUser'])
    },
  methods: {
    fetchApplicaions(ctx, callback){
      this.$axios.get(`products/application/`+this.productId)
     .then(response => {
        // JSON responses are automatically parsed.
        this.applications = response.data.data

      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    async application () {
        
        var data = this.form.application
        data.product_id = this.productId 
        data.applicationId = this.applicationId 

        this.error = null

        await this.$axios.post('products/application',data)
         .then(response => {        
         this.success = response.data.data
          
         var self = this.form.application;
          Object.keys(self).forEach(function(key,index) {
            self[key] = '';
          });
         this.applicationId = null

         this.fetchApplicaions()

         setTimeout(() => {
          this.success=null 
         }, 2000)

      })
      .catch(e => {
        this.error = e.response.data.message;
        setTimeout(() => {
          this.error=null 
         }, 2000)
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/products')
    },
    editApplication(id) {
        var ediApplication = this.applications.filter((e)=>e.id == id )
        this.form.application = ediApplication[0]
        this.applicationId = id        
      },
     delApplication(id) {
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete application.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value == true)
                this.$axios.delete('products/application/'+id)
                 .then(response => { 
                 this.applications = this.applications.filter((e)=>e.id !== id )   
                 this.success = response.data.data
                 setTimeout(() => {
                  this.success=null 
                 }, 2000)

                })
                .catch(e => {
                  this.error = e.response.data.message;
                })
            
          })
          .catch(err => {
           this.error = e.response.data.message;
          })
      }
  },
  components: {
    Fields
  }
}
</script>
