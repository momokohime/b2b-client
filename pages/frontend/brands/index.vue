<template>
	<section>
			<!-- body Start -->
	<div class="exclusivas-block">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h1 class="heading-main">Marcas Exclusivas</h1>
				</div>
			</div>
			
			<div class="row">
				<div v-for="(exclusive,index) in exclusive_brands" class="col-12 col-md-4 parts">
					<img :src="exclusive.brand_image" @click="filterProducts(exclusive.brand_identifier)" />
				</div>
				
			</div>
			
		</div>
	</div>
	
	<div class="marcas-block">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<h1 class="heading-main">Todas Ias Marcas</h1>
				</div>
			</div>
			
			<div class="row">
				<div class="col-12">
					<div class="tab-btns">
						<ul>
							<li v-for="(category,index) in brandCategory" v-if="" @click="selected = index" :class="{highlight:selected == index}"><button @click="selectBrand(index)">{{category}}</button></li>

						</ul>
					</div>
				</div>
			</div>
			
			<div class="row">
				<div class="col-12">
					<div class="tab-images">
						<ul>
							<li v-for="brand in brands" ><img :src="brand.brand_image" @click="filterProducts(brand.brand_identifier)"></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</section>
	</template>
<script>

  export default {
    layout: 'frontend',

    data: () => {
      return {
      	 brands:[],
      	 brandCategory:[],
      	 exclusive_brands:[],
      	   filters:[],
        	 selected: 1,
      	}
    },
    mounted()
  	{
  		this.selectBrand('')
  		this.getCategory()
  	},
   methods: {
      selectBrand(category){
        this.$axios.get(`/brands?category=`+category)
        .then(response => {
          this.brands = response.data.other_brands
         this.exclusive_brands = response.data.exclusive_brands
        })
        .catch(e => {
          this.errors.push(e)
        })
      },

      getCategory(ctx, callback){
        this.$axios.get(`brands_categories`)
        .then(response => {
          this.brandCategory = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      },

      filterProducts(id){
      	this.filters.brand = id
        var queryString = Object.keys(this.filters).map(key => 'filter[' +key + ']=' + ((!this.filters[key]) ? '' : this.filters[key])).join('&');
        this.$router.push({ name: 'product_list',  query: { search: queryString }})
      }

    }
  };
  </script>
  <style scoped>
  	.highlight button {
    background: #293da6 !important;
    color: #fff;
	}
  </style>