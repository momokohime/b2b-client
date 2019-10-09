<template>
  <section>

  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="actions" slot-scope="data">
          <nuxt-link to="/dashboard/promotions/edit"><i class="icon-pencil icons"> </i></nuxt-link>
         <b-link href="" @click="delCustomer"><i class="icon-trash icons  "></i>
        </b-link>
      </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </b-card>

</section>
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
        default: 'Promotions'
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
          {name: 'Promotion 1', startDate: '14/06/2019', endDate: '14/06/2019'},
          {name: 'Promotion 2', startDate: '14/06/2019', endDate: '14/06/2019'},
          {name: 'Promotion 3', startDate: '14/06/2019', endDate: '14/06/2019'},
          {name: 'Promotion 4', startDate: '14/06/2019', endDate: '14/06/2019'},
          {name: 'Promotion 5', startDate: '14/06/2019', endDate: '14/06/2019'},
          {name: 'Promotion 6', startDate: '14/06/2019', endDate: '14/06/2019'},
          {name: 'Promotion 7', startDate: '14/06/2019', endDate: '14/06/2019'},
          {name: 'Promotion 8', startDate: '14/06/2019', endDate: '14/06/2019'}
        ]),
        fields: [
          {key: 'name'},
          {key: 'startDate'},
          {key: 'endDate'},
          {key: 'actions'}
        ],
        currentPage: 1,
        perPage: 15,
        totalRows: 0
      }
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : 'secondary'
      },
      getRowCount (items) {
        return items.length
      },
      delCustomer() {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete Promotion.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            this.boxTwo = value
          })
          .catch(err => {
            // An error occurred
          })
      }
    }
  }
</script>
