<script>
import { Line } from 'vue-chartjs'

import { mapMutations, mapGetters } from 'vuex'

const brandPrimary = '#20a8d8'


export default {
  extends: Line,
  props: ['height'],
  data: function () {
     return {
        orderMonth:[]
     }
   },
   computed: {
    ...mapGetters({
      labels: 'graph/getGraphLables',
      totalCustomerCount: 'graph/getCustomerGraph',
    })
  },
  watch: {
    totalCustomerCount() {
      this.getTotalOrder()
    }
  },
  mounted () { 
    this.getTotalOrder()
  },
  methods: {
 
    getTotalOrder(){
      
        setTimeout(() => {

           const datasets = [
            {
              label: 'Clientes totales',
              backgroundColor: brandPrimary,
              borderColor: 'rgba(255,255,255,.55)',
              data:this.totalCustomerCount
            }
          ] 

          this.renderChart({
            labels: this.labels,
            datasets: datasets
          }, {
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                gridLines: {
                  color: 'transparent',
                  zeroLineColor: 'transparent'
                },
                ticks: {
                  fontSize: 1,
                  fontColor: 'transparent'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: false,
                  min: Math.min.apply(Math, datasets[0].data) - 5,
                  max: Math.max.apply(Math, datasets[0].data) + 5
                }
              }]
            },
            elements: {
              line: {
                borderWidth: 1
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4
              }
            }
          })
        }, 2000)
    }
  }
}
</script>

