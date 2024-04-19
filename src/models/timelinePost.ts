import { Post } from '@/models/post';
import { DateTime } from 'luxon';

interface TimelinePost extends Omit<Post, 'created'> {
    created: DateTime
}

export { TimelinePost };
