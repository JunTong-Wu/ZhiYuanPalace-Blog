<template>
  <a
    class="zy-store-style-card"
    bg="bg-3"
    rounded-2xl
    w-full
    h-full
    inline-block
    overflow-hidden
    cursor-pointer
    color-text-1
    @click.prevent="openCard($el)"
  >
    <div class="zy-store-style-card-inner">
      <div class="zy-card-image">
        <slot name="image" />
        <div class="zy-card-title">
          <p>
            <slot name="title" />
          </p>
        </div>
      </div>
    </div>
  </a>
</template>
<script setup lang="ts">
const router = useRouter();
const openCard = (element: any) => {
  const mainViewElement = document.querySelector(".main-view");
  let mainViewTop = 0;
  let mainViewLeft = 0;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  if (mainViewElement) {
    const view = mainViewElement.getBoundingClientRect();
    mainViewTop = view.top;
    mainViewLeft = view.left;
  }
  if (element) {
    // 获取元素的位置
    const rect = element.getBoundingClientRect();
    // 输出元素的位置信息
    // console.log("Top position:", rect.top);
    // console.log("Right position:", rect.right);
    // console.log("Bottom position:", rect.bottom);
    // console.log("Left position:", rect.left);
    // console.log("Width:", rect.width);
    // console.log("Height:", rect.height);
    // 改变卡片定位
    element.style.position = "fixed";
    element.style.top = rect.top + "px";
    element.style.left = rect.left + "px";
    element.style.width = rect.width + "px";
    element.style.height = rect.height + "px";
    element.style.zIndex = "20";

    setTimeout(() => {
      element.classList.add("transition");
      setTimeout(() => {
        element.style.top = 0 + "px";
        element.style.left = mainViewLeft + "px";
        element.style.width = windowWidth - mainViewLeft + "px";
        element.style.height = windowHeight + "px";
        element.style.borderRadius = "0";
        // element.classList.remove("transition");
        setTimeout(() => {
          let href = element.href;
          let url = new URL(href);
          let path = url.pathname;
          router.replace(path);
        }, 400);
      });
    });
  }
};
onMounted(() => {});
</script>
<style lang="scss">
.zy-store-style-card {
  .zy-store-style-card-inner {
    width: 100%;
    height: 100%;
    .zy-card-image {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .zy-card-title {
        position: absolute;
        z-index: 1;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0.5rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
        * {
          margin: 0;
          text-shadow: 0 0 0.5rem black;
        }
      }
    }
  }
}
.zy-store-style-card.transition {
  /* transform: scale(1.1); */
  transition: all 400ms;
  .zy-card-image {
    width: 100%;
    height: 18rem;
    img {
      height: 18rem;
    }
    .zy-card-title {
      transition: all 400ms;
      padding: 1rem;
      font-size: 1.5rem;
      background-color: transparent;
      * {
        margin: 0;
      }
    }
  }
  /* box-shadow: 0 0 150px rgb(0 0 0 / 0.15) !important; */
}
</style>
