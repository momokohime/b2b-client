<template>
  <section>

<!-- body Start -->
  <div class="job-posting-banner">
    
    <div class="col-md-12 col-sm-12 col-lg-12 Search-bar job-p">
      <form action="" class="search-form">
        <h2>¡ÚNETE AL EQUIPO!</h2>
        <div class="form-group has-feedback">
          <label for="search" class="sr-only">Search</label>
          <input type="text" class="form-control" name="search" id="search" placeholder="BUSCA TU LUGAR EN SERVA">
          <span><i class="fa fa-search" aria-hidden="true"></i></span>
        </div>
      </form>
    </div>
  </div>
  <div class="job-about">
    <div class="container">
      <div class="row">
        <div class="col-md-5 col-lg-5 col-12 col-sm-5">
          <div class="img-sec">
            <img src="~/assets/frontend/images/distributor-1.png">
          </div>
        </div>
        <div class="col-md-7 col-lg-7 col-12 col-sm-7">
          <div class="con-job">
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Ut enim ad minim venia. </span>
          <span>Muis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
          </div>
        </div>  
      </div>
    </div>
  </div>
  
  <div class="tabs-slider-sec">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-12">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li v-for="(categoryName, index) in categories" class="heading-tab"  @click="getCategry(categoryName.id)" style="cursor: pointer;">
                <a class="nav-link active"  aria-selected="true"> {{categoryName.name}}</a>
            </li>
            
          </ul>
          <div class="tab-content slider-secc" id="myTabContent">
            <div class="tab-pane fade show active"  id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="container header-sec" id="featuredSlider"  >
           <carousel :dots="false" v-if="showSlider" :items="1":responsive="{1000:{items:1},768:{items:1},360:{items:1},320:{items:1}}" >
                <div class=""  v-for="(job, index) in jobs"   :key="index">
                  <div class="row">
                      <div class="col-md-12 col-sm-12 col-12">
                        <div class="row">
                      <div class="col-md-6 col-sm-6 col-12"> 
                        <div class="slider-img-sec-n">
                          <img :src="job.img_url">
                          <h3>{{job.title}}<span>{{job.location}}</span></h3>
                        </div>
                      </div>
                      <div class="col-md-6 col-sm-6 col-12">
                         <h3>Actividades a Realizar</h3>
                         <div class="row">
                          <div class="col-md-6 col-sm-6 col-12">
                          <div class="slider-list-sec-n">
                              <ul>
                                <li v-for="(tdo,i) in job.todos" :key='i' >{{tdo.task}}</li>
                              
                              </ul>
                            </div>
                          </div>
                         
                        </div>

                        <div class="row">
                          <div class="col-md-12 col-sm-12 col-12">
                          <h3>Requisitos</h3>
                          </div>
                          <div class="col-md-4 col-sm-4 col-12">
                            <div class="slider-list-sec-n">
                              <ul>
                                <li v-for="(req,r) in job.requests" :key='r' >{{req.task}}</li>
                              
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-12 slider-main-btn-sec">
                          <!-- <a  @click="$router.push('job-detail')">Aplicar</a> -->
                          <a  @click="jobDetail(job.id)">Aplicar</a>

                        </div>
                      </div>
                    </div>
                      </div>
                    </div>
                   </div> 
             </carousel>

              </div>

             
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="tabs-form-sec">
    <div class="container">
    <b-form @submit.prevent="submitApplication" > 
      <div class="row">
        <div class="col-md-4 col-sm-4 col-12">
          <ul>
            <li>
              <div class="form-group">
                 <input type="text" v-model="application.first_name" name="name" class="form-control my-input" id="name" placeholder="Nombre">
              </div>
            </li>
            <li>
              <div class="form-group">
                 <input type="text"v-model="application.email" class="form-control my-input" id="name" placeholder="Correo Electrónico">
              </div>
            </li>
            <li>
              <div class="form-group">
                 <input type="text" v-model="application.direction" class="form-control my-input" id="name" placeholder="Dirección">
              </div>
            </li>
            <li>
              <div class="form-group">
                 <input type="text" v-model="application.state" class="form-control my-input" id="name" placeholder="Estado">
              </div>
            </li>
            <li>

              <a @click="fileClick()" class="job-add-btn">+ Adjuntar Curriculum</a>
              <input type="file" v-on:change="ResumeUpload()" ref="resume" style="display: none">
            </li>
          </ul>
        </div>
        <div class="col-md-4 col-sm-4 col-12">
          <ul>
            <li>
              <div class="form-group">
                 <input type="text" v-model="application.last_name"  class="form-control my-input" id="name" placeholder="Apellido">
              </div>
            </li>
            <li>
              <div class="form-group">
                 <input type="text"  v-model="application.pin" class="form-control my-input" id="erer" placeholder="Lada">
                 <input type="text"  v-model="application.phone" class="form-control my-input" id="cfd" placeholder="Teléfono">
              </div>
            </li>
            <li>
              <div class="form-group">
                 <input type="text" name="name" v-model="application.city" class="form-control my-input" id="name" placeholder="Ciudad">
              </div>
            </li>
            <li>
              <div class="form-group">
                 <input type="text" name="name" v-model="application.postal_code" class="form-control my-input" id="name" placeholder="Código Postal">
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-4 col-sm-4 col-12 last-side-job">
          <ul>
            <li>
              <h3>CONTACTO</h3>
            </li>
            <li>
              <span>Teléfono:</span>(01) 771 717 02 68 Ext: 178
            </li>
            <li>
              <span>Correo electrónico:</span>recursoshumanos@serva.com.mx
            </li>
          </ul>
        </div>
        <div class="col-md-12 form-input-last">
          <h4>INFORMACIÓN ADICIONAL</h4>
          <input type="text" v-model="application.information" class="form-control my-input" id="name" placeholder="Puedes usar esta área para decirnos cúales son tus metas profesionales y en qué horario  te podemos contactar">
          <span><b-button type="submit" variant="primary">Enviar</b-button></span>
        </div>
      </div>
    </b-form>
    </div>
  </div>

   </section>
