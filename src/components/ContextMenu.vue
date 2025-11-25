<template>
  <Teleport to="body">
    <div
      ref="menuRef"
      class="context-menu borderBlack fixed w-[182px] rounded-md shadow p-1 select-none backdrop-blur-md z-999"
      :style="{
        left: adjustedPosition.x + 'px',
        top: adjustedPosition.y + 'px',
        display: isVisible ? 'block' : 'none',
      }"
    >
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="menu-item group cursor-pointer w-full h-auto py-[5px] px-3 rounded-[6px] leading-[26px] text-[14px] transition-all duration-400 text-gray-800"
        :class="{ 'hover:bg-[#4285f414] hover:text-green-500': !item.options }"
        @click.stop.prevent="handleMenuClick(item)"
      >
        <div class="items-center flex gap-4">
          <div
            :class="[
              item.icon,
              'text-gray-500 text-[14px]',
              !item.options ? 'group-hover:text-green-500' : '',
            ]"
          ></div>
          {{ item.label }}
        </div>
        <p
          v-if="item.options"
          class="contextmenu-layout py-2 gap-2 flex flex-wrap text-[12px]"
        >
          <span
            v-for="option in item.options"
            :key="option.id"
            class="item-option h-6 overflow-hidden leading-6 w-12 px-[10px] bg-gray-100 rounded-[6px] text-center cursor-pointer flex items-center justify-center transition-all duration-400"
            :class="{ 'bg-[#4285f414] text-green-500': option.active }"
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
        },
      )
    }
  },
  { deep: true },
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
  },
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
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.menu-item {
  .contextmenu-layout {
    .item-option {
      background-color: rgba(0, 0, 0, 0.04);
      color: rgba(0, 0, 0, 0.7);

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
        color: rgba(0, 0, 0, 0.95);
      }
    }
  }
}
</style>
