<template>
  <div>
    <div class="loadingvan" v-show="loading">
      <van-loading type="spinner" color="#D4473C" size="50px"/>
    </div>
    <!-- 小米联动效果 -->
    <!-- 安装模块 $cnpm install @better-scroll/core -S -->
    <!-- 按需求加载 -->
    <div class="content">
      <div class="left" ref="left">
        <ul>
          <li :class="{'current':currentIndex == index}" v-for="(item,index) in left" :key="index"
              @click="selectItem(index,$event)">
                        <span class="left-item">
                            {{ item }}
                        </span>
          </li>

        </ul>
      </div>
      <div class="right" ref="right">
        <ul>
          <li>
            <dl v-for="(item,index) in right" :key="index" class="right_item">
              <dt>{{ item.name }}</dt>
              <dd v-for="(data,i) in item.data" :key="i"
                  @click="$router.push({path:'/singer/singerList',query:{id:data.id}})">
                <div class="img">
                  <img :src="data.picUrl" alt="">
                </div>
                <p>{{ data.name }}</p>
              </dd>
            </dl>
          </li>

        </ul>
      </div>
      <ul class="rightList">
        <li v-for="(item,index) in left" :key="index" :class="{'con':currentIndex == index}"
            @mouseout="selectItem(index)">{{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

import BScroll from '@better-scroll/core';

export default {
  data() {
    return {
      msg: '欢迎学习vue.js',
      scrollY: "",
      listsHeight: [],
      lefts: null,
      rights: null,
      loading: true,
    }
  },
  // props:["left","right"],
  props: {
    "left": {
      default: function () {
        return ["默认数据", "电视", "电脑", "大家电", "电脑办公", "小米手机", "电视", "电脑", "大家电", "电脑办公"];
      }
    },
    "right": {
      default: function () {
        return [
          {
            name: "小米手机",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "电视",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "电脑",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "大家电",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "电脑办公",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "小米手机",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "电视",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "电脑",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "大家电",
            content: [1, 2, 3, 4, 5, 6]
          },
          {
            name: "电脑办公",
            content: [1, 2, 3, 4, 5, 6]
          },
        ];
      }
    }
  },
  methods: {
    _initScroll() {
      // 左侧滚动效果初始化 只执行一次
      this.lefts = null;
      this.rights = null;
      this.lefts = new BScroll(this.$refs.left, {
        click: true, //点击触发
        probeType: 3, // 深针的效果，时时获取滚动高度
      })

      // 右侧滚动效果初始化
      this.rights = new BScroll(this.$refs.right, {
        click: true, //点击触发
        probeType: 3, // 深针的效果，时时获取滚动高度
      })

      this.rights.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y)); //当前滚动条高度
      })

    },
    _getHeight() {
      this.listsHeight = [];
      let rightItems = this.$refs.right.getElementsByClassName("right_item");
      let height = 0;
      this.listsHeight.push(height);
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i];
        height += item.clientHeight;
        this.listsHeight.push(height);//添加每个li高度
      }
    },
    // 左侧触发事件
    selectItem(index) {
      // 获取右侧所有li对象
      let rightItems = this.$refs.right.getElementsByClassName("right_item");
      let el = rightItems[index]; //与左侧对象右侧位置对象
      // 插件内置方法 scrollToElement(DOM,过度时间)
      this.rights.scrollToElement(el, 300);


    },
  },
  created() {
    // console.log("ajax获取data数据");
  },
  // 生命周期钩子
  mounted() {
    // $nextTick()保证生命周期与视图数据执行完成后，再调用第三方js库
    this.$nextTick(() => {
      setTimeout(() => {
        this.loading = false;
        this._initScroll()
        this._getHeight();
      }, 3000)
    })
  },
  // 计算属性
  computed: {
    // 计算当前位置
    currentIndex() {
      for (let i = 0; i < this.listsHeight.length; i++) {
        let heigth = this.listsHeight[i];
        let heigth2 = this.listsHeight[i + 1];

        if (!heigth2 || (this.scrollY >= heigth && this.scrollY < heigth2)) {
          // 控制左侧li位置
          let leftItems = this.$refs.left.getElementsByTagName("li");
          this.lefts.scrollToElement(leftItems[i], 200);
          // console.log(i);
          return i;
        }
      }

      return 0;
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0px;
  padding: 0px;
}

ul {
  list-style: none;
}

.content {
  background-color: #F2F2F2;
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  overflow: hidden;
  display: flex;

  .rightList {
    position: absolute;
    right: 10px;
    top: 30px;
    font-size: 18px;
    color: #636365;
    text-align: center;
    z-index: 999;

    li {
      margin-bottom: 3px;

      &.con {
        color: red;
      }
    }
  }
}

.content .left {
  overflow: hidden;
  flex: 0 0 0px;
  background-color: #C8EBFA;
  /* overflow-y: scroll; */
}

.content .left li {
  width: 100%;
  height: 100px;
}

.content .left li.current .left-item {
  font-size: 16px;
  color: #005174;
  font-weight: bold;
}

.content .left li .left-item {
  display: block;
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 14px;
  text-align: center;
}

.content .right {
  flex: 1;
  position: relative;
  z-index: 1;

  dl {
    padding: 10px 10px 0 10px;
    background-color: #F2F3F4;

    dt {
      height: 32px;
      line-height: 32px;
      background-color: #DADBDC;
      color: #fff;
      text-indent: 15px;
      font-size: 18px;
    }

    dd {
      border-bottom: 1px solid #E1E2E3;
      padding: 4px 0px;
      display: flex;

      .img {
        flex: 0 0 78px;
        height: 78px;

        img {
          width: 100%;
        }
      }

      p {
        height: 78px;
        line-height: 78px;
        font-size: 24px;
        color: #2E2E35;
        text-indent: 2em;
      }
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
    margin-top: 4.0625rem;
  }
}
</style>