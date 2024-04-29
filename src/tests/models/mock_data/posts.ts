import { Post } from '@/models/post';
import { DateTime } from 'luxon';

const today: Post = {
    id: '1',
    title: 'Stuff to do today',
    created: DateTime.now().toISO(),
    markdown: ''
}

const week: Post = {
    id: '2',
    title: 'Stuff to do this week',
    created: DateTime.now().minus({ days: 5 }).toISO(),
    markdown: ''
}

const month: Post = {
    id: '3',
    title: 'Stuff to do this month',
    created: DateTime.now().minus({ weeks: 3 }).toISO(),
    markdown: ''
}

export { today, week, month };
