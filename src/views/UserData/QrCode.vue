<template>
    <div id="app">
        <mu-appbar style="width: 100%;" color="#f06292" :z-depth="1">
            <mu-button icon slot="left" @click="back">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <span style="font-weight:400;">二维码</span>
        </mu-appbar>
        <div id="qrcode">
            <img src="../../assets/image/person_info_qr_bg.webp" width="100%">
            <div class="code" :style="'width:'+div_w*0.45+'px;height:'+div_w*0.45+'px;left:'+(div_w-div_w*0.45)/2+'px;top:34%;'">
                这是一张二维码 <br>
                ヾ(◍°∇°◍)ﾉﾞ
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            window_h: '', // 当前窗口的高
            window_w: '', // 当前窗口的宽
            div_w: '', // 大盒子的宽
        }
    },
    mounted() {
        document.getElementsByTagName('body')[0].style.backgroundColor = '#333';
        this.window_h = window.screen.height
        this.window_w = window.screen.width
        var header_h = document.getElementsByTagName('header')[0].clientHeight  // 头部的高
        this.div_w = document.getElementById('qrcode').clientWidth
        console.log(document.getElementById('qrcode').clientHeight)
        console.log(document.getElementsByTagName('div')[6].scrollHeight)
        
        // var height = document.getElementsByTagName('body')[0].clientHeight
        // document.getElementById('app').style.height = height
        // var img = document.getElementsByTagName('img')[0]
        // var img_h = img.height
        // img.style.marginTop = ((this.window_h-img_h)*0.5-header_h)+'px'
    },
    methods: {
        back () {
            this.$router.go(-1)
        }
    }
}
</script>

<style>
    #qrcode {
        position: relative;
        display: block;
        width: 80%;
        margin: 0 auto;
        margin-top:25%;
    }
    .code {
        position: absolute;
        top: 0;
        background-color: #ccc;
        text-align: center;
    }
</style>
