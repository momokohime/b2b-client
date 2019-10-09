<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
        <div slot="header">
            <strong>{{ $t('edit_coupon') }}</strong>
          </div>
          <b-form @submit.prevent="updatecoupon" >
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
              placeholder="Selecciona"
              label="user"
              track-by="user"
              :preselect-first="true"
              id="example1"
              ></multiselect>
            </b-form-group> 
            <b-form-group
              label="Producto"
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
              placeholder="Selecciona artículo"
              label="name"
              track-by="name"
              :preselect-first="true"
              
              ></multiselect>
             </b-form-group>
             <b-form-group
                label="Nombre cupón"
                label-for="basicName"
                label-cols-lg="3"
                >
                <b-form-input id="basicName" type="text"  v-model="coupon.name" placeholder="Ingresa nombre del cupón"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Código cupón"
                label-for="basicName"
                label-cols-lg="3"
                >
                <b-form-input id="basicName" type="text"  v-model="coupon.code" placeholder="Código del cupón" readonly></b-form-input>
              </b-form-group>
              <b-form-group
                label="Valor"
                label-for="basicName"
                label-cols-lg="3"
                >
                <b-form-input id="basicName" type="text"  v-model="coupon.value" placeholder="Ingresa valor"></b-form-input>
              </b-form-group>
              <b-form-group
                label="Tipo cupón"
                label-for="basicName"
                label-cols-lg="3"
                >
               <b-form-select v-model="coupon.type" :options="coupon.typeOptions"></b-form-select>
              </b-form-group>
              <b-form-group
                label="Fecha de inicio"
                label-for="basicStartDate"
                label-cols-lg="3"
                >
                <b-form-input id="basicStartDate" v-model="coupon.start_date" type="date" ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Fecha de expiración"
                label-for="basicEndDate"
                label-cols-lg="3"
                >
                <b-form-input id="basicEndDate" v-model="coupon.end_date" type="date"  ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Activo"
                label-for="basicName"
                label-cols-lg="3"
                >
              <b-form-select v-model="coupon.status" :options="coupon.sOptions" class="mt-3"></b-form-select>
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

export default {
                                                                                                                
  layout: 'dashboard',                                              
  data () {
    return {
      error: null,
      id : null,
        coupon: {
          name: '',
          code:'',
          value:'',
          start_date: '',
          end_date: '',
          options: [],
          opt: [],  
          status: null,
          sOptions:[
            { value: null, text: 'Selecciona' },
            { value: '1', text: 'Activo' },
            { value: '0', text: 'Inactivo'}
          ],
          type: null,
          typeOptions:[
            { value: null, text: 'Selecciona' },
            { value: 'percentage', text: 'Porcentaje' },
            { value: 'flat', text: 'Descuento fijo'}
          ],
          description:'',
        }
    }
  },
  components: {
    Fields
  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchCoupon(this.id)
    this.fetchProduct();
    this.fetchClients();
  },
  methods: {
      fetchCoupon(id){
      this.$axios.get('coupons/'+id+'/edit')
      .then(response => {
        // JSON responses are automatically parsed.
        var vf = this
        
        response = response.data.data                     
        vf.coupon.name = response.coupon.name
        vf.coupon.code = response.coupon.code
        vf.coupon.value = response.coupon.value
        vf.coupon.type = response.coupon.type
        //vf.coupon.user = res.coupon.user
        vf.coupon.description = response.coupon.description
        vf.coupon.start_date = response.coupon.start_date
        vf.coupon.status = response.coupon.status
      })
      .catch(e => {
        alert();
        this.error =  e.response.data.message
      })
    
    }, 
      async updatecoupon () {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        var data = this.coupon

        this.error = null
        
        await this.$axios.put('coupons/'+this.id,data)
        .then(response => {        
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/coupons')
      })
        .catch(e => {
          this.error = e.response.data.message;
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

    
  }
}
</script>
