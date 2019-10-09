<template>
  
  <div class="wrapper">
    <!-- <v-tour name="placeOrderPageTour" :steps="steps" :options="myOptions" :callbacks="myCallbacks"></v-tour> -->
    <div class="animated fadeIn"> 
      <b-row>
         <b-col cols="12">
         <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
        </b-col>
        <b-col cols="12" md="6 product-card">
         <div>
            <header class="card-header" data-v-13ba1c40=""><div data-v-13ba1c40=""><i class="fa fa-id-card-o fa-lg" data-v-13ba1c40=""></i><strong data-v-13ba1c40=""> {{ $t('address') }} </strong></div></header>

            <div class="pickup" data-v-step="select-shipping-addr">
              <input type="radio" id="shippAddr" v-model="showDiv"  name="listAddress" value="shippingAddress" checked="checked">
             
               <label for="shippAddr" > {{ $t('shipping_address') }}</label>


              <div class="customerAddress" v-for="(address, index) in shippingAddresses"  v-show="showDiv == 'shippingAddress'">

                  <input type="radio" :id="'shipaddressType'+index" :value="index" v-model="shipinngIndex" name="address" class=""> 

                  <label v-if="index == 0" :for="'shipaddressType'+index">Dirección Primaria</label>
                  <label v-if="index == 1" :for="'shipaddressType'+index">Dirección Secundaria</label>
                  <!-- <label  :for="'shipaddressType'+index" v-else>Shipping Address</label> -->

                  
                   <div class="child-sec">
                    <ul>
                     <li><span> {{ $t('name') }} : {{ address.NOMBRE }}</span></li>
                     <li><span> Email :</span> {{ address.EMAIL }} {{ address.TEL }}</li>
                     <li><span> {{ $t('address') }} : </span>{{ address.SPART }} , {{ address.CALLE_NUM }}</li>
                     <li><span> {{ $t('region') }} :</span> {{ address.ESTADO }}
                     {{ address.MUNICIPIO }}, {{ address.COD_POST }}
                      {{ address.LANDX }}</li>
                    </ul>
                  </div>
                </div>
            </div>

             <div class="pickup">
                <input type="radio" id="pickupLoc" v-model="showDiv" name="listAddress" value="pickupLocation">
                <label for="pickupLoc">{{ $t('pickup_up_from_store') }}</label>

                <div class="custom-sel" v-show="showDiv == 'pickupLocation'"> 
                    <select v-model="selectLocation">
                      <option value="" selected="selected">{{ $t('select_location') }}</option>
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
            <div>
              <label for="Comment">{{ $t('comment') }}</label>
               <b-form-textarea id="comment" :rows="5" v-model="comment" placeholder="Comentario" data-v-step="leave-comment"></b-form-textarea>
            </div>
          </div> 
        </b-col>
         <!-- Payment sectiosn starts -->
        <b-col cols="12" md="6" class="payment-sec">
          <b-card
            header-tag="header"
            footer-tag="footer">

            <div class="pickup right-secs">
                 <div v-show="showDiv == 'shippingAddress'" class="child-sec">
                   <ul>
                       <li class="heading"><span>Tu Orden</span></li>

                       <div class="right-pro-head">
                       <li><span>Productos totales :</span> <span>Sub-Total</span></li>
                     </div>
                       <div class="cart-detail-sec">
                          <li><span> {{ totalItem }}  </span> <span v-html="$options.filters.price(SubTotal)"></span> </li>
                       </div>
                        <div class="cart-detail-sec">

                       <li><span> Subtotal : </span> <span v-html="$options.filters.price(SubTotal)"></span> </li>
                       <li><span> Impuestos :</span> <span v-html="$options.filters.price(tax)"></span></li>
                       </div>
                       <li><span> Total :</span> <span v-html="$options.filters.price(grandTotal)"></span></li>
                  </ul>
               </div>
            </div>
            <div class="backproduct">
              <b-button class="btn btn-square btn-block btn-primary" :to="'products'">Regresar a Productos</b-button>
            </div>
            <div class="card-box" role="tablist">
              <b-card no-body class="mb-1 card-body">
               <b-card-header header-tag="header" class="p-1 card-header" role="tab">
                  <b-btn block href="#" @click="getType('internal_credit')" v-b-toggle.accordion3>
                     <div class="custom-control custom-checkbox" >
                          <input type="radio" v-model="payment.type" value="internal_credit" class="custom-control-input" >
                          <label class="custom-control-label" for="accordion1">{{ $t('internal_credit') }}</label>
                      </div>
                  </b-btn>
                </b-card-header>

                <b-collapse visible id="accordion3" accordion="my-accordion" role="tabpanel" data-v-step="payment-method">
                      <b-card-body class="card-body inner">
                          <div class="col-sm-12 payment-btn-sec" data-v-step="create-order">
                            <b-button class="btn btn-block btn-primary" @click="OrderPlace()" type="button" :disabled="button_busy">{{ $t('place_order') }}</b-button>
                          </div>
                      </b-card-body>
                </b-collapse>
              </b-card>


              <!-- <b-card no-body class="mb-1 card-body">
                <b-card-header header-tag="header" class="p-1 card-header" role="tab">
                <b-btn block href="#" @click="getType('openpay')" v-b-toggle.accordion1>
                   <div class="custom-control custom-checkbox">
                        <input type="radio" v-model="payment.type" value="openpay" class="custom-control-input" id="accordion1">
                        <label class="custom-control-label" for="accordion1">OPEN PAY</label>
                    </div>
                </b-btn>
                </b-card-header>
                 <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                  <b-tabs pills card vertical>
                    <b-tab  @click="getMethod('card')" title="Tarjeta débito/crédito" active>

                      <b-card-body class="card-body inner">
                       <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label for="name">{{ $t('name') }}</label>
                              <b-form-input id="basicName" type="text"  v-model="holder_name" placeholder="Ingresa nombre"></b-form-input>
                            </div>
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label for="ccnumber">{{ $t('credit_card_no') }}</label>
                              <b-form-input id="basicName" type="text"  v-model="card_number" placeholder="Ingresa número de tarjeta"></b-form-input>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="form-group col-sm-4">
                            <label for="ccmonth">{{ $t('month') }}</label>
                            <b-form-select v-model="expiration_month" :options="items_months" >
                            </b-form-select>
                          </div>
                          <div class="form-group col-sm-4">
                            <label for="ccyear">{{ $t('year') }}</label>
                            <b-form-input id="basicName" type="text"  v-model="expiration_year" placeholder="21"></b-form-input>
                          </div>
                          <div class="col-sm-4">
                            <div class="form-group">
                              <label for="cvv">CVV/CVV2</label>
                              <b-form-input id="basicName" type="text"  v-model="cvv2" placeholder="XXX"></b-form-input>
                            </div>
                          </div>
                          <div class="col-sm-12 payment-btn-sec">
                            <b-button block variant="primary" @click="submitToken()" :disabled="orderPlaceInProgress">{{ $t('payandOrder') }}</b-button>
                          </div>
                        </div>
                      </b-card-body>

                    </b-tab>
                    <b-tab @click="getMethod('bank_account')"  title="Transferencia bancaria">

                     <b-card-body class="card-body inner">
                       <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label for="name">{{ $t('holder_name') }}</label>
                              <b-form-input id="basicName" type="text"  v-model="holder_name" placeholder="Enter nombre"></b-form-input>
                            </div>
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label for="ccnumber">{{ $t('account_number') }}</label>
                              <b-form-input id="basicName" type="text"  v-model="clabe" placeholder="Ingresa número de cuenta"></b-form-input>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                           <div class="col-sm-12">
                            <div class="form-group">
                              <label for="cvv">{{ $t('bank_name') }}</label>
                              <b-form-input id="basicName" type="text"  v-model="alias" placeholder="XXX"></b-form-input>
                            </div>
                           </div>
                          <div class="col-sm-12 payment-btn-sec">
                            <b-button block variant="primary" @click="OrderPlace()" :disabled="orderPlaceInProgress">{{ $t('payandOrder') }}</b-button>
                          </div>
                        </div>
                      </b-card-body>

                    </b-tab>
                   
                  </b-tabs>
                 
                  
                    </b-collapse>
                  </b-card> -->
              <!-- <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                   <b-btn block href="#" @click="getType('paypal')" v-b-toggle.accordion2>
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
                              <label for="name">{{ $t('name') }}</label>
                              <b-form-input id="basicName" type="text"  v-model="holder_name" placeholder="Ingresa nombre"></b-form-input>
                            </div>
                          </div>
                        </div>
                        
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label for="ccnumber">{{ $t('credit_card_no') }}</label>
                              <b-form-input id="basicName" type="text"  v-model="card_number" placeholder="Ingresa número de tarjeta de crédito"></b-form-input>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="form-group col-sm-4">
                            <label for="ccmonth">{{ $t('month') }}</label>
                            <b-form-select v-model="expiration_month" :options="items_months">
                            </b-form-select>
                          </div>
                          <div class="form-group col-sm-4">
                            <label for="ccyear">{{ $t('year') }}</label>
                            <b-form-input id="basicName" type="text"  v-model="expiration_year" placeholder="21"></b-form-input>
                          </div>
                          <div class="col-sm-4">
                            <div class="form-group">
                              <label for="cvv">CVV/CVV2</label>
                              <b-form-input id="basicName" type="text"  v-model="cvv2" placeholder="XXX"></b-form-input>
                            </div>
                          </div>
                          <div class="col-sm-12 payment-btn-sec">
                            <button class="btn btn-block btn-primary" @click="submitToken()" type="button">{{ $t('payment') }}</button>
                          </div>
                        </div>
                      </b-card-body>
                </b-collapse>
              </b-card> -->
             
            </div>
          </b-card>
        </b-col>
        <!-- Payment sectiosn ends -->
        
      </b-row>
       <!--  <div class="order-btn">
                 <button type="button" class="check-btn btn" @click="submitToken()">Place Order</button>
        </div> -->
    </div>
   
  </div>
