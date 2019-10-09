<template>
	<section>
		<!-- body Start -->
	<div class="dis-detail-sec who-we" :style="'background-image: url(' + banner + ')'">
		<h2>Quieres ser distribuidor</h2>
	</div>
	<div class="distributor-detail-content faq-sec privat-sec">
		<div class="container">
			<span v-html="content"></span>
		</div>
	</div>
	
	</section>

</template>
<script>
	export default {
    layout: 'frontend',
    data: () => {
     return {
	      
	    }
    },
	async asyncData({ $axios }) {
      	const data = await $axios.$get('pages/quieres-ser-distribuidor')
      	return { content: data.data.body, title : data.data.title, banner : data.data.page_banner}
	}
};
</script>