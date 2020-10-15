<template>
  <div class="home">   
    <Navbar />
    <Carousel />
     <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src

import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {
   Navbar,
   Carousel,
   Footer
  }
}
</script>
