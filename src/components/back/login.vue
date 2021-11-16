<template>
    <div>  
    <main class="d-flex align-items-center min-vh-100 py-3 py-md-0">
    <div class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-6">
            <img src="https://www.bootstrapdash.com/demo/login-template-free-1/assets/images/login.jpg" alt="login" class="login-card-img">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <div class="brand-wrapper">
                <img src="@/assets/img/Shiba-Dinn.png" alt="logo" class="logo">
              </div>
              <p class="login-card-description">Login</p>
              <form @submit.prevent="login()">
                  <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input type="email" name="email" id="email" class="form-control" placeholder="請輸入帳號" required v-model="user.username">
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input type="password" name="password" id="password" class="form-control" placeholder="***********" required v-model="user.password">
                  </div>
                  <input name="login" id="login" class="btn btn-block login-btn mb-4" type="submit" value="Login">
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </main>
  </div>
</template>

<script>
export default {
    data () {
        return {
            user: {
                username:'',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const vm = this
            const api = `${process.env.APIPATH}/admin/signin`
            this.$http.post(api,vm.user).then((response) => {
                const token = response.data.token
                const expired = response.data.expired
                document.cookie = `token=${token};expires=${new Date(expired)};`;
                if(response.data.success){
                    this.$router.push("/admin/products")
                }else{
                    alert(response.data.message)
                    document.querySelector('#inputEmail').value='';
                    document.querySelector('#inputPassword').value=''
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped src="@/assets/customcss/login.css"></style>
