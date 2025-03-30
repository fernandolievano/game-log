import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppInputText from '@/components/global/AppInputText.vue';

describe('AppInputText', () => {
  it('render the component with the correct label', () => {
    const wrapper = mount(AppInputText, {
      props: {
        name: 'username',
        required: true,
        errors: [],
      }
    });
    expect(wrapper.find('label').text()).toContain('username');
    expect(wrapper.find('input').attributes('name')).toBe('username');
  });

  it('shows a "*" on the label when the field is required', () => {
    const wrapper = mount(AppInputText, {
      props: {
        name: 'username',
        required: true,
        errors: [],
      }
    });
    expect(wrapper.find('label').text()).toContain('*');
  });

  it('shows an error message and add error classes when the field has an error', () => {
    const errorMessage = 'This field is required';
    const errorClass = 'border-pink-700';
    const wrapper = mount(AppInputText, {
      props: {
        name: 'username',
        required: true,
        errors: [errorMessage],
      }
    });
    expect(wrapper.find('p').text()).toContain(errorMessage);
    expect(wrapper.find('input').classes()).toContain(errorClass);
  });

  it('updates the input value when the user types', async () => {
    const inputValue = 'johndoe';
    const wrapper = mount(AppInputText, {
      props: {
        name: 'username',
        required: true,
        errors: [],
      }
    });
    const input = wrapper.find('input');
    await input.setValue(inputValue);
    expect((wrapper.vm as any).model).toBe(inputValue);
  });
});