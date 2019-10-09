<template>
 

  <b-card :header="caption" class="table-sec-new edit-table">
    <div class="filter-sec card assign">
    <ul>
      <li>
        <b-form-input id="basicName" v-on:keyup="search"   v-model="filters.customerid" placeholder="ID de cliente"></b-form-input>
      </li>
      <li>
        <b-form-input id="basicName"  v-on:keyup="search"  v-model="filters.customername" placeholder="Nombre del cliente"></b-form-input>
      </li>
      <li>
        <b-form-input id="basicName" v-on:keyup="search"  v-model="filters.invoiceid"placeholder="ID de factura"></b-form-input>
      </li>

    </ul>
     </div>   
     <div class="table-responsive">
      <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="accounts" :fields="fields">
          <template slot="s_no" slot-scope="data">
             {{data.index + 1}}
          </template> 
          <template slot="download" slot-scope="data">
           <!-- <b-link href="" @click="download('pdf',data.item.id)">PDF</b-link> -->
           <!-- <b-link href="" @click="download('xlsx',data.item.id)">EXCEL</b-link> -->
           <b-link :href="data.item.PDF" download="true" v-if="data.item.PDF != ''" target="_blank">PDF</b-link>
           <b-link :href="data.item.XML" download="true" v-if="data.item.XML != ''" target="_blank">XML</b-link>
          </template> 
          <template slot="TOTAL_F" slot-scope="data">
             <span v-html="data.item.TOTAL_F"></span>
          </template> 
          <template slot="SUB_TOTAL_F" slot-scope="data">
             <span v-html="data.item.SUB_TOTAL_F"></span>
          </template> 
          <template slot="IMPUESTO_LC_F" slot-scope="data">
             <span v-html="data.item.IMPUESTO_LC_F"></span>
          </template> 
      </b-table>
     </div>
    <nav>
      <b-pagination
            :total-rows="totalRows"
            :current="currentPage"
            :simple="false"
            :per-page="perPage"
            order="is-right"
            @change="fetchClients">
      </b-pagination>
    </nav>
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
        default: ' Estado De Cuenta'
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
        accounts: [],
        errors: [],
        boxTwo: '',
        items: [],
        filters:{
            customerid : '',
            customername :'',
            invoiceid :''
        },
        fields: [
           {
                label:'S No',
                key: 's_no'
            },
            {
                label:'CLIENTE',
                key: 'CLIENTE',
                sortable: true
            },
            {
                label:'CLASE_DOC',
                key: 'CLASE_DOC'
            },
            {
                label:'FACTURA',
                key: 'FACTURA'
            },
            {
                label:'NOTA_CRED',
                key: 'NOTA_CRED'
            },
            {
                label:'DESCP',
                key: 'DESCP'
            },
            {
                label:'TOTAL',
                key: 'TOTAL_F'
            },
            {
                label:'SUB_TOTAL',
                key: 'SUB_TOTAL_F'
            },
            {
                label:'IMPUESTO_LC',
                key: 'IMPUESTO_LC_F'
            },
            {
                label:'COND_PAGO',
                key: 'COND_PAGO'
            },
            {
                label:'DOWNLOAD',
                key: 'download'
            }

        ],
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
      search(){
       this.fetchClients();
      },
      fetchClients(page){
        var filters = {
          customer_id : (this.filters.customerid == null) ? '' : this.filters.customerid,
          customer_name : (this.filters.customername == null) ? '' : this.filters.customername,
          invoice_id : (this.filters.invoiceid == null) ? '' : this.filters.invoiceid,
        };
        var serviceUrl = (this.loggedInUser.is['TK']) ? 'telemarketers/accounts' : 'accounts'
        var queryString = Object.keys(filters).map(key => 'filter[' +key + ']=' + filters[key]).join('&');
        this.currentPage = page
       //this.$axios.get(serviceUrl + `?page=`+page)
       this.$axios.get(serviceUrl+'?'+queryString, {
              params: {
                page: page,
            }
          }).then(response => {
          // JSON responses are automatically parsed.
          this.accounts   =   response.data.data;
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
      download(type,id) {
       this.$axios({
           url: 'download/'+type+'/'+id,
           method: 'GET',
          responseType: 'blob', // important
       }).then(response => {
           const url = window.URL.createObjectURL(new Blob([response.data]));
           const link = document.createElement('a');
           link.href = url;
           link.setAttribute('download', 'account-'+id+'.'+type); //or any other extension
           document.body.appendChild(link);
           link.click();
        })
        .catch(e => {
          this.errors.push(e)
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