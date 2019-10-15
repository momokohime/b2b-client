<template>
  <div>
    <h1>{{ $t('title') }}</h1>
    <figure class="zoom" v-on:mousemove="magnifyImage($event)" style="background-image: url(//images.unsplash.com/photo-1421429167374-8fc8ab6d0f66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)">
      <img src="//images.unsplash.com/photo-1421429167374-8fc8ab6d0f66?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
    </figure>
    <!-- <img class="figure.zoom" src="//res.cloudinary.com/active-bridge/image/upload/slide1.jpg" v-on:mousemove="magnifyImage" alt="test"> -->
    <button @click="changeLanguage('en')">English</button>       
    <button @click="changeLanguage('es')">Spanish</button>
  </div>
</template>

<style lang="scss">
  figure.zoom {
  & img:hover {
    opacity: 0;
  }
  img {
    transition: opacity .5s;
    display: block;
    width: 100%;
  }
  background-position: 50% 50%;
  position: relative;
  width: 500px;
  overflow: hidden;
  cursor: zoom-in;
}
</style>
<script>
  import helper from '~/utils/helper'
  export default {
    components: {
     
    },
    data: function() {
        this.$i18n.locale = 'en';
        return {
            locale: 'en'
        };
    },
    methods: {
    changeLanguage(lang) {  
      this.$i18n.locale = lang;
    },
    magnifyImage(e) {      
      var zoomer = e.currentTarget;
      if(e.offsetX <= 0 || e.offsetY <= 0) {
        return;
      }
      var offsetX, offsetY
      e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX
      e.offsetY ? offsetY = e.offsetY : offsetX = e.touches[0].pageX
      var x = offsetX/zoomer.offsetWidth*100
      var y = offsetY/zoomer.offsetHeight*100
      zoomer.style.backgroundPosition = x + '% ' + y + '%';
    }
  },
  mounted() {
    const users = [{ name: 'fred', age: 48 }, { name: 'barney', age: 36 }, { name: 'fred', age: 40 }];
    const foo = helper.orderBy(users, ['name', 'age'])
    console.log(foo, '00 -- 00')
  }
  }
</script>