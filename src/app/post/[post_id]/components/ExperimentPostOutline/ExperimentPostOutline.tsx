import { useState } from 'react';

import {
  checkButton,
  divider,
  textWrapRow,
  postOutlineContent,
  postOutlineLayout,
  postOutlineTitle,
  participationCount,
  otherConditionWrapper,
  buttonContainer,
  scrollableContent,
  dynamicSpacing,
} from './ExperimentPostOutline.css';
import {
  getGenderLabel,
  getDurationLabel,
  getRegionLabel,
  getAreaLabel,
  getMatchTypeText,
  formatDate,
} from '../../ExperimentPostPage.utils';
import { UseApplyMethodQueryResponse } from '../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../hooks/useExperimentDetailsQuery';
import ParticipationGuideModal from '../ParticipationGuideModal/ParticipationGuideModal';

interface ExperimentPostOutlineProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
  applyMethodData: UseApplyMethodQueryResponse | undefined;
}

const ExperimentPostOutline = ({ postDetailData, applyMethodData }: ExperimentPostOutlineProps) => {
  const { address, recruitStatus, summary, targetGroup } = postDetailData;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!applyMethodData) return null;

  return (
    <div className={postOutlineLayout}>
      <h3 className={postOutlineTitle}>실험 개요</h3>
      <div className={scrollableContent}>
        <table className={postOutlineContent}>
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

        {targetGroup.otherCondition ? (
          <div className={otherConditionWrapper}>{targetGroup.otherCondition}</div>
        ) : (
          <div className={dynamicSpacing} />
        )}

        <table className={postOutlineContent}>
          <tbody>
            <tr>
              <th>참여 보상</th>
              <td>{summary.reward}</td>
            </tr>
          </tbody>
        </table>

        <div className={divider} />

        <table className={postOutlineContent}>
          <tbody>
            <tr>
              <th>실험 일시</th>
              <td>
                {summary.startDate && summary.endDate
                  ? summary.startDate === summary.endDate
                    ? summary.startDate
                    : `${formatDate(summary.startDate)} ~ ${formatDate(summary.endDate)}`
                  : '본문 참고'}
              </td>
            </tr>
            <tr>
              <th>진행 방식</th>
              <td>{getMatchTypeText(summary.matchType)}</td>
            </tr>
            <tr>
              <th>소요 시간</th>
              <td>
                <span className={participationCount}>{summary.count}회 참여</span>{' '}
                {summary.timeRequired ? getDurationLabel(summary.timeRequired) : '본문 참고'}
              </td>
            </tr>
            <tr>
              <th>실험 장소</th>
              <td className={textWrapRow}>
                <p>
                  {address.place && address.region && address.area
                    ? `${getRegionLabel(address.region)} ${getAreaLabel(
                        address.region,
                        address.area,
                      )} ${address.place} ${address.detailedAddress}`
                    : '본문 참고'}
                </p>
              </td>
            </tr>
            <tr>
              <th>연구 책임</th>
              <td className={textWrapRow}>
                <p>{summary.leadResearcher}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={buttonContainer}>
        {recruitStatus ? (
          <button className={checkButton()} onClick={() => setIsModalOpen(true)}>
            참여 방법 확인하기
          </button>
        ) : (
          <button className={checkButton({ disabled: true })} disabled>
            모집이 완료되었어요
          </button>
        )}
      </div>

      <ParticipationGuideModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        applyMethodData={applyMethodData}
      />
    </div>
  );
};

export default ExperimentPostOutline;
