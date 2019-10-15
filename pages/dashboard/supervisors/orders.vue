<template>

  <b-card :header="caption">
    <!-- <div class="custom-sel-outer">
      <div class="custom-sel form-inout"> 
         <label for="date">From Date</label><b-form-input v-on:keyup="search" type="date"  v-model="filters.fromDate"></b-form-input>

         <label for="date">To Date</label><b-form-input v-on:keyup="search" type="date"  v-model="filters.toDate"></b-form-input>

          <button class="check-btn btn" @click="loadData()">Filter</button>
     </div>
   </div> -->
     
     <div class="custom-sel-outer">
      <div class="custom-sel form-inout"> 
         <label for="date">{{ $t('order') }}</label><b-form-input v-on:keyup="search" type="text"  v-model="filters.orderId"></b-form-input>

         <label for="date">{{ $t('Nombre') }}</label><b-form-input v-on:keyup="search" type="text"  v-model="filters.customerName"></b-form-input>
           
      </div> 
  </div>
    <table class="table table-striped custom-table new table-responsive">
        <thead>
            <tr>
             
                <th>PEDIDO SAP</th>
                <th>NOMBRE</th>
                <th>FECHA</th>
                <th>IMP TOTAL</th>
                <th>ID STATUS GBL</th>
                <th>DESC STATUS GBL</th>
               <!--  <th v-if="loggedInUser.is['admin']" >Acción</th> -->
                <th>VER</th>
               
            </tr>
        </thead>
        <tbody> 
            <tr v-for="(order, index) in orders"> 
              
              </td>
              <td>{{ order.PEDIDO_SAP }}</td>
              <td>{{ order.NOMBRE }}</td>
              <td>{{ order.FECHA }}</td>
              <td v-html="$options.filters.price(order.IMP_TOTAL)"></td>
              <td>{{ order.ID_STATUS_GBL }}</td>
              <td>{{ order.DESC_STATUS_GBL }}</td>
             <!--  <td v-if="loggedInUser.is['admin']">
               <nuxt-link to="/dashboard/orders/1/edit"><i class="icon-pencil icons"> </i></nuxt-link>
               <b-link href="" @click="delCustomer"><i class="icon-trash icons  "></i>
               </b-link></td>  -->          
              <td> <b-button variant="primary"  @click="$router.push({ name: 'order_details', params: { id: order.PEDIDO_SAP }})" >{{ $t('view') }}</b-button></td>           
            </tr>
          </tbody>
    </table>
    <nav>
      <b-pagination
      :total-rows="totalRows"
      :current="currentPage"
      :simple="false"
      :per-page="perPage"
      order="is-right"
      @change="loadData">
      </b-pagination>

    </nav>
  </b-card>
</template>
<style scoped>
  .custom-sel-outer{padding:10px;background:#fff}.custom-sel-outer{padding:10px;background:#fff}
.custom-sel-outer{
    display: flex;
}
.custom-sel[data-v-4ca6dbbb] {
    margin: 0 5px;
}
.custom-sel.form-inout {
    display: flex;
    padding: 0 20px;
}
.custom-sel.form-inout label {
    display: block;
    /* width: 100%; */
    padding: 0 15px 0 15px;
}
.custom-sel.form-inout .check-btn {
    margin: 0;
    padding: 0;
    height: 36px;
    margin: 0 10px;
}
.custom-sel.form-inout:after {
    display: none;
}
.cart-sec[data-v-4ca6dbbb] {
    position: relative;
    width: 50px;
    top: -50px;
    height: 30px;
    text-align: center;
    right:20px;
}
.custom-sel.form-inout input {
    position: relative;
    border-radius: 4px;
    border-color: #53a9d8;
}
.check-btn{background:#53a9d8;padding:6px;width:100%;border-radius:4px;display:block;margin-top:10px;color:#fff;text-align:center;cursor:pointer}
</style>
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
        default: 'Órdenes'
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
        orders: [],
        errors: [],
        boxTwo: '',
        items: [],
        currentPage: 0,
        perPage: 0,
        totalRows: 0,
        fromDate:'',
        toDate:'',
        filters:{
            fromDate : '',
            toDate : '',
            orderId : '',
            customerName :''
        }
      }
    },
    mounted() {
        this.fetchOrders();
    },
      computed: {
      ...mapGetters(['loggedInUser'])

    },
    methods: {
      fetchOrders(ctx, callback){
       this.$axios.get(`supervisors/orders`)
       .then(response => {
          // JSON responses are automatically parsed.
          var _r = response.data
          this.orders = _r.data;
          this.totalRows = _r.meta.total;
          this.currentPage = _r.meta.current_page;
          this.perPage     = _r.meta.per_page;

        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      search(){
         this.loadData()
      },
      loadData (page) {
       
          var filters = {
            date_from : (this.filters.fromDate == null) ? '' : this.filters.fromDate,
            date_to : (this.filters.toDate == null) ? '' : this.filters.toDate,
            order_id : (this.filters.orderId == null) ? '' : this.filters.orderId,
            customer_name : (this.filters.customerName == null) ? '' : this.filters.customerName
          };
         
          var queryString = Object.keys(filters).map(key => 'filter[' +key + ']=' + filters[key]).join('&');
          this.currentPage = page
          this.$axios.get('supervisors/orders?'+queryString, {
              params: {
                page: page,
            }
          }).then(response => {
            //var _r = response.data
            //console.log(response.data.data)
            this.orders = response.data.data;
            this.totalRows = response.data.meta.total;
            this.perPage   = response.data.meta.per_page;
          })
          .catch(e => {
              this.errors.push(e)
          })
        },
      dateRangeFilter()
      {
        var FromDate = this.fromDate;
        var ToDate = this.toDate;

        //'orders?from='+FromDate+'&to='+ToDate, this.data

        //Search product based date range
        this.$axios.get('supervisors/orders?from='+FromDate+'&to='+ToDate, this.data)
       .then(response => {          
          if((response.data.data).isString){
            alert("No record Found");
          }else{
            this.products = response.data.data;
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      getBadge (status) {
        return status === 'Pending' ? 'warning'
          : status === 'Proccessing' ? 'primary'
            : status === 'Complete' ? 'success'
              :  'danger'
      },
      getRowCount (items) {
        return items.length
      },
      delCustomer() {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Por favor confirma que quieres borrar orden.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'SI',
          cancelTitle: 'NO',
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
  }
</script>


