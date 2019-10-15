<template>
	<section class="register-sec">	
      <div class="container">
        <span v-html="content"></span>
      </div>

		<div class="form">
       
			<!-- <img src="images/back-circle.png"> -->
			<div class="container">

				<div class="item">
             <div class="alert alert-danger" role="alert" v-show="error">
                  {{ error }}
              </div>
              <div class="alert alert-success" role="alert" v-show="success">
                  {{ success }}
              </div> 
			    	 <form enctype="multipart/form-data"  @submit.prevent="addCustomers" >
			        <div class="row">
                        <div class="col-md-6 col-12">
                     <b-form-group>
			            <b-form-input type="text"  placeholder="Nombre" v-model="customer.name"></b-form-input>
			        </b-form-group>
                        </div>
                        <div class="col-md-6 col-12">
                    <b-form-group>
                        <b-form-input type="text"  placeholder="Apellido" v-model="customer.surname" ></b-form-input>
                    </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-12">
                    <b-form-group>
                        <b-form-input type="text"  placeholder="Empresa" v-model="customer.company"></b-form-input>
                    </b-form-group>
                        </div>
                        <div class="col-md-6 col-12">
                    <b-form-group>
                      <b-form-input type="text"  placeholder="Dirección" v-model="customer.address"></b-form-input>
                    </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-12">
                   <b-form-group>
                      <b-form-input type="text" placeholder="Razón Social" v-model="customer.business_name"></b-form-input>
                    </b-form-group>
                        </div>
                        <div class="col-md-6 col-12">
                     <b-form-group>
                      <b-form-input type="text" placeholder="Registro de Contribuyentes (RFC)" v-model="customer.tax_id"></b-form-input>
                    </b-form-group>
                        </div>
                    </div>
			         
                    <div class="row">
                        <div class="col-md-6 col-12">
                    <b-form-group>
                      <b-form-input type="email" placeholder="Correo Electrónico" v-model="customer.email_address"></b-form-input>
                    </b-form-group>
                        </div>
                        <div class="col-md-6 col-12">
                    <b-form-group>
                      <b-form-input type="text" placeholder="Teléfono" v-model="customer.phone"></b-form-input>
                    </b-form-group>
                        </div>
                    </div>
		            <div class="row">
                        <div class="col-md-6 col-12">
                            <b-form-group label="Comprobante de domicilio">
                           <!-- <b-form-file
                              placeholder="Comprobante de domicilio:"
                              id="file" ref="file"  v-on:change="handleFileUpload()"
                            ></b-form-file> -->

                            <input type="file"  id="address_proof" ref="address_proof" v-on:change="addressProofFileUpload()"/>

                           </b-form-group>
                        </div>
                        <div class="col-md-6 col-12">
                              <b-form-group label="Comprobante de domicilio del dueño">
                               <!-- <b-form-file
                                  v-model="customer.residence_address_proof"
                                  placeholder="Comprobante de domicilio del duerio"
                                ></b-form-file> -->

                              <input type="file"  id="residence_address_proof" ref="residence_address_proof" v-on:change="resAddressProofFileUpload()"/>

                               </b-form-group>
                        </div>
                    </div>


			         <div class="row">
                        <div class="col-md-6 col-12">
                            <b-form-group label="Identificación oficial (INE)">
                              <!--  <b-form-file
                                  v-model="customer.id_proof"
                                  placeholder="Identificación oficial (INE)"
                                ></b-form-file> -->

                                 <input type="file"  id="id_proof" ref="id_proof" v-on:change="idProofFileUpload()"/>

                            </b-form-group> 
                        </div>
                        <div class="col-md-6 col-12">
                              <b-form-group label="RFC del negocio">
                              <!--  <b-form-file
                                  v-model="customer.business_ref"
                                  placeholder="REF del Negocio"
                                ></b-form-file> -->

                                 <input type="file"  id="business_ref" ref="business_ref" v-on:change="businessRefFileUpload()"/>

                               </b-form-group>
                        </div>
                    </div>
		             <div class="row">
                        <div class="col-md-6 col-12">
                             <b-form-group label="Copia de factura">
                               <!-- <b-form-file
                                  v-model="customer.invoice_copy"
                                  placeholder="Copia de factura"
                                ></b-form-file>
 -->
                                 <input type="file"  id="invoice_copy" ref="invoice_copy" v-on:change="invoiceCopyFileUpload()"/>

                               </b-form-group> 
                        </div>
                        <div class="col-md-6 col-12">
                             <b-form-group label="Solicitud de crédito">
                               <!-- <b-form-file
                                  v-model="customer.credit_application"
                                  placeholder="Solicitud de crédito"
                                ></b-form-file> -->

                                 <input type="file"  id="credit_application" ref="credit_application" v-on:change="creditAppFileUpload()"/>

                               </b-form-group>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-12">
                             <div class="form-group sub-btn">
                                <button type="submit"> Enviar</button>
                              </div>
                        </div>
                    </div>
		        </form>
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
      address_proof: '',
      residence_address_proof: '',
      id_proof: '',
      business_ref: '',
      invoice_copy: '',
      credit_application: '',
	    customer:{
            name : '',
      			surname: '',
      			company: '',
      			address: '',
      			business_name: '',
      			tax_id: '',
            email_address: '',
            phone: ''
	     }
      }
    },
    async asyncData({ $axios }) {
          const data = await $axios.$get('pages/quieres-ser-distribuidor')
          return { content: data.data.body, title : data.data.title, banner : data.data.page_banner}
    },
    methods: {
      FileUpload(fileRef){ 
        this[fileRef] =  this.$refs[fileRef].files[0];
        if (this[fileRef].size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs[fileRef].value = '' 
          this[fileRef] = ''
          return;
        }
      },
      addressProofFileUpload(){ 
        this.address_proof =  this.$refs.address_proof.files[0];
        if (this.address_proof.size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs.address_proof.value = '' 
          this.address_proof = ''
          return;
        }

      },
      resAddressProofFileUpload(){
        this.residence_address_proof =  this.$refs.residence_address_proof.files[0];
        if (this.residence_address_proof.size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs.residence_address_proof.value = '' 
          this.residence_address_proof = ''
          return;
        }

      },
      idProofFileUpload(){
        this.id_proof =  this.$refs.id_proof.files[0];
        if (this.id_proof.size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs.id_proof.value = '' 
          this.id_proof = ''
          return;
        }

      },
      businessRefFileUpload(){
        this.business_ref =  this.$refs.business_ref.files[0];
        if (this.business_ref.size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs.business_ref.value = '' 
          this.business_ref = ''
          return;
        }

      },
      invoiceCopyFileUpload(){
        this.invoice_copy =  this.$refs.invoice_copy.files[0];
        if (this.invoice_copy.size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs.invoice_copy.value = '' 
          this.invoice_copy = ''
          return;
        }

      },
      creditAppFileUpload(){
        this.credit_application =  this.$refs.credit_application.files[0];
        if (this.credit_application.size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs.credit_application.value = '' 
          this.credit_application = ''
          return;
        }

      },
  		async addCustomers ()
  		{
            var data = this.customer

            this.error = null

            const formData = new FormData()

            $.each( data, function( i, field ) {
              formData.append(i,field)
            });

          formData.append('address_proof', this.address_proof)
          formData.append('residence_address_proof', this.residence_address_proof)
          formData.append('id_proof', this.id_proof)
          formData.append('business_ref', this.business_ref)
          formData.append('invoice_copy', this.invoice_copy)
          formData.append('credit_application', this.credit_application)

	        await this.$axios.post('customer',formData)
	         .then(response => {        
	          //console.log(response.data.data)
	          this.success = response.data.data

             var vm = this;
             Object.keys(this.customer).forEach(function(key,index) {
                    vm.customer[key] = '';
             });  

             vm.$refs.address_proof.value = ''
             vm.$refs.id_proof.value = ''
             vm.$refs.business_ref.value = ''
             vm.$refs.invoice_copy.value = ''
             vm.$refs.credit_application.value = ''
             vm.$refs.residence_address_proof.value = ''

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
.register-sec {
    padding: 50px 0 0;
}

.form {
    padding: 80px 0;
    margin: 0 auto;
    position: relative;
	height: 800px;
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
.register-sec .item {

    max-width: 980px;
    text-align: left;

}
.register-sec .item .sub-btn{
    margin: 0 auto;
    text-align: center;
}
.register-sec .item .sub-btn button {

    width: auto;
    padding: 10px 100px;

}

</style>