<template>
  <div>
    <!-- 顶部导航 -->
    <mu-appbar style="width: 100%;" color="#f06292">
      <mu-icon value="menu" slot="left" style="margin-left:-12px;"></mu-icon>
      <mu-button icon slot="left" @click="open = !open" style="padding:8px;margin-left:5px;">
        <mu-paper style="width:100%;height:100%;overflow:hidden;" class="demo-paper"  circle :z-depth="1">
          <!-- 用户头像小图 -->
          <img v-if="userInfo.face" width="100%" height="100%" :src="userInfo.face">
          <img v-else width="100%" height="100%" src="../assets/image/face/default_avatar.png">
        </mu-paper>
      </mu-button>
      <div class="search" @click="openFullscreenDialog" :style="'height:'+search_h+'px;border-radius:'+search_r+'px;'">
        <div :style="'margin-top:'+search_mt+'px;'">
          <mu-icon value="search" style="display:block;"></mu-icon>
        </div>
      </div>
      <!-- 搜索页 -->
      <mu-dialog width="360" transition="slide-bottom" fullscreen :open.sync="openFullscreen" class="son_search">
        <mu-appbar color="#f06292" class="search_child">
          <div :style="'position: absolute;top:'+((search_h-24)/2)+'px;left:7%;'">
            <mu-icon value="search" color="#e0e0e0"></mu-icon>
          </div>
          <input class="search_c" type="text" @keyup.enter="search" placeholder="搜索的内容" :style="'width:100%;height:'+search_h+'px;border:none;border-radius:'+search_h+'px;padding:0 15%'">
          <mu-button slot="right" flat  @click="closeFullscreenDialog">
            取消
          </mu-button>
        </mu-appbar>
        <div style="padding: 24px;">
          <div class="show">
            <span class="left">大家都在搜</span>
            <span @click="show_all" v-if="is_show" class="right">展开</span>
            <span @click="show_all" v-else class="right">收起</span>
          </div>
          <div v-if="is_show" class="content" style="height:78px;">
            <span v-for="(v,k) in hot_search" :key="k" @click="search_hot(v)">
              {{v}}
            </span>
          </div>
          <div v-else class="content">
            <span v-for="(v,k) in hot_search" :key="k" @click="search_hot(v)">
              {{v}}
            </span>
          </div>
        </div>
      </mu-dialog>
      <mu-button to="/login" flat slot="right">去登陆</mu-button>
    </mu-appbar>

    <!-- 子视图显示的位置 -->
    <router-view></router-view>

    <!-- 左侧弹出层 -->
    <mu-container>
      <mu-drawer :open.sync="open" :width="more_width" :docked="docked" :right="position === 'right'">
          <div class="more">
            <div class="personal_list">
              <ul class="list">
                <li class="header" :style="'height:'+more_top_h+';'">
                  <div class="userInfo" :style="'height:'+more_top_header+';'">
                    <router-link to="/personal" v-if="userInfo">  
                    <mu-paper :style="'width:'+more_face+'px;height:'+more_face+'px;overflow:hidden;box-sizing:border-box;border:2px solid #fff;'" class="demo-paper" circle :z-depth="2">
                      <!-- 用户头像 -->
                      <img v-if="userInfo.face" width="100%" height="100%" :src="userInfo.face">
                      <img v-else width="100%" height="100%" src="../assets/image/face/default_avatar.png">
                    </mu-paper>
                    </router-link>
                    <router-link to="/login" v-else>  
                    <mu-paper :style="'width:'+more_face+'px;height:'+more_face+'px;overflow:hidden;box-sizing:border-box;border:2px solid #fff;'" class="demo-paper" circle :z-depth="2">
                      <!-- 用户头像 -->
                      <img v-if="userInfo.face" width="100%" height="100%" :src="userInfo.face">
                      <img v-else width="100%" height="100%" src="../assets/image/face/default_avatar.png">
                    </mu-paper>
                    </router-link>
                    <div v-if="userInfo!=''">
                      <!-- 昵称 -->
                      <div class="username" v-if="userInfo.nickname">{{userInfo.nickname}}</div>
                      <div class="username" v-else>{{userInfo.phone}}</div>
                      <!-- 用户等级 -->
                      <span>LV4</span>
                      <!-- 会员类型 -->
                      <span class="vip">年度大会员</span>
                      <p class="assets">
                        硬币: <b>&nbsp;{{userInfo.integral}}</b>
                      </p>
                    </div>
                    <div v-else  style="margin-top:15px;color:#eee;">
                      点击头像登录
                    </div>
                    <div class="bili">
                      <!-- 
                        未登录显示 bili_drawerbg_not_logined.png
                        登录了显示 bili_drawerbg_logined.png
                       -->
                      <img v-if='userInfo' width="100%" src="../assets/image/bili_drawerbg_logined.png" style="position: absolute;bottom:0;">
                      <img v-else width="100%" src="../assets/image/bili_drawerbg_not_logined.png" style="position: absolute;bottom:0;">
                    </div>
                  </div>
                  <div v-if="userInfo" class="connection">
                    <div>
                      <p>5</p>
                      <p>动态</p>
                    </div>
                    <div>
                      <p>52</p>
                      <p>关注</p>
                    </div>
                    <div>
                      <p>999</p>
                      <p>粉丝</p>
                    </div>
                  </div>
                </li>
                <li class="content">
                  <!-- 首页的子页面 -->
                  <ul class="content_list">
                    <li :class="{'active':this.$route.name=='index'}" @click="close_left()">
                      <mu-button to="/" flat class="btn-list">
                        <mu-icon v-if="this.$route.name=='index'" value="home" class="c-icon"  color="#f06292"></mu-icon>
                        <mu-icon v-else value="home" class="c-icon"></mu-icon>
                        <span>首页</span>
                      </mu-button>
                    </li>
                    <li :class="{'active':this.$route.name=='history'}" @click="close_left()">
                      <mu-button to="history" flat class="btn-list">
                        <mu-icon v-if="this.$route.name=='history'" value="watch_later" color="#f06292" class="c-icon"></mu-icon>
                        <mu-icon v-else value="watch_later" class="c-icon"></mu-icon>
                        <span>历史记录</span>
                      </mu-button>
                    </li>
                    <li :class="{'active':this.$route.name=='download'}" @click="close_left()">
                      <mu-button to="download" flat class="btn-list">
                        <mu-icon v-if="this.$route.name=='download'" value="cloud_download" color="#f06292" class="c-icon"></mu-icon>
                        <mu-icon v-else value="cloud_download" class="c-icon"></mu-icon>
                        <span>离线缓存</span>
                      </mu-button>
                    </li>
                    <li :class="{'active':this.$route.name=='collection'}" @click="close_left()">
                      <mu-button to="collection" flat class="btn-list">
                        <mu-icon v-if="this.$route.name=='collection'" value="star" class="c-icon" color="#f06292"></mu-icon>
                        <mu-icon v-else value="star" class="c-icon"></mu-icon>
                        <span>我的收藏</span>
                      </mu-button>
                    </li>
                    <li :class="{'active':this.$route.name=='live_broadcast'}" @click="close_left()">
                      <mu-button to="lb" flat class="btn-list">
                        <mu-icon v-if="this.$route.name=='live_broadcast'" value="live_tv" class="c-icon" color="#f06292"></mu-icon>
                        <mu-icon v-else value="live_tv" class="c-icon"></mu-icon>
                        <span>稍后再看</span>
                      </mu-button>
                    </li>
                  </ul>
                  <!-- 创作中心 未登录时不显示 -->
                  <ul class="content_list" v-if="userInfo!=''">
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="publish" class="c-icon"></mu-icon>
                        <span>投稿</span>
                      </mu-button>
                    </li>
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="flag" class="c-icon"></mu-icon>
                        <span>热门活动</span>
                      </mu-button>
                    </li>
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="highlight" class="c-icon"></mu-icon>
                        <span>创作中心</span>
                      </mu-button>
                    </li>
                  </ul>
                  <!-- 其他 -->
                  <ul class="content_list">
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="video_library" class="c-icon"></mu-icon>
                        <span>直播中心</span>
                      </mu-button>
                    </li>
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="contacts" class="c-icon"></mu-icon>
                        <span>我的大会员</span>
                      </mu-button>
                    </li>
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="sd_card" class="c-icon"></mu-icon>
                        <span>免流量服务</span>
                      </mu-button>
                    </li>
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="library_books" class="c-icon"></mu-icon>
                        <span>我的订单</span>
                      </mu-button>
                    </li>
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="local_mall" class="c-icon"></mu-icon>
                        <span>会员购中心</span>
                      </mu-button>
                    </li>
                    <li>
                      <mu-button flat class="btn-list">
                        <mu-icon value="headset_mic" class="c-icon"></mu-icon>
                        <span>联系客服</span>
                      </mu-button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            
            <div class="footer">
              <div :style="'line-height:'+more_f_height+'px;'" @click="setting">
                  <mu-icon class="footer_icon" size="24" value="settings"></mu-icon>设置
              </div>
              <div :style="'line-height:'+more_f_height+'px;'">
                  <mu-icon class="footer_icon" size="24" value="toys"></mu-icon>主题
              </div>
              <div :style="'line-height:'+more_f_height+'px;'">
                  <!-- wb_sunny -->
                  <mu-icon class="footer_icon" size="24" value="brightness_3"></mu-icon>夜间
              </div>
            </div>
          </div>
      </mu-drawer>
    </mu-container>
    <popup></popup>
  </div>
