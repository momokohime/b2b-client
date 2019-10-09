<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12" class="customer-listing">
        <b-card :header="caption">
          <b-table  :items="Customersalesman" :fields="clientFields" :current-page="currentPage" :per-page="perPage">
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
         </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Fields from '~/pages/dashboard/salesman/form'

export default {
  name: 'forms',
  layout: 'dashboard',
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
      per_page: 0,
      Customersalesman:[],
      
        clientFields: [
       /* {
          label:'Id',
          key: 'id',
          sortable: true
        },*/
        {
          label:'ID DE CLIENTE',
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
          label:'PAíS',
          key: 'country_name',
          sortable: true
        },
        {
          label:'RFC',
          key: 'rfc',
          sortable: true
        },
        /*{
          label:'COLONIA',
          key: 'town',
          sortable: true
        },
        {
          label:'District',
          key: 'district',
          sortable: true
        },
        
        {
          label:'Country',
          key: 'country_name',
          sortable: true
        },
        {
          label:'Phone No',
          key: 'phone_number',
          sortable: true
        },
        {
          label:'Currency',
          key: 'currency',
          sortable: true
        },*/
        /*{
          key: 'actions'
        }*/
      ],
      currentPage: 1,
      perPage: 0,
      totalRows: 0
    }
  },
  components: {
    Fields,

  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchSalesManCustomer(1)
  },
  methods: {
    getBadge (status) {
        return status === 'Active' ? 'success'
          : 'secondary'
      },
    
    fetchSalesManCustomer(page){
      this.currentPage = page
      this.$axios.get('tk_clients/'+this.id+'?page='+page)
      //this.$axios.get('salesmancustomer/'+this.id )
      .then(response => {
        // JSON responses are automatically parsed.
       this.Customersalesman = response.data.data;
       this.per_page = response.data.per_page
       this.totalRows = response.data.total
       this.currentPage = response.data.current_page
        // this.totalRows   = response.data.data.length;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })    
    },
    
    cancel()
    {
        this.$router.push('/dashboard/telemarketers')
    }
  }
}
</script>
<style>
  .customer-listing th {

    font-size: 14px;
    font-weight: bold;

}
.customer-listing td {

    font-size: 14px;

}
</style>>