<template>
  <div id="zy-slide-router">
    <ZyTouch
      w-full
      overflow-hidden
      @slidingLeft="renderRightView"
      @slidingRight="renderLeftView"
      @slideEndLeft="goView('end')"
      @slideEndRight="goView('end')"
      @slideCancelLeft="goView('cancel')"
      @slideCancelRight="goView('cancel')"
    >
      <div
        flex
        relative
        id="zy-slide-router__root"
        w="[300%]"
        will-change-transform
      >
        <div :key="transitionKey" id="zy-slide-router__now">
          <slot />
        </div>
      </div>
    </ZyTouch>
  </div>
</template>
<script lang="ts">
export default defineComponent({
  name: "zy-slide-router-view",
  props: {
    pathList: {
      type: Array<string>,
      default: <Array<string>>[],
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const transitionKey = ref<number>(0); // 刷新节点的Key
    const holdPress = ref<boolean>(false); // 是否正在按住标记
    const directionDetermination = ref<"left" | "right" | null>(null); // 确定滑动方向标记
    const isEmptyView = ref<"left" | "right" | null>(null); // 到达两端空页面标记
    const isSlideControl = ref<boolean>(false); // 通过滑动控制的标志

    /*
     * 过渡效果实现
     */
    // 过渡效果方法，传入横向变换距离，和是否开启CSS过渡效果
    const translateX = (translateX: string, transition: boolean) => {
      const root = document.getElementById("zy-slide-router__root");
      if (root) {
        if (transition) {
          // 通常，正在滑动时不开启CSS过渡，释放滑动时开启CSS过渡
          root.style.transition = `transform 200ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
          setTimeout(() => {
            root.style.transition = `none`;
          }, 200);
        }
        root.style.transform = `translateX(${translateX})`;
      }
    };

    /*
     * 调用路由
     */
    // 是否传入PathList
    const hasPathList = () => {
      if (props.pathList.length) {
        return true;
      } else {
        return false;
      }
    };
    // 根据与当前路由的相对位置，获取要前往的路由的Path，如果该相对位置不存在路由，则返回null
    const getPath = (relativePosition: number) => {
      let nowPathIndex = 0;
      let path = null;
      if (hasPathList()) {
        // 如果传入了PathList，则使用PathList的索引
        nowPathIndex = props.pathList.findIndex((item) => {
          return item == route.path;
        });
        path = props.pathList[nowPathIndex + relativePosition];
        if (path) {
          return { path: path };
        } else {
          return null;
        }
      } else {
        // 如果没有传入PathList，则使用getRoutes()的索引
        nowPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == route.path;
        });
        path = router.getRoutes()[nowPathIndex + relativePosition];
        if (path) {
          return path;
        } else {
          return null;
        }
      }
    };
    // 通过切换路由，渲染左侧的路由的页面
    const getLeftView = () => {
      // 先判断该相对位置是否存在路由
      const toPath = getPath(-1);
      if (toPath) {
        // 存在路由，调用切换路由方法
        isEmptyView.value = null;
        router.replace(toPath);
      } else {
        // 不存在路由，渲染左侧空页面，标记到达左侧端点状态
        isEmptyView.value = "left";
        copyEmptyPage("left");
      }
    };
    // 通过切换路由，渲染右侧的路由的页面
    const getRightView = () => {
      // 先判断该相对位置是否存在路由
      const toPath = getPath(1);
      if (toPath) {
        // 存在路由，调用切换路由方法
        isEmptyView.value = null;
        router.replace(toPath);
      } else {
        // 不存在路由，渲染右侧空页面，标记到达右侧端点状态
        isEmptyView.value = "right";
        copyEmptyPage("right");
      }
    };

    /*
     * 上一个路由页面暂留方法
     */
    // 插入一个空页面，传入插入的空页面位置，当滑动到端点时，渲染超出的空白区域
    const copyEmptyPage = (position: "left" | "right", callback?: any) => {
      const root = document.getElementById("zy-slide-router__root");
      const lastOld = document.getElementById("zy-slide-router__old");
      // 删除上一次拷贝的页面，根节点内始终只保持当前和旧的两个页面节点
      if (root && lastOld) {
        root.removeChild(lastOld);
      }
      const old = document.createElement("div");
      old.id = "zy-slide-router__old";
      old.innerHTML = "<div></div>";
      const temp = document.getElementById("zy-slide-router__now");
      if (temp && root) {
        if (position == "left") {
          // 旧页面在左边，将创建的空节点插入到当前页面节点的左侧位置
          old.classList.add("left");
          root.insertBefore(old, temp);
        } else if (position == "right") {
          // 旧页面在右边，将创建的空节点插入到当前页面节点的右侧位置
          old.classList.add("right");
          root.appendChild(old);
        }
      }
      if (callback) {
        callback();
      }
    };
    // 拷贝上一个页面，传入插入的旧页面位置，达到旧路由页面暂留的效果
    const copyOldPage = (position: "left" | "right", callback?: any) => {
      const root = document.getElementById("zy-slide-router__root");
      const lastOld = document.getElementById("zy-slide-router__old");
      // 删除上一次拷贝的页面，根节点内始终只保持当前和旧的两个页面节点
      if (root && lastOld) {
        root.removeChild(lastOld);
      }
      const old = document.createElement("div");
      old.id = "zy-slide-router__old";
      const temp = document.getElementById("zy-slide-router__now");
      if (temp && root) {
        // 拷贝旧的路由页面到创建的节点内
        let oldPage = document.createElement("div");
        oldPage.appendChild(temp.getElementsByTagName("div")[0]);
        old.innerHTML = "";
        old.appendChild(oldPage);
        if (position == "left") {
          // 旧页面在左边，将拷贝好的节点插入到当前页面节点的左侧位置
          old.classList.add("left");
          root.insertBefore(old, temp);
        } else if (position == "right") {
          // 旧页面在右边，将拷贝好的节点插入到当前页面节点的右侧位置
          old.classList.add("right");
          root.appendChild(old);
        }
      }
      if (callback) {
        callback;
      }
    };
    // 通过链接切换路由时，初始化的样式，初始化样式到相反的位置，以达到动画效果
    const initStyleFromLink = (position: "left" | "right", callback?: any) => {
      if (position == "left") {
        // 旧页面在左边，将拷贝好的节点插入到当前页面节点的左侧位置，样式也显示左边的页面，达到初始显示旧的页面
        copyOldPage("left", callback);
        translateX(`calc(0%)`, false);
      } else if (position == "right") {
        // 旧页面在右边，将拷贝好的节点插入到当前页面节点的右侧位置，样式也显示右边的页面，达到初始显示旧的页面
        copyOldPage("right", callback);
        translateX(`calc(-33.333333%)`, false);
      }
    };
    // 这是操作完成后的结束动作，清理DOM树，重置部分状态
    const clearOldPage = () => {
      // 开启点击穿透效果，不响应操作，防止动画被打断
      const template = document.getElementById("zy-slide-router");
      if (template) {
        template.style.pointerEvents = "none";
      }
      // 配合过渡动画，延迟200毫秒
      setTimeout(() => {
        const root = document.getElementById("zy-slide-router__root");
        const lastOld = document.getElementById("zy-slide-router__old");
        // 删除上一次拷贝的页面
        if (root && lastOld) {
          root.removeChild(lastOld);
        }
        translateX(`calc(0%)`, false);
        // 结束动作完成，关闭点击穿透效果，可以执行下一次操作
        if (template) {
          template.removeAttribute("style");
        }
        // 删除样式残留
        if (root) {
          root.removeAttribute("style");
        }
        // 重置通过滑动控制的标志
        isSlideControl.value = false;
      }, 200);
    };
    watch(holdPress, (newValue) => {
      // 监听释放滑动的标记，执行结束动作
      if (!newValue) {
        clearOldPage();
      }
    });

    /*
     * 交互接收
     */
    // 渲染左侧页面
    const renderLeftView = (val: any) => {
      isSlideControl.value = true;
      if (!holdPress.value) {
        // 防止同时执行左右两侧滑动过渡动画，标记初始滑动方向
        directionDetermination.value = "right";
        getLeftView();
        // 防止过度切换路由，每次释放滑动前，只调用一次切换路由的方法
        holdPress.value = true;
      }
      if (directionDetermination.value == "right") {
        if (!isEmptyView.value) {
          // 如果未达到端点，正常执行滑向右侧的动画
          translateX(`calc(-33.333333% - ${val.moveDistanceX}px)`, false);
        } else {
          // 如果已经到端点，减弱执行滑向右侧的动画
          translateX(`calc(-33.333333% - ${val.moveDistanceX / 4}px)`, false);
        }
      } else {
        // 执行滑向左侧的动画
        translateX(`calc(0% - ${val.moveDistanceX}px)`, false);
      }
    };
    // 渲染右侧页面
    const renderRightView = (val: any) => {
      isSlideControl.value = true;
      if (!holdPress.value) {
        // 防止同时执行左右两侧滑动过渡动画，标记初始滑动方向
        directionDetermination.value = "left";
        getRightView();
        // 防止过度切换路由，每次释放滑动前，只调用一次切换路由的方法
        holdPress.value = true;
      }
      if (directionDetermination.value == "left") {
        if (!isEmptyView.value) {
          // 如果未达到端点，正常执行滑向左侧的动画
          translateX(`calc(0% - ${val.moveDistanceX}px)`, false);
        } else {
          // 如果已经到端点，减弱执行滑向左侧的动画
          translateX(`calc(0% - ${val.moveDistanceX / 4}px)`, false);
        }
      } else {
        // 执行滑向右侧的动画
        translateX(`calc(-33.333333% - ${val.moveDistanceX}px)`, false);
      }
    };
    // 释放滑动后的相关处理，传入状态分别为滑动结束或滑动取消
    const goView = (control: "end" | "cancel") => {
      if (control == "end") {
        // 如果滑动结束
        if (directionDetermination.value == "left") {
          // 改变释放滑动标记
          holdPress.value = false;
          // 如果初始滑动方向为向左，则代表切换至右侧页面
          if (!isEmptyView.value) {
            // 正常结束时应该改变过渡动画位置，使其显示右侧节点
            translateX(`calc(-33.333333%)`, true);
          } else {
            // 如果被标记为到达端点，则代表到达右侧端点，结束时应该改变过渡动画位置，使其显示左侧节点，而非右侧的空白节点，达到回弹效果
            translateX(`calc(0%)`, true);
          }
        } else if (directionDetermination.value == "right") {
          // 改变释放滑动标记
          holdPress.value = false;
          // 如果初始滑动方向为向右，则代表切换至左侧页面
          if (!isEmptyView.value) {
            // 正常结束时应该改变过渡动画位置，使其显示左侧节点
            translateX(`calc(0%)`, true);
          } else {
            // 如果被标记为到达端点，则代表到达左侧端点，结束时应该改变过渡动画位置，使其显示右侧节点，而非左侧的空白节点，达到回弹效果
            translateX(`calc(-33.333333%)`, true);
          }
        }
      } else if (control == "cancel") {
        // 如果滑动取消
        if (directionDetermination.value == "left") {
          // 改变释放滑动标记
          holdPress.value = false;
          // 如果初始滑动方向为向左，则代表先试图切换至右侧页面，然后取消了滑动
          if (!isEmptyView.value) {
            // 取消时应该调用路由方法跳转页面，使其回到左侧页面，达到中断路由切换的效果
            getLeftView();
          } else {
            // 如果被标记为到达端点，则代表到达右侧端点，取消时不再调用路由方法跳转页面，而是直接改变过渡动画位置，使其显示左侧节点，而非右侧的空白节点，达到回弹效果
            translateX(`calc(0%)`, true);
          }
        } else if (directionDetermination.value == "right") {
          // 改变释放滑动标记
          holdPress.value = false;
          // 如果初始滑动方向为向右，则代表先试图切换至左侧页面，然后取消了滑动
          if (!isEmptyView.value) {
            // 取消时应该调用路由方法跳转页面，使其回到右侧页面，达到中断路由切换的效果
            getRightView();
          } else {
            // 如果被标记为到达端点，则代表到达左侧端点，取消时不再调用路由方法跳转页面，而是直接改变过渡动画位置，使其显示右侧节点，而非左侧的空白节点，达到回弹效果
            translateX(`calc(-33.333333%)`, true);
          }
        }
      }
      // 释放滑动后应该清除初始滑动方向标记，避免影响下一次的滑动方向的判断
      directionDetermination.value = null;
    };

    /*
     * 全局导航守卫
     */
    // 前置守卫
    router.beforeEach((to, from, next) => {
      // 通过更改当前页面节点的Key，使Vue刷新节点，达到渲染目的
      transitionKey.value = new Date().getTime();
      let toPathIndex = 0;
      let fromPathIndex = 0;
      if (hasPathList()) {
        // 如果传入了PathList，则使用PathList的索引
        toPathIndex = props.pathList.findIndex((item) => {
          return item == to.path;
        });
        fromPathIndex = props.pathList.findIndex((item) => {
          return item == from.path;
        });
      } else {
        // 如果没有传入PathList，则使用getRoutes()的索引
        toPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == to.path;
        });
        fromPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == from.path;
        });
      }
      if (toPathIndex > fromPathIndex) {
        if (isSlideControl.value) {
          // 如果是通过滑动控制的
          // to索引大于from索引，则代表期望在右侧展示新的路由页面，将旧的路由页面拷贝至左侧
          copyOldPage("left", next());
        } else {
          // 如果是通过链接控制的
          initStyleFromLink("left", next());
        }
      } else if (toPathIndex < fromPathIndex) {
        if (isSlideControl.value) {
          // 如果是通过滑动控制的
          // to索引小于from索引，则代表期望在左侧展示新的路由页面，将旧的路由页面拷贝至右侧
          copyOldPage("right", next());
        } else {
          // 如果是通过链接控制的
          initStyleFromLink("right", next());
        }
      }
    });
    // 后置守卫
    router.afterEach((to, from) => {
      let toPathIndex = 0;
      let fromPathIndex = 0;
      if (hasPathList()) {
        // 如果传入了PathList，则使用PathList的索引
        toPathIndex = props.pathList.findIndex((item) => {
          return item == to.path;
        });
        fromPathIndex = props.pathList.findIndex((item) => {
          return item == from.path;
        });
      } else {
        // 如果没有传入PathList，则使用getRoutes()的索引
        toPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == to.path;
        });
        fromPathIndex = router.getRoutes().findIndex((item) => {
          return item.path == from.path;
        });
      }
      if (isSlideControl.value) {
        // 如果是通过滑动控制的
        if (!holdPress.value) {
          if (toPathIndex > fromPathIndex) {
            // to索引大于from索引，则代表期望在右侧展示新的路由页面，路由切换完成后，改变过渡动画位置，使其显示右侧节点
            translateX(`calc(-33.333333%)`, true);
            clearOldPage();
          } else if (toPathIndex < fromPathIndex) {
            // to索引小于from索引，则代表期望在左侧展示新的路由页面，路由切换完成后，改变过渡动画位置，使其显示左侧节点
            translateX(`calc(0%)`, true);
            clearOldPage();
          }
        }
      } else {
        // 如果是通过链接控制的，异步添加结束样式，给初始化通过链接控制的样式留出时间，达到成功过渡
        setTimeout(() => {
          if (toPathIndex > fromPathIndex) {
            // to索引大于from索引，则代表期望在右侧展示新的路由页面，路由切换完成后，改变过渡动画位置，使其显示右侧节点
            translateX(`calc(-33.333333%)`, true);
            clearOldPage();
          } else if (toPathIndex < fromPathIndex) {
            // to索引小于from索引，则代表期望在左侧展示新的路由页面，路由切换完成后，改变过渡动画位置，使其显示左侧节点
            translateX(`calc(0%)`, true);
            clearOldPage();
          }
        });
      }
    });

    return {
      transitionKey,
      renderLeftView,
      renderRightView,
      goView,
    };
  },
});
</script>
<style lang="scss">
#zy-slide-router__root {
  > div {
    width: 33.333333%;
  }
}
</style>
