<template>
  <b-card :header="caption" class="table-sec-new edit-table">
   <table class="table table-striped custom-table new">
          <thead>
            <tr>
             
                <th>ID DE CLIENTE</th>
                <th>NOMBRE</th>
                <th>ID ANTERIOR </th>
                <th>LISTA DE PRECIOS</th>
                <th>COD POST</th>
                <th>ESTADO</th>
                <th>PAÍS</th> 
                <th>RFC</th>
                <th>Ver</th>
            
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(client, index) in customers"> 
              
              </td>
              <td>{{ client.KUNNR }}</td>
              <td>{{ client.NOMBRE }}</td>
              <td>{{ client.ID_ANTERIOR }}</td>
              <td>{{ client.KONDA }}</td>
              <td>{{ client.COD_POST }}</td>
              <td>{{ client.ESTADO }}</td>
              <td>{{ client.RFC }}</td>
              <td>{{ client.PAIS }}</td>
              <td>
                 <nuxt-link variant="primary"  :to="{ name: 'client_info', params: { id: client.KUNNR }}">{{ $t('view') }}</nuxt-link>
              </td>
              <!-- <td v-if="loggedInUser.is['admin']" >
                 <nuxt-link to="/dashboard/customers/edit"><i class="icon-pencil icons"> </i></nuxt-link>
                 <b-link href="" @click="delVendor"><i class="icon-trash icons  "></i>
                 </b-link>
              </td>     -->         
            </tr>
          </tbody>
   </table>
   <div class="pagination-nav">
         <div class="container">
            <b-pagination
              :total-rows="totalRows"
              :current="currentPage"
              :simple="false"
              :per-page="perPage"
              order="is-right"
              @change="fetchClients">
              </b-pagination>
         </div>
      </div>
  
  </b-card>
</template>

<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
 import axios from 'axios';
import { mapGetters } from 'vuex';
  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
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
    data: () => {
      return {
        customers: [],
        errors: [],
        boxTwo: '',
        items: [],
        
        
        currentPage: 0,
        perPage: 0,
        totalRows: 0
      }
    },
    mounted() {
        this.fetchClients(1)
    },
    computed: {
      ...mapGetters(['loggedInUser'])

    },
  
    methods: {
      fetchClients(page){
        this.currentPage = page
        this.$axios.get(`telemarketers/clients?page=`+page)
       .then(response => {
          // JSON responses are automatically parsed.
          this.customers   =   response.data.data;
          this.perPage     =   response.data.meta.per_page
          this.totalRows   =   response.data.meta.total
          this.currentPage =   response.data.meta.current_page
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      getBadge (status) {
        return status === 'Active' ? 'success'
          : 'secondary'
      },
      getRowCount (items) {
        return items.length
      },
      delVendor() {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Por favor confirma que quieres borrar el cliente', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Sí',
          cancelTitle: 'No',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
          })
          .catch(err => {
            // An error occurred
          })
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
</style>