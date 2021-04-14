<template>
  <div>
    <div class="hang" v-show="!falg"></div>

<!--    <div class="player" v-show="falg" :style="`background: url('${playimg}') no-repeat center center`">-->
    <div class="player" v-show="falg">
      <div class="button" @click="falg=!falg">
        <span class="iconfont icon-wei-"></span>
      </div>
      <div class="title">
        <h2>{{musicData.Musiclist[musicData.musicI].name}}</h2>
        <h3>
          <span v-for="(item,index) in musicData.Musiclist[musicData.musicI].ar" :key="index" v-show="index < 3">{{item.name}}&nbsp;</span>
        </h3>
      </div>

      <div class="content clearfix" @click="iconplay=!iconplay">
        <div :class="['img','play',{'pause':playks}]" v-show="iconplay===true">
          <img :src="playimg" alt="" :class="['play',{'pause':!playks}]">
        </div>

        <div v-show="iconplay!==true" class="lyrics">
          <ul :style="{'top':lyricTop}">
            <li
                v-for="(item,index) in lyric"
                :class="{'con':currentRow === index}"
                :key="index"
            >{{item.text}}</li>

          </ul>
        </div>
      </div>

      <div class="range">
        <div class="bar">
          <span class="timeLeft">{{timeleft | playertime}}</span>
          <van-slider v-model="value" @change="sliderchange"  bar-height="5px" active-color="#D4483D">
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <span class="timeRight">{{timeright | playertime}}</span>
        </div>
      </div>

      <div>
        <ul class="buttons">
          <li @click="changeMode">
            <span class="iconfont icon-ziyuan" v-if="playerType == 1" ></span>
            <span class="iconfont icon-suiji" v-else></span>
          </li>
          <li @click="startup"><span class="iconfont icon-48shangyishou"></span></li>
          <li @click="toggleplay">
            <span class="iconfont icon-arrow-" v-if="!playks"></span>
            <span class="iconfont icon-ziyuan100" v-if="playks"></span>
          </li>
          <li @click="lowerFun"><span class="iconfont icon-49xiayishou"></span></li>
          <li><span class="iconfont icon-aixin"></span></li>
        </ul>
      </div>

    </div>

    <div class="line">
      <van-progress :percentage="musicLang" pivot-text="" color="#ee0a24" stroke-width="2"/>
    </div>
    <div class="miniPaly" v-show="!falg">
      <div class="play-img" @click="falg=!falg">
        <img :src="playimg" alt="" :class="['play',{'pause':!playks}]">
      </div>
      <div class="paly-kj">
        <h2>{{musicData.Musiclist[musicData.musicI].name}}</h2>
        <h3><span v-for="(item,index) in musicData.Musiclist[musicData.musicI].ar" :key="index" v-show="index < 3">{{item.name}}&nbsp;</span></h3>
      </div>
      <div class="paly-ic">
        <span @click="toggleplay">
          <span class="c1 iconfont icon-arrow-" v-if="!playks"></span>
          <span class="c1 iconfont icon-ziyuan100" v-if="playks"></span>
        </span>
        <span class="c2 iconfont icon-liebiao" @click="showPopup"></span>
      </div>
    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '60%' }" :round="show">
      <ul class="popub-ul">
        <li class="li-one">
          <span class="iconfont icon-ziyuan"></span>
          <p>顺序播放({{ musicData.Musiclist.length }})</p>
          <span class="iconfont icon-shanchu"></span>
        </li>
        <li v-for="(item,index) in musicData.Musiclist" :key="index">
          <span class="iconfont icon-changge" style="color: #D4473C;" v-if="index === musicData.musicI"></span>
          <p>{{ item.name }}</p>
          <span class="iconfont icon-cha" style="color: #D4473C;"></span>
        </li>
      </ul>
    </van-popup>

    <audio ref="audio" controls hidden  :src="playUrl" @ended="endedFun" @canplay="canplayFun"></audio>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {getSongDetail,getSongUrl,getSongLyric} from "../api/song"

