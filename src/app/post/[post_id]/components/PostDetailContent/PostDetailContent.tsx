import { postContentLayout, postContentWrapper } from './PostDetailContent.styles';
import { UseQueryExperimentDetailsAPIResponse } from '../../hooks/useExperimentDetailsQuery';
import { formattedContentText } from '../../PostPage.utils';

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
