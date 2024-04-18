<template>
    <div class="timeline" ref="root">
        <div class="selection">
            <a class="link" v-for="(period, key) in periods" :key="key">{{ $t(`views.home.filter.${period}`) }}</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';

const root: Ref<HTMLElement | null> = ref(null);

const periods: Array<string> = ['today', 'week', 'month'];
</script>

<style scoped lang="scss">
.timeline {
    @include link;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        width: 100%;

        a{
            text-decoration: underline;
        }
    }
}
</style>