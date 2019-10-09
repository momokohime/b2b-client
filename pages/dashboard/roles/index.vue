<template>

  <section>
   <b-row>
      <b-col sm="5">
      </b-col>
      <b-col sm="7" class="d-none d-md-block">
         <b-button variant="primary" class="m-2 float-right" @click="$router.push('roles/add')" >{{ $t('add_role') }}</b-button>
      </b-col>
    </b-row>

  <b-card :header="caption">
     <div class="alert alert-danger" role="alert" v-show="error">
      {{ error }}
    </div>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="roles"  :fields="fields" :current-page="currentPage" :per-page="perPage">
     
      <template slot="actions" slot-scope="data">
          <nuxt-link :to="{ name: 'roles_edit', params: { id: data.item.id }}"><i class="icon-pencil icons"> </i></nuxt-link>
         <b-link href="" @click="delApplication(data.item.id)"><i class="icon-trash icons  "></i>
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
        default: 'Roles'
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
        roles: [],
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
              label:'Nombre para mostrar',
              key: 'display_name',
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
        this.fetchRoles();
    },
    methods: {
    fetchRoles(ctx, callback){
      this.$axios.get(`roles`)
     .then(response => {
        // JSON responses are automatically parsed.
       this.roles = response.data.data;
       this.totalRows   = response.data.data.length;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
   delRole(id) {
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete role.', {
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
            if(value == true)
                this.$axios.delete('roles/'+id)
                 .then(response => { 
                 this.roles = this.roles.filter((e)=>e.id !== id )       
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
