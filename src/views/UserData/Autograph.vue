<template>
    <div>
        <mu-appbar style="width: 100%;" color="#f06292">
            <mu-button icon slot="left" @click="back">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            {{this.$route.meta.title}}
            <mu-button flat slot="right">保存</mu-button>
        </mu-appbar>
        <mu-text-field multi-line :rows="3" :rows-max="6" :max-length="70" v-model="content" style="width:100%;padding:0 10px;margin-top:10px;margin-bottom:10px;" placeholder="请输入新个性签名"></mu-text-field>
    </div>
</template>
<script>
export default {
    data() {
        return {
            content: '',
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
    }
}
</script>
