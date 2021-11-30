<template>
  <div>
    <div class="web">
          <div class="header">
      <menubar />
    </div>
    <div class="container">
      <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                購物須知
              </li>
            </ol>
          </nav>
      <div class="intro">
        <img src="@/assets/img/shippinglist.png" alt="">
      </div>
        
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
.web{
  min-height:  calc( 100vh - 235px);
}
.container {
  margin-top: 64px;
  .intro{
    padding: 3%;
    display: flex;
    justify-content: center;
    img{
      width: 80%;
    }
  }
  nav{
    padding-top: 10px;
  }
}
   /*pad*/
   @media screen and (max-width: 768px) {
     .web{
       min-height: auto;
     }
    .container{
      .intro{
        img {
          width: 100%;
        }
      }
    }
  }
  

</style>