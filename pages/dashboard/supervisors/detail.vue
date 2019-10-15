<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12" class="customer-listing">
        <b-card :header="title" style="text-transform: capitalize;">
          <b-table  :items="data" :fields="fields">
          </b-table>
          <nav>
             <b-pagination
              :total-rows="totalRows"
              :current="currentPage"
              :simple="false"
              :per-page="perPage"
              order="is-right"
              @change="fetchData">
            </b-pagination>
          </nav>
         </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      error: null,
      id : null,
      title : 'Clientes',
      data:[],
      fields: [],
      currentPage: 1,
      perPage: 0,
      totalRows: 0
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.title = this.$route.params.title
    this.fetchFields()
    this.fetchData(1)
  },
  methods: {
    fetchFields(){
        if(this.title == 'clientes')
        {
           this.fields = [
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
              }]
        }
        else
        {
           this.fields = [
            {
                label:'No.',
                key: 'id',
                sortable: true
            },
            {
                label:'Nombre',
                key: 'name',
                sortable: true
            },
            {
                label:'Email',
                key: 'email',
                sortable: true
            },
            {
                label:'Relation Id',
                key: 'relation_id'
            }
          ]
        }
    },
    fetchData(page){
      this.currentPage = page
      this.$axios.get('supervisors/'+this.title+'/'+this.id+'?page='+page)
      //this.$axios.get('salesmancustomer/'+this.id )
      .then(response => {
        // JSON responses are automatically parsed.
       this.data = response.data.data;
       this.perPage = response.data.per_page
       this.totalRows = response.data.total
       this.currentPage = response.data.current_page
        // this.totalRows   = response.data.data.length;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })    
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