</template>



<script>
  import axios from 'axios';
  import { mapMutations, mapGetters } from 'vuex'
  // import Cookies from 'js-cookie';

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    head () {
     return {
        script: [
          // { src: 'https://openpay.s3.amazonaws.com/openpay.v1.min.js' },
          // { src: 'https://openpay.s3.amazonaws.com/openpay-data.v1.min.js' },
        ]
      }
    },
    data: () => {
      return {
        button_busy: false,
        showCollapse: true,
        shipinngIndex: 0,
        orderPlaceInProgress: false,
        showDiv : 'shippingAddress',
        selectLocation: '',
        error: null,
        errors: [],
        placeOrder:[],
        cartParams:[],
        ClientId:[],
        ClientName:[],
        shippingAddresses:[],
        pickupLocations:[],
        paymentType:'internal_credit',
        paymentMethod:'card',
        itmes:[],
        addressID:[],
        listPickLoc:'',
        cvv2: '',
        holder_name: '',
        card_number: '',
        expiration_year: '',
        expiration_month: null,
        alias: '',
        clabe: '',
        showCollapse: true,
        error: null,
        openpayId: 'mooyy96zort5ohzmxo5m',
        openpayKey: 'pk_f2e2faf2b76549a28326a33abdd3248e',
        openpaySandboxMode: true,
        deviceSessionId: '',
        token: '',
        comment:'',
        payment: {
          type : 'internal_credit'
        },
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
            target: '[data-v-step="select-shipping-addr"]',  // We're using document.querySelector() under the hood
            content: `Selecciona la dirección de envío`,
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
            content: 'Finaliza tu pedido',
            params: {
              enableScrolling: false
            }
          },
        ],
        myOptions: {
          useKeyboardNavigation: false,
          labels: {
            buttonSkip: 'Omitir recorrido',
            buttonPrevious: 'Anterior',
            buttonNext: 'Próxima',
            buttonStop: 'Terminar'
          }
        },
        myCallbacks: {          
          onStop: function(){ 
            // Cookies.set('placeOrder_tour_done', 'y')
          }
        }

      }
    },
    computed:{
       getCustomer() {
          return this.$store.state.products.customer
      },
      cartItems(){
         return this.$store.state.products.cartItems
      },

      SubTotal(){
      return this.cartItems.reduce(function(total, item){
      return  Number((total + item.price * item.qty).toFixed(2)) ; 
     },0);
    },

     totalItem(){
      var quantity = 0 
      return this.cartItems.reduce(function(total, item){
      return total += parseInt(item.qty) || 0;
     },0);
    },

    tax(){
      return this.SubTotal*16/100
    },

    grandTotal(){
      return this.SubTotal+this.tax
    }

    },
    mounted(){
      // const beginTour = Cookies.get('placeOrder_tour_done')
      // if(beginTour != 'y') {
      //   this.$tours['placeOrderPageTour'].start()
      // }
      this.getShippingAddress()
      this.deviceSessionId = OpenPay.deviceData.setup();
      OpenPay.setId(this.openpayId);
      OpenPay.setApiKey(this.openpayKey);
      OpenPay.setSandboxMode(this.openpaySandboxMode);
    },
    methods:{
      getType(type)
      { 
         this.paymentType = type
         this.payment.type = type
      }, 
      getMethod(method)
      { 
         this.paymentMethod = method
      },
      getShippingAddress(){
         this.$axios.get('clients/client/'+this.getCustomer.id)
         .then(response => {
            this.shippingAddresses = response.data.shipping_addresses
            this.pickupLocations = response.data.pickup_addresses
            console.log(this.shippingAddresses)
            
          })
          .catch(e => {
            this.errors.push(e)
          }) 
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
              address_line_1: this.shippingAddresses[this.shipinngIndex].COLONIA+', '+ this.shippingAddresses[this.shipinngIndex].MUNICIPIO,
              address_line_2: this.shippingAddresses[this.shipinngIndex].PAIS+', '+this.shippingAddresses[this.shipinngIndex].LANDX,
              address_line_3: this.shippingAddresses[this.shipinngIndex].ESTADO+', '+this.shippingAddresses[this.shipinngIndex].BEZEI,
              location_name: this.shippingAddresses[this.shipinngIndex].CALLE_NUM,
              number: this.shippingAddresses[this.shipinngIndex].TEL,
              zip: this.shippingAddresses[this.shipinngIndex].COD_POST
          }
        }


        this.error = null
        if(address == ''){
          this.error = "Please select shipping address or pickup location."
          this.orderPlaceInProgress = false
          this.button_busy = false
          return
        }

       if(this.paymentType == 'openpay' && this.paymentMethod == 'bank_account')
       {
            if(this.holder_name == '')
            {
              this.error = "Account Holder Name required"
              this.orderPlaceInProgress = false
              this.button_busy = false
              return
            }

            if(this.clabe == '')
            {
              this.error = "Account  Number required"
              this.orderPlaceInProgress = false
              this.button_busy = false
              return
            }
             
       }
        
          var i =0;
           this.cartItems.forEach(data => {
             if(data.qty > 0) {
               this.itmes[i] = {"MATERIAL": data.MATNR,"CENTRO": "C001","CANTIDAD": data.qty,"UNIMED": data.UNIMED,"COMENTARIO":"TESTIN API"};
               i++;              
             }
          });
           

          var formInput = {
            'customer_id' : this.getCustomer.id,
            'SOLICITANTE' : this.getCustomer.id,
            'ADDRESS_TYPE': addressType,
            'ADDRESS': address,
            'alias': this.alias,
            'clabe': this.clabe,
            'token': this.token,
            'T_POSICIONES': this.itmes,
            'holder_name': this.holder_name,
            'paymentType': this.paymentType,
            'paymentMethod': this.paymentMethod,
            'deviceSessionId': this.deviceSessionId,
            'comment': this.comment
          }
          //console.log(this.comment)
          await this.$axios.post('/orders/create',formInput)
          .then(response => {    
            var orderID = response.data.data.PEDIDO_SAP;    
            alert("Tu orden ha sido ingresada exitosamente.");
            this.$store.commit('products/emptyCart')
            this.$router.push('/dashboard/orders/'+orderID+'/view?success=true')
          })
          .catch(e => {
            this.orderPlaceInProgress = false
            this.error = e;
            this.button_busy = false
          })
       },
    }
  };
