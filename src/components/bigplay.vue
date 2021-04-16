<template>
  <div>
    <div class="player-q">
      <div class="button" @click="fanhui">
        <span class="iconfont icon-wei-"></span>
      </div>
      <div class="title">
        <h2>{{ musicData.Musiclist[musicData.musicI].name }}</h2>
        <h3>
              <span v-for="(item,index) in musicData.Musiclist[musicData.musicI].ar" :key="index"
                    v-show="index < 3">{{ item.name }}&nbsp;</span>
        </h3>
      </div>

      <!--        //歌词图片-->
      <div class="content clearfix" @click="iconplay=!iconplay">
        <div :class="['img','play',{'pause':playks}]" v-show="iconplay===true">
          <img :src="playimg" alt="" :class="['play',{'pause':playks}]">
        </div>

        <div v-show="iconplay!==true" class="lyrics">
          <ul :style="{'top':lyricTop}">
            <li
                v-for="(item,index) in lyric"
                :class="{'con':currentRow === index}"
                :key="index"
            >{{ item.text }}
            </li>
          </ul>
        </div>
      </div>

      <!--        //进度条-->
      <div class="range">
        <div class="bar">
          <span class="timeLeft">{{ timeleft | playertime }}</span>
          <van-slider v-model="value" @change="sliderchange" bar-height="5px" active-color="#D4483D">
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <span class="timeRight">{{ timeright | playertime }}</span>
        </div>
      </div>

      <!--        //按钮-->
      <div>
        <ul class="buttons">
          <li @click="changeMode">
            <span class="iconfont icon-ziyuan" v-if="playerType == 1"></span>
            <span class="iconfont icon-suiji" v-else></span>
          </li>
          <li @click="startup"><span class="iconfont icon-48shangyishou"></span></li>
          <li @click="toggleplay">
            <span class="iconfont icon-arrow-" v-if="playks"></span>
            <span class="iconfont icon-ziyuan100" v-if="!playks"></span>
          </li>
          <li @click="lowerFun"><span class="iconfont icon-49xiayishou"></span></li>
          <li><span :class="['iconfont','icon-aixin',{'col':redflag}]" @click="enshrine"></span></li>
        </ul>
      </div>

    </div>

    <div class="fxiang" @click="showShare = true">
      <span class="iconfont icon-fenxiang"></span>
    </div>
    <van-share-sheet
        v-model="showShare"
        title="分享歌曲给好友"
        :options="options"
        @select="onSelect"
    />

    <audio ref="audio" controls hidden :src="playUrl" @ended="endedFun" @canplay="canplayFun"></audio>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {getSongUrl, getSongLyric, getSongDetail} from "../api/song"

