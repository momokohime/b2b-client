 
<template>
  <section>  
 	<div class="row">
	<div class="col-sm-12 col-xl-12">
    <div class="card-header">
      Informes de clientes
      </div>
		<div class="filter-sec card assign">
			<ul>
	
		    <li>
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
             </li>
            <!--  <li>
             	<multiselect
		          :multiple="true"
		          v-model="clientReport.productVal"
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
             <!--  <li>
              <multiselect
              :multiple="true"
              v-model="clientReport.brand"
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
             </li> -->
            
             <li>
                <flat-pickr 
                  :config="config"                                                          
                  class="form-control" 
                  placeholder="Select From date" 
                  v-model="clientReport.from"
                  >
               </flat-pickr>
             </li>
         
             <li>
                <flat-pickr 
                  :config="config"                                                          
                  class="form-control" 
                  placeholder="Select From to" 
                  v-model="clientReport.to"
                  >
               </flat-pickr>
             </li>
		     
	 

	  <li>
	     </li>
	     <li><button class="btn check-btn" type="button" @click="customerReports()" style="background-color:  #003da6">Reporte</button></li>
     </ul>
    </div>
</div>
 </div>
 <div class="table-responsive">
      <table class="table table-striped custom-table new">
        <thead>
            <tr>
               <th>Número de orden</th> 
                <th>Cantidad</th>
               
                <th>Monto</th>
                <th>Fecha</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(report, index) in clientReports" >
                 <td>{{ report.order_id }}</td>
                 <td>{{ report.total_items }}</td>
                
                 <td><span v-html="$options.filters.price(report.total_price)"></span></td>
                 <td>{{ report.created_at }}</td>    
            </tr>
          </tbody>
        </table>
      </div>
 </div>
 
</section>
</template>
<script>
import axios from 'axios';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import Multiselect from 'vue-multiselect'


export default {
  components: { Multiselect,flatPickr },
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
       
      error: null,
      errors: [], 

      clientReports:[],
        customerList: [],
        productList: [], 
        brand:[],
        clientReport: {
          from:'',
          to:''
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
    flatPickr
  },
  mounted() {
        this.fetchCustomer();
        this.fetchProduct();
        this.fetchBrand();
        this.fetchTopclients();
    },
  methods: {
    fetchCustomer(){
        this.$axios.get('clients')
       .then(response => {
        
        this.customerList = response.data.data
     
        this.customerList = this.customerList.map(function(elem) {
          return {
            value: elem.id,
            user: elem.name
          } 
        })
       
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      fetchTopclients(){
       this.$axios.get(`topClients?r=`+this.selected)
       .then(response => {
        // JSON responses are automatically parsed.
       this.clientReports = response.data;
      })
      .catch(e => {
       // this.error =  e.response.data.message
      })
    },
    fetchBrand(){
      this.$axios.get(`brands`)
      .then(response => {
        this.brand = response.data.other_brands

          this.brand = this.brand.map(function(elem) {
            return {
              value: elem.id,
              brandName: elem.brand_name
            } 
          })
         
        })
        .catch(e => {
          this.errors.push(e)
        })
    },  
    fetchProduct(){
        this.$axios.get(`products`)
        .then(response => {
        
        this.productList = response.data.data
     
        this.productList = this.productList.map(function(elem) {
          return {
            value: elem.MATNR,
            name: elem.TEXT1
          } 
        })
       
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
     async customerReports(){
      	var data = this.clientReport
      	await this.$axios.post('client_report',data)
         .then(response => {
            this.clientReports = response.data
             
         
          })
        .catch(e => {
          this.errors.push(e)
        })
      }
      
      
  },
 
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