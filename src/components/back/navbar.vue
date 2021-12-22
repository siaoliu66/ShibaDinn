<template>
    <div>
        <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Shiba-Dinn日本代購</a>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" href="#" @click="signout()">登出</a>
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
export default {
        methods: {
            signout() {
                const vm = this
                const api = `${process.env.APIPATH}/logout`
                this.$http.post(api).then((response) => {
                    console.log(response.data)
                    if(response.data.success){
                       this.$router.push("/login")
                    }
                })
            }
        }
}
</script>
<style lang="scss" scoped>
@media (max-width: 768px){
    .navbar{
        display: -webkit-box
    }
}
    
</style>