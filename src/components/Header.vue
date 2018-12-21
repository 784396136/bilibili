<template>
    <div>
        <mu-appbar style="width: 100%;" color="#f06292">
            <mu-button icon slot="left" @click="back">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            {{$route.meta.name}}

        </mu-appbar>
    </div>
</template>
<style>
    header .mu-appbar-title {
        padding-left: 0;
        font-size: 16px;
    }
</style>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    }
}
</script>