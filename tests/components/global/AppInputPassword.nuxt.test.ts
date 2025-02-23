import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppInputPassword from '@/components/global/AppInputPassword.vue';

describe('AppInputPassword', () => {
  it('render the component with the correct label', () => {
    const wrapper = mount(AppInputPassword, {
      props: {
        name: 'password',
        required: true,
        errors: [],
      }
    });
    expect(wrapper.find('label').text()).toContain('Password');
    expect(wrapper.find('input').attributes('name')).toBe('password');
  });

  it('shows a "*" on the label when the field is required', () => {
    const wrapper = mount(AppInputPassword, {
      props: {
        name: 'password',
        required: true,
        errors: [],
      }
    });
    expect(wrapper.find('label').text()).toContain('*');
  });

  it('shows an error message and add error classes when the field has an error', () => {
    const errorMessage = 'Password should be at least 6 characters long';
    const errorClass = 'border-pink-700';
    const wrapper = mount(AppInputPassword, {
      props: {
        name: 'password',
        required: true,
        errors: [errorMessage],
      }
    });
    expect(wrapper.find('p').text()).toContain(errorMessage);
    expect(wrapper.find('input').classes()).toContain(errorClass);
    expect(wrapper.find('button').classes()).toContain(errorClass);
  });

  it('updates the input value when the user types', async () => {
    const inputValue = 'loremipsum1234';
    const wrapper = mount(AppInputPassword, {
      props: {
        name: 'password',
        required: true,
        errors: [],
      }
    });
    const input = wrapper.find('input');
    await input.setValue(inputValue);
    expect((wrapper.vm as any).model).toBe(inputValue);
  });

  it('changes the input type when the user clicks the toggle button', async () => {
    const wrapper = mount(AppInputPassword, {
      props: {
        name: 'password',
        required: true,
        errors: [],
      }
    });
    const input = wrapper.find('input');
    const button = wrapper.find('button');
    expect(input.attributes('type')).toBe('password');
    await button.trigger('click');
    expect(input.attributes('type')).toBe('text');
    await button.trigger('click');
    expect(input.attributes('type')).toBe('password');
  });
});