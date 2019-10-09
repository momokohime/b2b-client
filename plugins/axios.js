export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {  	
    const code = parseInt(error.response && error.response.status)
    if (code >= 500 || code == 400) {
      // window.alert('Something went wrong.');
    }
  })
}