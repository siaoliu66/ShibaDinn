<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="header">
      <menubar />
    </div>
    <div class="container" v-if="order.id">
      <div class="finish text-center">
        <i class="far fa-check-circle"></i>
      </div>
      <p class="text-center h4">您的訂單已經成立</p>
      <h4 class="text-center h3">訂單編號 : {{ order.id }}</h4>
      <div class="content">
        <div class="highlight">
          感謝您的訂購，匯款完成後<span style="font-weight:bolder;text-decoration: underline;letter-spacing">請務必私訊官方LINE</span>告知帳號末5碼，以便團隊後續審核。
        </div>
      </div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">產品名稱</th>
            <th scope="col">款式</th>
            <th scope="col">數量</th>
            <th scope="col">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <th scope="row">{{ item.product.title }}</th>
            <td>{{ item.unit }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.final_total | currency }}</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right"></td>
            <td>小計：</td>
            <td>{{ order.total | currency }}</td>
          </tr>
          <tr>
            <td colspan="2" class="text-right"></td>
            <td>運費:</td>
            <td>60</td>
          </tr>
          <tr class="sum">
            <td colspan="2" class="text-right"></td>
            <td>總計:</td>
            <td>{{ (order.total + 60) | currency }}</td>
          </tr>
        </tbody>
      </table>
      <div class="back">
        <router-link class="btn btn-secondary" to="/menu">回首頁</router-link>
      </div>
       
    </div>
    <Footer/>
  </div>
</template>
<style lang="scss" scoped>
.container {
  margin-top: 64px;
  .finish {
    padding: 25px;
    color: lightseagreen;
    i {
      font-size: 4.5em;
    }
    .h3 {
      letter-spacing: 2px;
    }
  }
  .content{
    background-color: rgb(208, 219, 255);
    width: 80%;
    margin: 0 auto;
    font-size: 16px;
    padding: 10px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    .highlight{
      color:red;
    }
    ul{
      margin-left: 45px;
      list-style: revert;;
    }
  }
  .table {
    border: 1px solid #dee2e6;
    width: 80%;
    margin: 0 auto;
    .sum {
      font-size: 18px;
    }
  }
  .order {
    margin: 0 auto;
  }
  h4 {
    margin-top: 10px;
    font-size: 1.3em;
  }
  .back{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
@media (max-width: 768px) {
  .container{
    .content,.table{
      width: 100%;
    }
  }
  
}
</style>
<script>
import menubar from "./topmenu";
import Footer from "./footer";
export default {
  components: { menubar,Footer },
  data() {
    return {
      OrderId: "",
      order: {
        user: {},
      },
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/order/${vm.OrderId}`;
      this.$http.get(url).then((response) => {
        console.log(response.data);
        vm.order = response.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/pay/${vm.OrderId}`;
      this.$http.post(url).then((response) => {
        console.log(response.data);
        vm.getOrder();
      });
    },
  },
  created() {
    this.OrderId = this.$route.params.order_id;
    this.getOrder();
  },
};
</script>