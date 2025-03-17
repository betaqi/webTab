<template>
  <Teleport to="body">
    <div
      ref="menuRef"
      class="context-menu borderBlack"
      :style="{
        left: adjustedPosition.x + 'px',
        top: adjustedPosition.y + 'px',
        display: isVisible ? 'block' : 'none',
      }"
    >
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="menu-item"
        :class="{ hover: !item.options }"
        @click.stop.prevent="handleMenuClick(item)"
      >
        <div class="items-center flex gap-4">
          <div :class="item.icon"></div>
          {{ item.label }}
        </div>
        <p v-if="item.options" class="contextmenu-layout">
          <span
            v-for="option in item.options"
            :key="option.id"
            class="item-option"
            :class="{ active: option.active }"
            @click.stop="handleMenuClick(option)"
          >
            {{ option.label }}
          </span>
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { IContextMenu } from '@/utils/types'
import gsap from 'gsap'

interface Props {
  isVisible: boolean
  position: { x: number; y: number }
  menuItems: IContextMenu[]
}

const props = defineProps<Props>()
const emit = defineEmits(['update:show', 'select', 'close'])

const menuRef = ref<HTMLElement | null>(null)
const menuSize = ref({ width: 0, height: 0 })
const isVisible = ref(false)

// 计算调整后的位置
const adjustedPosition = computed(() => {
  const { x, y } = props.position
  const { width, height } = menuSize.value
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  let adjustedX = x
  let adjustedY = y

  // 检查右边界
  if (x + width > windowWidth) {
    adjustedX = x - width
  }

  // 检查下边界
  if (y + height > windowHeight) {
    adjustedY = y - height
  }

  // 确保不会超出左边界和上边界
  adjustedX = Math.max(0, adjustedX)
  adjustedY = Math.max(0, adjustedY)

  return { x: adjustedX, y: adjustedY }
})

// 监听位置变化
watch(
  () => props.position,
  async () => {
    if (props.isVisible) {
      // 显示菜单但设置为透明
      isVisible.value = true
      await nextTick()

      // 更新菜单尺寸
      if (menuRef.value) {
        menuSize.value = {
          width: menuRef.value.offsetWidth,
          height: menuRef.value.offsetHeight,
        }
      }

      // 每次位置变化时重新执行动画
      gsap.fromTo(
        menuRef.value,
        {
          opacity: 0,
          scale: 0.6,
          transformOrigin: '0 0',
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.75)',
        }
      )
    }
  },
  { deep: true }
)

// 监听显示状态只处理隐藏动画
watch(
  () => props.isVisible,
  async newVal => {
    if (!newVal) {
      // 执行隐藏动画
      await gsap.to(menuRef.value, {
        opacity: 0,
        scale: 0.6,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          isVisible.value = false
        },
      })
    }
  }
)

const handleMenuClick = async (item: IContextMenu) => {
  emit('select', item)
  onClose()
}

const onClose = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.context-menu {
  @apply fixed rounded-md shadow w-142 p-4 user-select-none backdrop-blur-12 z-999;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.menu-item {
  @apply cursor-pointer w-full h-auto p-y-5 p-x-4 border-radius-6 line-height-26 font-size-14
        transition-all-400  text-gray-800;

  [class^='i-'] {
    @apply text-gray-500 font-size-14;
  }

  .contextmenu-layout {
    @apply p-y-2 gap-4  flex flex-wrap font-size-12;

    .item-option {
      @apply h-24 overflow-hidden line-height-24 min-w-36
        p-x-10
        bg-gray-04 border-radius-6
        text-center cursor-pointer
        flex items-center justify-center
        transition-all-400;

      background-color: rgba(0, 0, 0, 0.04);
      color: rgba(0, 0, 0, 0.7);

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.95);
      }
      &.active {
        background-color: rgba(66, 133, 244, 0.08);
        @apply text-green-500;
      }
    }
  }

  &.hover:hover {
    background-color: rgba(66, 133, 244, 0.08);
    @apply text-green-500;

    [class^='i-'] {
      @apply text-green-500;
    }
  }
}
</style>
