<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ meeting.title }}</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
           <form @submit.prevent="submitMeeting" enctype="multipart/form-data">
          <b-form-group
            label="Selected Clients"
            label-cols-lg="3"
            >
            <ul>
              <li v-for="client in meeting.clients">{{ client.name }}</li>
            </ul>
          </b-form-group> 

          <b-form-group
            label="Title"
            label-cols-lg="3"
            >
            <span>{{ meeting.title }}</span>
          </b-form-group>
           <b-form-group
            label="Notes"
            label-cols-lg="3"
            >
          <p v-html="meeting.notes"></p>    
          </b-form-group>
           <b-form-group
            label="Location"
            label-cols-lg="3"
            >
            <span>{{ meeting.location }}</span>
          </b-form-group>
          
          <b-form-group
            label="Start Date Time"
            label-cols-lg="3"
            >
            <p>{{ meeting.start_date_time }}</p> 
            </b-input-group>

          </b-form-group> 

          <b-form-group
            label="End Date Time"
            label-cols-lg="3"
            >
            <p>{{ meeting.end_date_time }}</p>

          </b-form-group>


          <b-form-group
            label="Attachments"
            label-cols-lg="3"
            >
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
             
          </div>
        </form>
        </b-card>
       
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
// import flatPickr from 'vue-flatpickr-component';
// import 'flatpickr/dist/flatpickr.css';
// import Dropzone from 'nuxt-dropzone'
// import 'nuxt-dropzone/dropzone.css'


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
    // flatPickr, Dropzone
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
