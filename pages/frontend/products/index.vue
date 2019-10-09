<template>
	<section>	
	<!-- body Start -->
  <v-tour name="productPageTour" :steps="steps" :options="myOptions" :callbacks="myCallbacks"></v-tour>
	<div class="loading" v-if="loading">Loading</div>
		<div class="inner-body-content">
			<div class="rind-the-right-section">
				<div class="container header-sec">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-3">
						    <div class="form-search-filter">
							   <h4 class="text-center mb-2">BÚSQUEDA AVANZADA</h4>
							   <form>
							      <div class="row">
							      	<div class="col-12 col-sm-12 col-md-6 col-lg-6">
										 <div class="form-group">
											 <multiselect
								                v-model="filters.DESDE"
								                :options="autoProducts.data.DESDE"
                                :show-labels="false"
								                placeholder="DESDE">
								              </multiselect>
										 </div>
									  </div>
								     <div class="col-12 col-sm-12 col-md-6 col-lg-6">
										 <div class="form-group">
											 <multiselect
								                v-model="filters.HASTA"
								                :options="autoProducts.data.HASTA"
                                :show-labels="false"
								                placeholder="HASTA">
								             </multiselect>
										 </div>
									  </div>
									  <div class="col-12 col-sm-12 col-md-6 col-lg-6">
										 <div class="form-group">
											<multiselect
								                v-model="filters.MARCA"
								                :options="autoProducts.data.MARCA"
                                :show-labels="false"
								                placeholder="MARCA"
								                @select="refreshAutoComplete">
								            </multiselect>
										 </div>
									  </div>
									  <div class="col-12 col-sm-12 col-md-6 col-lg-6">
										 <div class="form-group">
											 <multiselect
								                v-model="filters.MODELO"
								                :options="autoProducts.data.MODELO"
                                :show-labels="false"
								                placeholder="MODELO"
								                @select="refreshAutoComplete">
								              </multiselect>
										 </div>
									  </div>
									  <div class="col-12 col-sm-12 col-md-6 col-lg-6">
										 <div class="form-group">
											<multiselect
								                v-model="filters.MOTOR"
								                :options="autoProducts.data.MOTOR"
                                :show-labels="false"
								                placeholder="MOTOR"
								                @select="refreshAutoComplete">
								             </multiselect>
										 </div>
									  </div>
									  
									   <div class="col-12 col-sm-12 col-md-6 col-lg-6">
										 <div class="form-group">
										    <div class="search-btn"><a @click="fetchproducts()" class="btn-primary w-100"><i class="fa fa-search" aria-hidden="true"></i>BUSCAR</a></div>
										 </div>
									   </div>
								   </div>
							   </form>
							  
							</div>
							<div class="sidebar-listing">
								<div class="specialities-checkbox">
									<div class="card-header-sec"><h4>FILTROS</h4></div>
										<div role="tablist">
											<form>
										   <!--  <b-card no-body class="mb-1">
										      <b-card-header header-tag="header" class="p-1" role="tab">
										        <b-button block href="#" v-b-toggle.accordion-1 variant="info"><h4>CATEGORÍAS</h4></b-button>
										      </b-card-header>
										      <b-collapse id="accordion-1" class="sidebar-body" visible accordion="my-accordion" role="tabpanel">
										        <b-card-body>
												 <div class="custom-control custom-checkbox" v-for="category in categories">
   													  <input type="checkbox" class="custom-control-input" v-model="filters.category_1" :id="'category_' + category.id" :value="category.title"  />
   													  <label class="custom-control-label" :for="'category_' + category.id">{{ category.title }}</label>
												 </div>
													
										        </b-card-body>
										      </b-collapse>
										    </b-card> -->


										    <b-card no-body class="mb-1">
										      <b-card-header header-tag="header" class="p-1" role="tab">
										        <b-button block href="#" v-b-toggle.accordion-1 variant="info"><h4>DEPARTAMENTOS</h4></b-button>
										      </b-card-header>
										      <b-collapse id="accordion-1" class="sidebar-body" role="tabpanel">
									        	 <ul class="product-nav product-nav-sidebar">
										             <li v-for="(department, index) in treeData">
										              <nuxt-link :to="{ path: 'products', query: { search: 'filter[department]='+department.department }}">{{department.department}}
										              </nuxt-link>
										                  <span v-b-toggle="'accordion_'+department.department" class="nav-arrow">{{department.total_category}} <i class="fa fa-chevron-left" aria-hidden="true"></i></span>
										                  <b-collapse :id="'accordion_'+department.department" class="mt-2 sub-menu">
										                  <ul>
										                      <li
										                      v-for="(category, ii) in department.categories">
										                      <nuxt-link :to="{ path: 'products', query: { search: 'filter[category_1]='+category.category }}">{{category.category}}
										                      </nuxt-link>
										                          <span v-b-toggle="'accordion_'+category.category" class="nav-arrow"> {{category.total_subcategory}} <i class="fa fa-chevron-left" aria-hidden="true"></i></span>
										                          <b-collapse :id="'accordion_'+category.category" class="mt-2 sub-menu-last">
										                            <ul>
										                              <li
										                              v-for="(subcategory, jj) in category.sub_categories">		   <nuxt-link :to="{ path: 'products', query: { search: 'filter[subcategory]='+subcategory.subcategory }}">{{subcategory.subcategory}}</nuxt-link>
										                              </li>
										                           </ul> 
										                         </b-collapse>

										                      </li>
										                  </ul>
										                </b-collapse>
										              </li>
										            </ul>
										      </b-collapse>
										    </b-card>

										    <b-card no-body class="mb-1">
										      <b-card-header header-tag="header" class="p-1" role="tab">
										        <b-button block href="#" v-b-toggle.accordion-2 variant="info"><h4>MARCAS</h4></b-button>
										      </b-card-header>
										      <b-collapse id="accordion-2" class="sidebar-body" role="tabpanel">
										        <b-card-body>
												 <div class="custom-control custom-checkbox" v-for="brand in brands">
   													 <input type="checkbox" class="custom-control-input" v-model="filters.brand" :id="'brand_' + brand.product_brand" :value="brand.product_brand"  />
   													 <label class="custom-control-label" :for="'brand_' + brand.product_brand">{{ brand.product_brand }}</label>
												 </div>
													
										        </b-card-body>
										      </b-collapse>
										    </b-card>

										    <b-card no-body class="mb-1">

                                            <!--  <input @input="slider" v-model.number="filters.price_range.from" min="0" max="5000" step="500" type="range" />
											    <input v-on:input="slider" v-model.number="filters.price_range.to" min="0" max="5000" step="500" type="range" />
											    <span @input="slider">

											    Precio {{filters.price_range.from | price_raw }} - {{filters.price_range.to | price_raw}}
											    </span> -->

										        <b-card-header header-tag="header" class="p-1" role="tab">
										           <b-button block href="#" v-b-toggle.accordion-3 variant="info"><h4>PRECIO</h4></b-button>
										        </b-card-header>
										        <b-collapse id="accordion-3" class="sidebar-body" role="tabpanel">
										            <b-card-body>
													<div class="range-sec">
                                                          
														<!-- <input
														    type="range"
														    min="0"
														    
														    v-bind:max="max"
														    :value="filters.price"
														    v-on:input="onChg($event)">
														  {{ filters.price }} -->

											    <input @input="slider" v-model.number="filters.price_range.from" min="0" max="5000" step="500" type="range" />
											    <input v-on:input="slider" v-model.number="filters.price_range.to" min="0" max="5000" step="500" type="range" />
											   
													</div>
													 <span @input="slider">

											         Precio {{filters.price_range.from | price_raw }} - {{filters.price_range.to | price_raw}}
											        </span>
											        																																																																																																																																																																																																																						
											        </b-card-body>
											    </b-collapse>
											</b-card>
										</form>
	 									 </div>
									</div>
								<div class="button-box">
									<ul>
										<li><a @click="fetchproducts()" style="cursor: pointer;">FILTRAR</a></li>
										<li><a href="#" style="cursor: pointer;">BORRAR</a></li>
									</ul>
								</div>
							</div>
						</div>
						 <div class="col-xs-12 col-sm-12 col-md-12 col-lg-9">
							<div class="white-box-area">
								<div class="row-blocks listing">
									<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
											<ul class="table-listing row">
												<div class="col-md-4 col-lg-4 col-12">
													<li><a :class="{ active : active_el == 'grid' }" @click="productLayout('grid')"><i class="fa fa-th-large" aria-hidden="true"></i></a></li>
													<li><a :class="{ active : active_el == 'listing' }" @click="productLayout('listing')"><i class="fa fa-bars" aria-hidden="true"></i></a></li>
												</div>
												<!-- <div class="col-md-4 col-lg-4">
													 <li class="menu-item">Mostrando {{Productlists.length}} de {{totalRows}} productos</li> 
												</div> -->
												<div class="col-md-4 col-lg-4 menu-item">
													<li>Ordenar Por
														<div class="form-group">
															<select class="form-control" v-model="orderby" @change="fetchproducts()">
															   <option value="" selected="selected">Defecto</option  >	 
															   <option value="a_z">A-Z</option>
															   <option value="price_asc">Precio más bajo</option>
															   <option  value="price_desc">Precio más alto</option>
															</select>
														 </div>
													</li>
												</div>
												<div class="col-md-4 col-lg-4 menu-item">
													<li>Mostrar
														<div class="form-group">
															<select class="form-control" v-model="perPage" @change="fetchproducts()">
															   <option selected="selected" value="12">All</option  >
															   <option>10</option>
															   <option>20</option>
															   <option>30</option>
															</select>
														 </div>
													</li>
												</div>
											</ul>
											
										</div>
									</div>
								</div>

								<div class="row-blocks" v-if="active_el == 'grid'">
									<div class="row">
										<div class="col-xs-12 col-sm-3 col-md-3"  v-if="Productlists.length > 0"  v-for="(product, index) in Productlists">
											<div class="new-profile-pic new-format">
												<!-- <a :href="'/products/'+product.id+'/show'"><img class="img-fluid" :src="product.image" @error="img404(product)"></a> -->
                        <nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><img class="img-fluid" :src="product.image" @error="img404(product)"></nuxt-link>

												<div class="new-up-btn" v-if="product.is_new">
													<a class="btn" href="">Nuevo</a>
												</div>

											</div>
											<div class="new-grid-sec-content">
													<!-- <a v-if="product.attributes" :href="'/products/'+product.id+'/show'"><h3>{{product.attributes.short_description}}</h3></a> -->
                          <nuxt-link :to="{ name: 'single_product', params: { id: product.id }}" v-if="product.attributes"><h3>{{product.attributes.short_description}}</h3></nuxt-link>

													<div class="clinicaltype">CÓDIGO: {{ product.MATNR }}</div>
												<div class="content" v-if="loggedInUser">
													<div v-if="loggedInUser.is.BU">
														<span v-if="product.price" :class="{ promotionalprice: product.is_promotional }">$ {{ product.price }}</span>
														<ul :data-v-step="(index == 0) ? 'product-qtycounter' : ''">
																<li class="paginationss" >
																<b-button type="button" class="button hollow circle"  @click="decQty(product)" :disabled="product.disable_add_to_cart"><i class="fa fa-minus" aria-hidden="true"></i></b-button>

																<input type="number" class="form-control"  @input="updateQty(product)" v-model="product.qty" :readonly="product.disable_add_to_cart">

																<b-button type="button"class="button hollow circle" @click="incQty(product)" :disabled="product.disable_add_to_cart"><i class="fa fa-plus" aria-hidden="true"></i></b-button>
															</li>
														</ul>
													</div>
												</div>
												<div class="new-grid-sec-buttons">
													<div v-if="product.applications.length >0">
														<button @click="appProduct(product)"><i aria-hidden="true" class="fa fa-wrench"></i>APLICACIÓN</button>
													</div>
													<div v-if="product.attributes">
													 	<img v-if="product.attributes.brands_info" :src="product.attributes.brands_info.brand_image">
													 </div> 
												</div>
											</div>
										</div>
									</div>
								</div>
								<div v-if="active_el == 'listing'">
								<div class="row-blocks" v-if="Productlists.length > 0"  v-for="(product, index) in Productlists">

									<div class="row">
										<div class="col-xs-12 col-sm-3 col-md-4">
										<div class="new-profile-pic">
										<!-- <router-link :to="{ name: 'single_product', params: { id: product.id }}"><img class="img-fluid" :src="product.image" @error="img404(product)"></router-link> -->
										<!-- <a :href="'/products/'+product.id+'/show'"><img class="img-fluid" :src="product.image" @error="img404(product)"></a> -->
										<nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><img class="img-fluid" :src="product.image" @error="img404(product)"></nuxt-link>
										<div class="new-up-btn" v-if="product.is_new">
												<a class="btn" href="">Nuevo</a>
											</div>
												</div>
										</div>
										<div class="col-xs-12 col-sm-9 col-md-8">
											<div class="row">
												<div class="col-xs-12 col-sm-7 col-md-12 col-lg-7 last-side">
													<div class="profile-details">
														<!-- <h4>{{product.MATNR}}</h4> -->
														<!-- <nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><h4>{{product.TEXT1}}</h4></nuxt-link> -->
														<!-- <a :href="'/products/'+product.id+'/show'"><h4>{{product.TEXT1}}</h4></a> -->
                            <nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><h4>{{product.TEXT1}}</h4></nuxt-link>

													</div>
													<div class="clinicaltype">
													CÓDIGO: {{ product.MATNR }}

													<!-- <ul v-if="product.avg_rating > 0">
														<li v-for="rate in product.avg_rating"><i class="fa fa-star" aria-hidden="true"></i></li>
														<li ><span>{{product.avg_rating}} de 5 </span></li>
													</ul> -->
													<!-- <ul v-else>
														<li><span>Todavía no calificado </span></li>
													</ul> -->
													</div>
														<div class="archive-bio clinicaltype">
												<ul v-if="product.attributes">
													 <li>{{product.attributes.short_description}} </li> 
												</ul>
												</div>

													<div class="app-btn" v-if="product.applications.length >0">
													<button @click="appProduct(product)">APLICACION</button>

													</div>
												</div>
												<div class="col-xs-12 col-sm-5 col-md-12 col-lg-5" v-if="loggedInUser">
													<div class="block-sidebar" v-if="loggedInUser.is.BU">

														<div class="city-details">
														Existencia:<span class="archive-city"> {{ product.stock }}</span>
														</div>
														
														<span class="verified-seal" v-if="product.price" :class="{ promotionalprice: product.is_promotional }">$ {{ product.price }}</span>
														
														<div class="email-btns">
															<ul>
																<li class="paginationss" >
																<b-button type="button" class="button hollow circle"  @click="decQty(product)" :disabled="product.disable_add_to_cart"><i class="fa fa-minus" aria-hidden="true"></i></b-button>

																<input type="number" class="form-control"  @input="updateQty(product)" v-model="product.qty" :readonly="product.disable_add_to_cart">

																<b-button type="button"class="button hollow circle" @click="incQty(product)" :disabled="product.disable_add_to_cart"><i class="fa fa-plus" aria-hidden="true"></i></b-button>
															</li>
															<li class="paginationss lower" v-if="loggedInUser.is.BU">
	
																	<button type="button"v-bind:class="[product.is_favorite ? 'is_favorite_css_class' : '']" @click="addToFav(product.id,index)"><i class="fa fa-heart" aria-hidden="true"></i></button>
																
																	<button type="button" @click="addToWishlist(product.id,index)" v-bind:class="[product.in_whishlist ? 'custom-phone heart' : '']"><i class="fa fa-star" aria-hidden="true"></i></button>
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
								<div class="row-blocks" v-if="!loading && Productlists.length == 0"><h4>No se encontraron productos</h4>
								</div>

							</div>
						</div> 
					</div>
				</div>
			</div>
			<div class="pagination-nav">
			   <div class="container">
			   	<b-pagination
			   	  v-if="totalPages"
	              :total-rows="totalRows"
	               v-model="currentPage"
	              :simple="false"
	              :per-page="per_page"
	              order="is-right"
	              @change="fetchproducts">
               </b-pagination>
			   	
			   </div>
			</div>	
  		</div>  
  		<b-modal title="" size="lg" v-model="application_product" @ok="application_product = false" class="product-model">
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
import Cookies from 'js-cookie';
import axios from 'axios';

