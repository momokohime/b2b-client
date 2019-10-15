<template>
  <section v-if="!mailsectionloading">
     <div class="loading" v-if="loading">{{ $t('loading') }}</div>
     <!-- <v-tour name="productPageTour" :steps="steps" :options="myOptions" :callbacks="myCallbacks"></v-tour> -->
     <div class="row">
        <div class="col-md-4 col-xl-4">
         <div class="filter-sec card lower" >
          <ul>
            <li>
              <!--  <multiselect
                v-model="getCustomer"
                :options="customers.data"
                label="name" track-by="id"
                placeholder="HASTA"
                @select="clearCartOnCustomerChange">
              </multiselect> -->
               <multiselect v-model="getCustomer" label="name" track-by="id" placeholder="Buscar por nombre" 
               open-direction="bottom" :options="customers.data" :multiple="false" 
               :searchable="true" :loading="isLoading" 
               :internal-search="false" 
               :clear-on-select="true" 
               :close-on-select="true" 
               :options-limit="300" 
               :limit="3" 
               :show-labels="false"
               :max-height="600" 
               :show-no-results="false" 
               :hide-selected="true" 
               @search-change="asyncFind"
               @input="clearCartOnCustomerChange">
              <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag">
                <span>{{ option.NOMBRE }}</span><span class="custom__remove" @click="remove(option)">❌</span>
                </span>
              </template>
              <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="getCustomer.length" @mousedown.prevent.stop="clearAll(props.search)">
                </div>
              </template>
              <span slot="noResult">¡Ups! No se encontraron elementos. Intenta cambiando tu búsqueda</span>
            </multiselect>

            <multiselect v-model="getCustomer" label="id" track-by="name" placeholder="Buscar por ID" 
               open-direction="bottom" :options="customers.data" :multiple="false" 
               :searchable="true" :loading="isLoading" 
               :internal-search="false" 
               :clear-on-select="true" 
               :close-on-select="true" 
               :options-limit="300" 
               :limit="3" 
               :show-labels="false"
               :max-height="600" 
               :show-no-results="false" 
               :hide-selected="true" 
               @search-change="asyncFind"
               @input="clearCartOnCustomerChange">
              <template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag">
                <span>{{ option.NOMBRE }}</span><span class="custom__remove" @click="remove(option)">❌</span>
                </span>
              </template>
              <template slot="clear" slot-scope="props">
                <div class="multiselect__clear" v-if="getCustomer.length" @mousedown.prevent.stop="clearAll(props.search)">
                </div>
              </template>
              <span slot="noResult">¡Ups! No se encontraron elementos. Intenta cambiando tu búsqueda</span>
            </multiselect> 
