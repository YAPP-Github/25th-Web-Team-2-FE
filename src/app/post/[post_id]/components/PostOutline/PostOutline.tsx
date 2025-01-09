import { useState } from 'react';

import {
  checkButton,
  divider,
  locationRow,
  postOutlineContent,
  postOutlineLayout,
  targetRow,
} from './PostOutline.styles';
import ParticipationGuideModal from '../ParticipationGuideModal/ParticipationGuideModal';

function PostOutline() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div css={postOutlineLayout}>
      <h3>실험 개요</h3>
      <table css={postOutlineContent}>
        <tbody>
          <tr>
            <th>모집 대상</th>
            <td css={targetRow}>
              <p>
                만 19~34세 성인 <br /> 최근 1년 간 인터넷 게임을 이용한 경험이 있는 분이라면 누구든
                가능합니다.
              </p>
            </td>
          </tr>
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
            <td>약 1시간 30분</td>
          </tr>
          <tr>
            <th>실험 장소</th>
            <td css={locationRow}>
              <p>서울시 서대문구 연세대학교 ECC B301 ECC B301 ECCD B301</p>
            </td>
          </tr>
        </tbody>
      </table>

      <button css={checkButton} onClick={() => setIsModalOpen(true)}>
        참여 방법 확인하기
      </button>

      {/* 참여 방법 안내 모달 */}
      <ParticipationGuideModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}

export default PostOutline;
