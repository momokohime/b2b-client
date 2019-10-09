<template>
        <section>
      <div class="top-black-header">
      <div class="container header-sec">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="header-left">
              <ul>
                <li> <a href = "mailto: atencionaclientes@serva.com.mx"><i class="fa fa-envelope-o" aria-hidden="true"></i>atencionaclientes@serva.com.mx</a></li>
                <li> <a href="tel:01 800 506 58 96"><i class="fa fa-phone" aria-hidden="true"></i>01 800 506 58 96</a></li>
              </ul>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="header-left">
              <ul class="right-ul">
                <li v-if="isAuthenticated && !loggedInUser.is['BU']"> 
                    <nuxt-link  to="/dashboard">Dashboard<i class="fa fa-dashboard" aria-hidden="true"></i></nuxt-link>
                </li>
                <li> <nuxt-link to="/contactos">Busca Tu Cedis<i class="fa fa-map-marker" aria-hidden="true"></i></nuxt-link></li>
                <li>
                   <div class="navbar-item" v-if="isAuthenticated">
                    <a class="navbar-item" @click="logout" style="cursor: pointer;">Cerrar sesión<i class="fa fa-power-off" aria-hidden="true"></i></a>

                  </div>
                   <template v-else>
                    <nuxt-link  to="/login">Iniciar sesión<i class="fa fa-power-off" aria-hidden="true"></i></nuxt-link>
                  </template>
                </li>
                <li v-if="loggedInUser"> <nuxt-link v-if="loggedInUser.is.BU" class="navbar-item"  to="/account/profile">Perfil<i class="fa fa-user" aria-hidden="true"></i></nuxt-link></li>
                <li v-if="loggedInUser" data-v-step="cart-icon">
                 <nuxt-link to="/checkout" v-if="loggedInUser.is.BU"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    <span>{{ cartItems.length }} </span></nuxt-link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="logo-sec">
    <div class="container header-sec">
      <div class="row">
        <div class="col-md-3 col-sm-12 col-lg-3 logo">
          <!-- <nuxt-link to="/"><img class="img-fluid" src="~/assets/frontend/images/logo.png"></nuxt-link> -->
          <nuxt-link to="/"><img class="img-fluid" src="~/assets/images/logo-header.svg"></nuxt-link>
        </div>
        <div class="col-md-6 col-sm-12 col-lg-6 Search-bar search-form" data-v-step="codigo-description">
            <div class="form-group has-feedback">
              <label for="search" class="sr-only">Buscar</label>
             <b-form-input type="text" v-model="filters.search" v-on:keyup.enter="loadData()" placeholder="¿Qué buscamos hoy?"></b-form-input>
              <span v-on:click="loadData()"><i class="fa fa-search" aria-hidden="true"></i></span>
            </div>
        </div>
        <div class=" col-xs-12 col-md-3 col-sm-12 col-lg-3 product-sec">
        <div class="row">
          <div class="col-6 col-sm-6 col-md-6 col-lg-6">
            <div class="product-image"  ref="button" @click="toggle">
                <!-- <nuxt-link to="/categories"> -->
                  <img src="~/assets/frontend/images/productos-image.png">
                  <div class="product_text" >PRODUCTOS </div>
                <!-- </nuxt-link> -->
            </div>
             <ul class="product-nav" v-show="isOpen" 
               v-closable="{ exclude: ['button'], handler: 'onClose' }" >
             <li v-for="(department, index) in treeData">
                <nuxt-link @click.native="toggle" :to="{ path: '/products', query: { search: 'filter[department]='+department.department }}">{{department.department}}
                </nuxt-link>
                  <span v-b-toggle="'accordion-'+department.department" class="nav-arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
                  <b-collapse :id="'accordion-'+department.department" class="mt-2 sub-menu">
                  <ul>
                      <li
                      v-for="(category, ii) in department.categories">
                       <nuxt-link @click.native="toggle" :to="{ path: '/products', query: { search: 'filter[category_1]='+category.category }}">{{category.category}}</nuxt-link>
                          <span v-b-toggle="'accordion-'+category.category" class="nav-arrow"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
                          <b-collapse :id="'accordion-'+category.category" class="mt-2 sub-menu-last">
                            <ul>
                              <li
                              v-for="(subcategory, jj) in category.sub_categories">
                                <nuxt-link @click.native="toggle" :to="{ path: '/products', query: { search: 'filter[subcategory]='+subcategory.subcategory }}">{{subcategory.subcategory}}</nuxt-link>
                              </li>
                           </ul> 
                         </b-collapse>

                      </li>
                  </ul>
                </b-collapse>
              </li>
              <li><nuxt-link @click.native="toggle" to="/categories">
                  VER TODOS LOS DEPARTAMENTOS
                </nuxt-link> 
              </li>
            </ul> 

          </div>
          <div class="col-6 col-sm-6 col-md-6 col-lg-6">
            <div class="product-image">        
              <nuxt-link to="/brands">
                 <img src="~/assets/frontend/images/Marcas-image.png">
                <div class="product_text">MARCAS</div>
              </nuxt-link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
    <nav class="navbar navbar-expand-md navbar-light navigation-dark">
    <div class="container header-sec">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto cusmt_navbar col-xs-12 col-sm-12 col-md-6 col-lg-6">
          <li class="nav-item custm_nav active">
            Bienvenidos a Automotriz Serva
          </li>
        </ul>
        <ul class="navbar-nav col-xs-12 col-sm-12 col-md-6 col-lg-6 custm_logo">
        <li class="col-xs-12 col-sm-12 col-md-6 col-lg-6 mt-2 custm-nav">Conoce nuestras marcas exclusivas</li>
          
         <!-- <li class="nav-item active col-md-4 col-lg-2" v-for="brand in exclusiveBrands">
          <img @click="$router.push({ name: 'product_list',  query: { search: 'filter[brand]=' +brand.brand_identifier }})" class="img-fluid" :src="brand.brand_image">
         </li>
 --> 
          <li class="nav-item active col-md-4 col-lg-2">
          <img @click="$router.push({ name: 'product_list', query: { search: 'filter[brand]=ASER' }})"  class="img-fluid" src="~/assets/frontend/images/aser_logo.png">
          </li>
          <li class="nav-item col-md-4 col-lg-2">
           <img @click="$router.push({ name: 'product_list', query: { search: 'filter[brand]=IFUEL' }})" class="img-fluid" src="~/assets/frontend/images/ifuel-logo.png">
          </li>
          <li class="nav-item col-md-4 col-lg-2">
           <img @click="$router.push({ name: 'product_list', query: { search: 'filter[brand]=REGTIFIER' }})" class="img-fluid" src="~/assets/frontend/images/register-logo.png">
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <div class="breadcrumbs" v-if="crumbs.length">
      <ul class="container">
       <li>
          <nuxt-link to="/" >Automotriz Serva
             <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </nuxt-link>
       </li>
         <li v-for="(crumb, index) in crumbs">
            <nuxt-link :to="crumb.path" >{{crumb.text | lowercase }}
               <i class="fa fa-chevron-right" v-if="index != Object.keys(crumbs).length - 1" aria-hidden="true"></i>
            </nuxt-link>
         </li>
       </ul>
    </div>
  </section>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Cookies from 'js-cookie';
