<script setup lang="ts">
import { useAsyncRoute } from '~/composables/asyncRoute'
import routes from '~pages'

const router = useRouter()
const { menus } = useAsyncRoute()
function clickMenuItem(key: string) {
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
