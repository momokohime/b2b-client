export default {
	getCounter(state) {
		return state.testCounter
	},
  getGraphLables(state) {
    return state.graphLabels
  },
  getOrdersGraph(state) {
    return state.ordersGraph
  },
  getSalesGraph(state) {
    return state.salesGraph
  },
  getSalesAvgGraph(state) {
    return state.salesAvgGraph
  },
  getCustomerGraph(state) {
    return state.customersGraph
  }
}