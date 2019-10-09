<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      
      <template slot="view" slot-scope="data">
         <nuxt-link to="/dashboard/users/edit"><i class="icon-pencil icons"> </i></nuxt-link>
        </b-link>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>
</template>

<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */
 
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    props: {
      caption: {
        type: String,
        default: 'Users by Order Total'
      },
      hover: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    data: () => {
      return {
        boxTwo: '',
        items: shuffleArray([
          {name: 'Samppa Nori', orderTotal: '$ 1000',  numberOfOrders: '100'},
          {name: 'Estavan Lykos', orderTotal: '$ 999', numberOfOrders: '90'},
          {name: 'Chetan Mohamed', orderTotal: '$ 950', numberOfOrders: '80'},
          {name: 'Derick Maximinus', orderTotal: '$ 940',  numberOfOrders: '70'},
          {name: 'Friderik Dávid', orderTotal: '$ 930',  numberOfOrders: '60'},
          {name: 'Yiorgos Avraamu', orderTotal: '$ 930',  numberOfOrders: '50'},
          {name: 'Avram Tarasios', orderTotal: '$ 850',  numberOfOrders: '45'},
          {name: 'Quintin Ed', orderTotal: '$ 840', numberOfOrders: '40'},
          {name: 'Enéas Kwadwo', orderTotal: '$ 820', numberOfOrders: '35'},
          {name: 'Agapetus Tadeáš', orderTotal: '$ 750',  numberOfOrders: '30'},
          {name: 'Carwyn Fachtna', orderTotal: '$ 650',  numberOfOrders: '25'},
          {name: 'Nehemiah Tatius', orderTotal: '$ 550', numberOfOrders: '20'},
          {name: 'Ebbe Gemariah', orderTotal: '$ 450',numberOfOrders: '15'},
          {name: 'Eustorgios Amulius', orderTotal: '$ 350',  numberOfOrders: '10'},
          {name: 'Leopold Gáspár', orderTotal: '$ 250',  numberOfOrders: '10'},
          {name: 'Pompeius René', orderTotal: '$ 150',  numberOfOrders: '10'}
       ]),
        fields: [
          {key: 'name'},
          {key: 'numberOfOrders'},
          {key: 'orderTotal'},
          {key: 'view'}
        ],
        currentPage: 1,
        perPage: 15,
        totalRows: 0
      }
    },
    methods: {
      getRowCount (items) {
        return items.length
      }
    }
  }
</script>
