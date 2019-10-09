<template>
  <section class="section">
	<div class="main-section">
		<div class="container-fluid">
			<div class="row">
				<div class="col-12 category-listing-sec">
					<ul>
						<li v-for="category in categories" class="">
							<div class="category">
								<img v-if="category.image" :src="category.image">
								<div class="content-sec">
									<h2>{{ category.title | lowercase }}</h2>
								</div>
								<button type="button" @click="fetchproducts(category.title)" class="btn btn-light">VER MAS</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>		
	</div>
	
	<div class="exclusivas-full-image mb-5">
		<div class="container">
				<div class="content-section text-center">
					<h1>CONOCE NUESTRAS MARCAS EXCLUSIVAS </h1>
					<!-- <button type="button"  class="btn btn-outline-secondary">VER LAS MARCAS</button> -->
					<nuxt-link to="/brands" class="btn btn-outline-secondary">VER LAS MARCAS</nuxt-link>
				</div>
		</div>	
	</div>
	
	
		<div class="container header-sec" v-if="products.length > 0" >
		<carousel  :dots="false" 
	            :items="5"
	             :responsive="{1000:{items:5},500:{items:2}}"  >
			<div v-for="(product, index) in products" 
	            :key="index">
	            <div class="slider_img">
					<nuxt-link :to="{ name: 'single_product', params: { id: product.id }}"><img class="img-fluid" :src="product.image" @error="img404(product)"></nuxt-link>
				</div>
				<div class="slider_text">
						<h2 v-if="product.attributes">{{product.attributes.short_description}}</h2>
						<h3 class="mtnrid">{{product.material}}</h3> 
						<p v-if="product.price">${{product.price}}</p>
						<button v-if="product.applications.length > 0" @click="appProduct(product)">
							<i class="fa fa-wrench" aria-hidden="true"></i> APLICACION
						</button>
						<!-- <a :href="'/products/'+product.id+'/show'"><i class="fa fa-search" aria-hidden="true"></i></a>  -->
							<a href="#" v-if="product.attributes"  class="logo_link"><img v-if="product.attributes.brands_info" :src="product.attributes.brands_info.brand_image">
						</a>
				</div>
			</div>

		</carousel> 
	</div>
		<b-modal title="" size="lg" v-model="application_product" @ok="application_product = false" class="product-model">
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

  export default {
    layout: 'frontend',
    data: () => {
      return {
      	errors: [],
      	categories:[],
      	products:[],
    	slide: 0,
    	modelProducts:[],
    	application_product:false,
    	sliding: null,
        filters:{
            department:''
        },
      }
  	},
  	mounted()
  	{
  		this.fetchData();
  	},
    methods:{
    	fetchData(){
	        this.$axios.get('frontend/categories')
	        .then(response => {
	          var _r = response.data.data;
	          this.categories = _r.categories
	          this.products   = _r.products
	        })
	        .catch(e => {
	          this.errors.push(e)
	        })
      	},

      	fetchproducts(title){
	        this.filters.department = title
	        var queryString = Object.keys(this.filters).map(key => 'filter[' +key + ']=' + ((!this.filters[key]) ? '' : this.filters[key])).join('&');
	        this.$router.push({ name: 'product_list',  query: { search: queryString }})
      	},

     	 appProduct(product){
  			this.modelProducts = product.applications
  			this.application_product = true
  		},
		 img404(product) {
			product.image = '/img/image-not-found.jpg'
		},

    }
  };
</script>
<style type="text/css">
	.content-sec h2{
		font-size: 28px;
	}
</style>