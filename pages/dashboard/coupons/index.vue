<template>
  <section>
  <b-row>
      <b-col sm="5">
      </b-col>
      <b-col sm="7" class="d-none d-md-block">
         <b-button variant="primary" class="m-2 float-right" @click="$router.push('coupons/add')" >{{ $t('add_coupon') }}</b-button>
      </b-col>
  </b-row>
  <b-card :header="caption">
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="coupons" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="status" slot-scope="data">
          <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
        </template>
        <template slot="Acción" slot-scope="data">
            <nuxt-link :to="{ name: 'coupons_edit', params: { id: data.item.id }}"><i class="icon-pencil icons"> </i></nuxt-link>
           <b-link href="" @click="delCustomer(data.item.id)"><i class="icon-trash icons  "></i>
          </b-link>
        </template>
    </b-table>
    <nav>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
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
        default: 'Cupones'
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
        coupons:[],
        fields: [
          {
            label:'No.',
            key: 'id',
            sortable: true
          },
          {
            label:'Nombre',
            key: 'name',
            sortable: true
          },
          {
            label:'Código',
            key: 'code',
            sortable: true
          },
          {
            label:'Tipo cupón',
            key: 'type',
            sortable: true
          },
          {
            label:'Valor',
            key: 'value',
            sortable: true
          },
          {
            label:'Estatus cupón',
            key: 'status_text',
            sortable: true
          },
          {
            label:'Fecha inicio',
            key: 'start_date',
            sortable: true
          },
          {
            label:'Fecha fin',
            key: 'end_date',
            sortable: true
          },
          {
            key: 'Acción'
          }
        ],
        currentPage: 1,
        perPage: 15,
        totalRows: 0
      }
    },
    mounted() {
        this.fetchCoupons();
    },
    methods: {
      getBadge (status) {
        return status === 'Active' ? 'success'
          : 'secondary'
      },
      fetchCoupons() {
         this.$axios.get(`coupons`)
         .then(response => {
        // JSON responses are automatically parsed.
         this.coupons = response.data.data;
         this.totalRows   = response.data.data.length;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })        
      },
      delCustomer(id) {
        this.boxTwo = ''
        this.$bvModal.msgBoxConfirm('Por favor confirma que quierees eliminar cupón. ', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'SI',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value == true)
            this.$axios.delete('coupons/'+id)
           .then(response => { 
                 this.coupons = this.coupons.filter((e)=>e.id !== id )
                })
                .catch(e => {
                  this.error = e.response.data.message;
                })
          })
          .catch(err => {
            // An error occurred
          })
      }
    }
  }
</script>
