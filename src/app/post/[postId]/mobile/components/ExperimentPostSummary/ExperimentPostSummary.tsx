import {
  dynamicSpacing,
  otherConditionWrapper,
  participationCount,
  postSummaryContent,
  postSummaryLayout,
} from './ExperimentPostSummary.css';
import {
  getGenderLabel,
  getMatchTypeText,
  getDurationLabel,
  getRegionLabel,
  getAreaLabel,
  formatDate,
} from '../../../ExperimentPostPage.utils';
import { UseQueryExperimentDetailsAPIResponse } from '../../../hooks/useExperimentDetailsQuery';

import { GenderType } from '@/app/upload/components/ApplyMethodSection/ApplyMethodSection';
import { MatchType } from '@/types/uploadExperimentPost';

const ExperimentPostSummary = ({
  postDetailData,
}: {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}) => {
  const { address, summary, targetGroup } = postDetailData;

  return (
    <div className={postSummaryLayout}>
      <table className={postSummaryContent}>
        <tbody>
          <tr>
            <th>모집 대상</th>
            <td>
              <p>
                만 {targetGroup.startAge} ~ {targetGroup.endAge}세,{' '}
                {targetGroup.genderType === GenderType.ALL
                  ? '성별 무관'
                  : getGenderLabel(targetGroup.genderType)}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 기타 조건 */}
      {targetGroup.otherCondition ? (
        <div className={otherConditionWrapper}>{targetGroup.otherCondition}</div>
      ) : (
        <div className={dynamicSpacing} />
      )}

      <table className={postSummaryContent}>
        <tbody>
          <tr>
            <th>참여 보상</th>
            <td>{summary.reward}</td>
          </tr>
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
              <p>
                {summary.matchType === MatchType.ONLINE
                  ? '비대면'
                  : address.place && address.region && address.area
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
            <td>
              <p>{summary.leadResearcher}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExperimentPostSummary;
