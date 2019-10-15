<template>
  <section class="card-emmpty">
      <!-- <v-tour name="checkoutPageTour" :steps="steps" :options="myOptions" :callbacks="myCallbacks"></v-tour> -->
      <div class="row" v-if="cartItems.length > 0">
        <div class="col-sm-12 col-xl-12">
          
          <div class="cart-listing-sec" v-if="getCustomer && getCustomer !== ''">
              <ul>
                <li>{{ $t('client_id') }} : {{ getCustomer.id }}</li>
                <li>{{ $t('client_name') }} :{{ getCustomer.name }}</li>
              </ul>
          </div>
          <div class="cart-item-sec" data-v-step="verify-your-order">
            <div class="card-body table-responsive">
              <table class="table table-striped custom-table">
                <thead>
                <tr>
                <th></th>
                <th></th>
                <th>Producto ID</th>
                <th>{{ $t('product') }}</th>
                <th>{{ $t('price') }}</th>
                <th>{{ $t('quantity') }}</th>
                <th>Total</th>
                </tr>
                </thead>
              <tbody>
                 <tr v-for="(product, index) in sortedCartItems">
                  <td><a href="#" @click="deleteProduct(product)" ><img src="~/assets/frontend/images/error.png"></a></td>
                  <td class="product-img"><img :src="product.image"></td>
                  <td>{{ product.MATNR }}</td>
                  <td>{{ product.TEXT1 }}</td>
                  <td :class="{ promotionalprice: product.is_promotional }" v-html="$options.filters.price(product.price)"></td>
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
                  <td v-html="$options.filters.price(product.price * product.qty)"></td>
                </tr>
              </tbody>
              </table>
              <div class="coupon-sec">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="coupons">
                      <div class="input-group">
                        <input class="form-control" id="input2-group2" type="input" name="coupon" v-model="couponCode" placeholder="Cupón">
                        <span class="input-group-append">
                        <button class="btn btn-primary"  @click="couponValidate()" type="button">{{ $t('apply_coupon') }}</button>
                       
                        </span>
                      </div>
                    </div>
                     <div class="alert alert-danger" role="alert" v-show="error">
                            {{ error }}
                        </div>
                        <div class="alert alert-success" role="alert" v-show="success">
                            {{ success }}
                        </div>
                         <div class="alert alert-success quote-success" role="alert" v-show="successQuote">
                             {{ successQuote }}
                        </div> 
                  </div>
                  <div class="col-sm-6">
                    <div class="shoping-btn coupons">
                      <b-button class="btn btn-square btn-block btn-primary" :to="'products'">{{ $t('continue_shopping') }}</b-button>
                      <!-- <button class="btn btn-square btn-block btn-primary" type="button">Continue Shopping</button> -->
                    </div>
                  </div>
                 
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
      <div class="row" v-if="cartItems.length > 0">
        <div class="col-sm-12 col-12 col-lg-6">
        </div>
        <div class="col-sm-12 col-12 col-lg-6">
          <div class="total-sec">
          <h4>Total carrito</h4>
            <div class="heading-sec">
              <ul>

                <!-- <li> <span>Subtotal</span>  :  {{ SubTotal | price }}</li> -->
                <li> <span>Subtotal</span>  :  <span v-html="$options.filters.price(SubTotal)"></span></li>
              <!-- <li v-if="discount.value"><span>{{ $t('discount') }}</span>  :  {{discount.value}}</li> -->
              <li v-if="discount.value"><span>{{ $t('discount') }}</span>  :  <span v-html="$options.filters.price(discount.value)"></span></li>
              <!-- <li v-if="discount.value"><span>Total</span>  :  {{SubTotal - discount.value}}</li>  -->
              <li v-if="discount.value"><span>Total</span>  :  <span v-html="$options.filters.price(SubTotal - discount.value)"></span></li> 
              </ul>
            </div>
            <div class="shoping-btn coupons">
               <button v-b-modal.modal-1 class="btn btn-primary">{{ $t('quote_this_order') }}</button>

              <button class="btn btn-primary"  @click="$router.push({ name: 'order_place'})"  type="button">{{ $t('proceed_to_checkout') }}</button>
            </div>
          </div>
        </div>
      </div>

       <!--   Quote Form  -->

       <b-modal id="modal-1" title="Quote" ref="modal">
        <div v-if="loggedInUser.is.admin">
          <b-card-body>
         <!--  <b-row class="form-group">
            <input type="radio" v-model="customerType" value="ERPcustomer">ERP Customer
            <input type="radio" v-model="customerType" value="PublicCustomer">Public Customer
          </b-row> -->
        <!--   <b-row class="form-group" v-if="customerType == 'ERPcustomer'">
              <multiselect v-model="getErpCustomer" label="name" track-by="id" placeholder="Type to search" 
                 open-direction="bottom" :options="customers.data" :multiple="false" 
                 :searchable="true" :loading="isLoading" 
                 :internal-search="false" 
                 :clear-on-select="true" 
                 :close-on-select="true" 
                 :options-limit="300" 
                 :limit="3" 
                 :max-height="600" 
                 :show-no-results="false" 
                 :hide-selected="true" 
                 @search-change="asyncFind">
                <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag">
                  <span>{{ option.NOMBRE }}</span><span class="custom__remove" @click="remove(option)">❌</span>
                  </span>
                </template>
                <template slot="clear" slot-scope="props">
                  <div class="multiselect__clear" v-if="getCustomer.length" @mousedown.prevent.stop="clearAll(props.search)">
                  </div>
                </template>
                <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
              </multiselect> 
          </b-row> -->
         

          <div class="cart-listing-sec" v-if="customerType == 'ERPcustomer'">
              <ul>
                <li>{{ $t('client_id') }} : {{ getCustomer.id }}</li>
                <li>{{ $t('client_name') }} : {{ getCustomer.name }}</li>
              </ul>
          </div>
         </b-card-body>
        </div>
        
          <b-form @submit="onSubmit">
         <!--     <b-form-input type="hidden" id="user_id" name="user_id" :value="loggedInUser.id"></b-form-input>  -->

             <!-- <input type="hidden" name="user_id" :value="loggedInUser.id">
             <input type="hidden" name="customer_id" :value="getCustomer.id">
 -->
            <!--   <b-form-input type="hidden" id="customer_id" name="customer_id"  required :value="getCustomer.id"></b-form-input>
 -->
            <b-form-group>
              <label for="firstName">{{ $t('first_name') }}</label>
              <b-form-input type="text" id="firstName" v-model="form.cus_name" required placeholder="Nombre" :value="getCustomer.name"></b-form-input>

            </b-form-group>

            <b-form-group>
              <label for="email">Email</label>
              <b-form-input type="email" id="email" v-model="form.cus_email" required placeholder="Ingresa email"></b-form-input>
            </b-form-group>

            <b-form-group>
              <label for="phone">{{ $t('phone_number') }}</label>
              <b-form-input type="text" id="phone" v-model="form.cus_phone" placeholder="Ingresa teléfono"></b-form-input>
            </b-form-group>

            <b-form-group>
               <label for="phone">{{ $t('description') }}</label>
              <b-form-textarea id="description" :rows="5" v-model="form.cus_description" placeholder="Descripción/Nota"></b-form-textarea>
            </b-form-group>

            <b-form-group>
            <b-form-checkbox-group stacked id="terms" v-model="form.agree_terms" name="Checkboxes">
              <b-form-checkbox value="1" required>{{ $t('terms') }}</b-form-checkbox>

            </b-form-checkbox-group>
          </b-form-group>

            <div slot="footer">
              <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> {{ $t('submit') }}</b-button>
               <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> {{ $t('reset') }}</b-button> 
                  
            </div>
           
          </b-form>
        
      </b-modal>
    
      <div class="cartEmpty" v-if="cartItems.length == 0">
          <span>Tu carrito está vacío</span>
          <b-button class="check-btn btn" :to="'products'" >{{ $t('go_to_product') }}</b-button>
      </div>
    </section>
