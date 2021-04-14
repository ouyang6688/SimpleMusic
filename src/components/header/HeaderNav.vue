<template>
  <div>
    <div class="header">
      <div class="left iconfont icon-leftalignment" @click="linkShow"></div>
      <div class="center">SimpleMusic</div>
      <div class="right iconfont icon-search" @click="$router.push({path:'/search'})"></div>
    </div>
    <div class="navs" v-if="!flag && !$route.meta.headernavfalg">
      <router-link to="/recommend" tag="div" class="item">
        <span>推荐</span>
      </router-link>
      <router-link to="/rank" tag="div" class="item">
        <span>排行</span>
      </router-link>
      <router-link to="/singer" tag="div" class="item">
        <span>歌手</span>
      </router-link>
      <router-link to="/newmv" tag="div" class="item">
        <span>MV</span>
      </router-link>
    </div>
    <div class="mask" v-if="flag">
        <ul>
          <li @click="linkUrl(item.paths)" v-for="(item,index) in smList" :key="index">{{ item.names }}</li>
          <li>
            <a href="https://d1.music.126.net/dmusic/NeteaseCloudMusic_Music_official_8.1.80.210406193830.apk">APP下载</a>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  data(){
    return{
      flag:false,
      smList:[
        {
          paths:"/recommend",
          names:'热门推荐'
        },
        {
          paths:"/rank",
          names:'排行榜'
        },
        {
          paths:"/singer",
          names:'歌手分类'
        },
        {
          paths:"/newmv",
          names:'热门MV'
        },
        {
          paths: "/search",
          names: "搜索"
        },
        {
          paths: "/login",
          names: "用户登录"
        }
      ]
    }
  },
  methods:{
    linkUrl(data){
      if(this.$route.path !== data){
        this.$router.push({path:data});
      }
      this.flag = !this.flag;
      this.$emit("showOr-p",this.flag)
    },
    linkShow(){
      this.flag = !this.flag;
      this.$emit("showOr-p",this.flag)
    }
  }
}
</script>

<style scoped lang="less">
.header{
  display: flex;
  background-color: #D4473C;
  color:#fff;
  text-align: center;
  .left{
    flex: 0 0 1.0625rem;
    font-size: .46875rem;
    line-height: .984375rem;
  }
  .center{
    flex: 1;
    line-height: .984375rem;
    font-size: .375rem;
    font-weight: bold;
  }
  .right{
    flex: 0 0 1.0625rem;
    font-size: .46875rem;
    line-height: .984375rem;
  }
}
.navs{
  display: flex;
  color:#fff;
  background-color: #D4473C;
  margin-top: -0.015625rem;
  .item{
    flex: 1;
    font-size: 22px;
    height: 1.140625rem;
    text-align: center;
    span{
      margin-top: .359375rem;
      height:.515625rem;
      line-height: .515625rem;
      display: inline-block;
      border-bottom: 2px solid transparent;
      padding-bottom: 3px;
    }
    &.router-link-active span{
      font-weight: bold;
      border-color: #fff;
    }
  }
}
.mask{
  width: 100vw;
  height: 100vh;
  background-color: #D4473C;
  ul{
    width: 100%;
    height: 100%;
    li{
      width: 100%;
      height: 1.5625rem;
      line-height: 1.5625rem;
      font-size: 1.09375rem;
      color: #fff;
      text-align: center;
      border-bottom: 1px solid #fff;
      a{
        color: #fff;
      }
    }
  }
}
</style>