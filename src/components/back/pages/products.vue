<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="addProduct(true)">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>
            {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="addProduct(false, item)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="opendelModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @emit-page="getProducts" />

    <!-- add Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
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
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.Fileuploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="updatefile"
                  />
                </div>
                <img :src="tempProduct.imageUrl" class="img-fluid" alt="" />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">產品名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入產品名稱"
                    v-model="tempProduct.title"
                  />
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <select
                      name=""
                      class="form-control"
                      v-model="tempProduct.category"
                    >
                      <option value="上衣類">上衣類</option>
                      <option value="褲裙類">褲裙類</option>
                      <option value="零食類">零食類</option>
                      <option value="配件類">配件類</option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="content">款式</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="多種款式請用,分隔"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <hr />
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <editor
                    api-key="no-api-key"
                    v-model="tempProduct.description"
                    :init="init"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
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
            <button
              type="button"
              class="btn btn-primary"
              @click="updateProduct()"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- del Modal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
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
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "@/components/pagination";
import Editor from "@tinymce/tinymce-vue";
import tinymce from "tinymce/tinymce";

export default {
  components: {
    pagination,
    Editor,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        Fileuploading: false,
      },
      pagination: {},
      init: {
        height: 300,
        language: "zh_TW",
        menubar: false,
        automatic_uploads: true,
        file_picker_types: "image",
        image_title: true,
        
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = function () {
          var file = this.files[0];

          var reader = new FileReader();
          reader.onload = function () {
            /*
              Note: Now we need to register the blob in TinyMCEs image blob
              registry. In the next release this part hopefully won't be
              necessary, as we are looking to handle it internally.
            */
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            /* call the callback and populate the Title field with the file name */
            cb(blobInfo.blobUri(), { title: file.name });
          };
          reader.readAsDataURL(file);
        };

        input.click();
        },
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
          "code",
          // "imagetools",
        ],
        toolbar:
          'code | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      }
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    addProduct(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
        this.$router.push(`/admin/editor/-`);
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
        this.$router.push(`/admin/editor/${item.id}`);
      }    
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product`;
      let httpmethod = "post";
      console.log("post");
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product/${vm.tempProduct.id}`;
        httpmethod = "put";
        console.log("put");
      }
      this.$http[httpmethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response);
        this.getProducts();
        $("#productModal").modal("hide");
      });
    },
    opendelModal(item) {
      // $("#delProductModal").modal("show");
      this.tempProduct = Object.assign({}, item);
      
      var swalWithBootstrapButtons = this.$swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '你確定要刪除嗎?',
        text: "刪除後將無法回復",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確認',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(item)
          swalWithBootstrapButtons.fire(
            '已刪除!',
            '您的產品已成功刪除.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '取消',
            '您的產品還在噢 :)',
            'error'
          )
        }
      })
    },
    deleteProduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api).then((response) => {
        console.log(response);
        // $("#delProductModal").modal("hide");
        this.getProducts();
      });
    },
    updatefile() {
      const updatedfile = this.$refs.files.files[0];
      console.log(updatedfile);
      const vm = this;
      var formData = new FormData();
      formData.append("file-to-upload", updatedfile);
      const api = `${process.env.APIPATH}/api/${process.env.APIID}/admin/upload`;
      vm.status.Fileuploading = true;
      this.$http
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
            vm.status.Fileuploading = false;
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    },
  },
  mounted() {
    tinymce.init({});
  },
  created() {
    this.getProducts();
  },
};
</script>
<style lang="scss" scoped>
.swal2-actions{
  .btn{
    margin: 0 0.5rem !important
  }
}
</style>