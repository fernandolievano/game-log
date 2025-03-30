import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import AppButton from '@/components/global/AppButton.vue';

describe('AppButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      slots: { default: 'Click Me' }
    });
    expect(wrapper.text()).toBe('Click Me');
  });

  it('emits an event when clicked', async () => {
    const wrapper = mount(AppButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('it doesn\'t emit an event when disabled', async () => {
    const wrapper = mount(AppButton, {
      attrs: { disabled: true }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('it have disabled classes when disabled', () => {
    const wrapper = mount(AppButton, {
      attrs: { disabled: true }
    });
    expect(wrapper.classes()).toContain('disabled:bg-gray-three');
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed');
  });
});