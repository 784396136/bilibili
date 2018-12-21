<template>
    <div>
        <top></top>
        <div class="list">
            <ul>
                <li :style="'height:'+window_h*0.05+'px;'">
                    <mu-button flat style="width:100%;height:100%;text-align:left;" to="/userdata">
                        <span style="position:absolute;left:10px;">账号资料</span>
                        <img src="../assets/image/ic_arrow_right.png" style="position:absolute;right:10px;" alt="">
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.05+'px;'">
                    <mu-button flat style="width:100%;height:100%;text-align:left;">
                        <span style="position:absolute;left:10px;">安全隐私</span>
                        <img src="../assets/image/ic_arrow_right.png" style="position:absolute;right:10px;" alt="">
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.05+'px;'">
                    <mu-button flat style="width:100%;height:100%;text-align:left;">
                        <span style="position:absolute;left:10px;">收货信息</span>
                        <img src="../assets/image/ic_arrow_right.png" style="position:absolute;right:10px;" alt="">
                    </mu-button>
                </li>
            </ul>
            <ul>
                <li :style="'height:'+window_h*0.05+'px;'">
                    <mu-button flat style="width:100%;height:100%;text-align:left;">
                        <span style="position:absolute;left:10px;">离线设置</span>
                        <img src="../assets/image/ic_arrow_right.png" style="position:absolute;right:10px;" alt="">
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.05+'px;'">
                    <mu-button flat style="width:100%;height:100%;text-align:left;">
                        <span style="position:absolute;left:10px;">其他设置</span>
                        <img src="../assets/image/ic_arrow_right.png" style="position:absolute;right:10px;" alt="">
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.05+'px;'">
                    <mu-button flat style="width:100%;height:100%;text-align:left;">
                        <span style="position:absolute;left:10px;">帮助</span>
                        <img src="../assets/image/ic_arrow_right.png" style="position:absolute;right:10px;" alt="">
                    </mu-button>
                </li>
            </ul>
            <ul>
                <li>
                    <mu-button flat style="width:100%;height:100%;text-align:left;" @click="confirm()">退出登录</mu-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
    .list {
        width: 100%;
        margin-top: 15px;
    }
    .list ul {
        background-color: #fff;
        margin-top: 15px;
    }
    .list li:nth-child(even) {
        border-bottom: 1px solid #ccc;
    }
</style>
<script>
export default {
    data(){
        return{
            window_h: '', // 当前窗口的高
            window_w: '', // 当前窗口的宽
        }
    },
    mounted(){
        this.window_h = window.screen.height
        this.window_w = window.screen.width
    },
    methods: {
        confirm(){
            this.$confirm('确定退出？')
            .then(({result})=>{
                
            });
        }
    }
}
</script>