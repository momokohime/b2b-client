// https://github.com/robinvdvleuten/vuex-persistedstate/issues/88#issuecomment-506377499

import createPersistedState from 'vuex-persistedstate'
 
export default ({store}) => {
  createPersistedState({
      key: 'b2bautoparts',
      // reducer (val) {        
      //   if(val.auth.loggedIn === false) {
      //     return {}
      //   }
      //   return val
      // }
      // paths: [...]
      // ...
  })(store)
}
 