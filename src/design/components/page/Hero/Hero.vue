<template>
  <section class="relative pb-10 pt-20 md:pt-32 md:h-[88vh]" w-centered mx-auto>
    <div class="container h-full z-1">
      <div class="grid h-full items-center justify-items-center gap-4 grid-cols-6 md:grid-cols-12">
        <div class=" flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 col-span-6 md:col-span-6">
          <h1 class="mb-6 text-center font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl text-jacarta-700 dark:text-white md:text-left">
            {{ $t("welcome") }}
          </h1>
          <p class="mb-8 text-center text-xs xs:text-base sm:text-lg md:text-xl dark:text-jacarta-200 md:text-left">
            {{ $t("maintenanceLine1") }}<br/>{{ $t("maintenanceLine2") }}
          </p>
          <div class="flex space-x-4">
            <a href="create.html" class="w-36 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
              Upload
            </a>
            <a href="collections.html" class="w-36 rounded-full bg-white py-3 px-8 text-center font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume">
              Explore
            </a>
          </div>
        </div>

        <!-- Hero image -->
        <div class="col-span-6 md:col-span-6">
          <div class="relative text-center p-10">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="mt-8 inline-block w-72 rotate-[8deg] w-full">
              <defs>
                <clipPath id="clipping" clipPathUnits="userSpaceOnUse">
                  <path d="
                    M 0, 100
                    C 0, 17.000000000000004 17.000000000000004, 0 100, 0
                    S 200, 17.000000000000004 200, 100
                        183, 200 100, 200
                        0, 183 0, 100
                " fill="#9446ED"></path>
                </clipPath>
              </defs>
              <g clip-path="url(#clipping)">
                <!-- Bg image -->
                <image href="@/src/assets/image/hero/hero.jpg" width="200" height="200" clip-path="url(#clipping)"></image>
              </g>
            </svg>
            <img src="@/src/assets/image/hero/3D_elements.png" alt="" class="absolute top-1/8 left-0 animate-fly w-full">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@keyframes fly {
  0%,to {
    transform: translateY(5%)
  }

  50% {
    transform: translateY(0)
  }
}
.animate-fly {
  animation: fly 6s cubic-bezier(.75,.02,.31,.87) infinite;
}
</style>