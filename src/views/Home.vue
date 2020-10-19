<template>
  <div class="home">   
    <Navbar />
    <Carousel />
    <Service />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src

import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Service from '../components/Service'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {
   Navbar,
   Carousel,
   Service,
   Footer
  }
}
</script>
