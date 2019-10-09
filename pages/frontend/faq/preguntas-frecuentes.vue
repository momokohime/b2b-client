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
	<div class="distributor-detail-content faq-sec">
		<div class="container">
			<!-- <span v-html="content"></span> -->
	
		  <div role="tablist" class="faq-outer">

		    <b-card v-for="(faq, index) in faqs" :key="index" no-body class="mb-1">
		      <b-card-header header-tag="header" class="p-1" role="tab">
		        <b-button block href="#" v-b-toggle="'accordion-'+faq.id">{{faq.faq_title}}</b-button>
		        
		      </b-card-header>
		      <b-collapse :id="'accordion-'+faq.id" visible accordion="my-accordion" class="faq-body-outer" role="tabpanel">
		        <b-card-body>
		          <b-card-text v-html="faq.faq_content"></b-card-text>
		        </b-card-body>
		      </b-collapse>
		    </b-card>
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
		title :'',
		banner:'',
		banner_type:'',
		faqs  :[],
		errors:[]
	    }
    },
    mounted(){
      this.fetchFaqPageContent()
      this.fetchFaqs()
      if(process.client){
          this.$scrollTo('#__nuxt', 0, {force: true})
      }
    },
    methods: {
    	fetchFaqPageContent(){
	        this.$axios.get('pages/preguntas-frecuentes')
	        .then(response => {
	        	var _r = response.data.data
	           this.content = _r.body
	           this.title  =  _r.title
	           this.banner = _r.page_banner
	           this.banner_type = _r.banner_type
	        })
	        .catch(e => {
	          this.errors.push(e)
	        })
	 	}, 
	 	fetchFaqs(){
	        this.$axios.get('faqs')
	        .then(response => {
	        	var _r = response.data
	            this.faqs = _r.data
	        })
	        .catch(e => {
	          this.errors.push(e)
	        })
	 	}
    }
	
};
</script>
<style>
.faq-outer .card-header .btn {
    background: #003da6;
    border: 0;
    padding: 10px;
    box-shadow: none;
    margin: 0;
    text-align: left;
}
.faq-outer .card-header {
    background: #003da6 !important;
	border: 0;
	padding: 0px;
	border-radius: 4px;
	margin: 0 !important;
}
.faq-body-outer{
    padding: 0px 20px;
}
.faq-outer .collapse.show {
    border: 1px solid #ccc;
    border-radius: 0px 0px 4px 4px;
    border-top: 0;
}
</style>
