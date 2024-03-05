<template>
  <div class="indicator" id="side-bar-nav-indicator"></div>
</template>
<script lang="ts">
export default {
  props: ["msg"],
  data() {
    return {
      pages: this.msg,
      fromOrder: 0,
      toOrder: 0,
    };
  },
  methods: {
    indicatorInit() {
      //初始化为当前url的导航
      let order = 0;
      for (let i in this.pages) {
        if (this.$route.path.match(this.pages[i].path) != null) {
          // 如果当前页面的url包含导航列表的url
          if (this.$route.path == "/") {
            // 如果当前页面的url是'/'主页
            order = 0;
          } else {
            // 如果当前页面的url不是'/'主页
            order = Number(i);
          }
        }
      }

      const indicatorWrap = document.getElementById("indicator-layer");
      const indicator = document.getElementById("side-bar-nav-indicator");
      if (indicator) {
        // 盒子高度
        const boxHeight: number = indicatorWrap?.clientHeight as number;
        // 平均高度
        const averageHeight = boxHeight / this.pages.length;
        //bottom变化，通过倒数order确定
        const bottom = (this.pages.length - 1 - order) * averageHeight;
        //top变化，通过正数order确定
        const top = order * averageHeight;
        // 边距
        const padding = averageHeight * 0.1;

        indicator.style.bottom = `${bottom + padding}px`;
        indicator.style.top = `${top + padding}px`;
      }
    },
  },
  mounted() {
    const indicator = document.getElementById("side-bar-nav-indicator");
    if (indicator) {
      indicator.style.display = "block";
      this.indicatorInit();
    }
    const th = this;
    // 监听浏览器窗口变化
    window.addEventListener("resize", function () {
      th.indicatorInit();
    });
  },
  //监听路由的路径，移动指示器位置
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      for (let i in this.pages) {
        if (from.path.match(this.pages[i].path) != null) {
          // 如果离开页面的url包含导航列表的url
          if (from.path == "/") {
            // 如果离开页面的url是'/'主页
            this.fromOrder = 0;
          } else {
            // 如果离开页面的url不是'/'主页
            this.fromOrder = Number(i);
          }
        }
        if (to.path.match(this.pages[i].path) != null) {
          // 如果进入页面的url包含导航列表的url
          if (to.path == "/") {
            // 如果进入页面的url是'/'主页
            this.toOrder = 0;
          } else {
            // 如果进入页面的url不是'/'主页
            this.toOrder = Number(i);
          }
        }
      }

      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      let direction = "unset";
      if (this.toOrder > this.fromOrder) {
        direction = "next";
      } else {
        direction = "prev";
      }

      const indicatorWrap = document.getElementById("indicator-layer");
      const indicator = document.getElementById("side-bar-nav-indicator");
      if (indicator) {
        if (direction == "next") {
          //向下导航，bottom先走，top后走
          indicator.style.transition = `bottom 200ms , top 400ms`;
        } else {
          //向上导航，top先走，bottom后走
          indicator.style.transition = `top 200ms , bottom 400ms`;
        }

        // 盒子高度
        const boxHeight: number = indicatorWrap?.clientHeight as number;
        // 平均高度
        const averageHeight = boxHeight / this.pages.length;
        //bottom变化，通过倒数order确定
        const bottom = (this.pages.length - 1 - this.toOrder) * averageHeight;
        //top变化，通过正数order确定
        const top = this.toOrder * averageHeight;
        // 边距
        const padding = averageHeight * 0.1;

        indicator.style.bottom = `${bottom + padding}px`;
        indicator.style.top = `${top + padding}px`;
      }
    },
  },
};
</script>
<style lang="scss">
@keyframes Init {
  0% {
    transform: scaleY(0%);
  }
  100% {
    transform: scaleY(100%);
  }
}
.indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.3rem;
  width: 0.3rem;
  background: var(--theme-color);
  z-index: 2;
  border-radius: 100px;
  display: none;
  animation: Init 200ms forwards;
}
</style>
