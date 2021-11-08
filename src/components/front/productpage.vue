<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert></alert>
    <div class="web">
      <div class="header">
        <menubar />
      </div>
      <div class="container">
      <!-- 購物車 -->
        <div class="cart">
          <a href="#/cart" class="">
            <span class="cartsnum">{{ totalQty }}</span>
            <i class="fas fa-shopping-basket"></i>
          </a>
        </div> 
        <a
              href="#/menu"
              class="btn btn-outline-secondary back"
            >
              回到商品頁
            </a>
            <div class="product">
          <div class="row">
            <div class="col-md-6">
          <div
            :style="{ backgroundImage: `url( ${product.imageUrl})` }"
            class="img-fluid productImg"
            alt=""
          ></div>
        </div>
        <div class="producttext col-md-6 mt-3">
          <p class="producttitle mb-3">{{ product.title }}</p>
          <table class="table table-borderless">
              <tbody>
                  <tr>
                      <th scope="row">團購價：</th>
                      <td>  NTD {{product.price}} </td>
                  </tr>
                  <tr>
                      <th scope="row">款式：</th>
                      <td>
                            <select name="" class="form-control" v-model="product.unit">
                                <option :value="content" v-for="content in filterContent" :key="content">
                                {{ content }} 
                                </option>
                            </select>
                      </td>
                  </tr>
                  <tr>
                      <th scope="row">數量：</th>
                      <td>
                          <select name="" class="form-control mb-2" v-model="product.num">
                            <option :value="num" v-for="num in 10" :key="num">
                             {{ num }} 
                            </option>
                        </select>
                      </td>
                  </tr>
              </tbody>
          </table>
          <div class="d-flex justify-content-end align-items-baseline">
            <div class="total">
              合計 {{ product.price * product.num }} 元
            </div>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm "
              @click.prevent="addTocart(product.id,product.num,product.unit)"
            >
              <i class="fas fa-cart-plus"></i>
              加到購物車
            </button>
          </div>
        </div>
        </div>
      </div>
        <div class="rommand">
          <div class="mb-3">
            <div class="h4">商品描述</div>
            <div class="productdes" v-html="product.description">
                <!-- {{ filterText }} -->
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menubar from "./topmenu";
import alert from "../alertMesseges";
import $ from 'jquery'

export default {
  components: {
    menubar,alert
  },
  data() {
    return {
      product_id: "",
      category: "",
      product: {},
      products: [],
      cart: {},
      isLoading: false,
      status: {
        isLoadingitem: "",
      },
    };
  },
  methods: {
    getproduct() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/product/${vm.product_id}`;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        console.log(response);
        vm.status.loadingItem = "";
        vm.product.num = 1; //預設數量
        vm.category = vm.product.category
      });
      vm.isLoading = false;
 
    },
    addhtml(){
        const vm = this
        if(vm.product.description){
        var str = vm.product.description
        console.log(str)
        return str.replace(/\\n/g,'<br>')
    }
    },
    addTocart(id, qty, unit) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty: qty,
        unit: unit,
      };
      this.$http.post(url, { data: cart }).then((response) => {
        vm.status.loadingItem = "";
        vm.getcartproduct();
        this.$bus.$emit('message:push',"已加入購物車",'success')
      });
    },
    getcartproduct() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        // console.log(response.data.data.carts);
        vm.isLoading = false;
      });
    },
     getproducts() {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        response.data.products.forEach((data) => {
          if (data.is_enabled == 1 &&　data.category == vm.category) {
            vm.products.push(data);
            console.log(data)
          }
        });
        console.log(vm.products)
        vm.isLoading = false;
      });
    },
    goproduct(id) {
      const vm = this;
      vm.$router.push(`/productpage/${id}`);
    },
  },
  computed:{
      filterContent:function(){
          const vm = this
          if(vm.product.content){
              var str = vm.product.content
              str = str.split(',')
              return str
          }
          
      },
      totalQty: function () {
        var totalNum = 0;
        if (this.cart.carts) {
          this.cart.carts.forEach(function (item) {
            totalNum += item.qty;
          });
        }
        return totalNum;
      },
    //   filterText:function(){
    //       const vm = this
    //       var text = vm.product.description
    //       text = text.replace(/\\n/g,'<br>')
    //       return text
    //   }
  },
  created() {
    this.product_id = this.$route.params.product_id;
    this.getproduct();
    this.getproducts();
    this.getcartproduct()
  },
};
</script>

<style lang="scss" scoped>
.price{
    color:#ee4863
  }
  .disprice{
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  .total{
    margin-right: 10px;
    font-size: 1.1em;
  }

</style>