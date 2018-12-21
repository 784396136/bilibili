<template>
    <div>
        <mu-appbar style="width: 100%;" color="#f06292" :z-depth="1">
            <mu-button icon slot="left" @click="back">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            <span style="font-weight:400;">账号资料</span>
        </mu-appbar>
        <div class="list">
            <ul>
                <li :style="'height:'+window_h*0.1+'px;line-height:'+window_h*0.1+'px;padding:0;'" @click="change_face">
                    <mu-button flat style="width:100%;height:100%;text-align:left;">
                        <span style="position:absolute;left:10px;">头像</span>
                        <img src="../assets/image/face/20181113111958.jpg" height="100%" style="padding:5px;position:absolute;right:40px;border-radius:50%;">
                        <img src="../assets/image/ic_arrow_right.png" style="position:absolute;right:10px;" alt="">
                    </mu-button>
                </li>
                <!-- 更换头像弹框 -->
                <mu-dialog width="600" max-width="80%" :open.sync="openAlert">
                    <span style="color:#333;display:block;padding:15px 0;text-align:center;border-bottom:1px solid #ccc;">头像选择</span>
                    <div class="change_face" style="overflow:hidden;margin:20px 0;">
                        <div class="choose" style="width:33.333%;float:left;text-align:center;">
                            <img src="../assets/image/ic_camera_pink.png" style="width:33%;display:block;margin:0 auto;">
                            <span style="display:inline-block;margin-top:10px;">拍照</span>
                        </div>
                        <div class="choose" style="width:33.333%;float:left;text-align:center;">
                            <img src="../assets/image/ic_gallery.png" style="width:33%;display:block;margin:0 auto;">
                            <span style="display:inline-block;margin-top:10px;">图片库</span>
                        </div>
                        <div class="choose" style="width:33.333%;float:left;text-align:center;">
                            <img src="../assets/image/ic_photo_random.png" style="width:33%;display:block;margin:0 auto;">
                            <span style="display:inline-block;margin-top:10px;">随机</span>
                        </div>
                    </div>
                    <div class="top" style="color:#333;border-top:1px solid #ccc;text-align:center;padding:10px 0;" @click="closeChangeFace">
                        取消
                    </div>
                </mu-dialog>
                <li :style="'height:'+window_h*0.07+'px;'">
                    <mu-button flat color="#999;" to="/changename" style="width:100%;height:100%;">
                        <span class="left">昵称</span>
                        <span class="right">戦を終えて結婚する</span>
                        <img class="right_img" src="../assets/image/ic_arrow_right.png">
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.07+'px;'">
                    <mu-button flat color="#999;" style="width:100%;height:100%;">
                        <span class="left">UID</span>
                        <span class="right" style="right:20px;" id="UID">11238952</span>
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.07+'px;'">
                    <mu-button flat color="#999;" style="width:100%;height:100%;" to="/qrcode">
                        <span class="left">二维码名片</span>
                        <img src="../assets/image/person_info_qr_icon.png" style="position: absolute;right:40px;">
                        <img src="../assets/image/ic_arrow_right.png" class="right_img">
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.07+'px;'">
                    <mu-button flat color="#999;" style="width:100%;height:100%;">
                        <span class="left">头像挂件</span>
                        <img src="../assets/image/ic_arrow_right.png" class="right_img">
                    </mu-button>
                </li>
                <li :style="'height:'+window_h*0.07+'px;'" @click="openSex">
                    <mu-button flat color="#999;" style="width:100%;height:100%;">
                        <span class="left">性别</span>
                        <span class="right">
                            <span v-if="user_sex==1">男</span>
                            <span v-else-if="user_sex==3">保密</span>
                            <span v-else-if="user_sex==2">女</span>
                        </span>
                        <img src="../assets/image/ic_arrow_right.png" class="right_img">
                    </mu-button>
                </li>
                <mu-dialog width="360" :open.sync="sex">
                   <div class="header" style="text-align:center;padding:15px 0;border-bottom:1px solid #ccc;">
                       性别选择
                   </div>
                   <div width="100%" style="overflow:hidden;">
                       <div style="width:33.333%;height:100px;float:left;text-align:center;" @click="change_male">
                           <mu-button flat style="width:100%;height:100%;">
                               <img v-if="user_sex==1" src="../assets/image/ic_sex_male_selected.png" alt="">
                               <img v-else src="../assets/image/ic_sex_male.png" alt="">
                           </mu-button>
                       </div>
                       <div style="width:33.333%;height:100px;float:left;text-align:center;" id="baomi" @click="change_secrecy">
                           <mu-button flat style="width:100%;height:100%;">
                            <div v-if="user_sex==3" style="box-sizing:border-box;width:83px;height:83px;text-align:center;border-radius:50%;background-color:#777;">
                                <p style="font-size:32px;padding-top:5px;color:#fff;">?</p>
                                <p style="font-size:18px;color:#fff;">保密</p>
                            </div>
                            <div v-else style="box-sizing:border-box;width:83px;height:83px;text-align:center;border-radius:50%;">
                                <p style="font-size:32px;padding-top:5px;color:#777;">?</p>
                                <p style="font-size:18px;color:#777;">保密</p>
                            </div>
                           </mu-button>
                       </div>
                       <div style="width:33.333%;height:100px;float:left;text-align:center;" @click="change_female">
                           <mu-button flat style="width:100%;height:100%;">
                               <img v-if="user_sex==2" src="../assets/image/ic_sex_female_selected.png" alt="">
                               <img v-else src="../assets/image/ic_sex_female.png" alt="">
                           </mu-button>
                       </div>
                   </div>
                   <div style="text-align:center;padding:15px 0;border-top:1px solid #ccc;" @click="closeSex">
                       确定
                   </div>
                </mu-dialog>
                <li :style="'height:'+window_h*0.07+'px;'" @click="openDateAlert">
                    <mu-button flat color="#999;" style="width:100%;height:100%;">
                        <span class="left">出生年月</span>
                        <span class="right">1998-12-26</span>
                        <img src="../assets/image/ic_arrow_right.png" class="right_img">
                    </mu-button>
                </li>
                <mu-dialog width="360" :open.sync="dateAlert">
                    <mu-paper :z-depth="1">
                        <mu-date-picker :date.sync="date" color="#f06292"></mu-date-picker>
                    </mu-paper>
                    <mu-button flat style="width:100%;height:50px;" @click="closeDateAlert" v-loading="loading">确定</mu-button>
                </mu-dialog>
                
                <li :style="'height:'+window_h*0.07+'px;'">
                    <mu-button flat color="#999;" style="width:100%;height:100%;" to="/autograph">
                        <span class="left">个性签名</span>
                        <img src="../assets/image/ic_arrow_right.png" class="right_img">
                    </mu-button>
                </li>
            </ul>
        </div>
        <mu-snackbar :color="color.color" :open.sync="color.open" style="width:50%;margin:0 auto;">
            <mu-icon left value="done"></mu-icon>
            {{color.message}}
            <mu-button flat slot="action" color="#fff" @click="color.open = false">
                <mu-icon value="close"></mu-icon>
            </mu-button>
        </mu-snackbar>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading:false,
            window_h: '', // 当前窗口的高
            window_w: '', // 当前窗口的宽
            openAlert: false, // 控制头像弹框
            sex:false, // 控制性别弹框
            user_sex: 3, //用户性别  1男 2女 3保密
            dateAlert: false,   // 控制日期弹框
            date: undefined, // 时间日期
            // 消息提示框
            color: {
                color: '#f06292', // 弹框颜色
                message: 'Hello World, Snackbar !', //  弹框消息
                open: false,    // 是否弹出
                timeout: 200000 // 弹出时间
            },
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        change_face () {
            this.openAlert = true;
        },
        closeChangeFace () {
            this.openAlert = false;
        },
        openSex () {
            this.sex = true
        },
        closeSex () {
            this.sex = false
        },
        // 更改性别
        change_male () {
            this.user_sex = 1
        },
        change_female () {
            this.user_sex = 2
        },
        change_secrecy () {
            this.user_sex = 3
        },
        // 打开日期选择
        openDateAlert () {
            this.dateAlert = true
        },
        closeDateAlert () {
            this.loading = !this.loading
            // this.dateAlert = false
            console.log(this.date)
            // 转换日期格式
            if(!this.date==''){
                var date = new Date(this.date);
                var res = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                console.log(res)
            }

            // 打开消息弹框   
            // ajax执行完成进行判断  修改弹框信息和颜色   成功 #f06292  失败 grey500
            this.color.message = '修改成功~~~~'  // 弹框信息
            //this.color.color = 'grey500';   // 弹框颜色
            this.color.open = true;
            this.color.timer = setTimeout(() => {
                this.color.open = false;
            }, this.color.timeout);
        }
    },
    mounted() {
        this.window_h = window.screen.height
        this.window_w = window.screen.width
    },
    created() {
        document.getElementsByTagName('body')[0].style.backgroundColor = '#eee';
    },
}
</script>
<style scoped>
    .list {
        height: 100%;
        margin-top: 10px;
        background-color: #fff;
    }
    .list li {
        border-bottom: 1px solid #ccc;
    }
    .list li:nth-child(8) {
        border: none;
    }
    .list li .left {
        position: absolute;
        left: 10px;
    }
    .list li .right {
        color: #ccc;
        position: absolute;
        right: 40px;
    }
    .list li .right_img {
        position: absolute;
        right: 10px;
    }
    .mu-snackbar .mu-icon {
        margin: 0;
    }
</style>
<style>
    .mu-dialog-body {
        padding: 0;
    }
    #baomi .mu-button-wrapper {
        padding: 0;
    }
    .mu-appbar-title {
        padding-left:0;
    }
</style>