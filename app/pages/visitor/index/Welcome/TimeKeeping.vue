<template>
  <div class="bg-level-1 rounded relative overflow-hidden aspect-square">
    <img
      alt=""
      src="@/assets/image/bg-dt.webp"
      class="absolute inset-0 h-full object-cover"
    />
    <div
      class="relative p-4 z-1 h-full text-white flex flex-col justify-between bg-[rgba(0,0,0,0.2)]"
    >
      <h4 class="text-lg drop-shadow-[0_0_4px_black]">和可可在一起</h4>
      <span
        id="time"
        class="drop-shadow-[0_0_4px_black]"
      ></span>
    </div>
  </div>
</template>
<script setup lang="ts">
  // Pinia仓库
  const config = useRuntimeConfig();
  const cdnUrl = config.public.CDN_URL;

  /*天数计时*/
  const showTime = () => {
    // 设置时区（ UTC+timeZone ）
    const timeZone = 8;

    const today = new Date(); //现在时间对象
    const nowTimeUTC = today.getTime(); //现在UTC时间戳
    const nowTime = nowTimeUTC + timeZone * 60 * 60 * 1000; //  现在指定时区时间戳

    const myTimeUTC = new Date("2020/02/24 00:00:00").getTime();
    const myTime = myTimeUTC + timeZone * 60 * 60 * 1000; //  当年指定时区时间戳

    const time = nowTime - myTime;

    const multiple = 24 * 60 * 60 * 1000; //将时间戳转换为天数的倍数

    const e_days = time / multiple; //天数
    const days = Math.floor(e_days); //天数（取整）

    const e_hour = (e_days - days) * 24; //小时数
    const hour = Math.floor(e_hour); //小时数（取整）

    const e_minute = (e_hour - hour) * 60; //分钟数
    const minute = Math.floor(e_minute); //分钟数（取整）

    const e_second = (e_minute - minute) * 60; //秒数
    const second = Math.floor(e_second); //秒数（取整）

    const e_millisecond = (e_second - second) * 1000; //毫秒数
    const millisecond = Math.floor(e_millisecond); //毫秒数（取整）

    const obj = document.getElementById("time"); //页面插入节点

    if (obj) {
      obj.innerHTML = `<span>${days}</span>天<br>
  <span>${hour}</span>时<span>${minute}</span>分<br>
  <span>${second}</span>秒<span>${millisecond}</span>毫秒`;
    }
  };

  let timeInterval: NodeJS.Timeout; // 定义一个变量来存储定时器的返回值

  onMounted(() => {
    timeInterval = setInterval(showTime, 20); // 将定时器的返回值存储在 timeInterval 变量中
  });
  onBeforeUnmount(() => {
    clearInterval(timeInterval); // 在组件卸载前清除定时器
  });
</script>
