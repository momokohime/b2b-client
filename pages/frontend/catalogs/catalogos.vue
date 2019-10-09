<template>
	<section>

<!-- body Start -->
	<div class="catalog-block">
		<div class="container">
			<div class="row"> 
				<div class="col-12 outer-hdg">
					<h1 v-for="(categoryName, index) in categories" class="heading-tab" :class="{active : category == index}" @click="getCategry(index)" style="cursor: pointer;">{{ categoryName }}</h1>
				</div>
			</div>
			
			<div class="row">
				<div class="col-12">
					<ul class="catalog-list2">
						<li v-for="(catalog, index) in catalogs">
							<a :href="catalog.url_link" target="_blank"><img :src="catalog.banner" /></a>
						</li>	
						<div class="clear"></div>
					</ul>
				</div>
			</div>
			
		</div>
	</div>

   </section>
</template>
<script>
	export default {
    layout: 'frontend',
    // async asyncData({ $axios }) {
    // 	const { data } = await $axios.get('/catalogs?category=electrico' );
    // 	return { categories: data.categories, catalogs: data.catalogs }
    // },
    data: () => {
      return {       
  	   errors: [],
  	   categories: [],
  	   catalogs: [],
  	   category: 'electrico'   
  	  }
    },
    mounted() {
        this.fetchCatalogs()
        if(process.client){
            this.$scrollTo('#__nuxt', 0, {force: true})
        }
    },
    methods: {
      getCategry(category)
      {
         this.category = category
         this.fetchCatalogs()
      },
      fetchCatalogs(ctx, callback){
       this.$axios.get(`/catalogs?category=`+this.category)
       .then(response => {
          // JSON responses are automatically parsed.
          var _r = response.data
          this.categories = _r.categories;
          this.catalogs = _r.catalogs;

        })
        .catch(e => {
          this.errors.push(e)
        })
      }
   }																																						
};
</script>