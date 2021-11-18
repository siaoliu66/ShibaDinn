<template>
  <div>
    <div class="header">
      <menubar />
    </div>
    <div class="container">
      <div class="intro">
        <img src="@/assets/img/shippinglist.png" alt="">
      </div>
        
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

<style lang="scss" scoped>
.container {
  margin-top: 64px;
  height: 680px;
  .intro{
    padding: 3%;
    display: flex;
    justify-content: center;
    img{
      width: 80%;
    }
  }
}
</style>