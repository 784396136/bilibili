<template>
    <div>
        <mu-appbar style="width: 100%;" color="#f06292" :z-depth="1">
            <mu-button icon slot="left" @click="back">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <span style="color:#fff;">修改昵称</span>
            <mu-button flat slot="right">保存</mu-button>
        </mu-appbar>
        <div width="100%">
            <mu-text-field style="width:90%;padding:0 20px;margin-top:20px;margin-bottom:0;" v-model="changename" indicator-color="#ff0" placeholder="请输入新昵称"></mu-text-field>
            <mu-icon value="close" color="#ccc" @click="clear"></mu-icon>
        </div>
        <div style="padding:0 20px;">
            <span>修改昵称需要消耗6枚硬币</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            changename:'',
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        clear() {
            this.changename = ''
        }
    }
}
</script>
<style scoped>
    span {
        color: #ccc;
    }
</style>
