export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      acl: 'dashboard',
      class: 'dashboard-link'
    },
    {
      name: 'Clientes',
      url: '/dashboard/customers',
      icon: 'icon-user',
      children: [
        {
          name: 'Todos los Clientes',
          url: '/dashboard/customers',
          icon: 'icon-user'
        },
        // {
        //   name: 'Add Customer',
        //   url: '/dashboard/customers/add',
        //   icon: 'icon-user'
        // }
      ]
    },
    {
      name: 'Usuarios',
      url: '/dashboard/users',
      icon: 'fa fa-users',
      children: [
        {
          name: 'Todos los Usuarios',
          url: '/dashboard/users',
          icon: 'fa fa-users'
        },
        {
          name: 'Crear Usuario',
          url: '/dashboard/users/add',
          icon: 'fa fa-users'
        }
      ]
    },
    {
      name: 'Vendedores',
      url: '/dashboard/salesman',
      icon: 'fa fa-user-plus',
      children: [
        {
          name: 'Todos los vendedores',
          url: '/dashboard/salesman',
          icon: 'fa fa-user-plus'
        },
        {
          name: 'Asignar Clientes',
          url: '/dashboard/salesman/assign',
          icon: 'fa fa-user-plus'
        }
      ]
    },
    {
      name: 'Telemarketing',
      url: '/dashboard/telemarketers',
      icon: 'fa fa-user-plus',
      children: [
        {
          name: 'Todos los Telemarketing',
          url: '/dashboard/telemarketers',
          icon: 'fa fa-user-plus'
        }, 
        {
          name: 'Asignar Clientes',
          url: '/dashboard/telemarketers/assign',
          icon: 'fa fa-user-plus'
        }       
      ]
    },
    /*{
      name: 'Cupones',
      url: '/dashboard/coupons',
      icon: 'fa fa-tags',
      children: [
        {
          name: 'Todos los cupones',
          url: '/dashboard/coupons',
          icon: 'fa fa-tags'
        },
        {
          name: 'Crear cupones',
          url: '/dashboard/coupons/add',
          icon: 'fa fa-tags'
        }
      ]
    },*//*{
      name: 'Promociones',
      url: '/dashboard/promotions',
      icon: 'fa fa-tags',
      children: [
        {
          name: 'Todas las promociones',
          url: '/dashboard/promotions',
          icon: 'fa fa-tags'
        },
        {
          name: 'Crear promoción',
          url: '/dashboard/promotions/add',
          icon: 'fa fa-tags'
        }
      ]
    },*/
    {
      name: 'Productos',
      url: '/dashboard/products',
      icon: 'fa fa-product-hunt',
      children: [
        {
          name: 'Todos los productos',
          url: '/dashboard/products',
          icon: 'fa fa-product-hunt'
        }
      ]
    },
  /*  {
      name: 'Catálogo',
      url: '/dashboard/catalogs',
      icon: 'fa fa-dedent',
      children: [
            {
               name: 'Categorías',
               url : '/dashboard/catalogs/categories',
               icon: 'fa fa-paperclip',
               children: [
                  {
                    name: 'Todos los Categorías',
                    url: '/dashboard/catalogs/categories',
                    icon: 'fa fa-paperclip'
                  },
                  {
                    name: 'Crear Categorías',
                    url: '/dashboard/catalogs/categories/add',
                    icon: 'fa fa-paperclip'
                  }
               ]
            }, 
            {
               name: 'Etiquetas',
               url : '/dashboard/catalogs/tags',
               icon: 'fa fa-tags',
               children: [
                    {
                    name: 'Todas las etiquetas',
                    url: '/dashboard/catalogs/tags',
                    icon: 'fa fa-tags'
                  },
                  {
                    name: 'Agregar etiqueta',
                    url: '/dashboard/catalogs/tags/add',
                    icon: 'fa fa-tags'
                  }
               ]
            }, 
            {
               name: 'Atributos',
               url : '/dashboard/catalogs/attributes',
               icon: 'fa fa-tag',
               children: [
                    {
                    name: 'Todos los Atributos',
                    url: '/dashboard/catalogs/attributes',
                    icon: 'fa fa-tag'
                  },
                  {
                    name: 'Crear Atributos',
                    url: '/dashboard/catalogs/attributes/add',
                    icon: 'fa fa-tag'
                  }
               ]
            }
      ]
    },*/
    {
      name: 'Órdenes',
      url: '/dashboard/orders',
      icon: 'fa fa-shopping-cart'
    },
    {
      name: 'Cotizaciones',
      url: '/dashboard/quotes',
      icon: 'fa fa-quote-left'
    },
   /* {
      name: 'Crédito',
      url: '/dashboard/credits',
      icon: 'fa-credit-card',
      children: [
        {
          name: 'Todos los créditos',
          url: '/dashboard/credits',
          icon: 'fa-credit-card'
        }
      ]
    },*/
    {
      name: 'Ventas',
      url: '/dashboard/sales',
      icon: 'fa fa-line-chart',
      children: [
        {
          name: 'Reportes de Ventas',
          url: '#',
          // url: '/dashboard/sales/sellers',
          icon: 'fa fa-line-chart'
        },
        // {
        //   name: 'Users By Order Total',
        //   // url: '/dashboard/sales/customers',
        //   icon: 'fa fa-line-chart'
        // }
      ]
    },
    /* {
      name: 'Permisos',
      url: '/dashboard/permissions',
      icon: 'fa fa-key',
      children: [
        {
          name: 'Todos los permisos',
          url: '/dashboard/permissions',
          icon: 'fa fa-key'
        }
      ]
    }, */{
      name: 'Roles',
      url: '/dashboard/roles',
      icon: 'fa fa-key',
      children: [
        {
          name: 'Todos los roles',
          url: '/dashboard/roles',
          icon: 'fa fa-key'
        }
      ]
    },{
      name: 'Reporte',
      url: '/dashboard/report/order',
      icon: 'fa fa-file',
      children: [
        
        {
          name: 'Informe de pedido',
          url: '/dashboard/report/order',
          icon: 'fa fa-user'
        },
        {
          name: 'Informes de ventas',
          url: '/dashboard/report/sales',
          icon: 'fa fa-user'
        },
        {
          name: 'Informes de clientes',
          url: '/dashboard/report/customer',
          icon: 'fa fa-user'
        }, {
          name: 'Informe de marca',
          url: '/dashboard/report/brand',
          icon: 'fa fa-user'
        }
      ]
    },
     {
      name: 'Estado De Cuenta',
      url: '/dashboard/accounts',
      icon: 'fa fa-line-chart',
    },
    /*{
      name: 'Trabajo',
      url: '/dashboard/job',
      icon: 'fa fa-tasks ',
         children: [
        
        {
          name: 'Todos los trabajos',
          url: '/dashboard/job',
          icon: 'fa fa-user'
        },
        {
          name: 'Categoría de Trabajo',
          url: '/dashboard/job/category',
          icon: 'fa fa-user'
        }
        
      ]
    }*/
   
  ]
}
