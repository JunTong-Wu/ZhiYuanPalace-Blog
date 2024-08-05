<template>
  <section id="footer-columns" class="relative z-30">
    <div class="bg-bg-bestCard">
      <div class="container">
        <div class="grid grid-cols-6 gap-x-7 gap-y-14 pt-24 pb-12 md:grid-cols-12 px-4">
          <div class="col-span-full sm:col-span-3 md:col-span-4">
            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center mb-8">
              <img src="@/assets/image/logo.png" class="max-h-7" :alt="$t('zhiYuanPalace')">
              <span class="ml-2 text-xl font-bold">{{ $t('zhiYuanPalace') }}</span>
            </NuxtLink>
            <p class="mb-12 text-text-2">
              {{ $t("bannerSlogan1") }}
            </p>
            <!-- Socials -->
            <div class="flex space-x-5">
              <div v-for="socialLink in socialLinks" @click="socialLink.onclick()">
                <ZyIcon :defaultName="socialLink.icon" size="1.25rem" />
              </div>
            </div>
          </div>

          <div class="col-span-full sm:col-span-3 md:col-span-2 md:col-start-7">
            <h3 class="mb-6 font-display text-sm text-jacarta-700 dark:text-white">Marketplace</h3>
            <ul class="flex flex-col space-y-1 dark:text-jacarta-300">
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">All NFTs</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Art</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Music</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Domain Names</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Collectibles</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Virtual World</a>
              </li>
            </ul>
          </div>

          <div class="col-span-full sm:col-span-3 md:col-span-2">
            <h3 class="mb-6 font-display text-sm text-jacarta-700 dark:text-white">Company</h3>
            <ul class="flex flex-col space-y-1 dark:text-jacarta-300">
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Explore</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">About</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Contact Us</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Our Blog</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">FAQ</a>
              </li>
            </ul>
          </div>

          <div class="col-span-full sm:col-span-3 md:col-span-2">
            <h3 class="mb-6 font-display text-sm text-jacarta-700 dark:text-white">My Account</h3>
            <ul class="flex flex-col space-y-1 dark:text-jacarta-300">
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Authors</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Collection</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Author Profile</a>
              </li>
              <li>
                <a href="#" class="hover:text-accent dark:hover:text-white">Create Item</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col items-center justify-between space-y-2 py-8 sm:flex-row sm:space-y-0">
          <span class="text-sm dark:text-jacarta-400">©2024
            Xhibiter — Made by
            <a href="https://deothemes.com" class="hover:text-accent">DeoThemes</a></span>
          <ul class="flex flex-wrap space-x-4 text-sm dark:text-jacarta-400">
            <li>
              <a href="#" class="hover:text-accent">Terms and conditions</a>
            </li>
            <li><a href="#" class="hover:text-accent">Privacy policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</template>
<script setup lang="ts">
const socialLinks = [
  {
    name:'WeChat',
    icon:'wechat',
    onclick:()=> {
      // window.open('https://wechats.deothemes.com')
      console.log('wechat')
    },
  },
  {
    name:'QQ',
    icon:'QQ',
    onclick:()=> {
      // window.open('https://wechats.deothemes.com')
      console.log('qq')
    },
  },
  {
    name: 'douyin',
    icon: 'douyin',
    onclick: () => {
      // window.open('https://qzone.deothemes.com')
      console.log('qzone')
    },
  }
];
</script>