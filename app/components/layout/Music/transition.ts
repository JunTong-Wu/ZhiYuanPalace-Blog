export function musicBarHide() {
  const musicBar = document.querySelector("#zy-music-bar");
  if (musicBar) {
    musicBar.classList.remove("transition-translate-in");
    musicBar.classList.add("transition-translate-out");
  }
}
export function musicBarShow() {
  const musicBar = document.querySelector("#zy-music-bar");
  if (musicBar) {
    musicBar.classList.remove("transition-translate-out");
    musicBar.classList.add("transition-translate-in");
  }
}

let animationEndPlaying = false;
const ANIMATION_DURATION = 400; // 动画时长

export function musicCardTransitionStart(
  element: any,
  drawer: any,
  callback: () => void
) {
  console.log("动画：展开音乐抽屉");
  // 窗口大小
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  // 获取元素的位置
  const elementRect = element.getBoundingClientRect();

  drawer.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
  drawer.style.display = "block";
  drawer.style.top = elementRect.top + "px";
  drawer.style.left = elementRect.left + "px";
  drawer.style.right = elementRect.right + "px";
  drawer.style.bottom = elementRect.bottom + "px";
  drawer.style.width = elementRect.width + "px";
  drawer.style.height = elementRect.height + "px";
  drawer.style.zIndex = "2000";

  setTimeout(() => {
    element.classList.remove("transition-close");
    drawer.classList.remove("transition-close");
    element.classList.add("transition-open");
    drawer.classList.add("transition-open");
    setTimeout(() => {
      drawer.style.top = 0 + "px";
      drawer.style.left = 0 + "px";
      drawer.style.right = 0 + "px";
      drawer.style.bottom = 0 + "px";
      drawer.style.width = windowWidth + "px";
      drawer.style.height = windowHeight + "px";
      setTimeout(() => {
        if (animationEndPlaying) {
          return;
        }
        drawer.style.width = "100%";
        drawer.style.height = "100%";
        callback();
      }, ANIMATION_DURATION);
    });
  }, 20);
}

export function musicCardTransitionSlidingUp(
  element: any,
  drawer: any,
  distance: number
) {
  // 窗口大小
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  drawer.style.transition = `none`;

  // 获取元素的位置
  const elementRect = element.getBoundingClientRect();
  const drawerRect = drawer.getBoundingClientRect();
  // 差值
  const diffWidth = drawerRect.width - elementRect.width;
  const diffHeight = drawerRect.height - elementRect.height;
  const diffTop = Math.abs(drawerRect.top - elementRect.top);
  const diffLeft = Math.abs(drawerRect.left - elementRect.left);

  drawer.style.top =
    drawerRect.top + (distance / windowHeight) * diffTop * 0.2 + "px";
  drawer.style.left =
    drawerRect.left + (distance / windowWidth) * diffLeft * 0.2 + "px";
  drawer.style.width =
    drawerRect.width - (distance / windowWidth) * diffWidth * 0.2 + "px";
  drawer.style.height =
    drawerRect.height - (distance / windowHeight) * diffHeight * 0.2 + "px";
}

export function musicCardTransitionSlideEndUp(
  element: any,
  drawer: any,
  callback: () => void
) {
  console.log("动画：收起音乐抽屉");
  animationEndPlaying = true;

  drawer.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;

  // 获取元素的位置
  const elementRect = element.getBoundingClientRect();
  drawer.style.top = elementRect.top + "px";
  drawer.style.left = elementRect.left + "px";
  drawer.style.right = elementRect.right + "px";
  drawer.style.bottom = elementRect.bottom + "px";
  drawer.style.width = elementRect.width + "px";
  drawer.style.height = elementRect.height + "px";

  drawer.classList.remove("transition-open");
  drawer.classList.add("transition-close");
  setTimeout(() => {
    element.classList.remove("transition-open");
    element.classList.add("transition-close");
    drawer.style.display = "none";
    element.style.opacity = 1;
    animationEndPlaying = false;
    callback();
  }, ANIMATION_DURATION);
}
export function musicCardTransitionSlideCancelUp(element: any, drawer: any) {
  // 窗口大小
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  drawer.style.transition = `all ${ANIMATION_DURATION}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
  drawer.style.top = 0 + "px";
  drawer.style.left = 0 + "px";
  drawer.style.right = 0 + "px";
  drawer.style.bottom = 0 + "px";
  drawer.style.width = windowWidth + "px";
  drawer.style.height = windowHeight + "px";
  setTimeout(() => {
    drawer.style.width = "100%";
    drawer.style.height = "100%";
  }, ANIMATION_DURATION / 2);
}
