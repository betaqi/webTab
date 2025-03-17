<script setup lang="ts">
import wallpaper from '@/components/wallpaper.vue'
</script>

<template>
  <n-modal-provider>
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-modal-provider>
  <wallpaper />
</template>

<style scoped lang="scss"></style>
