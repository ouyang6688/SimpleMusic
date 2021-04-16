<template>
  <div>
    <div class="loadingvan" v-show="loading">
      <van-loading type="spinner" color="#D4473C" size="50px"/>
    </div>

    <div class="mvlists">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <ul ref="mvlists">
          <li class="" v-for="(item,index) in mvlists" :key="index">
            <div class="imgs" :style="{'background-image':'url('+item.cover+')'}" v-show="playNum !== index"
                 @click="getUrlShow(index,item.id)">
              <span class="iconfont icon-bofang"></span>
            </div>
            <div class="imgs" v-if="playNum === index" @click="mvplayend">
              <video id="video1" @canplaythrough="canplayfun" :src="item.mvurl" preload="metadata" controls>
              </video>
            </div>
            <p>
              {{ item.name }}
            </p>
          </li>
        </ul>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import {getMvlist, getMvUrl} from "../api/mv"

export default {
  name: "newmv",
  data() {
    return {
      mvlists: [],
      //页码
      offset: 0,
      flag: true,
      //对应播放视频下标
      playNum: null,
      isLoading: false,
      loading: true,
    }
  },
  methods: {
    getMvlistFun() {
      getMvlist({limit: 5, offset: this.offset}).then(data => {
        this.mvlists = data.data;
      })
    },
    add() {
      // 防抖: 阻止用户多次请求服务器
      if (this.flag) {
        this.flag = false;
        this.offset += 5;
        getMvlist({limit: 5, offset: this.offset}).then(data => {
          this.mvlists = this.mvlists.concat(data.data);
          this.flag = true;
        })
      }
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; //滚动条偏移量
      if (this.$refs.mvlists) {
        let lis = this.$refs.mvlists.childNodes;
        let num = lis.length;
        let liHeight = lis[num - 3].offsetTop;
        if (scrollTop > liHeight) { //触发加载数据
          this.add();
        }
      }
    },
    getUrlShow(index, id) {
      this.playNum = index
      getMvUrl({id}).then(data => {
        this.$set(this.mvlists[index], "mvurl", data.data.url);
      })
    },
    mvplayend(event) {
      event.target.pause();
      this.playNum = null;
    },
    canplayfun(event) {
      console.log("播放吧")
      event.target.play();
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },

  created() {
    this.getMvlistFun();
  },
  mounted() {
    this.$nextTick(() => {
      // 监听滚动事件
      window.addEventListener("scroll", this.handleScroll)
      setTimeout(() => {
        this.loading = false;
      }, 3000)
    })
  }
}
</script>

<style scoped lang="less">
.mvlists {
  width: 100%;

  li {
    margin-bottom: 0.15625rem;

    .imgs {
      width: 100%;
      height: 300px;
      // background-color: yellow;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;

      span {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 1.25rem;
        height: 1.25rem;
        text-align: center;
        line-height: 1.25rem;
        color: #fff;
        font-size: 0.5rem;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
      }

      video {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        display: block;
      }
    }

    p {
      font-size: 0.375rem;
      text-indent: 1em;
      height: 0.625rem;
      line-height: 0.625rem;
      overflow: hidden;
    }
  }
}

.loadingvan {
  position: fixed;
  z-index: 900;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  margin: auto;
  background: rgba(242, 242, 242, 0.8);
  text-align: center;

  .van-loading {
    margin: 0 auto;
    margin-top: 7.0625rem;
  }
}
</style>