export default {
  name: "player",
  data() {
    return {
      falg: false,
      show: false,
      musicLang:0,
      value:0,
      iconplay: true,
      playks:false,
      playUrl:"", //mp3路径
      playimg:"", //图片img
      playerType:1, //1 列表播放  2 随机播放
      timeleft:0,
      timeright:0,
      clearset:null,
      lyric:[],//歌词对象
      currentRow:0,
      lyricTop:"4.6875rem",
    }
  },
  beforeUpdate() {
    getSongDetail({ids:this.musicData.Musiclist[this.musicData.musicI].id}).then(data=>{
      this.playimg = data.songs[0].al.picUrl
      console.log(this.playimg)
    })
    getSongUrl({id:this.musicData.Musiclist[this.musicData.musicI].id}).then(data=>{
      this.playUrl = data.data[0].url
      console.log(this.playUrl)
    })
  },
  computed:{
    ...mapState(['musicData'])
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    toggleplay(){
      if(!this.playks){
        this.$refs.audio.play(); //播放
        clearInterval(this.clearset); //清除定时器
        // 设置定时器
        this.clearset = setInterval(()=>{
          let currentTime = this.$refs.audio.currentTime
          let duration = this.$refs.audio.duration;
          this.timeleft = currentTime;
          // 计算滑块位置
          this.value = currentTime / duration * 100;
          this.musicLang = this.value

          if(this.value == 100){
            clearInterval(this.clearset);
            this.$refs.audio.pause(); //暂停
          }
        },999);
      }else{
        this.$refs.audio.pause(); //暂停
        clearInterval(this.clearset); //清除定时器
      }
      // 按钮切换
      this.playks = !this.playks;
    },
    // 进度条
    sliderchange(){
      let duration = this.$refs.audio.duration * this.value / 100;
      this.timeleft = duration ;//百分比
      this.$refs.audio.currentTime = duration; //修改时间
    },
    //播放
    // player(){
    //   if(!this.playks){
    //     this.$refs.audio.play();
    //   }else {
    //     this.$refs.audio.pause();
    //   }
    //   this.playks = !this.playks;
    // },
    //上一首
    startup(){
      let i = this.musicData.musicI;
      if(i-1<0){
        i=this.musicData.Musiclist.length
      }else {
        i--
      }
      this.$store.dispatch("addmusicData",{index:i,list:this.musicData.Musiclist})
    },
    //下一首
    lowerFun(){
        let i = this.musicData.musicI;
        if(i+1>this.musicData.Musiclist.length){
          i=0
        }else {
          i++
        }
        this.$store.dispatch("addmusicData",{index:i,list:this.musicData.Musiclist})
    },
    // 音乐加载完后调用
    canplayFun(){
      this.timeright = this.$refs.audio.duration;
      // this.timeleft = 0;
      this.playks = true; //播放
      this.toggleplay();
      this.getSongLyricFun();
    },
    // 获取歌词
    getSongLyricFun(){
      this.lyricTop = "300px";
      this.currentRow = 0;
      getSongLyric({id:this.musicData.Musiclist[this.musicData.musicI].id}).then(data=>{
        this.formatLyric(data.lrc.lyric);
      })
    },
    // 处理歌词结构
    formatLyric(text){
      this.lyric = [];
      let arr = text.split("\n"); //把原歌曲字符串转数组
      let row = arr.length;//获取数组长度
      for(let i = 0;i < row;i++){
        let temp_row = arr[i];//获取数据"[00:00.000] 作词 : G.E.M.邓紫棋"
        let temp_arr = temp_row.split("]");//分成两个数组
        // [00:00.000      作词 : G.E.M.邓紫棋
        let text = temp_arr.pop();//删除数组最后以为，返回删除数据

        temp_arr.forEach(element=>{
          let obj = {}
          let time_arr = element.substr(1, element.length-1).split(":");  //02:00.000 获取时间数据
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //得到当前秒数
          obj.time = s;
          obj.text = text;
          if(text.length >0){
            this.lyric.push(obj);//每一行处理好数据放入数组
          }
        })
      }
    },
    // 音乐播放结束
    endedFun(){
      this.playks = true;
      this.$refs.audio.play(); //播放
      clearInterval(this.clearset); //清除定时器
      if(this.playerType ===  1){  //列表播放
        this.lowerFun();
        this.playks = false;
      }else{  //随机播放
        let num = parseInt(Math.random() * this.musicData.Musiclist.length);
        this.$store.dispatch("addmusicData",{index:num,list:this.musicData.Musiclist})
      }
    },
    // 修改类型
    changeMode(){
      this.playerType = this.playerType === 1 ? 2:1;
    }

  },
  filters:{
    playertime(data){
      let m = parseInt(data /60) ; //分钟
      let s = parseInt(data %60) ; //秒
      s = s < 10 ? "0"+ s:s;
      if(m == 0 && s == 0){
        return "0:00";
      }else{
        return m + ":" + s;
      }
    }
  },
  created() {
    console.log(this.$route.path, "路径");
    getSongDetail({ids:this.musicData.Musiclist[this.musicData.musicI].id}).then(data=>{
      this.playimg = data.songs[0].al.picUrl
      console.log(this.playimg)
    })
    getSongUrl({id:this.musicData.Musiclist[this.musicData.musicI].id}).then(data=>{
      this.playUrl = data.data[0].url
      console.log(this.playUrl)
    })
  }

}
</script>

