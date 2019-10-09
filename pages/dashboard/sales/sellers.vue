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
        default: 'Best Sellers'
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
          {name: 'Samppa Nori', totalAmount: '$ 1000',  totalQty: '100'},
          {name: 'Estavan Lykos', totalAmount: '$ 999', totalQty: '90'},
          {name: 'Chetan Mohamed', totalAmount: '$ 950', totalQty: '80'},
          {name: 'Derick Maximinus', totalAmount: '$ 940',  totalQty: '70'},
          {name: 'Friderik Dávid', totalAmount: '$ 930',  totalQty: '60'},
          {name: 'Yiorgos Avraamu', totalAmount: '$ 930',  totalQty: '50'},
          {name: 'Avram Tarasios', totalAmount: '$ 850',  totalQty: '45'},
          {name: 'Quintin Ed', totalAmount: '$ 840', totalQty: '40'},
          {name: 'Enéas Kwadwo', totalAmount: '$ 820', totalQty: '35'},
          {name: 'Agapetus Tadeáš', totalAmount: '$ 750',  totalQty: '30'},
          {name: 'Carwyn Fachtna', totalAmount: '$ 650',  totalQty: '25'},
          {name: 'Nehemiah Tatius', totalAmount: '$ 550', totalQty: '20'},
          {name: 'Ebbe Gemariah', totalAmount: '$ 450',totalQty: '15'},
          {name: 'Eustorgios Amulius', totalAmount: '$ 350',  totalQty: '10'},
          {name: 'Leopold Gáspár', totalAmount: '$ 250',  totalQty: '10'},
          {name: 'Pompeius René', totalAmount: '$ 150',  totalQty: '10'}
       ]),
        fields: [
          {key: 'name'},
          {key: 'totalQty'},
          {key: 'totalAmount'},
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
