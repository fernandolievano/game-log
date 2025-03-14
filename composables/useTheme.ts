import { useState } from '#app';

export const useTheme = () => {
  const theme = useState<string>('theme', () => 'dark');

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    theme.value = savedTheme;
    applyTheme(savedTheme);
  });

  const applyTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return {
    theme, setTheme
  };
};