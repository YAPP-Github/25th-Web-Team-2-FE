'use client';

import { useState } from 'react';

import {
  checkButton,
  postOutlineContent,
  postOutlineLayout,
  postOutlineTitle,
  participationCount,
  otherConditionWrapper,
  buttonContainer,
  scrollableContent,
  dynamicSpacing,
  divider,
} from './ExperimentPostOutline.css';
import { GENDER_TYPE } from '../../../ExperimentPostPage.types';
import {
  getGenderLabel,
  getDurationLabel,
  getMatchTypeText,
  formatDate,
  getAddressDisplay,
} from '../../../ExperimentPostPage.utils';
import { UseApplyMethodQueryResponse } from '../../../hooks/useApplyMethodQuery';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';
import ParticipationGuideModal from '../ParticipationGuideModal/ParticipationGuideModal';

import { trackEvent } from '@/lib/mixpanelClient';

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
                  {targetGroup.genderType === GENDER_TYPE.ALL
                    ? '성별 무관'
                    : getGenderLabel(targetGroup.genderType)}
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
                <span className={participationCount}>{summary.count}회 참여</span>
                {summary.timeRequired
                  ? `회당 ${getDurationLabel(summary.timeRequired)}`
                  : '본문 참고'}
              </td>
            </tr>
            <tr>
              <th>실험 장소</th>
              <td>
                <p>{getAddressDisplay(summary.matchType, address)}</p>
              </td>
            </tr>

            <tr>
              <th>연구 책임</th>
              <td>
                <p>{summary.leadResearcher}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={buttonContainer}>
        {recruitStatus ? (
          <button
            className={checkButton()}
            onClick={() => {
              trackEvent('ApplyMethod Interaction', {
                action: 'Click ApplyMethod Modal',
                device: 'desktop',
              });
              setIsModalOpen(true);
            }}
          >
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
