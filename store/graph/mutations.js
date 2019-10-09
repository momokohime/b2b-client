export default {
	updateCounter(state, counter) {
		state.testCounter = counter
	},
  updateGraphs(state, graphs) {
    state.graphLabels   = graphs.label
    state.ordersGraph   = graphs.totalOrders
    state.salesGraph    = graphs.totalSales
    state.salesAvgGraph = graphs.avgValue
    state.customersGraph = graphs.totalCustomers
  }
}