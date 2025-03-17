<template>
  <div class="app-serach-wrap">
    <div class="app-serach-box-wrap">
      <div class="app-serach-box relative">
        <form class="input-box relative flex items-center" @submit.prevent="onSearch">
          <div id="selectEngine" class="select relative">
            <Menu as="div" class="relative inline-block wh-full">
              <MenuButton class="wh-full">
                <div id="selectEngine" class="select">
                  <img
                    class="search-icon"
                    :src="curSeImg"
                    style="width: 20px; height: 20px"
                  />
                </div>
              </MenuButton>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="select-menu absolute w-600 p-10 m-t-4">
                  <VueDraggable
                    class="verflow-hidden w-full z-0 items-center origin-top flex gap-10 action"
                    v-model="seList"
                    :animation="300"
                  >
                    <template v-for="se in seList" :key="se.title">
                      <MenuItem v-slot="{ close }">
                        <div
                          class="w-64 items-center justify-center"
                          @click="onSeSelect(se, close)"
                        >
                          <div class="se-item-icon">
                            <img :src="se.src" class="w-24 h-24" />
                          </div>
                          <div class="text-center color-#222 text-12px">
                            {{ se.title }}
                          </div>
                        </div>
                      </MenuItem>
                    </template>
                  </VueDraggable>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <input
            id="searchInput"
            autocomplete="off"
            class="se-input w-full h-ful f14 bg-transparent leading-5"
            maxlength="220"
            placeholder="输入搜索内容"
            type="text"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
const seList = [
  {
    title: '百度',
    src: 'https://files.codelife.cc/itab/search/baidu.svg',
    url: 'https://www.baidu.com/s?wd=',
  },
  {
    title: '哔哩哔哩',
    src: 'https://files.codelife.cc/itab/search/bilibili.svg',
    url: 'https://search.bilibili.com/all?keyword=',
  },
  {
    title: '必应',
    src: 'https://files.codelife.cc/itab/search/bing.svg',
    url: 'https://www.bing.com/search?q=',
  },
  {
    title: 'Google',
    src: 'https://files.codelife.cc/itab/search/google.svg',
    url: 'https://www.google.com/search?q=',
  },
]

const currentSe = ref<any>(seList[0].url)

const curSeImg = computed(() => seList.find(se => se.url === currentSe.value)?.src)

function onSeSelect(se: any, close: () => void) {
  currentSe.value = se.url
  close()
}

function onSearch(e: any) {
  const searchInput = (
    document.getElementById('searchInput') as HTMLInputElement
  ).value.trim()

  if (!searchInput) return
  const searchUrl = `${currentSe.value}${encodeURIComponent(searchInput)}`

  window.open(searchUrl, '_blank')
}
</script>

<style lang="scss" scoped>
.app-serach-wrap {
  @apply h-90 w-full p-x-26;
  .app-serach-box-wrap {
    max-width: var(--icon-grid-width, 1350px);
    transform: translateY(calc(50% - 4px));
    @apply mx-auto;
  }
}
.app-serach-box {
  max-width: 600px;
  margin: 3vh auto 20px;
  .input-box {
    backdrop-filter: blur(12px);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 3px;
    z-index: 1;
    height: 36px; //height: var(--search-height);
    background-color: rgba(255, 255, 255, 0.2); //  var(--search-bgColor);
    color: #222; // var(--d-main);
    border-radius: 6px; //var(--search-radius);
    transition: background 0.2s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
  .select {
    background-color: initial;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-width: 50px;
    max-width: 50px;
    position: relative;
    transition: 0.2s;
    .select-icon {
      width: 20px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
    }
    .close {
      transition: transform 0.2s;
    }

    .select-menu {
      background-color: rgba(255, 255, 255, 0.9);
      ackdrop-filter: blur(8px);
      box-shadow: 0 0 10px 3px #00000029;
      border-radius: 6px;
    }
    .se-item-icon {
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 30px;
      margin: 0 auto;
      height: 36px;
      width: 36px;
      border-radius: 8px;
      background-color: #fff;
    }
  }
}
</style>
