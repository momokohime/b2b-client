<template>
  <b-card :header="caption" class="table-sec-new edit-table">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="quotes" :fields="fields">
         <template slot="Ver"  slot-scope="quotes">
         <b-button variant="primary"  @click="$router.push({ name: 'quote_detail', params: { id: quotes.item.id }})" >Ver</b-button>
      </template>
    </b-table>
    <nav>
      <b-pagination
            :total-rows="totalRows"
            :current="currentPage"
            :simple="false"
            :per-page="perPage"
            order="is-right"
            @change="fetchQuotes"
            >
      </b-pagination>
    </nav>
  </b-card>
</template>
<script>
	 export default {
     layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    props: {
      caption: {
        type: String,
        default: 'Quotes'
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
    data: () => {
      return {

      	totalRows:0,
      	currentPage:0,
      	perPage: 0,
      	quotes:[],
      	 fields: [
	          {
	              label:'ID del cliente',
	              key: 'customer_id',
	              sortable: true
	          },
	          {
	              label:'Nombre del cliente',
	              key: 'cus_name',
	              sortable: true
	          },
	          {
	              label:'Correo electrónico del cliente',
	              key: 'cus_email',
	              sortable: true
	          },
	          {
	            key: 'Ver',
	          }
          ]
      }
  },
  mounted(){
  	this.fetchQuotes(1)
  },
   methods: {
      fetchQuotes(page){
        this.$axios.get(`quotes?page=`+page)
       .then(response => {
       	this.quotes = response.data.data
        this.currentPage = response.data.current_page
        this.perPage = response.data.per_page
        //this.perPage = 5
        this.totalRows = response.data.total
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
  }
};
</script>