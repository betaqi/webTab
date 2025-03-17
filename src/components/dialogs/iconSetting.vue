<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="编辑图标"
    style="width: 600px"
    :show-icon="false"
    draggable
  >
    <n-card :bordered="false" size="huge" role="dialog">
      <div class="icon-form">
        <div class="item">
          <label for="addr" class="label">地址</label>
          <n-input-group class="flex-1">
            <n-input
              id="addr"
              v-model:value="iconForm.addr"
              placeholder="请输入图标地址"
            />
            <!-- <n-button type="primary" @click="onGetIcon"> 获取图标 </n-button> -->
          </n-input-group>
        </div>
        <div class="item">
          <label for="name" class="label">名称</label>
          <n-input
            class="flex-1"
            id="name"
            v-model:value="iconForm.name"
            placeholder="请输入图标名称"
          />
        </div>
        <div class="item">
          <label for="color" class="label">图标颜色</label>
          <n-color-picker
            id="color"
            v-model:value="iconForm.iconColor"
            :swatches="swatches"
          />
        </div>
        <div class="item">
          <label for="text" class="label">图标文字</label>
          <n-input
            class="flex-1"
            id="text"
            v-model:value="iconForm.iconName"
            placeholder="请输入图标文字"
            :maxlength="iconNameMaxLength"
          />
        </div>
        <div class="flex gap-x-2 w-full m-l-140">
          <div
            class="icon-type"
            :class="iconForm.iconType === 'textIcon' ? 'active' : ''"
          >
            <div class="icon-preview">
              <div class="icon" :style="{ backgroundColor: iconForm.iconColor }">
                <span class="icon-txt" :style="getIconTextStyle(iconForm.iconName)">{{
                  iconForm.iconName
                }}</span>
              </div>
            </div>
            <div class="preview-text">文字图标</div>
          </div>
          <div
            class="icon-type"
            :class="iconForm.iconType === 'uploadIcon' ? 'active' : ''"
          >
            <div class="icon-preview" @click="onUploadIcon">
              <div class="icon-upload">
                <img v-if="iconForm.iconImage" :src="iconForm.iconImage" alt="预览" />
                <div v-else class="i-mingcute:close-line rotate-45"></div>
                <input type="file" accept="image/*" ref="uploadInput" class="hidden" />
              </div>
            </div>
            <div class="preview-text">上传图标</div>
          </div>
        </div>
      </div>
      <template #footer>
        <n-button type="primary" class="m-l-70 w-120" @click="onEditIcon">
          确定
        </n-button>
      </template>
    </n-card>
  </n-modal>
  <n-modal
    v-model:show="showUploadModal"
    title="上传图标"
    :show-icon="false"
    :title-style="{
      justifyContent: 'center',
      fontWeight: '700',
    }"
    preset="dialog"
    style="width: auto"
  >
    <div class="w-260 h-260 p-0">
      <vueCropper
        ref="cropperRef"
        :img="previewUrl"
        :outputSize="cropperOption.size"
        :outputType="cropperOption.outputType"
        :fixed="cropperOption.fixed"
        :autoCrop="cropperOption.autoCrop"
        :autoCropWidth="cropperOption.autoCropWidth"
        :autoCropHeight="cropperOption.autoCropHeight"
      />
    </div>
    <n-button type="primary" class="m-t-10 m-l-70 w-120" @click="handleCroppedImage">
      确定
    </n-button>
  </n-modal>
</template>

<script lang="ts" setup>
import type { IWidget, WidgetIconVO } from '@/utils/types'
import { useModal, useMessage } from 'naive-ui'
import { swatches } from '@/utils'
import { VueCropper } from 'vue-cropper'

const iconNameMaxLength = 6
const message = useMessage()
const showModal = defineModel({ default: false })
const emit = defineEmits<{
  editIcon: [WidgetIconVO]
}>()
const iconForm = ref<WidgetIconVO>({
  id: '',
  addr: '',
  iconName: '',
  name: '',
  iconColor: '#000000',
  iconType: 'textIcon',
  iconImage: '',
})

