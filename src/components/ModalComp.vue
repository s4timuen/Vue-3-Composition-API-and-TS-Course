<template>
    <div class="modal" ref="root">
        <div class="modal__background">
            <button class="btn btn--critical" @click="hideModal()">
                <i class="fa fa-close"></i>
            </button>
            <div class="modal__content">
                <div id="modal"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useModal } from '@/composables/modal.ts'

const root: Ref<HTMLElement | null> = ref(null);
const { show, hideModal } = useModal();

watch(show, () => {
    if (root.value) {
        show.value ? root.value.classList.add('modal--show') : root.value.classList.remove('modal--show');
    }
});
</script>

<style scoped lang="scss">
@include modal;
@include button;

.btn.btn--critical {
    position: absolute;
    top: 2rem;
    right: 2rem;

    .fa.fa-close {
        font-size: 1.5rem;
    }
}
</style>
