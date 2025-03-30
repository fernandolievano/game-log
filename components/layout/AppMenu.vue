<template>
  <div class="fixed h-full w-[200px] pr-4 -left-[20000px] xl:left-8 top-20 z-50 transition-all pb-20"
    :class="{ 'menu-active-wrapper': menuIsActive }">
    <div ref="menuRef"
      class="h-[calc(100%-16px)] w-full bg-gray-50 dark:bg-[#111111] border border-day dark:border-night rounded-2xl p-4 flex flex-col justify-start items-start gap-4 overflow-y-auto"
      :class="{ 'menu-active': menuIsActive }">
      <NuxtLink to="/"
        class="w-full py-3 px-4 text-center flex items-center justify-start gap-3 transition-all hover:bg-day dark:hover:bg-night rounded-xl cursor-pointer">
        <LayoutDashboard /> Dashboard
      </NuxtLink>
      <NuxtLink to="/random-path"
        class="w-full py-3 px-4 text-center flex items-center justify-start gap-3 transition-all hover:bg-day dark:hover:bg-night rounded-xl cursor-pointer">
        <Signal /> 404
      </NuxtLink>
      <NuxtLink to="/logout"
        class="w-full py-3 px-4 text-center mt-auto flex items-center justify-start gap-3 transition-all hover:bg-day dark:hover:bg-night rounded-xl cursor-pointer">
        <LogOut />
        Log Out
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogOut, LayoutDashboard, Signal } from 'lucide-vue-next';
const menuIsActive = ref<boolean>(false);
const menuRef = ref<HTMLElement | null>(null);
const pages = ref([
  {
    name: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/'
  },
]);

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    menuIsActive.value = false;
  }
};

// Lifecycle hooks to add/remove event listener
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
@media screen and (max-width: 1280px) {
  .menu-active-wrapper {
    width: 100%;
    left: 0;
    top: 0;
    padding-top: 16px;
    padding-bottom: 0;
    backdrop-filter: blur(10px);
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