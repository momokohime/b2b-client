<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('pay') }}</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>

          <!-- Form fields -->
          <b-form @submit.prevent="submitToken" >
          
          <b-form-group
            label="Card Holder Name"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="holder_name" placeholder="Ingresar nombre"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Card Number"
            label-for="basicNumber"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="card_number" placeholder="Ingresar tarjeta de crédito"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Expiration Year"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="expiration_year" placeholder="Ingresar año de vencimiento"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Expiration Month"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="expiration_month" placeholder="Ingresar mes de vencimiento"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Cvv2"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="cvv2" placeholder="Enter Cvv2"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Street"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="line1" placeholder="Ingresa calle"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Number"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="line2" placeholder="Ingresa número"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Reference"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="line3" placeholder="Ingresa referencia"></b-form-input>
          </b-form-group>

          <b-form-group
            label="City"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="city" placeholder="Ingresa ciudad"></b-form-input>
          </b-form-group>

          <b-form-group
            label="State"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="state" placeholder="Ingresa estado"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Country Code"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="country_code" placeholder="Ingresa código de país"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Postal Code"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="postal_code" placeholder="Ingresa código postal"></b-form-input>
          </b-form-group>

          <div slot="footer">
             <div class="form-actions">`
                <b-button type="submit" variant="primary">Guardar cambios</b-button>
                <b-button type="button" @click="$router.push('/dashboard/orders')"  variant="secondary">Cancelar</b-button>
              </div>
          </div>
          </b-form>
        </b-card>
       
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
  
.check-payment ul li {
    border-bottom: 1px solid #ccc;
    padding: 15px 10px;
    font-size: 14px;
}
.check-payment ul {
    list-style: none;
}
.check-payment ul li span {
    text-align: right;
    float: right;
}
.check-payment ul li a {
    font-size: 14px;
    color: #000;
    text-decoration: none;
}
header.card-header {
    background: transparent;
}
.card-header:first-child {
    border: 0;
}
.product-card .card-header-actions {
    padding: 30px 0px;
    border-top: 1px solid #ccc;
    margin: 13px 0 0 0;
}
.check-payment ul li span.btn {
    margin: -9px 0 0;
    border: 1px solid #00000042;
}
.card{
    border: 0 !important; 
}
.check-payment ul li span.btn img {
    width: 25px;
}
.card-body {
    border: 0;
    border-top: 1px solid #ccc;
}
.order-btn .check-btn.btn {
    border: 1px solid;
    background: #4e7ffd;
    color: #fff;
}
</style>
<script>
   import axios from 'axios';

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    head () {
     return {
        script: [
          { src: 'https://openpay.s3.amazonaws.com/openpay.v1.min.js' },
          { src: 'https://openpay.s3.amazonaws.com/openpay-data.v1.min.js' },
        ]
      }
    },
    data: () => {
      return {
        cvv2: '123',
        line1: 'Line1',
        line2: 'Line1',
        line3: 'Line1',
        city: 'City',
        state: 'State',
        holder_name: '',
        card_number: '4111111111111111',
        expiration_year: '20',
        expiration_month: '12',
        postal_code: '123',
        country_code: '1111',
        showCollapse: true,
        error: null,
        openpayId: 'mooyy96zort5ohzmxo5m',
        openpayKey: 'pk_f2e2faf2b76549a28326a33abdd3248e',
        openpaySandboxMode: true,
        deviceSessionId: '',
        token: '',
      }
    },
    mounted() {
        // console.log(OpenPay.deviceData.setup(), 'setup');
        this.deviceSessionId = OpenPay.deviceData.setup();
        // this.fetchConfig();
        OpenPay.setId(this.openpayId);
        OpenPay.setApiKey(this.openpayKey);
        OpenPay.setSandboxMode(this.openpaySandboxMode);
    },
    methods: {
      fetchConfig(){
       this.$axios.get(`orders/openpayconfig`)
       .then(response => {

         var _r = response.data.data
         this.openpayId  = _r.merchant_id
         this.openpayKey = _r.public_key
        })
        .catch(e => {
         this.error = e
        })
      },
      async submitToken () {
          this.error = null
          
          // generate token para realizar el cargo
          OpenPay.token.create({
              "holder_name": this.holder_name,
              "card_number": this.card_number,
              "cvv2": this.cvv2,
              "expiration_month": this.expiration_month,
              "expiration_year": this.expiration_year
          }, (response) => {
              this.token = response.data.id;
              this.pay()
          }, (e) => {
              this.error = e.description
          });
           
      },
      async pay(){
         await this.$axios.post('orders/pay', {
            token: this.token,
            name: this.holder_name,
            last_name: this.holder_name,
            email: 'test@gmail.com',
            deviceSessionId: this.deviceSessionId
          }).then((response) => { 
              this.$router.push('/dashboard/orders')
              console.log(response)
          });
         
      }
    }
  };
</script>