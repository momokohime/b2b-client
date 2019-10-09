<template>
  <section>
  <b-row>
      <b-col sm="5">
      </b-col>
      <b-col sm="7" class="d-none d-md-block">
         <b-button variant="primary" class="m-2 float-right" @click="$router.push('permissions/add')" >Crear permiso</b-button>
      </b-col>
    </b-row>
  <b-card :header="caption">
     <div class="alert alert-danger" role="alert" v-show="error">
      {{ error }}
    </div>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="permissions"  :fields="fields" :current-page="currentPage" :per-page="perPage">
     
      <template slot="actions" slot-scope="data">
          <nuxt-link :to="{ name: 'permissions_edit', params: { id: data.item.id }}"><i class="icon-pencil icons"> </i></nuxt-link>
         <b-link href="" @click="delPermission(data.item.id)"><i class="icon-trash icons  "></i>
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

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    props: {
      caption: {
        type: String,
        default: 'Permisos'
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
        permissions: [],
        fields: [
          {
              label:'S. No.',
              key: 'id',
              sortable: true
          },
          {
              label:'Nombre',
              key: 'name',
              sortable: true
          },
          {
              label:'Fecha',
              key: 'created_at'
          },
          {key: 'actions'}
        ],
        currentPage: 1,
        perPage: 15,
        totalRows: 0
      }
    },
    mounted() {
        this.fetchPermissions();
    },
    methods: {
    fetchPermissions(ctx, callback){
      this.$axios.get(`permissions`)
     .then(response => {
        // JSON responses are automatically parsed.
       this.permissions = response.data.data;
       this.totalRows   = response.data.data.length;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
   delPermission(id) {
        this.$bvModal.msgBoxConfirm('Por favor confirma que deseas eliminar el permiso', {
          title: 'Favor de confirmar',
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
                this.$axios.delete('permissions/'+id)
                 .then(response => { 
                 this.permissions = this.permissions.filter((e)=>e.id !== id )       
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
