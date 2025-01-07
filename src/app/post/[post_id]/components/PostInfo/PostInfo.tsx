import { postInfoLayout, postSubInfo, viewsContainer } from './PostInfo.styles';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

function PostInfo() {
  return (
    <div css={postInfoLayout}>
      <h2>강남 삼성 서울 병원 연구 참여자를 모집합니다</h2>
      <div css={postSubInfo}>
        <div>2024.12.29.</div>
        <div>닉네임</div>
        <div css={viewsContainer}>
          <Icon icon="EyeTwo" width={16} height={16} color={colors.field06} />
          100k
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
