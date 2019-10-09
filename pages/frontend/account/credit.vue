<template>
	<section>			
		<main class="main">
			<div class="profile-sec-new">
					<h4>Crédito</h4>
				</div>
			<div class="row profile_bottom">
				
				<div class="col-lg-6 col-sm-6 col-xs-12 col-md-6">
					<div class="card">
						<div class="card-body">
							<div class="row">
								<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
									<div class="profile-sec-new score">
										<h4>Cliente Detail</h4>
									</div>
									<div class="credit-sec">
										<ul>
											<li><span>Detalles del Cliente :</span> {{loggedInUser.name}}</li>
											<li><span>ID de Cliente :</span> {{loggedInUser.relation_id}}</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-6 col-sm-6 col-xs-12 col-md-6">
					<div class="card">
						<div class="card-body">
							<div class="row">
								<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
									<div class="profile-sec-new score">
										<h4>Puntaje de crédito</h4>
									</div>
									<div class="credit-sec">
										<ul>
											<li><span>Limite de Crédito : {{ credit.LimiteCredito | price_raw }}</span></li>
											<li><span>Crédito Usado : {{ credit.TotalComprom | price_raw }}</span></li>
											<li><span>Crédito Disponible : {{ credit.CreditoExcedido | price_raw }}</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>	
	</section>		
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios';

export default {
    layout: 'profile',
     middleware: 'frontend',
    data: () => {
      return {
      	credit:[],
        errors:[],
        error:null,
      }
    },
    computed: {
	  ...mapGetters({
	    isAuthenticated: 'isAuthenticated',
	    loggedInUser: 'loggedInUser',
	  })
	},
    mounted(){
     this.creditInfo()

  	},
    methods: {
	   	creditInfo(){
	   		var clientID = this.loggedInUser.relation_id
	    	var vm = this;
	     	this.$axios.get('clients/credit/'+clientID)
	     	.then(response => {
	     		this.credit = response.data.data
		       // console.log(response.data.data)       
	      	})
		    .catch(e => {
		          this.errors.push(e)
		    })
	  	},
   }
};
</script>
