<template>

  <section>
   <b-row>
      <b-col sm="5">
      </b-col>
      <b-col sm="7" class="d-none d-md-block">
         <b-button variant="primary" class="m-2 float-right" @click="$router.push('telemarketers/add')" >Agregar Telemarketing</b-button>
      </b-col>
    </b-row>

  <b-card :header="caption">
     <div class="alert alert-danger" role="alert" v-show="error">
      {{ error }}
    </div>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="salesman"  :fields="fields">
     
      <template slot="Acción" slot-scope="data">
          <nuxt-link :to="{ name: 'telemarketers_edit', params: { id: data.item.id }}"><i class="icon-pencil icons"> </i></nuxt-link>
         <b-link href="" @click="delSalesman(data.item.id)"><i class="icon-trash icons  "></i>
        </b-link>
        <nuxt-link :to="{ name: 'tk_detail', params: { id: data.item.id }}"><i class="icon-info icons"> </i></nuxt-link>
      </template>
    </b-table>
    <nav>
        <b-pagination
                :total-rows="totalRows"
                :current="currentPage"
                :simple="false"
                :per-page="perPage"
                order="is-right"
                @change="fetchRoles">
      </b-pagination>
    </nav>
  </b-card>

</section>
</template>


<script>
  /**
   * Randomize array element order in-place.
   * Using Durstenfeld shuffle algorithm.
   */

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    props: {
      caption: {
        type: String,
        default: 'Telemarketers'
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
        error: null,
        salesman: [],
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
              label:'Email',
              key: 'email',
              sortable: true
          },
          {
              label:'Fecha de creación',
              key: 'created_at'
          },
          {key: 'Acción'}
        ],
        currentPage: 0,
        perPage: 0,
        totalRows: 0
      }
    },
    mounted() {
        this.fetchRoles(1);
    },
    methods: {
    fetchRoles(page){
      this.$axios.get(`telemarketers?page=`+page)
     .then(response => {

        // JSON responses are automatically parsed.
       this.salesman = response.data.data;
       this.perPage = response.data.per_page
       this.totalRows = response.data.total
       this.currentPage = response.data.current_page
       
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
   delSalesman(id) {
        this.$bvModal.msgBoxConfirm('Por favor confirma que quieres borrar al vendedor.', {
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
                this.$axios.delete('telemarketers/'+id)
                 .then(response => { 
                 this.salesman = this.salesman.filter((e)=>e.id !== id )       
                })
                .catch(e => {
                  this.error = e.response.data.message;
                })
            
          })
          .catch(err => {
           this.error = e.response.data.message;
          })
      }
    }
  }
</script>
