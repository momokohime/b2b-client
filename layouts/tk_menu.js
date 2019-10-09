export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Clientes',
      url: '/dashboard/tk_customers',
      icon: 'icon-user',
      children: [
        {
          name: 'Todos los Clientes',
          url: '/dashboard/tk_customers',
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
    {
      name: 'Ordenes',
      url: '/dashboard/orders',
      icon: 'fa fa-shopping-cart'
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
    // {
    //   name: 'Ventas',
    //   url: '/dashboard/sales',
    //   icon: 'fa fa-line-chart',
    //   children: [
    //     {
    //       name: 'Best Sellers',
    //       url: '/dashboard/sales/sellers',
    //       icon: 'fa fa-line-chart'
    //     },
    //     {
    //       name: 'Users By Order Total',
    //       url: '/dashboard/sales/customers',
    //       icon: 'fa fa-line-chart'
    //     }
    //   ]
    // },
    // {
    //   name: 'Estado De Cuenta',
    //   url: '/dashboard/accounts',
    //   icon: 'fa fa-line-chart',
    // },
    // {
    //   name: 'Calendario de reuniones',
    //   url: '/dashboard/meeting',
    //   icon: 'fa fa-meetup',
    // }
  ]
}
