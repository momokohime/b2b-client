export default {
  cartItems (state) {
    return state.cartItems.filter(function(item){
      return item.qty > 0
    })
  },
  getCustomer(state) {
    return state.customer
  },
  getCoupon(state){
  	return state.getCoupon
  }
  
}
