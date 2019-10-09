<template>
	<section>			
		<main class="main">
			<div class="profile-sec-new">
					<h4>Mis Ordenes</h4>
				</div>
			<div class="row profile_bottom">
				<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					<div class="card">
						<div class="card-body">
							<table class="table table-responsive-sm">
								<thead>
									<tr>
										<th>ID de Orden</th>
										<th>Fecha</th>
										<th>Productos Totales</th>
										<th>Total</th>
										<th>Ver</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(order, index) in orders">
										<td>#{{ order.order_id }}</td>
										<td> {{ order.order_date }}</td>

										<td>{{order.total_items}}</td>
										<td>${{ Number((1 * order.total_price).toFixed(2)) }}</td>

										<td class="order-view">

										<b-button variant="primary" class="btn btn-pill btn-block btn-primary"  @click="$router.push({ name: 'order_detail', params: { id:order.order_id }})" >Ver</b-button>
									</td>
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
											@change="getOrders">
										</b-pagination>
								 </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>	
	</section>		
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios';

export default {
    layout: 'profile',
     middleware: 'frontend',
    data: () => {
      return {
        errors:[],
        error:null,
        totalRows:0,
        currentPage: 0,
        perPage: 0,
        orders:[]
      }
    },
     computed: {
	  ...mapGetters({
	    isAuthenticated: 'isAuthenticated',
	    loggedInUser: 'loggedInUser',
	  })
	},
    mounted(){
    	this.getOrders(1)
  	},
    methods: {
    	getOrders(page)
    	{
    		var clientID = this.loggedInUser.relation_id
	     	this.$axios.get(`frontend/orders/`+clientID+`?page=`+page)
	     	.then(response => { 
	     	  var _r = response.data
	          this.orders = _r.data;
	          this.totalRows = _r.total;
	          this.currentPage = _r.current_page;
	          this.perPage  = _r.per_page;
	      	})
		    .catch(e => {
		        this.errors.push(e)
		    })
	  	},
   	}
};
</script>