</template>
 

<script>
import { mapMutations, mapGetters } from 'vuex'
import helper from '~/utils/helper'

export default {
  layout: 'dashboard',
  name: 'dashboard',
  middleware: 'auth',
  data: () => {
      return {
        total:0,
        couponCode:'',
        success:null,
        successQuote:null,
        discount:0,
        grandTotal:0,
        error:null,
        customerType:'ERPcustomer',
        isLoading: false,
        getErpCustomer:[],
         form: {
          user_id:'',
          customer_id: '',
          cus_name: '',
          cus_phone: '',
          cus_email: '',
          cus_description: '',
          agree_terms: false
        },
        steps: [
          {
            target: '[data-v-step="verify-your-order"]',  // We're using document.querySelector() under the hood
            content: `Verifique que su pedido sea correcto`,
            params: {
              enableScrolling: false
            }
          },
          // {
          //   target: '[data-v-step="checkout-proceed"]',
          //   content: 'Indique la cantidad de artículos por productos.',
          //   params: {
          //     enableScrolling: false
          //   }
          // },
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
            // Cookies.set('checkout_tour_done', 'y')
          }
        }
      }
  },
  mounted() {
    // const beginTour = Cookies.get('checkout_tour_done')
    // if(beginTour != 'y') {
    //   this.$tours['checkoutPageTour'].start()
    // }
  },
   async asyncData({ $axios }) {
    const customers = await $axios.$get('clients/dropdown')
    return { customers}
  },
  computed: {

    SubTotal(){
      return this.cartItems.reduce(function(total, item){
      return  Number((total + item.price * item.qty).toFixed(2)) ; 
     },0);
    },

    getCustomer() {
      return this.$store.state.products.customer
    },

    sortedCartItems() {
      return helper.orderBy(this.cartItems, ['MATNR'])
    },

    ...mapGetters({
      cartItems: 'products/cartItems',
      isAuthenticated: 'isAuthenticated',
      loggedInUser: 'loggedInUser',
    }),
  },

  methods: { 
      // ErpCustomer(){
      //   this.getErpCustomer =  { "id": this.getCustomer.id , "name": this.getCustomer.name }
      // },

      onSubmit(evt) {
        evt.preventDefault()
        this.error = null
        this.successQuote = null
        if(this.form.agree_terms == false) {
          alert("Please accept the Terms and Conditions");
          return false;
        }else{
          this.form.agree_terms = true
        }

       
        var data = {
          'form' : this.form,
          'cartItems' : this.cartItems
        
        }
        this.form['user_id'] = this.loggedInUser.id
        this.form['customer_id'] = this.getCustomer.id
        this.form['client'] = this.getCustomer.name

 
        
        this.$axios.post('quote/create',data)
            .then(response => {   
            this.successQuote="Quote has been created successfully."   
            // this.form = ''
             this.form['cus_name'] = this.form['cus_email']  = this.form['cus_description'] = this.form['cus_phone']= ''
             this.form.agree_terms = false

             this.$nextTick(() => {
                this.$refs.modal.hide()
              })
            console.log(response)
        })
        .catch(e => {
            this.error = e.response.data.message;
        })
    
      },
      couponValidate(couponValidate){
        this.discount = 0
        this.grandTotal = 0
        this.error = null
        this.success = null

        if(this.couponCode == ""){
             this.error="Please enter valid coupon"
             return false
        }
        

        this.$axios.get('verify_code/'+this.couponCode).then(response => {
          if(response.data.data.avail == true){
            this.discount = response.data.data.coupon;
            this.success="Coupon Applied"
            this.$store.commit('products/setCoupon', this.couponCode)
          }else{
            this.error ="Please enter valid coupon"
          }

        })
      }, 
      asyncFind(query)
      {
          this.isLoading = true
            this.$axios.get('clients/dropdown?s='+query)
            .then(response => {
            this.customers = response.data
            this.isLoading = false
          })
      },

    ...mapMutations({
      incQty: 'products/incQty',
      decQty: 'products/decQty',
      updateQty: 'products/updateQty',
      deleteProduct: 'products/deleteProduct',
    })
  }
};
</script>

