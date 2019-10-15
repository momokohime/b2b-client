import Vue from 'vue'
import Router from 'vue-router'

function page (path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then(m => m.default || m)
}

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
     { path: '/test', component: page('test') },
      { path: '/login', component: page('login') },
      { path: '/profile', component: page('profile') },
      { path: '/dashboard/settings', component: page('settings') },
      { path: '/signup', component: page('frontend/signup') },


      // Dashboard Route
      
      { path: '/dashboard', component: page('dashboard/index') },

      { path: '/dashboard/products', component: page('dashboard/products/index') },
      // { path: '/dashboard/products_test', component: page('dashboard/products/index_test') },
      { path: '/dashboard/products/edit/:id', component: page('dashboard/products/edit') },
      { path: '/dashboard/products/:id/application', component: page('dashboard/products/application'),name: 'product_application'},
      { path: '/dashboard/checkout', component: page('dashboard/products/checkout') },

      { path: '/dashboard/placeOrder', component: page('dashboard/products/orderplace'),name: 'order_place' },

      { path: '/dashboard/checkoutnpay', component: page('dashboard/orderpace2') },
      
      { path: '/dashboard/accounts', component: page('dashboard/accounts/index') },      
      //{ path: '/dashboard/accounts/:id/detail', component: page('dashboard/accounts/detail'),name: 'accunt_detail' }, 

      { path: '/dashboard/customers', component: page('dashboard/customers/index') },      
      { path: '/dashboard/customers/:id/info', component: page('dashboard/customers/info'),name: 'client_info' }, 

      { path: '/dashboard/users', component: page('dashboard/users/index') },
      { path: '/dashboard/users/add', component: page('dashboard/users/add') },
      { path: '/dashboard/users/:id/edit', component: page('dashboard/users/edit'), name:'user_edit'},

      { path: '/dashboard/coupons', component: page('dashboard/coupons/index') },
      { path: '/dashboard/coupons/add', component: page('dashboard/coupons/add') },
      { path: '/dashboard/coupons/:id/edit', component: page('dashboard/coupons/edit',),name: 'coupons_edit' },

      { path: '/dashboard/catalogs', component: page('dashboard/catalogs/index') },
      { path: '/dashboard/orders', component: page('dashboard/orders/index') },
      { path: '/dashboard/orders/:id/view', component: page('dashboard/orders/order-details'),name: 'order_details'},

      { path: '/dashboard/credits', component: page('dashboard/credits/index') },
      { path: '/dashboard/sales', component: page('dashboard/sales/index') },

      { path: '/dashboard/permissions', component: page('dashboard/permissions/index') },
      { path: '/dashboard/permissions/add', component: page('dashboard/permissions/add') },
      { path: '/dashboard/permissions/:id/edit', component: page('dashboard/permissions/edit'),name: 'permissions_edit'},

      { path: '/dashboard/roles', component: page('dashboard/roles/index') },
      { path: '/dashboard/roles/add', component: page('dashboard/roles/add') },
      { path: '/dashboard/roles/:id/edit', component: page('dashboard/roles/edit'),name: 'roles_edit'},

      { path: '/dashboard/salesman', component: page('dashboard/salesman/index') },
      { path: '/dashboard/salesman/add', component: page('dashboard/salesman/add') },
      { path: '/dashboard/salesman/:id/edit', component: page('dashboard/salesman/edit'),name: 'salesman_edit'},
      { path: '/dashboard/salesman/assign', component: page('dashboard/salesman/assign') },
      { path: '/dashboard/salesman/:id/detail', component: page('dashboard/salesman/detail'),name: 'salesman_detail'}, 
      { path: '/dashboard/job', component: page('dashboard/job/index.vue') },
      { path: '/dashboard/job/category', component: page('dashboard/job/category.vue') },
      { path: '/dashboard/job/add', component: page('dashboard/job/add') },

      // { path: '/dashboard/*', component: page('dashboard/comingsoon'), name: 'comingsoon'},
      { path: '/dashboard/supervisors', component: page('dashboard/supervisors/index') }, 
      { path: '/dashboard/supervisors/add', component: page('dashboard/supervisors/add') },
      { path: '/dashboard/supervisors/:id/edit', component: page('dashboard/supervisors/edit'),name: 'supervisors_edit'},
      { path: '/dashboard/supervisors/assign/clients', component: page('dashboard/supervisors/assign/clients') },
      { path: '/dashboard/supervisors/assign/salesman', component: page('dashboard/supervisors/assign/salesman') },
      { path: '/dashboard/supervisors/assign/telemarketers', component: page('dashboard/supervisors/assign/telemarketers') },
      { path: '/dashboard/supervisors/orders', component: page('dashboard/supervisors/orders') },
      { path: '/dashboard/supervisors/salesman', component: page('dashboard/supervisors/salesman') },
      { path: '/dashboard/supervisors/telemarketers', component: page('dashboard/supervisors/telemarketers') },
      { path: '/dashboard/supervisors/customers', component: page('dashboard/supervisors/customers') },
      { path: '/dashboard/supervisors/telemarketers/clients', component: page('dashboard/supervisors/telemarketers-clients') },
      { path: '/dashboard/supervisors/salesman/clients', component: page('dashboard/supervisors/salesman-clients') },
      { path: '/dashboard/supervisors/:id/:title', component: page('dashboard/supervisors/detail'),name: 'supervisors_detail'},

      { path: '/dashboard/telemarketers', component: page('dashboard/telemarketers/index') },
      { path: '/dashboard/tk_customers', component: page('dashboard/telemarketers/customers/index') },
      { path: '/dashboard/telemarketers/add', component: page('dashboard/telemarketers/create') },
      { path: '/dashboard/telemarketers/assign', component: page('dashboard/telemarketers/assign') },
      { path: '/dashboard/telemarketers/:id/detail', component: page('dashboard/telemarketers/detail'),name: 'tk_detail'}, 
      { path: '/dashboard/telemarketers/:id/edit', component: page('dashboard/telemarketers/edit'),name: 'telemarketers_edit'},
      
       { path: '/dashboard/quotes', component: page('dashboard/quotes/index') },
       { path: '/dashboard/quotes/:id/view', component: page('dashboard/quotes/quote-details'),name: 'quote_detail' },

      { path: '/dashboard/meeting', component: page('dashboard/meeting/index') },
      { path: '/dashboard/meeting/add', component: page('dashboard/meeting/add') },
      { path: '/dashboard/meeting/:id/edit', component: page('dashboard/meeting/edit'),name: 'meeting_edit'},
      { path: '/dashboard/meeting/:id/show', component: page('dashboard/meeting/show'),name: 'meeting_show'},


       { path: '/dashboard/report/customer', component: page('dashboard/report/customer.vue') },
       { path: '/dashboard/report/order', component: page('dashboard/report/orders.vue') },
       { path: '/dashboard/report/sales', component: page('dashboard/report/sales.vue') }, 
       { path: '/dashboard/report/brand', component: page('dashboard/report/brand.vue') },

      { path: '/dashboard/promotions', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/promotions/add', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/catalogs/categories', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/catalogs/categories/add', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/catalogs/tags', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/catalogs/tags/add', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/catalogs/attributes', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/catalogs/attributes/add', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/sales/sellers', component: page('dashboard/comingsoon/index')},
      { path: '/dashboard/sales/customers', component: page('dashboard/comingsoon/index')},



      //Frontend

      { path: '/', component: page('frontend/home/index.vue') },
      { path: '/categories', component: page('frontend/category/index.vue') },
      { path: '/products', component: page('frontend/products/index.vue') , name: 'product_list'},
      { path: '/products/:id/show', component: page('frontend/products/show.vue'), name: 'single_product' },
      { path: '/checkout', component: page('frontend/products/checkout.vue') },
      // { path: '/account', component: page('frontend/account/profile.vue') },

      { path: '/account/profile', component: page('frontend/account/profile.vue') },
      { path: '/account/wishlist', component: page('frontend/account/wishlist.vue') },
      { path: '/account/orders', component: page('frontend/account/orders.vue') },
      { path: '/account/favourites', component: page('frontend/account/favourites.vue') },
      { path: '/account/credit', component: page('frontend/account/credit.vue') },
      { path: '/account/orders/:id/view', component: page('frontend/account/order'),name: 'order_detail'},
      { path: '/account/statements', component: page('frontend/account/statementAccount.vue') },


      { path: '/distributors', component: page('frontend/distributor/listing.vue'),name: 'listing'},
      { path: '/quieres-ser-distribuidor', component: page('frontend/distributor/quieres-ser-distribuidor.vue')},
      { path: '/distributor/:id/detail', component: page('frontend/distributor/distributer-detail.vue'),name: 'distributer_detail'},

      { path: '/nosotros', component: page('frontend/about/nosotros.vue')},
      { path: '/preguntas-frecuentes', component: page('frontend/faq/preguntas-frecuentes.vue')},
      { path: '/aviso-de-privacidad', component: page('frontend/private-notice/aviso-de-privacidad.vue')},
      { path: '/contactos', component: page('frontend/contact/contactos.vue')},
      { path: '/jobs', component: page('frontend/job/jobs.vue')},
      { path: '/job-detail', component: page('frontend/job/job-detail'), name: 'job-detail'  },
      { path: '/garantias-y-devoluciones', component: page('frontend/returns/garantias-y-devoluciones.vue')},
      { path: '/catalogos', component: page('frontend/catalogs/catalogos.vue')},
      { path: '/registrarme', component: page('frontend/registrarme.vue')},

      { path: '/order/:id/view', component: page('frontend/products/order-view'),name: 'order_view'},
      { path: '/frontend/forgotPassword', component: page('frontend/forgotPassword')},

       { path: '/brands', component: page('frontend/brands/index.vue') },
       // { path: '/zoomer', component: page('frontend/products/zoomer.vue') },
        //{ path: '/products/:id/zoomer', component: page('frontend/products/zoomer.vue'), name: 'zoomer' },
    ]
  })
}