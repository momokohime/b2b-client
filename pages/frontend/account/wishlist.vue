<template>
	<section>		
		<main class="main">
			<div class="profile-sec-new">
				<h4>Lista de Deseos</h4>
			</div>
			<div class="row profile_bottom">
				<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					<div class="card">
						<div class="card-body cart-item-sec">
							<table class="table table-responsive-sm">
								<thead>
									<tr>
										<th>Imágen</th>
										<th>Producto</th>
										<th>Precio</th>
										<th>Quitar de Mi Lista</th>
										<th>Añadir al Carrito</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(product, index) in wishlist">
										<td class="product-img"><img :src="product.image" style=" width: 60px;"></td> 
										<td>{{ product.MATNR }}</td>
										<td>${{ product.price }}</td>
										
										<td class="order-status fav">
										<button type="button" class="btn btn-pill btn-primary"  @click="deleteWishlist(product.id)">Quitar de Mi Lista</button>
										</td>

										<td>
											<div class="for-table-plus">
						                        <button type="button" class="button hollow circle"  @click="decQty(product)">
						                        <i class="fa fa-minus" aria-hidden="true"></i>
						                        </button> 

						                        <input type="text" class="input-group-field" @input="updateQty(product)" v-model="product.qty">

						                         <button type="button"class="button hollow circle" @click="incQty(product)">
						                          <i class="fa fa-plus" aria-hidden="true"></i>
						                        </button>
						                    </div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="pagination-nav">
				   <div class="container">
					   <b-pagination
			            :total-rows="totalRows"
			            :current="currentPage"
			            :simple="false"
			            :per-page="perPage"
			            order="is-right"
			            @change="getWishList">
                     </b-pagination>
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
        wishlist:[],
        currentPage: 0,
        perPage: 0,
        totalRows: 0
      }
    },
      computed: {
	  ...mapGetters({
	    isAuthenticated: 'isAuthenticated',
	    loggedInUser: 'loggedInUser',
	  })
	},
    mounted(){
     this.getWishList(1)
  	},
    methods: {
    	...mapMutations({
	    incQty: 'cart/incQty',
	    decQty: 'cart/decQty',
	    updateQty: 'cart/updateQty',
		}),
	   
	  	getWishList(page){
	  		this.currentPage = page
	  		var clientID = this.loggedInUser.relation_id
	     	this.$axios.get('frontend/products/whishlist?page='+page+'&clientID='+clientID)
	     	.then(response => {
	     	  this.wishlist = response.data.data  
	          this.perPage     =   response.data.meta.per_page
	          this.totalRows   =   response.data.meta.total
	          this.currentPage =   response.data.meta.current_page
	     		console.log(response)  
	      	})
		    .catch(e => {
		          this.errors.push(e)
		    })
	  	},

	  	deleteWishlist(productId){
	     	this.$axios.post('frontend/products/toggle_whishlist/'+productId)
	     	.then(response => { 
	     		this.getWishList() 
	      	})
		    .catch(e => {
		        this.errors.push(e)
		    })
	  	},
   }
};
</script>
