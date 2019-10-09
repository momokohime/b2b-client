<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('add_coupons') }}</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
          <!-- Form fields -->
          <b-form @submit.prevent="submitCoupon" >
          <div>
            
         <b-form-group
            label="Vendedor"
            label-for="basicName"
            label-cols-lg="3"
            >
            
            <multiselect
             :multiple="true"
            v-model="coupon.user"
            :options="coupon.options"
            :close-on-select="false"
            :clear-on-select="false"
            :hide-selected="true"
            :preserve-search="true"
            placeholder="Selecciona vendedor"
            label="user"
            track-by="user"
            :preselect-first="true"
            id="example1"
          
            ></multiselect>
         <!--  <b-form-select v-model="coupon.franchise" :options="coupon.options" class="mt-3"></b-form-select> -->
          </b-form-group> 
          <b-form-group
            label="Productos"
            label-for="basicName"
            label-cols-lg="3"
            >
          <multiselect
           :multiple="true"
            v-model="coupon.productVal"
            :options="coupon.opt"
            :close-on-select="false"
            :clear-on-select="false"
            :hide-selected="true"
            :preserve-search="true"
            placeholder="Selecciona productos"
            label="name"
            track-by="name"
            :preselect-first="true"
            
            ></multiselect>
          </b-form-group> 
         <b-form-group
            label="Nombre Cupón"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="coupon.name" placeholder="Ingresa nombre"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Código Cupón"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="coupon_code" type="text"  v-model="coupon.code" value="45345" placeholder="Código cupón" readonly></b-form-input>
          </b-form-group>

          <b-form-group label="Tipo de cupón" label-cols-lg="3">
            <b-form-radio-group
              v-model="coupon.type"
              :options="coupon.typeOptions"
              class="mt-3"
            ></b-form-radio-group>
          </b-form-group>
         
          <b-form-group
            label="Valor"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName" type="text"  v-model="coupon.value" placeholder="Ingresa valor"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Fecha de inicio"
            label-for="basicStartDate"
            label-cols-lg="3"
            >
            <b-form-input id="basicStartDate" v-model="coupon.start_date" type="date" ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Fehca de expiración"
            label-for="basicEndDate"
            label-cols-lg="3"
            >
            <b-form-input id="basicEndDate" v-model="coupon.end_date" type="date"  ></b-form-input>
          </b-form-group>

          <b-form-group label="Activo" label-cols-lg="3">
            <b-form-radio-group
              v-model="coupon.status"
              :options="coupon.sOptions"
              class="mt-3"
            ></b-form-radio-group>
          </b-form-group>

          <b-form-group
            label="Descripción"
            label-for="basicName"
            label-cols-lg="3"
            >
          <b-form-textarea id="basicName"  v-model="coupon.description" placeholder="Ingresa descripción"></b-form-textarea>
          </b-form-group>
         </div>
          <div slot="footer">
             <div class="form-actions">
                <b-button type="submit" variant="primary">{{ $t('save_changes') }}</b-button>
                <b-button type="button" variant="secondary">{{ $t('cancel') }}</b-button>
              </div>
          </div>
          </b-form>
        </b-card>
       
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Fields from '~/pages/dashboard/coupons/form'
  import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
       
      error: null,
      errors: [], 
        coupon: {

          name: '',
          code:'',
          value:'',
          start_date: '',
          end_date: '',
          options: [],
          opt: [], 
          status: '1',
          sOptions:[
            { value: '1', text: 'Si' },
            { value: '0', text: 'No'}
          ],
          type: 'flat',
          typeOptions:[
            { value: 'flat', text: 'Descuento fijo'},
            { value: 'percentage', text: 'Porcentaje' },
          ],
          description:'',
        }
    }
  },
  mounted() {
        this.fetchClients();
        this.fetchProduct();
        this.fetchCouponCode();
    },
  methods: {
    
   
    async submitCoupon () {
       var data = this.coupon
       this.error = null
       await this.$axios.post('coupons',data)
        .then(response => {                                                                       
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/coupons');

      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    fetchCouponCode(){
        this.$axios.get(`coupon_code`)
        .then(response => {
            this.coupon.code = response.data.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    fetchClients(){
        this.$axios.get(`salesman`)
       .then(response => {
        
        this.coupon.options = response.data.data
     
        this.coupon.options = this.coupon.options.map(function(elem) {
          return {
            value: elem.id,
            user: elem.name
          } 
        })
       
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      fetchProduct(){
        this.$axios.get(`products`)
        .then(response => {
        
        this.coupon.opt = response.data.data
     
        this.coupon.opt = this.coupon.opt.map(function(elem) {
          return {
            value: elem.MATNR,
            name: elem.TEXT1
          } 
        })
       
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
      
  },
  components: {
    Fields
  }
}
</script>