export default {
  name: "bigplay",
  data() {
    return {
      value: 0,
      iconplay: true,
      playks: true,
      playUrl: "", //mp3路径
      playimg: "", //图片img
      playerType: 1, //1 列表播放  2 随机播放
      timeleft: 0,
      timeright: 0,
      clearset: null,
      lyric: [],//歌词对象
      currentRow: 0,
      lyricTop: "4.6875rem",
      //分享
      showShare: false,
      options: [
        [
          {name: '微信', icon: 'wechat'},
          {name: '朋友圈', icon: 'wechat-moments'},
          {name: '微博', icon: 'weibo'},
          {name: 'QQ', icon: 'qq'},
        ],
        [
          {name: '复制链接', icon: 'link'},
          {name: '分享海报', icon: 'poster'},
          {name: '二维码', icon: 'qrcode'},
          {name: '小程序码', icon: 'weapp-qrcode'},
        ],
      ],
      redflag: false,
      ks: true
    }
  },
  computed: {
    ...mapState(['musicData', 'collect'])
  },
  // beforeUpdate() {
  //   getSongUrl({id: this.musicData.Musiclist[this.musicData.musicI].id}).then(data => {
  //     this.playUrl = data.data[0].url
  //     console.log(this.playUrl)
  //   })
  //   getSongDetail({ids: this.musicData.Musiclist[this.musicData.musicI].id}).then(data => {
  //     this.playimg = data.songs[0].al.picUrl
  //     console.log(this.playimg)
  //   })
  // },
  watch: {
    timeleft: function () {
      for (let i = 0; i < this.lyric.length; i++) {
        if (parseInt(this.timeleft) == this.lyric[i].time) {
          this.currentRow = i; //文字选中切换
          this.lyricTop = (300 - i * 50) / 64 + "rem";
          break;
        }
      }
    }
  },
  methods: {
    ...mapActions(['addenshrine']),
    toggleplay() {
      if (this.playks) {
        this.$refs.audio.play(); //播放
        clearInterval(this.clearset); //清除定时器
        // 设置定时器
        this.clearset = setInterval(() => {
          let currentTime = this.$refs.audio.currentTime
          let duration = this.$refs.audio.duration;
          this.timeleft = currentTime;
          // 计算滑块位置
          this.value = currentTime / duration * 100;
          this.musicLang = this.value

          if (this.value == 100) {
            clearInterval(this.clearset);
            this.$refs.audio.pause(); //暂停
          }
        }, 999);
      } else {
        this.$refs.audio.pause(); //暂停
        clearInterval(this.clearset); //清除定时器
      }
      // 按钮切换
      this.playks = !this.playks;
    },
    // 进度条
    sliderchange() {
      let duration = this.$refs.audio.duration * this.value / 100;
      this.timeleft = duration;//百分比
      this.$refs.audio.currentTime = duration; //修改时间
    },
    //上一首
    startup() {
      let i = this.musicData.musicI;
      if (i - 1 < 0) {
        i = this.musicData.Musiclist.length
      } else {
        i--
      }
      this.toggleplay();
      this.$store.dispatch("addmusicData", {index: i, list: this.musicData.Musiclist})
    },
    //下一首
    lowerFun() {
      let i = this.musicData.musicI;
      if (i + 1 > this.musicData.Musiclist.length) {
        i = 0
      } else {
        i++
      }
      this.toggleplay();
      this.$store.dispatch("addmusicData", {index: i, list: this.musicData.Musiclist})
    },
    // 获取歌词
    getSongLyricFun() {
      this.lyricTop = "4.6875rem";
      this.currentRow = 0;
      getSongLyric({id: this.musicData.Musiclist[this.musicData.musicI].id}).then(data => {
        this.formatLyric(data.lrc.lyric);
      })
    },
    // 处理歌词结构
    formatLyric(text) {
      this.lyric = [];
      let arr = text.split("\n"); //把原歌曲字符串转数组
      let row = arr.length;//获取数组长度
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i];//获取数据"[00:00.000] 作词 : G.E.M.邓紫棋"
        let temp_arr = temp_row.split("]");//分成两个数组
        // [00:00.000      作词 : G.E.M.邓紫棋
        let text = temp_arr.pop();//删除数组最后以为，返回删除数据

        temp_arr.forEach(element => {
          let obj = {}
          let time_arr = element.substr(1, element.length - 1).split(":");  //02:00.000 获取时间数据
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //得到当前秒数
          obj.time = s;
          obj.text = text;
          if (text.length > 0) {
            this.lyric.push(obj);//每一行处理好数据放入数组
          }
        })
      }
    },
    // 音乐加载完后调用
    canplayFun() {
      this.timeright = this.$refs.audio.duration;
      // this.timeleft = 0;
      this.playks = true; //播放
      this.toggleplay();
      this.getSongLyricFun();
    },

    // 音乐播放结束
    endedFun() {
      this.playks = true;
      this.$refs.audio.play(); //播放
      clearInterval(this.clearset); //清除定时器
      if (this.playerType === 1) {  //列表播放
        this.lowerFun();
        this.playks = false;
      } else {  //随机播放
        let num = parseInt(Math.random() * this.musicData.Musiclist.length);
        this.$store.dispatch("addmusicData", {index: num, list: this.musicData.Musiclist})
      }
    },
    // 修改类型
    changeMode() {
      this.playerType = this.playerType === 1 ? 2 : 1;
    },
    //退出
    fanhui() {
      clearInterval(this.clearset)
      this.$router.go(-1);
    },
    //分享
    onSelect() {
      this.showShare = false;
    },
    //收藏
    enshrine() {

      this.collect.forEach(item => {
        if (item.musicid == this.musicData.Musiclist[this.musicData.musicI].id) {
          this.ks = false
        }
      })
      if (!this.redflag && this.ks) {
        console.log("收藏")
        console.log(this.musicData.Musiclist[this.musicData.musicI])
        this.addenshrine({
          musicid: this.musicData.Musiclist[this.musicData.musicI].id,
          musicName: this.musicData.Musiclist[this.musicData.musicI].name,
          musicSonger: this.musicData.Musiclist[this.musicData.musicI],
        })
      } else {
        console.log("取消")
        this.ks = true
      }
      this.redflag = !this.redflag
    }
  },
  created() {
    getSongUrl({id: this.musicData.Musiclist[this.musicData.musicI].id}).then(data => {
      this.playUrl = data.data[0].url
      console.log(this.playUrl)
    })
    getSongDetail({ids: this.musicData.Musiclist[this.musicData.musicI].id}).then(data => {
      this.playimg = data.songs[0].al.picUrl
      console.log(this.playimg)
      this.collect.forEach(item => {
        if (item.musicid == this.musicData.Musiclist[this.musicData.musicI].id) {
          this.redflag = true
        }
      })
    })
  },
  filters: {
    playertime(data) {
      let m = parseInt(data / 60); //分钟
      let s = parseInt(data % 60); //秒
      s = s < 10 ? "0" + s : s;
      if (m == 0 && s == 0) {
        return "0:00";
      } else {
        return m + ":" + s;
      }
    }
  },

}
</script>

