<template>
<div class="row">
        <div class="col-sm-12 col-xl-12">

          <div class="cart-item-sec">
            <div class="card-body lower"> 
              <div class="row">
                 <div class="col-sm-12 sec">
                    <h2>DETALLES DE LA COTIZACIÓN</h2>
                 </div>
              </div>
              <div class="row quote-detail-sec"> 
                <div class="col-sm-6">
                      <div class="">
                        <ul>
                          <li v-if="quote.user_id">ID de usuario
                        <span>{{quote.user_id}}</span></li> 
                          <li v-if="quote.cus_name">ID de cliente
                        <span>{{quote.customer_id}}</span></li> 
                          <li v-if="quote.cus_name">Nombre <span>{{quote.cus_name}}</span></li>
                          
                        </ul>
                      </div>
                </div>
                <div class="col-sm-6">
                    <div class="">
                      <ul>
                        <li v-if="quote.cus_email">Correo electrónico <span>{{quote.cus_email}}</span></li>
                        <li v-if="quote.cus_phone">Teléfono<span>{{quote.cus_phone}}</span></li>
                         <li v-if="quote.cus_description">Descripción<span>{{quote.cus_description}}</span></li>
                      </ul>
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
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                          </tr>
                        </thead>
                        <tbody v-if="items">
                          <tr v-for="(item, index) in items">
                            
                            <td v-if="item.product_id">{{item.product_id}}</td>
                            <td v-if="item.product_material">{{item.product_material}}</td>
                            <td v-if="item.product_TEXT1">{{item.product_TEXT1}}</td>
                            <td v-if="item.product_qty">{{item.product_qty}}</td>
                            <td v-if="item.product_price">{{item.product_price}}</td>

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
</template>
<script>
	 export default {
    layout: 'dashboard',
    name: 'dashboard',
    data: () => {
      return {
      	quote:[],
        items:[],
      }
  },
  mounted(){
  	this.fetchQuote()
    this.quotetId = this.$route.params.id;
  },

   methods: {
      fetchQuote(){
        var quoteID = this.$route.params.id
        this.$axios.get(`quotes/quote/`+quoteID)
       .then(response => {
       	this.items = response.data.data.products
        this.quote = response.data.data.quote
       	console.log(response.data.data);
          // JSON responses are automatically parsed.
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
  }
};
</script>
<style scoped>
  .quote-detail-sec ul {
    list-style: none;
  padding:0;
}
.quote-detail-sec ul li {
    font-size: 16px;
    font-weight: 600;
    color: #5e5e5e;
    margin: 0px 0 15px 0
}
.quote-detail-sec ul li span {
    display: block;
    font-weight: 400;
}
</style>