<template>
  <div class="animated fadeIn">
    
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Add Meeting</strong>
          </div>
          <div class="alert alert-danger" role="alert" v-show="error">
            {{ error }}
          </div>
             <form  @submit.prevent="submitMeeting" enctype="multipart/form-data">
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


          <!-- <b-form-group
            label="Attachment"
            label-cols-lg="3"
            >
            <b-form-file
            accept="image/*"
            @change="onFileChange">
            :plain="true"></b-form-file>
            
          </b-form-group> -->
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

export default {
  name: 'forms',
  layout: 'dashboard',
  data () {
    return {
      error: null,
      loading: false,
      isLoading: false,
      files: [],
      meeting :{
          title: '',
          notes: '',
          location: '',
          attachments: [],
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
    }
  },
  components: {
    flatPickr
  },
  async asyncData({ $axios }) {
  const customers = await $axios.$get('clients/dropdown')
  return { customers}
  },
  methods: {
    onFileChange(e){
        this.files = e.target.files[0];
    },
   async submitMeeting () {
  
       var data = this.meeting
       //data.attachments = this.files

       var clientIds = data.clients.map(function(client){
            return client.id
       })
      const formData = new FormData()

      $.each( data, function( i, field ) {
          formData.append(i,field)
      });

      formData.append('attachments', this.files)
      formData.append('clients', clientIds)

      this.error = null

       await this.$axios.post('meeting',formData)
        .then(response => {                                                                       
        // JSON responses are automatically parsed.
         this.$router.push('/dashboard/meeting');

      })
      .catch(e => {
        this.error = e.response.data.message
      })
    },
    asyncClients(query)
    {
        this.isLoading = true
          this.$axios.get('clients/dropdown?s='+query)
          .then(response => {
          this.customers = response.data
          this.isLoading = false
        })
    },
    cancel()
    {
        this.$router.push('/dashboard/meeting')
    }
  }
}
</script>
