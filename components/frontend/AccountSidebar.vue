<template>
  
  <div class="col-md-3 col-sm-3 col-lg-3 col-12">
  <div class="sidebar frontend">
      <nav class="sidebar-nav">
            <ul class="nav">
              <li class="nav-item">
                  <nuxt-link class="nav-link" to="/account/profile">
                  <i class="fa fa-user"></i> Perfil
                </nuxt-link>
              </li>
              <li class="nav-item">
                   <nuxt-link class="nav-link" to="/account/credit">
                  <i class="fa fa-usd"></i> Crédito
                </nuxt-link>
              </li>
              <li class="nav-item">
                   <nuxt-link class="nav-link" to="/account/orders">
                  <i class="fa fa-usd"></i> Mis ordenes
                </nuxt-link>
              </li>
              <li class="nav-item">
                   <nuxt-link class="nav-link" to="/account/wishlist">
                  <i class="fa fa-star"></i> Lista de deseos
               </nuxt-link>
              </li>
               <li class="nav-item">
                   <nuxt-link class="nav-link" to="/account/favourites">
                  <i class="fa fa-heart"></i> Favoritos
               </nuxt-link>
              </li>

               <li class="nav-item">
                   <nuxt-link class="nav-link" to="/account/statements">
                  <i class="fa fa-line-chart"></i> Estado De Cuenta
               </nuxt-link>
              </li>
           </ul>
      </nav>
  </div>
</div>
</template>