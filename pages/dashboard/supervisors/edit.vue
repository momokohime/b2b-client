<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12" class="edit-table">
        <b-card>
        <div slot="header">
            <strong>Editar Supervisor</strong>
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
            <b-form-input id="basicName" type="text"  v-model="form.salesman.name" placeholder="EIngresa nombre vendedor"></b-form-input>
          </b-form-group>

          <b-form-group
                  label="Email"
                  label-for="basicEmail"
                  label-cols-lg="3"
                  >
            <b-form-input id="basicEmail" type="email"  v-model="form.salesman.email" placeholder="Ingresa email"></b-form-input>
          </b-form-group>

          <b-form-group
                  label="Contraseña"
                  label-for="basicPassword"
                  label-cols-lg="3"
                  >
            <b-form-input id="basicPassword" :type="passwordFieldType"   v-model="form.salesman.password" placeholder="Ingresa contraseña"></b-form-input>

            <b-input-group-append class="sucure-sec"><a @click="switchVisibility">
              <b-input-group-text><i class="fa fa-eye"></i></b-input-group-text>
            </a></b-input-group-append>

          </b-form-group>

            <!-- form ends -->
          <div slot="footer">
             <div class="form-actions">
                <b-button type="submit" variant="primary">{{ $t('save_changes') }}</b-button>
                <b-button type="button" @click="cancel" variant="secondary">{{ $t('cancel') }}</b-button>
              </div>
          </div>
        </b-form>
        </b-card>
       
      
       <!--  <b-card :header="caption" class="table-sec-new">
          <b-table  :items="Customersalesman" :fields="clientFields" :current-page="currentPage" :per-page="perPage">
             
              <template slot="Acción" slot-scope="data">
                 <b-link href="" @click="delSalesmanCustomer(data.item.number)"><i class="icon-trash icons  "></i>
                </b-link>
              </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="totalRows"
              :current="currentPage"
              :simple="false"
              :per-page="per_page"
              order="is-right"
              @change="fetchSalesManCustomer">
            </b-pagination>
           </nav>
         </b-card> -->
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Fields from '~/pages/dashboard/salesman/form'

export default {
  name: 'forms',
  layout: 'dashboard',
  async asyncData({ $axios }) {
    // var options = await $axios.get('/users/dropdown');
    // var options = options.data.data
    // return { options }
  },
   props: {
      caption: {
        type: String,
        default: 'Clientes'
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
      id : null,
      Customersalesman:[],
      form: {
        salesman: {
          name: '',
          email: '',
          password: '',
          relation_id: '',
          relation_value: '',
        }
      },
      password: '',
      passwordFieldType: 'password',
        clientFields: [
         {
          label: 'ID DE CLIENTE',
          key: 'number',
          sortable: true
        },
        {
          label:'NOMBRE',
          key: 'customer',
          sortable: true
        },
        {
          label:'ID ANTERIOR',
          key: 'id_anterior',
          sortable: true
        },
        {
          label:'LISTA DE PRECIOS',
          key: 'customer_price_group',
          sortable: true
        },
        {
          label:'COD POST',
          key: 'postal_code',
          sortable: true
        },
        {
          label:'ESTADO',
          key: 'state',
          sortable: true
        },
        {
          label:'PAÍS',
          key: 'country_name',
          sortable: true
        },
        {
          label:'RFC',
          key: 'rfc',
          sortable: true
        },
       
        {
          key: 'Acción'
        }
      ],
      currentPage: 1,
      perPage: 0,
      per_page: 0,
      totalRows: 0
    }
  },
  components: {
    Fields,

  },
  mounted() {
    var vm = this
    this.id = this.$route.params.id
    this.fetchSalesMan(this.id)
      
  },
  methods: {
      switchVisibility() {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
      },
      getBadge (status) {
        return status === 'Active' ? 'success'
          : 'secondary'
      },
    async fetchSalesMan(id){
      var vm = this
      await this.$axios.get('salesman/'+id+'/edit')
     .then(response => {
        // JSON responses are automatically parsed.
        var vf = this.form 
        response = response.data.data
        console.log(response);
        vf.salesman.name = response[0].name
        vf.salesman.email = response[0].email
        vf.salesman.password = response.password
        vf.salesman.relation_id = response[0].relation_id
        // vm.options.forEach(function(option){
        //   if(option.value == response.relation_id) {
        //     vm.form.salesman.relation_value = option
        //   }
        // })
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    
    async salesman () {
        
        var data = this.form.salesman

        this.error = null
        
        await this.$axios.put('supervisors/'+this.id,data)
         .then(response => {        
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/supervisors')
      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    delSalesmanCustomer(clientid){
       this.boxTwo = ''
       this.$bvModal.msgBoxConfirm('Por favor confirma que quieres borrar vendedor.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Si',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
       .then(value => {
        if(value == true)
        this.$axios.delete('delSalesmanCustomer/'+this.id+'/'+clientid )
       .then(response => { 
             this.Customersalesman = this.Customersalesman.filter((e)=>e.customer_id !== clientid )
            })
            .catch(e => {
              this.error = e.response.data.message;
            })
      })
      .catch(err => {
        // An error occurred
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/supervisors')
    }
  }
};
</script>
<style>
   .edit-table .table.b-table > thead > tr > th[aria-sort], .table.b-table > tfoot > tr > th[aria-sort] {
    font-size: 13px;
}
.table-sec-new .card{width:100%;}
.edit-table .table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    font-size: 14px;
}
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