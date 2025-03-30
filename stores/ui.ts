import { defineStore, acceptHMRUpdate } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    menuLinks: [
      { path: '/', name: 'Dashboard', icon: 'LayoutDashboard' }
    ],
    menuIsActive: false
  }),
  actions: {
    openMenu() {
      this.menuIsActive = true;
    },
    closeMenu() {
      this.menuIsActive = false;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot));
}