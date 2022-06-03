<script setup lang="ts">
import { useAsyncRoute } from '~/composables/asyncRoute'
import routes from '~pages'
console.log('🚀 ~ file: NavMenu.vue ~ line 4 ~ routes', routes)

const router = useRouter()
const { menus } = useAsyncRoute()
function clickMenuItem(key: string) {
  console.log(key, router)
  router.push({ name: key })
}
</script>

<template>
  <NMenu
    :options="menus"
    :collapsed-width="64"
    :indent="24"
    @update:value="clickMenuItem"
  />
</template>

<style scoped>
</style>
