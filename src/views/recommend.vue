<template>
  <div>
    <div class="banner">
      <div class="imgs">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in banners" :key="index">
            <img :src="item.pic" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="remlists">
      <div class="title">
        推荐歌单
      </div>
      <div class="content1">
        <ul class="uls">
          <li v-for="(item,index) in hasTaste" :key="index" @click="goMusiclist(item.id)">
            <img :src="item.picUrl" alt="">
            <span class="remd_lnum"><i class="iconfont icon-erji1"></i>
              {{parseInt(item.playCount/wan) > 0 ? (parseInt(item.playCount/wan/wan)>0?parseInt(item.playCount/wan/wan)+"亿":parseInt(item.playCount/wan)+"万" ): item.playCount}}
            </span>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="remlists">
      <div class="title">
        最新音乐
      </div>
      <div class="content1">
        <ul class="uls">
          <li v-for="(item,index) in newsongList" :key="index">
            <img :src="item.picUrl" alt="">
            <p style="text-align: center;font-weight: bold">{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getBanner,getNewsong} from '../api/recommend'

export default {
  name: "recommend",
  data() {
    return {
      banners: "",
      hasTaste:"",
      wan:10000,
      newsongList:""
    }
  },
  methods:{
    goMusiclist(id){
      this.$router.push({
        path:"/recommend/musiclist",
        query:{id}
      })
    }
  },
  created() {
    getBanner("/banner?type=2").then(data => {
      if (data.code == 200) {
        this.banners = data.banners;
      }
      // console.log(data)
    })
    getBanner("/personalized?limit=9").then(data=>{
      if(data.code == 200){
        this.hasTaste =data.result;
      }
      // console.log(data);
    })
    getNewsong().then(data=>{
      data.result.pop();
      this.newsongList = data.result;
      console.log(this.newsongList)
    })
  }
}
</script>

<style scoped lang="less">
.banner {
  height: 228px;
  background-color: #D4473C;
  width: 100%;
  display: flex;
  justify-content: center;

  .imgs {
    height: 228px;
    width: 96%;
    background-color: pink;
    border-radius: 5px;

    img {
      width: 100%;
      height: 228px;
    }
  }
}

.remlists {
  .title {
    font-size: .34375rem;
    height: 100px;
    line-height: 100px;
    font-weight: bold;
    text-indent: .5em;
  }

  .content1 ul {
    width: 100%;
    display: flex;

    flex-wrap: wrap;

    li {
      width: 33.33%;
      margin-bottom: 16px;
      position: relative;

      img {
        display: block;
        width: 3.125rem;
        height: 3.125rem;
        margin: 0 auto;
        border-radius: 3px;
      }

      p {
        font-size: .28125rem;
        color: #2F3035;
        height: .78125rem;
        overflow: hidden;
        line-height: .4375rem;
        padding: .15625rem .109375rem .1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .remd_lnum {
        position: absolute;
        top: 0;
        right: 8px;
        font-size: .234375rem;
        color: #fff;
      }
    }
  }
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  //line-height: 283px;
  text-align: center;
  background-color: pink;
}
</style>