<template>
  <section relative pb-10 pt-20 md:pt-32 w-centered mx-auto p-6>
    <div h-full z-1>
      <div class="hero-wrapper" grid h-full items-center gap-4>
        <div class="hero-text" flex h-full flex-col justify-center
        items="center md:start"
        p="y-10 md:y-20"
        >
          <h1 mb-6 text-center  text-xl xs:text-2xl sm:text-3xl md:text-4xl md:text-left>
            {{ $t("welcome") }}
          </h1>
          <p mb-8 text-center text-xs xs:text-base sm:text-lg md:text-xl md:text-left>
            {{ $t("maintenanceLine1") }}<br/>{{ $t("maintenanceLine2") }}
          </p>
          <div flex space-x-4>
            <zy-button
                flex
                items-center
                justify-center
                title="全屏/退出全屏"
                type="primary"
            >
              Upload
            </zy-button>
            <zy-button
                flex
                items-center
                justify-center
                title="全屏/退出全屏"
            >
              Explore
            </zy-button>
          </div>
        </div>

        <!-- Hero image -->
        <div class="hero-image">
          <div relative text-center p-10>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" mt-8 inline-block w-72 rotate="8deg" w-full>
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
            <img src="@/src/assets/image/hero/3D_elements.png" alt="" class="animate-fly" absolute top-8 left-0 w-full>
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

@media (orientation: landscape) {
  /* 横屏 */
  .hero-wrapper {
    grid-template-columns:repeat(12, minmax(0, 1fr));
  }
  .hero-text {
    grid-column: span 6/span 6;
  }
  .hero-image {
    grid-column: span 6/span 6;
  }
}
@media (orientation: portrait) {
  /* 竖屏 */
  .hero-wrapper {
    grid-template-columns:repeat(6, minmax(0, 1fr));
  }
  .hero-text {
    grid-column: span 6/span 6;
  }
  .hero-image {
    grid-column: span 6/span 6;
  }
}
</style>