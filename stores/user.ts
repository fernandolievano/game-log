import { defineStore } from 'pinia';
import type { User } from '@supabase/supabase-js';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),

  actions: {
    async fetchUser() {
      try {
        const { $supabase } = useNuxtApp();
        const { data: authUser, error } = await $supabase.auth.getUser();

        if (error) throw new Error(error.message);
        if (!authUser.user) return;

        this.setUser(authUser.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        this.loading = false;
      }
    },
    setUser(user: User) {
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