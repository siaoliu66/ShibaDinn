<template>
  <div>
      <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-left">
            {{ item.price | currency}}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="opendelModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @emit-page="getProducts" />
    
    <!-- add Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl" >
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <i class="fas fa-spinner fa-spin" v-if="status.Fileuploading"></i>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" @change="updatefile">
                        </div>
                        <img :src="tempProduct.imageUrl"
                        class="img-fluid" alt="">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">產品名稱</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入產品名稱"  v-model="tempProduct.title">
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            placeholder="請輸入分類"  v-model="tempProduct.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            placeholder="請輸入售價"  v-model="tempProduct.price">
                        </div>
                        </div>
                        <div class="form-group">
                            <label for="content">款式</label>
                            <textarea type="text" class="form-control" id="content"
                            placeholder="多種款式請用,分隔"  v-model="tempProduct.content"></textarea>
                        </div>
                        <hr>
                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <!-- <textarea name="editor1" v-model="tempProduct.description"></textarea> -->
                        <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述"  v-model="tempProduct.description"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled"  v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
                </div>
                </div>
            </div>
            </div>
            <!-- del Modal -->
            <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="deleteProduct()"
                >確認刪除</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from '@/components/pagination'



export default {
    components:{
        pagination,
    },
    data() {
        return {
            products:[],
            tempProduct:{},
            isNew:false,
            isLoading:false,
            status:{
                Fileuploading:false
            },
            pagination:{},
        }
    },
    methods: {
        getProducts(page = 1) {
            const vm = this
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/products?page=${page}`
            vm.isLoading = true
            this.$http.get(api).then((response) => {
                console.log(response.data)
                vm.isLoading = false
                vm.products = response.data.products
                vm.pagination = response.data.pagination
            })
        },
        openModal(isNew,item) {
            if(isNew){
                this.tempProduct = {}
                this.isNew = true
            }else{
                this.tempProduct = Object.assign({},item)
                this.isNew = false
            }
            $('#productModal').modal('show')
        },
        updateProduct() {
            const vm = this
            let api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product`
            let httpmethod = 'post'
            console.log('post')
            if(!vm.isNew){
                api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product/${vm.tempProduct.id}`
                httpmethod = 'put'
                console.log('put')
            }
            this.$http[httpmethod](api,{data:vm.tempProduct}).then((response) => {
                console.log(response)
                this.getProducts();
                $('#productModal').modal('hide')
            })
        },
        opendelModal(item) {
            $('#delProductModal').modal('show')
            this.tempProduct = Object.assign({},item)
        },
        deleteProduct() {
            const vm = this
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product/${vm.tempProduct.id}`
            this.$http.delete(api).then((response) => {
                console.log(response)
                $('#delProductModal').modal('hide')
                this.getProducts();
            })
        },
        updatefile() {
            const updatedfile = this.$refs.files.files[0]
            const vm = this
            var formData = new FormData();
            formData.append('file-to-upload', updatedfile);
            const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/upload`
            vm.status.Fileuploading = true
            this.$http.post(api,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response)
                if(response.data.success){
                    vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl) 
                    vm.status.Fileuploading = false
                }else{
                    this.$bus.$emit('message:push',response.data.message,'danger');
                }
            })
        }
    },
    created() {
        this.getProducts();
    },
}
</script>