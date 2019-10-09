<template>
	<section>

		<div class="inner-body-content">
			<div class="rind-the-right-section">
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-lg-6 col-sm-6 col-12 zoom-product-sec">
							<div v-if="images.thumbs.length > 0">
	    						<ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
							</div>
						</div>
						<div class="col-md-6 col-lg-6 col-sm-6 col-12">
							<div class="single-product-content">
								<div class="profile-details">
									<h4>{{product.TEXT1}}</h4>
								</div>
								<div class="clinicaltype">
								CÓDIGO: {{ product.MATNR }}
							<!-- 	<ul v-if="product.avg_rating > 0">
									<li v-for="rate in product.avg_rating"><i class="fa fa-star" aria-hidden="true"></i></li>
									<li ><span>{{product.avg_rating}} de 5 /<span ><a href="#tabContent"  v-on:click="step = 2">Escribir Reseña</a></span></span></li>
								</ul>
								<ul v-else>
									<li><span>Todavía no calificado /<span><a href="#tabContent"  v-on:click="step = 2"> Escribir Reseña</a></span></span></li>
								</ul> -->
								</div>
								<div class="archive-bio clinicaltype" v-if="product.attributes">
								<p>{{product.attributes.long_description}}</p>
							</div>
								<div class="brand-list" v-if="loggedInUser">
									<ul v-if="loggedInUser.is.BU">
										<li>Existencias:</li>
										<li><span> Disponible</span></li>
										 <li v-if="product.attributes">
										 	<img v-if="product.attributes.brands_info" :src="product.attributes.brands_info.brand_image">
										 </li> 
									</ul>
								</div>
								<div class="brand-list currency" v-if="loggedInUser">
									<ul v-if="loggedInUser.is.BU">
										<li v-if="product.price">$ {{product.price}}</li>
									</ul>
								</div>
								<div class="brand-list currency color btn" v-if="loggedInUser">
									<div v-if="loggedInUser.is.BU">
									<span >CANTIDAD</span>
									<ul v-if="loggedInUser.is.BU">
										<li class="paginationss" >
											<button type="button" class="button hollow circle"  @click="decQty(product)"><i class="fa fa-minus" aria-hidden="true"></i></button>

											<input type="number" class="form-control"  @input="updateQty(product)" v-model="product.qty">

											<button type="button"class="button hollow circle" @click="incQty(product)"><i class="fa fa-plus" aria-hidden="true"></i></button>
										</li>
										<!-- <li class="paginationss detail-btn"><a href="#">AÑADIR AL CARRITO</a>
										</li> -->
										<li class="email-btns" v-if="loggedInUser.is.BU">
											<button type="button"v-bind:class="[product.is_favorite ? 'is_favorite_css_class' : '']" @click="addToFav(product.id)"><i class="fa fa-heart" aria-hidden="true"></i></button>
										</li>
										<li v-if="loggedInUser.is.BU">
											<button type="button" @click="addToWishlist(product.id)" v-bind:class="[product.in_whishlist ? 'custom-phone heart' : '']"><i class="fa fa-star" aria-hidden="true"></i></button>
										</li>
									</ul>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>		
		</div> 
		<div class="tabs-content tab-box">
			<div class="container" id="tabContent">
	 			<b-tabs v-model="step">
	            	<b-tab title="Descripción" active>

						<div class="heading-para" v-if="product.attributes">
							<p>{{product.attributes.long_description}}</p>
						</div>
								

		            	</b-tab>
		            	<b-tab title="Aplicación" >

						<div class="heading-para">
							<div class="row">
								<div class="col-lg-12 col-md-12 col-sm-12 col-12 popup">
									<div class="table-responsive">
										<table class="table table-striped">
										  <thead>
											<tr>
											  <th scope="col">Desde</th>
											  <th scope="col">Hasta</th>
											  <th scope="col">Marca</th>
											  <th scope="col">Modelo</th>
											  <th scope="col">Motor</th>
											</tr>
										  </thead>
										  <tbody>
											<tr  v-for="(items, index) in product.applications">
											  <td>{{items.DESDE}}</td>
											  <td>{{items.HASTA}}</td>
											  <td>{{items.MARCA}}</td>
											  <td>{{items.MODELO}}</td>
											  <td>{{items.MOTOR}}</td>
											</tr>
										  </tbody>
										</table>
									</div>
								</div>
							</div>
						</div>			

		            </b-tab>

		           <!--  <b-tab title="Reseñas" >
						<div v-if="loggedInUser">
				            <div class="alert alert-danger" role="alert" v-show="error">
	                            {{ error }}
	                        </div>
	                        <div class="alert alert-success" role="alert" v-show="success">
	                            {{ success }}
	                        </div>
							<div class="heading-para" v-if="loggedInUser.is.BU">
								  <b-form @submit="onSubmit">
								  	   <b-form-group>
							              <label for="title">Título</label>
							              <b-form-input type="text" id="title" v-model="form.title" required placeholder="Título"></b-form-input>
							            </b-form-group>

							            <b-form-group>
							            	<label for="comment">Comentario</label>
							            	<b-form-textarea id="comment" :rows="3" v-model="form.comment" placeholder="Comentario"></b-form-textarea>
							            </b-form-group>

							            <b-form-group>
							            	<label for="comment">Calificación</label>
							            	<star-rating v-model="form.rating"></star-rating>
							            </b-form-group>

							            <div slot="footer" class="sub-sec">
							              <b-button type="submit" > Enviar</b-button>
							                
							            </div>
								  </b-form>
							</div>		
						</div>
			        </b-tab> -->
	        	</b-tabs>
	     	</div>
		</div>


		<div class="product-sec single-prodct">
			<div class="container header-sec">
				<div class="row">
					<div class="divider"><h2 class="inner-heading">TE PUEDE INTERESAR ESTO</h2></div>
					
				</div>
			</div>
		</div>
	
		<div class="container header-sec" v-if="related_products.length > 0" >
				<carousel  :dots="false"
			            :items="5"
			             :responsive="{1000:{items:5},768:{items:2},360:{items:1},320:{items:1}}"  >
					<div v-for="(product, index) in related_products" 
			            :key="index">
			            <div class="slider_img">
							<!-- <router-link :to="{ name: 'single_product', params: { id: product.id }}"><img :src="product.image"></router-link> -->
							<a :href="'/products/'+product.id+'/show'"><img :src="product.image" @error="img404(product)"></a>
						</div>
						<div class="slider_text">
							<h2 v-if="product.attributes">{{product.attributes.short_description}}</h2>
							<h3 class="mtnrid">{{product.material}}</h3> 
							<p v-if="product.price">${{product.price}}</p>
							 <button @click="appProduct(product)" v-if="product.applications.length > 0"><i class="fa fa-wrench" aria-hidden="true"></i> APLICACION</button>
							 <!-- <a :href="'/products/'+product.id+'/show'"><i class="fa fa-search" aria-hidden="true"></i></a>  -->
							<!-- <a href="#" class="logo_link"><img src="~/assets/frontend/images/tmk-logo.png"></a> -->
							<a href="#" v-if="product.attributes"  class="logo_link"><img v-if="product.attributes.brands_info" :src="product.attributes.brands_info.brand_image"></a>


						</div>
					</div>
				</carousel> 
			</div>
			<div class="product-sec single-prodct">
				<div class="container header-sec">
					<div class="row">
						<div class="divider">
						<h2 class="inner-heading">COMPLETA TU COMPRA CON ESTO</h2>
						</div>
						
					</div>
				</div>
			</div>
			<div class="container header-sec" v-if="recently_viewed.length > 0" >
				<carousel :dots="false"
			            :items="5"
			             :responsive="{1000:{items:5},768:{items:2},360:{items:1},320:{items:1}}"  >
					<div v-for="(product, index) in recently_viewed" 
			            :key="index">
			            <div class="slider_img">
							<!--  <router-link :to="{ name: 'single_product', params: { id: product.id }}"><img :src="product.image"></router-link> -->
							<a :href="'/products/'+product.id+'/show'"><img :src="product.image" @error="img404(product)"></a>
						</div>
						<div class="slider_text">
								<h2 v-if="product.attributes">{{product.attributes.short_description}}</h2>
								<h3 class="mtnrid">{{product.material}}</h3> 
								<p v-if="product.price">${{product.price}}</p>

								 <button @click="appProduct(product)" v-if="product.applications.length > 0"> <i class="fa fa-wrench" aria-hidden="true"></i> APLICACION</button>
								<!--  <a :href="'/products/'+product.id+'/show'"><i class="fa fa-search" aria-hidden="true"></i></a>  -->

								<a href="#"  v-if="product.attributes" class="logo_link"><img v-if="product.attributes.brands_info" :src="product.attributes.brands_info.brand_image"></a>
						</div>
					</div>
				</carousel> 
			</div>
			<b-modal title="" size="lg" v-model="application_product" @ok="application_product = false">
     			<div class="row">
					<div class="col-lg-12 col-md-12 col-sm-12 col-12">
						<div class="pop-header">
							APLICACIONES DEL PRODUCTO
							<form class="form-inline my-2 my-lg-0">
							  <input class="form-control mr-sm-2" type="search" placeholder="Buscar…" aria-label="Search">
							</form>
						</div>
					</div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-12 popup">
						<div class="table-responsive">
							<table class="table table-striped">
							  <thead>
								<tr>
								  <th scope="col">Desde</th>
								  <th scope="col">Hasta</th>
								  <th scope="col">Marca</th>
								  <th scope="col">Modelo</th>
								  <th scope="col">Motor</th>
								</tr>
							  </thead>
							  <tbody>
								<tr  v-for="(items, index) in modelProducts">
								  <td>{{items.DESDE}}</td>
								  <td>{{items.HASTA}}</td>
								  <td>{{items.MARCA}}</td>
								  <td>{{items.MODELO}}</td>
								  <td>{{items.MOTOR}}</td>
								</tr>
							  </tbody>
							</table>
						</div>
					</div>
				</div>
    		</b-modal>
	</section>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex'
	import axios from 'axios';

	// const carousel = () => window && window !== undefined ? import("vue-owl-carousel") : null;

	export default {
    layout: 'frontend',
    data(){
    	return {
	    	product:[],
	    	application_product:false,
	    	activeImage: 0,
	    	productID:null,
	    	otherImages:[],
	    	recently_viewed:[],
	    	related_products:[],
	    	modelProducts:[],
	    	description:'',
	    	error:null,
	    	success:null,
	    	long_description:'',
	    	step:1,
	    	form:{
	    		title:'',
	    		comment:'',
	    		rating: 5
	    	},
	    	images:{
	    		thumbs:[],
	    		normal_size:[],
	    		large_size:[]

	    	},
            zoomerOptions: {
	          zoomFactor: 3,
		      pane: "pane",
		      hoverDelay: 300,
		      namespace: "zoomer-bottom",
		      move_by_click: false,
		      scroll_items: 4,
		      choosed_thumb_border_color: "#dd2c00",
		      scroller_position: "bottom",
		      zoomer_pane_position: "right"
		    }
   	 	};
  	},
  	 computed: {
  	 
  		currentImage() {
                 return this.imagesThumb[this.activeImage].big;
           },
            ...mapGetters(['isAuthenticated', 'loggedInUser']),
  	},
  	mounted()
  	{
  		this.productID = this.$route.params.id;
  		//this.fetchHomeData()
  		this.fetchproduct()
  	},
  	methods:{

  		//  onSubmit(evt) {
  		//  	evt.preventDefault()
    //     	this.error = null
    //     	console.log(this.form.title)
	   //      this.$axios.post('frontend/products/add_review/'+this.productID+'/?title='+this.form.title+'&body='+this.form.comment+'&rating='+this.form.rating)
	   //      .then(response => {   
	   //        	this.success = "Thank You for your reviews"
	   //       })
	   //      .catch(e => {
	   //          this.error = e.response.data.message;
	   //      })
  		// },
  		img404(product) {
			product.image = '/img/image-not-found.jpg'
		},

  		...mapMutations({
	    incQty: 'cart/incQty',
	    decQty: 'cart/decQty',
	    updateQty: 'cart/updateQty',
		}),

  		appProduct(product){
  			this.modelProducts = product.applications
  			this.application_product = true
  		},

        fetchproduct(){


	        this.$axios.get('frontend/products/'+this.productID)
	        .then(response => {
	        
	           this.product = response.data.data;
	           this.recently_viewed = response.data.data.recently_viewed;
	           this.related_products = response.data.data.related_products;
	           
	           if(response.data.data.other_images){
	           	this.otherImages = response.data.data.other_images
	           }
	            this.images.thumbs = this.otherImages 
	            this.images.normal_size = this.otherImages
	            this.images.large_size = this.otherImages 
	           	console.log(response.data.data)
	           		//console.log(this.otherImages )
	           
	        })
	        .catch(e => {
	          this.errors.push(e)
	        })
	 	},

	 	async addToFav(product_id){
		  const  favorite  = await this.$axios.post('/frontend/products/toggle_fav/'+product_id);
		    this.product.is_favorite = !this.product.is_favorite
		},

		async addToWishlist(product_id){
		  const  wishlist  = await this.$axios.post('/frontend/products/toggle_whishlist/'+product_id);
		  this.product.in_whishlist = !this.product.in_whishlist
		},

		// viewProduct(id){
		// 	 //this.$router.push({ name: 'product_list',  query: { search: queryString }})
		// 	 this.$router.push({ path: `/products/${id}/show` })
		// }
	 	

  	}
};
</script>
<style>
	.brand-list.currency.color.btn li button:focus {
    outline: none;
}
button.custom-phone.heart i {
    color: red;
}
.brand-list.currency.color.btn li button {
    width: auto;
    height: auto;
    padding: 9px 15px;
    font-size: 13px;
    border-radius: 10px;
    color: #020202;
    text-decoration: none;
    font-weight: 400;
    background: #F3F3F3;
    float: left;
    border: 0;
}
.paginationss button i {
    font-size: 13px !important;
}
.brand-list.currency.color.btn li button i {
    font-size: 24px;
}
.tabs-content .tab-content {
    margin-top: -1px;
    background: #fff;
    border: 1px solid #a4b7c1;
    padding: 0px 40px 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
.slider-sec{
	width: 100%;
	overflow: hidden;
}

.product-sec .owl-carousel .owl-nav .owl-prev {
    left: -55px;
}
.product-sec .owl-carousel .owl-nav .owl-next {
    right: -55px;
}
.product-sec.single-prodct {
    padding: 30px 0 30px;
}
.tab-box {
    border: 0;
    padding: 0;
}
button.is_favorite_css_class i {
    color: red;
}
/*.zoom-product-sec img {
    width: 100%;
}
.scroller-at-bottom .thumb-list {
    justify-content: center !important;
    margin: 0 auto !important;
}*/
</style>