<!-- 
                <select v-b-tooltip.hover title="El carrito se despachará después de cambiar de cliente." v-model="getCustomer" @change="clearCartOnCustomerChange" class="form-control">
                <option value="">Seleccionar CLIENTE</option>
                <option v-for="(customer, index) in customers.data"  v-bind:value="{id: customer.id, name: customer.name}" v-text="customer.name"></option>
               </select> -->
            </li>           
          </ul>
        </div>
        </div>
        <div class="col-md-8 col-xl-8">
          <div class="for-table-ids" v-if="getCustomer && getCustomer !== ''">
            <div class="listing-first">
              <div class="listing-format">
                <div class="table-listing">
                  <span>Nombre de Cliente :</span>
                </div>
                <div class="table-listing odd"> 
                  {{ getCustomer.name }}
                </div>
              </div> 
              <div class="listing-format">
                <div class="table-listing">
                  <span>Id de Cliente :</span> 
                </div>
                <div class="table-listing odd">
                  {{ getCustomer.id }}
                </div>
              </div> 
            </div>
            <div class="listing-secound">
              <div class="listing-format">
                <div class="table-listing">
                  <span>Límite de Crédito :</span>
                </div>
                <div class="table-listing odd" v-html="$options.filters.price(credit.LimiteCredito)">
                </div>
              </div> 
              <div class="listing-format">
                <div class="table-listing">
                  <span>Crédito Disponible : </span>
                </div>
                <div class="table-listing odd" v-html="$options.filters.price(credit.CreditoExcedido)">
                </div>
              </div> 
              <div class="listing-format">
                <div class="table-listing">
                  <span>Crédito Usado : </span>
                </div>
                <div class="table-listing odd" v-html="$options.filters.price(credit.TotalComprom)">
                </div>
              </div>
            </div>
          </div>
         </div>
      </div>

    <div class="row">

      <div class="col-sm-10 col-xl-10">
        <div class="filter-sec card" data-v-step="codigo-description">
          <ul>
            <li>
              <b-form-input type="text" v-model="filters.material" v-on:keyup.enter="loadData(1)" placeholder="Ingresar CÓDIGO"></b-form-input>
               <!-- <multiselect
                  v-model="filters.material"
                  :options="autoProducts.data.CODIGO"
                  :optionsLimit="400000000"
                  placeholder="Select a CODIGO">
                </multiselect> -->
                <b-button @click="filters.material = ''" variant="secondary" size="sm" outline>
                  <i class="fa fa-times"></i>
                </b-button>
            </li>
            <li>
              <b-form-input type="text"  v-model="filters.article_description" v-on:keyup.enter="loadData(1)" placeholder="Ingresar DESCRIPCIÓN"></b-form-input>
               <!-- <multiselect
                v-model="filters.description"
                :options="autoProducts.data.DESCRIPCION"
                :optionsLimit="4000000000"
                placeholder="Select a DESCRIPCION">
                </multiselect> -->
                <b-button @click="filters.article_description = ''"  variant="secondary" size="sm" outline>
                <i class="fa fa-times"></i>
            </b-button>
            </li>
             <li>
               <b-button @click="loadData(1)" class="btn-block check-btn btn" style="background: #003da6 !important;">{{ $t('apply_filter') }}</b-button>
            </li>

            <!-- <li>
              <b-button @click="clearFilters(1)" variant="secondary">Clear All Filters</b-button>

            </li> -->
          </ul>
        </div>
      </div>
     
      <div class="col-sm-2 col-xl-2">
          <div class="cart-sec" data-v-step="cart-icon">
               <i class="fa fa-shopping-cart"></i> <span>{{ cartItems.length }}</span>  
                <div id="cd-cart" v-if="cartItems.length > 0">
                  <ul >
                    <li v-for="(cartItem, key) in cartItems">
                      <p>{{ cartItem.MATNR }} - {{ cartItem.qty }}</p>
                    </li>
                     
                 </ul>
                <div v-if="cartItems.length > 0">
                     <nuxt-link class="check-btn btn" to="checkout" style="background: #003da6 !important;">Checkout</nuxt-link>
                    <!-- <button class="check-btn btn" @click="checkCustomerId()">Go to Checkout</button> -->
                   </div>
                </div> 
              </div> 
           
      </div>

       
      
      <div class="col-sm-12 col-xl-12">
        <div class="filter-sec card">
          <ul>
            <li>    
              <multiselect
                v-model="filters.DESDE"
                :options="autoProducts.data.DESDE"
                placeholder="DESDE">
              </multiselect>
              <b-button @click="filters.DESDE = ''" variant="secondary" size="sm" outline>
              <i class="fa fa-times"></i>
              </b-button>
            </li>
            <li>
               <multiselect
                v-model="filters.HASTA"
                :options="autoProducts.data.HASTA"
                placeholder="HASTA">
              </multiselect>
              <b-button @click="filters.HASTA = ''" variant="secondary" size="sm" outline>
                <i class="fa fa-times"></i>
              </b-button>
            </li>

            <li>
              <multiselect
                v-model="filters.MARCA"
                :options="autoProducts.data.MARCA"
                placeholder="MARCA"
                @select="refreshAutoComplete">
              </multiselect>
              <b-button @click="filters.MARCA = ''; refreshAutoComplete()" variant="secondary" size="sm" outline>
                <i class="fa fa-times"></i>
              </b-button>
            </li>
      
            <li>
              <multiselect
                v-model="filters.MODELO"
                :options="autoProducts.data.MODELO"
                placeholder="MODELO"
                @select="refreshAutoComplete">
              </multiselect>
              <b-button @click="filters.MODELO = ''; refreshAutoComplete()" variant="secondary" size="sm" outline>
                <i class="fa fa-times"></i>
              </b-button>
            </li>
            <li>
              <multiselect
                v-model="filters.MOTOR"
                :options="autoProducts.data.MOTOR"
                placeholder="MOTOR"
                @select="refreshAutoComplete">
              </multiselect>
              <b-button @click="filters.MOTOR = ''; refreshAutoComplete()" variant="secondary" size="sm" outline>
                <i class="fa fa-times"></i>
              </b-button>
            </li>
            <li>
               <b-button @click="loadData(1)" class="btn-block check-btn btn" style="background: #003da6 !important;">{{ $t('apply_filter') }}</b-button>
            </li>
          </ul>
        </div>
      </div>
     
    </div> 
  
  <!-- image preview modal starts  -->
  <b-modal :title="modal_title" size="lg" v-model="image_preview_modal" @ok="image_preview_modal = false">
      <img :src="preview_image" style="width: 100%" alt="Product image preview">
      <hr>
      <div class="row product-thumb" style="width: 100%">
        <div class="col-md-3" v-for="(other_img, kk) in preview_image_others">
          <img :src="other_img.link" :alt="other_img.name" @click="activateThumb(kk, other_img.link)" height="200" width="200" :class="{active_el : active_thumb == kk}" class="img-thumbnail" style="margin-top: 12px; cursor: pointer;">
        </div>
      </div>
    </b-modal>
  <!-- image preview modal ends  -->

    <div class="table-responsive">
      <table class="table table-striped custom-table new">
        <thead>
            <tr>
               <th>{{ $t('image') }}</th> 
                <th>CÓDIGO</th>
                <th>DESCRIPCIÓN</th>
                <th>APLICACIÓN </th>
                <th>CATEGORíA</th>
                <th>CDIS</th>
                <th>CEDAS</th>
                <!-- <th>CANTIDAD</th> -->
                <th>PRECIO</th> 
                <th>CANTIDAD</th>
            </tr>
          </thead>
          <tbody> 
            <tr v-for="(product, index) in getProducts"> 
              <td><img class="productImg" style="cursor: pointer;" :src="product.image" @error="img404(product)" @click="openImagePreview(product)"></td>  
              <td >{{ product.MATNR }}</td>
              <td @click="viewDescription(product)" style="cursor: pointer;">{{ product.excerpt }}</td>
              <td>
                <b-button variant="primary"  @click="$router.push({ name: 'product_application', params: { id: product.MATNR }})" v-if="product.has_applications > 0">Ver</b-button>
              </td>
              <td>{{ product.PRDHA1 }}</td>
              <td>{{ product.stock }}</td>
              <td>{{ product.matrix_stock }}</td>
              <!-- 
                <td>{{ product.stock_availe }}</td> -->
              <td :class="{ promotionalprice: product.is_promotional }" v-html="$options.filters.price(product.price)"></td> 
              
              <td :data-v-step="(index == 0) ? 'product-qtycounter' : ''">
                <div class="for-table-plus">
                    <b-button type="button" class="button hollow circle"  @click="decQty(product)" :disabled="product.disable_add_to_cart">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                    </b-button> 
                    <input type="number" class="input-group-field"  @input="updateQty(product)" v-model="product.qty" :readonly="product.disable_add_to_cart">
                     <b-button type="button"class="button hollow circle" @click="incQty(product)" :disabled="product.disable_add_to_cart">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </b-button>
                </div>
              </td>             
            </tr>
          </tbody>
        </table>
      </div>
        <div class="pagination-nav">
         <div class="container">
            <b-pagination
              :total-rows="totalRows"
              :current="currentPage"
              :simple="false"
              :per-page="per_page"
              order="is-right"
              @change="loadData">
              </b-pagination>
         </div>
      </div>
