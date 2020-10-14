<template>
  <div class="home">
    <Navbar />
    <Carousel />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'


export default {
  name: 'Home',
  components: {
   Navbar,
   Carousel
  }
}
</script>
