import axios from 'axios'

export const state = () => ({
  products: []
});

export const mutations = {
  storeProducts(state, data) {
    state.products = data;
  }
}

export const actions = { 
  async getProducts(store) {
    const res = await this.$axios.get('cart');
    store.commit('storeProducts', res.data.data.items.slice(0, 24));

    }
  } 
