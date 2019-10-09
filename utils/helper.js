const util = {
	filterMenuItems(arr, terms) {
		var ins = this
	    var matches = [];
	    if (!Array.isArray(arr)) return matches;

	    arr.forEach(function(i) {
	        // if (i.acl.includes(term)) {
	        if (terms.includes(i.acl)) {
	            matches.push(i);
	        } else {
	            let childResults = ins.filterMenuItems(i.children, terms);
	            if (childResults.length)
	                matches.push(Object.assign({}, i, { children: childResults }));
	        }
	    })

	    return matches;
	},

  formatCurreny(num) {
    if(num == '' || num == null) return ''
    num = parseFloat(num)
    num = num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return '<span class="dollar-sign">$</span>' + '<span class="actual-price">' + num + '</span>'        
  },

  formatCurrenyRaw(num) {
    if(num == '') return ''
    num = parseFloat(num)
    num = num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return '$ ' + num      
  }

}

export default util