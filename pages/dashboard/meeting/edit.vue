<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Edit Meeting</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
           <form @submit.prevent="submitMeeting" enctype="multipart/form-data">
          <b-form-group
            label="Select Clients"
            label-cols-lg="3"
            >
            <multiselect v-model="meeting.clients" label="name" track-by="id" placeholder="Type to search" 
               open-direction="bottom" :options="customers.data" :multiple="true" 
               :searchable="true" :loading="isLoading" 
               :internal-search="false" 
               :clear-on-select="true" 
               :close-on-select="true" 
               :options-limit="300" 
               :limit="3" 
               :max-height="600" 
               :show-no-results="false" 
               :hide-selected="true" 
               @search-change="asyncClients">
            </multiselect> 
          </b-form-group> 

          <b-form-group
            label="Title"
            label-cols-lg="3"
            >
            <b-form-input  type="text" v-model="meeting.title" placeholder="Enter title"></b-form-input>
          </b-form-group>
           <b-form-group
            label="Notes"
            label-cols-lg="3"
            >
          <vue-editor v-model="meeting.notes"></vue-editor>           
          </b-form-group>
           <b-form-group
            label="Location"
            label-cols-lg="3"
            >
            <b-form-input  type="text" v-model="meeting.location" placeholder="Enter location"></b-form-input>
          </b-form-group>
          
          <b-form-group
            label="Start Date Time"
            label-cols-lg="3"
            >
            <flat-pickr 
            :config="config"                                                          
            class="form-control" 
            placeholder="Select Start Date Time" 
            v-model="meeting.start_date_time">
            </flat-pickr> 
            </b-input-group>

          </b-form-group> 

          <b-form-group
            label="End Date Time"
            label-cols-lg="3"
            >
            <flat-pickr 
            :config="config"                                                          
            class="form-control" 
            placeholder="Select End Date Time" 
            v-model="meeting.end_date_time">
            </flat-pickr>

          </b-form-group>


          <b-form-group
            label="Attachments"
            label-cols-lg="3"
            >
             <dropzone id="foo" ref="el" :options="options" :destroyDropzone="true"></dropzone>
          </b-form-group>

          <b-form-group
            label=""
            label-cols-lg="3"
            >
             <ul style="list-style: none;">
              <li v-for="(attachment, index) in attachments">
                <a :href="attachment.link" target="_blank">{{ attachment.file_name }}</a>
                <a @click="deleteAttachment(attachment)" class="text-danger"><i class="fa fa-trash"></i></a>
              </li>
            </ul>
          </b-form-group>          
          
          <div slot="footer">
             <div class="form-actions">
                <b-button type="submit" variant="primary">Save changes</b-button>
                 <b-button type="button" @click="cancel"  variant="secondary">Cancel</b-button>
              </div>
          </div>
        </form>
        </b-card>
       
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'


export default {
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      id: null,
      error: null,
      loading: false,
      isLoading: false,
      attachments: [],
      meeting :{
          title: '',
          notes: '',
          location: '',
          attachments: [],
          attachment: '',
          end_date_time: '',
          start_date_time: '',
          clients: [], // Must be an array reference!
      },
      config: {
        wrap: true, // set wrap to true only when using 'input-group
        altInput: true,
        enableTime: true,
        dateFormat: "Y-m-d H:i",   
      },  
      options: {
        url: process.env.apis_base_url + "/meeting/attachments/" + this.$route.params.id,
        headers: {
          "Authorization": this.$auth.getToken('local')
        }
      }
    }
  },
  components: {
    flatPickr, Dropzone
  },
  async asyncData({ $axios }) {
  const customers = await $axios.$get('clients/dropdown')
  return { customers}
  },
  mounted() {
    this.id = this.$route.params.id
    this.fetchMeeting(this.id)
  },
  methods: {
    asyncClients(query)
    {
          this.isLoading = true
          this.$axios.get('clients/dropdown?s='+query)
          .then(response => {
          this.customers = response.data
          this.isLoading = false
        })
    },
    fetchMeeting(id){
      this.$axios.get('meeting/'+id+'/edit')
     .then(response => {
        const meeting = response.data.data
        // JSON responses are automatically parsed.
        var vf = this.meeting
        vf.title = meeting.title
        vf.notes = meeting.notes
        vf.location = meeting.location
        vf.end_date_time = meeting.end
        vf.start_date_time = meeting.start
        vf.clients = meeting.clients
        this.attachments = meeting.attachments

      })
      .catch(e => {
        this.error =  e.response.data.message
      })
    },
    onFileChange(e){
        this.files = e.target.files[0];
    },
   async submitMeeting () {
    
       var data = this.meeting
       this.error = null

       console.log(data)

       var clientIds = data.clients.map(function(client){
            return client.id
       })
      const formData = new FormData()

      $.each( data, function( i, field ) {
          formData.append(i,field)
      });

      formData.append('attachments', this.files)
      formData.append('clients', clientIds)

       await this.$axios.post('meeting/'+this.id,formData)
        .then(response => {                                                                       
        // JSON responses are automatically parsed.
        this.$router.push('/dashboard/meeting');

      })
      .catch(e => {
        this.error = e.response.data.message
      })
    },
    cancel()
    {
        this.$router.push('/dashboard/meeting')
    },
    async deleteAttachment(file) {
      if(confirm('Are you sure ?')) {
        await this.$axios.post('/meeting/del_media/' + this.id + '/'+ file.id);
        this.attachments.splice(this.attachments.indexOf(file), 1);
      }
    }
  }
}
</script>
