<template>
    <div id="app" :style="'width:100%;;height:'+window_h+'px;'">
        <!-- 顶部返回 -->
        <mu-appbar style="width: 100%;" :z-depth="2" :style="'position:fixed;top:0;left:0;background-color:rgba(0,0,0,0);border-bottom:none;'">
            <mu-button icon slot="left" @click="back">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
        </mu-appbar>
        <div class="userInfo">
            <!-- 用户头图 -->
            <div class="headerImage">
                <!-- 弹框 -->
                <span @click="openSimpleDialog" class="changeImg" :style="'width:'+(window_h*0.5*0.5*0.2)+'px;padding:3px;'"><img src="../assets/image/ic_vip_top_pic_toggle.png" width="100%" height="100%"></span>
                <mu-dialog width="800" :open.sync="openSimple">
                    <div class="select_img">
                        
                        <img width="80%" src="../assets/image/ic_vip_top_pic_dialog.png" style="display:block;margin:-53px auto 0;">
                        <div class="close" style="display:inline-block;float:right;margin-top:-35%;" @click="closeSimpleDialog">
                            <mu-icon value="close"></mu-icon>
                        </div>
                        <div width="100%" style="text-align:center;margin-top:10px;">大会员自定义头图</div>
                        <button style="width:100%;border:none;margin-top:20px;background-color:#f06292;color:#fff;padding:5px 0;border-radius:5px;">从手机相册选择</button>
                    </div>
                </mu-dialog>
            </div>

            <!-- 用户信息 -->
            <div class="info">
                <div class="top">
                    <div class="face">
                        <img :style="'width:'+(window_w*0.2)+'px;height:'+(window_w*0.2)+'px;margin-top:-'+(window_w*0.2/2)+'px;'" src="../assets/image/face/20181113111958.jpg">
                        <img src="../assets/image/ic_certification_big_member.png" :style="'width:'+(window_w*0.2*0.3)+'px;box-sizing:border-box;border:0px solid #fff;position:absolute;bottom:0;left:'+((window_w*0.2)-(window_w*0.2*0.4))+'px;border-radius:50%;'">
                        <span class="vip">年度大会员</span>
                        <router-link to="/userdata" style="float:right;border:1px solid #f06292;padding:5px;margin-top:10px;border-radius:3px;">账号资料</router-link>
                    </div>
                </div>
                <div class="content">
                    <div class="username">
                        <span style="color:#f06292;font-weight:600;font-size:20px;">戦を終えて結婚する</span> 
                        <span class="level" style="display:inline-block;height:16px;margin-left:10px;">
                            <!-- 图片0 1 2 3 4 代表等级 （共七个等级） -->
                            <img height="100%" src="../assets/image/ic_im_user_level_4.png" alt="">
                            <div class="exp" >
                                <span :style="'float:right;color:#fff;line-height:'+exp_h+'px;padding-right:5px;'">8461/10800</span>
                                <!-- 
                                    0级颜色 #fbfbfb
                                    1级颜色 #bfbfbf
                                    2级颜色 #95ddb2
                                    3级颜色 #92d1e5
                                    4级颜色 #ffb37c
                                    5级颜色 #ff6c00
                                    6级颜色 #ff0000
                                -->
                                <div class="get" style="width:78%;background-color:#ffb37c;"></div>
                            </div>
                        </span>
                    </div>
                    <!-- 个性化 -->
                    <div class="individuation">
                        <div class="connection">
                            52<span>关注</span>     99<span>粉丝</span>
                            <p style="margin-top:10px;">这个人帅死了,不用写(〃'▽'〃)</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 个人动态 -->
            <mu-tabs :value.sync="active" color="#fff" full-width style="margin-top:20px;border-top:1px solid #999;">
                <mu-tab :ripple="false" :class="{no_active:true,active:active===0}">主页</mu-tab>
                <mu-tab :ripple="false" :class="{no_active:true,active:active===1}">动态</mu-tab>
                <mu-tab :ripple="false" :class="{no_active:true,active:active===2}">收藏</mu-tab>
                <mu-tab :ripple="false" :class="{no_active:true,active:active===3}">追番</mu-tab>
            </mu-tabs>
            <div class="index cont" v-if="active === 0">
                <p>“……是的，我承认从很早以前我都害怕死亡，在医院里被人研究的时候，以前做出布局的时候，其实我很怕死的，因为除了死以外，我没有值得珍惜的东西，很奇怪是吧？恰好是这样我真的很怕死，因为我想要有值得珍惜的东西之后，死亡之后才会不寂寞，我才能够安然的面对死亡……”</p>
            </div>
            <div class="dynamic cont" v-if="active === 1">
                <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
                <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
                <p>“那么就去地狱找到你，我绝对不逃！”</p>
                <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
            </div>
            <div class="collection cont" v-if="active === 2">
                <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
                <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
                <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
                <p>“也许吧，未来……给你了。”</p>
            </div>
            <div class="watching cont" v-if="active === 3">
                ??????
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            window_h: '', // 当前窗口的高
            window_w: '', // 当前窗口的宽
            openSimple: false,
            headerImg_h: '', // 用户头图的高
            exp_h: '', // 经验条的高
        }
    },
    mounted() {
        this.window_h = window.screen.height
        this.window_w = window.screen.width
        this.exp_h = 16*0.78
    },
    methods: {
        test(){
            location.href = this.$route.meta.path
        },
        // 返回上一页
        back () {
            this.$router.go(-1)
        },
        // 显示弹框
        openSimpleDialog () {
            this.openSimple = true;
        },
        // 关闭弹窗
        closeSimpleDialog () {
            this.openSimple = false;
        }
    }
}
</script>
<style scoped>
@import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
@import 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
.active {
    color: #f06292 !important;
}
.no_active {
    color: #999;
}
.vip {
    position: absolute;
    bottom: 15%;
    display: inline-block;
    font-size: 12px;
    padding: 3px 5px;
    background-color: #f06292;
    color:#fff;
    margin-left: 5px;
    border-radius: 3px;
}
.userInfo {
    width: 100%;
    height: 40%;
}
/* 用户头图 */
.userInfo .headerImage {
    position: relative;
    width: 100%;
    height: 50%;
    background-image: url('../assets/image/headerImg/default.jpg');
    background-size: 100%;
    background-position: center 25%;
}
.userInfo .headerImage .changeImg {
    position: absolute;
    right: 0;
    bottom: 5%;
    height: 20%;
    background-color:#ddd;
    display:inline-block;
    
}

/* 用户信息 */
.userInfo .info {
    position: relative;
    width: 100%;
    height: 50%;
    padding: 0 5px;
}
.userInfo .info .face {
    position: relative;
}
.userInfo .info .face img{
    box-sizing: border-box;
    border: 2px solid #fff;
    border-radius: 50%;
}
.userInfo .info .content {
    margin-top: 10px;
}
.userInfo .info .content .username .exp {
    background-color: #757575;
    width:7em;
    height:85%;
    display:inline-block;
    text-align:right;
    font-size:12px;
    border-radius: 0 10px 10px 0;
    line-height: 80%;
}
.userInfo .info .content .username .exp .get {
    height: 100%;
}
.userInfo .info .content .individuation {
    margin-top: 10px;
}
.userInfo .info .content .individuation span {
    margin-left: 3px;
    margin-right: 30px;
    color:#999;
}
.userInfo .info .content .individuation {
    color: #999;
}

/* 个人动态 */
.cont {
    padding: 0 10px;
    background-color: #eee;
}
.index {
    padding-top: 10px;
}
</style>
