import { defineStore } from 'pinia';
import type { User } from '@supabase/supabase-js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),

  actions: {
    setUser(user: User) {
      console.info('👋 Hello from server! We are setting user data here.');
      this.user = user;
      this.loading = false;
    },
    async logout() {
      try {
        const { $supabase } = useNuxtApp();
        await $supabase.auth.signOut();

        this.user = null;

        await $fetch('/api/auth/logout', { method: 'POST' }); // Clears cookies

        navigateTo('/login');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    },
  }
});