export default {
    layout: 'frontend',
     data () {
    return {
      tour_check: false,
	  products:[],
	  errors:[],
	  application_product:false,
      application_search:'',
      //vuexStateApplied: false,
	  treeData:[],
	  loading: false,
	  active_el:'grid',
	  modelProducts:[],
	  totalRows:0,
	  activeClass:0,
      filters:{
          DESDE:'',
          HASTA:'',
          MARCA:'',
          MODELO:'',
          MOTOR:'',
          category_1:[],
          brand:[],
          price:0,
          sorting:0,
          price_range:{
             from: 50,
             to: 4500
          },
        },
        perPage:12,
        totalPages :0,
        categories:[],
        brands:[],
        queryString:'',
    	per_page: 0,
      	max:5000,
      	currentPage: 0,
      	orderby: '',
        steps: [
          {
            target: '[data-v-step="codigo-description"]',  // We're using document.querySelector() under the hood
            content: `Busca productos por código, nombre, marca, código de referencia o atributos.`,
            params: {
              enableScrolling: false
            }
          },
          {
            target: '[data-v-step="product-qtycounter"]',
            content: 'Indica el número de artículos por producto.',
            params: {
              enableScrolling: false
            }
          },
          {
            target: '[data-v-step="cart-icon"]',
            content: 'Ve al ícono del carrito.',
            params: {
              enableScrolling: false
            }
          }
        ],
        myOptions: {
          useKeyboardNavigation: false,
          labels: {
            buttonSkip: 'No volver a mostrar',
            buttonPrevious: 'Anterior',
            buttonNext: 'Próxima',
            buttonStop: 'Terminar'
          }
        },
        myCallbacks: {          
          onStop: function(){ 
            Cookies.set('products_tour_done1', 'y')
          }
        }
   	 	 };
  	},
  	watch:{
	    $route (to, from){
	        this.queryString = this.$route.query.search
	        this.brandsFiltering()
	        this.fetchBrands()
  		    this.fetchproducts(1)
  		    this.fetchCategory()
	    },
      Productlists() {
        if(this.tour_check == true) {
          return;
        }
        this.tour_check = true
        const beginTour = Cookies.get('products_tour_done1')
        if(beginTour != 'y' && this.Productlists.length > 0 && this.isAuthenticated) {
            if(this.loggedInUser.is.BU) {
              this.$tours['productPageTour'].start()
            }
        }
      }
    }, 
  	mounted()
  	{
  		this.queryString = this.$route.query.search
  		this.brandsFiltering()
  		this.fetchBrands()
  		this.fetchproducts(1)
  		this.fetchCategory()
  	},
  	async asyncData({ $axios }) {
	    
	    const autoProducts = await $axios.$get('autocomplete/products')
	    return { autoProducts }
  	},
  	 computed: {
	    Productlists () {
	      const items = this.products
	      return items;
	      // Return just page of items needed
	       return items.slice(
	        (this.currentPage - 1) * this.per_page,
	        this.currentPage * this.per_page
	      )
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
	    ...mapGetters({
		    isAuthenticated: 'isAuthenticated',
		    loggedInUser: 'loggedInUser',
		}),
	},
	beforeRouteLeave(to, from, next) {
	    this.$store.commit('cart/setCurrentPage', this.currentPage)
	    Cookies.set('last_p_page', from.fullPath)
	    next()
	},
   	methods: {
   		slider: function() {
	      if (this.minPrice > this.maxPrice) {
	        var tmp = this.maxPrice;
	        this.maxPrice = this.minPrice;
	        this.minPrice = tmp;
	      }
	    },
        activate(el){
            this.activeClass = el
        },
   		img404(product) {
			product.image = '/img/image-not-found.jpg'
		},

   		appProduct(product){
  			this.modelProducts = product.applications
  			this.application_product = true
  		},

  		productLayout(layout){
  			this.active_el = layout;
  		},

	    onChg (e) {
	      this.filters.price = e.target.value;
	    },

	    fetchCategory(){
	        this.$axios.get('frontend/categories')
	        .then(response => {
	          var _r = response.data.data;
	          this.categories = _r.categories
	        })
	        .catch(e => {
	          this.errors.push(e)
	        })

	        this.$axios.get('dept_category?'+this.queryString)
		      .then(response => {
		        this.treeData = response.data
		      })
		      .catch(e => {
		        this.errors.push(e)
		      })

	    },
	    fetchBrands(){
	        this.$axios.get('filter_brands?'+this.queryString)
	        .then(response => {
	          var _r = response.data;
	         this.brands = _r
	        // this.brands = this.brands.concat(_r.other_brands)
	   	    })
	        .catch(e => {
	          this.errors.push(e)
	        })
	    },
	    brandsFiltering(){
           if(this.$route.query.search && this.$route.query.search.includes("brand"))
	        {
	            var brandSearch =  this.$route.query.search.split('=').pop()
	            this.filters.brand.includes(brandSearch) ? '' : this.filters.brand.push(brandSearch)
	        }
	        else if(this.$route.query.search && !this.$route.query.search.includes("brand"))
	        {
	           this.filters.brand = []  
	        }
	    },
   		fetchproducts(page){

   			this.loading = true
			if(page == undefined || this.queryString == undefined){
			
			     if(this.$route.query.search && this.$route.query.search.includes("search"))
	             {
				   // this.$router.replace('/products')
	             }

				var price_range = this.filters.price_range

				this.queryString = Object.keys(this.filters).map(key => 'filter[' +key + ']=' + ((!this.filters[key]) ? '' : this.filters[key])).join('&');

                this.queryString += '&filter[price_range][from]='+price_range.from+'&filter[price_range][to]='+price_range.to

                if(this.$route.query.search && !this.$route.query.search.includes("brand"))
                {
                   this.queryString += '&'+this.$route.query.search	
                }
			}

   	         if (!this.vuexStateApplied && this.$store.state.cart.currentPage != '') {
			        page = this.$store.state.cart.currentPage
			       this.vuexStateApplied = true
			 }
             
	        this.$axios.get('frontend/products?'+this.queryString+'&per_page='+this.perPage+'&order_by='+this.orderby,{
	          params: {
	            page: page,
	          }
            })
	        .then(response => {
	        	this.loading = false
	           this.products = response.data.data;
	           // this.long_description=this.product.attributes.long_description_excerpt
               this.per_page = response.data.meta.per_page
               this.totalPages = response.data.meta.last_page
               this.currentPage = response.data.meta.current_page
		       this.totalRows = response.data.meta.total    
	        })
	        .catch(e => {
	        	this.loading = false
	          this.errors.push(e)
	        })
 	 	},

 	 	async refreshAutoComplete() {
			this.loading = true
			const { data } = await this.$axios.$get('autocomplete/products', {
				params: this.filters
			})
			this.loading = false
			this.autoProducts.data = data
		},

 	 	async addToFav(product_id,index){
		  const  favorite  = await this.$axios.post('/frontend/products/toggle_fav/'+product_id);
		    this.products[index].is_favorite = !this.products[index].is_favorite
		},

		async addToWishlist(product_id,index){
		  const  wishlist  = await this.$axios.post('/frontend/products/toggle_whishlist/'+product_id);
		  this.products[index].in_whishlist = !this.products[index].in_whishlist
		},

		...mapMutations({
	    incQty: 'cart/incQty',
	    decQty: 'cart/decQty',
	    updateQty: 'cart/updateQty',
		}),

 	}
};
</script>
<style>
	.multiselect__placeholder {
    font-size: 13px;
}
button.is_favorite_css_class i {
    color: red;
}
button.custom-phone.heart i {
    color: red;
}
.email-btns ul li {
    display: flex;
    width: 70%;
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
}
.paginationss button {
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
.paginationss.lower {
    border: 0;
    width: 50%;
}
.range-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sidebar-listing .range-sec input {
    width: 85%;
    margin: 0px 0px;
    position: absolute;
      -webkit-appearance: none;
}

.new-profile-pic
{
	width: 200px;
	height: 200px;
}
.sidebar-body {
    max-height: 150px;
    overflow: auto;
}
.product-nav-sidebar {
    width: auto;
    position: relative;
    box-shadow: none;
}
.product-nav-sidebar li {
    text-align: left;
    padding: 5px 0;
}
.product-nav-sidebar li a {
    padding: 0 !important;
}
.product-nav-sidebar span::after {
    display: none;
}
.product-nav-sidebar a::after {
    display: none;
}
.product-nav-sidebar .nav-arrow {
    width: 30px;
}
.specialities-checkbox span {
    margin: 15px 0 0;
    font-size: 12px;
    display: block;
}


input[type=range]:focus::-webkit-slider-runnable-track {
  background: #003DA6;
}
input[type=range]:focus::-moz-range-track{
  background: #003DA6;
}

input[type=range]:focus::-ms-fill-lower {
  background: #003DA6;
}

input[type=range]:focus::-ms-fill-upper {
  background: #003DA6;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #003DA6;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #003DA6;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #003DA6;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

input[type=range]::-moz-range-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #003DA6;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -moz-appearance: none;
  margin-top: -7px;
}
</style>