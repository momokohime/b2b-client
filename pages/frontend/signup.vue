<template>
	<section>			
		<div class="form">
			<img src="images/back-circle.png">
			<div class="container">
             
				<div class="item">
                       <div class="alert alert-danger" role="alert" v-show="error">
                    {{ error }}
                </div>
                <div class="alert alert-success" role="alert" v-show="success">
                    {{ success }}
                </div> 
			    	<b-form @submit.prevent="addCustomers" >
			            <b-form-group>
			            <b-form-input type="text"  placeholder="Primer nombre" v-model="customer.name"></b-form-input>
			        </b-form-group>

                    <b-form-group>
                        <b-form-input type="text" id="customerid"  placeholder="ID Cliente" v-model="customer.relation_id" ></b-form-input>
                    </b-form-group>

			        <b-form-group>
			            <b-form-input type="text"  placeholder="RFC" v-model="customer.taxid"></b-form-input>
			        </b-form-group> 

		            <b-form-group>
		              <b-form-input type="email" id="email"  placeholder="Dirección de correo electrónico" v-model="customer.email"></b-form-input>
		            </b-form-group>
			           
		            <b-form-group>
		              <b-form-input id="newPassword" type="password" placeholder="Contraseña" autocomplete="current-password" v-model="customer.password"></b-form-input>
		            </b-form-group>

		             <b-form-group>
		              <b-form-input  type="password" placeholder="Confirmar contraseña" autocomplete="current-password" v-model="customer.password_confirmation"></b-form-input>
		            </b-form-group>
                    <div class="form-group sub-btn">
<!--                           <b-button type="submit">Submit</b-button>
 -->                         <button type="submit"> Enviar</button>
                      </div>
                      <span>¿Ya eres usuario? <nuxt-link to="/login">Registrarse</nuxt-link></span>
		            <!-- <div slot="footer">
		              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
		               <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>    
		            </div> -->
		        </b-form>
			    </div>
			</div>
		</div>
	</section>		
</template> 
<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios';

export default {
    layout: 'frontend',
    data: () => {
      return {
      	error: null,
      	success: null,
	     customer:{
      		name : '',
			taxid: '',
			relation_id: '',
			email: '',
			password: '',
			password_confirmation: '',
	     }
 
      }
    },
    methods: {
  		async addCustomers ()
  		{
        	this.error = null

	        await this.$axios.post('auth/register',this.customer)
	         .then(response => {        
	          console.log(response.data.data)
	          this.success = response.data.data
              this.$router.push('/login')
	        })
	      .catch(e => {
	        this.error = e.response.data.message;

	      })
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


.form {
    padding: 80px 0;
    margin: 0 auto;
    position: relative;
	max-height: 800px;
    overflow: hidden;
}
.form img {
    width: 100%;
	position:relative;
	z-index:-2;
}
.form .item {
    padding: 40px;
    border-radius: 6px;
    box-shadow: 0 0 30px rgba(0,0,0,0.4);
    text-align: center;
    color: #000;
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 85px;
    background: #fff;
}
.form .item h2 {
    text-align: center;
    margin-bottom: 0;
    color: #003da6;
    text-transform: uppercase;
    font-size: 30px;
}
.form .item h2 + .form-group {
    margin-top: 30px;
}
.form .item .form-control {
    height: 45px;
}
.sub-btn button {
    width: 100%;
    height: 50px;
    border-radius: 40px;
    border: 0;
    background: #f60;
    color: #fff;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 500;
}
.sub-btn {
    margin: 30px 0 30px;
    display: block;
}


</style>