import directives from '~/utils/directives'

export default {
  name: 'f-header',
 data: () => {
      return {
        exclusiveBrands : [],
        crumbs : [],
        errors : [],
        treeData:[],
        isOpen: false,
        filters:{
          search:'',
          department:'',
          category_1:'',
          subcategory:'',
        }
    }
  },
  watch:{
    $route (to, from){
        this.fetchBreadcums()
        const last = Cookies.get('last_p_page')
        if(from.name == 'single_product' && to.name == 'product_list' && to.fullPath == last){
             console.log('No')
        }else if (from.name == 'product_list' && to.name == 'single_product'){
            console.log('No')
        } else{
            console.log('Yes')
            this.$store.commit('cart/clearCurrentPage')
        }        
  }},
  mounted()
  {
    this.fetchBrandData()
    this.fetchBreadcums()
  },
  computed: {
  ...mapGetters({
    isAuthenticated: 'isAuthenticated',
    loggedInUser: 'loggedInUser',
    cartItems: 'cart/cartItems',
  })
},
methods: {
     onClose () {
      this.isOpen = false
    },
    async logout() {
      this.$store.commit('cart/logout')
      this.$store.commit('products/logout')
      await this.$auth.logout();
      this.$router.push('/login')
    },
    toggle: function () {
      this.isOpen = !this.isOpen
    },
    fetchBrandData(){
      this.$axios.get(`exclusive_brands`)
      .then(response => {
        this.exclusiveBrands = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })

      this.$axios.get(`dept_category`)
      .then(response => {
        this.treeData = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })

    },
    fetchBreadcums(){
      var url = this.$route.fullPath
      this.$axios.get(`breadcrumbs?url=`+url)
      .then(response => {
        this.crumbs = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })

    },
    fetchproducts(key,title){
          var queryString = 'filter['+key+']='+title;
          this.$router.push({ name: 'product_list',  query: { search: queryString }})
    },
    loadData(){
      // var queryString = Object.keys(this.filters).map(key => 'filter[' +key + ']=' + ((!this.filters[key]) ? '' : this.filters[key])).join('&');
      if(!this.filters.search) return

      var queryString = 'search='+this.filters.search

      this.$router.push({ name: 'product_list',  query: { search: queryString }})
      if(this.$route.name == 'product_list'){

       }
    }
  }
};

</script>
<style type="text/css">
.product-image{
  cursor: pointer;
}
.product-nav li a {
    color: #FF6600;
    font-size: 12px;
    line-height: 15px;
    text-decoration:none;
}
.product-nav {
    position: absolute;
    background: #fff;
    text-align: left;
    width: 350px;
    color: #003da6;
    z-index: 100;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
    max-height: 460px;
    overflow: auto;
    padding: 0px 15px 0;
}
.sub-menu li a{
    color: #000;
}
.sub-menu-last li a {
    color: #003DA6 !important;
}
.product-nav li{
  list-style: none;
   padding: 10px 0 0;
}
.product-nav .nav-arrow {
    float: right;
    font-size: 10px;
    margin-top: 6px;
    width: 20px;
    height: 20px;
    text-align: right;
    display: inline-block;
}
.nav-arrow i {
    transform: rotate(0deg);
}
.nav-arrow.collapsed i {
    transform: rotate(-90deg);
}

.breadcrumbs li {
    text-transform: capitalize;
    color: #ccc;

 }
.breadcrumbs li a i {
    padding: 0px 8px;
    font-size: 9px;
}
.breadcrumbs li a {
    float: left;
    margin-right: 3px;
    font-size: 10px;
    font-weight: 300;
    color: #606060;
}

.breadcrumbs ul{
  list-style: none;
  display: flex;
  padding: 0px;
  margin: 0px auto;
}
.breadcrumbs {
    padding: 17px 0px;
    border: 1px solid rgba(151,151,151,0.2);
}
.Search-bar span{
  cursor: pointer;
}
</style>