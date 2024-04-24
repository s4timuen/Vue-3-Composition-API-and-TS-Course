import {
    createWebHashHistory,
    createWebHistory,
    createMemoryHistory,
    createRouter,
    Router,
    RouterHistory,
    RouteRecordRaw
} from 'vue-router';

import PageNotFound from '@/views/PageNotFound.vue';
import ScheduleView from '@/views/ScheduleView.vue';
import AboutView from '@/views/AboutView.vue';
import NewPostView from '@/views/NewPostView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: { name: 'schedule-view' }
    },
    {
        path: '/schedule',
        name: 'schedule-view',
        component: ScheduleView
    },
    {
        path: '/about',
        name: 'about-view',
        component: AboutView
    },
    {
        path: '/posts/new',
        name: 'posts-new',
        component: NewPostView
    },
    {
        path: '/:catchAll(.*)',
        name: 'page-not-found',
        component: PageNotFound
    }
];

function createCustomRouter(historyMode: string): Router {
    let history: RouterHistory | undefined = undefined;

    switch (true) {
        case historyMode === 'web':
            history = createWebHistory();
            break;
        case historyMode === 'hash':
            history = createWebHashHistory();
            break;
        case historyMode === 'memory':
            history = createMemoryHistory();
            break;
        default:
            history = createWebHashHistory();
    }

    return createRouter({
        history,
        routes,
    });
}

export { createCustomRouter };
