import { defineStore } from 'pinia';
import { useAuth } from '@/composables/useAuth';
import type { User } from '@supabase/supabase-js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: true,
  }),
  actions: {
    async fetchUser() {
      const { $supabase } = useAuth();
      const { data } = await $supabase.auth.getUser();
      console.log('user from store: ', data);
      if (data != null) {
        this.user = data.user;
        this.persistUser();
      }
      this.loading = false;
    },
    persistUser() {
      if (this.user != null) {
        cookies.set('user', this.user);
      } else {
        cookies.remove('user');
      }
    },
    loadUserFromStorage() {
      const savedUser = cookies.get('user');

      if (savedUser != null) {
        this.user = savedUser;
      }
    },
    async logout() {
      const { $supabase } = useAuth();
      await $supabase.auth.signOut();
      this.user = null;
      this.persistUser();
      navigateTo('/login');
    }
  }
});