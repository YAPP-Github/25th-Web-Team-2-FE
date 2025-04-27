import { myPostsHeaderContainer, myPostsHeaderText, postsSorting } from './MyPostsHeader.css';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

interface MyPostsHeaderProps {
  isError: boolean;
  hasPosts: boolean;
  order: 'DESC' | 'ASC';
  toggleOrder: () => void;
}

const MyPostsHeader = ({ isError, hasPosts, order, toggleOrder }: MyPostsHeaderProps) => {
  if (isError) return null;

  return (
    <div className={myPostsHeaderContainer}>
      <h2 className={myPostsHeaderText}>내가 작성한 글</h2>
      {hasPosts && (
        <div className={postsSorting} onClick={toggleOrder} style={{ cursor: 'pointer' }}>
          <p>{order === 'DESC' ? '최신순' : '오래된 순'}</p>
          <Icon
            icon="ArrowSorting"
            width={20}
            height={20}
            color={colors.icon04}
            rotate={order === 'DESC' ? 0 : 180}
          />
        </div>
      )}
    </div>
  );
};

export default MyPostsHeader;
