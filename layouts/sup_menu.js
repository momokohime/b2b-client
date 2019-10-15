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
          url: '/dashboard/supervisors/customers',
          icon: 'icon-user'
        },{
          name: 'Asignar Clientes a Vendedors',
          url: '/dashboard/supervisors/salesman/clients',
          icon: 'fa fa-user-plus'
        } , {
          name: 'Asignar Clientes a Telemarketing',
          url: '/dashboard/supervisors/telemarketers/clients',
          icon: 'fa fa-user-plus'
        } , 
      ]
    },
    {
      name: 'Vendedores',
      url: '/dashboard/supervisors/salesman',
      icon: 'fa fa-user-plus',
    },
    {
      name: 'Telemarketing',
      url: '/dashboard/supervisors/telemarketers',
      icon: 'fa fa-user-plus',
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
      name: 'Órdenes',
      url: '/dashboard/supervisors/orders',
      icon: 'fa fa-shopping-cart'
    },
    // {
    //   name: 'Cotizaciones',
    //   url: '/dashboard/quotes',
    //   icon: 'fa fa-quote-left'
    // },
    // {
    //   name: 'Ventas',
    //   url: '/dashboard/sales',
    //   icon: 'fa fa-line-chart',
    //   children: [
    //     {
    //       name: 'Reportes de Ventas',
    //       url: '#',
    //       // url: '/dashboard/sales/sellers',
    //       icon: 'fa fa-line-chart'
    //     },
    //   ]
    // },
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
    //  {
    //   name: 'Estado De Cuenta',
    //   url: '/dashboard/accounts',
    //   icon: 'fa fa-line-chart',
    // },
   
  ]
}
