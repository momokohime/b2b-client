<template>
  <section>
  <b-row>
      <b-col sm="5">
      </b-col>
      <b-col sm="7" class="d-none d-md-block">
         <b-button variant="primary" class="m-2 float-right" @click="$router.push('users/add')" >{{ $t('add_user') }}</b-button>
      </b-col>
    </b-row>

  <b-card :header="caption">
        <div class="col-sm-12 col-xl-12">
    <div class="filter-sec card assign">
    <ul>
        <b-form>
            <li> <input v-on:keyup="search"  v-model="filters.name" placeholder="Nombre"></li>
            <li> <input v-on:keyup="search" v-model="filters.email"  placeholder=" Correo Electrónico"></li>
        </b-form> 
    </ul>
    
     
    </div>
</div>
    <div class="alert alert-danger" role="alert" v-show="error">
      {{ error }}
    </div>

    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="users"  :fields="fields">
     
      <template slot="Acción" slot-scope="data">
          <nuxt-link :to="{ name: 'user_edit', params: { id: data.item.id }}"><i class="icon-pencil icons"> </i></nuxt-link>
         <b-link href="" @click="delUser(data.item.id)"><i class="icon-trash icons  "></i>
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
                @change="fetchUsers">
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
    props: {
      caption: {
        type: String,
        default: 'Usuarios'
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
        users: [],
        error: null,
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
              label:'Tipo de usuario',
              key: 'user_type',
              sortable: true
          },
          {
              label:'Fecha',
              key: 'created_at'
          },
          {
              key: 'Acción'
          }
        ],
        filters:{
          name : '',
          email :''
        },
        currentPage: 0,
        perPage: 0,
        totalRows: 0
      }
    },
    mounted() {
        this.fetchUsers(1);
    },
    methods: {
      fetchUsers(page){
        var filters = {
            name : (this.filters.name == null) ? '' : this.filters.name,
            email : (this.filters.email == null) ? '' : this.filters.email
           
          };
         var queryString = Object.keys(filters).map(key => 'filter[' +key + ']=' + filters[key]).join('&');  
         this.$axios.get('users?'+queryString, {
              params: {
                page: page,
            }
          }).then(response => {
         var _r = response.data
         this.users = _r.data;
         this.perPage = _r.meta.per_page
         this.totalRows = _r.meta.total
         this.currentPage = _r.meta.current_page
         
        })
        .catch(e => {
          this.error =  e.response.data.message
        })
      },
      search(){
           this.fetchUsers()
        },
      getBadge (status) {
        return status === 'Active' ? 'success'
          : 'secondary'
      },
      getRowCount (items) {
        return items.length
      },
      delUser(id) {
         this.$bvModal.msgBoxConfirm('Por favor confirma que quieres borrar el usuario.', {
          title: 'Please Confirm',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Sí',
          cancelTitle: 'No',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value == true)
                this.$axios.delete('salesman/'+id)
                 .then(response => { 
                 this.users = this.users.filter((e)=> e.id !== id )       
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
<style>
   .edit-table .table.b-table > thead > tr > th[aria-sort], .table.b-table > tfoot > tr > th[aria-sort] {
    font-size: 13px;
}
.table-sec-new .card{width:100%;}
.edit-table .table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
    font-size: 14px;
}
.custom-sel{
  position: relative;
  display: table;
  margin-right: 10px;
}

.custom-sel:after{
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #3ea8d8;
  pointer-events: none;
}

.custom-sel select{
    padding: 6px 30px 6px 10px;
    background: #fff;
    border: solid 1px #3ea8d8;
    border-radius: 6px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.check-btn{
    background: #53a9d8;
    padding: 6px;
    border-radius: 4px;
    display: block;
    color: #fff;
    text-align: center;
    cursor: pointer;
    margin-left: 5px;
}

.assign-dd{
  display: flex;
  padding: 0px 0px 10px;
  /*justify-content: space-between;*/
}

.assign-dd.next {
    float: left !important;
}
.assign-dd.next .btn.check-btn {
    padding: 0px 14px;
}

.assign-dd.next input {
    width: 200px;
    padding: 5px 10px 3px;
}
.assign-dd.next {
    width: 100%;
}
.assign-dd input {
    width: 200px;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #53a8d8;
    padding: 15px;
}
.custom-sel{
    display: flex;
    margin-left: 5px;
}
.filter-sec.card.assign {
    margin: 0px 0 20px;
    padding: 20px;
    background: #d6d6d6;
}
.filter-sec.card.assign ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
}
.filter-sec.card.assign li {
    margin: 0px 10px 10px 0;
    display: flex;
}
.filter-sec.card.assign ul li input {
    min-height: 40px;
    display: block;
    padding: 0px 10px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
    font-size: 14px;
}
.filter-sec.card.assign li select {
    width: 220px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    background: #fff;
}
.filter-sec.card.assign ul form {
    display: flex;
}
</style>