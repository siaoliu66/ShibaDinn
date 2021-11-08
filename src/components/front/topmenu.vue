<template>
  <div>
    <h1><router-link class="logo" to="/index"><img :src="`./static/img/logo.jpg`"></router-link>
    </h1>
    <ul class="menubar" :class="{'active': showTopMenu}">
      <li>
        <router-link class="nav-link" to="/aboutUs"> 代購運費計算機 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/menu"> 團購商品 </router-link>
      </li>
    <li>
        <router-link class="nav-link" to="/menu"> 購物須知 </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/login" target="_blank">
          商品管理
        </router-link>
      </li>
    </ul>
    <a href="#" class="showmenu" @click="togglebar"><i class="fas fa-bars"></i></a>
  </div>
</template>
<style lang="scss" scoped>
  .active {
    display: block
  }
</style>


<script>

export default {
  data() {
    return {
      showTopMenu: false,
    };
  },
  methods:{
    togglebar(){
      this.showTopMenu = !this.showTopMenu
    }
  }
}
</script>