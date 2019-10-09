<template>
	<section>
		<div class="distributor-search-sec">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div class="form-inline my-2 my-lg-0">
					  <input class="" type="search" v-model="name" placeholder="Buscar nombre" aria-label="Search">
					  <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="getDistributors()">Buscar</button>
					</div>
				</div>
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
					<div class="search-name">
						<div class="summary-index">
<p><a :class="{ active : active_el == 'A' }"@click="alphabetFilter('A')">A</a></p>
<p><a  :class="{ active : active_el == 'B' }" @click="alphabetFilter('B')">B</a></p>
<p><a  :class="{ active : active_el == 'C' }" @click="alphabetFilter('C')">C</a></p>
<p><a  :class="{ active : active_el == 'D' }" @click="alphabetFilter('D')">D</a></p>
<p><a  :class="{ active : active_el == 'E' }" @click="alphabetFilter('E')">E</a></p>
<p><a  :class="{ active : active_el == 'F' }" @click="alphabetFilter('F')">F</a></p>
<p><a  :class="{ active : active_el == 'G' }" @click="alphabetFilter('G')">G</a></p>
<p><a  :class="{ active : active_el == 'H' }" @click="alphabetFilter('H')">H</a></p>
<p><a  :class="{ active : active_el == 'I' }" @click="alphabetFilter('I')">I</a></p>
<p><a  :class="{ active : active_el == 'J' }" @click="alphabetFilter('J')">J</a></p>
<p><a  :class="{ active : active_el == 'K' }" @click="alphabetFilter('K')">K</a></p>
<p><a  :class="{ active : active_el == 'L' }" @click="alphabetFilter('L')">L</a></p>
<p><a  :class="{ active : active_el == 'M' }" @click="alphabetFilter('M')">M</a></p>
<p><a  :class="{ active : active_el == 'N' }" @click="alphabetFilter('N')">N</a></p>
<p><a  :class="{ active : active_el == 'O' }" @click="alphabetFilter('O')">O</a></p>
<p><a  :class="{ active : active_el == 'P' }" @click="alphabetFilter('P')">P</a></p>
<p><a  :class="{ active : active_el == 'Q' }" @click="alphabetFilter('Q')">Q</a></p>
<p><a  :class="{ active : active_el == 'R' }" @click="alphabetFilter('R')">R</a></p>
<p><a  :class="{ active : active_el == 'S' }" @click="alphabetFilter('S')">S</a></p>
<p><a  :class="{ active : active_el == 'T' }" @click="alphabetFilter('T')">T</a></p>
<p><a  :class="{ active : active_el == 'U' }" @click="alphabetFilter('U')">U</a></p>
<p><a  :class="{ active : active_el == 'V' }" @click="alphabetFilter('V')">V</a></p>
<p><a  :class="{ active : active_el == 'W' }" @click="alphabetFilter('W')">W</a></p>
<p><a  :class="{ active : active_el == 'X' }" @click="alphabetFilter('X')">X</a></p>
<p><a  :class="{ active : active_el == 'Y' }" @click="alphabetFilter('Y')">Y</a></p>
<p><a  :class="{ active : active_el == 'Z' }" @click="alphabetFilter('Z')">Z</a></p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
					<div class="form-inline my-2 my-lg-0">
					  <input class="" type="search" v-model="location" placeholder="Buscar ubicación" aria-label="Search">
					  <button class="btn btn-outline-success my-2 my-sm-0" @click="getDistributors()">Buscar</button>
					</div>
				</div>
				<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
					<div class="form-inline my-2 my-lg-0">
					  <input class="" type="search" v-model="zip" placeholder="Buscar código postal" aria-label="Search">
					  <button class="btn btn-outline-success my-2 my-sm-0" @click="getDistributors()" >Buscar</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="row profile_bottom disti-listing m-b-4">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					<div class="card">
						<div class="card-body">
							<div class="row">
								<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
									<div class="profile-sec-new">
										<h4>Lista de distribuidores</h4>
									</div>
								</div>
								
								<div class="col-lg-3 col-sm-4 col-xs-12 col-md-4" v-for="(distributor, index) in distributors">
									<div class="distributors-cards">
										<div class="distri-profile">
											<img class="img-fluid" :src="distributor.center_banner">
										</div>
										<div class="distri-header">
											<h3>{{distributor.center_name}}</h3>
										</div>
										<div class="distri-more">
											<router-link :to="{ name: 'distributer_detail', params: { id: distributor.id }}">Ver más</router-link>
										</div>
									</div>
								</div>
							</div>
						</div>
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
    data () {
	    return {
	    	distributors:[],
	    	name:'',
	    	location:'',
	    	zip:'',
	    	alphabet:'',
	    	active_el:0
	    }
	},
	mounted()
	{
		this.getDistributors()
    if(process.client){
          this.$scrollTo('#__nuxt', 0, {force: true})
      }
	},
	methods: {
		getDistributors() {
			console.log()
			this.$axios.get('dist_centers?name='+this.name+'&location='+this.location+'&zip='+this.zip+'&alphabet='+this.alphabet+'')
			 .then(response => {
			 	this.distributors = response.data
	          console.log(response.data)
	        })
	        .catch(e => {
	          this.errors.push(e)

	        })
		},
		alphabetFilter(alpha){
			console.log(alpha)
			 this.active_el = alpha;

			this.alphabet = alpha
			this.getDistributors()
		}
	}
};
</script>