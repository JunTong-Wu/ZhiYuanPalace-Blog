<template>
  <div>
    <div class="mb-2 sm:mb-6 flex animate-marquee-right space-x-2 sm:space-x-6">
      <div class="flex space-x-2 sm:space-x-6" v-for="n in 3">
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_1.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_2.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_3.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_4.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_5.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_6.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_7.png" alt="">
        </div>
      </div>
    </div>
    <div class="flex animate-marquee space-x-2 sm:space-x-6">
      <div class="flex space-x-2 sm:space-x-6" v-for="n in 3">
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_8.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_9.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_10.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_11.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_12.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_13.png" alt="">
        </div>
        <div
          class="flex flex-shrink-0 items-center justify-center rounded-xs sm:rounded border border-borderColor bg-level-2 p-0 sm:p-2 h-16 w-28 sm:h-32 sm:w-56">
          <img class="rounded-xs h-full w-full" src="@/assets/image/dao/partner_dao_14.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@media screen and (max-width: 899.99px) {
  .animate-marquee-right {
    animation: marquee-right-small 12s linear infinite;
  }

  .animate-marquee {
    animation: marquee-small 12s linear infinite;
  }
}

@media screen and (min-width: 900px) {
  .animate-marquee-right {
    animation: marquee-right-large 12s linear infinite;
  }

  .animate-marquee {
    animation: marquee-large 12s linear infinite;
  }
}

@keyframes marquee-right-small {
  0% {
    transform: translateX(calc((7rem + 0.5rem) * 7));
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes marquee-small {
  0% {
    transform: translateX(calc((7rem + 0.5rem) * 7 * -1));
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes marquee-right-large {
  0% {
    transform: translateX(calc((14rem + 1.5rem) * 7));
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes marquee-large {
  0% {
    transform: translateX(calc((14rem + 1.5rem) * 7 * -1));
  }

  100% {
    transform: translateX(0);
  }
}
</style>