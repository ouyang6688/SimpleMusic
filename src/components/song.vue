<template>
  <div>
    <div class="loadingvan" v-show="loading">
      <van-loading type="spinner" color="#D4473C" size="50px"/>
    </div>

    <div class="topheader">
      <div class="img">
        <img :src="playlist.coverImgUrl" alt="">
      </div>
      <div class="title">
        {{ playlist.name }}
      </div>
      <div class="button" @click="$router.go(-1)">
        <span class="iconfont icon-icon-arrow-left2"></span>
        歌单
      </div>
    </div>

    <dl class="musiclist">
      <dt>
        播放全部 <span>(共{{ playlist.trackCount }}首)</span>
      </dt>
      <dd v-for="(item,index) in playlist.tracks" :key="index" @click="addlists(index)">
        <h1>{{ index + 1 }}</h1>
        <div class="info">
          <h2>{{ item.name }}</h2>
          <h3>
            <span v-for="(key,index) in item.ar" :key="index" v-show="index < 3">{{ key.name }} &nbsp;&nbsp;</span>
          </h3>
        </div>
      </dd>
    </dl>

    <div class="hotcomment" v-if="hotcomment.length">
      <dl>
        <dt>精彩评论</dt>
        <dd v-for="(item, index) in hotcomment" :key="index">
          <h1>
            <div class="user">
              <img :src="item.user.avatarUrl" alt=""/>
            </div>
            <div class="cmt">
              <div class="username">{{ item.user.nickname }}</div>
              <div class="time">{{ item.time | timefor }}</div>
            </div>
            <div class="good">
              <div class="num">{{ item.likedCount }}</div>
              <span class="iconfont icon-tuijian"></span>
            </div>
          </h1>
          <h4 style="font-size: 12px;font-weight: lighter;border-bottom: 1px solid #e5e5e5;margin-top: 0.078125rem;padding-bottom: 0.21875rem;margin-left: 0.78125rem">
            <span v-if="item.beReplied.length"
            >回复<a href="#">@{{ item.beReplied[0].user.nickname }}</a></span
            >
            {{ item.content }}
            <div class="reply" v-if="item.beReplied.length">
              @{{ item.beReplied[0].user.nickname }}:{{
                item.beReplied[0].content
              }}
            </div>
          </h4>
        </dd>
      </dl>
    </div>
    <div class="newcomment" v-show="newcomment.length">
      <dl>
        <dt>最新评论</dt>
        <dd v-for="(item, index) in newcomment" :key="index">
          <h1>
            <div class="user">
              <img :src="item.user.avatarUrl" alt=""/>
            </div>
            <div class="cmt">
              <div class="username">{{ item.user.nickname }}</div>
              <div class="time">{{ item.time | timefor }}</div>
            </div>
            <div class="good">
              <div class="num">{{ item.likedCount }}</div>
              <span class="iconfont icon-tuijian"></span>
            </div>
          </h1>
          <h4 style="font-size: 12px;font-weight: lighter;border-bottom: 1px solid #e5e5e5;margin-top: 0.078125rem;padding-bottom: 0.21875rem;margin-left: 0.78125rem">
            <span v-if="item.beReplied.length"
            >回复<a href="#">@{{ item.beReplied[0].user.nickname }}</a></span
            >
            {{ item.content }}
            <div class="reply" v-if="item.beReplied.length">
              @{{ item.beReplied[0].user.nickname }}:{{
                item.beReplied[0].content
              }}
            </div>
          </h4>
        </dd>
      </dl>
    </div>

    <!--  播放控件  -->
    <player></player>
  </div>
</template>

<script>
import {getDetail, getCommentLists} from "../api/recommend"
import player from "../components/player";

