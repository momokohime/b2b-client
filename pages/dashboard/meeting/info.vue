<template>
  <b-card :header="caption" class="table-sec-new edit-table">
    <div class="c-info">
       <div class="row">
          <div class="col-md-4 card-new-sec">
             <div class="row">
                 <div class="col-sm-12 col-xl-12">
                    <div class="new-personal-sec">
                      <h5> Informacion del Cliente</h5>
                    </div>
                 </div>
                 
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                          <ul>
                           <li >ID del cliente  <span v-if="client.KUNNR" >{{client.KUNNR}}</span></li> 
                           <li >ID ANTERIOR <span v-if="client.ID_ANTERIOR" >{{client.ID_ANTERIOR}}</span></li> 
                           <li >RFC <span v-if="client.RFC" >{{client.RFC}}</span></li> 
                           <li >CÓDIGO POSTAL <span v-if="client.COD_POST" >{{client.COD_POST}}</span></li> 
                           <li >ESTADO <span v-if="client.ESTADO" >{{client.ESTADO}}</span></li> 
                         </ul>
                      </div>
                   </div>
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                          <ul>
                           <li>NOMBRE  <span v-if="client.NOMBRE">{{client.NOMBRE}}</span></li> 
                           <li>GRUPO  <span v-if="client.KONDA">{{client.KONDA}}</span></li> 
                           <li>CALLE <span v-if="client.CALLE_NUM">{{client.CALLE_NUM}}</span></li> 
                           <li>COLONIA <span v-if="client.COLONIA">{{client.COLONIA}}</span></li> 
                           <li>PAIS <span v-if="client.MONEDA">{{client.MONEDA}}</span></li> 
                         </ul>
                      </div>
                   </div>
             </div>
          </div>
          <div class="col-md-4 card-new-sec">
             <div class="row">
                 <div class="col-sm-12 col-xl-12">
                    <div class="new-personal-sec">
                      <h5> Informacion del Personal</h5>
                    </div>
                 </div>
                 
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                          <ul>
                           <li >CORREO <span v-if="client.EMAIL" >{{client.EMAIL}}</span></li> 
                           <li >CDIS <span v-if="client.CENTROCENTRO" >{{client.CENTRO}}</span></li> 
                           <li >RUTA <span v-if="client.GPO_VEND" >{{client.GPO_VEND}}</span></li> 
                         </ul>
                      </div>
                   </div>
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                          <ul>
                           <li>TELÉFONO  <span v-if="client.TEL">{{client.TEL}}</span></li> 
                           <li>ORGANIZACIÓN DE VENTA  <span v-if="client.VTEXT1">{{client.VTEXT1}}</span></li> 
                         </ul>
                      </div>
                   </div>
             </div>
          </div> 

          <div class="col-md-4 card-new-sec">
             <div class="row">
                 <div class="col-sm-12 col-xl-12">
                    <div class="new-personal-sec">
                      <h5> Información de venta</h5>
                    </div>
                 </div>
                 
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                          <ul>
                            <div v-for="(sale,key) in salesman" >
                               <li >ID Vendedor  <span v-if="sale.KUNN2">{{sale.KUNN2}}</span></li>
                            </div>
                            <div v-for="(telemarket,key) in telemarketing" >
                               <li >ID TELEMARKETING  <span v-if="telemarket.KUNN2">{{telemarket.KUNN2}}</span></li>
                            </div>
                         </ul>
                      </div>
                   </div>
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                          <ul>
        
                            <div v-for="(sale,key) in salesman" >
                               <li >NOMBRE Vendedor  <span v-if="sale.NOMBRE">{{sale.NOMBRE}}</span></li>
                            </div>
                             <div v-for="(telemarket,key) in telemarketing" >
                               <li >NOMBRE TELEMARKETING  <span v-if="telemarket.NOMBRE">{{telemarket.NOMBRE}}</span></li>
                            </div>
                         </ul>
                      </div>
                   </div>
             </div>
          </div>  
        </div>
        <div class="row">
          <div class="col-md-4 card-new-sec">
             <div class="row" v-if="credit">
                 <div class="col-sm-12 col-xl-12" >
                    <div class="new-personal-sec">
                      <h5>INFORMACIÓN DE CRÉDITO</h5>
                    </div>
                 </div>
                 
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                          <ul>
                            <li>LÍMITE DE CRÉDITO  <span v-if="credit.LimiteCredito" v-html="$options.filters.price(credit.LimiteCredito)"></span></li> 
                            <li>CRÉDITO DISPONIBLE <span v-if="credit.CreditoExcedido" v-html="$options.filters.price(credit.CreditoExcedido)"></span></li> 
                         </ul>
                      </div>
                   </div>
                   <div class="col-sm-6 personal-col">
                      <div class="new-personal-sec">
                           <ul>
                              <li>CRÉDITO USADO  <span v-if="credit.TotalComprom" v-html="$options.filters.price(credit.TotalComprom)"></span></li>
                         </ul>
                      </div>
                   </div>
             </div>
          </div>
        </div>
  </div>
    <!-- <div class="row">
        <div class="col-sm-12 col-xl-12">
          <div class="cart-item-sec">
            <div class="card-body lower"> 
              <div class="row">
                <div class="col-sm-4 sec">
                   <h5> Client Info</h5>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">

                         <ul>
                         <li v-if="client.KUNNR">KUNNR  <span>{{client.KUNNR}}</span></li> 
                         <li v-if="client.VKORG">VKORG  <span>{{client.VKORG}}</span></li> 
                         <li v-if="client.VTEXT1">VTEXT1  <span>{{client.VTEXT1}}</span></li> 
                         <li v-if="client.VTWEG">VTWEG  <span>{{client.VTWEG}}</span></li> 
                         <li v-if="client.VTEXT2">VTEXT2  <span>{{client.VTEXT2}}</span></li> 
                       </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul> 
                         <li v-if="client.SPART">SPART  <span>{{client.SPART}}</span></li> 
                         <li v-if="client.VTEXT3">VTEXT3  <span>{{client.VTEXT3}}</span></li> 
                         <li v-if="client.PARVW">PARVW  <span>{{client.PARVW}}</span></li> 
                         <li v-if="client.VTEXT4">VTEXT4  <span>{{client.VTEXT4}}</span></li> 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                 <div class="col-sm-4 sec">
                   <h5> Client Adress</h5>
                  <div class="row">
                    
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">

                         <ul>
                         <li v-if="client.CALLE_NUM">CALLE_NUM  <span>{{client.CALLE_NUM}}</span></li> 
                         <li v-if="client.COLONIA">COLONIA  <span>{{client.COLONIA}}</span></li> 
                         <li v-if="client.MUNICIPIO">MUNICIPIO  <span>{{client.MUNICIPIO}}</span></li> 
                         <li v-if="client.COD_POST">COD_POST  <span>{{client.COD_POST}}</span></li> 
                         <li v-if="client.PAIS">PAIS  <span>{{client.PAIS}}</span></li> 
                       </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul> 
                         <li v-if="client.LANDX">LANDX  <span>{{client.LANDX}}</span></li> 
                         <li v-if="client.ESTADO">ESTADO  <span>{{client.ESTADO}}</span></li> 
                         <li v-if="client.BEZEI">BEZEI  <span>{{client.BEZEI}}</span></li> 
                         <li v-if="client.TEL">TEL  <span>{{client.TEL}}</span></li> 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 sec">
                   <h5> Applicant Info</h5>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">

                         <ul>
                         <li v-if="applicant.KUNNR">KUNNR  <span>{{applicant.KUNNR}}</span></li> 
                         <li v-if="applicant.VKORG">VKORG  <span>{{applicant.VKORG}}</span></li> 
                         <li v-if="applicant.VTEXT1">VTEXT1  <span>{{applicant.VTEXT1}}</span></li> 
                         <li v-if="applicant.VTWEG">VTWEG  <span>{{applicant.VTWEG}}</span></li> 
                         <li v-if="applicant.VTEXT2">VTEXT2  <span>{{applicant.VTEXT2}}</span></li> 
                       </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul> 
                         <li v-if="applicant.SPART">SPART  <span>{{applicant.SPART}}</span></li> 
                         <li v-if="applicant.VTEXT3">VTEXT3  <span>{{applicant.VTEXT3}}</span></li> 
                         <li v-if="applicant.PARVW">PARVW  <span>{{applicant.PARVW}}</span></li> 
                         <li v-if="applicant.VTEXT4">VTEXT4  <span>{{applicant.VTEXT4}}</span></li> 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
              <div class="card-body lower"> 
              <div class="row">
               
                 <div v-for="(sale,key) in salesman" class="col-sm-4 sec">
                   <h5> Salesman Info</h5>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">

                         <ul>
                         <li v-if="sale.KUNNR">KUNNR  <span>{{sale.KUNNR}}</span></li>
                         <li v-if="salesman.name">NAME  <span>{{sale.name}}</span></li>  
                         <li v-if="sale.VKORG">VKORG  <span>{{sale.VKORG}}</span></li> 
                         <li v-if="sale.VTEXT1">VTEXT1  <span>{{sale.VTEXT1}}</span></li> 
                         <li v-if="sale.VTWEG">VTWEG  <span>{{sale.VTWEG}}</span></li> 
                         
                       </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul>
                         <li v-if="sale.VTEXT2">VTEXT2  <span>{{sale.VTEXT2}}</span></li> 
                         <li v-if="salesman.SPART">SPART  <span>{{salesman.SPART}}</span></li> 
                         <li v-if="salesman.VTEXT3">VTEXT3  <span>{{salesman.VTEXT3}}</span></li> 
                         <li v-if="salesman.PARVW">PARVW  <span>Salesman</span></li> 
                         <li v-if="salesman.VTEXT4">VTEXT4  <span>{{salesman.VTEXT4}}</span></li>

                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
               <div class="col-sm-4 sec">
                   <h5> Payment Manager Info</h5>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">

                         <ul>
                         <li v-if="payment_manager.KUNNR">KUNNR  <span>{{payment_manager.KUNNR}}</span></li> 
                         <li v-if="payment_manager.VKORG">VKORG  <span>{{payment_manager.VKORG}}</span></li> 
                         <li v-if="payment_manager.VTEXT1">VTEXT1  <span>{{payment_manager.VTEXT1}}</span></li> 
                         <li v-if="payment_manager.VTWEG">VTWEG  <span>{{payment_manager.VTWEG}}</span></li> 
                         <li v-if="payment_manager.VTEXT2">VTEXT2  <span>{{payment_manager.VTEXT2}}</span></li> 
                       </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul> 
                         <li v-if="payment_manager.SPART">SPART  <span>{{payment_manager.SPART}}</span></li> 
                         <li v-if="payment_manager.VTEXT3">VTEXT3  <span>{{payment_manager.VTEXT3}}</span></li> 
                         <li v-if="payment_manager.PARVW">PARVW  <span>{{payment_manager.PARVW}}</span></li> 
                         <li v-if="payment_manager.VTEXT4">VTEXT4  <span>{{payment_manager.VTEXT4}}</span></li> 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
               <div class="col-sm-4 sec">
                   <h5> Invoice Recipient Info</h5>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">

                         <ul>
                         <li v-if="invoice_recipient.KUNNR">KUNNR  <span>{{invoice_recipient.KUNNR}}</span></li> 
                         <li v-if="invoice_recipient.VKORG">VKORG  <span>{{invoice_recipient.VKORG}}</span></li> 
                         <li v-if="invoice_recipient.VTEXT1">VTEXT1  <span>{{invoice_recipient.VTEXT1}}</span></li> 
                         <li v-if="invoice_recipient.VTWEG">VTWEG  <span>{{invoice_recipient.VTWEG}}</span></li> 
                         <li v-if="invoice_recipient.VTEXT2">VTEXT2  <span>{{invoice_recipient.VTEXT2}}</span></li> 
                       </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul> 
                         <li v-if="invoice_recipient.SPART">SPART  <span>{{invoice_recipient.SPART}}</span></li> 
                         <li v-if="invoice_recipient.VTEXT3">VTEXT3  <span>{{invoice_recipient.VTEXT3}}</span></li> 
                         <li v-if="invoice_recipient.PARVW">PARVW  <span>{{invoice_recipient.PARVW}}</span></li> 
                         <li v-if="invoice_recipient.VTEXT4">VTEXT4  <span>{{invoice_recipient.VTEXT4}}</span></li> 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
            <div class="card-body lower"> 
              <div class="row">
               <div v-for="(telemarket,key) in telemarketing" class="col-sm-4 sec">
                   <h5> Telemarketing Info</h5>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">

                         <ul>
                         <li v-if="telemarket.KUNNR">KUNNR  <span>{{telemarket.KUNNR}}</span></li> 
                        <li v-if="telemarket.name">NAME  <span>{{telemarket.name}}</span></li> 
                         <li v-if="telemarket.VKORG">VKORG  <span>{{telemarketing.VKORG}}</span></li> 
                         <li v-if="telemarket.VTEXT1">VTEXT1  <span>{{telemarket.VTEXT1}}</span></li> 
                         <li v-if="telemarket.VTWEG">VTWEG  <span>{{telemarket.VTWEG}}</span></li> 
                         <li v-if="telemarket.VTEXT2">VTEXT2  <span>{{telemarket.VTEXT2}}</span></li> 
                       </ul>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="personal-detail-sec">
                        <ul> 
                         <li v-if="telemarket.SPART">SPART  <span>{{telemarket.SPART}}</span></li> 
                         <li v-if="telemarket.VTEXT3">VTEXT3  <span>{{telemarket.VTEXT3}}</span></li> 
                         <li v-if="telemarket.PARVW">PARVW  <span>Telemarketing</span></li> 
                         <li v-if="telemarket.VTEXT4">VTEXT4  <span>{{telemarket.VTEXT4}}</span></li> 
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  -->
 </b-card>
