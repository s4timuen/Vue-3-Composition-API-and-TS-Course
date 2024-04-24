<template>
    <div class="suspense suspense__text" ref="root">
        <p>{{ $t('suspense.loading') }}</p>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const root: Ref<HTMLElement | null> = ref(null);
</script>

<style scoped lang="scss">
@include suspense;
</style>