import { Ref, ref } from 'vue';

interface Modal {
    show: Ref<boolean>,
    showModal(): void,
    hideModal(): void
}

// outside of useModal function -> shared between components
// inside of useModal function -> component specific 
const show: Ref<boolean> = ref(false);

function showModal(): void {
    show.value = true;
}

function hideModal(): void {
    show.value = false;
}

function useModal(): Modal {
    return {
        show,
        showModal,
        hideModal
    };
}

export { useModal };
