<template>
	<section>
		<main class="main">
        <div class="container-fluid">
          <div class="animated fadeIn"></div>
		  
			<div class="row">
        <div class="col-sm-12 col-xl-12">
          <div class="confirm-header">
            
            <div class="alert alert-success" role="alert" v-if="success"><h2>¡SU PEDIDO HA SIDO REALIZADO CON ÉXITO !</h2></div>
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
                          <li v-if="address.location_name">Ubicación  <span>{{address.location_name}}</span></li> 
                          <li v-if="address.address_line_1">Dirección Línea 1  <span>{{address.address_line_1}}</span></li>
                          <li v-if="address.address_line_2">Dirección Línea 2 <span>{{address.address_line_2}}</span></li>
                          <li v-if="address.address_line_3">Dirección Línea 3 <span>{{address.address_line_3}}</span></li>
                          <li v-if="address.number">Número<span>{{address.number}}</span></li>
                          <li v-if="address.zip">C.P.  <span>{{address.zip}}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>
                          <li>SOLICITANTE <span>{{order.SOLICITANTE}}</span></li>
                          <!-- <li>C.P. <span>JohnDoe@gmail.com</span></li>
                          <li>Dirección <span>JohnDoe@gmail.com</span></li>
                          <li>Teléfono compañía <span>+122 344 333</span></li> -->
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
                          <li>No. Orden<span>{{ordertId}}</span></li>
                          <li v-if="order.total_price" >Total orden <span>{{order.total_price | price_raw }}</span></li> 
                          <li v-if="order.CANAL">CANAL <span>{{order.CANAL}}</span></li> 
                          <li v-if="order.CLASE_DOC">CLASE DOC <span>{{order.CLASE_DOC}}</span></li>
                          <li v-if="order.DEST_MCIA">DEST MCIA <span>{{order.DEST_MCIA}}</span></li>
                          <li v-if="order.FECHA">FECHA <span>{{order.FECHA}}</span></li>                          
                          <li v-if="order.ID_DEST_MCIA">ID DEST MCIA <span>{{order.ID_DEST_MCIA}}</span></li>
                          <li v-if="order.salesman_id">Id vendedor    <span>{{order.salesman_id}}</span></li>
                           <li v-if="order.comment">Comentario  <span>{{order.comment}}</span></li>
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
                          <li v-if="payment.payment_type">Tipo de pago  <span>{{payment.payment_type}}</span></li> 
                          <li v-if="payment.payment_method">Método de pago  <span>{{payment.payment_method}}</span></li>
                          <li v-if="payment.txn_id">Id transacción  <span>{{payment.txn_id}}</span></li>
                          <li>Monto   <span>{{ payment.amount | price_raw }}</span></li>
                        </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>
                          <li>Descuento  <span>{{payment.discount | price_raw }}</span></li>
                          <li>Fecha  <span>{{payment.txn_timestamp}}</span></li>
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
                            <th>Descripción</th>
                            <th>CDIS</th>
                            <th>Product Cantidad</th>
                            <th>Product Precio</th>
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
            <button class="btn btn-block btn-primary" type="button">Imprimir</button>
          </div> -->
        </div>
      </div> 
      <div class="row">
				<div class="col-md-2">
					<div class="print-btn-sec">
						<button class="btn btn-block btn-primary" type="button">Seguir orden</button>
					</div>
				</div>
				<div class="col-md-6">
					<div class="print-btn-sec">
						Tu pedido está en camino.  La información de seguimiento estará disponible en 24 horas.
					</div>
				</div>
				<div class="col-md-2">
					<div class="print-btn-sec">
						<button class="btn btn-block btn-primary" type="button">Regresar a orden</button>
					</div>
				</div>
				<div class="col-md-2">
					<div class="print-btn-sec">
						<button class="btn btn-block btn-primary" type="button">Imprimir</button>
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
	         console.log( response.data)
	      })
	      .catch(e => {
	        this.error =  e.response.data.message
	      })
	     },
	   }
	};
</script>