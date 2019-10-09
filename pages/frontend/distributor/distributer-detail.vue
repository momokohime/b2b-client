<template>
	<section>
			<div class="dis-detail-sec">
		<iframe :src="'https://maps.google.com/maps?q='+distributor.center_lat+','+distributor.center_long+'&hl=es;z=14&amp;output=embed'" width="100%" height="500" frameborder="0" style="border:0" allowfullscreen></iframe>
	</div>
	
	
	<div class="distributor-detail-content">
		<div class="container">
			<div class="row">
				<div class="col-md-12 col-lg-12 col-12 col-sm-12">
					<h3>{{distributor.center_name}}</h3>
					<p>{{distributor.center_description}}</p>
				</div>
			</div>
			 <!-- {{distributor.center_images.length}} -->
			<div class="row gallery" v-if="">
				<div class="col-md-12 col-lg-12 col-12 col-sm-12" v-if="otherimages>0">
					<h5>Imágenes relacionadas</h5>
				</div>
				<div class="col-md-3 col-lg-3 col-12 col-sm-3" v-for="(image, index) in distributor.center_images">
					<img class="img-fluid" :src="image">
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 col-lg-12 col-12 col-sm-12">
					<div class="address-section">
						<ul>     
							<li><span> <img src="~assets/frontend/images/address.png"></span><span class="content-address">{{ distributor.center_address }}<br>{{ distributor.center_city }}<br>{{ distributor.center_state }}, {{ distributor.center_zip }}</span></li>                            
							<li><span><img src="~assets/frontend/images/call.png"></span> <span class="content-address">Lada sin costo: {{ distributor.center_phone}} <br> {{ distributor.center_phone_2 }}
							</span></li>
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
     data(){
    	return {
    		distributorID:null,
    		distributor:[],
    		otherimages:null
    	}
    },
    mounted()
  	{
  		this.distributorID = this.$route.params.id
  		this.fetchdistributor()
  	},
  	methods:{
  		fetchdistributor(){
  			console.log(this.$route.params.id)
	        this.$axios.get('dist_centers/'+this.distributorID)
	        .then(response => {
	        	this.distributor = response.data
	        	this.otherimages = this.distributor.center_images.length
	           
	        })
	        .catch(e => {
	          this.errors.push(e)
	        })
	 	},
  	}
};
</script>