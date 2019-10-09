<template>
  <section>
   <b-row>
      <b-col sm="5">
      </b-col>
      <b-col sm="7" class="d-none d-md-block">
         <b-button variant="primary" class="m-2 float-right" @click="$router.push('meeting/add')" >Add Meeting</b-button>
      </b-col>
    </b-row>
   
  <b-card :header="caption" class="table-sec-new edit-table">
    <div class="alert alert-danger" role="alert" v-show="error">
      {{ error }}
    </div>
   
    <full-calendar :events="events" locale="en"></full-calendar>
    </br>
    </br>
    <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="meetings" :fields="fields">
        <template slot="s_no" slot-scope="data">
          {{data.index + from}}
        </template> 
      <template  slot="actions" slot-scope="data">
        <nuxt-link :to="{ name: 'meeting_show', params: { id: data.item.id }}">
          <i class="icon-cursor icons"> </i>
         </nuxt-link>
         <nuxt-link :to="{ name: 'meeting_edit', params: { id: data.item.id }}">
          <i class="icon-pencil icons"> </i>
         </nuxt-link>
         <b-link href="" @click="delMeeting(data.item.id)"><i class="icon-trash icons  "></i>
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
            @change="fetchMeetings">
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
import axios from 'axios';
import { mapGetters } from 'vuex';
import 'fullcalendar/dist/fullcalendar.css'

export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    props: {
      caption: {
        type: String,
        default: 'Meeting'
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
    components: {
   //    VueFullCalendar,
    },
    data: () => {
      return {
        error: null,
        meetings: [],
        errors: [],
        boxTwo: '',
        items: [],
        fields: [
           {
                label:'S NO',
                key: 's_no'
            },
            {
                label:'Title',
                key: 'title',
                sortable: true
            },
            // {
            //     label:'Notes',
            //     key: 'notes',
            //     sortable: true
            // },
            {
                label:'Location',
                key: 'location',
                sortable: true
            },
            {
                label:'Start DateTime',
                key: 'start',
                sortable: true
            },
            {
                label:'End DateTime',
                key: 'end',
                sortable: true
            },
             {
                key: 'actions'
            }

        ],
        events: [],
        currentPage: 0,
        perPage: 0,
        totalRows: 0,
        from: 0
      }
    },
    mounted() {
        this.fetchMeetings(1)
        this.fetchAllMeetings()
    },
    computed: {
      ...mapGetters(['loggedInUser'])

    },
    methods: {
      fetchMeetings(page){
        this.currentPage = page
        this.$axios.get(`meeting?page=`+page)
       .then(response => {
          // JSON responses are automatically parsed.
          this.meetings    =   response.data.data;
          this.perPage     =   response.data.meta.per_page
          this.totalRows   =   response.data.meta.total
          this.currentPage =   response.data.meta.current_page
          this.from        =   response.data.meta.from
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      fetchAllMeetings(){
        this.$axios.get(`meeting/all`)
       .then(response => {
          // JSON responses are automatically parsed.
          this.events    =   response.data.data;
         })
        .catch(e => {
          this.errors.push(e)
        })
      },
      getRowCount (items) {
        return items.length
      },
      eventSelected(event,element) {
        var tooltip = event.Description;
        $(element).attr("data-original-title", tooltip)

        $(element).tooltip({
            title: event.title,
            container: "body"
        });

        // var tooltip = new Tooltip(info.el, {
        //   title: info.event.extendedProps.description,
        //   placement: 'top',
        //   trigger: 'hover',
        //   container: 'body'
        // });
      },
      delMeeting(id) {
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete Meeting.', {
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
                this.$axios.delete('meeting/'+id)
                 .then(response => { 
                 this.meetings = this.meetings.filter((e)=>e.id !== id )       
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
  };
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
</style>