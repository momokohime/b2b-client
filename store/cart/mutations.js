export default {
  incQty (state, product) {
    console.log(product)
    product.qty++
    var index = state.cartItems.findIndex(cartItem => cartItem.id == product.id)
    if(index === -1) {
      state.cartItems.push(product)      
    } else {
      if(state.cartItems[index].qty > product.total_stock) {        
        alert('Cantidad seleccionada no disponible.');
        product.qty = product.total_stock
        // return false;
      }
      state.cartItems[index] = product
    }
    this.$axios.post('/sync_cart', { items: state.cartItems, customer: state.customer })
  },
  
  decQty (state, product) {
    if(product.qty > 0) {
      product.qty--
    }
    var index = state.cartItems.findIndex(cartItem => cartItem.id == product.id)
    state.cartItems[index] = product
    if(product.qty <= 0) {
      state.cartItems.splice(index, 1)
    }
    this.$axios.post('/sync_cart', { items: state.cartItems, customer: state.customer })
  },
  
  emptyCart(state) {
    state.cartItems = []  
  },
  setCustomer(state, customer) {
    state.customer = customer
     // this.$axios.post('/sync_cart', { items: [], customer: state.customer })
  },

  setCurrentPage(state, curentPage) {
   
    state.currentPage = curentPage
  },
  clearCurrentPage(state, curentPage) {
    state.currentPage = ""
  },

  setCoupon(state, coupon) {
    console.log(coupon);
    state.coupon = coupon
  },
  updateQty(state, product) {

    if(parseInt(product.qty) < 0) {
      product.qty = 0
    }
    console.log(product.qty);
    var index = state.cartItems.findIndex(cartItem => cartItem.id == product.id)
    if(index === -1) {
      state.cartItems.push(product)      
    } else {
      if(state.cartItems[index].qty > product.total_stock) {
        alert('Cantidad seleccionada no disponible.');
        product.qty = product.total_stock
        // return false;
      }
      state.cartItems[index] = product
    }
    this.$axios.post('/sync_cart', { items: state.cartItems, customer: state.customer })
  },

  deleteProduct(state, product){
    var index = state.cartItems.findIndex(cartItem => cartItem.id == product.id)
    state.cartItems.splice(index, 1)
    this.$axios.post('/sync_cart', { items: state.cartItems, customer: state.customer })
  },

  syncCart(state, response) {   
    state.cartItems = response.cart_items
    state.customer = response.customer
    // items.forEach(function(product){
    //     var index = state.cartItems.findIndex(cartItem => cartItem.id == product.id)
    //     if(index === -1) {
    //       state.cartItems.push(product)      
    //     } else {          
    //       state.cartItems[index] = product
    //     }
    // })
  },
  
  logout(state) {
    state.cartItems = []
    state.customer = ''
    state.list = []
    state.coupon = ''
  }
}
