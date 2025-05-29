import {
	describe,
	it,
	expect,
	vi,
	beforeEach
} from 'vitest';
import { mount } from '@vue/test-utils';
import AppBar from '@/components/layout/AppBar.vue';
import { useTheme } from '@/composables/useTheme';
import { useUiStore } from '@/stores/ui';

/**
 * Mock composables and stores
 */
vi.mock('@/composables/useTheme', () => ({
	useTheme: vi.fn()
}));
vi.mock('@/stores/ui', () => ({
	useUiStore: vi.fn()
}));

describe('AppBar.vue', () => {
	const openMenuMock = vi.fn();
	const setThemeMock = vi.fn();
	const theme = ref<'dark' | 'light'>('dark');

	beforeEach(() => {
		(useUiStore as any).mockReturnValue({
			openMenu: openMenuMock
		});
		(useTheme as any).mockReturnValue({
			theme,
			setTheme: setThemeMock
		});
	});

	// ✅ passed
	it('renders correctly', () => {
		const wrapper = mount(AppBar);
		expect(wrapper.text()).toContain('GameLog');
	});
	// ✅ passed
	it('calls scrollUp on logo click', async () => {
		const scrollToMock = vi.fn();
		window.scrollTo = scrollToMock;

		const wrapper = mount(AppBar);
		const logo = wrapper.get(
			'[data-test-id="logo-link"]'
		);
		await logo.trigger('click');

		expect(scrollToMock).toHaveBeenCalledWith({
			top: 0,
			behavior: 'smooth'
		});
	});
	// ✅ passed
	it('calls openMenu on menu button click', async () => {
		const wrapper = mount(AppBar);
		const menuButton = wrapper.get(
			'[data-test-id="menu-button"]'
		);

		await menuButton.trigger('click');
		expect(openMenuMock).toHaveBeenCalled();
	});
	// ✅ passed
	it('toggles theme on button-theme click', async () => {
		const wrapper = mount(AppBar);
		const themeButton = wrapper.get(
			'[data-test-id="theme-button"]'
		);

		await themeButton.trigger('click');
		expect(setThemeMock).toHaveBeenCalledWith('light');
	});
	// ✅ passed
	it('displays loading icon instead of icons before mount', async () => {
		const wrapper = mount(AppBar);
		expect(
			wrapper
				.findComponent({ name: 'AppLoading' })
				.exists()
		).toBe(true);
	});
});
