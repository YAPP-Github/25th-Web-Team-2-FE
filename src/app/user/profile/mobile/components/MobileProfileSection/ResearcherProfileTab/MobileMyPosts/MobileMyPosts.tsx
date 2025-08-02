import Link from 'next/link';

import {
  contentArea,
  contentWrapper,
  listItem,
  menuArea,
  myPostsLayout,
  postTitle,
  postViews,
  recruitStatusBadge,
  viewsArea,
} from './MobileMyPosts.css';

import useMyPostsQuery from '@/app/my-posts/hooks/useMyPostsQuery';
import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import EmptyMyPosts from './EmptyMyPosts/EmptyMyPosts';

const MobileMyPosts = () => {
  const { data } = useMyPostsQuery();

  const posts = data?.content ?? [];

  if (posts && posts.length === 0) {
    return <EmptyMyPosts />;
  }

  return (
    <ul className={myPostsLayout}>
      {posts.map((post) => (
        <li key={post.experimentPostId} className={listItem}>
          <div className={viewsArea}>
            <Icon icon="Eye" width={18} height={18} color={colors.icon02} />
            <span className={postViews}>{post.views}</span>
          </div>

          <button className={menuArea}>
            <Icon icon="AllMenu" width={20} height={20} />
          </button>

          <Link href={`/post/${post.experimentPostId}`} className={contentArea}>
            <div className={contentWrapper}>
              {post.recruitStatus && <span className={recruitStatusBadge}>모집 완료</span>}
              <span className={postTitle}>{post.title}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MobileMyPosts;
