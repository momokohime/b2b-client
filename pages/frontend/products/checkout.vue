<template>
	<section class="pb-5">
    <v-tour name="checkoutPageTour" :steps="steps" :options="myOptions" :callbacks="myCallbacks"></v-tour>
		<div class="container">
			<div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          	</div>
			<div class="container-heading mb-5 mt-5">
				<h1 class="heading">Checkout</h1>
				<!-- <div class="client-info">
					 <h5>Ya eres cliente? <span> Inicia Sesión</span></h5>
				</div> -->
			</div>

			<div class="row" v-if="cartItems.length > 0">
				<div class="col-md-7">
				    <div class="border-gray-box p-4 mb-3">   
					    <div class="form-heading mb-4">
					    	 <h5 class="main">Tu orden</h5>
					    </div>
				   		<div class="order-table mb-4">
						    <table width="100%" data-v-step="verify-your-order">
						        <thead>
							        <tr>
                        <th>Imagen</th>
                        <th>Productos</th>
                        <th>Cantidad</th>
                        <th>Total</th>
								    </tr>
							    </thead>
							    <tbody>
							     <tr v-for="(product, index) in cartItems">
							     	<td class="product-img"><img :src="product.image"></td>
							     	<td>{{ product.MATNR}}</td>
								    <td>
								    	<div class="for-table-plus">
					                        <button type="button" class="button hollow circle"  @click="decQty(product)">
					                        <i class="fa fa-minus" aria-hidden="true"></i>
					                        </button> 

					                        <input type="text" class="input-group-field" @input="updateQty(product)" v-model="product.qty">

					                         <button type="button"class="button hollow circle" @click="incQty(product)">
					                          <i class="fa fa-plus" aria-hidden="true"></i>
					                        </button>
					                    </div>
								    </td>
								     <!-- <td>$ {{ Number((product.price * product.qty).toFixed(2)) }}</td> -->
                     <td v-html="$options.filters.price(product.price * product.qty)"></td>
									
								 </tr>
							  </tbody>
							  <tfoot>
							     <tr class="border-top">
								    <td><strong>Total sin IVA</strong></td>
								    <td></td>
								    <td></td>
									<!-- <td>{{SubTotal}}</td> -->
                  					<td v-html="$options.filters.price(SubTotal)"></td>
								 </tr>
								 <tr>
								    <td><strong>Impuestos</strong></td>
								    <td></td>
								    <td></td>
									<td v-html="$options.filters.price(tax)"></td>
								 </tr>
								 <tr class="border-top">
								    <td><strong>Total</strong></td>
								    <td></td>
								    <td></td>
									<td v-html="$options.filters.price(grandTotal)"></td>
								 </tr> 
							  </tfoot>
						   </table>
						</div>
					</div>
					 <nuxt-link to="/products" class="register-btn-n"><i class="fa fa-chevron-left" aria-hidden="true"></i>Regresar a Productos</nuxt-link>
				</div>

				<div class="col-md-5">
				   <div class="border-gray-box p-4 mb-3">
				        <div class="form-heading mb-4">
						  <h5 class="main">Dirección de Envío</h5>
					    </div>

					    <div class="form-group-trans">
						   <div class="form-group-control mt-3 mb-3">
						   	 	 <div class="custom-control custom-radio" data-v-step="select-shipping-addr">

						   	 	 	<div v-for="(address, index) in shippingAddress">
						   	 	 		<!-- {{address}} -->
									   <input type="radio" :id="'shippAddr_'+index" :value="index" v-model="shipinngIndex" name="address" class="custom-control-input"> 

									   <label class="custom-control-label" :for="'shippAddr_'+index"><h5 class="height">{{shippingAddressType[index]}}</h5></label> 

									    <div class="child-sec">
							                 <ul>
								                 <li><span> <strong>Nombre</strong> : {{ address.NOMBRE }}</span></li>
								                 <li><span> <strong>Email</strong> :</span> {{ address.EMAIL }} {{ address.TEL }}</li>
								                 <li><span> <strong>Dirección</strong>: </span>{{ address.SPART }} , {{ address.CALLE_NUM }}</li>
								                 <li><span> <strong>Región</strong> :</span> {{ address.ESTADO }}
								                 {{ address.MUNICIPIO }}, {{ address.COD_POST }}, {{address.ESTADO}}
								                  {{ address.LANDX }}</li>
							                </ul>
							            </div>
						       		 </div>

								  </div> 
							 
						   </div>
						    <b-form-textarea id="comment" :rows="3" v-model="comment" placeholder="Comentario" data-v-step="leave-comment"></b-form-textarea>
						 <!--   <div class="form-group-control mt-3 " >
						   	 	<div class="custom-control custom-radio">
								    <input type="radio" id="pickupLoc" v-model="showDiv" name="listAddress" disabled value="pickupLocation" class="custom-control-input">
								    <label class="custom-control-label" for="pickupLoc">Pickup up from store</label>
								    <div class="custom-sel" v-show="showDiv == 'pickupLocation'"> 
					                    <select v-model="selectLocation">
					                      <option value="" selected="selected">Select Locations</option>
					                      <option v-for="(location, index) in pickupLocations" :value="location">{{ location.location_name }}</option>
					                    </select>

					                    <div  class="child-sec" v-if="selectLocation != ''">
					                      <ul>

					                        <li><span>{{ selectLocation.location_name }}</span></li>
					                        <li>{{ selectLocation.address_line_1 }}</li>
					                        <li>{{ selectLocation.address_line_2 }}</li>
					                        <li>{{ selectLocation.address_line_3 }}</li>
					                        <li><span>cp :</span>{{ selectLocation.zip }}</li>
					                        <li><span>Tel:</span>{{ selectLocation.number }},</li> 
					                      </ul>
					                  </div>
					              </div>
							      
							  </div>
						   </div> -->
						</div>
						<!-- <div class="form-heading mb-4 mt-4">
						  <h5 class="main">Comment</h5>
					    </div> -->
					    
                          
					    <div>
					    	
					    </div>
						
						<!-- <div class="form-heading mb-4 mt-4">
						  <h5 class="main">Payment</h5>
					    </div> -->
						<div class="form-group-trans" data-v-step="payment-method">

						   <div role="tablist" class="custom-accordian">
			               <b-card no-body class="mb-1 card-body">
				               <b-card-header header-tag="header" class="p-1 card-header" role="tab">
				                  <b-btn block href="#" @click="getMethod('internal_credit')" v-b-toggle.accordion3>
				                     <div class="custom-control custom-checkbox">
				                          <input type="radio" v-model="payment.type" value="internal_credit" class="custom-control-input" >
				                          <label class="custom-control-label" for="accordion1">CRéDITO INTERNO</label>
				                      </div>
				                  </b-btn>
				                </b-card-header>

				                <b-collapse id="accordion3" visible accordion="my-accordion" role="tabpanel">
				                      <b-card-body class="card-body inner">
				                          <div class="col-sm-12 payment-btn-sec" data-v-step="create-order">
				                            <b-button class="btn btn-block btn-primary" @click="OrderPlace()" :disabled="button_busy">REALIZAR PEDIDO</b-button>
				                          </div>
				                      </b-card-body>
				                </b-collapse>
				              </b-card>


			              <!-- <b-card no-body class="mb-1 card-body">
			                <b-card-header header-tag="header" class="p-1 card-header" role="tab">
			                <b-btn block href="#" @click="getMethod('openpay')" v-b-toggle.accordion1>
			                   <div class="custom-control custom-checkbox">
			                        <input type="radio" v-model="payment.type" value="openpay" class="custom-control-input" id="accordion1">
			                        <label class="custom-control-label" for="accordion1">OPEN PAY</label>
			                    </div>
			                </b-btn>

			                </b-card-header>
			                <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
			                  <b-card-body class="card-body inner">
			                       <div class="row">
			                          <div class="col-sm-12">
			                            <div class="form-group">
			                              <label for="name">Nombre</label>
			                              <b-form-input id="basicName" type="text"  v-model="holder_name" placeholder="Ingresa          nombre"></b-form-input>
			                            </div>
			                          </div>
			                        </div>
			                        
			                        <div class="row">
			                          <div class="col-sm-12">
			                            <div class="form-group">
			                              <label for="ccnumber">Número Tarjeta de Crédito</label>
			                              <b-form-input id="basicName" type="text"  v-model="card_number" placeholder="Ingresa número de tarjeta "></b-form-input>
			                            </div>
			                          </div>
			                        </div>

			                        <div class="row">
			                          <div class="form-group col-sm-4">
			                            <label for="ccmonth">Mes</label>
			                            <b-form-select v-model="expiration_month" :options="items_months" >
			                            </b-form-select>
			                          </div>
			                          <div class="form-group col-sm-4">
			                            <label for="ccyear">Año</label>
			                            <b-form-input id="basicName" type="text"  v-model="expiration_year" placeholder="21"></b-form-input>
			                          </div>
			                          <div class="col-sm-4">
			                            <div class="form-group">
			                              <label for="cvv">CVV/CVV2</label>
			                              <b-form-input id="basicName" type="text"  v-model="cvv2" placeholder="XXX"></b-form-input>
			                            </div>
			                          </div>
			                          <div class="col-sm-12 payment-btn-sec">
			                            <b-button block variant="primary" @click="submitToken()" :disabled="orderPlaceInProgress">Pagar y ordenar</b-button>
			                          </div>
			                        </div>
			                      </b-card-body>
			                    </b-collapse>
			                  </b-card> -->
				              <!-- <b-card no-body class="mb-1">
				                <b-card-header header-tag="header" class="p-1" role="tab">
				                   <b-btn block href="#" @click="getMethod('paypal')" v-b-toggle.accordion2>
				                   <div class="custom-control custom-checkbox">

				                        <input type="radio" v-model="payment.type" value="paypal"  class="custom-control-input" id="accordion2">
				                        <label class="custom-control-label" for="accordion1">PAYPAL</label>
				                    </div>
				                </b-btn>
				                </b-card-header>
				                <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
				                  <b-card-body class="card-body inner">
				                       <div class="row">
				                          <div class="col-sm-12">
				                            <div class="form-group">
				                              <label for="name">Nombre</label>
				                              <b-form-input id="basicName" type="text"  v-model="holder_name" placeholder="Ingresa nombre"></b-form-input>
				                            </div>
				                          </div>
				                        </div>
				                        
				                        <div class="row">
				                          <div class="col-sm-12">
				                            <div class="form-group">
				                              <label for="ccnumber">Número tarjeta de crédito</label>
				                              <b-form-input id="basicName" type="text"  v-model="card_number" placeholder="Ingresa número de tarjeta"></b-form-input>
				                            </div>
				                          </div>
				                        </div>

				                        <div class="row">
				                          <div class="form-group col-sm-4">
				                            <label for="ccmonth">Mes</label>
				                            <b-form-select v-model="expiration_month" :options="items_months">
				                            </b-form-select>
				                          </div>
				                          <div class="form-group col-sm-4">
				                            <label for="ccyear">Año</label>
				                            <b-form-input id="basicName" type="text"  v-model="expiration_year" placeholder="21"></b-form-input>
				                          </div>
				                          <div class="col-sm-4">
				                            <div class="form-group">
				                              <label for="cvv">CVV/CVV2</label>
				                              <b-form-input id="basicName" type="text"  v-model="cvv2" placeholder="XXX"></b-form-input>
				                            </div>
				                          </div>
				                          <div class="col-sm-12 payment-btn-sec">
				                            <button class="btn btn-block btn-primary" @click="submitToken()" type="button">Pagarrrrr</button>
				                          </div>
				                        </div>
				                      </b-card-body>
				                </b-collapse>
				              </b-card> -->
				             
				            </div>
						   
						   <div class="form-group-req mt-4">
						      <!-- <h6 class="mb-2">Requieres facturar este pedido?</h6>
							  <div class="custom-control custom-radio custom-control-inline">
								  <input type="radio" id="customRadioInlineSi" name="customRadioInline1" class="custom-control-input" checked>
								  <label class="custom-control-label" for="customRadioInlineSi">Si</label>
								</div>
								<div class="custom-control custom-radio custom-control-inline">
								  <input type="radio" id="customRadioInlineNo" name="customRadioInline1" class="custom-control-input">
								  <label class="custom-control-label" for="customRadioInlineNo">No</label>
								</div> -->
								<div class="custom-control custom-radio custom-control-inline mt-3">
								  <input type="checkbox" id="termagreed" name="termagreed" class="custom-control-input">
								  <label class="custom-control-label" for="customRadioInlineterminos">He leído y estoy de acuerdo con los <span>terminos y condiciones</span></label>
								</div>
						   </div>
						   
						<!--    <div class="form-group-pedido mt-4">
						        <button class="btn btn-primary" @click="submitToken()" 
                            type="button">REALIZAR PEDIDO</button>
						   </div> -->
						</div>
				    </div>



	            

				</div>														
			</div>	
			<!-- <div class="cartEmpty" v-if="cartItems.length == 0">
          		<span>Your cart is empty</span>
          		<b-button class="check-btn btn" :to="/" >Ir a productos</b-button>
      		</div> -->
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapGetters } from 'vuex'
import Cookies from 'js-cookie';

	export default {
    layout: 'frontend',
    data(){
    	return {
        button_busy: false,
    		showDiv : 'shippingAddress',
    		shipinngIndex: 0,
    		shippingAddress:[],
        	pickupLocations:[],
        	selectLocation: '',
        	paymentType:'internal_credit',
        	payment: {
		         type : 'internal_credit'
		    },
		    orderPlaceInProgress: false,
		    expiration_month: null,
	        postal_code: '',
	        country_code: '',
	        showCollapse: true,
		    expiration_year: '',
        	deviceSessionId: '',
        	cvv2: '',
	        holder_name: '',
	        card_number: '',
        	itmes:[],
        	errors:[],
        	error: null,
        	openpaySandboxMode: true,
	        deviceSessionId: '',
	        token: '',
	        comment:'',
	  		openpayId: 'mooyy96zort5ohzmxo5m',
       		openpayKey: 'pk_f2e2faf2b76549a28326a33abdd3248e',
        	items_months: [
            { text: "Month", value: null },
            { text: "01 - Enero", value: "01" },
            { text: "02 - Febrero", value: "02" },
            { text: "03 - Marzo", value: "03" },
            { text: "04 - Abril", value: "04" },
            { text: "05 - Mayo", value: "05" },
            { text: "06 - Junio", value: "06" },
            { text: "07 - Julio", value: "07" },
            { text: "08 - Agosto", value: "08" },
            { text: "09 - Septiembre", value: "09" },
            { text: "10 - Octubre", value: "10" },
            { text: "11 - Noviembre", value: "11" },
            { text: "12 - Diciembre", value: "12" },
        ],
        steps: [
          {
            target: '[data-v-step="verify-your-order"]',  // We're using document.querySelector() under the hood
            content: `Verifica que tu pedido sea correcto.`,
            params: {
              enableScrolling: false
            }
          },
          {
            target: '[data-v-step="select-shipping-addr"]',  // We're using document.querySelector() under the hood
            content: `Selecciona la dirección de envío.`,
            params: {
              enableScrolling: false,
              placement: 'top'
            }
          },
          {
            target: '[data-v-step="leave-comment"]',
            content: 'Si lo necesitas, déjanos un comentario.',
            params: {
              enableScrolling: false
            }
          },
          {
            target: '[data-v-step="payment-method"]',
            content: 'Selecciona tu método de pago.',
            params: {
              enableScrolling: false
            }
          },
          {
            target: '[data-v-step="create-order"]',
            content: 'Finaliza tu pedido.',
            params: {
              enableScrolling: false
            }
          },
        ],
        myOptions: {
          useKeyboardNavigation: false,
          labels: {
            buttonSkip: 'No volver a mostrar',
            buttonPrevious: 'Anterior',
            buttonNext: 'Próxima',
            buttonStop: 'Terminar'
          }
        },
        myCallbacks: {          
          onStop: function(){ 
            Cookies.set('checkout_tour_done1', 'y')
          }
        }
    	}
    },
    computed: {
	    ...mapGetters({
	      cartItems: 'cart/cartItems',
	      isAuthenticated: 'isAuthenticated',
    	  loggedInUser: 'loggedInUser',
	    }),
	    getCustomer() {
          return this.$store.getters.loggedInUser
       	},
	    SubTotal(){
	      return this.cartItems.reduce(function(total, item){
	      return  Number((total + item.price * item.qty).toFixed(2)) ; 
	     },0);
	    },

	    tax(){
	      return this.SubTotal*16/100
	    },

	    grandTotal(){
	      return this.SubTotal+this.tax
	    },

	    shippingAddressType() {
		    return this.shippingAddress.map((index, key) => key === 0 ? 'Dirección Primaria' : 'Dirección Secundaria');
		}

    },
    mounted(){
      this.getShippingAddress()
      this.deviceSessionId = OpenPay.deviceData.setup();
      OpenPay.setId(this.openpayId);
      OpenPay.setApiKey(this.openpayKey);
      OpenPay.setSandboxMode(this.openpaySandboxMode);
      const beginTour = Cookies.get('checkout_tour_done1')
      if(beginTour != 'y') {
        this.$tours['checkoutPageTour'].start()
      }
  	},
    methods:{
    	getShippingAddress(){
    	var clientID = this.loggedInUser.relation_id
         this.$axios.get('clients/client/'+clientID)
         .then(response => {
            this.shippingAddress = response.data.shipping_addresses
            this.pickupLocations = response.data.pickup_addresses 
            console.log(this.shippingAddress);
          })
          .catch(e => {
            this.errors.push(e)
          }) 
        },
  		...mapMutations({
	    incQty: 'cart/incQty',
	    decQty: 'cart/decQty',
	    updateQty: 'cart/updateQty',
		}),
  		getMethod(method)
       	{ 
         	this.paymentType = method
            this.payment.type = method
       	},
       	async submitToken()
	    {
            if(this.paymentType == '')
            {
              this.error = "Select Payment Method"
              return false
            }
            
            if(this.paymentType == 'paypal')
            {
              this.error = "Select Payment Method OpenPay & Credit Only"
              return false
            }
            this.orderPlaceInProgress = true
            OpenPay.token.create({
                "holder_name": this.holder_name,
                "card_number": this.card_number,
                "cvv2": this.cvv2,
                "expiration_month": this.expiration_month,
                "expiration_year": this.expiration_year
            }, (response) => {
                this.token = response.data.id;
                this.OrderPlace()
            }, (e) => {
                this.error = e.data.description
                this.orderPlaceInProgress = false
            });
	    },
		async OrderPlace(){
          this.button_busy = true
	        if(this.showDiv == 'pickupLocation'){
	          var addressType = "pickup"
	          var address = this.selectLocation
	        }
	        else{

          var addressType = "shipping"
          var address = {
              address_line_1: this.shippingAddress[this.shipinngIndex].COLONIA+', '+ this.shippingAddress[this.shipinngIndex].MUNICIPIO,
              address_line_2: this.shippingAddress[this.shipinngIndex].PAIS+', '+this.shippingAddress[this.shipinngIndex].LANDX,
              address_line_3: this.shippingAddress[this.shipinngIndex].ESTADO+', '+this.shippingAddress[this.shipinngIndex].BEZEI,
              location_name: this.shippingAddress[this.shipinngIndex].CALLE_NUM,
              number: this.shippingAddress[this.shipinngIndex].TEL,
              zip: this.shippingAddress[this.shipinngIndex].COD_POST
          }
        }

        this.error = null
        if(address == ''){
          this.error = "Please select shipping address or pickup location."
          this.orderPlaceInProgress = false
          this.button_busy = false
          return
        }

          var i =0;
           this.cartItems.forEach(data => {
             this.itmes[i] = {"MATERIAL": data.MATNR,"CENTRO": "C001","CANTIDAD": data.qty,"UNIMED": data.UNIMED,"COMENTARIO":"TESTIN API"};
             i++;
          });
           
           var clientID = this.loggedInUser.relation_id
          var formInput = {
            'customer_id' : clientID,
            'SOLICITANTE' : clientID,
            'ADDRESS_TYPE': addressType,
            'ADDRESS': address,
            'T_POSICIONES': this.itmes,
            'token': this.token,
            'paymentType': this.paymentType,
            'deviceSessionId': this.deviceSessionId,
            'comment': this.comment
          }
          await this.$axios.post('/orders/create',formInput)
          .then(response => {    
            var orderID = response.data.data.PEDIDO_SAP;   
            this.$store.commit('cart/emptyCart') 
            alert("Tu orden ha sido ingresada exitosamente.");
            
             this.$router.push('/order/'+orderID+'/view?success=true')
          })
          .catch(e => {
            this.orderPlaceInProgress = false
            this.button_busy = false
            //this.error = e.response;
          })
       },
  	}
};
</script>
<style>
	.product-img img {
    width: 60px;
    padding: 15px;
    box-shadow: 0 0px 22px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}