<style scoped lang="less">
.miniPaly {
  width: 100%;
  height: 1.875rem;
  display: flex;
  background-color: rgba(255, 255, 255, .8);
  position: fixed;
  left: 0;
  bottom: 0;

  .play-img {
    width: 2.46875rem;
    height: 2.0625rem;

    img {
      width: 1.4375rem;
      height: 1.4375rem;
      border-radius: 50%;
      margin-top: 0.3125rem;
      margin-left: 0.3125rem;
      margin-right: 0.15625rem;
      background-color: #D4473C;
      &.play{
        animation: rotate 20s linear infinite;
      }
      &.pause{
        animation-play-state: paused;
      }
    }
  }

  .paly-kj {
    width: 100%;
    height: 100%;

    h2 {
      height: 20px;
      margin-top: 0.3125rem;
      font-size: 0.46875rem;
      color: #3A3C3E;
      overflow: hidden;
    }

    h3 {
      height: 18.5px;
      font-size: 0.4375rem;
      font-weight: lighter;
      color: #3A3C3E;
      overflow: hidden;
    }
  }

  .paly-ic {
    width: 3.125rem;
    height: 100%;
    display: flex;

    .c1 {
      width: 1.125rem;
      font-size: 1.125rem;
      line-height: 77px;
      color: #D4473C;
    }

    .c2 {
      display: inline-block;
      width: 2rem;
      font-size: 1.125rem;
      line-height: 77px;
      text-align: center;
      color: #6B6C6C;
    }
  }
}

.hang {
  width: 100%;
  height: 1.5625rem;
}

.bigPlay {
  width: 10rem;
  height: 100vh;
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background-color: #837F7D;
}

.line {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 1.875rem;
}

.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}

.popub-ul {
  width: 100%;
  box-sizing: border-box;
  padding: 0.53125rem 1.046875rem 0 0.671875rem;

  li {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    p {
      width: 80%;
      height: 40px;
      display: inline-block;
      overflow: hidden;
    }

    span {
      width: 10%;
      height: 40px;
      line-height: 40px;
      display: block;
    }

    span:last-child {
      float: right;
    }
  }

  .li-one {
    display: flex;
    font-size: 0.46875rem;

    span:nth-child(1) {
      display: block;
      width: 1rem;
    }

    p {
      flex: 1;
    }

    span:nth-child(2) {
      display: block;
      width: 0.5rem;
    }
  }
}

.player{
  overflow: hidden;
  position: fixed;
  top:0px;
  bottom: 0px;
  width: 10rem;
  height: 100%;
  margin:auto;
  background: #837F7D;
  z-index: 500;
  .button{
    position: absolute;
    top:0.359375rem;
    left:0.359375rem;
    font-size: 0.53125rem;
    width: 0.53125rem;
    height: 0.53125rem;
    span{
      display: block;
      font-size: 0.53125rem;
      height: 0.53125rem;
      line-height: 0.53125rem;
      color:#fff;
      font-weight: bold;
    }
  }
  .title{
    text-align: center;
    color:#fff;
    h2{
      font-size: 0.5rem;
      margin-top: 0.0625rem;
    }
    h3{
      font-size: 0.4375rem;
    }
  }
  .content{
    height: 10.40625rem;
    text-align: center;
    .img{
      float: left;
      width: 100%;
      margin-top: 1.34375rem;
      img{
        display: block;
        width: 7.3125rem;
        height: 7.3125rem;
        border:0.375rem solid #878381;
        border-radius: 50%;
        background-color: #fff;
        margin:0 auto;
        &.play{
          animation: rotate 20s linear infinite;
        }
        &.pause{
          animation-play-state: paused;
        }
      }
    }
  }
  .range{
    text-align: center;
    height: 0.3125rem;
    .bar{
      width: 6.5625rem;
      margin:0 auto;
      position: relative;
      font-size: 0.28125rem;
      color:#fff;
      .timeLeft{
        position: absolute;
        left:-0.859375rem;
        top:-0.109375rem;
      }
      .timeRight{
        position: absolute;
        right:-0.9375rem;
        top:-0.109375rem;
      }
    }

  }
  .buttons{
    display: flex;
    margin-top: 0.515625rem;
    justify-content: space-around;
    li{
      height: 66px;
      line-height: 66px;
      font-size: 30px;
      span{
        display: inline-block;
        width: 100%;
        height: 100%;
        font-size: 30px;
        color: #fff;
      }
    }
  }
}

@keyframes rotate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}

div.lyrics{
  width: 100%;
  height: 10.40625rem;
  position: relative;
  overflow: hidden;
  ul{
    position: absolute;
    width: 100%;
    min-height: 15.625rem;
    top:4.6875rem;
    left:0px;
    li{
      width: 100%;
      color:#4F4B49;
      text-align: center;
      height: 0.78125rem;
      line-height: 0.78125rem;
      font-size:0.28125rem;
      &.con{
        color:#fff;
        font-size:0.34375rem;
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
  border:0.125rem solid #fff;
}
</style>