<template>
  <!-- 插入到 body 中 -->
  <Teleport to="body">
    <div
      class="wallpaper"
      :style="{ backgroundImage: isVideo ? 'none' : `url(${values.wallpaperImg})` }"
    >
      <video class="wallpaper-video" autoplay loop muted v-if="isVideo">
        <source
          src="https://files.codelife.cc/itab/defaultWallpaper/videos/84.mp4"
          type="video/mp4"
        />
        <img
          src="https://files.codelife.cc/itab/defaultWallpaper/videos/84.jpg?x-oss-process=image/resize,limit_0,m_fill,w_1920,h_1080/quality,q_93/format,webp"
          alt="Background video poster"
        />
      </video>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { useWallpaperStore } from '@/stores/wallpaper'
import { storeToRefs } from 'pinia'
const wallpaperStore = useWallpaperStore()
const { values } = storeToRefs(wallpaperStore)

const isVideo = computed(() => !values.value?.wallpaperImg)
</script>
<style scoped lang="scss">
.wallpaper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: background 0.3s, transform 0.3s, height 0.3s;
  background-size: cover;
  background-position: 50%;
  z-index: 0;

  .wallpaper-video {
    position: relative;
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.3s;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}

// .wallpaper.change {
//   transform: scale(1.1);
// }
// .wallpaper:after {
//   content: '';
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   backdrop-filter: blur(var(--wall-blur));
//   -webkit-backdrop-filter: blur(var(--wall-blur));
//   background-color: rgba(0, 0, 0, var(--wall-mask));
// }
</style>
