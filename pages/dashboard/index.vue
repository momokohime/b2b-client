<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            
            <h4 class="mb-0">{{ dashboard.totalOrders}}</h4>
            <p>{{ $t('total_orders') }}</p>
          </b-card-body>
          <card-line1-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ dashboard.totalSales | price_raw }}</h4>
            <p>{{ $t('total_sales') }}</p>
          </b-card-body>
          <card-line2-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ dashboard.avgValue | price_raw }}</h4>
            <p>{{ $t('order_average_value') }}</p>
          </b-card-body>
          <card-line3-chart-example class="chart-wrapper" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0"> {{ dashboard.totalCustomer}}</h4>
            <p>{{ $t('total_customer') }}</p>
          </b-card-body>
          <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
        <!-- <b-col sm="5" >
          <div v-if="loggedInUser.is['admin']">
          <h4 id="traffic" class="card-title mb-0" >{{ $t('traffic') }}</h4>
          <div class="small text-muted">November 2017</div>
        </div>
        </b-col> -->
        <b-col sm="12" class="d-none d-md-block n-toolbar-sec">
        <!--   <b-button type="button" variant="primary" class="float-right"><i class="icon-cloud-download"></i></b-button> -->
          <b-button-toolbar  class="float-right" aria-label="Toolbar with buttons group">
            <b-form-radio-group @input="fetchDashboard()"  class="mr-3" id="radiosBtn" buttons button-variant="outline-secondary" v-model="selected" name="radiosBtn">
              <b-form-radio class="mx-0" value="Day" >{{ $t('day') }}</b-form-radio>
               <b-form-radio class="mx-0" value="Weekly" >{{ $t('week') }}</b-form-radio>
              <b-form-radio class="mx-0" value="Month">{{ $t('month') }}</b-form-radio>
              <b-form-radio class="mx-0" value="Year" >{{ $t('year') }}</b-form-radio>
            </b-form-radio-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
    <!-- <b-card class="traffic-sec" v-if="loggedInUser.is['admin']">
      
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
      <div slot="footer">
        <ul>
          <li>
            <div class="text-muted">{{ $t('visits') }}</div>
            <strong>29.703 Usuarios (40%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="success" :value="40"></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">{{ $t('unique') }}</div>
            <strong>24.093 Usuarios (20%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="info" :value="20"></b-progress>
          </li>
          <li>
            <div class="text-muted">{{ $t('pageviews') }}</div>
            <strong>78.706 Vistas (60%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="warning" :value="60"></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">{{ $t('new_users') }}</div>
            <strong>22.123 usuarios (80%)</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="danger" :value="80"></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">{{ $t('bounce_rate') }}</div>
            <strong>40.15%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" :value="40"></b-progress>
          </li>
        </ul>
      </div>
    </b-card> -->
<div class="row">
      <div class="col-md-12 col-sm-12 col-lg-12 col-12">
    <div class="card-header">
       {{ $t('top_clients') }}
       
        <b-button variant="primary"  class="float-right" @click="$router.push('dashboard/report/customer')" >ver</b-button>
      </div>
      <b-table class="mb-0 table-outline" responsive="sm" hover :items="topClients" :fields="clientFields"  head-variant="light">
            <div slot="avatar" class="avatar" slot-scope="data">
              <img :src="data.item.image" class="img-avatar" alt="">
            </div>
            <div slot="user" slot-scope="item">
            
            </div>
            <div slot="total_price" slot-scope="data">
             <span v-html="$options.filters.price(data.item.total_price)"></span>
            </div>
            
      </b-table>
        </div>
     </br>
     
  </div>
     </br>
     <div class="row">
      <div class="col-md-6 col-sm-6 col-lg-6 col-12">
     <div class="card-header">
        {{ $t('top_brands') }}
       
          <b-button variant="primary"  class="float-right" @click="$router.push('dashboard/report/brand')" >ver</b-button>
      </div>
      <b-table class="mb-0 table-outline" responsive="sm" hover :items="topBrands" :fields="brandFields" head-variant="light">
            <div slot="avatar" class="avatar" slot-scope="data">
               <img :src="data.item.image" class="img-avatar" alt="">
            </div>
            <div slot="user" slot-scope="item">
              {{item.value.name}}
            </div>
            <div slot="total_price" slot-scope="data">
             <span v-html="$options.filters.price(data.item.total_price)"></span>
            </div>
            
      </b-table>
    </div>
     </br>
     <div class="col-md-6 col-sm-6 col-lg-6 col-12 table-font">
     <div class="card-header">
       {{ $t('top_sale_items') }}
        <b-button variant="primary"  class="float-right" @click="$router.push('dashboard/report/sales')" >ver</b-button>
      </div>
      <b-table class="mb-0 table-outline" responsive="sm" hover :items="salesItems" :fields="salesFields" head-variant="light">
            <div slot="avatar" class="avatar" slot-scope="data">
              <img :src="data.item.image" class="img-avatar" alt="">
            </div>
            <div slot="user" slot-scope="item">
             
            </div>
            <div slot="total_price" slot-scope="data">
             <span v-html="$options.filters.price(data.item.total_price)"></span>
            </div>
            
      </b-table>
    </div>
    
    <section class="footer-n-sec">
      <div class="col-sm-12 col-xl-12">
        <div class="card-header">
         Marcas
        </div>
      </div>
    </section> 
     <div class="col-sm-12 col-xl-12">
         <div class="filter-sec card assign">
           <ul>
             
             <li>
              <multiselect
              :multiple="true"
              v-model="brandReport.brand"
              :options="brand"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="true"
              :preserve-search="true"
              placeholder="Marca"
              label="brandName"
              track-by="brandName"
              :preselect-first="true"
                ></multiselect>
             </li>
             <li>
               <flat-pickr 
                  :config="config"                                                          
                  class="form-control" 
                  placeholder="Select From Date" 
                  v-model="brandReport.from">
               </flat-pickr>
             </lable></li>
             <li>
              <flat-pickr 
                  :config="config"                                                          
                  class="form-control" 
                  placeholder="Select From To" 
                  v-model="brandReport.to">
               </flat-pickr>
             </li>
             <li class="report-sec"><button  class="btn check-btn" type="button" @click="brandReports()" style="background-color:  #003da6">Reporte</button></li>

           </ul>
          </div>
        </div>
        <div class="col-md-12 col-sm-12 col-lg-12 col-12">
     
      <b-table class="mb-0 table-outline" responsive="sm" hover :items="topBrandReport" :fields="brandReportFields" head-variant="light">
            <div slot="avatar" class="avatar" slot-scope="data">
               <img :src="data.item.image" class="img-avatar" alt="">
            </div>
            <div slot="user" slot-scope="item">
              {{item.value.name}}
            </div>
            <div slot="total_price" slot-scope="data">
             <span v-html="$options.filters.price(data.item.total_price)"></span>
            </div>
            
      </b-table>
    </div>   
  </div>
      

  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import CardLine1ChartExample from '~/components/dashboard/CardLine1ChartExample'
import CardLine2ChartExample from '~/components/dashboard/CardLine2ChartExample'
import CardLine3ChartExample from '~/components/dashboard/CardLine3ChartExample'
import CardBarChartExample from '~/components/dashboard/CardBarChartExample'
/*import MainChartExample from '~/components/dashboard/MainChartExample'*/
import SocialBoxChartExample from '~/components/dashboard/SocialBoxChartExample'
import CalloutChartExample from '~/components/dashboard/CalloutChartExample'
import { Callout } from '~/components/'
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios';
import Multiselect from 'vue-multiselect'
export default {
  components: { Multiselect },
  layout: 'dashboard',
  name: 'dashboard',
  components: {
    flatPickr,
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    //MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },
   props: {
      caption: {
        type: String,
        default: 'salesItems'
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


  data: function () {
    return {
      selected: 'Month',
      dashboard: [],
      salesItems:[],
      topClients:[],
      topBrands:[],
      totalSales: [],
      totalCustomers: [],
      topBrandReport:[],
      brand:[],
       config: {
        wrap: true, // set wrap to true only when using 'input-group
        altInput: true,
        enableTime: false,
        dateFormat: "Y-m-d",   
      },  
      brandReport: {
        from:'',
        to:''
      },
      clientFields: 
        {
          avatar: {
            label: '',
            class: 'text-center',
            key:''
         },

        user: {
          label: 'Nombre',
          key:'client.customer'
        },
         quantity: {
          label: 'Cantidad',
          key:'total_items'
        },
        sales: {
          label: 'Monto',
          class: 'text-center',
          key:'total_price'
         }
        },
      
      tableFields: {
        avatar: {
          label: '',
          class: 'text-center'
        },
        user: {
          label: 'Nombre'
        },
        sales: {
          label: 'Monto',
          class: 'text-center'
        },
        activity: {
          label: 'Actividad'
        }
      },
      brandFields:
        {
           avatar: {
            label: '',
            class: 'text-center',
            key:''
          },
          user: {
            label: 'Nombre',
            key:'MARCA'
          },
          quantity: {
            label: 'Cantidad',
            key:'quantity'
          },
          sales: {
            label: 'Monto',
            class: 'text-center',
            key:'total_price'
         }
        },
      brandReportFields:
        {
           avatar: {
            label: '',
            class: 'text-center',
            key:''
          },
          user: {
            label: 'Nombre',
            key:'MARCA'
          },
          quantity: {
            label: 'Cantidad',
            key:'quantity'
          },
          sales: {
            label: 'Monto',
            class: 'text-center',
            key:'total_price'
         }
        },
      salesFields: {
        avatar: {
          label: '',
          class: 'text-center',
          key:''
        },
        user: {
          label: 'Nombre',
          key:'product.article_description'
        },
        number: {
          label: 'Cantidad',
          class: 'text-center',
          key:'total_qty'
        },
        sales: {
          label: 'Monto',
          class: 'text-center',
          key:'total_price'
        } 
      }
    }
  },
  mounted() {
        this.fetchDashboard();
        this.fetchTopsalesItem();
        this.fetchTopclients();
        this.fetchTopBrands();
        this.fetchBrand();
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched;
    },
    ...mapGetters({
      counterS: 'graph/getCounter',     
      
    })
  },
  methods: {
    fetchBrand(){
      this.$axios.get(`brands_list`)
      .then(response => {
        this.brand = response.data.data
        
          this.brand = this.brand.map(function(elem) {
            return {
              //value: elem.brand_identifier,
              brandName: elem.brand_identifier
            } 
          })
         
        })
        .catch(e => {
          this.errors.push(e)
        })
    },  
     fetchDashboard(){
      this.$axios.get(`dashboard?r=`+this.selected)
     .then(response => {
        // JSON responses are automatically parsed.
       this.dashboard = response.data.data;
      })
      .catch(e => {
       // this.error =  e.response.data.message
      })
      this.fetchGraphs(this.selected)
    },
    async fetchGraphs(p) {
      
      await this.$axios.get(`TotalOrderCount?r=${p}`)
      .then(response => {

      //alert(response.data.data.monthList)
       this.updateGraphs(response.data.data)

      })
      .catch(e => {
       // this.error =  e.response.data.message
      })

      this.fetchTopclients()
      this.fetchTopsalesItem()
      this.fetchTopBrands()
    },
    fetchTopsalesItem(){
      this.$axios.get(`topsalesItem?r=`+this.selected)
      .then(response => {
        // JSON responses are automatically parsed.
       this.salesItems = response.data;
      })
      .catch(e => {
       // this.error =  e.response.data.message
      })
    },
    fetchTopclients(){
       this.$axios.get(`topClients?r=`+this.selected)
       .then(response => {
        // JSON responses are automatically parsed.
       this.topClients = response.data;
      })
      .catch(e => {
       // this.error =  e.response.data.message
      })
    },
    fetchTopBrands(){
       this.$axios.get(`top/brands?r=`+this.selected)
       .then(response => {
        // JSON responses are automatically parsed.
         this.topBrands = response.data;
      })
      .catch(e => {
       // this.error =  e.response.data.message
       // 
      })
    },
    async brandReports(){
      var data = this.brandReport
      await this.$axios.post('brand_report',data)
      .then(response => {
         this.topBrandReport = response.data;
      })
      .catch(e => {
       // this.error =  e.response.data.message
       // 
      })
    },
    
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    flag (value) {
      return 'flag-icon flag-icon-' + value
    },
    ...mapMutations({
      updateCounter: 'graph/updateCounter',
      updateGraphs: 'graph/updateGraphs',
  }),
  }
}
</script>

<style scoped>
.card.traffic-sec .card-body {
    display: none;
}
.n-toolbar-sec .btn.btn-outline-secondary {
    border: 2px solid #FFFFFF;
    border-radius: 0px;
    font-size: 14px;
    background: #d6d6d6;
border: #d6d6d6 1px solid;
color: #000;
    letter-spacing: 0;
    text-align: center;
    font-weight: 300;
    line-height: 24px;
    margin-top: 0px;
    padding-left: 20px;
    margin-right: 30px;
    font-weight: normal;
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
.footer-n-sec {
    margin: 30px 0 0;
}
.assign-dd{
  display: flex;
  padding: 0px 0px 10px;
  /*justify-content: space-between;*/
}
.report-sec {
    display: inline-block !important;
    margin: 0px 0px !important;
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