.for-table-plus{display:flex}
   .for-table-plus input {
    width: 50px;
    text-align: center;
    margin: 0px;
    height: 30px;
    border-radius: 0 !important;
    outline: none;
    border: 1px solid #ccc;
}
.cartEmpty span {
    margin: 0 20px 0 0px;
    width: 100%;
    display: block;
    font-size: 32px;
    font-weight: 500;
}
.cartEmpty {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 200px;
    margin: 0 auto;
}
.cartEmpty{text-align: center;}
.child-sec ul {
    list-style: none;
    padding: 0;
}
.child-sec ul li {
    font-size: 14px;
    line-height: 30px;
}
.custom-accordian .card {
    padding: 0;
    margin: 30px 0;
    width: 100%;
}
.custom-accordian .card .card-header a {
    border-radius: 0;
    background: #fff;
    border: 0;
    color: #000;
    display: flex;
    justify-content: space-between;
}
.custom-accordian .card .card-header a:focus {
    outline: none;
    box-shadow: none !important;
}
.custom-accordian .card .card-header a:active {
    outline: none;
    box-shadow: none !important;
    background: transparent;
    color: #000;
}
.custom-accordian .card {
    padding: 7px 0 0;
    margin: 10px 0;
    width: 100%;
    border: 1px solid #979797;
    border-radius: 14px;
}
.register-btn-n {
    background: #293da6;
    color: #fff;
    padding: 10px 15px;
    display: inline-block;
    border-radius: 4px;
    font-size: 13px;
    float: right;
}
.register-btn-n i {
    margin-right: 10px;
}
.register-btn-n:hover {
    color: #fff;
    text-decoration: none;
}
</style>