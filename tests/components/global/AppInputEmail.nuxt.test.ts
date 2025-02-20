import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppInputEmail from '@/components/global/AppInputEmail.vue';

describe('AppInputEmail', () => {
  it('render the component with the correct label', () => {
    const wrapper = mount(AppInputEmail, {
      props: {
        name: 'email',
        required: true,
        errors: [],
      }
    });
    expect(wrapper.find('label').text()).toContain('Email');
    expect(wrapper.find('input').attributes('name')).toBe('email');
  });

  it('shows a "*" on the label when the field is required', () => {
    const wrapper = mount(AppInputEmail, {
      props: {
        name: 'email',
        required: true,
        errors: [],
      }
    });
    expect(wrapper.find('label').text()).toContain('*');
  });

  it('shows an error message and add error classes when the field has an error', () => {
    const errorMessage = 'Please enter a valid mail';
    const errorClass = 'border-pink-700';
    const wrapper = mount(AppInputEmail, {
      props: {
        name: 'email',
        required: true,
        errors: [errorMessage],
      }
    });
    expect(wrapper.find('p').text()).toContain(errorMessage);
    expect(wrapper.find('input').classes()).toContain(errorClass);
  });

  it('updates the input value when the user types', async () => {
    const inputValue = 'johndoe@mail.com';
    const wrapper = mount(AppInputEmail, {
      props: {
        name: 'email',
        required: true,
        errors: [],
      }
    });
    const input = wrapper.find('input');
    await input.setValue(inputValue);
    expect((wrapper.vm as any).model).toBe(inputValue);
  });
});