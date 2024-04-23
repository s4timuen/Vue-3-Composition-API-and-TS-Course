import { StoreDefinition, defineStore } from 'pinia';
import { DateTime } from 'luxon';
import { TimelinePost } from '@/models/timelinePost.ts';
import { Post } from '@/models/post';
import { today, week, month } from '@/tests/models/mock_data/posts.ts'; // todo: only test data
import { Period } from '@/models/period';

interface PostsStoreState {
    ids: Array<string>;
    all: Map<string, Post>;
    selectedPeriod: Period;
}

interface PostsStoreGetters {
    filteredPosts(state: PostsStoreState): Array<TimelinePost>;
}

interface PostsStoreActions {
    setSelectedPeriod(period: Period): void;
}

const usePostsStore: StoreDefinition<
    'postsStore',
    PostsStoreState,
    PostsStoreGetters,
    PostsStoreActions> = defineStore('postsStore', {
        state: (): PostsStoreState => ({
            ids: [today.id, week.id, month.id],
            all: new Map([
                [today.id, today],
                [week.id, week],
                [month.id, month]
            ]),
            selectedPeriod: 'today'
        }),
        getters: {
            filteredPosts: (state: PostsStoreState): Array<TimelinePost> => {
                return state.ids
                    .map(id => {
                        const post: Post | undefined = state.all.get(id)
                        if (!post) {
                            throw Error(`Post with id ${id} was not found`);
                        }
                        return {
                            ...post,
                            created: DateTime.fromISO(post.created)
                        }
                    })
                    .filter(post => {
                        switch (true) {
                            case state.selectedPeriod === 'today':
                                return post.created >= DateTime.now().minus({ day: 1 });
                            case state.selectedPeriod === 'week':
                                return post.created >= DateTime.now().minus({ week: 1 });
                            case state.selectedPeriod === 'month':
                                return post.created >= DateTime.now().minus({ month: 1 });
                            default:
                                throw Error(`Invalid selected period: ${state.selectedPeriod}`);
                        }
                    })
            }
        },
        actions: {
            setSelectedPeriod(period: Period): void {
                this.selectedPeriod = period;
            }
        }
    });

export { usePostsStore };
