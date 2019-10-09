<template>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
      <template slot="actions" slot-scope="data">
         <nuxt-link to="/dashboard/catalogs/tags/edit"><i class="icon-pencil icons"> </i></nuxt-link>
         <b-link href="" @click="delCustomer"><i class="icon-trash icons  "></i>
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
        default: 'Customers'
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
          {name: 'Tag 1', registered: '2012/01/01',  status: 'Active'},
          {name: 'Tag 2', registered: '2012/02/01', status: 'Inactive'},
          {name: 'Tag 3', registered: '2012/02/01', status: 'Inactive'},
          {name: 'Tag 4', registered: '2012/03/01',  status: 'Inactive'}
        ]),
        fields: [
          {key: 'name'},
          {key: 'registered'},
          {key: 'status'},
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
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete customer.', {
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
