'use client';

import { useState } from 'react';

import {
  myPostContainerLayout,
  myPostsHeaderContainer,
  myPostsHeaderText,
  postsSorting,
} from './MyPostsContainer.css';
import useMyPostsQuery from '../../hooks/useMyPostsQuery';
import MyPostsTable from '../MyPostsTable/MyPostsTable';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

export const PAGE_SIZE = 10;

const MyPostsContainer = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [order, setOrder] = useState<'DESC' | 'ASC'>('DESC');

  const myPostAPIResponse = useMyPostsQuery({
    page: currentPage,
    count: PAGE_SIZE,
    order,
  });

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === 'DESC' ? 'ASC' : 'DESC'));
  };

  return (
    <div className={myPostContainerLayout}>
      <div className={myPostsHeaderContainer}>
        {!myPostAPIResponse.isError && (
          <>
            <h2 className={myPostsHeaderText}>내가 작성한 글</h2>
            {myPostAPIResponse.data?.content && myPostAPIResponse.data.content.length > 0 && (
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
          </>
        )}
      </div>

      <MyPostsTable
        myPostAPIResponse={myPostAPIResponse}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        order={order}
      />
    </div>
  );
};

export default MyPostsContainer;
