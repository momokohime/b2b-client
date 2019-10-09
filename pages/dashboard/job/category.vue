<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Categoría</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
          <div class="alert alert-success" role="alert" v-show="success">
            {{ success }}
          </div>
         <b-form @submit.prevent="submitCategory" > 
          <b-form-group
            label="NOMBRE"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName"  v-model="category.name" type="text"  placeholder="Ingresa Categoría"></b-form-input>
          </b-form-group>
          
         
           <b-form-group
            label="Estado"
            label-for="basicStatus"
            label-cols-lg="3"
            >
            <b-form-radio-group
              id="basicStatus"
              name="Status">
              <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" v-model="category.status" id="Status" name="Status" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="Status">{{ $t('active') }}</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="category.status" type="radio" id="Status2" name="Status" class="custom-control-input" value="0" >
                <label class="custom-control-label" for="Status2">{{ $t('inactive') }}</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
         
          <div slot="footer">
             <div class="form-actions">
                <b-button type="submit" variant="primary">{{ $t('save_changes') }}</b-button>
                 <b-button type="button" @click="cancel" variant="secondary">{{ $t('cancel') }}</b-button>
              </div>
          </div>
        </b-form>
        </b-card>
         <b-card :header="caption" class="table-sec-new">
          <b-table  :items="jobCategory" :fields="categoryFields" :current-page="currentPage" :per-page="perPage">
             
              <template slot="Acción" slot-scope="data">
                 <b-link href="" @click="delSalesmanCustomer(data.item.number)"><i class="icon-trash icons  "></i>
                </b-link>
              </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="totalRows"
              :current="currentPage"
              :simple="false"
              :per-page="per_page"
              order="is-right"
              @change="fetchJobCategory">
            </b-pagination>
           </nav>
         </b-card>
       
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      error: null,
      success:null,
      errors: [],
      jobCategory:[],
      categoryFields:[
        {
          label: 'NOMBRE',
          key: 'name',
          sortable: true
        },
        {
          label: 'Estado',
          key: 'is_active',
          sortable: true
        }
      ],

       category: {
        title:'',
       
        status:'1',
       },
      currentPage: 1,
      perPage: 0,
      per_page: 0,
      totalRows: 0 
    }
  },
   mounted() {
  
    this.fetchJobCategory(1)    
  },
  methods: {
    async submitCategory () {
      var data = this.category
      this.error = null
      this.success = null

      await this.$axios.post('job_category',data)
      .then(response => {   
         this.success = response.data.data;                                                                     
        // JSON responses are automatically parsed.
          //this.$router.push('/dashboard/job');

      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    },
    fetchJobCategory(page){
       this.currentPage = page
       this.$axios.get(`getJobCategory?page=`+page)
       .then(response => {
        // JSON responses are automatically parsed.
       this.jobCategory = response.data.data;
       this.per_page = response.data.per_page
       this.totalRows = response.data.total
       this.currentPage = response.data.current_page
        // this.totalRows   = response.data.data.length;
      })
      .catch(e => {
        this.error =  e.response.data.message
      })  
    },
    cancel()
    {
        this.$router.push('/dashboard/Job')
    }
  }
}
</script>
