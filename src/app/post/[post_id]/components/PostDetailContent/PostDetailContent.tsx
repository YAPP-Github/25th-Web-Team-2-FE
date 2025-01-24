import { postContentLayout, postContentWrapper } from './PostDetailContent.styles';
import formattedContentText from '../../PostPage.utils';

import { UseQueryExperimentDetailsAPIResponse } from '@/apis/hooks/useQueryExperimentDetailsAPI';

export const POST_CONTENT = {
  content:
    '안녕하세요. 야뿌대학교 심리학과에서 웹 서비스 사용자 경험을 개선하기 위한 실험 참가자를 모집합니다.\\n\\n웹 서비스의 사용자 경험을 개선하고, 더 나은 사용자 인터페이스 설계를 위한 중요한 실험에 참가해 주세요! 본 실험은 웹 서비스와의 상호작용을 통해 서비스의 편의성 및 사용성을 분석하고, 이를 기반으로 향후 서비스 개선 방안을 도출하는 데 목표를 두고 있습니다.\\n\\n본 실험은 웹 서비스 사용 중의 편리함과 불편함을 경험적으로 분석하고, 다양한 사용자 피드백을 통해 서비스 개선 방향을 모색합니다. 실험을 통해 얻어진 데이터는 실제 서비스 개선에 반영될 예정입니다.\\n\\n실험 전 간단한 오리엔테이션이 진행되며, 참가자 분들은 실험 절차와 진행 방법에 대해 안내를 받게 됩니다.\\n\\n실험은 약 10분 동안 특정 웹 서비스의 시연을 보며 과제를 수행하는 형식으로 진행됩니다. 이후에는 사용 중 느낀 점과 의견을 바탕으로 약 15분 동안 설문을 작성하게 됩니다.\\n\\n참가 자격\\n- 만 19세 이상 한국 국적의 여자 학부생 및 대학원생\\n- 웹 서비스를 자주 사용하는 일반적인 사용자 경험을 가지고 계신 분\\n\\n실험 세부 사항\\n- 실험 방법: 오프라인 참여\\n- 실험 장소: 서울 마포구 야뿌대학교 공덕창업허브 7층\\n- 소요 시간: 약 30분 (실험 진행 후 설문 응답 포함)\\n\\n참여 혜택\\n- 50,000원 상당의 참가비\\n\\n- 실험 후 추가적인 피드백을 제공해 주신 분들께는 추후 서비스 관련 연구 참여 기회가 제공될 수 있습니다.',
};

interface PostDetailContentProps {
  postDetailData: UseQueryExperimentDetailsAPIResponse;
}
const PostDetailContent = ({ postDetailData }: PostDetailContentProps) => {
  return (
    <div css={postContentLayout}>
      <h3>실험 안내</h3>
      <div css={postContentWrapper}>{formattedContentText(postDetailData.content || '')}</div>
    </div>
  );
};

export default PostDetailContent;
