<template>
    <div>
        <mu-appbar style="width: 100%;" color="#f06292">
        <mu-button icon slot="left" @click="back">
            <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        注册账号
        </mu-appbar>
        <mu-flex class="flex-wrapper" justify-content="center" style="margin-top:10%;">
            <mu-flex class="flex-demo" justify-content="center" ><h1 class="title">注册 <div class="t_bottom"></div></h1></mu-flex>
        </mu-flex>
        <div class="content">
            <mu-flex class="flex-wrapper" justify-content="center" >
                <mu-flex class="flex-demo" justify-content="center" width="100%">
                    <input :class="{'user':true,'error':this.errors.phone}" type="text" v-model="phone" placeholder="手机号">
                </mu-flex>
            </mu-flex>
            <p v-if="this.errors.phone" style="margin-top:-20px;margin-bottom:15px;text-align:center;">{{errors.phone[0]}}</p>
            <mu-flex class="flex-wrapper" justify-content="center">
                <mu-flex class="flex-demo" justify-content="center" >
                    <input :class="{'pwd':true,'error':this.errors.password}" type="password" v-model="pwd" width="100%" placeholder="密码">
                </mu-flex>
            </mu-flex>
            <p v-if="this.errors.password" style="margin-top:-20px;margin-bottom:15px;text-align:center;">{{errors.password[0]}}</p>
            <mu-flex class="flex-wrapper" justify-content="center">
                <mu-flex class="flex-demo" justify-content="center">
                    <input :class="{'pwd':true,'error':this.errors.password_confirmation}" type="password" v-model="surpwd" width="100%" placeholder="确认密码">
                </mu-flex>
            </mu-flex>
            <p v-if="this.errors.surepwd" style="margin-top:-20px;margin-bottom:15px;text-align:center;">{{errors.surepwd[0]}}</p>
            <mu-flex class="flex-wrapper code_f" justify-content="center">
                <mu-flex class="flex-demo" justify-content="center">
                    <input max-length="4" class="code" type="text" v-model="code" placeholder="请输入验证码">
                    <mu-button disabled v-if="sendCode" :ripple="false" round :style="'height:'+(input_h-1)+'px;position:absolute;right:10%;'" color="#f06292">重新发送({{second}})</mu-button>
                    <mu-button v-else :ripple="false" round :style="'height:'+(input_h-1)+'px;position:absolute;right:10%;'" color="#f06292" @click="send_Code">发送验证码</mu-button>
                </mu-flex>
            </mu-flex>
            <p v-if="this.errors.code" style="margin-top:-20px;margin-bottom:15px;text-align:center;">{{errors.code}}</p>
            <mu-button v-if="phone=='' || pwd=='' || surpwd=='' || code==''" disabled :style="'margin-left:'+m+'px;width:65%;border-radius:'+r+'px;'" id="submit" color="#f06292">立即注册</mu-button>
            <mu-button v-else :style="'margin-left:'+m+'px;width:65%;border-radius:'+r+'px;'" id="submit" color="#f06292" @click="register">立即注册</mu-button>
        </div>
        <mu-snackbar :color="color.color" :open.sync="color.open" style="width:50%;margin:0 auto;">
            <mu-icon left value="done"></mu-icon>
                <span id="message">{{color.message}}</span>
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
            second: 6, // 秒数
            input_h:'', // 输入框的高
            // 注册按钮的间距
            m:'',
            // 注册按钮的圆边框
            r:'',
            phone:'', // 用户名
            pwd: '', // 密码
            surpwd: '', //确认密码
            code: '', // 手机验证码
            sendCode:false, // 是否发送验证码
            errors:{
                phone:'',
                password:'',
                surepwd:'',
                code:'',
            },
            // 消息提示框
            color: {
                color: 'primary', // 弹框颜色
                message: 'Hello World, Snackbar !', //  弹框消息
                open: false,    // 是否弹出
                timeout: 2000 // 弹出时间
            },
        }
    },
    mounted() {
        console.log(this.$route.meta)
        this.input_h = document.getElementsByTagName('input')[0].offsetHeight
        var width =  document.documentElement.scrollWidth;
        var btnWidth = document.getElementById("submit").scrollWidth;
        var btnHeight = document.getElementById("submit").scrollHeight;
        this.m = (width-btnWidth)/2; 
        this.r = btnHeight/2;

    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        register(){
            const loading = this.$loading();
            this.axios.post('http://localhost:9999/api/regitser',{
                phone:this.phone,
                password:this.pwd,
                password_confirmation:this.surpwd,
                code:this.pwd,
            }).then((res)=>{
                loading.close();
                if(res.data.errors){
                    this.errors = res.data.errors
                }else{
                    this.errors = ''
                    this.phone = ''
                    this.password = ''
                    this.surpwd = ''
                    this.code = ''
                    this.color.open = true;
                    this.color.message = '注册成功';
                    this.color.timer = setTimeout(() => {
                        this.color.open = false;
                    }, this.color.timeout);
                    setTimeout(()=>{
                        this.$router.push('/login')
                    },2000)
                    
                }
            })
        },
        send_Code(){
            // 发送手机验证码
            this.sendCode = true;
            console.log('发送了')
            var t = setInterval(() => {
                this.second--
                if(this.second==0){
                    clearInterval(t)
                    this.sendCode = false;
                    this.second=60
                }
            }, 1000);
        }
    },
}
</script>

<style scoped>
    .t_bottom {
        margin: 25px auto 0;
        width: 35px;
        background-color: #000;
        border-bottom: 2px solid #000;
    }

    .content {
        margin-top: 20px;
    }

    .content .justify-content-center {
        width: 80%;
        margin:0 auto 15px;
    }

    input {
        box-sizing: border-box;
        outline: none;
        padding: 10px 45px;
        border: 1px solid #d1d1d1;
        width: 100%;
        height: 45px;
        border-radius: 24.5px;
        background-repeat: no-repeat;
    }

    .error {
        border: 1px solid #f00;
    }
    
    .user {
        background-image: url('../assets/image/user.png');
        background-position: 10px 10px;
        background-size: 25px;
    }

    .pwd {
        background-image: url('../assets/image/lock.png');
        background-position: 13px 12px;
        background-size: 20px;
    }

    .code {
        background-image: url('../assets/image/phone.png');
        background-repeat: no-repeat;
        background-size: 20px;
        background-position: 11px 12px;
        padding: 10px 50% 10px 45px;
    }

    .code_f {
        position: relative;
    }

    p {
        color: #f00;
    }

    #message {
        margin-left: 10px;
    }
</style>