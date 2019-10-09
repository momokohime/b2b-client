<template>
	<div class="footer-section">
	<div class="container">
	  <div class="row">
	     <div class="col-xs-12 col-sm-12 col-md-4 col-lg-6">
		    <div class="row">
			<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
			<div class="footer-heading">
			   <h2>EMPRESA</h2>
			   <ul>
				  	<li class="list-inline-item"> <nuxt-link to="/nosotros">Nosotros</nuxt-link></li>
				  	<li class="list-inline-item"> <nuxt-link to="/preguntas-frecuentes">Preguntas Frecuentes</nuxt-link></li>
				  	<!-- <li class="list-inline-item"> <nuxt-link to="/quieres-ser-distribuidor">¿Quieres ser distribuidor?</nuxt-link></li>	 -->
				  	<li class="list-inline-item"> <nuxt-link to="/contactos">Contacto</nuxt-link></li>
				  		
			   </ul>
			</div>
			</div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"> 
						<div class="footer-heading">
			   <h2>EXPLORAR</h2>
			   <ul>
			     <!--  <li class="list-inline-item"> <nuxt-link to="/distributors">Encuentra tu Distribudor</nuxt-link></li> -->
			      <li class="list-inline-item"> <nuxt-link to="/catalogos">Catalogos</nuxt-link></li>
								
			   </ul>
			</div>
			</div>
			<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
				<div class="footer-heading">
			   <h2>LEGAL</h2>
			   <ul>
			   	<li class="list-inline-item"> <nuxt-link to="/terminos-y-condiciones">Términos y condiciones</nuxt-link></li>
			   	<li class="list-inline-item"> <nuxt-link to="/garantias-y-devoluciones">Garantías y devoluciones</nuxt-link></li>
			     <li class="list-inline-item"> <nuxt-link to="/aviso-de-privacidad">Aviso de privacidad</nuxt-link></li>
			   </ul>
			</div>
			
			</div>
			</div>
		 
		 </div>
		 <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3">
		    <div class="footer-text">
			   <p>Se parte de nuestros clientes y disfrutra de todos los beneficios</p>
			   <nuxt-link v-if="!isAuthenticated" to="/registrarme">REGISTRARME</nuxt-link>
			</div>

		<!-- Whatsapp floating button starts -->
     <a href="https://api.whatsapp.com/send?phone=5217714031130&text=Hola" class="whatsapp-float" target="_blank">
    <i class="fa fa-whatsapp whatsapp-my-float"></i>
    </a>
    <!-- Whatsapp floating button ends -->

		 </div>
		 <div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 text-center">
		    <div class="footer-inner-logo">
			<!-- <img src="~/assets/frontend/images/auto-motoriz-logo.png"> -->
      <img src="~/assets/images/logo-footer.svg">
			<h2>SÍGUENOS EN</h2>
			<ul>
			<li><a href="https://www.facebook.com/Automotriz-Serva-177048648987603/"><i class="fa fa-facebook-square" aria-hidden="true"></i></a></li>
			<li><a href="https://twitter.com/@AutomotrizServa"><i class="fa fa-twitter-square" aria-hidden="true"></i></a></li>
			<li><a href="https://www.youtube.com/channel/UCTd4Kqm8OhKRA8hTfliGuAQ"><i class="fa fa-youtube-square" aria-hidden="true"></i></a></li>
			</ul>
			</div>
		 
		 </div>
	  </div>
	  <div class="copyright border-top">
	      <p>©{{date.getFullYear()}} Automotriz Serva. Todos Los derechos reservados</p>
	  </div>
	</div>
	
	</div>
	

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'f-footer',
   data() {
   	  return {
   	    date : new Date()	
   	  }
   },
   computed: {
    ...mapGetters({
	  isAuthenticated: 'isAuthenticated'
	}),
  }
};
</script>