export default {
  name: "song",
  data() {
    return {
      playlist: {
        tracks: []
      },
      newcomment: [],
      hotcomment: [],
      loading: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
      }, 3000)
    })
  },
  methods: {
    getDetailFun() {
      let id = this.$route.query.id;
      console.log(id);
      getDetail({id: id}).then(data => {
        console.log(data);
        this.playlist = data.playlist;
      });
      getCommentLists({id: id}).then(data => {
        this.newcomment = data.comments;
        this.hotcomment = data.hotComments;
      })
    },
    addlists(i) {
      console.log(i, this.playlist.tracks, '歌单')
      this.$store.dispatch("addmusicData", {index: i, list: this.playlist.tracks})
    }

  },
  filters: {
    timefor(val) {
      // console.log(val);
      let time = new Date(val);
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let newtime = new Date();
      let newy = newtime.getFullYear();
      let newm = newtime.getMonth() + 1;
      let newd = newtime.getDate();
      let newh = newtime.getHours();
      let newmm = newtime.getMinutes();
      if (y == newy && m == newm && d == newd && h == newh) {
        let formm = newmm - mm
        // console.log(mm+"分钟前");
        return formm + "分钟前"
      } else if (y == newy && m == newm && d == newd) {
        let forh = h >= 10 ? h : "0" + h
        let formm = mm >= 10 ? mm : "0" + mm
        return forh + ":" + formm
      } else if (y == newy && m == newm && d == newd - 1) {
        let forh = h >= 10 ? h : "0" + h
        let formm = mm >= 10 ? mm : "0" + mm
        // console.log("昨天"+forh+":"+formm);
        return "昨天" + forh + ":" + formm
      } else {
        // console.log(y+"年"+m+"月"+d+"日");
        return y + "年" + m + "月" + d + "日"
      }
    },
  },
  created() {
    this.getDetailFun();
  },
  components: {
    player,
  }
}
</script>

<style scoped lang="less">
.musiclist {
  border-radius: 12px;
  background-color: #fff;
  position: relative;
  top: -12px;
  min-height: 3.125rem;

  dt {
    height: 0.953125rem;
    line-height: 0.953125rem;
    border-bottom: 1px solid #E2E2E2;
    font-size: 0.390625rem;
    color: #131615;
    text-indent: 1em;

    span {
      font-size: 0.359375rem;
      color: #616262;
    }
  }

  dd {
    height: 1.421875rem;
    border-bottom: 1px solid #E2E2E2;
    display: flex;

    h1 {
      flex: 0 0 1.21875rem;
      line-height: 1.421875rem;
      text-align: center;
      font-size: 0.4375rem;
      color: #707271;
      font-weight: normal;
    }

    .info {
      flex: 1;

      h2 {
        font-size: 0.390625rem;
        color: #3A3C3C;
        margin-top: 0.28125rem;
        font-weight: normal;
      }

      h3 {
        font-size: 0.3125rem;
        color: #777978;
        font-weight: normal;
      }
    }
  }
}

.topheader {
  width: 100%;
  height: 7.234375rem;
  position: relative;

  .img {
    width: 100%;
    height: 7.234375rem;

    img {
      width: 100%;
    }

    background-color: aqua;
  }

  .title {
    position: absolute;
    left: 0.5rem;
    bottom: 0.65625rem;
    font-size: 0.5rem;
    font-weight: bold;
    color: #fff;
    height: 0.59375rem;
    overflow: hidden;
  }

  .button {
    position: absolute;
    color: #fff;
    left: 0.5rem;
    top: 0.40625rem;
    height: 0.625rem;
    line-height: 0.625rem;
    font-size: 0.546875rem;

    span {
      display: inline-block;
      font-size: 0.625rem;
      vertical-align: top;
    }
  }
}

.hotcomment, .newcomment {
  margin-bottom: 0.15625rem;

  dd {
    padding-top: 0.15625rem;
  }

  h1 {
    font-weight: normal;
    display: flex;
    height: 0.625rem;

    .user {
      flex: 0 0 0.78125rem;
      height: 0.625rem;
      // background: aqua;
      img {
        width: 0.46875rem;
        height: 0.46875rem;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
      }
    }

    .cmt {
      flex: 1;

      .username {
        height: 0.3125rem;
        line-height: 0.3125rem;
        font-size: 0.1875rem;
        color: #666666;
      }

      .time {
        font-size: 0.15625rem;
        height: 0.15625rem;
        margin-top: 0.03125rem;
        color: #999999;
      }
    }

    .good {
      flex: 0 0 0.703125rem;
      display: flex;
      line-height: 0.78125rem;
      height: 0.78125rem;
      font-size: 0.1875rem;

      span {
        display: block;
        margin-top: -0.03125rem;
        margin-left: 0.046875rem;
      }
    }

    h4.p1 {
      margin-left: 0.78125rem !important;
      font-size: 0.25rem;
      font-weight: normal;
      border-bottom: 1px solid #e5e5e5;
      margin-top: 0.078125rem;
      padding-bottom: 0.21875rem;
    }
  }
}

dt {
  height: 0.759375rem;
  line-height: 0.759375rem;
  color: #666666;
  padding-left: 0.15625rem;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.1875rem;
  background: #eeeff0;
}

.loadingvan {
  position: fixed;
  z-index: 900;
  top: 0;
  bottom: 0;
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