function onEditIcon() {
  emit('editIcon', iconForm.value)
  showModal.value = false
}

const getIconTextStyle = (name: string) => {
  const baseScale = 0.94
  const containerWidth = 64
  const span = document.createElement('span')
  span.style.fontSize = '22px'
  span.style.visibility = 'hidden'
  span.style.fontWeight = '500'
  span.innerText = name
  document.body.appendChild(span)
  const textWidth = span.offsetWidth
  document.body.removeChild(span)
  const scale = containerWidth / (textWidth + 10)
  return {
    transform: `scale(${scale > baseScale ? baseScale : scale}) translateX(-50%)`,
  }
}

async function onGetIcon() {
  const url = new URL('https://api.codelife.cc/website/info')
  url.searchParams.append('lang', 'cn')
  url.searchParams.append('url', encodeURIComponent(iconForm.value.addr))
  // accept:application/json, text/plain, */*

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json, text/plain, */*',
      accept: 'application/json, text/plain, */*',
    },
  })
  const data = await res.json()
  console.log(data)
}

function openIconSetting(widget: IWidget) {
  iconForm.value.id = widget.id
  iconForm.value.addr = widget.addr || ''
  iconForm.value.name = widget.name
  iconForm.value.iconColor = widget.iconColor
  iconForm.value.iconName = widget.iconName
  iconForm.value.iconType = widget.iconType
  iconForm.value.iconImage = widget.iconImage
  showModal.value = true
}

const showUploadModal = ref(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string>('')

const cropperRef = ref<InstanceType<typeof VueCropper> | null>(null)
const cropperOption = ref({
  size: 1,
  outputType: 'webp',
  fixed: true,
  full: true,
  autoCrop: true,
  autoCropWidth: 260,
  autoCropHeight: 260,
})

// 获取裁剪后的图片
function getCroppedImage() {
  return new Promise<string>(resolve => {
    cropperRef.value?.getCropData((data: string) => {
      resolve(data)
    })
  })
}

// 处理裁剪后的图片
async function handleCroppedImage() {
  try {
    const croppedData = await getCroppedImage()
    // 更新预览图片
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }
    previewUrl.value = croppedData
    iconForm.value.iconImage = croppedData
    showUploadModal.value = false
  } catch (error) {
    message.error('裁剪图片失败')
  }
}

function onUploadIcon() {
  iconForm.value.iconType = 'uploadIcon'
  uploadInput.value?.click()
  if (uploadInput.value) {
    uploadInput.value.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (file) {
        // 检查文件类型
        if (!file.type.startsWith('image/')) {
          message.error('请上传图片文件')
          return
        }

        // 创建预览URL
        if (previewUrl.value) {
          URL.revokeObjectURL(previewUrl.value)
        }
        previewUrl.value = URL.createObjectURL(file)
        showUploadModal.value = true
      }
    }
  }
}

defineExpose({
  openIconSetting,
})
</script>

<style scoped lang="scss">
.icon-form {
  @apply flex items-center flex-col gap-y-3;
  .item {
    @apply flex w-full items-center;
    .label {
      @apply w-70;
    }
    :deep(.n-color-picker) {
      @apply w-70;
    }
  }
  .icon-type {
    @apply flex flex-col items-center justify-center gap-y-1;
    .icon-preview {
      @apply w-64 h-64 font-size-22 border border-solid border-gray-300 cursor-pointer;
      border-radius: var(--icon-radius);
      overflow: hidden;
      &:hover {
        box-shadow: 0 0 12px 3px #0003;
      }
      .icon {
        @apply relative w-full h-full flex items-center justify-center whitespace-nowrap;
        .icon-txt {
          transform-origin: 0 center;
          @apply absolute left-1/2 font-500 text-5.5 line-height-1 text-white;
        }
      }
      .icon-upload {
        @apply w-full h-full flex items-center justify-center;
      }
    }
    .preview-text {
      @apply text-3.5;
    }
  }
  .active {
    .preview-text {
      @apply text-green;
    }
  }
}
</style>
