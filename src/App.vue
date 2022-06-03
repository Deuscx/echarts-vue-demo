<script lang="ts">
const collapsed = ref(true)
</script>

<template>
  <n-layout class="h-full" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <nav-menu />
    </n-layout-sider>
  </n-layout>

  <main
    font-sans
    p="x-4 y-10"
    text="center gray-700 dark:gray-200"
  >
    <router-view />
    <Footer />
  </main>
</template>
