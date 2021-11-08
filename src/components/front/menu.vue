<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <alert></alert>
    <div class="web">
      <div class="header">
        <menubar />
      </div>
      <div class="menu_container">
        <!-- 購物車 -->
        <div class="cart">
          <a href="#/cart" class="">
            <span class="cartsnum">{{ totalQty }}</span>
            <i class="fas fa-shopping-basket"></i>
          </a>
        </div> 

        <div class="container pt-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="#/index">首頁</a></li>
              <li class="breadcrumb-item active" aria-current="page">
                團購商品
              </li>
            </ol>
          </nav>
          <div class="row">
            <div class=" col-md-3 col-lg-2">
              <!-- 手機版分類選單 -->
              <div class="form-mobile">
                <select
                  id="FormControlSelect1"
                  class="form-control btn-secondary"
                  v-model="category"
                >
                  <option value="all" @click="category = 'all'">全部</option>
                  <option value="shirt" @click="category = 'shirt'">上衣類</option>
                  <option value="trousers" @click="category = 'trousers'">褲裙類</option>
                  <option value="snack" @click="category = 'snack'">零食類</option>
                  <option value="Accessories" @click="category = 'Accessories'">配件類</option>
                  </select>              
                </div>
                <!-- 手機版分類選單結束 -->
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'all'"
                    :class="{ active: category == 'all' }"
                    >全部</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'shirt'"
                    :class="{ active: category == 'shirt' }"
                    >上衣類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'trousers'"
                    :class="{ active: category == 'trousers' }"
                    >褲裙類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'snack'"
                    :class="{ active: category == 'snack' }"
                    >零食類</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    @click="category = 'Accessories'"
                     :class="{ active: category == 'Accessories' }"
                    >配件類</a
                  >
                </li>
              </ul>
            </div>

            <div class=" col-md-9 col-lg-10 ml-sm-auto px-md-4">
              <div class="row mt-4">
                <div
                  class="col-lg-4 col-md-6 mb-4"
                  v-for="item in filterProducts"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm">
                    <div
                      style="
                        height: 200px;
                        background-size: cover;
                        background-position: center;
                      "
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>
                    <div class="card-body d-flex justify-content-between align-item-center">
                      <h5 class="card-title">
                        {{ item.title }}
                      </h5>
                      <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span>
                      
                    </div>
                    <div class="card-footer d-flex justify-content-between align-item-center">
                        <div class="h5" v-if="item.price">
                          現在只要 <span style="color:#ee3f4d">{{ item.price | currency }} </span>元
                        </div>
                      <button
                        type="button"
                        class="btn btn-outline-secondary btn-sm"
                        @click.prevent="getproduct(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.isLoadingitem === item.id"
                        ></i>
                        查看更多
                      </button>
                      <!-- <button
                        type="button"
                        class="btn btn-outline-danger btn-sm ml-auto"
                        @click.prevent="addTocart(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.isLoadingitem === item.id"
                        ></i>
                        加到購物車
                      </button> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.nav {
  margin-top: 30px;
  .nav-item {
    font-size: 1.3em;
  }
  .active {
    color: #fff;
    background-color: #007bff;
  }
}
span.badge {
  font-size: 1em;
}
.img-fluid {
  height: 310px;
  background-size: cover;
  background-position: center center;
}
@media (max-width: 1140px) {
  .h5,
  .h6 {
    font-size: 1em;
  }
}
</style>
<script>
import menubar from "./topmenu";
import alert from '../alertMesseges'
import $ from "jquery";

export default {
  components: {
    menubar,alert
  },
  data() {
    return {
      products: [],
      product: {},
      isLoading: false,
      pagination: {},
      status: {
        isLoadingitem: "",
      },
      cart: {},
      conpon_code: "",
      category: "all",
      storageArray: [],
      fav: JSON.parse(localStorage.getItem("Favorite")) || [],
    };
  },
  methods: {
    getproducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        // vm.products = response.data.products;
        response.data.products.forEach((data) => {
          if (data.is_enabled == 1) {
            vm.products.push(data);
          }
        });
        console.log(vm.products);
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
        this.getLocalStorage();
      });
    },
    getproduct(id) {
      const vm = this;
      vm.$router.push(`/productpage/${id}`);
    },
    addTocart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then((response) => {
        // vm.cart = response.data.data;
        console.log(response);
        vm.status.loadingItem = "";
        vm.getcartproduct();
        $("#productModal").modal("hide");
      });
    },
    delcart(id) {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.APIID}/cart/${id}`;
      vm.isLoading = true;
      this.$http.delete(url).then((response) => {
        // console.log(response.data);
        vm.getcartproduct();
        vm.isLoading = false;
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
    addFavorite(item) {
      const vm = this;
      if (vm.storageArray.indexOf(item) === -1) {
        vm.storageArray.push(item);
        this.$bus.$emit('message:push',"已加入我的最愛",'success')
        // console.log("已加入我的最愛")
      } else {
        vm.storageArray.splice(vm.storageArray.indexOf(item), 1);
        this.$bus.$emit('message:push',"已從我的最愛移除",'warning')
      }
      vm.fav = vm.storageArray.map((item) => item.id);
      localStorage.setItem("Favorite", JSON.stringify(vm.fav));
    },
    getLocalStorage() {
      const vm = this;
      console.log(this.products);
      vm.fav.forEach((item) => {
        vm.products.forEach((data) => {
          if (item === data.id) {
            vm.storageArray.push(data);
          }
        });
      });
    },
  },
  created() {
    this.getproducts();
    this.getcartproduct();
  },
  computed: {
    filterProducts: function () {
      if (this.category == "all") {
        return this.products;
      } else if (this.category == "shirt") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "上衣類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else if (this.category == "trousers") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "褲裙類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else if (this.category == "snack") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "零食類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else if (this.category == "Accessories") {
        var newsproducts = [];
        this.products.forEach(function (item) {
          if (item.category == "配件類") {
            newsproducts.push(item);
          }
        });
        return newsproducts;
      } else {
        return this.storageArray;
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
    totalfav: function () {
      var totalfav = 0;
      if (this.storageArray) {
        totalfav = this.storageArray.length;
      }
      return totalfav;
    },
  },
};
</script>