</template>
<script>
export default {
  data () {
    return {
      docked: false,
      open: false,  // 左侧弹框是否显示
      more_top_h:'', // 左侧弹框头部的高  未登录时 25% 登录时 35%
      more_top_header: '', // 左侧弹框头部内top盒子的高 登录时75% 未登录100%
      position: 'left',
      openFullscreen: false,
      search_h:'', // 搜索框的高 
      search_r:'', // 搜索框圆边
      search_mt:'',  // 搜索框放大镜的上间距
      more_width:'', // 左侧弹出层的宽
      more_face:'', // 左弹框的头像高宽
      more_f_height:'', // 左侧弹框底部的高
      is_show:true, //是否展开
      hot_search: [
        '大司马',
        '华农兄弟',
        '猫和老鼠',
        '舒克和贝塔',
        '鬼畜',
        'ig',
        '复仇者联盟4',
        '杨超越',
        '极乐净土',
        '德云色',
        '助眠',
        'KDA',
        'fgo',
        '大爱是约定',
        'JOJO',
        'NewGame',
        '上司组',
        '就这？',
        '嬲嘞',
        '超级小桀',
        '天天吃鸡',
        'CSgo',
        '艾什',
        '鲍勃',
        '陈乐一',
        '女流66',
        '亚洲猛男王菠萝',
        '可可味',
      ],
      userInfo:'',  // 用户信息

    }
  },
  created() {
    if(this.$router.options.routes[4].meta.loading)
    {
      
      setTimeout(()=>{
        this.$store.state.color.open = true;
      },100);
      this.$store.state.color.message = '登录成功 ( • ̀ω•́ )✧';
      setTimeout(()=>{
        this.$store.state.color.open = false
      },3000);
    }
    else
    {
      
    }
    console.log(this.more_top_h,this.more_top_header)
  },
  mounted() {
    var token = localStorage.getItem('userInfo')
    if(token)
    {
      this.axios.get('http://localhost:9999/api/index',{
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      })
      .then((res)=>{
        this.userInfo = res.data.jwt.userInfo
        console.log(this.userInfo)
        this.more_top_h = '35%';
        this.more_top_header = '75%';
      })
      .catch((res)=>{
        // console.log(res)
      })
    }
    else
    {
      this.more_top_h = '25%';
      this.more_top_header = '100%';
    }
    // 给body绑定点击事件
    var body = document.getElementsByTagName('body')
    var start = 0;
    var end = 0;
    body[0].ontouchstart  = function () {
      this.open = true;
      start = event.changedTouches[0].clientX
    }
    body[0].ontouchend  = (()=>{
      end = event.changedTouches[0].clientX
      if(end-start>150) this.open = true
    })
    // 当前窗口的宽
    var window_w = window.innerWidth
    // 当前窗口的高
    var window_h = window.innerHeight

    var header_height = document.getElementsByTagName('header')[0].scrollHeight
    // 搜索框的高
    this.search_h = header_height * 0.65;
    // 圆边
    this.search_r = this.search_h/2;
    // 放大镜的上间距
    this.search_mt = (this.search_h-24)/2;
    // 左侧弹框的宽
    this.more_width = window_w * 0.75;
    // 弹框头像的高
    this.more_face = window_w * 0.75 * 0.25;
    // 弹框底部的高
    this.more_f_height = document.getElementsByClassName('footer')[0].scrollHeight;
  },
  methods: {
    test(v) {
      console.log(v)
    },
    // 控制左侧弹框是否显示
    close_left() {
      this.open = !this.open
    },
    // 搜索页是否展开
    show_all() {
      this.is_show = !this.is_show
    },
    search() {
      var content = document.getElementsByClassName('search_c')[0].value;
      if(!content.trim()=='')
      {
        this.$router.push('/search/'+content.trim())
      }
    },
    search_hot(v) {
      this.$router.push('/search/'+v)
    },
    openFullscreenDialog () {
      this.openFullscreen = true;
    },
    closeFullscreenDialog () {
      this.openFullscreen = false;
    },
    setting() {
      // 跳转到设置页
      this.$router.push('/setting')
    }
  }
}
</script>
<style scoped>
@import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
@import 'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
b {
  font-weight: normal;
}
.left {
  float: left;
}
.right {
  float: right;
}
.search {
  width: 100%;
  padding-left: 10px; 
  background-color:rgba(66,66,66,0.5);
  overflow: hidden;
}
/* 子搜索页 */
.search_c::-webkit-input-placeholder {
  font-size: 16px;
}
/* 头部 */
.search_child .mu-appbar-title {
  position: relative;
}
/* 内容 */
.son_search .show {
  overflow: hidden;
  padding-bottom: 10px;
  color: #000;
  border-bottom: 1px solid #bbb;
}
.son_search .show .right {
  color: #999;
}
.son_search .content {
  overflow: hidden;
  margin-top: 5%;
}
.son_search .content span {
  float: left;
  padding: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #eee;
  color: #333;
  border-radius: 5px;
}
.search_c {
  font-size: 16px;
  outline: none;
}

