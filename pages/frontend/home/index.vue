<template>
  <section class="section" v-if="!mainsectionloading">

     <div class="animated fadeIn banner-sec banner-top">
	     <div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <div v-for="slide in slider">
      	<b-carousel-slide img-blank v-if="slide.slider_video != ''">
           <h1 v-html="slide.title"></h1>
	        <video class="video-fluid z-depth-1" autoplay loop controls muted>
		      <source :src="slide.slider_video" type="video/mp4" />
		    </video>
	     </b-carousel-slide>
        
        <b-carousel-slide v-else>
        <h1 v-html="slide.title"></h1>
        <img
          slot="img"
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          :src="slide.image"
          alt="image slot"
        >        
      </b-carousel-slide>      
      </div>
    </b-carousel>
   
  </div>
	    <!--  <a href="#" class="req-btn">OBTIN 50% DE DESCUENTO</a> -->
	    	<!-- body Start -->
	<div class="dicount-offer-sec">
		<div class="container">
			<div class="row"> 

				<div class="slide-sec" v-bind:class="[isActive ? '' : 'open']">
					<div class="col-12 col-md-6 parts-offers">
						<img class="img-fluid" :src="banner.image" />
					</div>
					<div class="col-12 col-md-6 parts-offers input-sec">
					 	<h2>{{banner.title}}</h2>
						<p>{{banner.description}}</p> 
						<div class="submit-sec">
							  <a :href="banner.banner_attachment">DESCARGAR</a>
						</div>
						<button class="pop-btn-sec" type="submit"  @click="toggleClass()">{{banner.ver_mas}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	

  </div> 


	<div class="tab-sec">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-lg-12 col-sm-12 col-12">
					<div class="heading-tab-sec tabs">
						<h3>Búsqueda Avanzada</h3>
					</div>
				</div>
				<div class="col-md-12 col-lg-12 col-sm-12 col-12">
					<div class="tabs">
						<form>
					      	<ul>
					      		<li>
								 <div class="form-group">
									 <multiselect
						                v-model="filters.DESDE"
						                :options="autoProducts.data.DESDE"
                            :show-labels="false"
						                placeholder="DESDE">
						              </multiselect>
								 </div>
							  </li>
						     <li>
								 <div class="form-group">
									 <multiselect
						                v-model="filters.HASTA"
						                :options="autoProducts.data.HASTA"
                            :show-labels="false"
						                placeholder="HASTA">
						             </multiselect>
								 </div>
							  </li>
							  <li>
								 <div class="form-group">
									<multiselect
						                v-model="filters.MARCA"
						                :options="autoProducts.data.MARCA"
                            :show-labels="false"
						                placeholder="MARCA" 
						                @select="refreshAutoComplete">
						            </multiselect>
								 </div>
							  </li>
							  <li>
								 <div class="form-group">
									 <multiselect
						                v-model="filters.MODELO"
						                :options="autoProducts.data.MODELO"
                            :show-labels="false"
						                placeholder="MODELO"
						                @select="refreshAutoComplete">
						              </multiselect>
								 </div>
							  </li>
							  <li>
								 <div class="form-group">
									<multiselect
						                v-model="filters.MOTOR"
						                :options="autoProducts.data.MOTOR"
                            :show-labels="false"
						                placeholder="MOTOR"
						                @select="refreshAutoComplete">
						             </multiselect>
								 </div>
							  </li>
							  
							   <li>
								 <div class="form-group">
								    <div class="search-btn"><a @click="fetchproducts()" class="btn-primary w-100" style="cursor: pointer;"><i class="fa fa-search" aria-hidden="true"></i>BUSCAR</a></div>
								 </div>
							   </li>
							</ul>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="product-sec" id="prod-sectionz">
		<div class="container-fluid" >
		
		 	<div class="row product-divider" >
				<!-- <div v-for="bannersData of banners" :class="'col-md-' + bannersData.md  + ' col-lg-' + bannersData.lg  +  ' col-sm-' +bannersData.sm +  ' col-' +bannersData.xs"> -->
        <div v-for="bannersData of banners" :class="'col-md-' + bannersData.md +' col-sm-' +bannersData.sm +  ' col-' +bannersData.xs">
	        		<div class="hover-img">
						<img class="img-fluid" :src="bannersData.image">
						<div id="prod-sec-buttons">
							<p>{{bannersData.title}}</p>
							<!-- <a :href="bannersData.redirect_to" id="comprar">COMPRAR</a> -->
							<a :href="bannersData.comprar" id="ver_mas">COMPRAR</a>
							<span>{{bannersData.description}}</span>
						</div>
					</div>
				</div>
			</div> 		
		</div>
	</div>

	<div class="container header-sec" id="featuredSlider" v-if="products.length > 0" >
		<div id="featuredSliderHeading">PRODUCTOS DESTACADOS</div>
		<carousel :dots="false"
	            :items="5"
	             :responsive="{1000:{items:5},768:{items:2},360:{items:1},320:{items:1}}"  >
			<div v-for="(product, index) in products" 
	            :key="index">
	            <div class="slider_img">
					<nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><img class="img-fluid" :src="product.image" @error="img404(product)"></nuxt-link>
					<div v-if="product.is_new" id="sliderBadge">Nuevo</div>
				</div>

				<div class="slider_text">
						<h2 v-if="product.attributes">{{product.attributes.short_description}}</h2>
						<h3 class="mtnrid">{{product.material}}</h3> 
						<p class="price" :class="{ promotionalprice: product.is_promotional }" v-if="product.price">${{product.price}}</p>
							<button v-if="product.applications.length > 0" @click="appProduct(product)"><i class="fa fa-wrench" aria-hidden="true"></i>APLICACIÓN</button>
							<!-- <nuxt-link :to="'products/'+product.id+'/show'"><i class="fa fa-search" aria-hidden="true"></i> -->
							</nuxt-link> 
							
						 <a href="#" class="logo_link" v-if="product.attributes"><img v-if="product.attributes.brands_info" :src="product.attributes.brands_info.brand_image"></a> 

              </div>

			</div>

		</carousel> 
	</div>

	<div class="catalogos-section">
	    <div class="container">
		   <div class="row">
		      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
			  <div class="catalogs-image">
				<h2>CATÁLOGOS</h2>
				<h3>CATÁLOGOS</h3>
        <nuxt-link to="/catalogos">VER TODOS</nuxt-link>
				<img src="~/assets/frontend/images/catalogos-inner.png">
			  </div>
			  </div>
			  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 text-center">
			  <div class="catalogs_text">
			  <div class="row">
			  <h2>Regístrate a nuestro newsletter</h2>
			  <p>Entérate antes que nadie de las promociones, descuentos y las mas relevantes noticias</p>
			  </div>
			  	<div class="row">
        		<div class="search">
			<input type="email" class="form-control input-sm" v-model="newsletterForm.email" placeholder="Tu dirección de correo..." />
			 <b-button @click="subscribe" type="submit" class="btn btn-primary btn-sm" :disabled="newsletterForm.busy">REGÍSTRAME</b-button>
       <span style="color: red;" v-show="n_error">{{ n_error }}</span>
			</div>
				</div>
			  
			  </div>
		   </div>
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

  export default {
    layout: 'frontend',
    data: () => {
      return {
        mainsectionloading: true,
        n_error: false,
        newsletterForm: {
          email: '',
          busy: false
        },
      	slide: 0,
        sliding: null,
      	home:[],
      	banner:[],
      	application_product:false,
        application_search:'',
		    modelProducts:[],
      	errors: [],
      	banners:[],
      	slider:[],
      	products:[],
      	slide: 0,
      	sliding: null,
      
      	filters:{
          DESDE:'',
          HASTA:'',
          MARCA:'',
          MODELO:'',
          MOTOR:'',
        },
        brands:[],
        isActive: true

      }
  	},
    computed: {
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
      }
    },
  	async asyncData({ $axios }) {
	    
	    const autoProducts = await $axios.$get('autocomplete/products')
	    return { autoProducts }
  	},
  	mounted()
  	{
  		this.fetchHomeData()
  		this.singleBanner()
  	},
    created () {
      this.$nextTick(function () {
         this.mainsectionloading = false
     })
   },
    methods:{
      async subscribe() {
        var vm  = this
        vm.n_error = false
        vm.newsletterForm.busy = true
        await this.$axios.post('subscribe', this.newsletterForm).then(function(response){
          alert(response.data.message)
          vm.newsletterForm.busy = false
        }).catch(function(e){
          vm.n_error = e.response.data.message
          vm.newsletterForm.busy = false
        })
      },
    	toggleClass: function(event){
	       if(this.isActive){
	         this.isActive = false;
	       }else{
	         this.isActive = true;
	       }
       },
       img404(product) {
			product.image = '/img/image-not-found.jpg'
		},

    	appProduct(product){
  			this.modelProducts = product.applications
  			this.application_product = true
  		},

    	fetchproducts(){
   			var queryString = Object.keys(this.filters).map(key => 'filter[' +key + ']=' + ((!this.filters[key]) ? '' : this.filters[key])).join('&');
   			this.$router.push({ name: 'product_list',  query: { search: queryString }})
   		},

    	fetchHomeData(ctx, callback){
    		
        this.$axios.get(`home`, this.data)
        .then(response => {
          this.home = response.data.data
          this.slider = this.home.slider
          this.banners = this.home.banner
          this.products =this.home.products
          //console.log(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
      },

      singleBanner(){
    		
        this.$axios.get(`banners/home-slider-banner`)
        .then(response => {
          this.banner = response.data.data
          //console.log(response.data.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
      },

       onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
      async refreshAutoComplete() {
			this.loading = true
			const { data } = await this.$axios.$get('autocomplete/products', {
				params: this.filters
			})
			this.loading = false
			this.autoProducts.data = data
		},

    // filterdApplications() {
    //   // var keyword = this.application_search
    //   // keyword = keyword.trim()
    //   // if(keyword == '') {
    //   //   return 
    //   // }
    //   // //modelProducts
    //   // this.modelProducts.forEach
    //   // console.log(keyword);
    // }


	}

  };

</script>
<style type="text/css">
.banner-sec.banner-top .carousel-caption {
    position: initial;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding-top: 0;
    padding-bottom: 0;
    color: #fff;
    text-align: center;
}

.carousel-item video {
    width: 100%;
    height: auto;
    left: 0;
    top: -60px;
    position: absolute;
    z-index: -1;
}

#prod-sec-buttons p {
    font-size: 24px;
    color: #fff;
}

#prod-sec-buttons span {
    display: block;
    margin: 20px 0;
    color: #fff;
    font-size: 12px;
    padding: 0 0px;
}

div#prod-sectionz div#prod-sec-buttons a {
  padding: 5px 20px 7px;
  vertical-align: middle;
}

.banner-top h1 {
    font-family: Montserrat;
    font-size: 60px;
    font-weight: bold;
    letter-spacing: 2.31px;
    line-height: 72px;
    text-align: center;
    text-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
}
</style>