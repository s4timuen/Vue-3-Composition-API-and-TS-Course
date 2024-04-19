<template>
    <div class="timeline" ref="root">
        <div class="selection">
            <a class="link" :class="{ '--active': isActive(period) }" v-for="(period, key) of  periods" :key="key"
                @click="selectPeriod(period)">
                {{ $t(`views.home.filter.${period}`) }}
            </a>
        </div>
        <div class="timeline__items">
            <TimelineItem v-for="(post, key) of posts" :post="post" :key="key" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, computed, ref } from 'vue';
import { ComputedRef } from 'vue';
import { DateTime } from 'luxon';
import { TimelinePost } from '@/models/timelinePost.ts';
import { periods, Period } from '@/models/period.ts'
import { today, week, month } from '@/tests/models/mock_data/posts.ts'; // todo: remove, test data
import TimelineItem from '@/components/TimelineItem.vue'


const root: Ref<HTMLElement | null> = ref(null);

// period selection
const selectedPeriod: Ref<Period> = ref('today');
const posts: ComputedRef<Array<TimelinePost>> = computed(() => {
    return [today, week, month]
        .map(post => {
            return {
                ...post,
                created: DateTime.fromISO(post.created)
            }
        })
        .filter(post => {
            switch (true) {
                case selectedPeriod.value === 'today':
                    return post.created >= DateTime.now().minus({ day: 1 });
                case selectedPeriod.value === 'week':
                    return post.created >= DateTime.now().minus({ week: 1 });
                case selectedPeriod.value === 'month':
                    return post.created >= DateTime.now().minus({ month: 1 });
                default:
                    console.error(`Invalid selected period: ${selectedPeriod.value}`);
            }
        })
});

function selectPeriod(period: Period): void {
    selectedPeriod.value = period;
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
