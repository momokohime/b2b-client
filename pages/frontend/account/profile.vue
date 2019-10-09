<template>
	<div class="col-lg-9 col-sm-9 col-xs-12 col-md-9 profile_bottom">	
		<div class="profile-sec-new">
			<h4>Perfil</h4>
		</div>				
		<div class="card">
			<div class="card-body">
				<div class="alert alert-danger" role="alert" v-show="error">
		            {{ error }}
		        </div>
		        <div class="alert alert-success" role="alert" v-show="success">
		            {{ success }}
		        </div> 

				<div class="row">
                  

					<div class="col-lg-4 col-sm-4 col-xs-12 col-md-4">
						<div class="profile_left">
							<div class="thumbnail_img_profile">
								<img :src="imageData"  @error="img404()" :alt="loggedInUser.name">
							</div>
						</div>
						<div class="information text-center">
							<label class="custom-file">
								<input type="file" id="file" class="custom-file-input" ref="fileInput" @change="previewImage">
								<span class="custom-file-control"><i class="fa fa-upload" aria-hidden="true"></i>Upload photo</span>
							</label>
						</div>
					</div>
					<div class="col-lg-8 col-sm-8 col-xs-12 col-md-8">
							 <form enctype="multipart/form-data" @submit.prevent="updateProfile"> 
				    	<!--  <b-form @submit.prevent="updateProfile"> -->
				            <b-form-group>
				              <label for="name">Nombre</label>
				              <b-form-input type="text" id="name"  placeholder="Nombre" v-model="profile.name"></b-form-input>
				            </b-form-group>
				            <b-form-group>
				              <label for="email">Correo Electrónico</label>
				              <b-form-input type="email" id="email"  placeholder="Correo Electrónico" :value="loggedInUser.email" disabled ></b-form-input>
				            </b-form-group>
				            <b-form-group>
				              <label for="newPassword">Contraseña</label>
				              <b-form-input id="newPassword" type="password" placeholder="Contraseña" autocomplete="current-password" v-model="profile.password"></b-form-input>
				            </b-form-group>
				             <b-form-group>
				              <label for="newPassword">Confirmar Contraseña</label>
				              <b-form-input id="confirmPassword" type="password" placeholder="Confirmar Contraseña" autocomplete="current-password" v-model="profile.password_confirmation"></b-form-input>
				            </b-form-group>

				            <div slot="footer">
				              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Enviar</b-button>
				               <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reiniciar</b-button>    
				            </div>
				         </form>
				    </div>

				  
				</div>
			</div>
		</div>
	</div>			
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios';

export default {
    layout: 'profile',
    middleware: 'frontend',
    data: () => {
      return {
      	error: null,
      	success: null,
      	information:[],
      	imageData:'',
      	profile:{
      		name:'',
      		relation_id: '',
			password: '',
			password_confirmation: '',
			image:[]
      	}
      }
    },
      computed: {
  	...mapGetters({
	    loggedInUser: 'loggedInUser',

	  }),
	},
    mounted(){
    	 this.profile.name = this.loggedInUser.name
    	 this.imageData = this.loggedInUser.image
    },
    methods: {
      	updateProfile ()
  		{
        	this.error = null
        	this.profile.relation_id = this.loggedInUser.relation_id
	        this.$axios.post('profile_update',this.profile)
	         .then(response => {        
	          this.success = response.data.message
	          this.$auth.$storage.setState('user', response.data.data)
	        })
	      .catch(e => {
	        this.error = e.response.data.message;

	      })
	  },
	   previewImage: function(event) {

        const formData = new FormData()

        formData.append('image', this.$refs.fileInput.files[0])
        formData.append('name', this.profile.name)

        this.$axios.post('profile_update',formData)
         .then(response => {        
          this.success = response.data.message
          this.$auth.$storage.setState('user', response.data.data)
          this.imageData = this.loggedInUser.image
        })
      .catch(e => {
        this.error = e.response.data.message;

      })
    },

     img404() {
		this.loggedInUser.image  = '/img/avatar.png'
	},

   }
};
</script>
<style>
.vertical-tabs {
    width: 250px;
    padding: 0;
}
.tab-content {
    border: 0;
}
.card-body {
    border: 0;
}
	.vertical-tabs ul {
    border-bottom: 0;
    display: block;
    float: left;
    margin-right: 0;
    background: #252525;
    max-height: 700px;
    width: 100%;
    height: 100%;
    padding: 0;
}
.vertical-tabs ul li a {
    border-radius: 0 !important;
    background: #252525;
    color: #ffffff;
    width: 100%;
    text-align: left;
    padding: 0;
    font-weight: 500;
    }
    .vertical-tabs ul li a i {
    padding: 13px 20px !important;
    text-align: center;
    font-size: 21px;
}
.vertical-tabs ul li a.active i{
	background: #003da6 !important;
    padding: 13px 20px !important;
    text-align: center;
    font-size: 21px;
    margin-right: 15px;
}
.vertical-tabs ul li a.active {
    background-color: #ff6900 !important;
    color: #ffffff;
    border: 0;
}
.product-img img {
    width: 60px;
    padding: 15px;
    box-shadow: 0 0px 22px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}
</style>