import { VueWrapper, shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import i18n from '@/i18n/i18n.ts';

describe('Home View', () => {
    let wrapper: VueWrapper | undefined = undefined;

    beforeEach(() => {
        wrapper = shallowMount(HomeView, {
            global: {
                plugins: [i18n]
            }
        });
    });

    afterEach(() => {
        if (wrapper !== undefined) {
            wrapper.unmount();
        }
    });

    test('Component Rendered', () => {
        if (wrapper) {
            expect(wrapper.exists()).toBe(true);
        } else {
            expect(wrapper).not.toBe(undefined);
        }
    });
});
