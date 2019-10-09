export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      acl: 'dashboard'
    },
    {
      name: 'Clientes',
      url: '/dashboard/customers',
      icon: 'icon-user',
      acl: 'clients',
      children: [
        {
          name: 'Todos lo Clientes',
          url: '/dashboard/customers',
          icon: 'icon-user',
          acl: 'clients'
        }
      ]
    },
    {
      name: 'Productos',
      url: '/dashboard/products',
      icon: 'fa fa-product-hunt',
      acl: 'products',
      children: [
        {
          name: 'Todos los productos',
          url: '/dashboard/products',
          icon: 'fa fa-product-hunt',
          acl: 'products'
        }
      ]
    },   
    {
      name: 'Ordenes',
      url: '/dashboard/orders',
      icon: 'fa fa-shopping-cart',
      acl: 'orders'

    }
  ]
}
