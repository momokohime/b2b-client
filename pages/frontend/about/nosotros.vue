<template>
	<section>
		<div class="dis-detail-sec who-we video-outer" v-if="banner_type == 'video'">
			<video class="video-fluid z-depth-1" autoplay loop controls muted>
		      <source :src="banner" type="video/mp4" />
		    </video>
		    <h2 v-html="title"></h2>
	    </div>
	    <div class="dis-detail-sec who-we" v-else :style="'background-image: url(' + banner + ')'">
		  <h2 v-html="title"></h2>
	    </div>
	<div class="distributor-detail-content who-we-are">
		<div class="container">
			<span v-html="content"></span>
		</div>
	</div>
	
	</section>

</template>
<script>
	export default {
    layout: 'frontend',
    data: () => {
     return {
	    
	    }
    },
	async asyncData({ $axios }) {
      	const data = await $axios.$get('pages/nosotros')
      	return { content: data.data.body, title : data.data.title, banner : data.data.page_banner, banner_type : data.data.banner_type}
	},
  mounted(){      
      if(process.client){
          this.$scrollTo('#__nuxt', 0, {force: true})
      }
  }

};
</script>