 
<template>
  <section>  
 	<div class="row">
	<div class="col-sm-12 col-xl-12">
		<div class="filter-sec card assign">
			<ul>
	<b-form>
		
		    <li> <input v-on:keyup="search"  v-model="filters.customerid" placeholder="ID DE CLIENTE"></li>
		    <li> <input v-on:keyup="search" v-model="filters.customerName" placeholder="NOMBRE"></li>
		     <li><input v-on:keyup="search" v-model="filters.oldId" placeholder="ID ANTERIOR"></li>
	    
	  </b-form> 

	  <li>
	     <select v-model="selectedSalesman">
	     	<option value="none">{{ $t('select_salesman') }}</option>
	     	<option v-for="(salesman, index) in salesmen" v-on:click="selectSalesman" v-bind:value="{ id: salesman.id, name: salesman.name}">{{salesman.name}}</option>
	     </select></li>
	     <li><button class="btn btn-primary check-btn" type="button" @click="assignCustomers()">{{ $t('assign_customers') }}</button></li>
     </ul>
    </div>
</div>


<!--  <div class="assign-dd next"> 
 <b-form>
	<div class="">
	     <input v-on:keyup="search"  v-model="filters.customerid" placeholder="ID DE CLIENTE">
	     <input v-on:keyup="search" v-model="filters.customerName" placeholder="NOMBRE">
	     <input v-on:keyup="search" v-model="filters.oldId" placeholder="ID ANTERIOR">
	 </div>
     
  </b-form> 
 </div> -->

 <div class="col-sm-12 col-xl-12">
		<div class="filter-sec card assign">
			<ul>
 				<b-form>
				     <li><input v-on:keyup="search" v-model="filters.priceGroup" placeholder="LISTA DE PRECIOS"></li>
				     <li><input v-on:keyup="search" v-model="filters.zip" placeholder="COD POST"></li>
				     <li><input v-on:keyup="search" v-model="filters.state" placeholder="ESTADO"></li>
				     <li><input v-on:keyup="search" v-model="filters.route" placeholder="RUTA"></li>
  				</b-form> 
  			</ul>
  		</div>
  	</div>
  <!--  <button class="btn check-btn" type="submit" >search</button>    -->
  <!--  <div class="custom-sel-outer">
      <div class="custom-sel form-inout"> 
         <b-form-input v-on:keyup="search" type="text"  v-model="filters.customerid"></b-form-input>

         <b-form-input v-on:keyup="search" type="text"  v-model="filters.customerName"></b-form-input>
           
      </div> 
  </div> -->
  </div>
 </div>
 	<div class="table-responsive">
   <table class="table table-striped custom-table">
          <thead>
            <tr>
	            <th>
            		<div class="custom-control custom-checkbox">
					    <input type="checkbox" class="custom-control-input" id="customCheck"  @click="selectAllChk" v-model="selectAll">
					    <label class="custom-control-label" for="customCheck"></label>

			 	 	</div>
			 	 </th>
	            <th>ID DE CLIENTE</th>
	            <th>NOMBRE</th>
	            <th>ID ANTERIOR</th>
	            <th>ADRNR</th>
	            <th>ESTADO</th>
	            <th>COLONIA</th>
	            <th>LISTA DE PRECIOS</th>
	            <th>COD POST</th>
	            <th>RUTA</th>
	            <th>RFC</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers"> 
	            <td> 
	            	<div class="custom-control custom-checkbox">
					    <input type="checkbox" class="custom-control-input"  :value=customer.KUNNR :id="index"  @click="selectCustomers($event)" v-model="selectedCustomers">
					    <label class="custom-control-label" :for="index"></label>

  					</label>

			 	 	</div>
	            </td> 
	            <td>{{ customer.KUNNR }}</td>
	            <td>{{ customer.NOMBRE }}</td>
	            <td>{{ customer.ID_ANTERIOR }}</td>
	            <td>{{ customer.ADRNR }}</td>
	            <td>{{ customer.BEZEI }}</td>
	            <td>{{ customer.COLONIA }}</td>
	            <td>{{ customer.KONDA }}</td>
	            <td>{{ customer.COD_POST }}</td>
	            <td>{{ customer.GPO_VEND }}</td>
	            <td>{{ customer.RFC }}</td>
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
      </div>
</section>
</template>
<script>

 import axios from 'axios';

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    data: () => {
      return {
        error: null,
      	form: {
        searhCustomer: {
          id: '',
        }
      },
      	selectedCustomers:[],
      	assignedData:[],
        customers: [],
        totalRows:0,
      	perPage: 0,	
      	currentPage: 0,
        salesmen:[],
        errors: [],
        output:[],
        boxTwo: '',
        items: [],
        selectedSalesman:'none',
        totalRows: 0,
        selected: [],
		    selectAll: false,
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
        this.fetchClients(1);
        this.fetchSalesmans();
    },
   
    methods: {
      selectSalesman(){
      	this.selectedCustomers = [];
      },		
      fetchClients(page) {

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
	        this.$axios.get('supervisors/assigned/clients?'+queryString, {
              params: {
                page: page,
            }
	        }).then(response => {
	       	//alert(response.data.meta.per_page);
	          // JSON responses are automatically parsed.
	          this.customers = response.data.data;
	          this.perPage = response.data.meta.per_page
		      this.totalRows = response.data.meta.total
		      this.currentPage = response.data.meta.current_page
	        })
	        .catch(e => {
	          this.errors.push(e)
	        })
      	},
      	search(){
      	   this.fetchClients()
      	},
	    fetchSalesmans(ctx, callback)
	     {
	      this.$axios.get(`supervisors/salesman/all`)
	     .then(response => {
	        // JSON responses are automatically parsed.
	       this.salesmen = response.data
         console.log(response.data)
	      })
	      .catch(e => {
	        this.error =  e.response.data.message
	      })
	    },
   		selectCustomers (e) {
		    if (e.target.checked) {
		      	//Get selected Ids
		        var customersID = e.target.value
		        
		        this.selectedCustomers.push(customersID) 
		        console.log(">>>>"+this.selectedCustomers);
		    }
		    else {
		     	//Removed unchecked Ids
		     	 for (var i = 0; i < this.selectedCustomers.length; i++ ) {
		          if (this.selectedCustomers[i] == e.target.value) {
		            this.selectedCustomers.splice(i, 1)
		          }
		        }
		    }
	 	},

	 	selectAllChk() {
			this.selectedCustomers = [];
			if (!this.selectAll) {
				for (let i in this.customers) {
					this.selected.push(this.customers[i].KUNNR);
					this.selectedCustomers.push(this.customers[i].KUNNR);
				}
			}
			console.log(this.selectedCustomers);
		},
	    async assignCustomers(customers)
	    {
	    	if(this.selectedSalesman.id == undefined || this.selectedSalesman.id == 'none')
	    	{
	    		alert("Please Select Salesman")
	    		return false;
	    	}
	    	if( this.selectedCustomers.length == 0)
	    	{
	    		alert("Please Select Customers")
	    		return false;
	    	}

	    	var formInput = {
	          'user_id': this.selectedSalesman.id,
	          'customers': this.selectedCustomers
	        }
	        var salesmaName = this.selectedSalesman.name
	        //Post data
         
	    	await this.$axios.post('supervisors/assign/clients',formInput)
         	.then(function (response) {

               alert(response.data.data.msg);
            })
	      	.catch(e => {
	        this.error = e.response;
	      })
	    }

    }
  };
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