</template>

<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
 import axios from 'axios';
import { mapGetters } from 'vuex';
  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    props: {
      caption: {
        type: String,
        default: 'Customer Info'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        clientId: [],
        errors: [],
        client: [],
        credit: [],
        salesman: [],
        applicant: [],
        payment_manager: [],
        invoice_recipient: [],
        telemarketing: [],
      }
    },
    mounted() {
    this.clientId = this.$route.params.id;
    this.fetchClient()
    var success = this.$route.query.success
    if(typeof success != 'undefined') {
      this.success = true
    }
  },
  methods: {
    fetchClient(){
      this.$axios.get(`clients/client/info/`+this.clientId)
     .then(response => {
           var _r = response.data
           this.client = _r.client
           this.salesman = _r.salesman
           this.applicant = _r.applicant
           this.credit = _r.credit
           this.payment_manager = _r.payment_manager
           this.invoice_recipient = _r.invoice_recipient
           this.telemarketing = _r.telemarketing    

      })
      .catch(e => {
        this.error =  e.response.data.message
      })
     }
   }
  }
</script>
<style>
   .edit-table .table.b-table > thead > tr > th[aria-sort], .table.b-table > tfoot > tr > th[aria-sort] {
    font-size: 13px;
}
.table-sec-new .card{width:100%;}
.edit-table .table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    font-size: 14px;
}
  
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
    margin: 0px 0 15px 0
}
.personal-detail-sec ul li span {
    display: block;
    font-weight: 400;
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

.new-personal-sec h5 {
    text-align: center;
    padding: 13px 0 3px;
}
.new-personal-sec ul {
    list-style: none;
}
.new-personal-sec ul li {
    font-size: 13px;
    font-weight: 500;
    color: #fff;
    margin: 0px 0 40px 0;
    background: #5e5e5e;
    padding: 5px 10px 20px;
    position: relative;
}
.new-personal-sec ul li span {
    display: block;
    font-weight: 40;
    background: #fff;
    color: #5e5e5e;
    padding: 0;
    position: absolute;
    width: 100%;
    left: 0px;
    padding: 3px 5px;
    font-size: 12px;
}

.c-info .personal-col {
    padding: 0;
    border: 1px solid #ccc;
}
.card-new-sec {
    border: 1px solid #5c5c5c;
}
</style>