<template>
  <section>

   <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>{{ $t('credits') }}</strong>
          </div>
         <p><strong>{{ $t('credittoexceed') }} : </strong><span v-html="$options.filters.price(credits.CreditoExcedido)"></span></p>
         <p><strong>{{ $t('limitCreaditTo') }} : </strong><span v-html="$options.filters.price(credits.LimiteCredito)"></span></p>
         <p><strong>{{ $t('return') }} : </strong><span v-html="$options.filters.price(credits.Return)"></span></p>
         <p><strong>{{ $t('totalCom') }} :</strong> <span v-html="$options.filters.price(credits.TotalComprom)"></span></p>     
        </b-card>
      </b-col>
    </b-row>

</section>
</template>

<script>

  import axios from 'axios';

  export default {
    layout: 'dashboard',
    name: 'dashboard',
    middleware: 'auth',
    data: () => {
      return {
        credits: [],
        errors: [],
      }
    },
    computed: {
      getCustomer() {
        return this.$store.state.products.customer
      },
    },
    mounted() {
        this.fetchCredits();
    },
    methods: {
      fetchCredits(ctx, callback){
       this.$axios.get('clients/credit/'+this.getCustomer.id)
       .then(response => {
          var credits = JSON.parse(JSON.stringify(response))
          this.credits = credits.data.data;
          console.log(credits.data.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
      },
    }
  }
</script>