<style scoped lang="less">
.clearfix {
  content: "";
  display: block;
  clear: both;
}

.player-q {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  margin: auto;
  background: #837F7D;

  .button {
    position: absolute;
    top: 0.359375rem;
    left: 0.359375rem;
    font-size: 0.53125rem;
    width: 0.53125rem;
    height: 0.53125rem;

    span {
      display: block;
      font-size: 0.53125rem;
      height: 0.53125rem;
      line-height: 0.53125rem;
      color: #fff;
      font-weight: bold;
    }
  }

  .title {
    text-align: center;
    color: #fff;

    h2 {
      font-size: 0.5rem;
      margin-top: 0.0625rem;
    }

    h3 {
      font-size: 0.4375rem;
    }
  }

  .content {
    height: 10.40625rem;
    text-align: center;

    .img {
      float: left;
      width: 100%;
      margin-top: 1.34375rem;

      img {
        display: block;
        width: 7.3125rem;
        height: 7.3125rem;
        border: 0.375rem solid #878381;
        border-radius: 50%;
        background-color: #fff;
        margin: 0 auto;

        &.play {
          animation: rotate 20s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }

  .range {
    text-align: center;
    height: 0.3125rem;

    .bar {
      width: 6.5625rem;
      margin: 0 auto;
      position: relative;
      font-size: 0.28125rem;
      color: #fff;

      .timeLeft {
        position: absolute;
        left: -0.859375rem;
        top: -0.109375rem;
      }

      .timeRight {
        position: absolute;
        right: -0.9375rem;
        top: -0.109375rem;
      }
    }

  }

  .buttons {
    display: flex;
    margin-top: 0.515625rem;
    justify-content: space-around;

    li {
      height: 66px;
      line-height: 66px;
      font-size: 30px;

      &:nth-child(3) {
        span {
          font-size: 40px;
        }
      }

      span {
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 30px;
        color: #fff;
      }

      .col {
        color: #ee0a24;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

div.lyrics {
  width: 100%;
  height: 10.40625rem;
  position: relative;
  overflow: hidden;

  ul {
    position: absolute;
    width: 100%;
    min-height: 15.625rem;
    top: 4.6875rem;
    left: 0px;

    li {
      width: 100%;
      color: #4F4B49;
      text-align: center;
      height: 0.78125rem;
      line-height: 0.78125rem;
      font-size: 0.28125rem;

      &.con {
        color: #fff;
        font-size: 0.34375rem;
      }
    }
  }
}

.custom-button {
  width: 0.078125rem;
  height: 0.078125rem;
  color: #fff;
  font-size: 0.15625rem;
  line-height: 0.28125rem;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 50%;
  border: 0.125rem solid #fff;
}

.fxiang {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  top: 0;
  right: 5px;

  span {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-weight: bold;
  }
}

</style>