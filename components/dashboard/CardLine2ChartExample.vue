<script>
import { Line, mixins } from 'vue-chartjs'
import { mapMutations, mapGetters } from 'vuex'

const brandInfo = '#63c2de'


export default {
  extends: Line,
  props: ['chartData', 'height'],
  mixins: [mixins.reactiveProp],
  data: function () {
     return {
        totalSales:[],
     }
  },
  computed: {
    ...mapGetters({
      labels: 'graph/getGraphLables',
      totalSalesData: 'graph/getSalesGraph',
    })
  },
  watch: {
    totalSalesData() {
      this.getSalesGraph()
    }
  },
  mounted () { 
    this.getSalesGraph()
  },
  methods: {
   getSalesGraph(){
     
    var vm = this

   setTimeout(() => { 
    const datasets = [
      {
        label: 'Total de ventas',
        backgroundColor: brandInfo,
        borderColor: 'rgba(255,255,255,.55)',
        data:  vm.totalSalesData
      }
    ]
    vm.renderChart({
      labels: vm.labels,
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
            fontSize: 2,
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
          tension: 0.00001,
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