</section>
</template>
<style scoped>
@import '~/assets/backend/css/products.css'
</style>

<script>

import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios';
// import Cookies from 'js-cookie';

export default {
  layout: 'dashboard',
  name: 'dashboard',
  middleware: 'auth',
   data: () => {
      return {
        mailsectionloading: true,
        loading: false,
        modal_title: '',
        active_thumb: 0,
        preview_image: '',
        preview_image_others: [],
        image_preview_modal: false,
        isLoading: false,
        total_tasks: 0,
        currentPage: 1,
        per_page: 0,
        credit:[],
        filters:{
          DESDE:'',
          HASTA:'',
          MARCA:'',
          MODELO:'',
          MOTOR:'',
          article_description:'',
          material:'',
          
        },
        addQty:[],
       // getCustomer:[],
        credit:{
          LimiteCredito:0,
          CreditoExcedido:0,
          TotalComprom:0
        },
        steps: [
          {
            target: '[data-v-step="codigo-description"]',  // We're using document.querySelector() under the hood
            content: `Buscar producto por código, nombre, marca, código de referencia, atributos.`,
            params: {
              enableScrolling: false
            }
          },
          {
            target: '[data-v-step="product-qtycounter"]',
            content: 'Indique la cantidad de artículos por productos.',
            params: {
              enableScrolling: false
            }
          },
          {
            target: '[data-v-step="cart-icon"]',
            content: 'Ir al ícono del carrito',
            params: {
              enableScrolling: false
            }
          }
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
            // Cookies.set('products_tour_done', 'y')
          }
        }
      }
    },

  async asyncData({ $axios }) {
    const products = await $axios.$get('products')
    const autoProducts = await $axios.$get('autocomplete/products')
    const customers = await $axios.$get('clients/dropdown')
    const totalRows = products.meta.total
    return { products, customers, totalRows, autoProducts }
  },

  computed: {

    getCustomer: {
      get() {
        var customer = this.$store.state.products.customer
       //// this.getCreditData()
        return (customer) ? customer : []
        
      },
      set(e) {
        this.$store.commit('products/setCustomer', e)
        this.refreshCart()
      }
    },

    getProducts() {
      return this.products.data.map(product => {
        this.cartItems.forEach(cartItem => {
          if(product.MATNR == cartItem.MATNR) {
            product.qty = cartItem.qty
          }
        })
        // console.log(product);
        return product
      })
    },

    materialFilter(){
      return this.products.data.map(product => {
        return product.MATNR
      })
    },

    descriptionFilter(){
      return this.products.data.map(product => {
        return product.TEXT1
      })
    },
    ...mapGetters({
      cartItems: 'products/cartItems',      
      
    })
    
  },

  mounted(){  
    // const beginTour = Cookies.get('products_tour_done')
    // if(beginTour != 'y') {
    //   this.$tours['productPageTour'].start()
    // }
    this.updateInfo()
  },
  created () {
      this.$nextTick(function () {
         this.mailsectionloading = false
     })
   },
  methods: {   
    ...mapMutations({
      incQty: 'products/incQty',
      decQty: 'products/decQty',
      updateQty: 'products/updateQty',
      syncCart: 'products/syncCart',
  }),
    viewDescription(product){
      product.excerpt = product.long_description
   },
    clearFilters() {
      Object.keys(this.filters).map(filterKey => this.filters[filterKey] = '')
      this.loadData(1)
    },
    clearCartOnCustomerChange() {
      this.updateInfo();
      this.$store.commit('products/emptyCart')
      this.products.data.map(product => product.qty = 0)
      this.loadData(1)
    },
   updateInfo(){
    var vm = this;
     this.$axios.get('clients/credit/'+this.getCustomer.id)
     .then(response => {
        //this.credit = response.data.data
        this.credit.LimiteCredito = response.data.data.LimiteCredito
        this.credit.CreditoExcedido = response.data.data.CreditoExcedido
        this.credit.TotalComprom = response.data.data.TotalComprom        
      })
     .catch(e => {
          this.errors.push(e)
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
  loadData (page) { 
      this.loading = true
      var queryString = Object.keys(this.filters).map(key => 'filter[' +key + ']=' + ((!this.filters[key]) ? '' : this.filters[key])).join('&');
      this.currentPage = page
      this.$axios.get('products?'+queryString+'&customer_id='+this.getCustomer.id, {
          params: {
            page: page,
        }
      }).then(response => {
        this.products = response.data
        this.per_page = response.data.meta.per_page
        this.totalRows = response.data.meta.total
        this.loading = false
      })
      .catch(e => {
          this.loading = false
          this.errors.push(e)
      })
    },

    async refreshAutoComplete() {
      this.loading = true
      const { data } = await this.$axios.$get('autocomplete/products', {
        params: this.filters
      })
      this.loading = false
      this.autoProducts.data = data
    },

    img404(product) {
      product.image = '/img/logo.jpg'
    },

    openImagePreview(product) {
      this.preview_image = product.image
      this.preview_image_others = product.other_images
      this.modal_title = product.MATNR
      this.image_preview_modal = true
    },

    activateThumb(index, thumb) {
      this.active_thumb = index
      this.preview_image = thumb
    },

    refreshCart() {
      var vm = this  
      const customer = vm.$store.state.products.customer
      this.$axios.post('/sync_cart_get', customer).then(function(response){
        const items = response.data
        if(items.customer) {
          vm.syncCart(items)
        }
      }).catch(function(err){
        // console.log(err, 'Something went wrong while fetching the cart items..')
        console.log('Cart can not be synced !')
      })
    }
  }
};
</script>

<style>
  .modal-footer {
    display: none;
  }
  
  .active_el {
    border: 2px blue solid;
  }
</style>