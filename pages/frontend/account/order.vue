<template>
	<section>
		<main class="main">
        <div class="container-fluid">
          <div class="animated fadeIn"></div>
		  
			<div class="row">
        <div class="col-sm-12 col-xl-12">
          <div class="confirm-header">
            
            <div class="alert alert-success" role="alert" v-if="success"><h2>SU PEDIDO HA SIDO REALIZADO CON ÉXITO !</h2></div>
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
                      <div class="personal-detail-sec">
                        <ul>
                          <li v-if="address.location_name">Location  <span>{{address.location_name}}</span></li> 
                          <li v-if="address.address_line_1">Address Line 1  <span>{{address.address_line_1}}</span></li>
                          <li v-if="address.address_line_2">Address Line 2 <span>{{address.address_line_2}}</span></li>
                          <li v-if="address.address_line_3">Address Line 3 <span>{{address.address_line_3}}</span></li>
                          <li v-if="address.number">Number <span>{{address.number}}</span></li>
                          <li v-if="address.zip">ZIP  <span>{{address.zip}}</span></li>
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
                          <li>Order No. <span>{{ordertId}}</span></li>
                          <li v-if="order.total_price" >Order Total <span>{{order.total_price | price_raw }}</span></li> 
                          <li v-if="order.CANAL">CANAL <span>{{order.CANAL}}</span></li> 
                          <li v-if="order.CLASE_DOC">CLASE DOC <span>{{order.CLASE_DOC}}</span></li>
                          <li v-if="order.DEST_MCIA">DEST MCIA <span>{{order.DEST_MCIA}}</span></li>
                          <li v-if="order.FECHA">FECHA <span>{{order.FECHA}}</span></li>                          
                          <li v-if="order.ID_DEST_MCIA">ID DEST MCIA <span>{{order.ID_DEST_MCIA}}</span></li>
                           <li v-if="order.salesman_id">Salesman Id    <span>{{order.salesman_id}}</span></li>
                           <li v-if="order.comment">Comment   <span>{{order.comment}}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>                          <li v-if="order.ID_RESP_PAGO">ID RESP PAGO  <span>{{order.ID_RESP_PAGO}}</span></li>
                          <li v-if="order.ID_SOL">ID SOL <span>{{order.ID_SOL}}</span></li>
                          <li v-if="order.ORG_VTAS">ORG VTAS <span>{{order.ORG_VTAS}}</span></li>
                          <li v-if="order.PEDIDO_ECOMMERCE">PEDIDO ECOMMERCE  <span>{{order.PEDIDO_ECOMMERCE}}</span></li>
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
                      <div class="personal-detail-sec">
                        <ul>
                          <li v-if="payment.payment_type">Payment Type  <span v-if="payment.payment_type">{{payment.payment_type}}</span></li> 
                          <li v-if="payment.payment_method">Método de pago  <span>{{payment.payment_method}}</span></li>
                          <li v-if="payment.txn_id">Transaction Id  <span>{{payment.txn_id}}</span></li>
                          <li>Monto   <span>{{ payment.amount | price_raw }}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>
                          <li>Descuento   <span>{{payment.discount | price_raw }}</span></li>
                          <li>Fecha   <span>{{payment.txn_timestamp}}</span></li>
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
                            <th>Material</th>
                            <th>Description</th>
                            <th>CDIS</th>
                            <th>Product Quantity</th>
                            <th>Product Price</th>
                          </tr>
                        </thead>
                        <tbody v-if="items">
                          <tr v-for="(item, index) in items">
                            <td v-if="item.prodcut_detail">{{item.prodcut_detail.id}}</td>
                            <td v-if="item.prodcut_detail">{{item.prodcut_detail.material}}</td>
                            <td v-if="item.prodcut_detail">{{item.prodcut_detail.description_3}}</td>
                            <td v-if="item">{{ item.dist_center_code }}</td>
                            <td>{{item.product_qty}}</td>
                            <td v-html="$options.filters.price(item.product_price)"></td>
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
      <div class="row">
				<div class="col-md-2">
					<div class="print-btn-sec">
						<button class="btn btn-block btn-primary" type="button">Track order</button>
					</div>
				</div>
				<div class="col-md-6">
					<div class="print-btn-sec">
						Your Item is on the way. Tracking information will be available with in 24 hours.
					</div>
				</div>
				<div class="col-md-2">
					<div class="print-btn-sec">
						<button class="btn btn-block btn-primary" type="button">Return Order</button>
					</div>
				</div>
				<div class="col-md-2">
					<div class="print-btn-sec">
						<button class="btn btn-block btn-primary" type="button">Print</button>
					</div>
				</div>
			</div>
		</div>
      </main>
	</section>
</template>
<script>
export default {
    layout: 'frontend',
     middleware: 'frontend',
    data(){
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
	         console.log( response)
	      })
	      .catch(e => {
	        this.error =  e.response.data.message
	      })
	     },
	   }
	};
</script>