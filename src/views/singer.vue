<template>
  <div>
    <div class="singer">
      <com-scroll :right="artistsList" :left="rightList"></com-scroll>
    </div>
  </div>
</template>
<script>
import comScroll from "../components/BScroll";
import {getArtistLists, getTopArtistLists} from "../api/singer";

export default {
  data() {
    return {
      rightList: ["热", "A", "B", "C", "D", "E", "F", "G"],
      artistsList: [],
    }
  },
  methods: {
    getTopArtistListsFun() {
      getTopArtistLists({limit: 10}).then(data => {
        // console.log(data);
        this.artistsList.unshift({
          name: "热",
          data: data.artists
        })
      })
    },
    getArtistListsFun() {
      for (let key in this.artistsList) {
        getArtistLists({type: 1, area: 96, initial: this.artistsList[key].name, limit: 10}).then(data => {
          this.$set(this.artistsList[key], "data", data.artists);
        })
      }

    },
    // 初始化对象
    artistsListFun() {
      for (let i = 1; i < this.rightList.length; i++) {
        this.artistsList.push({
          name: this.rightList[i]
        })
      }
    },
  },

  created() {
    this.artistsListFun(); //数据列表结构
    this.getArtistListsFun();
    this.getTopArtistListsFun();
  },
  components: {
    comScroll
  }
}
</script>

<style lang="less" scoped>
.singer {
  position: absolute;
  left: 0;
  right: 0;
  top: 80px;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  background-color: chocolate;
}
</style>