<template>
  <div class="app-widget">
    <div class="app-widget-grid">
      <VueDraggable class="widget-grid" v-model="widgetList" :animation="300">
        <template v-for="item in widgetList" :key="item.id">
          <div
            :class="['widget-item', `icon-size-${item.size.width}x${item.size.height}`]"
            :style="getWidgetBg(item)"
            @contextmenu.stop.prevent="showWidgetMenu($event, item)"
          >
            <div class="widget-item-icon">
              <span class="icon-txt" :style="getIconTextStyle(item)">{{
                item.iconName
              }}</span>
            </div>
            <div class="widget-item-name">{{ item.name }}</div>
          </div>
        </template>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useIconStore } from '@/stores/icon'
import { useWidgetStore } from '@/stores/widget'
import { VueDraggable } from 'vue-draggable-plus'
import type { IWidget } from '@/utils/types'

defineProps<{
  showWidgetMenu: (event: MouseEvent, widget: IWidget) => void
}>()

const widgetStore = useWidgetStore()
const { widgetList } = storeToRefs(widgetStore)
const { getWidgetBg } = widgetStore

const iconStore = useIconStore()
const { getIconTextStyle } = iconStore
</script>

<style scoped lang="scss">
.app-widget {
  flex: 1 1 0%;
  .app-widget-grid {
    max-width: var(--icon-grid-width, 1350px);
    @apply h-full mx-auto p-x-45;
  }
  .widget-grid {
    padding: 3vh 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--icon-size));
    grid-template-rows: repeat(auto-fill, var(--icon-size));
    justify-content: center;
    gap: var(--icon-gap) var(--icon-gap);

    .widget-item {
      border-radius: var(--icon-radius);
      opacity: var(--icon-opacity);
      grid-column: span 1;
      grid-row: span 1;
      background-size: cover;
      transition: width 0.2s ease-in-out, height 0.2s ease-in-out;

      .widget-item-icon {
        @apply flex w-full h-full text-white items-center whitespace-nowrap relative;
        .icon-txt {
          @apply absolute left-1/2 font-weight-500 font-size-22 line-height-1;
          transform-origin: 0 center;
          transform: scale(0.94) translateX(-50%);
          transition: transform 0.2s ease-in-out;
        }
      }

      &.sortable-ghost {
        opacity: 0.2;
        background-color: rgba(0, 0, 0, 0.1);
      }

      &.icon-size-1x1 {
        height: calc(var(--icon-size));
        width: calc(var(--icon-size));
        grid-column: span 1;
        grid-row: span 1;
      }

      &.icon-size-1x2 {
        height: calc(var(--icon-size) * 2 + var(--icon-gap));
        width: calc(var(--icon-size) * 1);
        grid-column: span 1;
        grid-row: span 2;
      }

      &.icon-size-2x1 {
        height: calc(var(--icon-size));
        width: calc(var(--icon-size) * 2 + var(--icon-gap));
        grid-row: span 1;
        grid-column: span 2;
      }

      &.icon-size-2x2 {
        height: calc(var(--icon-size) * 2 + var(--icon-gap));
        width: calc(var(--icon-size) * 2 + var(--icon-gap));
        grid-column: span 2;
        grid-row: span 2;
      }

      &.icon-size-4x2 {
        height: calc(var(--icon-size) * 2 + var(--icon-gap));
        width: calc(var(--icon-size) * 4 + var(--icon-gap) * 3);
        grid-column: span 4;
        grid-row: span 2;
      }
    }

    .widget-item-name {
      font-size: var(--icon-nameSize);
      color: var(--icon-nameColor);
      display: var(--icon-name);
      @apply text-center fw-500 w-full overflow-hidden text-ellipsis whitespace-nowrap;
    }
  }
}
</style>
