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
  disabledCheckButton,
  dynamicSpacing,
} from './PostOutline.styles';
import {
  getAreaLabel,
  getDurationLabel,
  getGenderLabel,
  getRegionLabel,
} from '../../PostPage.utils';
import ParticipationGuideModal from '../ParticipationGuideModal/ParticipationGuideModal';

import { UseQueryApplyMethodAPIResponse } from '@/apis/hooks/useQueryApplyMethodAPI';
import { UseQueryExperimentDetailsAPIResponse } from '@/apis/hooks/useQueryExperimentDetailsAPI';

interface PostOutlineProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
  applyMethodData: UseQueryApplyMethodAPIResponse;
}
const PostOutline = ({ postDetailData, applyMethodData }: PostOutlineProps) => {
  const { address, recruitStatus, summary, targetGroup } = postDetailData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div css={postOutlineLayout}>
      <h3>실험 개요</h3>
      <div css={scrollableContent}>
        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>모집 대상</th>
              <td>
                <p>
                  만 {targetGroup.startAge} ~ {targetGroup.endAge}세,{' '}
                  {getGenderLabel(targetGroup.genderType)}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 기타 조건 */}
        {targetGroup.otherCondition ? (
          <div css={otherConditionWrapper}>{targetGroup.otherCondition}</div>
        ) : (
          <div css={dynamicSpacing} />
        )}

        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>참여 보상</th>
              <td>{summary.reward}</td>
            </tr>
          </tbody>
        </table>

        <div css={divider} />

        <table css={postOutlineContent}>
          <tbody>
            <tr>
              <th>실험 일시</th>
              <td>
                {summary.startDate && summary.endDate
                  ? summary.startDate === summary.endDate
                    ? summary.startDate
                    : `${summary.startDate} ~ ${summary.endDate}`
                  : '본문 참고'}
              </td>
            </tr>
            <tr>
              <th>진행 방식</th>
              <td>대면</td>
            </tr>
            <tr>
              <th>소요 시간</th>
              <td>
                <span css={participationCount}>{summary.count}회 참여</span>{' '}
                {summary.timeRequired ? getDurationLabel(summary.timeRequired) : '본문 참고'}
              </td>
            </tr>
            <tr>
              <th>실험 장소</th>
              <td css={textWrapRow}>
                <p>
                  {address.univName && address.region && address.area
                    ? `${getRegionLabel(address.region)} ${getAreaLabel(
                        address.region,
                        address.area,
                      )} ${address.univName} ${address.detailedAddress}`
                    : '본문 참고'}
                </p>
              </td>
            </tr>
            <tr>
              <th>연구 책임</th>
              <td css={textWrapRow}>
                <p>{summary.leadResearcher}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div css={ButtonContainer}>
        {recruitStatus ? (
          <button css={checkButton} onClick={() => setIsModalOpen(true)}>
            참여 방법 확인하기
          </button>
        ) : (
          <button css={disabledCheckButton} disabled>
            모집이 완료 되었어요
          </button>
        )}
      </div>

      {/* 참여 방법 안내 모달 */}
      <ParticipationGuideModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        applyMethodData={applyMethodData}
      />
    </div>
  );
};

export default PostOutline;
