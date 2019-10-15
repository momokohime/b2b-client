<template>

  <section>
   <b-row>
      <b-col sm="5">
      </b-col>
      <b-col sm="7" class="d-none d-md-block">
         <b-button variant="primary" class="m-2 float-right" @click="$router.push('supervisors/add')" >Agregar Supervisor</b-button>
      </b-col>
    </b-row>

  <b-card :header="caption">
     <div class="alert alert-danger" role="alert" v-show="error">
      {{ error }}
    </div>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="supervisor"  :fields="fields">
     
      <template slot="Ver" slot-scope="data">
          <nuxt-link :to="{ name: 'supervisors_detail', params: { id: data.item.id,title:'clientes' }}">Clientes</nuxt-link>
          <nuxt-link :to="{ name: 'supervisors_detail', params: { id: data.item.id ,title:'vendedors'}}">Vendedors</nuxt-link>
          <nuxt-link :to="{ name: 'supervisors_detail', params: { id: data.item.id ,title:'telemarketing'}}">Telemarketing</nuxt-link>
      </template>

      <template slot="Acción" slot-scope="data">
          <nuxt-link :to="{ name: 'supervisors_edit', params: { id: data.item.id }}"><i class="icon-pencil icons"> </i></nuxt-link>
         <b-link href="" @click="delSupervisor(data.item.id)"><i class="icon-trash icons"></i>
        </b-link>
      </template>
    </b-table>
    <nav>
        <b-pagination
                :total-rows="totalRows"
                :current="currentPage"
                :simple="false"
                :per-page="perPage"
                order="is-right"
                @change="fetchSupervisors">
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
        default: 'Supervisor'
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
        supervisor: [],
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
          {key: 'Ver'},
          {key: 'Acción'}
        ],
        currentPage: 0,
        perPage: 0,
        totalRows: 0
      }
    },
    mounted() {
        this.fetchSupervisors(this.perPage);
    },
    methods: {
    fetchSupervisors(page){
      this.$axios.get(`supervisors?page=`+page)
     .then(response => {

        // JSON responses are automatically parsed.
       this.supervisor = response.data.data;
       this.perPage = response.data.per_page
       this.totalRows = response.data.total
       this.currentPage = response.data.current_page
       
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
   delSupervisor(id) {
        this.$bvModal.msgBoxConfirm('Por favor confirma que quieres borrar al supervisor.', {
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
                this.$axios.delete('supervisors/'+id)
                 .then(response => { 
                 this.supervisor = this.supervisor.filter((e)=>e.id !== id )       
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
