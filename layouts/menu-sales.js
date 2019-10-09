export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Clientes',
      url: '/dashboard/customers',
      icon: 'icon-user',
      children: [
        {
          name: 'Todos lo Clientes',
          url: '/dashboard/customers',
          icon: 'icon-user'
        }
      ]
    },
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
    // {
    //   name: 'Catalogs',
    //   url: '/dashboard/catalogs',
    //   icon: 'fa fa-dedent',
    //   children: [
    //         {
    //            name: 'Categories',
    //            url : '/dashboard/catalogs/categories',
    //            icon: 'fa fa-paperclip',
    //            children: [
    //               {
    //                 name: 'All Categories',
    //                 url: '/dashboard/catalogs/categories',
    //                 icon: 'fa fa-paperclip'
    //               },
    //               {
    //                 name: 'Add Category',
    //                 url: '/dashboard/catalogs/categories/add',
    //                 icon: 'fa fa-paperclip'
    //               }
    //            ]
    //         }, 
    //         {
    //            name: 'Tags',
    //            url : '/dashboard/catalogs/tags',
    //            icon: 'fa fa-tags',
    //            children: [
    //                 {
    //                 name: 'All Tags',
    //                 url: '/dashboard/catalogs/tags',
    //                 icon: 'fa fa-tags'
    //               },
    //               {
    //                 name: 'Add Tag',
    //                 url: '/dashboard/catalogs/tags/add',
    //                 icon: 'fa fa-tags'
    //               }
    //            ]
    //         }, 
    //         {
    //            name: 'Attributes',
    //            url : '/dashboard/catalogs/attributes',
    //            icon: 'fa fa-tag',
    //            children: [
    //                 {
    //                 name: 'All Attributes',
    //                 url: '/dashboard/catalogs/attributes',
    //                 icon: 'fa fa-tag'
    //               },
    //               {
    //                 name: 'Add Attribute',
    //                 url: '/dashboard/catalogs/attributes/add',
    //                 icon: 'fa fa-tag'
    //               }
    //            ]
    //         }
    //   ]
    // },
    {
      name: 'Ordenes',
      url: '/dashboard/orders',
      icon: 'fa fa-shopping-cart'
    },
    {
      name: 'Cotizaciones',
      url: '/dashboard/quotes',
      icon: 'fa fa-quote-left'
    },
    {
      name: 'Ventas',
      url: '/dashboard/sales',
      icon: 'fa fa-line-chart',
      children: [
        {
          name: 'Best Sellers',
          url: '/dashboard/sales/sellers',
          icon: 'fa fa-line-chart'
        },
        {
          name: 'Users By Order Total',
          url: '/dashboard/sales/customers',
          icon: 'fa fa-line-chart'
        }
      ]
    },
    {
      name: 'Estado De Cuenta',
      url: '/dashboard/accounts',
      icon: 'fa fa-line-chart',
    },
    {
      name: 'Calendario de reuniones',
      url: '/dashboard/meeting',
      icon: 'fa fa-meetup',
    },
    {
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
  ]
}
