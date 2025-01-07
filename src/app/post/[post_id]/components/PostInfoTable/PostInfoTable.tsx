import { postInfoTableLayout, targetRow, warningMessage } from './PostInfoTable.styles';

import Icon from '@/components/Icon';
import { colors } from '@/styles/colors';

function PostInfoTable() {
  return (
    <table css={postInfoTableLayout}>
      <tbody>
        <tr>
          <th>실험 일시</th>
          <td>2024. 12. 31. ~ 2025. 01. 08.</td>
          <th>연구 책임</th>
          <td>성균관대학교 뇌인지랩실 김도비</td>
        </tr>
        <tr>
          <th>진행 방식</th>
          <td>대면</td>
          <th>참여 보상</th>
          <td>네이버페이 포인트 1만원 네이버페이 포인트 1만원 네이버페이 포인트 1만원</td>
        </tr>
        <tr>
          <th>소요 시간</th>
          <td>8회 참여 | 약 1시간 30분</td>
          <th>모집 대상</th>
          <td css={targetRow}>
            <p>
              만 19~55세, 성별 무관, 교정 시력 1.0 이상 또는
              <br />
              실험 동안 렌즈 착용 가능하신 분 실험 동안 렌즈 착용 가능하신 분 실험 동안 렌즈 착용
              가능하신 분 실험 동안 렌즈 착용 가능하신 분
            </p>

            <div css={warningMessage}>
              <Icon icon="Alert" color={colors.textAlert} width={16} height={16} /> 모집 대상을
              꼼꼼히 확인해주세요
            </div>
          </td>
        </tr>
        <tr>
          <th>실험 장소</th>
          <td>서울시 서대문구 연세대학교 ECC B301 ECC B301 ECC B301 </td>
        </tr>
      </tbody>
    </table>
  );
}

export default PostInfoTable;
