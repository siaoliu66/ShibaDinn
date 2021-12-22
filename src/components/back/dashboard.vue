<template>
    <div>
        <navbar></navbar>
        <alert></alert>
        <div class="row">
            <sidebar/>
            <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script>
import navbar from './navbar'
import sidebar from './sidebar'
import alert from '../alertMesseges'

export default {
components:{
    navbar,sidebar,alert
},
created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
}
</script>