.more {
  width: 100%;
  height: 100%;
}
.more .footer {
  box-sizing: border-box;
  width: 100%;
  height: 10%;
  border-top: 1px solid #9e9e9e;
  background-color: #f5f5f5;
}
.more .personal_list {
  height: 90%;
  overflow: hidden;
}
.more .personal_list .list {
  width: 105%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f5f5f5;
}
.more .personal_list .header {
  width: 100%;
  border-bottom: 1px solid #9e9e9e;
}
.more .personal_list .header .username {
  font-size: 16px;
  display: inline-block;
  margin-top: 5%;
  letter-spacing: 1px;
  color: #fff;
}
.more .personal_list .header .userInfo {
  position: relative;
  background-color: #f06292;
  padding-top: 5%;
  padding-left: 5%;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: 162px 29px;
}
.more .personal_list .header .userInfo .bili {
  position: absolute;
  bottom: -1px;
  right: 0;
  width: 50%;
  height: 90%;
}
.more .personal_list .header .connection {
  width: 95%;
  height: 25%;
  background-color: #fff;
}
.more .personal_list .header .connection div {
  text-align: center;
  width: 33.3333333333%;
  height: 100%;
  background-color: #f5f5f5;
  float: left;
  padding-top: 3%;
}
.more .personal_list .header span {
  text-align: center;
  font-size: 12px;
  color: #fff;
  border: 1px solid #fff;
  padding: 0 3px 0 3px;
  border-radius: 2px;
  margin-left: 3%;
}
.more .personal_list .header .vip {
  color: #f06292;
  padding: 0 4px 0 3px;
  background-color: rgba(238, 238, 238, .8);
}
.more .personal_list .header .assets {
  margin-top: 3%;
  margin-bottom: 3%;
  width: 100%;
  height: 20px;
  color: #dbdbdb;
}
/* 左侧弹框中间部分 */
.more .personal_list .content {
  overflow: hidden;
  width: 100%;
  background-color: #f5f5f5;
}
/* 选中样式 */
.more .personal_list .content .active {
  background-color: #e0e0e0;
}
.more .personal_list .content .active span {
  color: #f06292;
}
.more .content .content_list {
  margin-top: 5px;
  width: 100%;
  border-bottom: 1px solid #9e9e9e;
}
.more .content .content_list li {
  list-style: none;
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.more .content .content_list li .btn-list {
  position: relative;
  width: 100%;
  height: 100%;
}
.more .content .content_list li .btn-list .c-icon {
  position: absolute;
  left: 10%;
}
.more .content .content_list li .btn-list span {
  position: absolute;
  left: 25%;
}

/* 左侧弹框底部 */
.more .footer div {
  width: 33.3333%;
  height: 100%;
  float: left;
  text-align: center;
}
.more .footer div .footer_icon {
  margin: 0 auto;
  display: inline-block;
  width: 40px !important;
  height: 40px !important;
  border-radius: 50%;
  padding: 6px 6px;
  border: 2px solid #dbdbdb;
  background-color: #fff;
  vertical-align: middle;
  margin-right: 3px;
}
</style>