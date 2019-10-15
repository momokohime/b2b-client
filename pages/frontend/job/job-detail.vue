<template>
  <section>
<!-- body Start -->
  
  <div class="tabs-slider-sec job-deatils-sec">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12 col-12">
         
          <div class="tab-content slider-secc" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="container header-sec" id="featuredSlider"  >
                    <div v-for="(job, index) in jobs"  :key="index" class="row first-sec-sli"> 
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
                     <!--      <div class="col-md-6 col-sm-6 col-12">
                            <div class="slider-list-sec-n">
                              <ul>
                                <li>Name of Task</li>
                                <li>Name of Task</li>
                                <li>Name of Task</li>
                                <li>Name of Task</li>
                              </ul>
                            </div>
                          </div> -->
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
                     <!--      <div class="col-md-4 col-sm-4 col-12">
                            <div class="slider-list-sec-n">
                              <ul>
                                <li>Name of Task</li>
                                <li>Name of Task</li>
                              
                              </ul>
                            </div>
                          </div>
                          <div class="col-md-4 col-sm-4 col-12">
                            <div class="slider-list-sec-n">
                              <ul>
                                <li>Name of Task</li>
                                <li>Name of Task</li>
                                
                              </ul>
                            </div>
                          </div> -->
                        </div>
                      </div>
                    </div>
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
        <div class="col-md-4 col-sm-4 col-12 details-input">
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
        <div class="col-md-4 col-sm-4 col-12 details-input">
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
        <div class="col-md-4 col-sm-4 col-12 last-side-job detail">
           <div class="col-md-12 form-input-last">
          <h4>INFORMACIÓN ADICIONAL</h4>
          <input type="text" v-model="application.information" class="form-control my-input" id="name" placeholder="Puedes usar esta área para decirnos cúales son tus metas profesionales y en qué horario  te podemos contactar">
          <span><b-button type="submit" variant="primary">Enviar</b-button></span>
        </div>
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
      this.queryString = this.$route.query.job
       this.fetchJobDetail()
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
    watch:{
      $route (to, from){
        this.queryString = this.$route.query.job
      }

    },

      getCategry(category)
      {
         this.category = category
         this.fetchJobDetail()
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
          formData.append('job_id', this.$route.query.job)

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
      fetchJobDetail(ctx, callback){
      //alert(this.category);
        //this.$axios.get(`jobs?category=`+this.category)
         this.$axios.get(`job_detail?job=`+this.$route.query.job)
       .then(response => {
          // JSON responses are automatically parsed.
          var _r = response.data
      
          this.jobs = _r.jobs;

        })
        .catch(e => {
          this.errors.push(e)
        })
      }


       
    
    }
  };
</script>
<style>
  .last-side-job.detail span {
    text-align: center;
    margin: 40px auto;
    display: block;
    float: none;
}
.last-side-job.detail input {
    width: 100%;
    margin: 0 0 15px;
}
.last-side-job.detail {
    text-align: center;
}
.details-input input {
    height: 50px;
}
.details-input ul li a.job-add-btn {
    border: 1px solid #ccc;
    padding: 12px 15px;
}
.tabs-slider-sec.job-deatils-sec {
    background: #f2f2f2;
    margin: 50px 0;
    padding: 50px 0;
}
.tabs-slider-sec.job-deatils-sec #myTabContent {
    border: 0;
    background: #f2f2f2;
}

</style>>