<template>
	<section>			
		<main class="col-md-9 col-sm-9 col-12 col-lg-9">
			<div class="profile-sec-new">
					<h4>Estado De Cuenta</h4>
			</div>
			<div class="row profile_bottom">
				<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">
					<div class="card">
						<div class="card-body cart-item-sec">
							<table class="table table-responsive">
								<thead>
									<tr>
										<th>No</th>
										<th>CLIENTE</th>
										<th>CLASE_DOC</th>
										<th>FACTURA</th>
										<th>NOTA_CRED</th>
										<th>DESCP</th>
										<th>TOTAL</th>
										<th>SUB_TOTAL</th>
										<th>IMPUESTO_LC</th>
										<th>COND_PAGO</th>
										<th>DOWNLOAD</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(account, index) in accounts">
										 <td>{{ account.s_no }}</td>
										<td>{{ account.CLIENTE }}</td>
										<td>{{ account.CLASE_DOC }}</td>
										<td>{{ account.FACTURA }}</td>
										<td>{{ account.NOTA_CRED }}</td>
										<td>{{ account.DESCP }}</td>
										<td>{{ account.TOTAL }}</td>
										<td>{{ account.SUB_TOTAL }}</td>
										<td>{{ account.IMPUESTO_LC }}</td>
										<td>{{ account.COND_PAGO }}</td>
										
										<td class="order-status fav">
											<!-- <button type="button" class="btn btn-pill btn-primary"   @click="download('xlsx',account.id)"> Download</button> -->
                       <b-link :href="account.PDF" download="true" v-if="account.PDF != ''" target="_blank">PDF</b-link>
                     <b-link :href="account.XML" download="true" v-if="account.XML != ''" target="_blank">XML</b-link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="pagination-nav">
				   <div class="container">
					   <b-pagination
			            :total-rows="totalRows"
			            :current="currentPage"
			            :simple="false"
			            :per-page="perPage"
			            order="is-right"
			            @change="fetchClients">
                     </b-pagination>
				   </div>
			</div>
		</main>	
	</section>		
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios';

export default {
    layout: 'profile',
     middleware: 'frontend',
      props: {
      caption: {
        type: String,
        default: ''
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
        accounts: [],
        errors: [],
        boxTwo: '',
        items: [],
        
        fields: [
           {
                label:'S No',
                key: 's_no'
            },
            {
                label:'CLIENTE',
                key: 'CLIENTE',
                sortable: true
            },
            {
                label:'CLASE_DOC',
                key: 'CLASE_DOC'
            },
            {
                label:'FACTURA',
                key: 'FACTURA'
            },
            {
                label:'NOTA_CRED',
                key: 'NOTA_CRED'
            },
            {
                label:'DESCP',
                key: 'DESCP'
            },
            {
                label:'TOTAL',
                key: 'TOTAL'
            },
            {
                label:'SUB_TOTAL',
                key: 'SUB_TOTAL'
            },
            {
                label:'IMPUESTO_LC',
                key: 'IMPUESTO_LC'
            },
            {
                label:'COND_PAGO',
                key: 'COND_PAGO'
            },
            {
                label:'DOWNLOAD',
                key: 'download'
            }

        ],
        currentPage: 0,
        perPage: 0,
        totalRows: 0
      }
    },
     computed: {
	  ...mapGetters({
	    isAuthenticated: 'isAuthenticated',
	    loggedInUser: 'loggedInUser',
	  })
	},
    mounted() {
        this.fetchClients(1)
    },
    methods: {
    	fetchClients(page){
        this.currentPage = page
        this.$axios.get(`accounts?page=`+page)
       .then(response => {
          // JSON responses are automatically parsed.
          this.accounts   =   response.data.data;
          this.perPage     =   response.data.meta.per_page
          this.totalRows   =   response.data.meta.total
          this.currentPage =   response.data.meta.current_page
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
      getBadge (status) {
        return status === 'Active' ? 'success'
          : 'secondary'
      },
      getRowCount (items) {
        return items.length
      },
      download(type,id) {
       this.$axios({
           url: 'download/'+type+'/'+id,
           method: 'GET',
          responseType: 'blob', // important
       }).then(response => {
           const url = window.URL.createObjectURL(new Blob([response.data]));
           const link = document.createElement('a');
           link.href = url;
           link.setAttribute('download', 'account-'+id+'.'+type); //or any other extension
           document.body.appendChild(link);
           link.click();
        })
        .catch(e => {
          this.errors.push(e)
        })


      }
   	}
};
</script>
