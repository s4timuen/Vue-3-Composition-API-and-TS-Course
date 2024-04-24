import { StoreDefinition, defineStore } from 'pinia';
import { DateTime } from 'luxon';
import { TimelinePost } from '@/models/timelinePost.ts';
import { Post } from '@/models/post';
import { Period } from '@/models/period';
import { delay } from '@/utils/utils'; // todo: test only

interface PostsStoreState {
    postsUrl: string,
    ids: Array<string>;
    all: Map<string, Post>;
    selectedPeriod: Period;
}

interface PostsStoreGetters {
    filteredPosts(state: PostsStoreState): Array<TimelinePost>;
}

interface PostsStoreActions {
    setSelectedPeriod(period: Period): void;
    fetchPosts(): Promise<void>;
}

const usePostsStore: StoreDefinition<
    'postsStore',
    PostsStoreState,
    PostsStoreGetters,
    PostsStoreActions> = defineStore('postsStore', {
        state: (): PostsStoreState => ({
            postsUrl: 'http://localhost:8090/posts',
            ids: [],
            all: new Map([]),
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
            },
            async fetchPosts(): Promise<void> {
                await fetch(this.postsUrl)
                    .then(async res => { // todo: test only
                        await delay();
                        return res;
                    })
                    .then(async res => { return await res.json() as Array<Post> })
                    .then(res => {
                        const ids: Array<string> = [];
                        const all = new Map<string, Post>();
                        for (const post of res) {
                            ids.push(post.id);
                            all.set(post.id, post);
                        }
                        this.ids = ids;
                        this.all = all;
                    })
                    .catch(error => { throw Error('Fetch posts', error) });
            }
        }
    });

export { usePostsStore };
