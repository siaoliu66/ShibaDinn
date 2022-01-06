<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="top">
      <div class="search">
        <div class="input-group">
          <label class="input-group-text" for="inputGroupSelect01">搜尋條件</label>
          <select class="form-select" id="inputGroupSelect01" v-model="searchType">
            <option selected value="createId" @click="searchType = 'createId'">訂單編號</option>
            <option value="date" @click="searchType = 'date'">日期</option>
            <option value="name" @click="searchType = 'name'">訂購人</option>
          </select>
          <input type="text" id="searchBox" class="searchBox" v-model="searchVal">
        </div>
      </div>
      <download-excel :data="lists" :fields="json_fields" class="export">
        匯出報表
      </download-excel>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>功能</th>
          <th>訂單編號</th>
          <th>購買人</th>
          <th>購買時間</th>
          <th>購買項目</th>
          <th>購買款項</th>
          <th>購買數量</th>
          <th>訂單金額</th>
          <th>是否附款</th>
          <!-- <th>訂單狀況</th>  -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filterlist" :key="item.id">
          <td>
            <button
              class="btn btn-outline-secondary btn-sm"
              @click="openModal(item)"
            >
              查看
            </button>
            <button
              class="btn btn-outline-primary btn-sm" v-if="!item.is_paid"
              @click="editerModal(item)"
            >
              編輯
            </button>
          </td>
          <td>{{ item.id }}</td>
          <td>{{ item.user.name }}</td>
          <td>{{ item.create_at }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="productitem in item.products" :key="productitem.id">
                {{ productitem.product.title | ellipsis}}
              </li>
            </ul>
          </td>
          <td>            
            <ul class="list-unstyled">
              <li v-for="productitem in item.products" :key="productitem.id">
                {{ productitem.unit }}
              </li>
            </ul></td>
          <td>            
            <ul class="list-unstyled">
              <li v-for="productitem in item.products" :key="productitem.id">
                {{ productitem.qty}}
              </li>
            </ul></td>
          <td>{{ item.total+60 | currency }}</td>
          <td v-if="item.is_paid" class="text-success">已付款</td>
          <td v-else class="text-danger">尚未付款</td>
          <!-- <th>未出貨</th>  -->
        </tr>
      </tbody>
    </table>
<pagination :pages="pagination" @emit-page="getOrders" />
    <!-- 查看 -->
    <div
      class="modal fade"
      id="ordersModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>查看訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="border rounded m-2">
              <div class="order_title">訂購資訊</div>
              <table class="table order">
                <tbody v-if="tempProduct.user">
                  <tr>
                    <th scope="row">訂購人</th>
                    <td>{{ tempProduct.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">訂購人LINE名稱</th>
                    <td>{{ tempProduct.user.line }}</td>
                  </tr>
                  <tr>
                    <th scope="row">超商門市</th>
                    <td>{{ tempProduct.user.address }}</td>
                  </tr>
                  <tr>
                    <th scope="row">聯絡電話</th>
                    <td>{{ tempProduct.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="row">備註</th>
                    <td>{{ tempProduct.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="order_title">付款資訊</div>
              <table class="table order">
                <tbody>
                  <tr>
                    <th scope="row">訂購日期</th>
                    <td>{{ tempProduct.create_at }}</td>
                  </tr>
                  <tr>
                    <th scope="row">總金額</th>
                    <td>{{ tempProduct.total+60 | currency }}</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>
                      <span v-if="tempProduct.is_paid" class="text-success"
                        >付款成功</span
                      >
                      <span v-else>未付款</span>
                    </td>
                  </tr>
                  <tr v-if="tempProduct.is_paid">
                    <th scope="row">付款日期</th>
                    <td>{{ tempProduct.paid_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="product_title">訂單內容</div>
              <table class="table">
                <thead>
                  <th>商品名稱</th>
                    <th width="100">數量</th>
                    <th width="100">款式</th>
                    <th width="100">總價</th>
                    <th width="100"></th>
                </thead>
                <tbody>
                  <tr v-for="item in tempProduct.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}</td>
                    <td class="align-middle">{{ item.unit }}</td>
                    <td class="align-middle text-right">
                      {{ item.final_total | currency }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <!-- <tr>
                                <td colspan="2" class="text-right">優惠券折扣</td>
                                <td class="text-right" >{{ filtercoupon }}</td>
                            </tr> -->
                  <tr>
                    <td colspan="3" class="text-right">超商運費</td>
                    <td class="text-right">
                      {{ 60 | currency }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">
                      {{ tempProduct.total+60 | currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 編輯 -->
    <div
      class="modal fade"
      id="editerModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>修改訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="border rounded m-2">
              <div class="order_title">訂購資訊</div>
              <table class="table order">
               <tbody v-if="tempProduct.user">
                <tr>
                    <th scope="row">訂購人</th>
                    <td>{{ tempProduct.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="row">訂購人LINE名稱</th>
                    <td>{{ tempProduct.user.address }}</td>
                  </tr>
                  <tr>
                    <th scope="row">聯絡電話</th>
                    <td>{{ tempProduct.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="row">備註</th>
                    <td>{{ tempProduct.message }}</td>
                  </tr>
                </tbody> 
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="order_title">付款資訊</div>
              <table class="table order">
                <tbody>
                  <tr>
                    <th scope="row">訂購日期</th>
                    <td>{{ tempProduct.create_at }}</td>
                  </tr>
                  <tr>
                    <th scope="row">總金額</th>
                    <td>{{ tempProduct.total | currency }}</td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td>
                      <span v-if="tempProduct.is_paid" class="text-success"
                        >付款成功</span
                      >
                      <span v-else class="text-danger">未付款 <button class="btn btn-warning" @click="payOrder()">進行付款</button></span>
                    </td>
                  </tr>
                  <tr v-if="tempProduct.is_paid">
                    <th scope="row">付款日期</th>
                    <td>{{ tempProduct.paid_date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="border rounded m-2">
              <div class="product_title">訂單內容</div>
              <table class="table">
                <thead>
                  <th>商品名稱</th>
                    <th width="100">數量</th>
                    <th width="100">款式</th>
                    <th width="100">總價</th>
                    <th width="100"></th>
                </thead>
                <tbody>
                  <tr v-for="item in tempProduct.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}</td>
                    <td class="align-middle">{{ item.unit }}</td>
                    <td class="align-middle text-right">
                      {{ item.final_total | currency }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <!-- <tr>
                                <td colspan="2" class="text-right">優惠券折扣</td>
                                <td class="text-right" >{{ filtercoupon }}</td>
                            </tr> -->
                  <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">
                      {{ tempProduct.total | currency }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <!-- <button
              type="button"
              class="btn btn-primary"
              @click="updateOrders()"
            >
              確認
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.order_title,
.product_title {
  color: #9a9ea2;
  padding: 10px;
}
.order {
  th {
    width: 150px;
  }
}
.info {
  display: flex;
  padding: 8px;
  margin-bottom: 12px;
  justify-content: space-between;
  .order_date,
  .order_price,
  .order_financial_status,
  .order_paiddate {
    font-size: 1.2em;
    color: #9a9ea2;
    span {
      color: black;
    }
  }
}
.export{
  margin: 10px;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  display: block;
  float:right;
}
.top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search{
      width: 70%;
      .input-group{
        .form-select{
          width: 20%;
          border: 1px solid #c4cbcf;
        }
        .searchBox{
          width: 40%;
          margin-left: 5px;
          border: 1px solid #c4cbcf;
        }
    }
    }    
}
</style>
<script>
import $ from "jquery";
import pagination from '@/components/pagination'

export default {
    components:{
        pagination
    },
  data() {
    return {
      searchVal:'',
      searchType:'createId',
      lists: [],
      tempProduct: {},
      isLoading: false,
      pagination:{},
      //產報表data
      json_fields: {
        訂單編號: "id",
        購買日期: "create_at",
        購買人: {
            field: "user",
            callback: (value) => {
                return `${value.name}`;
            },
        },
        產品名稱: {
            field: "products",
            callback: (value) => {
                let title = "";
                Object.keys(value).forEach(i => {
                title += `${value[i].product.title}\n`;
                });
                return title;
            },
        },
        產品款式: {
            field: "products",
            callback: (value) => {
                let unit = "";
                Object.keys(value).forEach(i => {
                unit += `${value[i]["unit"]}\n`;
                });
                return unit;
            },
        },
        產品數量: {
            field: "products",
            callback: (value) => {
                let num = "";
                Object.keys(value).forEach(i => {
                num += `${value[i]["qty"]}\n`;
                });
                return num;
            },
        },
        訂單總金額:"total",
        付款狀況: "is_paid",
        付款日期:"paid_date"
        },
        json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/orders?page=${page}`;
      (vm.isLoading = true),
        this.$http.get(api).then((response) => {
          console.log(response);
          vm.isLoading = false;
          vm.lists = response.data.orders;
          vm.pagination = response.data.pagination
          console.log(vm.lists);
          vm.lists.forEach((item) => {
            const dates1 = new Date(item.create_at * 1000);
            const year = dates1.getFullYear();
            const month = dates1.getMonth() + 1;
            const date = dates1.getDate();
            const Hour = dates1.getHours();
            const Min = dates1.getMinutes();
            item.create_at = `${year}/${month}/${date} ${Hour}:${Min}`;
            const dates2 = new Date(item.paid_date * 1000);
            const year2 = dates2.getFullYear();
            const month2 = dates2.getMonth() + 1;
            const date2 = dates2.getDate();
            const Hour2 = dates2.getHours();
            const Min2 = dates2.getMinutes();
            item.paid_date = `${year2}/${month2}/${date2} ${Hour2}:${Min2}`;
          }); //讓Unix Timestamp轉回一般日期格式顯示
        });
        
    },
    payOrder(){
            const vm = this;
            vm.isLoading = true
            const url = `${process.env.APIPATH}/api/${process.env.APIID}/pay/${vm.tempProduct.id}`
            this.$http.post(url).then((response) => {                
                console.log(response.data);
                this.getOrders();
                vm.isLoading = false
                $("#editerModal").modal("hide");
            });
        },
    openModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#ordersModal").modal("show");
    },
    editerModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#editerModal").modal("show");
    },
  },
  computed: {
    filterlist: function (){
      const vm = this
        if(vm.searchVal == ''){
          return vm.lists
      }else{
        var filterlist = []
        if(vm.searchType == 'createId'){
          vm.lists.forEach(function(item){
              if(item.id.indexOf(vm.searchVal) != -1){
                filterlist.push(item);
              }
            })
          return filterlist
        }else if(vm.searchType == 'date'){
          vm.lists.forEach(function(item){
              if(item.create_at.indexOf(vm.searchVal) != -1){
                filterlist.push(item);
              }
            })
         return filterlist
        }else{
          vm.lists.forEach(function(item){
              if(item.user.name.indexOf(vm.searchVal) != -1){
                filterlist.push(item);
              }
            })
         return filterlist
        }
      }
    }
  },
  filters:{
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 5) {
        return value.slice(0,5) + '...'
      }
      return value
    }
  },
  created() {
    this.getOrders();
  },
};
</script>