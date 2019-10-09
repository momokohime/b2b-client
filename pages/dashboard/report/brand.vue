
<template>
  <section>  
  <div class="row">
  <div class="col-sm-12 col-xl-12">
     <div class="card-header">
      Informe de marca
      </div>
    <div class="filter-sec card assign">
      <ul>
  
          <!-- <li>
          <multiselect
                :multiple="false"
              v-model="clientReport.user"
              :options="customerList"
              :close-on-select="true"
              :clear-on-select="false"
              :hide-selected="true"
              :preserve-search="true"
              placeholder="Selecciona vendedor"
              label="user"
              track-by="user"
              :preselect-first="true"
              id="example1"
               ></multiselect>
             </li> -->
            <!--  <li>
              <multiselect
              :multiple="true"
              
              :options="productList"
              :close-on-select="false"
              :clear-on-select="false"
              :hide-selected="true"
              :preserve-search="true"
              placeholder="Selecciona productos"
              label="name"
              track-by="name"
              :preselect-first="true"
                ></multiselect>
             </li> -->
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
                  v-model="brandReport.from"
                  >
               </flat-pickr>
             </li>
             <li>
                <flat-pickr 
                  :config="config"                                                          
                  class="form-control" 
                  placeholder="Select From to" 
                  v-model="brandReport.to"
                  >
               </flat-pickr>
             </li>

       <li>
       </li>
       <li><button class="btn check-btn" @click="getBrandReport()" type="button" style="background-color:  #003da6">Reporte</button></li>
     </ul>
    </div>
    <div>
     <!--   <card-line1-chart-example class="chart-wrapper px-3" style="height:140px;" height="70"/> -->
    </div>
</div>
 </div>
 <div class="table-responsive">
      <table class="table table-striped custom-table new">
        <thead>
            <tr>
             
               <th>Nombre</th> 
                <th>Cantidad</th>
                <th>Monto</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(report, index) in brandReports" >
              
                 <td>{{ report.MARCA }}</td>
                 <td>{{ report.quantity }}</td>
                 <td v-html="$options.filters.price(report.total_price)"></td>               
                
            </tr>
          </tbody>
        </table>
      </div>
 </div>
 
</section>
</template>
<script>
import Multiselect from 'vue-multiselect'

import axios from 'axios';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import CardLine1ChartExample from '~/components/dashboard/CardLine1ChartExample'
import { mapMutations, mapGetters } from 'vuex'

export default {
   components: { Multiselect },
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      dates: 'Month',
      error: null,
      loading: false,
      isLoading: false,
      files: [],
      brand:[],
      brandReports:[],
      brandReport: {
        from:'',
        to:'',
        brand:''
      },
     
      config: {
        wrap: true, // set wrap to true only when using 'input-group
        altInput: true,
        enableTime: false,
        dateFormat: "Y-m-d H:i",   
      },  
    }
  },
  components: {
    flatPickr,
    CardLine1ChartExample,
  },
  mounted(){
    //this.brandReport();
    this.fetchBrand();
    this.fetchTopBrands();
  },
  methods: {
   async getBrandReport(){
        //this.orderReport.from= '2019-09-17 00:00';
        var data = this.brandReport
       // alert(data.from);
         await this.$axios.post('brand_report',data)
         .then(response => {
            this.brandReports = response.data
             //this.dates =data
         
          })
        .catch(e => {
          this.errors.push(e)
        })
        this.fetchGraphs(data)
      },
      fetchBrand(){
      this.$axios.get(`brands`)
      .then(response => {
        this.brand = response.data.other_brands

          this.brand = this.brand.map(function(elem) {
            return {
               brandName: elem.brand_identifier
            } 
          })
         
        })
        .catch(e => {
          this.errors.push(e)
        })
    },  
      async fetchGraphs(p) {
     
          await this.$axios.get(`orderReportGraph?from=`+p.from+'&to='+p.to)

            .then(response => {

            //alert(response.data.data.monthList)
             this.updateGraphs(response.data.data)

            })
            .catch(e => {
             // this.error =  e.response.data.message
            })
      },
      fetchTopBrands(){
       this.$axios.get(`top/brands?r=`+this.selected)
       .then(response => {
        // JSON responses are automatically parsed.
         this.brandReports = response.data;
      })
      .catch(e => {
       // this.error =  e.response.data.message
       // 
      })
    },
    cancel()
    {
       // this.$router.push('/dashboard/meeting')
    },
      ...mapMutations({
      updateCounter: 'graph/updateCounter',
      updateGraphs: 'graph/updateGraphs',
  }),
  }
}
</script>

<style scoped>
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