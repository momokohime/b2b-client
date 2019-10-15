
<template>
	<section>
	<div class="inner-body-content">
		<div class="rind-the-right-section">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-6 col-sm-6 col-12 zoom-main-pic">
				   		 <figure class="zoom" v-on:mousemove="magnifyImage($event)" :style="'background-image: url('+preview_image+')'">
					      <img :src="preview_image" />
					    </figure>
					    <div class="container header-sec zoom-thumblist" v-if="otherImages.length > 0" >
							<carousel :dots="false"
					            :items="5"
					             :responsive="{1000:{items:4},768:{items:2},360:{items:1},320:{items:1}}"  >
								<div class="" v-for="(product, index) in otherImages" 
						            :key="index">
						           <!--  @mouseover="mainImg = product.url" -->
						            <div :class="{active_el : active_thumb == index}">
										<img :src="product.url" @mouseover="activateThumb(index, product.url)"/>
									</div>

								</div>
							</carousel> 
						</div>
					</div>
					<div class="col-md-6 col-lg-6 col-sm-6 col-12">
						<div class="single-product-content">
							<div class="profile-details">
								<h4>{{product.TEXT1}}</h4>
							</div>
							<div class="clinicaltype">
								CÓDIGO: {{ product.MATNR }}
							</div>
							<div class="archive-bio clinicaltype" v-if="product.attributes">
								<p>{{product.attributes.long_description}}</p>
							</div>
						</div>
						<div class="brand-list" v-if="loggedInUser">
							<ul v-if="loggedInUser.is.BU">
								<li>Existencias:</li>
								<li v-if="product.disable_add_to_cart"><span style="color: red;">No Disponible</span></li>
                <li v-else><span>Disponible</span></li>
								 <li v-if="product.attributes">
								 	<img v-if="product.attributes.brands_info" :src="product.attributes.brands_info.brand_image">
								 </li> 
							</ul>
						</div>
						<div class="brand-list currency" v-if="loggedInUser">
							<ul v-if="loggedInUser.is.BU">
								<li v-if="product.price" :class="{ promotionalprice: product.is_promotional }">$ {{ product.price }}</li>
							</ul>
						</div>
						<div class="brand-list currency color btn" v-if="loggedInUser">
							<div v-if="loggedInUser.is.BU">
								<span >CANTIDAD</span>
								<ul v-if="loggedInUser.is.BU">
									<li class="paginationss" >
										<b-button type="button" class="button hollow circle"  @click="decQty(product)" :disabled="product.disable_add_to_cart"><i class="fa fa-minus" aria-hidden="true"></i></b-button>

										<input type="number" class="form-control"  @input="updateQty(product)" v-model="product.qty" :readonly="product.disable_add_to_cart">

										<b-button type="button"class="button hollow circle" @click="incQty(product)" :disabled="product.disable_add_to_cart"><i class="fa fa-plus" aria-hidden="true"></i></b-button>
									</li>
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
	<div class="tabs-content">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12 col-12">
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
        	</b-tabs>
     	</div>
	</div>
</div>
</div>
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
						<!-- <router-link :to="{ name: 'single_product', params: { id: product.id }}"> <img :src="product.image" @error="img404(product)"></router-link> -->
						<nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><img class="img-fluid" :src="product.image" @error="img404(product)"></nuxt-link>
					
				</div>
				<div class="slider_text">
					<h2 v-if="product.attributes">{{product.attributes.short_description}}</h2>
					<h3 class="mtnrid">{{product.material}}</h3> 
					<p v-if="product.price" :class="{ promotionalprice: product.is_promotional }">${{product.price}}</p>
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
						<nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><img class="img-fluid" :src="product.image" @error="img404(product)"></nuxt-link>
				</div>
				<div class="slider_text">
						<h2 v-if="product.attributes">{{product.attributes.short_description}}</h2>
						<h3 class="mtnrid">{{product.material}}</h3> 
						<p v-if="product.price" :class="{ promotionalprice: product.is_promotional }">${{product.price}}</p>

						 <button @click="appProduct(product)" v-if="product.applications.length > 0"> <i class="fa fa-wrench" aria-hidden="true"></i> APLICACION</button>
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
					  <input class="form-control mr-sm-2" type="search" placeholder="Buscar…" aria-label="Search" v-model="application_search">
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
						<tr  v-for="(items, index) in filterdApplications">
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

export default {
layout: 'frontend',
data(){
	return {
    	errors:[],
    	product:[],
    	mainImg: "",
    	active_thumb: 0,
    	application_product:false,
      application_search:'',
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
    	 preview_image: '',
    	step:1,
    	form:{
    		title:'',
    		comment:'',
    		rating: 5
    	},
	 	};
	},

  	computed: {
  		currentImage() {
            return this.imagesThumb[this.activeImage].big;
        },
        filterdApplications() {
          let applications = this.modelProducts
          let keyword = this.application_search.trim()
          if (keyword) {
            applications = this.modelProducts.filter(
              app => app.DESDE.toLowerCase().indexOf(keyword) > -1
                     || app.HASTA.toLowerCase().indexOf(keyword) > -1
                     || app.MARCA.toLowerCase().indexOf(keyword) > -1
                     || app.MODELO.toLowerCase().indexOf(keyword) > -1
                     || app.MOTOR.toLowerCase().indexOf(keyword) > -1
            );
          }
          return applications;        
        },
        ...mapGetters(['isAuthenticated', 'loggedInUser']),
  	},

  	mounted() {
  		this.productID = this.$route.params.id;
  		this.fetchproduct()
  		if(process.client){
          this.$scrollTo('#__nuxt', 0, {force: true})
     	}
  	},
  	methods:{
  		  magnifyImage(e) {      
	      var zoomer = e.currentTarget;
	      if(e.offsetX <= 0 || e.offsetY <= 0) {
	        return;
	      }
	      var offsetX, offsetY
	      e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
	      e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
	      var x = offsetX/zoomer.offsetWidth*100
	      var y = offsetY/zoomer.offsetHeight*100
	      zoomer.style.backgroundPosition = x + '% ' + y + '%';
	    },
  		 activateThumb(index, thumb) {
	      this.active_thumb = index
	      this.preview_image = thumb
	    },

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
	           	this.preview_image = response.data.data.other_images[0].url
	           }
	           
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
  	}
};
</script>
<style scoped>
/*	.zoom-main-pic img {
    object-fit: contain !important;
	}
	.zoom-thumblist img {
    height: 100px !important;
    width: 100px !important;
    padding: 10px 0;
    outline: none;
	}
.image-magnifier img {
    object-fit: contain !important;
}*/
.zoom-thumblist .owl-carousel.owl-drag .owl-item .active_el {    border: 1px solid #003da6;}
.zoom-thumblist .owl-carousel.owl-drag .owl-item img {    border: 0px;    outline: 0px !important;}
.zoom-thumblist .owl-carousel.owl-drag .owl-item img {    margin: 0px auto;}
.zoom-thumblist .owl-carousel.owl-drag .owl-item{margin: 10px 0px 0px 0px;}
</style>
<style lang="scss">
  figure.zoom {
  & img:hover {
    opacity: 0;
  }
  img {
    transition: opacity .5s;
    display: block;
    width: 100%;
  }
  background-position: 50% 50%;
  position: relative;
  width: 500px;
  overflow: hidden;
  cursor: zoom-in;
}
</style>