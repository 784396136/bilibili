<template>
    <div>
        <h1>{{search_content}}</h1>
    </div>
</template>
<script>
export default {
    data() {
        return{
            search_content:'', //搜索的内容
        }
    },
    created() {
        this.search_content = this.$route.params.content
    },
}
</script>
