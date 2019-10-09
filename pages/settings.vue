<template>
<section>
   <div class="animated fadeIn">
    <b-row>
      <b-col md="12">
          <b-card >
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
          <div class="alert alert-success" role="alert" v-show="success">
                {{ success }}
            </div>
          <div slot="header">
            <strong>Perfil </strong>
          </div>
          <div class="row">
            <div class="col-lg-4 col-sm-4 col-xs-12 col-md-4">
            <div class="profile_left">
              <div class="thumbnail_img_profile">
                <img :src="imageData"  @error="img404()" :alt="loggedInUser.name">
              </div>
            </div>
            <div class="information text-center">
              <label class="custom-file">
                <input type="file" id="file" class="custom-file-input" ref="fileInput" @change="previewImage">
                <span class="custom-file-control"><i class="fa fa-upload" aria-hidden="true"></i>Upload photo</span>
              </label>
            </div>
          </div>
           <div class="col-lg-8 col-sm-8 col-xs-12 col-md-8">
            <b-form @submit.prevent="updateProfile">
              <b-form-group>
                <label for="name">Nombre</label>
                <b-form-input type="text" id="name"placeholder="Nombre"  v-model="profile.name"></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="email">Correo Electrónico</label>
                <b-form-input type="email" id="email"  placeholder="Correo Electrónico" :value="loggedInUser.email" disabled ></b-form-input>
              </b-form-group>
              <b-form-group>
                <label for="newPassword">Contraseña</label>
                <b-form-input id="newPassword" type="password" placeholder="Contraseña" autocomplete="current-password" v-model="profile.password"></b-form-input>
              </b-form-group>
               <b-form-group>
                <label for="newPassword">Confirmar Contraseña</label>
                <b-form-input id="confirmPassword" type="password" placeholder="Confirmar Contraseña" autocomplete="current-password" v-model="profile.password_confirmation"></b-form-input>
              </b-form-group>

              <div slot="footer">
                <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Enviar</b-button>
                 <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reiniciar</b-button>    
              </div>
          </b-form>
          </div>
          </div>
          
        </b-card>
      </b-col>
    </b-row>
  </div>
</section>
</template>
<style scoped>
.profile-tab-sec{padding:80px 30px;background:#eaedf2}.vertical-tabs{font-size:15px;padding:10px;color:#000;display:inline-flex;width:100%}.vertical-tabs .nav.nav-tabs{border-bottom:0;display:block;float:left;margin-right:20px;background:#fff;max-height:100%}.thumbnail_img_profile img{width:100%;height:100px!important;object-fit:cover}.profile-tab-btn{width:210px;float:left;padding:20px 0 0 0}.thumbnail_img_profile img{object-fit:cover}.information h2{font-size:14px;color:#000;text-align:center}.thumbnail_img_profile img{border-radius:50%;margin-bottom:10px}.profile_img_btn button{font-size:12px;margin:0}.nav-tabs .nav-item{margin-bottom:0!important}.vertical-tabs .nav-tabs .nav-link.active{background-color:#f8f8f8!important;color:#0062cc;border:0;border-left:10px solid #0062cc}.vertical-tabs .nav-tabs .nav-link{border-radius:0;background:#fff;text-align:center;border-bottom:1px solid #f1f1f1;color:#656565;width:100%;text-align:left;padding:18px;font-weight:500}.thumbnail_img_profile img{width:100%;height:100% !important;object-fit:cover}.nav-pills .show>.nav-link,.profile-sec .nav-pills .nav-link.active{background-color:#f8f8f8!important;color:#0062cc;border:0;border-left:5px solid #0062cc;border-radius:0}.profile-sec ul{padding:0}.profile_left{width:150px;margin:0 auto}.information{text-align:center}.information .custom-file{margin-top:-40px;margin-bottom:30px}
</style>
<script>
import { mapMutations, mapGetters } from 'vuex'
  export default{
    layout: 'dashboard',
     data () {
    return {
       error: null,
       success: null,
       imageData:'',
      props: ['shipping'],
          shipping: {
            postal_code : '',
            street : '',
            ext_no : '',
            int_no : '',
            reference : '',
            person_name : '',
            shipment_type : '',

        },
          profile:{
            name:'',
            relation_id: '',
            password: '',
            password_confirmation: '',
            image:[]
        },
        information:[],
        ShppingAddresses:[],     
      }
    },
    computed: {
    ...mapGetters({
      loggedInUser: 'loggedInUser',

    }),

    },
    mounted()
    {
       this.profile.name = this.loggedInUser.name
       this.imageData = this.loggedInUser.image
    },
    methods:{
      // async addShippingAddress()
      // {
      //   var data = this.shipping
      //   console.log(data);
      //     await this.$axios.post('addresses',data)
      //    .then(response => {        
      //    })
      //   .catch(e => {
      //   this.error = e.response.data.message;
      //  })
      // },
      // fetchShippingAddress()
      // {
      //   this.$axios.get(`addresses`)
      //     .then(response => {
      //       this.ShppingAddresses = response.data.data;

      //     })
      //     .catch(e => {
      //       this.error =  e.response.data.message
      //     })
      // },
        updateProfile ()
        {
            this.error = null
            this.profile.relation_id = this.loggedInUser.relation_id
            this.$axios.post('profile_update',this.profile)
             .then(response => {        
              this.success = response.data.message
              this.$auth.$storage.setState('user', response.data.data)
            })
          .catch(e => {
            this.error = e.response.data.message;

          })
      },
      previewImage: function(event) {

        const formData = new FormData()

        formData.append('image', this.$refs.fileInput.files[0])
        formData.append('name', this.profile.name)

        this.$axios.post('profile_update',formData)
         .then(response => {        
          this.success = response.data.message
          //console.log(response.data.data.image)
           
          this.$auth.$storage.setState('user', response.data.data)
          this.imageData = this.loggedInUser.image
        })
      .catch(e => {
        this.error = e.response.data.message;

      })
    },

      img404() {
        this.imageData = '/img/avatar.png'
      },
    }
  };
</script>