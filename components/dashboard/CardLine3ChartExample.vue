<script>
import { Line } from 'vue-chartjs'

import { mapMutations, mapGetters } from 'vuex'

export default {
  extends: Line,
  props: ['height'],
  data: function () {
     return {
     }
  },
   computed: {
    ...mapGetters({
      labels: 'graph/getGraphLables',
      avgValue: 'graph/getSalesAvgGraph',
    })
  },
  watch: {
    avgValue() {
      this.getTotalSales()
    }
  },
  mounted () { 
    this.getTotalSales()
  },
  methods: {
     getTotalSales(){
      
      setTimeout(() => { 
        const datasets = [
      {
        label: 'Ticket promedio',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: this.avgValue
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
                  min: Math.min.apply(Math, datasets[0].data) - 10,
                  max: Math.max.apply(Math, datasets[0].data) + 10
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
