import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';
import {
  emptyContents,
  emptyDescription,
  emptyMyPostsLayout,
  emptyTitle,
} from './EmptyMyPosts.css';

const EmptyMyPosts = () => {
  return (
    <div className={emptyMyPostsLayout}>
      <Icon icon="AllEmpty" width={50} height={50} color={colors.icon02} />
      <div className={emptyContents}>
        <span className={emptyTitle}>아직 작성된 글이 없어요</span>
        <span className={emptyDescription}>PC에서 첫 번째 실험 공고를 올려 보세요</span>
      </div>
    </div>
  );
};

export default EmptyMyPosts;
