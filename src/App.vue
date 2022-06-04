<script lang="ts">
</script>

<template>
  <n-layout>
    <n-layout-header bordered>
      <section
        text-2xl
        fw100
        class="flex items-center justify-center"
      >
        风机状态检测平台
      </section>
    </n-layout-header>
    <n-layout
      class="h-full"
      has-sider
    >
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="false"
      >
        <nav-menu />
      </n-layout-sider>
      <n-layout>
        <main
          font-sans
          p="x-4 y-10"
          text="center gray-700 dark:gray-200"
        >
          <router-view />
          <Footer />
        </main>
      </n-layout>
    </n-layout>
  </n-layout>
</template>
