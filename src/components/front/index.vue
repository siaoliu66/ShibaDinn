<template>
    <div>
        <div class="web">
                    <div class="header">
            <menubar/>
        </div>
        <div class="wrap">
            <div class="container">
                <img class="logoimg" src="https://github.com/siaoliu66/Shiba-Dinn/blob/gh-pages/image/logo.png?raw=true" alt="">
        
                <label for="price">商品金額</label>
                <input type="number" class="form price" id="price" placeholder="請輸入日幣金額">
                <label for="shipping">日本境內運費</label>
                <input type="number" class="form shipping" id="shipping" placeholder="請輸入日本境內運費,無運費請填0">
                <label for="num">預估重量</label>
                <input type="number" class="form num" id="num" placeholder="請輸入預估重量(公斤)">
                <!-- <div class="input-group"><input type="checkbox" class="vip" id="vip"><label for="vip" style="margin:0px">是否符合週年慶滿額折</label></div> -->
                <button @click="cal()">計算價格</button>
            </div>
                <hr>
                <div class="text"></div>
                <div class="copy"></div>
            <Footer></Footer> 
        </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
    body {
  height: 100vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.web{
    padding-top: 25px;
}
.wrap {
  max-width: 588px;
  padding: 15px;
  width: 100%;
  margin: auto;
  background-color: #006973;
  color: #ffd68c;    
  margin-top: 64px;
}

.wrap .header {
  text-align: center;
}

.wrap .header img {
  width: 200px;
}

.wrap .container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}
.wrap .container .logoimg{
    width: 200px;
    margin: 0 auto;
}
.wrap .container label {
  margin: 5px;
  font-size: 1rem;
}

.wrap .container .form {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.wrap .container .input-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
  width: 100%;
  margin-top: 10px;
}

.wrap .container .info {
  color: #495057;
  margin-left: 5px;
}

.wrap .container button {
  width: 120px;
  height: 35px;
  font-size: 1rem;
  border-radius: 25px;
  margin: 5px auto;
  border: 0;
  background-color: white;
  margin-top: 15px;
}
/*手機板*/
@media screen and (max-width: 414px) {
  body {
    height: auto;
  }
}
</style>

<script>
import menubar from "./topmenu";
import $ from "jquery";
// import swiper2 from "../swiper2";
// import Footer from "./footer";

// import $ from "jquery";
export default {
  components: {
    menubar,
    // swiper2,
    // Footer
  },
  methods:{
      cal() {
        var price = parseInt($(".price").val())
        var Shipping = parseInt($(".shipping").val())
        var num = parseFloat($(".num").val())
        var totalPrice = Math.round((price + Shipping) * 270 / 1000)
        var finalPrice = Math.round(totalPrice + num * 250 + 60)
    var text = `<p>📣報價如下</br>🔷商品金額：`
    if (Shipping == 0) {
            text += `<span class="Price">${price}</span>`
        } else { text += `[<span class="Price">${price}</span> + <span class="Shipping">${Shipping}</span>(日本境內運費)]` }
        text += ` * 0.270 = <span class="totalPrice">${totalPrice}</span></br>
    🔷國際運費：1公斤250元</br>
    🔷應付金額：<span class="totalPrice">${totalPrice}</span> + <span class="Num">250*${num}</span>(重量預估${num}kg以內) + 60(超商運費) = <span class="finalPrice">${finalPrice}</span></p>`
        $(".text").html(text)
        $(".copy").html(`<button @Click="CopyTextToClipboard('.text')">點擊複製</button>`)
        $(".price").val("")
        $(".shipping").val("")
        $(".num").val("")
        console.log(text)
    },
    CopyTextToClipboard(id) {
        var TextRange = document.createRange();
        TextRange.selectNode(document.querySelector(id));
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(TextRange);
        document.execCommand("copy");
        // alert("複製完成！")  //此行可加可不加
    },
  },
  filters:{
      toCurrency(num){
        var parts = num.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
  }
};
</script>
