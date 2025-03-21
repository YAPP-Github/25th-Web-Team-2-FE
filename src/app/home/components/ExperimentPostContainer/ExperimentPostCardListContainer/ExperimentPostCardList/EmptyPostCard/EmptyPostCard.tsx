import React from 'react';

import {
  emptyListContent,
  emptyListTitle,
  emptyPostCardContent,
  emptyPostCardLayout,
} from './EmptyPostCard.css';

import Icon from '@/components/Icon';

const EmptyPostCard = () => {
  return (
    <div className={emptyPostCardLayout}>
      <Icon icon="AllEmpty" width={60} height={60} />
      <div className={emptyPostCardContent}>
        <h4 className={emptyListTitle}>검색 결과가 없어요</h4>
        <div className={emptyListContent}>
          <span>조건을 다르게 하면</span>
          <br />
          <span>좋은 공고가 더 많을지도 몰라요</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyPostCard;
