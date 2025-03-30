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
        this.user = null;
        await $fetch('/api/auth/logout', { method: 'POST' });

        navigateTo('/login', { replace: true });
      } catch (err) {
        console.error('Logout failed:', err);
      }
    },
  }
});