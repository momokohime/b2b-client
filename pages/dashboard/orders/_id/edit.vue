<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('order_detail') }}</strong>
          </div>
          <b-form-group
            label="#Orden"
            label-for="basicStatic"
            label-cols-lg="3"
            >
            <b-form-input plaintext id="basicStatic" type="text" value="Order 1"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Creado en"
            label-for="basicStatic"
            label-cols-lg="3"
            >
            <b-form-input plaintext id="basicStatic" type="text" value="14-06-2019"></b-form-input>
          </b-form-group>
           <b-form-group
            label="Total orden"
            label-for="basicStatic"
            label-cols-lg="3"
            >
            <b-form-input plaintext id="basicStatic" type="text" value="$ 130"></b-form-input>
          </b-form-group> 
          <b-form-group
            label="Orden estatus"
            label-for="basicStatus"
            label-cols-lg="3"
            >
            <b-form-radio-group
            id="basicStatus"
            name="orderStatus">
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="Status" name="Status" class="custom-control-input" value="1" checked>
              <label class="custom-control-label" for="Status">Pendiente</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="Status2" name="Status" class="custom-control-input" value="0" >
              <label class="custom-control-label" for="Status2">Procesado</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="Status2" name="Status" class="custom-control-input" value="0" >
              <label class="custom-control-label" for="Status2">Completado</label>
            </div>
          </b-form-radio-group>
        </b-form-group>
        </b-card>
         <b-card>
          <div slot="header">
            <strong>{{ $t('shipping_and_billing') }}</strong>
          </div>
          <b-row>
              <b-col sm="12" md="6">
                <b-card no-body :no-block="true">
                  <b-card-body>
                     <h5>{{ $t('shipping_address') }}</h5>
                     <b-form-group
                      label="Full name"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="John"></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Email"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="John@gmail.com"></b-form-input>
                    </b-form-group>
                                       
                    <b-form-group
                      label="Teléfono"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="+1(1230000)"></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="FAX"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Compañía"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="KBS"></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Dirección"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="201 1st Avenue South "></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Ciudad"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="New York"></b-form-input>
                    </b-form-group>
                      <b-form-group
                      label="Estado"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="State"></b-form-input>
                     </b-form-group>
                     <b-form-group
                      label="País"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="US"></b-form-input>
                    </b-form-group>
                  </b-card-body>
                </b-card>
              </b-col>
              <b-col sm="12" md="6">
                <b-card no-body :no-block="true">
                  <b-card-body>
                     <h5>{{ $t('billing_address') }}</h5>
                     <b-form-group
                      label="Nombre completo"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="John"></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Email"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="John@gmail.com"></b-form-input>
                    </b-form-group>
                                       
                    <b-form-group
                      label="Teléfono"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="+1(1230000)"></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="FAX"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" ></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Compañía"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="KBS"></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Dirección"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="201 1st Avenue South "></b-form-input>
                    </b-form-group>
                    <b-form-group
                      label="Ciudad"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="New York"></b-form-input>
                    </b-form-group>
                      <b-form-group
                      label="Estado"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="State"></b-form-input>
                     </b-form-group>
                     <b-form-group
                      label="País"
                      label-for="basicStatic"
                      label-cols-lg="3"
                      >
                      <b-form-input plaintext id="basicStatic" type="text" value="US"></b-form-input>
                    </b-form-group>
                  </b-card-body>
                </b-card>
              </b-col>
            </b-row>
        
        </b-form-group>
        </b-card>
         <b-card>
          <div slot="header">
            <strong>{{ $t('products') }}</strong>
          </div>
            <b-table class="mb-0 table-outline" responsive="sm" hover :items="tableItems" :fields="tableFields" head-variant="light">
            <div slot="image" class="avatar" slot-scope="item">
              <img :src="item.value.url" class="img-avatar" alt="">
            </div>
            <div slot="productName" slot-scope="item">
              {{item.value.name}}
            </div>
          </b-table>

        </b-card>
        <b-card>
          <div slot="header">
            <strong>{{ $t('order_tracking') }}</strong>
          </div>
           <b-table class="mb-0 table-outline" responsive="sm" hover :items="trackItems" :fields="trackFields" head-variant="light">
            <div slot="icon" class="avatar" slot-scope="item">
              <i :class="item.value.icon"></i>
            </div>
            <div slot="status" slot-scope="item">
              {{item.value.name}}
            </div>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      selected: [], // Must be an array reference!
         tableItems: [
        {
          image: { url: '/img/products/1.jpg', status: 'success' },
          productName: { name: 'Product 1' },
          price: '$ 330',
          qty: '1',
          total: '$ 330'
        },
        {
          image: { url: '/img/products/2.jpg', status: 'danger' },
          productName: { name: 'Product 2'},
          price: '$ 290',
          qty: '1',
          total: '$ 290',
        }
      ],
      tableFields: {
        image: {
          label: '',
          class: 'text-center'
        },
        productName: {
          label: 'Product Name'
        },
        price: {
          label: 'Price',
          class: 'text-center'
        },
        qty: {
          label: 'Qty',
          class: 'text-center'
        },
        total: {
          label: 'Total',
          class: 'text-center'
        }
      },
      trackItems: [
        {
          icon: { icon:'fa fa-cart-arrow-down' },
          status: { name: 'Order Comfirmed' },
          distributor: 'Distributor 1',
          dateTime: '31/07/2018 22:24:PM'
        },
        {
          icon: {  icon:'fa fa-server'},
          status: { name: 'Proccessing Order'},
          distributor: 'Distributor 2',
          dateTime: '31/07/2018 22:24:PM'
        },
        {
          icon: { icon:'fa fa-truck' },
          status: { name: 'Item Dispatched' },
          distributor: 'Distributor 3',
          dateTime: '31/07/2018 22:24:PM'
        },
        {
          icon: {  icon:'fa fa-archive'},
          status: { name: 'Order Delievered'},
          distributor: 'Distributor 4',
          dateTime: '31/07/2018 22:24:PM'
        }
      ],
      trackFields: {
        icon: {
          label: '',
          class: 'text-center'
        },
        status: {
          label: 'Status'
        },
        distributor: {
          label: 'Distributor',
          class: 'text-center'
        },
        dateTime: {
          label: 'Date/Time',
          class: 'text-center'
        }
      }
     }
  },
  methods: {
    click () {
      // do nothing
    }
  }
}
</script>
