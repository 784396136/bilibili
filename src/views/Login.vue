<template>
    <div>
        <mu-appbar style="width: 100%;" color="#f06292">
            <mu-button icon slot="left" @click="back">
                <mu-icon value="arrow_back"></mu-icon>
            </mu-button>
            登录
            <mu-button flat slot="right">忘记密码？</mu-button>
        </mu-appbar>
        <!-- 22娘 33娘 -->
        <div :class="{'img':true,'user':this.img_change,'password':!this.img_change}"></div>
        <!-- 表单 -->
        <mu-container style="padding-right:10%;margin-top:5%;" data-mu-loading-color="secondary" data-mu-loading-overlay-color="rgba(0, 0, 0, .7)" v-loading="loading">
            <mu-form ref="form" :model="validateForm" class="mu-demo-form">
                <mu-form-item prop="username" :rules="usernameRules" icon="perm_identity" >
                    <mu-text-field placeholder="你的手机号/邮箱" v-model="validateForm.username" prop="username" @click="user_img"></mu-text-field>
                    <div v-if="errors.username" class="mu-form-item-help" style="left: 56px;color:#f00;">{{errors.username}}</div>
                </mu-form-item>
                <mu-form-item prop="password" :rules="passwordRules" icon="lock">
                    <mu-text-field placeholder="请输入密码" type="password" v-model="validateForm.password" prop="password" @click="password_img"></mu-text-field>
                    <div v-if="errors.password" class="mu-form-item-help" style="left: 56px;color:#f00;">{{errors.password}}</div>
                </mu-form-item>
                
                <mu-form-item>
                    <mu-button to="/register" textColor="#f06292" color="#fff" style="margin:0 auto;">注册</mu-button>
                    <mu-button v-if="this.validateForm.username && this.validateForm.password"  color="#f06292" @click="submit" style="margin:0 auto;">登录</mu-button>
                    <mu-button v-else disabled style="margin:0 auto;">登录</mu-button>
                </mu-form-item>
            </mu-form>
        </mu-container>
        <popup></popup>
    </div>
</template>
<style scoped>
    header .mu-appbar-title {
        font-size:14px;
        padding-left:0;
    }
    .img {
        width: 100%;
        height: 116px;
        background-size: 100% 116px;
        background-repeat: no-repeat;
    }
    .user {
        background-image: url("../assets/image/login.png");
    }
    .password {
        background-position: 0px -1px;
        background-image: url("../assets/image/password.png");
    }
</style>

<script>
export default {
  data () {
    return {
        img_change:true,
        usernameRules: [
            { validate: (val) => !!val, message: '必须填写用户名'},
            { validate: (val) => val.length >= 3, message: '用户名长度大于3'},
        ],
        passwordRules: [
            { validate: (val) => !!val, message: '必须填写密码'},
            { validate: (val) => val.length >= 6 && val.length <= 16, message: '密码长度大于6小于16'}
        ],
        validateForm: {
            username: '',
            password: '',
        },
        loading:false,
        errors:'',
    }
  },
  methods: {
    // 返回上一页
    back () {
        this.$router.go(-1)
    },
    submit () {
        this.loading = true;
        this.axios.post('http://localhost:9999/api/login',{
            username:this.validateForm.username,
            password:this.validateForm.password
        }).then((res)=>{
            this.loading = false;
            if(res.data.errors)
            {
                this.errors = res.data.errors
            }else{
                localStorage.setItem('userInfo',res.data.data.ACCESS_TOKEN)
                this.$router.options.routes[4].meta.loading = true
                console.log(this.$router.options.routes[4].meta);
                this.$router.push({
                    path:'/',
                    name:'',
                    meta: {
                        login:true
                    }
                })
            }
        })
        .catch((error)=>{
            setTimeout(()=>{
                this.loading = false;
                this.$store.state.color.open = true;
                this.$store.state.color.message = '服务器出错了 〒▽〒';
                this.$store.state.color.color = 'error';
                this.$store.state.color.type = 'error';
                setTimeout(()=>{
                    this.$store.state.color.open = false;
                },this.$store.state.color.timeout);
            },3000)
        })
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      };
    },
    // 修改背景图
    user_img () {
        this.img_change = true
    },
    password_img () {
        this.img_change = false
    }
  },
  mounted(){
      console.log(this.$store.state.color.message)
  },

};
</script>