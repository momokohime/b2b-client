<template>
  <div class="animated fadeIn">

    <div class="row">
        <div class="col-sm-12 col-xl-12">
          <div class="confirm-header">
            
            <div class="alert alert-success" role="alert" v-if="success"><h2>¡SU PEDIDO HA SIDO REALIZADO CON ÉXITO!</h2></div>
          </div>
          <div class="cart-item-sec">
            <div class="card-body"> 
              <div class="coupon-sec confirm-sec">
                <div class="row">
                  <div class="col-sm-4">
                    <h2>DATOS DE ENVÍO</h2>
                  </div>
                  <div class="col-sm-4">
                    <h2>DETALLES DE PEDIDO</h2>
                  </div>
                  <div class="col-sm-4">
                    <h2>DETALLES DEL PAGO</h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body lower"> 
              <div class="row">
                <div class="col-sm-4 sec">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec" v-if="address">
                        <ul>
                          <li v-if="address.location_name">UBICACIÓN  <span>{{address.location_name}}</span></li> 
                          <li v-if="address.address_line_1">DIRECCIÓN <span>{{address.address_line_1}}</span></li>
                          <li v-if="address.address_line_2">PAíS <span>{{address.address_line_2}}</span></li>
                          <li v-if="address.address_line_3">ESTADO<span>{{address.address_line_3}}</span></li>
                          <li v-if="address.number">TELÉFONO <span>{{address.number}}</span></li>
                          <li v-if="address.zip">COD POST  <span>{{address.zip}}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>
                          <li>SOLICITANTE <span>{{order.SOLICITANTE}}</span></li>
                          <!-- <li>Zip <span>JohnDoe@gmail.com</span></li>
                          <li>Address  <span>JohnDoe@gmail.com</span></li>
                          <li>Company Phone <span>+122 344 333</span></li> -->
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 sec">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>
                          <li>NÚMERO DE ORDEN<span>{{ordertId}}</span></li>
                          <li v-if="order.total_price" >TOTAL DEL PEDIDO<span v-html="$options.filters.price(order.total_price)"></span></li> 
                          <li v-if="order.CANAL">CANAL <span>{{order.CANAL}}</span></li> 
                          <li v-if="order.CLASE_DOC">CLASE DOC <span>{{order.CLASE_DOC}}</span></li>
                          <li v-if="order.DEST_MCIA">DEST MCIA <span>{{order.DEST_MCIA}}</span></li>
                          <li v-if="order.FECHA">FECHA <span>{{order.FECHA}}</span></li>                          
                          <li v-if="order.ID_DEST_MCIA">ID DEST MCIA <span>{{order.ID_DEST_MCIA}}</span></li>
                          <li >ID VENDEDOR   <span>{{order.salesman_id}}</span></li>
                          <li v-if="order.comment">COMENTARIO   <span>{{order.comment}}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>                          <li v-if="order.ID_RESP_PAGO">ID RESP PAGO  <span>{{order.ID_RESP_PAGO}}</span></li>
                          <li v-if="order.ID_SOL">ID SOL <span>{{order.ID_SOL}}</span></li>
                          <li v-if="order.ORG_VTAS">ORG VTAS <span>{{order.ORG_VTAS}}</span></li>
                          <!-- <li v-if="order.PEDIDO_ECOMMERCE">PEDIDO ECOMMERCE  <span>{{order.PEDIDO_ECOMMERCE}}</span></li> -->
                          <li v-if="order.RESP_PAGO">RESP PAGO <span>{{order.RESP_PAGO}}</span></li>
                          <li v-if="order.SECTOR">SECTOR <span>{{order.SECTOR}}</span></li>
                          <li v-if="order.SOLICITANTE">SOLICITANTE <span>{{order.SOLICITANTE}}</span></li> 
                          <li>Articulos Totales <span>{{order.total_items}}</span></li> 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 sec">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec" v-if="payment">
                        <ul>
                          <li v-if="payment.payment_type">TIPO DE PAGO  <span>{{payment.payment_type}}</span></li> 
                          <li v-if="payment.payment_method">MÉTODO DE PAGO  <span>{{payment.payment_method}}</span></li>
                          <li v-if="payment.txn_id">TRANSACCIÓN Id  <span>{{payment.txn_id}}</span></li>
                          <li>CANTIDAD   <span>{{payment.amount}}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec" v-if="payment">
                        <ul>
                          <li>DESCUENTO   <span>{{payment.discount}}</span></li>
                          <li>FECHA   <span>{{payment.txn_timestamp}}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="cart-item-sec product-listing-sec">
            <div class="card-body"> 
              <div class="coupon-sec confirm-sec">
                <div class="row">
                  <div class="col-sm-12">
                    <h2>LISTADO DE PRODUCTOS</h2>
                  </div>
                </div>
              </div>
            </div>
                      
            <div class="card-body lower"> 
              <div class="row"> 
                <div class="col-sm-12">
                  <div class="card">
                    <div class="card-body">
                      <table class="table table-responsive-sm">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>CóDIGO</th>
                            <th>DESCRIPCIóN</th>
                            <th>CDIS</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                          </tr>
                        </thead>
                        <tbody v-if="items">
                          <tr v-for="(item, index) in items">
                            <td v-if="item.prodcut_detail">{{item.prodcut_detail.id}}</td>
                            <td v-if="item.prodcut_detail">{{item.prodcut_detail.material}}</td>
                            <td v-if="item.prodcut_detail">{{item.prodcut_detail.description_3}}</td>
                            <td v-if="item">{{ item.dist_center_code }}</td>
                            <td>{{item.product_qty}}</td>
                            <td v-html="$options.filters.price(item.product_price*item.product_qty)"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- <div class="print-btn-sec">
            <button class="btn btn-block btn-primary" type="button">Print</button>
          </div> -->
        </div>
      </div>    
  </b-card>
