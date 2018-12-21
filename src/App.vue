<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<style>
    @import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
    @import 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
</style>
<script>
export default {
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>
