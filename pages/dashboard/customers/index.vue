<template>
  <b-card :header="caption" class="table-sec-new edit-table">
    <div class="col-sm-12 col-xl-12">
    <div class="filter-sec card assign">
    <ul>
        <b-form>
            <li> <input v-on:keyup="search"  v-model="filters.customerid" placeholder="ID DE CLIENTE"></li>
            <li> <input v-on:keyup="search"  v-model="filters.customerName"  placeholder="NOMBRE"></li>
            <li><input v-on:keyup="search"   v-model="filters.oldId" placeholder="ID ANTERIOR"></li>
            <li><input v-on:keyup="search" v-model="filters.priceGroup" placeholder="LISTA DE PRECIOS"></li>
        </b-form> 
    </ul>
    <ul>
       <b-form>
         <li><input v-on:keyup="search" v-model="filters.zip" placeholder="COD POST"></li>
         <li><input v-on:keyup="search" v-model="filters.state" placeholder="ESTADO"></li>
       </b-form> 
     </ul>
     
    </div>
</div>

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
               <!--  <th v-if="loggedInUser.is['admin']" >Acción</th> -->
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
        totalRows: 0,
        filters:{
          customerid : '',
          customerName :'',
          oldId :'',
          priceGroup :'',
          zip :'',
          state :'',
          route :''
        },

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
          var filters = {
            customer_id : (this.filters.customerid == null) ? '' : this.filters.customerid,
            customer_name : (this.filters.customerName == null) ? '' : this.filters.customerName,
            price_group : (this.filters.priceGroup == null) ? '' : this.filters.priceGroup,
            zip : (this.filters.zip == null) ? '' : this.filters.zip,
            state : (this.filters.state == null) ? '' : this.filters.state,
            route : (this.filters.route == null) ? '' : this.filters.route,
            old_id : (this.filters.oldId == null) ? '' : this.filters.oldId
          };
          this.currentPage = page
          var queryString = Object.keys(filters).map(key => 'filter[' +key + ']=' + filters[key]).join('&');
          //this.$axios.get(`clients?page=`+page)
          this.$axios.get('clients?'+queryString, {
              params: {
                page: page,
            }
          }).then(response => {
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
      search(){
           this.fetchClients()
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
.custom-sel{
  position: relative;
  display: table;
  margin-right: 10px;
}

.custom-sel:after{
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #3ea8d8;
  pointer-events: none;
}

.custom-sel select{
    padding: 6px 30px 6px 10px;
    background: #fff;
    border: solid 1px #3ea8d8;
    border-radius: 6px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.check-btn{
    background: #53a9d8;
    padding: 6px;
    border-radius: 4px;
    display: block;
    color: #fff;
    text-align: center;
    cursor: pointer;
    margin-left: 5px;
}

.assign-dd{
  display: flex;
  padding: 0px 0px 10px;
  /*justify-content: space-between;*/
}

.assign-dd.next {
    float: left !important;
}
.assign-dd.next .btn.check-btn {
    padding: 0px 14px;
}

.assign-dd.next input {
    width: 200px;
    padding: 5px 10px 3px;
}
.assign-dd.next {
    width: 100%;
}
.assign-dd input {
    width: 200px;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #53a8d8;
    padding: 15px;
}
.custom-sel{
    display: flex;
    margin-left: 5px;
}
.filter-sec.card.assign {
    margin: 0px 0 20px;
    padding: 20px;
    background: #d6d6d6;
}
.filter-sec.card.assign ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
}
.filter-sec.card.assign li {
    margin: 0px 10px 10px 0;
    display: flex;
}
.filter-sec.card.assign ul li input {
    min-height: 40px;
    display: block;
    padding: 0px 10px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 14px;
}
.filter-sec.card.assign li select {
    width: 220px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
}
.filter-sec.card.assign ul form {
    display: flex;
}
</style>