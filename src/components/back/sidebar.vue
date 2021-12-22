<template>
    <div >
        <div class="togglemenu">
            <a href="#" class="showmenu" @click="togglebar"><i class="fas fa-bars"></i></a>
        </div>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar"  :class="{'active': showTopMenu}">
            <div class="position-sticky pt-3">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/products">
                            <span data-feather="home"></span>
                            <i class="fas fa-box-open"></i>
                                產品列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/orders">
                            <span data-feather="file"></span>
                        <i class="fas fa-list-alt"></i>
                            訂單列表
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/admin/coupon">
                            <span data-feather="file"></span>
                        <i class="fas fa-percent"></i>
                            優惠券列表
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/admin/editor">
                            <span data-feather="file"></span>
                        <i class="fas fa-percent"></i>
                            editor
                        </router-link>
                    </li> -->
                </ul>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    .togglemenu{
        display: none;
        width: 100%;
        background-color: #343a40;
        color:#fff;
        position: absolute;
        top: 38px;
        left: 0px;
        padding: 8px;
        a{
            color:#fff;
            padding-left: 10px;
        }
    }
    i.fas{
            width: 20px;
        }

@media (max-width:768px) {
  .togglemenu{
      display: block;
  }
  .sidebar{
      padding-top:0px;
      top: 80px;
      display: none;
  }
  .active {
        display: block
    }
}
</style>

<script>
// import $ from "jquery";
export default {
  data() {
    return {
      showTopMenu: false,
    };
  },
  methods:{
    togglebar(){
    var vm = this
      this.showTopMenu = !this.showTopMenu
        setTimeout(function() {
            vm.showTopMenu = false;
        }, 1500);
    }
  },
}
</script>