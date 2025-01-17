import { postContentLayout, postContentWrapper } from './PostDetailContent.styles';
import formattedContentText from '../../PostPage.utils';

export const POST_CONTENT = {
  content:
    '안녕하세요. 야뿌대학교 심리학과에서 웹 서비스 사용자 경험을 개선하기 위한 실험 참가자를 모집합니다.\\n본 실험은 웹 서비스와의 상호작용을 통해 사용자 편의성을 분석하고, 더 나은 인터페이스 설계를 목표로 합니다.\\n\\n실험 전 간단한 오리엔테이션 진행 후, 참가하시게 되면 실험 당일 약 10분 동안 화면에 나오는 특정 서비스의 시연을 보며 과제를 수행하게 됩니다. 이후 15분 내외의 설문 응답이 진행됩니다.\\n\\n참가 자격\\n- 만 19세 이상 한국 국적의 여자 학부생 및 대학원생\\n- IT 서비스에 관심이 있는 분\\n\\n실험 세부 사항\\n- 실험 방법: 오프라인 참여\\n- 실험 장소: 서울 마포구 야뿌대학교 공덕창업허브 7층\\n- 소요 시간: 약 30분\\n\\n참여 혜택\\n- 50,000원 상당의 참가비\\n',
};

const PostDetailContent = () => {
  return (
    <div css={postContentLayout}>
      <h3>실험 안내</h3>
      <div css={postContentWrapper}>{formattedContentText(POST_CONTENT.content || '')}</div>
    </div>
  );
};

export default PostDetailContent;