</script>

<style scoped>
.check-payment ul li{border-bottom:1px solid #ccc;padding:15px 10px;font-size:14px}.check-payment ul{list-style:none}.check-payment ul li span{text-align:right;float:right}.check-payment ul li a{font-size:14px;color:#000;text-decoration:none}header.card-header{background:0 0}.card-header:first-child{border:0}.product-card .card-header-actions{padding:30px 0;border-top:1px solid #ccc;margin:13px 0 0 0}.check-payment ul li span.btn{margin:-9px 0 0;border:1px solid #00000042}.card{border:0!important}.check-payment ul li span.btn img{width:25px}.card-body{border:0;border-top:1px solid #ccc}.order-btn .check-btn.btn{border:1px solid;background:#4e7ffd;color:#fff}
.pickup .child-sec {
    border: 1px solid #ccc;
    padding: 10px 15px;
    margin: 10px 0px 10px 20px;
    border-radius: 10px;
    position: relative;
}
.pickup .child-sec input {
    position: absolute;
    left: -20px;
}
.pickup .child-sec ul {
    list-style: none;
}
.pickup .child-sec ul li {
    font-size: 13px;
    margin: 8px 0 0;
}
.pickup .child-sec ul li span {
    font-weight: 600;
    text-align: left;
    margin-right: 5px;
}
.pickup {
    border-top: 1px solid #ccc;
    padding: 20px;
}
.pickup:last-child {
    border: 0;
}
.order-btn {
    float: right;
}
.custom-sel{position:relative;display:table; margin: 17px 0 0 20px;}.custom-sel:after{position:absolute;content:"";top:14px;right:10px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #3ea8d8;pointer-events:none}.custom-sel select{width: 100%;padding:6px 30px 6px 10px;background:#fff;border:solid 1px #3ea8d8;border-radius:6px;-webkit-appearance:none;-moz-appearance:none;appearance:none}
.app-body .main {
    position: relative;
}
.cartEmpty {
    text-align: center;
    display: flex;
    position: absolute;
    top: 50%;
    transform: translatex(100%);
}
.payment-sec .card-header {
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    float: left;
  align-items: center;
  height: 65px;
  background: transparent;
  color: #333;
}
.payment-sec .main-sec {
    border: 0;
  background: transparent;
}
.payment-sec .card-body .inner {
    padding: 30px;
  width: 100%;
  border: 0;
  margin: 0 auto;
}
.pickup.right-secs {
    border: 0;
    padding: 0;
}
.card-box {
    box-shadow: 0 10px 9px rgba(0, 0, 0, 0.2);
}
.payment-sec .main-sec .card-header.heading-sec {
    background: transparent;
}
.payment-sec .card-body {
    padding: 0;
    margin: 0px;
}
.payment-sec .card-body .card {
    border: 0;
    box-shadow: 0 0px 22px rgba(0, 0, 0, 0.1);
    margin: 20px 0 0;
}
.payment-sec .card-header h5 a {
    color: #333;
    text-decoration: none;
}
.payment-btn-sec button {
    border-radius: 0;
    line-height: 30px;
}
.payment-btn-sec.order-sec {
    margin: 50px 0;
}
.payment-btn-sec.order-sec button {
    width: 200px;
    border-radius: 6px;
    float: right;
}
.card-header a {

    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    float: left;
    align-items: center;
    height: 65px;
    background: transparent;
    color: #333;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;

}
.card-header a:hover, .card-header a:focus {
    outline: none;
    box-shadow: none;
}
.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-label::before {
    border-color: #007bff;
    background-color: #fff;
}
.payment-sec .card-body .inner{
  border: 1px solid #ccc;
}
.payment-sec .card-header{
    margin: 0 !important;
}
.payment-sec .card-header a{
    border-bottom: 0px solid #ccc;
}
.payment-sec .card-body[data-v-13ba1c40] {
    border: 0;
}
.pickup.right-secs ul li {
    display: flex;
    align-content: center;
    justify-content: space-between;
}
.cart-detail-sec {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
}
.right-pro-head {

    border-bottom: 1px solid #ccc;
    padding: 5px 0 10px;

}
.pickup.right-secs .child-sec {

    margin: 0;

}
.pickup.right-secs .child-sec .heading {
    color: #003da6;
}
/*--Payment-Page--*/
.customerAddress .custom-control-input {
    opacity: 1 !important;
}
.customerAddress {
    padding: 10px 0px 0px 50px;
}
.customerAddress .custom-control-input {
    margin: 5px -15px;
}
.customerAddress .child-sec {
    margin: 0 !important;
}
.backproduct{
  margin-top: 20px;
}
</style>