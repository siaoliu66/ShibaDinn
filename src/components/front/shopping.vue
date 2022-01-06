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
        <!-- <img src="@/assets/img/shippinglist.png" alt=""> -->
        <p>
          🌟購物須知🌟</p>

<p>📍下單完成產生訂單後，至官方LINE告知姓名或訂單編號，索取匯款資訊</p>

<p>📍付款方式：轉帳(提供郵局及多家銀行帳號)；暫無刷卡服務</p>

<p>📍寄送方式及運費：超商店到店(四大超商皆可)，運費60元。</p>

<p>📍到貨時間：收單後約7-14天抵台理貨寄出，寄出後會私訊通知。
        </p>
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
    padding: 20px;
    p{
      font-size: 1.3rem;
      margin-bottom: 20px;
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