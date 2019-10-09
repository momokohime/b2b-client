
export default function ({
  store,
  redirect
}) {
	
  const user = store.state.auth.user
  const auth = store.state.auth.loggedIn
  
  if(!auth) {
  	return redirect('/');
  }

  if (user.is['admin'] || user.is['VD'] || user.is['TK']) {
  	//
  } else {
    return redirect('/')

  }

}
