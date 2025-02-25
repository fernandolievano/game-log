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

        this.user = authUser.user;
        await this.persistSession();
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        this.loading = false;
      }
    },
    async persistSession() {
      try {
        await $fetch('/api/auth/session', {
          method: 'POST',
          credentials: 'include', // Ensures the cookie is sent
        });
      } catch (err) {
        console.error('Error persisting session:', err);
      }
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