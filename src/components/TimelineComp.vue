<template>
    <div class="timeline" ref="root">
        <div class="selection">
            <a class="link" :class="{ '--active': isActive(period) }" v-for="(period, key) of  periods" :key="key"
                @click="selectPeriod(period)">
                {{ $t(`views.home.filter.${period}`) }}
            </a>
        </div>
        <div class="timeline__items">
            <TimelineItem v-for="(post, key) of filteredPosts" :post="post" :key="key" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { periods, Period } from '@/models/period.ts'
import { usePostsStore } from '@/stores/postsStore.ts';
import TimelineItem from '@/components/TimelineItem.vue';
import { storeToRefs } from 'pinia';

const root: Ref<HTMLElement | null> = ref(null);

const postsStore = usePostsStore();
const { selectedPeriod, filteredPosts } = storeToRefs(postsStore);
postsStore.fetchPosts();

// period selection
function selectPeriod(period: Period): void {
    postsStore.setSelectedPeriod(period);
}
function isActive(period: Period) {
    return period === selectedPeriod.value ? true : false;
}
</script>

<style scoped lang="scss">
.timeline {
    @include link;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 2rem;

    .selection {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        width: 100%;

        a {
            text-decoration: underline;
            text-underline-offset: 0.2rem;
        }

        a.--active {
            color: $color-white;
            text-shadow: $shadow-active;
        }
    }

    .timeline__items {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }
}
</style>
