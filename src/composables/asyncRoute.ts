import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import {
  BookOutline as BookIcon,

} from '@vicons/ionicons5'
import routes from '~pages'
const menuRoutes = ref(routes.filter(({ meta }) => !!meta?.title))
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

function menuGenerator(routes: RouteRecordRaw[]) {
  return routes.map((route) => {
    const current: MenuOption = {
      label: route.meta?.title,
      key: route!.name as any,
      icon: renderIcon(BookIcon),
    }

    if (route.children && route.children.length > 0)
      current.children = menuGenerator(route.children)
    return current
  })
}

const menus = computed(() => menuGenerator(menuRoutes.value))
export function useAsyncRoute() {
  return { menus }
}
