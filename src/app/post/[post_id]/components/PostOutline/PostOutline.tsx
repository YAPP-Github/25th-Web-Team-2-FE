import { useState } from 'react';

import {
  checkButton,
  divider,
  textWrapRow,
  postOutlineContent,
  postOutlineLayout,
  participationCount,
  otherConditionWrapper,
  ButtonContainer,
  scrollableContent,
} from './PostOutline.styles';
import ParticipationGuideModal from '../ParticipationGuideModal/ParticipationGuideModal';

const PostOutline = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div css={postOutlineLayout}>
      <div css={scrollableContent}>
        <h3>실험 개요</h3>
        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>모집 대상</th>
              <td>
                <p>만 19~65세, 여성</p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 기타 조건 */}
        <div css={otherConditionWrapper}>IT 서비스에 관심이 있는 분</div>

        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>참여 보상</th>
              <td>50,000원</td>
            </tr>
          </tbody>
        </table>

        <div css={divider} />

        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>실험 일시</th>
              <td>2025. 01. 18.</td>
            </tr>
            <tr>
              <th>진행 방식</th>
              <td>대면</td>
            </tr>
            <tr>
              <th>소요 시간</th>
              <td>
                <span css={participationCount}>1회 참여</span> 약 30분
              </td>
            </tr>
            <tr>
              <th>실험 장소</th>
              <td css={textWrapRow}>
                <p>서울시 마포구 야뿌대학교 공덕창업허브</p>
              </td>
            </tr>
            <tr>
              <th>연구 책임</th>
              <td css={textWrapRow}>
                <p>야뿌대학교 심리학과 연구원 연도비</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div css={ButtonContainer}>
        <button css={checkButton} onClick={() => setIsModalOpen(true)}>
          참여 방법 확인하기
        </button>
      </div>

      {/* 참여 방법 안내 모달 */}
      <ParticipationGuideModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default PostOutline;
