<template>
  <div
    class="fixed h-full pr-8 -left-[200000px] top-20 z-50 pb-20 opacity-0 xl:opacity-100 xl:left-8 xl:w-[200px] xl:pr-4 menu-wrapper"
    :class="{ 'menu-active-wrapper': uiStore.menuIsActive }">
    <div ref="menuRef"
      class="h-[calc(100%-16px)] w-full bg-gray-50 dark:bg-[#111111] border border-day dark:border-night rounded-2xl p-4 flex flex-col justify-start items-start gap-4 overflow-y-auto bg-gradient-to-br from-white to-day dark:from-black dark:to-night xl:shadow-lg shadow-gray-300 dark:shadow-zinc-900 transition-all duration-200 ease-in-out"
      :class="{ 'menu-active': uiStore.menuIsActive }">
      <NuxtLink v-for="link in uiStore.menuLinks" :key="link.path" :to="link.path"
        class="w-full py-3 px-4 text-center flex items-center justify-start gap-3 transition-all hover:bg-day dark:hover:bg-night rounded-xl cursor-pointer"
        @click="uiStore.closeMenu">
        <component :is="getIconComponent(link.icon)" /> {{ link.name }}
      </NuxtLink>
      <NuxtLink to="/logout"
        class="w-full py-3 px-4 text-center mt-auto flex items-center justify-start gap-3 transition-all hover:bg-day dark:hover:bg-night rounded-xl cursor-pointer"
        @click="uiStore.closeMenu">
        <LogOut />
        Log Out
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogOut, LayoutDashboard, Signal } from 'lucide-vue-next';
import { useUiStore } from '@/stores/ui';
import { onClickOutside } from '@vueuse/core';
import { onBeforeRouteLeave } from 'vue-router';

const uiStore = useUiStore();

const menuRef = ref<HTMLElement | null>(null);

const iconMap: Record<string, Component> = {
  LayoutDashboard,
  Signal,
};

const getIconComponent = (icon: string) => {
  return iconMap[icon] || null;  // Devuelve el componente o null si no se encuentra
};

onClickOutside(menuRef, () => {
  uiStore.closeMenu();
});
</script>

<style scoped>
@media screen and (max-width: 1280px) {
  .menu-wrapper {
    transition: all .1s ease-in-out;
  }

  .menu-active-wrapper {
    width: 100%;
    left: 0;
    top: 0;
    padding-top: 16px;
    padding-bottom: 0;
    backdrop-filter: blur(10px);
    opacity: 100;
  }

  .menu-active {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0px;
    max-width: 360px;
    padding: 32px 16px;
  }
}

.router-link-exact-active {
  background-image: linear-gradient(45deg, #4f46e5, #9D174D);
  color: white;
}
</style>