</div>
</template>

<script>

export default {
  name: 'forms',
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return { 
      error: null,
      success: false,
      ordertId: null,
      address:[],
      payment:[],
      order:[],
      items:[]
    }
  },
    mounted() {
    this.ordertId = this.$route.params.id;
    this.fetchOrder()
    var success = this.$route.query.success
    if(typeof success != 'undefined') {
      this.success = true
    }
  },
  methods: {
    fetchOrder(ctx, callback){
      this.$axios.get(`orders/order/`+this.ordertId)
     .then(response => {
         this.order = response.data.data
         this.items = response.data.data.products
         this.payment = response.data.data.payment
         this.address = response.data.data.address

      })
      .catch(e => {
        this.error =  e.response.data.message
      })
     },
   }
};
</script>
<style type="text/css">
  
.table table {
    width: 100%;
}
.listing ul li {
    text-align: right;
    border-bottom: 1px solid #ccc;
    padding: 10px;
}
.listing ul li strong {
    text-align: left;
    float: left;
}
.listing ul {
    list-style: none;
}

/*--confirmation-Page--*/

.personal-detail-sec ul {
    list-style: none;
  padding:0;
}
.personal-detail-sec ul li {
    font-size: 16px;
    font-weight: 600;
    color: #5e5e5e;
    margin: 0px 0 15px 0;
	text-align: left;
    float: left;
}
.personal-detail-sec ul li span {
    display: block;
    font-weight: 400;
	font-size:14px;
}
.card-body.lower {
    border-top: 1px solid #ccc;
}
.coupon-sec.confirm-sec h2 {
    text-transform: uppercase;
    font-size: 21px;
    margin: 0;
}
.confirm-header {
    padding: 50px 0 30px;
}
.print-btn-sec {
    margin: 40px 0px 80px;
}
.print-btn-sec button {
    width: auto;
    margin-left: auto;
}
.cart-item-sec.product-listing-sec {
    margin: 40px 0 0 0;
}
.card-body.lower .sec:last-child {
    border: none;
}
.card-body.lower .sec {
    border-right: 2px solid #ccc;
}
/*--confirmation-Page--*/


</style>>