<style scoped>
   .check-btn[data-v-53e265ed] {
    padding: 6px 30px;
    border-radius: 4px;
    margin: 10px auto;
    width: auto;
    color: #fff;
    text-align: center;
    cursor: pointer;
    float: none;
    font-size: 18px;
    background: #20a8d8;
    border: 0;
  }
.for-table-ids{display:flex;flex-grow:1;width:100%;background:#d8d9da;padding:5px 10px}.for-table-ids span{margin:0 20px 0 0;font-size:17px;letter-spacing:1px}.button.hollow.circle i{font-size:8px;border:solid 2px #fff;border-radius:20px;width:16px;height:16px;line-height:12px}.custom-table button.button.hollow.circle{width:27px;padding:0 0 2px 1px;border:none;background:#252525;color:#fff;height:30px}.for-table-plus{display:flex}
   .for-table-plus input {
    width: 50px;
    text-align: center;
    margin: 0px;
    height: 30px;
    border-radius: 0 !important;
    outline: none;
    border: 1px solid #ccc;
}
.coupons .alert.alert-danger {
    position: relative;
    z-index: 99;
    top: 10px;
    left: 15px;
    padding: 10px;
    font-size: 14px;
    width: auto;
    text-align: left;
}
.checkout-details ul {
    list-style: none;
    float: left;
    display: block;
    width: 100%;
    text-align: right;
}
.checkout-details ul li span {
    font-weight: 500;
}
.cartEmpty{text-align: center;}

.coupon-sec input {
    height: 43px;
    padding: 13px;
    font-size: 14px;
}
.coupon-sec .check-btn {
    font-size: 13px;
    margin: 0;
    border-radius: 0;
}
.checkout-details {
    display: inline-block;
    float: right;
    margin: 0px 0;
}
.cart-item-sec td img {
    width: 20px;
}
.cart-item-sec .table th {
    border-top: 0;
}
.cart-item-sec td.product-img img {
    width: 150px;
    padding: 15px;
    box-shadow: 0 0px 22px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
}
.cart-item-sec {
    background: #fff;
    border-radius: 0px;
  box-shadow: 0 0px 22px rgba(0, 0, 0, 0.2);
} 
.cart-item-sec .table th, .table td {
    vertical-align: baseline;
  font-size: 16px;
    text-transform: uppercase;
  border-bottom: 1px solid #ccc;
}
.cart-item-sec .product-input input {
    width: 50px;
    text-align: center;
}
.cartEmpty span {
    margin: 0 20px 0 0px;
    width: 100%;
    display: block;
    font-size: 32px;
    font-weight: 500;
}
.card-emmpty {
    position: relative;
}

.cartEmpty {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 200px;
    margin: 0 auto;
}
.coupon-sec .coupons input {
    border-radius: 0;
}
.coupon-sec .coupons .btn {
    border-radius: 0;
  background: #536c79;
    border-color: #536c79;
}
.total-sec {
    margin: 40px 0 50px 0;
}
.total-sec h4 {
    font-size: 20px;
    text-transform: uppercase;
}
.total-sec .heading-sec {
    background: #fff;
  padding: 0px 0px;
    border: 1px solid #ccc;
}
.total-sec .heading-sec ul {
    list-style: none;
    padding: 0;
  margin: 0;
}
.coupon-sec .coupons .input-group {
    width: 60%;
}
.shoping-btn.coupons {
    width: 40%;
    margin-left: auto;
}
.total-sec .heading-sec ul li {
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
  display: flex;
    justify-content: space-between;
}
.total-sec .heading-sec ul li:last-child {
    border: 0;
}
.total-sec .shoping-btn.coupons {
    margin: 15px 0 0;
    text-align: right;
}
.total-sec .shoping-btn.coupons {
    width: 100%;
}
.cart-listing-sec ul{
  list-style:none;
}
.cart-listing-sec{
  background: #ccc;
  display: inline-block;
padding: 15px;
width: 100%;

}
.cart-listing-sec ul li{
  float: left;
  margin: 0 20px 0 0px;
}
#modal-1___BV_modal_outer_ footer#modal-1___BV_modal_footer_ {
    display: none;
}
footer#modal-1___BV_modal_footer_ {
    display: none;
}
.quote-success{
  margin-top: 2%;
}
@media only screen and (max-width: 767px) {
  .coupon-sec .coupons .input-group{
    width: 100%;
    margin: 0 0 15px;
  }
  .shoping-btn.coupons {
    width: 100%;
  }
  .coupons .alert.alert-danger {
    width: 100%;
    text-align: center;
  }
}

 </style>