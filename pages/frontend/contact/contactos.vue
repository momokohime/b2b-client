<template>
	<section>
	<div class="dis-detail-sec" id="mapsec">
		<iframe
		  width="100%"
		  height="450"
		  frameborder="0" style="border:0"
		  :src="'https://www.google.com/maps/embed/v1/place?key=AIzaSyDprrWb0p8bKjklgdi9zll8qPLEqvkiQ64&q='+ this.YOUR_LAT + ',' + this.YOUR_LON" allowfullscreen>
		</iframe>
	</div>
	<div class="distributor-detail-content">
		<div class="container">
			<div class="row">
				
				<div class="col-md-12 col-lg-12 col-12 col-sm-12" v-for="(ced,index) in cedis">
					<div class="address-section contact-sec">
						<h2>{{ ced.cedis_name}}</h2>
						<ul>     
							<li><span> <img src="~/assets/frontend/images/address.png" @click="viewMap(ced.cedis_lat,ced.cedis_long)"></span>
								<span class="content-address">
									<span v-for="(address,i) in ced.cedis_address_lines">
									  {{address.address}}</br>
									</span>
								</span>
							</li>                            
							<li><span><img src="~/assets/frontend/images/call.png"></span> 
								<span class="content-address">
									Tel:</br>
									<span v-for="(tel,i) in ced.cedis_telephones">
									  {{tel.telephone}}</br>
									</span>
								</span>
							</li>
						</ul>
					</div>
				</div>		
			</div>
			<div class="row contactrow">
				<div class="col-md-12 col-lg-12 col-12 col-sm-12">
					<div class="con-main-headind">
					<h2 v-html="title"></h2>
					</div>
					<span v-html="content"></span>
					
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
     	    error:null,
     	    cedis: [],
	    	YOUR_LAT:20.082172,
	    	YOUR_LON:-98.710849
	    }
    },
    async asyncData({ $axios }) {
      	const data = await $axios.$get('pages/contactos')
      	return { content: data.data.body, title : data.data.title}
	},
    mounted(){   
      this.fetchCedis()
      if(process.client){
          this.$scrollTo('#__nuxt', 0, {force: true})
      }
  },
  methods:{
  	viewMap(lat, long){
  		this.YOUR_LAT = lat
  		this.YOUR_LON = long
        this.$scrollTo('#__nuxt', 0, {force: true})
  	},
  	 fetchCedis(){
      this.$axios.get(`cedis`)
      .then(response => {
        // JSON responses are automatically parsed.
        var _r = response.data.data
        this.cedis = _r
        
        if(_r[0])
        {
        	this.YOUR_LAT = _r[0].cedis_lat
        	this.YOUR_LON = _r[0].cedis_long
        }  
        
      })
      .catch(e => {
         this.error =  e.response.data.message
      })
    }
  }

};
</script>