</template>
<script>

  export default {
    layout: 'frontend',
    data: () => {
      return {
        errors: [],
       categories: [],
       jobs: [],
       category: '', 
       showSlider:false, 
       resume: '', 
       application:{
         first_name:'',
         last_name:'',
         email:'',
         pin:'',
         phone:'',
         direction:'',
         city:'',
         state:'',
         postal_code:'',
         information:'',
         resume:''
       }  
      
      }
    },
    mounted()
    {
       this.fetchCatalogs()
    },
    methods:{
       ResumeUpload(){ 
        this.resume =  this.$refs.resume.files[0];
        if (this.resume.size > 1024 * 1024 * 10) {
          this.error = 'File too big (> 10MB)'
          this.$refs.resume.value = '' 
          this.resume = ''
          return;
        }
      },
      getCategry(category)
      {
         this.category = category
         this.fetchCatalogs()
      },
      fileClick(){
        this.$refs.resume.click()
      },
     async submitApplication(){
            var data = this.application
            this.error = null
            const formData = new FormData()
            $.each( data, function( i, field ) {
              formData.append(i,field)
            });
          formData.append('resume', this.resume)

         await this.$axios.post('job_application',formData)
        .then(response => {
          // JSON responses are automatically parsed.
          alert('Succssfully applied');
          this.resetForm();
        })
        .catch(e => {
          this.error =  e.response.data.message
        })  
      },
      resetForm() {
       
        var self = this; //you need this because *this* will refer to Object.keys below`

        //Iterate through each object field, key is name of the object field`
        Object.keys(this.application).forEach(function(key,index) {
          self.application[key] = '';
        });
      },
      jobDetail(id){
       // this.filters.brand = id
        var queryString = id;
        this.$router.push({ name: 'job-detail',  query: { job: queryString }})
      },
      fetchCatalogs(ctx, callback){
         this.showSlider = false;
      //alert(this.category);
        //this.$axios.get(`jobs?category=`+this.category)
         this.$axios.get(`jobs_listing?category=`+this.category)
       .then(response => {
          // JSON responses are automatically parsed.
          var _r = response.data
          this.categories = _r.categories;
          this.jobs = _r.jobs;
          this.showSlider = true;
          this.category = _r.categories[0]['id'];


        })
        .catch(e => {
          this.errors.push(e)
        })
      }


       
    
    }
  };
</script>
<style>
  .slider-main-btn-sec a {
    color: #fff !important;
}

</style>>