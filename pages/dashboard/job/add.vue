<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('add_job') }}</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
         <b-form @submit.prevent="submitJob" > 
          <b-form-group
            label="Título"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName"  v-model="job.title" type="text"  placeholder="Ingresa Título"></b-form-input>
          </b-form-group>

          <b-form-group
            label="Categoría"
            label-for="basicName"
            label-cols-lg="3"
            >
             <multiselect
              :multiple="false"
              v-model="job.category"
              :options="category"
              :close-on-select="true"
              :clear-on-select="false"
              :hide-selected="true"
              :preserve-search="true"
              placeholder="Categoría"
              label="name"
              track-by="value"
              :preselect-first="true"
              :show-labels="false"
              ></multiselect> 

        </b-form-group>
          <b-form-group
            label="Ubicación"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName"  v-model="job.location" type="text"  placeholder="Ingresa Ubicación"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Experiencia"
            label-for="basicName"
            label-cols-lg="3"
            >
            <b-form-input id="basicName"  v-model="job.experience" type="text"  placeholder="Ingresa Experiencia"></b-form-input>
          </b-form-group>
           <b-form-group
            label="Salario"
            label-for="basicName"
            label-cols-lg="3"
            >
            <div class="col range-sec">
          <b-form-input @input="slider" v-model.number="job.salary.from" min="0" max="5000" step="500" type="range"></b-form-input>
          <b-form-input v-on:input="slider" v-model.number="job.salary.to" min="0" max="5000" step="500" type="range"  ></b-form-input>
           <span @input="slider">

               Salario {{job.salary.from | price_raw }} - {{job.salary.to | price_raw}}
              </span>
         </div>
                         
          </b-form-group>
          <b-form-group
            label="Descripción"
            label-for="basicEmail"
            label-cols-lg="3"
            >
            <vue-editor v-model="job.description"></vue-editor>
           <!--  <b-form-textarea id="basicEmail"  v-model="job.description" type="email" placeholder="Ingresa Descripción"></b-form-textarea> -->
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
                <input type="radio" v-model="job.status" id="Status" name="Status" class="custom-control-input" value="1" checked>
                <label class="custom-control-label" for="Status">{{ $t('active') }}</label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input v-model="job.status" type="radio" id="Status2" name="Status" class="custom-control-input" value="0" >
                <label class="custom-control-label" for="Status2">{{ $t('inactive') }}</label>
              </div>
            </b-form-radio-group>
          </b-form-group>
         
          <div slot="footer">
             <div class="form-actions">
                <b-button type="submit" variant="primary">{{ $t('save_changes') }}</b-button>
                <b-button type="button" variant="secondary">{{ $t('cancel') }}</b-button>
              </div>
          </div>
        </b-form>
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
      errors: [],
      category: [],
       job: {
        title:'',
        description:'',
        location:'',
        experience:'',
        salary:{
             from: 50,
             to: 4500
          },
        status:'1',
        category:'',
       } 
    }
  },
   mounted() {
        this.fetchBrand();
  },
  methods: {
      slider: function() {
        if (this.minPrice > this.maxPrice) {
          var tmp = this.maxPrice;
          this.maxPrice = this.minPrice;
          this.minPrice = tmp;
        }
      },
        fetchBrand(){
      this.$axios.get(`job_category_list`)
      .then(response => {
        this.category = response.data
        
          this.category = this.category.map(function(elem) {
            return {
              value: elem.id,
              name: elem.name
            } 
          })
         
        })
        .catch(e => {
          this.errors.push(e)
        })
    },  
    async submitJob () {
      var data = this.job
      this.error = null
      await this.$axios.post('jobs',data)
      .then(response => {   
                                                                            
        // JSON responses are automatically parsed.
          this.$router.push('/dashboard/job');

      })
      .catch(e => {
        this.error = e.response.data.message;
      })
    }
  }
}
</script>
<style>
  .multiselect__placeholder {
    font-size: 13px;
}
button.is_favorite_css_class i {
    color: red;
}
button.custom-phone.heart i {
    color: red;
}
.email-btns ul li {
    display: flex;
    width: 70%;
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;
}
.paginationss button {
    width: auto;
    height: auto;
    padding: 9px 15px;
    font-size: 13px;
    border-radius: 10px;
    color: #020202;
    text-decoration: none;
    font-weight: 400;
    background: #F3F3F3;
    float: left;
    border: 0;
}
.paginationss.lower {
    border: 0;
    width: 50%;
}
.range-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.sidebar-listing .range-sec input {
    width: 85%;
    margin: 0px 0px;
    position: absolute;
      -webkit-appearance: none;
}

.new-profile-pic
{
  width: 200px;
  height: 200px;
}
.sidebar-body {
    max-height: 150px;
    overflow: auto;
}
.product-nav-sidebar {
    width: auto;
    position: relative;
    box-shadow: none;
}
.product-nav-sidebar li {
    text-align: left;
    padding: 5px 0;
}
.product-nav-sidebar li a {
    padding: 0 !important;
}
.product-nav-sidebar span::after {
    display: none;
}
.product-nav-sidebar a::after {
    display: none;
}
.product-nav-sidebar .nav-arrow {
    width: 30px;
}
.specialities-checkbox span {
    margin: 15px 0 0;
    font-size: 12px;
    display: block;
}


input[type=range]:focus::-webkit-slider-runnable-track {
  background: #003DA6;
}
input[type=range]:focus::-moz-range-track{
  background: #003DA6;
}

input[type=range]:focus::-ms-fill-lower {
  background: #003DA6;
}

input[type=range]:focus::-ms-fill-upper {
  background: #003DA6;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #003DA6;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: #003DA6;
  border-radius: 1px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #003DA6;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}

input[type=range]::-moz-range-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 1px solid #003DA6;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #a1d0ff;
  cursor: pointer;
  -moz-appearance: none;
  margin-top: -7px;
}
.col.range-sec span {
    display: block;
    width: 199%;
}
</style>