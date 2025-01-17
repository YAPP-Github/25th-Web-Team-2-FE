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
                <p>만 19~34세, 성인</p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 기타 조건 */}
        <div css={otherConditionWrapper}>
          -영어 또는 중국어로 의사소통 가능한 학생 <br /> ※외국인 학생 지원 시, 한국어도 유창하게
          구사할 수 있어야 합니다. -영어 또는 중국어로 의사소통 가능한 학생 <br /> ※외국인 학생 지원
          시, 한국어도 유창하게 구사할 수 있어야 합니다. -영어 또는 중국어로 의사소통 가능한 학생{' '}
          <br />
        </div>

        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>참여 보상</th>
              <td>네이버페이 포인트 1만원</td>
            </tr>
          </tbody>
        </table>

        <div css={divider} />

        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>실험 일시</th>
              <td>2024. 12.29.</td>
            </tr>
            <tr>
              <th>진행 방식</th>
              <td>대면</td>
            </tr>
            <tr>
              <th>소요 시간</th>
              <td>
                <span css={participationCount}>8회 참여</span> 약 1시간 30분
              </td>
            </tr>
            <tr>
              <th>실험 장소</th>
              <td css={textWrapRow}>
                <p>서울시 서대문구 연세대학교 ECC B301 ECC B301 ECCD B301</p>
              </td>
            </tr>
            <tr>
              <th>연구 책임</th>
              <td css={textWrapRow}>
                <p>연세대학교 인지심리학 랩실 김도비</p>
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
