<template>
  <div>
    <div class="header">
      <menubar />
    </div>
    <div class="container">

    </div>
    <Footer/>
  </div>
</template>

<script>
import menubar from "./topmenu";
import Footer from "./footer.vue";
export default {
  components: {
    menubar,Footer
  },
  data() {
    return {
      
    };
  },
  created(){

  }
};
</script>

<style scoped>
.container {
  margin-top: 64px;
}
</style>