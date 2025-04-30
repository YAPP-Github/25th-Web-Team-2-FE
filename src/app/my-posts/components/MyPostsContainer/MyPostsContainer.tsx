'use client';

import { useState } from 'react';

import useMyPostsQuery from '../../hooks/useMyPostsQuery';
import MyPostsHeader from '../MyPostsHeader/MyPostHeader';
import MyPostsTable from '../MyPostsTable/MyPostsTable';

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
    <div>
      <MyPostsHeader
        isError={!!myPostAPIResponse.isError}
        hasPosts={!!myPostAPIResponse.data?.content.length}
        order={order}
        toggleOrder={toggleOrder}
      />
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
