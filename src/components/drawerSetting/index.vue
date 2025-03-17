<template>
  <div class="w-full h-full p-y-10 p-l-10 p-r-20 flex flex-col gap-y-10px">
    <n-card
      v-for="(section, sectionIndex) in wallpaperSchema"
      :key="sectionIndex"
      :title="section.title"
      hoverable
      class="border-radius-6"
    >
      <div
        v-for="(config, configIndex) in section.configs"
        :key="configIndex"
        class="flex justify-between items-center gap-col-12px p-x-12 line-height-36"
      >
        <span class="w-56">{{ config.label }}</span>

        <n-slider
          v-if="config.type === 'slider'"
          class="flex-1"
          v-model:value="values[config.value]"
          v-bind="config.props"
        />

        <n-upload
          v-if="config.type === 'imgUpload'"
          multiple
          directory-dnd
          :max="1"
          @before-upload="beforeUpload"
        >
          <n-upload-dragger>
            <div class="flex flex-col items-center justify-center gap-y-10px p-t-14px">
              <div class="i-mingcute:pic-ai-fill text-size-24px"></div>
              <n-text class="text-size-14px"> 点击或者拖动上传壁纸 </n-text>
            </div>
          </n-upload-dragger>
        </n-upload>

        <span v-if="config.unit">{{ values[config.value] }}{{ config.unit }}</span>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import wallpaperSchema from '@/schema/wallpaperSchema'
import { useWallpaperStore } from '@/stores/wallpaper'
import { useMessage, type UploadFileInfo } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const message = useMessage()
const wallpaperStore = useWallpaperStore()
const { values } = storeToRefs(wallpaperStore)

const imageUrl = ref<string | null>(null)

async function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  if (
    !['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(
      data.file.file?.type || ''
    )
  ) {
    message.error('只能上传png、jpeg、jpg、webp格式的图片文件，请重新上传')
    return false
  }

  // const reader = new FileReader()
  // reader.onload = (e: ProgressEvent<FileReader>) => {
  //   imageUrl.value = e.target?.result as string
  //   wallpaperStore.setWallpaperImg(imageUrl.value)
  //   message.success('上传成功')
  // }
  // reader.readAsDataURL(data.file.file as File)
  wallpaperStore.setWallpaperImg(data.file.file as File)

  return false
}
</script>

<style scoped lang="scss">
.uploaded-image {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}
</style>
