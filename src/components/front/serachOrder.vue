<template>
<div>
    <div class="web">
    <div class="header">
        <menubar/> 
    </div>
    <div class="container">
        <div class="search">
            <div class="title bg-info">
                訂單查詢
            </div>
            <div class="content">
                <label for="name">訂購人姓名 : </label>
                <input type="text" name="name" id="name" placeholder="請輸入訂購人姓名" v-model="name">
                <div class="or">OR</div>
                <label for="orderid">訂單編號 : </label>
                <input type="text" name="orderid" id="orderid" placeholder="請輸入訂單編號" v-model="orderid">
                <div><input type="submit" value="查詢"  class="btn btn-primary" @click="searchlist"></div>
            </div>
        </div>
                   <table class="table mt-4" v-if="templist[0]">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>購買時間</th>
          <th>購買項目</th>
          <th>購買款項</th>
          <th>購買數量</th>
          <th>訂單金額</th>
          <th>是否附款</th>
          <th>訂單狀況</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in templist" :key="item.id">
          <td data-label="訂單編號">{{ item.id }}</td>
          <td data-label="購買時間">{{ item.create_at }}</td>
          <td data-label="購買項目">
            <ul class="list-unstyled">
              <li v-for="productitem in item.products" :key="productitem.id">
                {{ productitem.product.title }}
              </li>
            </ul>
          </td>
          <td data-label="購買款項">            
            <ul class="list-unstyled">
              <li v-for="productitem in item.products" :key="productitem.id">
                {{ productitem.unit }}
              </li>
            </ul></td>
          <td data-label="購買數量">            
            <ul class="list-unstyled">
              <li v-for="productitem in item.products" :key="productitem.id">
                {{ productitem.qty}}
              </li>
            </ul></td>
          <td data-label="訂單金額">{{ item.total | currency }}</td>
          <td data-label="是否附款" v-if="item.is_paid" class="text-success">已付款</td>
          <td data-label="是否附款" v-else class="text-danger">尚未付款</td>
          <td data-label="訂單狀況">未出貨</td> 
        </tr>
      </tbody>
    </table>
    </div>
    </div>
    <Footer/>
</div>
</template>

<script>
import menubar from './topmenu'
import Footer from "./footer.vue";

export default {
    components: {
        menubar,Footer
    },
    data( ){
        return{
            name:'',
            orderid:'',
            lists:[],
            templist:[],
        }
    },
    methods:{
        getOrders(page = 1) {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/orders?page=${page}`;
            vm.isLoading = true,
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
                    item.create_at = `${year}/${month}/${date}`;
                    const dates2 = new Date(item.paid_date * 1000);
                    const year2 = dates2.getFullYear();
                    const month2 = dates2.getMonth() + 1;
                    const date2 = dates2.getDate();
                    item.paid_date = `${year2}/${month2}/${date2}`;
                }); //讓Unix Timestamp轉回一般日期格式顯示
            });
        },
        searchlist(){
            const vm = this
            vm.templist=[]
            if(vm.name !=''){
                vm.lists.forEach(function(item){
                    if(item.user.name == vm.name){
                        vm.templist.push(item);
                    }
                })
                if(vm.templist == ''){
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: '查無此單，請重新查詢',
                    })
                }
                vm.name=''
            }else if(vm.orderid !=''){
                vm.lists.forEach(function(item){
                    if(item.id == vm.orderid){
                        vm.templist.push(item);
                    }
                })
                if(vm.templist == ''){
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: '查無此單，請重新查詢',
                    })
                }
                vm.orderid=''
            }else if(vm.orderid =='' && vm.name ==''){
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: '請輸入訂購人姓名或訂單編號',
                })
            }
            
        },
    },
    created() {
        this.getOrders();
    },
}
</script>

<style lang="scss" scoped src="@/assets/customcss/rwd.css"></style>

<style lang="scss" scoped>
.web{
    min-height:  calc( 100vh - 235px);
}
.container{
    padding-top: 30px;
    .search{
        border: 1px solid rgb(221, 213, 213);
        .title{
            font-size: 20px;
            padding: 10px;
            color: #fff;
            border-bottom: 1px solid rgb(221, 213, 213);
        }
        .content{
            padding: 40px;
            font-size: 16px;
            text-align: center;
            label{
                width: 100px;
            }
            .or{
                margin: 15px;
                font-size: 18px;
            }
            input[type=submit]{
                margin-top: 20px;
                width: 100px;
            }
        }
    }
    .table{
        border: 1px solid #dee2e6;
    }       
}
/*pad*/
@media screen and (max-width: 768px) {
.web {
    min-height: auto;

}
}
@media (max-width: 414px){
    .container{
        .search{
            margin: 0;
            margin-bottom: 20px;
            .content{
                padding: 10px 5px;
                input[type=submit]{
                    margin-top: 15px;
                }
            }
        }
    }
}

</style>