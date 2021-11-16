<template>
    <div>
        <div class="web">
            <div class="header">
            <menubar/>
        </div>
        <div class="wrap">
            <div class="container" >
                <img class="logoimg" :src="imgUrl" alt="">
                <label for="price">商品金額</label>
                <input type="number" class="form price" id="price" placeholder="請輸入日幣金額" v-model.number="price">
                <label for="shipping">日本境內運費</label>
                <input type="number" class="form shipping" id="shipping" placeholder="請輸入日本境內運費,無運費請填0"  v-model.number="shipping">
                <label for="num">預估重量</label>
                <input type="number" class="form num" id="num" placeholder="請輸入預估重量(公斤)" v-model.number="num">
                <p class="mt-1">*重複查詢代購費，必須重新點擊計算價格。</p>
                <button @click="cal()">計算價格</button>
            </div>
                <hr>
               <div class="text" id="text" v-if="totalPrice">
                
                <p v-if="shipping==0">📣報價如下<br>🔷商品金額：<span class="Price">{{price | toCurrency}}</span> * 0.270 = <span class="totalPrice">{{totalPrice | toCurrency}}</span><br>
                🔷國際運費：1公斤250元<br>
                🔷應付金額：<span class="totalPrice">{{totalPrice | toCurrency}}</span> + <span class="Num">250*{{num | toCurrency}}</span>(重量預估1kg以內) + 60(超商運費) = <span class="finalPrice">{{finalPrice | toCurrency}}</span></p>
                
                <p v-else>📣報價如下<br>
                🔷商品金額：[<span class="Price">{{price | toCurrency}}</span> + <span class="Shipping">{{shipping | toCurrency}}</span>(日本境內運費)]* 0.270 = <span class="totalPrice">{{totalPrice | toCurrency}}</span><br>
                🔷國際運費：1公斤250元<br>
                🔷應付金額：<span class="totalPrice">{{totalPrice | toCurrency}}</span> + <span class="Num">250*{{num | toCurrency}}</span>(重量預估1kg以內) + 60(超商運費) = <span class="finalPrice">{{finalPrice | toCurrency}}</span></p>
                
                </div>
                <div class="copy" v-if="totalPrice">
                  <button @click="copyToClipboard('#text')">點擊複製</button>
                </div>
        </div>
        </div>
      <Footer/>
    </div>
</template>

<style lang="scss" scoped src="@/assets/customcss/cal.css">

</style>

<script>
import menubar from "./topmenu";
import alert from "../alertMesseges";
import Footer from "./footer.vue";

export default {
  components: {
    menubar,alert,Footer
  },
  data(){
    return {
      price: '',
      shipping:'',
      num:'',
      totalPrice:'',
      finalPrice :'',
      imgUrl:'https://github.com/siaoliu66/Shiba-Dinn/blob/gh-pages/image/logo.png?raw=true'
    }
  },
  methods:{
      cal(){
      const vm = this
      vm.totalPrice = Math.round((vm.price + vm.shipping) * 270/1000)
      vm.finalPrice = Math.round(vm.totalPrice + vm.num * 250 + 60)
    },
      copyToClipboard(id){
        var TextRange = document.createRange();
        TextRange.selectNode(document.querySelector(id));
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(TextRange);
        document.execCommand("copy");
      }
    }, 
    filters:{
      toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
      }
    },
    mounted() {    
      // this.copyBtn = new this.clipboard(this.$refs.copy);
    },
};
</script>
