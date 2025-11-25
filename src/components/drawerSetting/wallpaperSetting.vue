<template>
  <div class="w-full h-full py-[10px] pl-[10px] pr-[20px] flex flex-col gap-y-[10px]">
    <n-card
      v-for="(section, sectionIndex) in wallpaperSchema"
      :key="sectionIndex"
      :title="section.title"
      hoverable
      class="rounded-[6px]"
    >
      <n-upload multiple directory-dnd :max="1" @before-upload="beforeUpload">
        <n-upload-dragger>
          <div class="flex flex-col items-center justify-center gap-y-[10px] pt-[14px]">
            <div class="icon-[mingcute--pic-ai-fill] text-[24px]"></div>
            <n-text class="text-[14px]"> 点击或者拖动上传壁纸 </n-text>
          </div>
        </n-upload-dragger>
      </n-upload>
      <div
        v-for="(config, configIndex) in filterCustomConfigs(section.configs)"
        :key="configIndex"
        class="flex justify-between items-center gap-x-[12px] px-[12px] leading-[36px]"
      >
        <span class="w-[56px]">{{ config.label }}</span>

        <FormBuilder
          v-model="values[config.value]"
          :type="config.type"
          :style="config.style"
          :class="config.class"
          :props-options="config.props"
          :context="{ values }"
        />
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
import { filterCustomConfigs } from '@/schema/utils'

const message = useMessage()
const wallpaperStore = useWallpaperStore()
const { values } = storeToRefs(wallpaperStore)

const imageUrl = ref<string | null>(null)

async function beforeUpload(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  if (
    !['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(
      data.file.file?.type || '',
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
