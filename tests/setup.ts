import { config } from '@vue/test-utils';

config.global.stubs = {
	RouterLink: {
		template: '<a><slot /></a>'
	},
	NuxtLink: {
		template: '<a><slot /></a>'
	}
};
